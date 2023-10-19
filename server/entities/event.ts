//@ts-nocheck
import { Column, Entity } from 'typeorm'
import { Content } from './content'

export type blogType = 'new' | 'event'

@Entity()
export class Event extends Content {
  @Column('text', { nullable: true })
  link: string

  @Column('date')
  date: Date
}
