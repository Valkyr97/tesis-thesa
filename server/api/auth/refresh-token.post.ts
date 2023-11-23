import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  try {
    const runtimeConfig = useRuntimeConfig()

    const editorId = event.context.user_id
    const token = jwt.sign({ user_id: editorId }, runtimeConfig.secret_key, {
      expiresIn: '2h',
    })

    return {
      token,
    }
  } catch (e) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized',
    })
  }
})
