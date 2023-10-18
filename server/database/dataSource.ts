import { DataSource } from 'typeorm'
import { Editor } from '../modules/editors/editor.entity'
import { Developer } from '../modules/developers/developer.entity'
import { Game } from '../modules/games/game.entity'
import { Category } from '../modules/categories/category.entity'
import { Team } from '../modules/teams/team.entity'
import { DevToTech } from '../modules/relations/DevsToTechs'
import { Tech } from '../modules/techs/techs.entity'

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
