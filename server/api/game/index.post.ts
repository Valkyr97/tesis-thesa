import dataSource from '~/server/database/dataSource'
import { Game } from '~/server/entities/game'

export default defineEventHandler(async (event) => {
  try {
    const { categories, ...rest } = await readBody(event)

    const newGame = new Game()
    const manager = Game.getRepository()

    manager.merge(newGame, { ...rest })

    await newGame.save()

    await dataSource
      .createQueryBuilder()
      .relation(Game, 'categories')
      .of(newGame)
      .add(categories)
  } catch (e) {
    console.log(e)
  }
})
