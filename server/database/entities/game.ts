//@ts-nocheck
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  BaseEntity,
} from 'typeorm'
import { Category } from './Category'
import { Editor } from './Editor'
import { Developer } from './Developer'

@Entity()
export class Game extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  name: string

  @Column('text', { nullable: true })
  description: string

  @Column('text', { nullable: true })
  demo: string

  @Column('text')
  downloadLink: string

  @Column('simple-array', { nullable: true })
  pictures: string[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  lastUpdated: Date

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[]

  @ManyToMany(() => Developer, (developer) => developer.games)
  @JoinTable()
  developers: Developer[]

  @ManyToOne(() => Editor)
  private registeredBy: Editor

  static findByCategories(categories: number[]) {
    return this.createQueryBuilder('game')
      .leftJoin('game.categories', 'category')
      .where('category.id IN (:...categories)', { categories })
      .groupBy('game.id')
      .having('COUNT(DISTINCT category.id) = :total', {
        total: categories.length,
      })
      .getMany()
  }
}
