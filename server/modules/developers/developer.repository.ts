import dataSource from '~/server/database/dataSource'
import { Developer } from './developer.entity'
import { State } from '../../enums/state'

export const DeveloperRepository = dataSource.getRepository(Developer).extend({
  findActives() {
    return this.createQueryBuilder('developer')
      .where('developer.state = :state', { state: State.ACTIVE })
      .getMany()
  },
})
