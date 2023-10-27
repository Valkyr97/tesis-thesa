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
import { State } from '../enums/HeadlineType'
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

  @Column('date', { nullable: true })
  date: Date

  @Column({
    type: 'enum',
    enum: ['event', 'new'],
  })
  type: HeadlineType

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  lastUpdated: Date

  @ManyToOne(() => Editor)
  private registeredBy: Editor
}
