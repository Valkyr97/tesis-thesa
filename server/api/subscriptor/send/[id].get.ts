import { Subscriptor } from '~/server/database/entities/Subscriptor'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))

  try {
    console.log('id', id)
    if (isNaN(id)) {
      throw createError({
        statusCode: 400,
        message: 'Not valid Id',
      })
    }

    const subscriptor = await Subscriptor.findOneByOrFail({
      id,
    })

    const { files } = await getForms()

    const formUris = await Promise.all(
      files.map((file: any) => {
        return getFormById(file.id)
      })
    )

    await sendSurveyEmail(
      subscriptor.email,
      formUris.map((form) => ({
        title: form.info.title,
        uri: form.responderUri,
      }))
    )
  } catch (e: any) {
    console.log(e)
    throw createError({
      statusCode: e.statusCode || e.status || e.code || 500,
      message: e.message || 'Internal error obtaining the responses',
    })
  }
})
