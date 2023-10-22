import { Team } from '~/server/entities/team'
import { State } from '~/server/enums/state'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) return

  try {
    const teams = await Team.findOneBy({
      id: Number(id),
    })
    return teams
  } catch (e) {
    console.log(e)
  }
})
