import { Team } from '~/server/entities/team'
import { State } from '~/server/enums/state'

export default defineEventHandler(async (event) => {
  try {
    const teams = await Team.find({
      where: {
        state: State.ACTIVE,
      },
    })
    return teams
  } catch (e) {
    console.log(e)
  }
})
