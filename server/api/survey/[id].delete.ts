import { Survey } from '~/server/database/entities/survey'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) return

  try {
    const survey = await Survey.findOneByOrFail({
      id: Number(id),
    })

    survey.remove()

    return survey
  } catch (e) {
    console.log(e)
  }
})
