//@ts-nocheck
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm'
import { State } from '../../enums/state'
import { Editor } from '../editors/editor.entity'
import { Game } from '../games/game.entity'
import { Team } from '../teams/team.entity'
import { DevToTech } from '../relations/DevsToTechs'

@Entity()
export class Developer {
  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  name: string

  @Column('text')
  role: string

  @Column('text')
  avatar: string

  @Column('text')
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

  @OneToMany(() => DevToTech, devToTech => devToTech.developer)
  public devToTech: DevToTech[]

  @ManyToOne(() => Team, (team) => team.developers)
  team: String

  @ManyToOne(() => Editor)
  private registeredBy: Editor
}
