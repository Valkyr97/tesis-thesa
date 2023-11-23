import jwt from 'jsonwebtoken'

const protectedPaths = [
  '/api/category',
  '/api/developer',
  '/api/game',
  '/api/headline',
  '/api/survey',
  '/api/team',
  '/api/editor',
  '/api/auth/refresh-token',
]

export default defineEventHandler((event) => {
  if (
    event.method !== 'GET' &&
    protectedPaths.some((path) => event.path.startsWith(path))
  ) {
    try {
      const runtimeConfig = useRuntimeConfig()
      const token = getRequestHeader(event, 'x-authorization-token')?.split(
        ' '
      )[1]

      if (token) {
        const verifiedToken: any = jwt.verify(token, runtimeConfig.secret_key)
        event.context.user_id = verifiedToken?.user_id
      } else {
        throw createError({
          statusCode: 401,
          message: 'Invalid token',
        })
      }
    } catch (e: any) {
      console.log(e)
      throw createError({
        statusCode: e.statusCode || 500,
        message: e.message,
      })
    }
  }
})
