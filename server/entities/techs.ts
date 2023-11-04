//@ts-nocheck
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  BaseEntity,
} from 'typeorm'
import { State } from '../enums/HeadlineType'
import { DevToTech } from './devsToTechs'

@Entity()
export class Tech extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  name: string

  @OneToMany(() => DevToTech, (devToTech) => devToTech.tech)
  public devToTech: DevToTech[]
}
