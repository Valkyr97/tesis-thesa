import { Question } from '~/server/database/entities/Question'

export default defineEventHandler(async (event) => {
  const { type, skip, take } = getQuery(event)

  try {
    const questions = await Question.find()

    console.log(questions)

    return questions
  } catch (e) {
    console.log(e)
  }
})
