import { getForms } from "~/server/utils/survey"

export default defineEventHandler(async (event) => {
  const { skip, take } = getQuery(event)

  try {
    const { files } = await getForms()

    return files
  } catch (e: any) {
    console.log(e)
    throw createError({
      statusCode: e.status || e.statusCode || 400,
      message: e.message || 'Bad Request',
    })
  }
})
