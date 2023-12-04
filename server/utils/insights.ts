import dataSource from '../database/dataSource'
import { AnswerInsight } from '../database/entities/AnswerInsight'
import { NumericQuestionsInsight } from '../database/entities/NumericQuestionsInsight'
import { QuestionRelation } from '../database/entities/QuestionRelation'

export const createAnswerInsight = async (
  questionId: string,
  answer: string,
  frequency: number,
  percent: number,
  uniqueFrequency?: number,
  uniquePercent?: number
) => {
  try {
    const answerInsight = new AnswerInsight()
    answerInsight.answer = answer
    answerInsight.frequency = frequency
    answerInsight.percent = percent

    if (uniqueFrequency) answerInsight.uniqueFrequency = uniqueFrequency

    if (uniquePercent) answerInsight.uniquePercent = uniquePercent

    await answerInsight.save()

    await dataSource
      .createQueryBuilder()
      .relation(AnswerInsight, 'question')
      .of(answerInsight)
      .set(questionId)
  } catch (e) {
    console.log(e)
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

export const createNumericQuestionInsight = async (
  questionId: string,
  mean: number,
  median: number,
  mode?: number
) => {
  const numericQuestionInsight = new NumericQuestionsInsight()

  numericQuestionInsight.mean = mean
  numericQuestionInsight.median = median

  if (mode) numericQuestionInsight.mode = mode

  await numericQuestionInsight.save()

  await dataSource
    .createQueryBuilder()
    .relation(NumericQuestionsInsight, 'question')
    .of(numericQuestionInsight)
    .set(questionId)
}
