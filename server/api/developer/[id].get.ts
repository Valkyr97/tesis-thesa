import { Developer } from '~/server/database/entities/Developer'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) return

  try {
    const developers = await Developer.findOneBy({
      id: Number(id),
    })
    return developers
  } catch (e) {
    console.log(e)
  }
})
