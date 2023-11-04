import { Editor } from '~/server/entities/editor'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()

  try {
    const { email, password } = await readBody(event)

    if (!email || !password) return

    const editor = await Editor.findOneByOrFail({
      email: email,
    })

    if (editor && (await bcrypt.compare(password, editor.password))) {
      const token = jwt.sign(
        { user_id: editor.id },
        runtimeConfig.secret_key,
        { expiresIn: '2h' }
      )
      return { editor, token }
    }
  } catch (e) {
    console.log(e)
  }
})
