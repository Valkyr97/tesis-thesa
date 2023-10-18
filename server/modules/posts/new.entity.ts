//@ts-nocheck
import { Column, Entity } from 'typeorm'
import { Content } from './content.entity'

export type blogType = 'new' | 'event'

@Entity()
export class New extends Content {
  @Column('text')
  link: string
}
