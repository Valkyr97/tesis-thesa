//@ts-nocheck
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { State } from '../enums/HeadlineType'

@Entity()
export class Editor extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column('text', { unique: true })
  username: string

  @Column('text')
  password: string

  
}
