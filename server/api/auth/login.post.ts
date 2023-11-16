import { Editor } from '~/server/database/entities/editor'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()

  try {
    const { email, password } = await readBody(event)

    if (!email || !password)
      throw createError({
        status: 400,
        message: 'Email y Password son requeridos',
      })

    const editor = await Editor.findOneByOrFail({
      email: email,
    })

    if (editor && (await bcrypt.compare(password, editor.password))) {
      const token = jwt.sign({ user_id: editor.id }, runtimeConfig.secret_key, {
        expiresIn: '2h',
      })
      return { editor, token }
    } else {
      throw createError({
        statusCode: 401,
        message: 'Email o Contraseña incorrecto',
      })
    }
  } catch (e: any) {
    console.log(e)
    throw createError({
      statusCode: e.statusCode || 500,
      message: e.message || 'Lo sentimos ha ocurrido un error'
    })
  }
})
