import { Category } from '~/server/entities/category'

export default defineEventHandler(async (event) => {
  const { skip, take, select } = getQuery(event)

  const selectOptions =
    Array.isArray(select) && select.every((e) => typeof e === 'string')
      ? Object.keys(Category).reduce(
          (selectedOptions, key) => ({
            ...selectedOptions,
            [key]: select.includes(key),
          }),
          {}
        )
      : undefined

  try {
    const categories = await Category.find({
      skip: typeof skip === 'number' ? skip : 0,
      take: typeof take === 'number' ? take : undefined,
      select: selectOptions,
    })
    return categories
  } catch (e) {
    console.log(e)
  }
})
