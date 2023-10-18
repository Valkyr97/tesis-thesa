import { State } from '~/server/enums/state'
import { Editor } from './editor.entity'
import { EditorRepository } from './editor.repository'

export class EditorController {
  editors() {
    return EditorRepository.findActives()
  }

  create(newEditor: Editor) {
    return EditorRepository.create(newEditor)
  }

  update(id: number, newData: Partial<Editor>) {
    return EditorRepository.update(id, newData)
  }

  remove(id: number) {
    return EditorRepository.update(id, { state: State.DELETED })
  }
}
