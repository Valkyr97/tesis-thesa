//@ts-nocheck
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm'
import { Developer } from '../developers/developer.entity'
import { Tech } from '../techs/techs.entity'

@Entity()
export class DevToTech {
  @PrimaryGeneratedColumn()
  id: number

  @Column('float')
  domainPercent: number

  @Column('int')
  public developerId: number

  @Column('int')
  public techId: number

  @ManyToOne(() => Developer, (dev) => dev.devToTech)
  public developer: Developer

  @ManyToOne(() => Tech, (tech) => tech.devToTech)
  public tech: Tech
}
