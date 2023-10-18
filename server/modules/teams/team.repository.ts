import dataSource from '~/server/database/dataSource'
import { Team } from './team.entity'
import { State } from '../../enums/state'

export const TeamRepository = dataSource.getRepository(Team).extend({
  findActives() {
    return this.createQueryBuilder('team')
      .where('team.state = :state', { state: State.ACTIVE })
      .getMany()
  },
})
