import { Subscriptor } from '~/server/database/entities/Subscriptor'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  try {
    const form = await getFormById(id)

    const subscriptors = await Subscriptor.find()

    for (let sub of subscriptors) {
      await sendSurveyEmail(sub.email, [
        {
          title: form.info.title,
          uri: form.responderUri,
        },
      ])
    }
  } catch (e: any) {
    console.log(e)
    throw createError({
      statusCode: e.statusCode || e.status || e.code || 500,
      message: e.message || 'Internal error obtaining the responses',
    })
  }
})
