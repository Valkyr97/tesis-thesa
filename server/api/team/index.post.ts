import dataSource from '~/server/database/dataSource'
import { Team } from '~/server/database/entities/team'

export default defineEventHandler(async (event) => {
  try {
    const { developers, ...body } = await readBody(event)

    const newTeam = new Team()
    const manager = Team.getRepository()

    manager.merge(newTeam, { ...body })

    await newTeam.save()

    if (developers && developers.length > 0) {
      await dataSource
        .createQueryBuilder()
        .relation(Team, 'developers')
        .of(newTeam)
        .add(developers)
    }
  } catch (e) {
    console.log(e)
  }
})
