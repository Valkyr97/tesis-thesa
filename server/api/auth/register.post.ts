import bcrypt from 'bcrypt'
import { Editor } from '~/server/entities/editor'

export default defineEventHandler(async (event) => {
  try {
    const { email, password } = await readBody(event)

    if (!email || !password) return

    const exist = await Editor.findOneBy({
      email,
    })

    if (exist) return

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const newEditor = new Editor()
    newEditor.email = email
    newEditor.password = hash
    await newEditor.save()
  } catch (e) {
    console.log(e)
  }
  return {
    hello: 'World',
  }
})
