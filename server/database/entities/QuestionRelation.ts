//@ts-nocheck
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Question } from './Question'

@Entity({ name: 'question_relations' })
export class QuestionRelation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  sourceQuestionAnswer: string

  @Column('text')
  targetQuestionAnswer: string

  @Column('float')
  relationPercentage: number

  @ManyToOne(() => Question, (question) => question.relationToQuestions)
  sourceQuestion: Question

  @ManyToOne(() => Question, (question) => question.questionToRelations)
  targetQuestion: Question
}
