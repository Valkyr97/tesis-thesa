import { Developer } from '~/server/entities/developer'
import { State } from '~/server/enums/state'

export default defineEventHandler(async (event) => {
  try {
    const developers = await Developer.find({
      relations: { team: true },
      where: { state: State.ACTIVE },
    })
    return developers
  } catch (e) {
    console.log(e)
  }
})
