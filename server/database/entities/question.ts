//@ts-nocheck
import {
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  TableInheritance,
  ChildEntity,
} from 'typeorm'
import { QuestionType } from '~/server/utils/enums'

export type choiceQuestionSubtype = 'RADIO' | 'CHECKBOX'

@Entity()
@TableInheritance({
  column: { enum: QuestionType, type: 'enum', name: 'type' },
})
export class Question extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  label: string

  @Column('text')
  questionId: string

  @Column('boolean', { nullable: true, default: false })
  obligatoryQuestion: boolean

  @Column('boolean', { nullable: true, default: false })
  requiredAnswer: boolean
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
        return value.map((v) => v.replaceAll(',', '<<@comma>>'))
      },
      from(value: string[]) {
        return value.map((v) => v.replaceAll('<<@comma>>', ','))
      },
    },
  })
  options: string[]
}

@ChildEntity(QuestionType.TEXT)
export class TextQuestion extends Question {
  @Column('boolean')
  paragraph: boolean
}

@ChildEntity(QuestionType.SCALE)
export class ScaleQuestion extends Question {
  @Column({ type: 'number' })
  from: number

  @Column('number')
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
