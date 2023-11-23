import { Subscriptor } from '~/server/database/entities/subscriptor'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) return

  try {
    const subscriptor = await Subscriptor.findOneByOrFail({
      id: Number(id),
    })

    subscriptor.remove()

    return subscriptor
  } catch (e) {
    console.log(e)
  }
})
