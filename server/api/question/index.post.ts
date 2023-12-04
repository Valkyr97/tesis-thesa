import { QuestionType } from '~/enums'
import {
  ChoiceQuestion,
  DateQuestion,
  Question,
  ScaleQuestion,
  TextQuestion,
  TimeQuestion,
} from '~/server/database/entities/Question'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    if (!body.questionId || !body.label || !body.type) {
      throw createError({
        statusCode: 400,
        message: 'Fields questionId, label and type are required',
      })
    }

    let manager
    let newQuestion

    switch (body.type) {
      case QuestionType.CHOICE:
        manager = ChoiceQuestion.getRepository()
        newQuestion = new ChoiceQuestion()
        break

      case QuestionType.DATE:
        manager = DateQuestion.getRepository()
        newQuestion = new DateQuestion()
        break

      case QuestionType.SCALE:
        manager = ScaleQuestion.getRepository()
        newQuestion = new ScaleQuestion()
        break

      case QuestionType.TEXT:
        manager = TextQuestion.getRepository()
        newQuestion = new TextQuestion()
        break

      case QuestionType.TIME:
        manager = TimeQuestion.getRepository()
        newQuestion = new TimeQuestion()
        break

      default:
        manager = Question.getRepository()
        newQuestion = new Question()
        break
    }

    if (!manager || !newQuestion) {
      throw createError({
        statusCode: 400,
      })
    }

    //@ts-ignore
    manager.merge(newQuestion, { ...body })

    return await newQuestion.save()
  } catch (e: any) {
    console.log(e, e.message)
    throw createError({
      statusCode: e.statusCode || 500,
      message: e.message || 'Error creating the Headline',
    })
  }
})
