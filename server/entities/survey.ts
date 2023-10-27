//@ts-nocheck
import { Column, Entity, BaseEntity, PrimaryColumn, OneToMany } from 'typeorm'
import { Question } from './question'

@Entity()
export class Survey extends BaseEntity {
  @PrimaryColumn('text', { unique: true })
  id: string

  @Column('text')
  title: string

  @OneToMany(() => Question, (q) => q.survey, { nullable: true })
  questions: Question[]
}
