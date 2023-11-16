import { IsNull } from 'typeorm'
import { Developer } from '~/server/database/entities/developer'

export default defineEventHandler(async (event) => {
  const { skip, take, withTeam, withoutTeam } = getQuery(event)

  console.log(withTeam, withoutTeam)

  try {
    const findOptions: any = {
      skip: typeof skip === 'number' ? skip : 0,
      take: typeof take === 'number' ? take : undefined,
      relations: { team: !!withTeam },
    }

    if (withoutTeam) {
      findOptions.where = {
        team: { id: IsNull() },
      }
    }

    console.log(findOptions)

    const developers = await Developer.find(findOptions)
    return developers
  } catch (e) {
    console.log(e)
  }
})
