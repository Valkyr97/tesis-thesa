import jwt from 'jsonwebtoken'

const protectedPaths = [
  '/api/category',
  '/api/developer',
  '/api/game',
  '/api/headline',
  '/api/survey',
  '/api/team',
]

export default defineEventHandler((event) => {
  if (
    event.method !== 'GET' &&
    protectedPaths.some((path) => event.path.startsWith(path))
  ) {
    const runtimeConfig = useRuntimeConfig()
    const token = getRequestHeader(event, 'x-authorization-token')

    if (token) {
      const verifiedToken: any = jwt.verify(token, runtimeConfig.secret_key)
      event.context.user_id = verifiedToken?.user_id
    } else {
      throw createError({
        statusCode: 401,
        statusMessage: 'Not valid token',
      })
    }
  }
})
