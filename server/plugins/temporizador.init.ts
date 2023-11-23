import { Subscriptor } from '../database/entities/subscriptor'
import { sendSurveyEmail } from '../utils/email'

export default defineNitroPlugin(async (nitroApp) => {
  const { files } = await getForms()

  const formUris = await Promise.all(
    files.map((file: any) => {
      return getFormById(file.id)
    })
  )

  const subscriptors = await Subscriptor.find()

  for (let subs of subscriptors) {
    await sendSurveyEmail(
      subs.email,
      formUris.map((form) => ({
        title: form.info.title,
        uri: form.responderUri,
      }))
    )
  }
})
