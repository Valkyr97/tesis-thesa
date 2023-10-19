import { Category } from '~/server/entities/category'
import { State } from '~/server/enums/state'

export default defineEventHandler(async (event) => {
  try {
    const categories = await Category.findBy({ state: State.ACTIVE })
    return categories
  } catch (e) {
    console.log(e)
  }
})
