import { Subscriptor } from '~/server/database/entities/subscriptor'

export default defineEventHandler(async (event) => {
  const { skip, take } = getQuery(event)

  try {
    const subscriptor = await Subscriptor.find({
      skip: typeof skip === 'number' ? skip : 0,
      take: typeof take === 'number' ? take : undefined,
    })
    return subscriptor
  } catch (e) {
    console.log(e)
  }
})
