import { Question } from '~/server/database/entities/Question'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({
      statusCode: 400,
      message: 'Id is required',
    })
  }

  try {
    const question = await Question.findOneByOrFail({
      id: Number(id),
    })

    return question
  } catch (e: any) {
    console.log(e)
    throw createError({
      statusCode: e.statusCode || 500,
    })
  }
})
