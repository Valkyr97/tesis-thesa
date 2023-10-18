//@ts-nocheck
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { State } from '../../enums/state'
import { DevToTech } from '../relations/DevsToTechs'

@Entity()
export class Tech {
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
