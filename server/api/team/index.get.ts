import { Team } from '~/server/entities/team'

export default defineEventHandler(async (event) => {
  const { skip, take } = getQuery(event)
  
  try {
    const teams = await Team.find({
      skip: typeof skip === 'number' ? skip : 0,
      take: typeof take === 'number' ? take : undefined,
    })
    return teams
  } catch (e) {
    console.log(e)
  }
})
