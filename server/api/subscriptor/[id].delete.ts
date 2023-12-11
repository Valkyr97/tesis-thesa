import { Subscriptor } from '~/server/database/entities/Subscriptor'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) return

  try {
    const subscriptor = await Subscriptor.findOneByOrFail({
      id: Number(id),
    })

    subscriptor.remove()

    return subscriptor
  } catch (e: any) {
    console.log(e)
    throw createError({
      statusCode: e.statusCode || e.code || e.status || 500,
      message: e.message || 'Ha ocurrido un error al intentar eliminar el subscriptor'
    })
  }
})
