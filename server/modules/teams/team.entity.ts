//@ts-nocheck
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm'
import { State } from '../../enums/state'
import { Editor } from '../editors/editor.entity'
import { Developer } from '../developers/developer.entity'

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  name: string

  @Column('text')
  description: string

  @Column('text')
  picture: string

  @Column({
    type: 'enum',
    enum: State,
    default: State.ACTIVE,
  })
  state: State

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  lastUpdated: Date

  @OneToMany(() => Developer, (dev) => dev.team)
  developers: Developer[]

  @ManyToOne(() => Editor)
  private registeredBy: Editor
}
