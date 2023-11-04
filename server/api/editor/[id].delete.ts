import { Editor } from '~/server/entities/editor'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) return

  try {
    const editor = await Editor.findOneByOrFail({
      id: Number(id),
    })

    editor.remove()

    return editor
  } catch (e) {
    console.log(e)
  }
})
