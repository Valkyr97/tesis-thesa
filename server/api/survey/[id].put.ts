import { updateForm } from '~/server/utils/survey'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')

    const { requests } = await readBody(event)

    if (!id)
      throw createError({
        statusCode: 401,
        message: 'ID is Required',
      })

    if (!requests || requests.length == 0) {
      throw createError({
        statusCode: 400,
        message: 'At least one request is required',
      })
    }

    const response = await updateForm(id, requests)

    return response
  } catch (e: any) {
    console.log(e)
    throw createError({
      statusCode: e.statusCode || e.status || e.code || 500,
      message: e.message || 'Internal error obtaining the survey',
    })
  }
})
