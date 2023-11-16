import dataSource from '~/server/database/dataSource'
import { Survey } from '~/server/database/entities/survey'

export default defineEventHandler(async (event) => {
  try {
    const { formId, title } = await readBody(event)

    const survey = new Survey()

    survey.formId = formId
    survey.title = title

    await survey.save()

    await dataSource
      .createQueryBuilder()
      .relation(Survey, 'registeredBy')
      .of(survey)
      .set(event.context.user_id)

    return survey
  } catch (e) {
    console.log(e)
    throw createError({
      status: 500,
      message: 'Error creating the survey',
    })
  }
})
