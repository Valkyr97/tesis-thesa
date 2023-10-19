import { Category } from '~/server/entities/category'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    const newCategory = new Category()
    const manager = Category.getRepository()

    manager.merge(newCategory, { ...body })

    return await newCategory.save()
  } catch (e) {
    console.log(e)
  }
})
