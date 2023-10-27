import { Developer } from '~/server/entities/developer'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) return

  try {
    const developer = await Developer.findOneByOrFail({
      id: Number(id),
    })

    developer.remove()

    return developer
  } catch (e) {
    console.log(e)
  }
})
