import { Editor } from '~/server/database/entities/Editor'

export default defineEventHandler(async (event) => {
  const { skip, take } = getQuery(event)

  try {
    const editors = await Editor.find({
      skip: typeof skip === 'number' ? skip : 0,
      take: typeof take === 'number' ? take : undefined,
    })
    return editors
  } catch (e) {
    console.log(e)
  }
})
