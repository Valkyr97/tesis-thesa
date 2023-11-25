import { Category } from '~/server/database/entities/Category'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) return

  try {
    const category = await Category.findOneBy({
      id: Number(id),
    })
    return category
  } catch (e) {
    console.log(e)
  }
})
