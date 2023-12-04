import { AnswerInsight } from '~/server/database/entities/AnswerInsight'
import { NumericQuestionsInsight } from '~/server/database/entities/NumericQuestionsInsight'
import { QuestionRelation } from '~/server/database/entities/QuestionRelation'

export default defineEventHandler(async (event) => {
  try {
    const answerInsights = await AnswerInsight.find({
      relations: {
        question: true,
      },
    })

    const relations = await QuestionRelation.find({
      relations: {
        sourceQuestion: true,
        targetQuestion: true,
      },
    })

    const numericQuestionInsights = await NumericQuestionsInsight.find({
      relations: {
        question: true
      }
    })

    return { answerInsights, relations, numericQuestionInsights }
  } catch (e: any) {
    console.log(e)
    throw createError({
      statusCode: e.statusCode || e.status || e.code || 500,
      message: e.message || 'Internal error obtaining the responses',
    })
  }
})
