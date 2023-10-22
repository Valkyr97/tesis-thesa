import { Category } from '~/server/entities/category'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')

    if (!id) {
      throw 'Id no válido'
    }

    const body = await readBody(event)

    await Category.update(id, body)
  } catch (e) {
    console.log(e)
  }
})
