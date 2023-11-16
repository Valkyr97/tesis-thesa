import { Headline } from '~/server/database/entities/headline'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')

    if (!id) {
      throw 'Id no válido'
    }

    const body = await readBody(event)

    return await Headline.update(id, body)
  } catch (e) {
    console.log(e)
  }
})
