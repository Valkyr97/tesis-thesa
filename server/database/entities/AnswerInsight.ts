//@ts-nocheck
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from 'typeorm'
import { Question } from './Question'

@Entity()
export class AnswerInsight extends BaseEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number

  @Column('text')
  answer: string

  @Column('integer')
  frequency: number

  @Column('float')
  percent: number

  @Column('integer', { nullable: true })
  uniqueFrequency: number

  @Column('float', { nullable: true })
  uniquePercent: number

  @ManyToOne(() => Question, (question) => question.answers)
  question: Question
}
