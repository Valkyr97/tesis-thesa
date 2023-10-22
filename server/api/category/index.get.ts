import { Category } from '~/server/entities/category'
import { State } from '~/server/enums/state'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  try {
    const categories = await Category.find({
      where: { state: State.ACTIVE },
    })
    return categories
  } catch (e) {
    console.log(e)
  }
})
