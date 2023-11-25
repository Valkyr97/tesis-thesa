import { ChoiceQuestion } from '~/server/database/entities/Question'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    if (!body.questionId || !body.label) {
      throw createError({
        statusCode: 400,
        message: 'Fields questionId and label are required',
      })
    }

    const newQuestion = new ChoiceQuestion()
    const manager = ChoiceQuestion.getRepository()

    manager.merge(newQuestion, { ...body })

    return await newQuestion.save()
  } catch (e: any) {
    console.log(e, e.message)
    throw createError({
      statusCode: e.statusCode || 500,
      message: e.message || 'Error creating the Headline',
    })
  }
})
