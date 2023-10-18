import { State } from '~/server/enums/state'
import { Game } from './game.entity'
import { GameRepository } from './game.repository'

export class GameController {
  games() {
    return GameRepository.findActives()
  }

  create(newGame: Game) {
    return GameRepository.create(newGame)
  }

  update(id: number, newData: Partial<Game>) {
    return GameRepository.update(id, newData)
  }

  remove(id: number) {
    return GameRepository.update(id, { state: State.DELETED })
  }
}
