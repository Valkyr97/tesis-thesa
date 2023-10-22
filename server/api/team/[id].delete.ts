import { Team } from '~/server/entities/team'
import { State } from '~/server/enums/state'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) return

  try {
    const team = await Team.findOneByOrFail({
      id: Number(id),
    })

    team.state = State.DELETED
    await team.save()

    return team
  } catch (e) {
    console.log(e)
  }
})
