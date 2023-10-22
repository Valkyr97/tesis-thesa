import { Headline } from '~/server/entities/headline'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    const newContent = new Headline()
    const manager = Headline.getRepository()

    manager.merge(newContent, { ...body })

    return await newContent.save()
  } catch (e) {
    console.log(e)
  }
})
