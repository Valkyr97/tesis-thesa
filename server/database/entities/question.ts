//@ts-nocheck
import {
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  TableInheritance,
  ChildEntity,
  OneToMany,
} from 'typeorm'
import { QuestionType } from '~/enums'
import { AnswerInsight } from './AnswerInsight'
import { QuestionRelation } from './QuestionRelation'

export type choiceQuestionSubtype = 'RADIO' | 'CHECKBOX'

@Entity()
@TableInheritance({
  column: { type: 'enum', enum: QuestionType, name: 'type' },
})
export class Question extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('text')
  label: string

  @Column('text')
  questionId: string

  @Column('boolean', { nullable: true, default: false })
  obligatoryQuestion: boolean

  @Column('boolean', { nullable: true, default: false })
  requiredAnswer: boolean

  @Column({ type: 'enum', enum: QuestionType, name: 'type' })
  type: QuestionType

  @OneToMany(() => AnswerInsight, (answer) => answer.question)
  answers: AnswerInsight[]

  @OneToMany(() => QuestionRelation, (relation) => relation.sourceQuestion)
  relationToQuestions: QuestionRelation[]

  @OneToMany(() => QuestionRelation, (relation) => relation.targetQuestion)
  questionToRelations: QuestionRelation[]
}

@ChildEntity(QuestionType.CHOICE)
export class ChoiceQuestion extends Question {
  @Column({
    type: 'enum',
    enum: ['RADIO', 'CHECKBOX'],
  })
  subtype: choiceQuestionSubtype

  @Column('simple-array', {
    nullable: true,
    transformer: {
      to(value: string[]) {
        return value?.map((v) => v.replaceAll(',', '<<@comma>>'))
      },
      from(value: string[]) {
        return value?.map((v) => v.replaceAll('<<@comma>>', ','))
      },
    },
  })
  choices: string[]
}

@ChildEntity(QuestionType.TEXT)
export class TextQuestion extends Question {
  @Column('boolean')
  paragraph: boolean
}

@ChildEntity(QuestionType.SCALE)
export class ScaleQuestion extends Question {
  @Column('int')
  from: number

  @Column('int')
  to: number
}

@ChildEntity(QuestionType.DATE)
export class DateQuestion extends Question {
  @Column({ type: 'boolean', default: true, nullable: true })
  includeYear: boolean

  @Column({ type: 'boolean', default: false, nullable: true })
  includeTime: boolean
}

@ChildEntity(QuestionType.TIME)
export class TimeQuestion extends Question {
  @Column('boolean', { nullable: true, default: false })
  duration: boolean
}
