import dataSource from '~/server/database/dataSource'
import { Game } from '~/server/database/entities/game'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')

    if (!id) {
      throw 'Id no válido'
    }

    const { categories, developers, ...body } = await readBody(event)

    await Game.update(id, body)

    const newGame = await Game.findOneOrFail({
      where: { id: Number(id) },
      relations: { categories: true, developers: true },
    })

    newGame.categories.splice(0)
    newGame.developers.splice(0)

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

    return newGame
  } catch (e) {
    console.log(e)
  }
})
