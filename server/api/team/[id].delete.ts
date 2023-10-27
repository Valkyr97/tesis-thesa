import { Team } from '~/server/entities/team'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) return

  try {
    const team = await Team.findOneByOrFail({
      id: Number(id),
    })

    await team.remove()

    return team
  } catch (e) {
    console.log(e)
  }
})
