import { Survey } from '~/server/entities/survey'

export default defineEventHandler(async (event) => {
  try {
    const { id, title } = await readBody(event)

    const survey = new Survey()

    survey.id = id
    survey.title = title

    return await survey.save()
  } catch (e) {
    console.log(e)
  }
})
