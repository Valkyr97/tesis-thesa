import dataSource from '../database/dataSource'
import { AnswerInsight } from '../database/entities/AnswerInsight'
import { QuestionRelation } from '../database/entities/QuestionRelation'

export const createAnswerInsight = async (
  questionId: string,
  answer: string,
  frequency: number,
  percent: number
) => {
  try {
    const answerInsight = new AnswerInsight()
    answerInsight.answer = answer
    answerInsight.frequency = frequency
    answerInsight.percent = percent

    await answerInsight.save()

    await dataSource
      .createQueryBuilder()
      .relation(AnswerInsight, 'question')
      .of(answerInsight)
      .set(questionId)
  } catch (e) {
    throw createError({
      statusCode: 500,
      message: 'Internal error saving answer insight',
    })
  }
}

export const createQuestionsRelation = async (
  sourceQuestionId: string,
  targetQuestionId: string,
  sourceQuestionAnswer: string,
  targetQuestionAnswer: string,
  relationPercentage: number
) => {
  const questionRelation = new QuestionRelation()

  questionRelation.sourceQuestionAnswer = sourceQuestionAnswer
  questionRelation.targetQuestionAnswer = targetQuestionAnswer
  questionRelation.relationPercentage = relationPercentage

  await questionRelation.save()

  await dataSource
    .createQueryBuilder()
    .relation(QuestionRelation, 'targetQuestion')
    .of(questionRelation)
    .set(targetQuestionId)

  await dataSource
    .createQueryBuilder()
    .relation(QuestionRelation, 'sourceQuestion')
    .of(questionRelation)
    .set(sourceQuestionId)
}
