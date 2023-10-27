import { Headline } from '~/server/entities/headline'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) return

  try {
    const headline = await Headline.findOneByOrFail({
      id: Number(id),
    })

    headline.remove()

    return headline
  } catch (e) {
    console.log(e)
  }
})
