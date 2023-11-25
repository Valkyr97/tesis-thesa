import { Headline } from '~/server/database/entities/Headline'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    const newContent = new Headline()
    const manager = Headline.getRepository()

    manager.merge(newContent, { ...body })

    return await newContent.save()
  } catch (e: any) {
    console.log(e, e.message)
    throw createError({
      statusCode: 500,
      message: 'Error creating the Headline',
    })
  }
})
