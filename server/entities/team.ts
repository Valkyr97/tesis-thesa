//@ts-nocheck
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  BaseEntity,
} from 'typeorm'
import { State } from '../enums/HeadlineType'
import { Editor } from './editor'
import { Developer } from './developer'

@Entity()
export class Team extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  name: string

  @Column('text', { nullable: true })
  description: string

  @Column('text', { nullable: true })
  picture: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  lastUpdated: Date

  @OneToMany(() => Developer, (dev) => dev.team)
  developers: Developer[]

  @ManyToOne(() => Editor)
  private registeredBy: Editor
}
