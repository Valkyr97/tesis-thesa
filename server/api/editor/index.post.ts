import { Editor } from '../../database/entities/editor'
import bcrypt from 'bcrypt'

export default defineEventHandler(async (event) => {
  try {
    const { email, password, name } = await readBody(event)

    const exist = await Editor.findOneBy({
      email,
    })

    if (exist)
      throw createError({
        statusCode: 400,
        statusMessage: 'El Email ya está en uso',
      })

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const newEditor = new Editor()
    newEditor.email = email
    newEditor.password = hash
    newEditor.name = name

    await newEditor.save()
  } catch (e: any) {
    console.log(e)
    throw createError({
      statusCode: e.statusCode || 500,
      message: e.statusMessage || 'Lo sentimos ha ocurrido un error',
    })
  }
})
