//@ts-nocheck
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { State } from '../enums/state'

@Entity()
export class Editor extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column('text', { unique: true })
  username: string

  @Column('text')
  password: string

  @Column({
    type: 'enum',
    enum: State,
    default: State.ACTIVE,
  })
  state: State
}
