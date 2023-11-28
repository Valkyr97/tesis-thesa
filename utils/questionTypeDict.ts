import { QuestionType } from '~/enums'

export const questionTypeToGoogleQuestionType = {
  [QuestionType.CHOICE]: 'choiceQuestion',
  [QuestionType.DATE]: 'dateQuestion',
  [QuestionType.SCALE]: 'scaleQuestion',
  [QuestionType.TEXT]: 'textQuestion',
  [QuestionType.TIME]: 'timeQuestion',
}
