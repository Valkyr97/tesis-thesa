//@ts-nocheck
import {
  Column,
  Entity,
  BaseEntity,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm'
import { Question } from './question'
import { Editor } from './editor'

@Entity()
export class Survey extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column('text', { unique: true })
  formId: string

  @Column('text')
  title: string

  @OneToMany(() => Question, (q) => q.survey, { nullable: true })
  questions: Question[]

  @ManyToOne(() => Editor)
  registeredBy: Editor
}