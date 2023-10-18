import dataSource from '~/server/database/dataSource'
import { Game } from './game.entity'
import { State } from '../../enums/state'

export const GameRepository = dataSource.getRepository(Game).extend({
  findActives() {
    return this.createQueryBuilder('game')
      .where('game.state = :state', { state: State.ACTIVE })
      .getMany()
  },
})
