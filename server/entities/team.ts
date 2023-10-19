//@ts-nocheck
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  BaseEntity,
} from 'typeorm'
import { State } from '../enums/state'
import { Editor } from './editor'
import { Developer } from './developer'

@Entity()
export class Team extends BaseEntity {
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
