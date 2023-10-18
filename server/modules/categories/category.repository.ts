import dataSource from '~/server/database/dataSource'
import { Category } from './category.entity'
import { State } from '../../enums/state'

export const CategoryRepository = dataSource.getRepository(Category).extend({
  findActives() {
    return this.createQueryBuilder('category')
      .where('category.state = :state', { state: State.ACTIVE })
      .getMany()
  },
})
