import { Headline } from '~/server/entities/headline'
import { State } from '~/server/enums/state'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  try {
    const contents = await Headline.find({
      where: { state: State.ACTIVE },
    })
    return contents
  } catch (e) {
    console.log(e)
  }
})
