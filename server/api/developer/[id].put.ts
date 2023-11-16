import { Developer } from '~/server/database/entities/developer'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')

    if (!id) {
      throw 'Id no válido'
    }

    const body = await readBody(event)

    await Developer.update(id, body)
  } catch (e) {
    console.log(e)
  }
})
