//@ts-nocheck
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
  BaseEntity,
} from 'typeorm'
import { State } from '../enums/state'
import { Editor } from './editor'
import { Game } from './game'
import { Team } from './team'
import { DevToTech } from './devsToTechs'

@Entity()
export class Developer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  name: string

  @Column('text')
  role: string

  @Column('text')
  avatar: string

  @Column('text', { nullable: true })
  abstract: string

  @Column('text', { nullable: true })
  phone: string

  @Column('text', { nullable: true })
  email: string

  @Column('text', { nullable: true })
  address: string

  @Column({
    type: 'enum',
    enum: State,
    default: State.ACTIVE,
  })
  state: State

  @ManyToMany(() => Game, (game) => game.developers)
  @JoinTable()
  games: Game[]

  @OneToMany(() => DevToTech, (devToTech) => devToTech.developer)
  public devToTech: DevToTech[]

  @ManyToOne(() => Team, (team) => team.developers)
  team: Team

  @ManyToOne(() => Editor)
  private registeredBy: Editor
}
