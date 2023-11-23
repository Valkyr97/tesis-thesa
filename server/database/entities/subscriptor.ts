//@ts-nocheck
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
} from 'typeorm'

@Entity()
export class Subscriptor extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  email: string
}
