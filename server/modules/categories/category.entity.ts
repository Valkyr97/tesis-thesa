//@ts-nocheck
import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from 'typeorm'
import { State } from '../../enums/state'
import { Editor } from '../editors/editor.entity'

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  name: string

  @Column({
    type: 'enum',
    enum: State,
    default: State.ACTIVE,
  })
  state: State

  @ManyToOne(() => Editor)
  private registeredBy: Editor
}
