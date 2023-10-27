//@ts-nocheck
import {
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm'
import { Survey } from './survey'

@Entity()
export class Question extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  question: string

  @ManyToOne(() => Survey, (s) => s.questions, { nullable: true })
  survey: Survey
}
