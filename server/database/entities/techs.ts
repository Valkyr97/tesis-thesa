//@ts-nocheck
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  BaseEntity,
} from 'typeorm'
import { DevToTech } from './DevsToTechs'

@Entity()
export class Tech extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  name: string

  @OneToMany(() => DevToTech, (devToTech) => devToTech.tech)
  public devToTech: DevToTech[]
}
