import { Editor } from '../../entities/editor'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    const newEditor = new Editor()
    const manager = Editor.getRepository()

    manager.merge(newEditor, { ...body })

    return await newEditor.save()
  } catch (e) {
    console.log(e)
  }
})
