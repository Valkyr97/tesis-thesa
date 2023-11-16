import { Developer } from '../../database/entities/developer'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    const newDev = new Developer()
    const manager = Developer.getRepository()

    manager.merge(newDev, { ...body })

    return await newDev.save()
  } catch (e: any) {
    console.log(e)
    throw createError({
      statusCode: e.statusCode || 500,
      message: e.message || 'Lo sentimos ha ocurrido un error mientras registraba el desarrollador'
    })
  }
})
