import { Game } from '~/server/entities/game'
import { State } from '~/server/enums/state'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  try {
    const games = await Game.find({
      relations: {
        categories: !!query.categories,
      },
      where: {
        state: State.ACTIVE,
      },
    })
    return games
  } catch (e) {
    console.log(e)
  }
})
