import { Developer } from '../../entities/developer'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    const newDev = new Developer()
    const manager = Developer.getRepository()

    manager.merge(newDev, { ...body })

    return await newDev.save()
  } catch (e) {
    console.log(e)
  }
})
