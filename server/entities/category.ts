//@ts-nocheck
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from 'typeorm'
import { State } from '../enums/HeadlineType'
import { Editor } from './editor'

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  name: string

  @ManyToOne(() => Editor)
  private registeredBy: Editor
}
