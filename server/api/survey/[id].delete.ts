import { deleteForm } from "~/server/utils/survey"

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({
      statusCode: 400,
      message: 'ID Required',
    })
  }

  try {
    const response = await deleteForm(id)
    // const survey = await Survey.findOneByOrFail({
    //   id: Number(id),
    // })

    // survey.remove()

    return response
  } catch (e: any) {
    console.log(e)
    throw createError({
      statusCode: e.statusCode || e.status || 400,
      message: e.message || 'Eror deleting survey',
    })
  }
})
