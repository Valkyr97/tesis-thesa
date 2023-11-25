//@ts-nocheck
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  OneToMany,
  BaseEntity,
} from 'typeorm'
import { Editor } from './Editor'
import { Game } from './Game'
import { Team } from './Team'
import { DevToTech } from './DevsToTechs'

@Entity()
export class Developer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  name: string

  @Column('text')
  role: string

  @Column('text', { nullable: true })
  avatar: string

  @Column('text', { nullable: true })
  abstract: string

  @Column('text', { nullable: true })
  phone: string

  @Column('text', { unique: true })
  email: string

  @Column('text', { nullable: true })
  address: string

  @ManyToMany(() => Game, (game) => game.developers)
  games: Game[]

  @OneToMany(() => DevToTech, (devToTech) => devToTech.developer)
  public devToTech: DevToTech[]

  @ManyToOne(() => Team, (team) => team.developers)
  team: Team

  @ManyToOne(() => Editor)
  private registeredBy: Editor
}
