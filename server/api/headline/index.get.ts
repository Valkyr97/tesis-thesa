import { Headline } from '~/server/database/entities/headline'
import { HeadlineType } from '../../../utils/enums'

export default defineEventHandler(async (event) => {
  const { type, skip, take } = getQuery(event)

  const whereOptions =
    //@ts-ignore
    type && Object.values(HeadlineType).includes(type) ? { type: type } : {}

  try {
    const contents = await Headline.find({
      where: whereOptions,
      skip: typeof skip === 'number' ? skip : 0,
      take: typeof take === 'number' ? take : undefined,
    })
    return contents
  } catch (e) {
    console.log(e)
  }
})
