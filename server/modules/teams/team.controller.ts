import { State } from '~/server/enums/state'
import { Team } from './team.entity'
import { TeamRepository } from './team.repository'

export class TeamController {
  teams() {
    return TeamRepository.findActives()
  }

  create(newTeam: Team) {
    return TeamRepository.create(newTeam)
  }

  update(id: number, newData: Partial<Team>) {
    return TeamRepository.update(id, newData)
  }

  remove(id: number) {
    return TeamRepository.update(id, { state: State.DELETED })
  }
}
