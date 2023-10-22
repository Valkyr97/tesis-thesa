//@ts-nocheck
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { State } from '../enums/state'
import { Editor } from './editor'

@Entity()
export class Headline extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  name: string

  @Column('text')
  img: string

  @Column('text')
  body: string

  @Column('text', { nullable: true })
  link: string

  @Column('text', { nullable: true })
  date: Date

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

  @ManyToOne(() => Editor)
  private registeredBy: Editor
}
