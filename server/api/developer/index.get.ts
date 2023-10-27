import { Developer } from '~/server/entities/developer'

export default defineEventHandler(async (event) => {
  const { skip, take, withTeam } = getQuery(event)

  try {
    const developers = await Developer.find({
      skip: typeof skip === 'number' ? skip : 0,
      take: typeof take === 'number' ? take : undefined,
      relations: { team: !!withTeam },
    })
    return developers
  } catch (e) {
    console.log(e)
  }
})
