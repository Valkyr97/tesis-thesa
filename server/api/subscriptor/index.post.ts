import { Subscriptor } from '../../database/entities/subscriptor'

export default defineEventHandler(async (event) => {
  try {
    const { email } = await readBody(event)

    const exist = await Subscriptor.findOneBy({
      email,
    })

    if (exist) return

    const newSubscriptor = new Subscriptor()
    newSubscriptor.email = email

    await newSubscriptor.save()
  } catch (e: any) {
    console.log(e)
    throw createError({
      statusCode: e.statusCode || 500,
      message: e.statusMessage || 'Lo sentimos ha ocurrido un error',
    })
  }
})
