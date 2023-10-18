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
} from 'typeorm'
import { State } from '../../enums/state'
import { Category } from '../categories/category.entity'
import { Editor } from '../editors/editor.entity'
import { Developer } from '../developers/developer.entity'

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  name: string

  @Column('text')
  description: string

  @Column('text')
  demo: string

  @Column('text')
  downloadLink: string

  @Column('simple-array')
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
  developers: Developer[]

  @ManyToOne(() => Editor)
  private registeredBy: Editor
}
