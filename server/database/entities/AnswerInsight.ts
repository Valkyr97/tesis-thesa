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
  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  answer: string

  @Column('integer')
  frequency: number

  @Column('float')
  percent: number

  @ManyToOne(() => Question, (question) => question.answers)
  question: Question
}
