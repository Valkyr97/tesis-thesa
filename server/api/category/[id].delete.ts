import { Category } from '~/server/database/entities/category'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) return

  try {
    const category = await Category.findOneByOrFail({
      id: Number(id),
    })

    category.remove()

    return category
  } catch (e) {
    console.log(e)
  }
})
