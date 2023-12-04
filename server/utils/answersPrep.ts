import { Question } from '~/server/database/entities/Question'
import { hexToString } from '~/utils/helpers'
import { appendFile, readFile } from 'fs/promises'
import { join } from 'path'

//@ts-ignore
import * as R from 'r-integration'
import { createAnswerInsight, createNumericQuestionInsight } from './insights'
import { QuestionRelation } from '../database/entities/QuestionRelation'
import { AnswerInsight } from '../database/entities/AnswerInsight'
import { NumericQuestionsInsight } from '../database/entities/NumericQuestionsInsight'

export const collectAnswersData = async () => {
  try {
    const obligatoryQuestions = await Question.find({
      where: {
        obligatoryQuestion: true,
      },
      select: {
        id: true,
        questionId: true,
        label: true,
        type: true,
        //@ts-ignore
        subtype: true,
        choices: true,
      },
    })

    const allForms = await getForms()

    const responseData = await Promise.all(
      allForms.files?.map((file: any) => {
        return getResponsesById(file.id)
      })
    )

    const responses = (responseData[0].responses as Array<any>)?.flatMap(
      (response: any) => {
        return Object.values(response.answers as Object)?.flatMap((answer) => {
          return answer.textAnswers.answers.map((a: any) => ({
            responseId: response.responseId,
            questionId: hexToString(answer.questionId),
            answer: a.value,
          }))
        })
      }
    )

    await appendFile(
      join('server/scripts/args_answers.json'),
      JSON.stringify(responses),
      {
        encoding: 'utf-8',
        flag: 'w',
      }
    )

    await appendFile(
      join('server/scripts/args_questions.json'),
      JSON.stringify(obligatoryQuestions),
      {
        encoding: 'utf-8',
        flag: 'w',
      }
    )

    await R.executeRScript(join('server/scripts/form_answers_analisis.R'))

    const response = await readFile(
      join('server/scripts/outfile.json'),
      'utf-8'
    )
    const data = JSON.parse(response)

    const [answersInsights, gameGenderPerDisp, ageInsights] = data

    if (answersInsights) {
      AnswerInsight.clear()

      await Promise.all(
        answersInsights.map((insight: any) => {
          return createAnswerInsight(
            insight.id,
            insight.answer,
            insight.answer_count,
            insight.percent,
            insight.unique_frequency,
            insight.unique_percent
          )
        })
      ).catch((e) => {
        throw createError({
          statusCode: e.statusCode || e.code || e.status || 500,
          message: e.message || 'Error createing questions relation',
        })
      })
    }

    if (gameGenderPerDisp) {
      let sourceQuestion: any = undefined
      let targetQuestion: any = undefined

      await QuestionRelation.clear()

      await Promise.all(
        gameGenderPerDisp.map((relation: any) => {
          sourceQuestion =
            sourceQuestion ??
            obligatoryQuestions.find(
              (q) => q.questionId == Object.keys(relation)[0]
            )

          targetQuestion =
            targetQuestion ??
            obligatoryQuestions.find(
              (q) => q.questionId == Object.keys(relation)[1]
            )

          if (!sourceQuestion || !targetQuestion) return

          return createQuestionsRelation(
            sourceQuestion.id,
            targetQuestion.id,
            relation['ob-4'],
            relation['ob-5'],
            relation.gender_per_disp
          )
        })
      ).catch((e) => {
        throw createError({
          statusCode: e.statusCode || e.code || e.status || 500,
          message: e.message || 'Error createing questions relation',
        })
      })
    }

    if (ageInsights) {
      const previousInsights = await NumericQuestionsInsight.find({
        relations: {
          question: true,
        },
        where: {
          question: {
            questionId: 'ob-0',
          },
        },
      })

      if (previousInsights && previousInsights.length > 0)
        NumericQuestionsInsight.delete(previousInsights.map((pI) => pI.id))

      const id = obligatoryQuestions.find((q) => q.questionId === 'ob-0')?.id

      id &&
        createNumericQuestionInsight(
          id,
          ageInsights[0].mean,
          ageInsights[0].median
        )
    }

    console.log('Finish')
  } catch (e) {
    console.log(e)
  }
}
