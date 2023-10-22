import { Game } from '~/server/entities/game'
import { State } from '~/server/enums/state'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) return

  try {
    const games = await Game.findOne({
      where: { id: Number(id) },
      relations: {
        categories: true,
        developers: true,
      },
    })
    return games
  } catch (e) {
    console.log(e)
  }
})
