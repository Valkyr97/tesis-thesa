import { State } from '~/server/enums/state'
import { Developer } from './developer.entity'
import { DeveloperRepository } from './developer.repository'

export class DeveloperController {
  developers() {
    return DeveloperRepository.findActives()
  }

  create(newDeveloper: Developer) {
    return DeveloperRepository.create(newDeveloper)
  }

  update(id: number, newData: Partial<Developer>) {
    return DeveloperRepository.update(id, newData)
  }

  remove(id: number) {
    return DeveloperRepository.update(id, { state: State.DELETED })
  }
}
