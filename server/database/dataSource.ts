import { DataSource } from 'typeorm'
import { Editor } from './entities/Editor'
import { Developer } from './entities/Developer'
import { Game } from './entities/Game'
import { Category } from './entities/Category'
import { Team } from './entities/Team'
import { DevToTech } from './entities/DevsToTechs'
import { Tech } from './entities/Techs'
import { Headline } from './entities/Headline'
import { Survey } from './entities/Survey'
import { ChoiceQuestion, Question } from './entities/Question'
import { Subscriptor } from './entities/Subscriptor'

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'test',
  entities: [
    Editor,
    Developer,
    Game,
    Category,
    Team,
    DevToTech,
    Tech,
    Headline,
    Survey,
    Question,
    Subscriptor,
    ChoiceQuestion,
  ],
  synchronize: true,
  logging: false,
})
