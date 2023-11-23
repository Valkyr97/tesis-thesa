import { getResponsesById } from '~/server/utils/survey'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  try {
    if (!id)
      throw createError({
        statusCode: 400,
        message: 'ID is Required',
      })

    const response = await getResponsesById(id)

    return response
  } catch (e: any) {
    console.log(e)
    throw createError({
      statusCode: e.statusCode || e.status || e.code || 500,
      message: e.message || 'Internal error obtaining the responses',
    })
  }
})
