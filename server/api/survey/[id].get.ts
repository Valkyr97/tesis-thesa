import { Survey } from '~/server/entities/survey'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) return

  try {
    const survey = await Survey.findOneBy({
      id: Number(id),
    })
    return survey
  } catch (e) {
    console.log(e)
  }
})
