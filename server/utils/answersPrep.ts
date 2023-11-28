import { Question } from '../database/entities/Question'
import { appendFile, readFile } from 'fs/promises'
import { join } from 'path'
import { hexToString } from '~/utils/helpers'

//@ts-ignore
import * as R from 'r-integration'
import { createAnswerInsight } from './answers'

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

    const result = R.executeRScript(
      join('server/scripts/form_answers_analisis.R')
    )

    if (result == 'OK') {
      const response = await readFile(
        join('server/scripts/outfile.json'),
        'utf-8'
      )
      const data = JSON.parse(response)

      const [answersInsights, gameGenderPerDisp] = data

      await Promise.all(
        answersInsights.map((insight: any) => {
          return createAnswerInsight(
            insight.id,
            insight.answer,
            insight.answer_count,
            insight.percent
          )
        })
      ).catch((e) => {
        throw createError({
          statusCode: e.statusCode || e.code || e.status || 500,
          message: e.message || 'Error createing questions relation',
        })
      })

      let sourceQuestion: any = undefined
      let targetQuestion: any = undefined

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

      console.log('Finish')
    }
  } catch (e) {
    console.log(e)
  }
}
