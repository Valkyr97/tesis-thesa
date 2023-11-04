import dataSource from '~/server/database/dataSource'
import { Survey } from '~/server/entities/survey'

export default defineEventHandler(async (event) => {
  try {
    const { formId, title } = await readBody(event)

    const survey = new Survey()

    survey.formId = formId
    survey.title = title

    await dataSource
      .createQueryBuilder()
      .relation(Survey, 'registeredBy')
      .of(survey)
      .add(event.context.user_id)

    return await survey.save()
  } catch (e) {
    console.log(e)
  }
})
