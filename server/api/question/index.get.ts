import { Question } from '~/server/database/entities/Question'

export default defineEventHandler(async (event) => {
  const { skip, take, query, obligatoryQuestion } = getQuery(event)

  try {
    const findOptions: any = {}

    if (obligatoryQuestion) {
      findOptions.where = {
        obligatoryQuestion,
      }
    }

    const questions = await Question.find(findOptions)

    return questions
  } catch (e) {
    console.log(e)
  }
})
