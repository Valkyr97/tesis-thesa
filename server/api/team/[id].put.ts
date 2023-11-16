import dataSource from '~/server/database/dataSource'
import { Team } from '~/server/database/entities/team'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')

    if (!id) {
      throw 'Id no válido'
    }

    const { developers, ...body } = await readBody(event)

    await Team.update(id, body)

    const team = await Team.findOneOrFail({
      where: { id: Number(id) },
      relations: { developers: true },
    })

    team.developers.splice(0)

    await team.save()

    if (developers && developers.length > 0) {
      await dataSource
        .createQueryBuilder()
        .relation(Team, 'developers')
        .of(team)
        .add(developers)
    }
  } catch (e) {
    console.log(e)
  }
})
