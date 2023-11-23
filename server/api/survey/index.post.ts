import { createForm } from '~/server/utils/survey'

export default defineEventHandler(async (event) => {
  try {
    const { title, document_title } = await readBody(event)

    const editor = event.context.user_id

    if (!editor) {
      throw createError({
        statusCode: 401,
        message: 'Not valid editor',
      })
    }

    // await useServiceOAuthLogin()

    const response = await createForm(title, document_title)

    return response
    // const survey = new Survey()

    // survey.formId = formId
    // survey.title = title

    // await survey.save()

    // await dataSource
    //   .createQueryBuilder()
    //   .relation(Survey, 'registeredBy')
    //   .of(survey)
    //   .set(editor)

    // return survey
  } catch (e: any) {
    console.log(e)
    throw createError({
      statusCode: e.statusCode || 500,
      message: e.message || 'Error creating the survey',
    })
  }
})
