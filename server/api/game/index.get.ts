import { In } from 'typeorm'
import { Game } from '~/server/entities/game'

export default defineEventHandler(async (event) => {
  const { skip, take, withCategories, withDevelopers, categories } =
    getQuery(event)

  try {
    return await Game.find({
      relations: {
        categories: typeof withCategories === 'boolean' ? withCategories : true,
        developers: typeof withDevelopers === 'boolean' ? withDevelopers : true,
      },
      skip: typeof skip === 'number' ? skip : 0,
      take: typeof take === 'number' ? take : undefined,
      where: {
        categories: categories
          ? Array.isArray(categories)
            ? { id: In(categories) }
            : { id: Number(categories) }
          : undefined,
      },
    })
  } catch (e) {
    console.log(e)
  }
})
