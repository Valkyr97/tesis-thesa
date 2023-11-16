import { Editor } from '~/server/database/entities/editor'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) return

  try {
    const editors = await Editor.findOneBy({
      id: Number(id),
    })
    return editors
  } catch (e) {
    console.log(e)
  }
})
