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
  export class NumericQuestionsInsight extends BaseEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number
  
    @Column('float')
    mean: number

    @Column('float')
    median: number
  
    @Column('float', {nullable: true})
    mode: number
  
    @ManyToOne(() => Question, (question) => question.answers)
    question: Question
  }
  