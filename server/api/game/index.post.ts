import dataSource from '~/server/database/dataSource'
import { Game } from '~/server/database/entities/game'

export default defineEventHandler(async (event) => {
  try {
    const { categories, developers, ...rest } = await readBody(event)

    const newGame = new Game()
    const manager = Game.getRepository()

    manager.merge(newGame, { ...rest })

    await newGame.save()

    await dataSource
      .createQueryBuilder()
      .relation(Game, 'categories')
      .of(newGame)
      .add(categories)

    await dataSource
      .createQueryBuilder()
      .relation(Game, 'developers')
      .of(newGame)
      .add(
        developers.filter(
          (dev: number, i: number, arr: any) =>
            dev !== 0 && arr.indexOf(dev) === i
        )
      )
  } catch (e) {
    console.log(e)
  }
})
