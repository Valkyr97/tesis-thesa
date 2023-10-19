//@ts-nocheck
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  BaseEntity,
} from 'typeorm'
import { State } from '../enums/state'
import { DevToTech } from './devsToTechs'

@Entity()
export class Tech extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  name: string

  @Column({
    type: 'enum',
    enum: State,
    default: State.ACTIVE,
  })
  state: State

  @OneToMany(() => DevToTech, (devToTech) => devToTech.tech)
  public devToTech: DevToTech[]
}
