import dataSource from '~/server/database/dataSource'
import { Editor } from './editor.entity'
import { State } from '../../enums/state'

export const EditorRepository = dataSource.getRepository(Editor).extend({
  findActives() {
    return this.createQueryBuilder('editor')
      .where('editor.state = :state', { state: State.ACTIVE })
      .getMany()
  },
})
