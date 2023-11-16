import { Team } from '~/server/database/entities/team'

export default defineEventHandler(async (event) => {
  const { skip, take, withMembers } = getQuery(event)

  try {
    const teams = await Team.find({
      skip: typeof skip === 'number' ? skip : 0,
      take: typeof take === 'number' ? take : undefined,
      relations: {
        developers: typeof withMembers === 'boolean' ? withMembers : true,
      },
    })
    return teams
  } catch (e) {
    console.log(e)
  }
})
