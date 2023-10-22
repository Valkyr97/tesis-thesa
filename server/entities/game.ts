//@ts-nocheck
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  BaseEntity,
} from 'typeorm'
import { State } from '../enums/state'
import { Category } from './category'
import { Editor } from './editor'
import { Developer } from './developer'

@Entity()
export class Game extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  name: string

  @Column('text', { nullable: true })
  description: string

  @Column('text', { nullable: true })
  demo: string

  @Column('text')
  downloadLink: string

  @Column('simple-array', { nullable: true })
  pictures: string[]

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

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[]

  @ManyToMany(() => Developer, (developer) => developer.games)
  @JoinTable()
  developers: Developer[]

  @ManyToOne(() => Editor)
  private registeredBy: Editor
}
