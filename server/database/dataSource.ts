import { DataSource } from 'typeorm'
import { Editor } from '../entities/editor'
import { Developer } from '../entities/developer'
import { Game } from '../entities/game'
import { Category } from '../entities/category'
import { Team } from '../entities/team'
import { DevToTech } from '../entities/devsToTechs'
import { Tech } from '../entities/techs'

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'test',
  entities: [Editor, Developer, Game, Category, Team, DevToTech, Tech],
  synchronize: true,
  logging: false,
})
