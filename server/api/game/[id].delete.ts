import { Game } from '~/server/database/entities/Game'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) return

  try {
    const game = await Game.findOneByOrFail({
      id: Number(id),
    })

    game.remove()
    
    return game
  } catch (e) {
    console.log(e)
  }
})
