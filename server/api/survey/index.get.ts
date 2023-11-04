import { Survey } from '~/server/entities/survey'

export default defineEventHandler(async (event) => {
  const { skip, take } = getQuery(event)

  try {
    const surveys = await Survey.find({
      skip: typeof skip === 'number' ? skip : 0,
      take: typeof take === 'number' ? take : undefined,
    })
    return surveys
  } catch (e) {
    console.log(e)
  }
})
