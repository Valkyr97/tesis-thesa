import { stringToHex } from './helpers'

const regex = /^ob-\d+/

export const formItems = [
  { name: 'Pregunta', type: 'questionItem', icon: 'add' },
  // { name: 'Grupo de Preguntas', type: 'questionGroupItem' },
  // { name: 'Salto de Página', type: 'pageBreakItem' },
  { name: 'Texto', type: 'textItem', icon: 'text' },
  // { name: 'Imagen', type: 'imageItem' },
  // { name: 'Video', type: 'videoItem' },
]

export const questionTypes = [
  {
    label: 'Escoja el tipo de pregunta',
    value: 0,
    attrs: { disabled: true, selected: true },
  },
  {
    label: 'Seleccionar una',
    value: { type: 'choiceQuestion', subtype: 'RADIO', paragraph: undefined },
  },
  {
    label: 'Marcar una o varias',
    value: {
      type: 'choiceQuestion',
      subtype: 'CHECKBOX',
      paragraph: undefined,
    },
  },
  {
    label: 'Texto corto',
    value: { type: 'textQuestion', paragraph: false, subtype: undefined },
  },
  {
    label: 'Texto largo',
    value: { type: 'textQuestion', paragraph: true, subtype: undefined },
  },
  {
    label: 'Escala',
    value: { type: 'scaleQuestion', subtype: undefined, paragraph: undefined },
  },
  {
    label: 'Fecha',
    value: { type: 'dateQuestion', subtype: undefined, paragraph: undefined },
  },
  {
    label: 'Hora',
    value: { type: 'timeQuestion', subtype: undefined, paragraph: undefined },
  },
  // { label: 'Subir archivos', value: { type: 'fileUploadQuestion' } },
]

export const obligatoryQuestions = [
  {
    title: 'Fecha de nacimiento',
    type: 'questionItem',
    id: 'ob-1',
    questionType: {
      type: 'dateQuestion',
      subtype: undefined,
      paragraph: undefined,
    },
    isRequired: false,
  },
  {
    title: 'Sexo',
    type: 'questionItem',
    id: 'ob-2',
    questionType: {
      type: 'choiceQuestion',
      subtype: 'RADIO',
      paragraph: undefined,
    },
    questionChoices: ['Masculino', 'Femenino', 'Otro', 'Prefiero no decirlo'],
    isRequired: true,
  },
  {
    title: 'Beneficios de jugar videojuegos',
    type: 'questionItem',
    id: 'ob-3',
    questionType: {
      type: 'choiceQuestion',
      subtype: 'CHECKBOX',
      paragraph: undefined,
    },
    questionChoices: [
      'Los videojuegos traen alegría al jugar',
      'Pueden inspirar a las personas',
      'Proveen estimulación mental',
      'Proveen alivio del estrés',
      'Ayudan a enseñar a los niños a aprender a ganar y a perder de una manera saludable',
      'Otro',
    ],
    isRequired: true,
  },
  {
    title: 'Con quien suele jugar',
    id: 'ob-4',
    type: 'questionItem',
    questionType: {
      type: 'choiceQuestion',
      subtype: 'CHECKBOX',
      paragraph: undefined,
    },
    questionChoices: [
      'Amigos',
      'Esposo/Esposa/Pareja',
      'Amigos en línea',
      'Hijos',
      'Padres',
      'Otro miembro de la familia',
    ],
    isRequired: true,
  },
  {
    title: 'Dispositivo favorito para jugar',
    id: 'ob-5',
    type: 'questionItem',
    questionType: {
      type: 'choiceQuestion',
      subtype: 'CHECKBOX',
      paragraph: undefined,
    },
    questionChoices: [
      'Celular',
      'Tablet',
      'Equipo de juego',
      'PC',
      'Dispositivos de realidad virtual',
    ],
    isRequired: true,
  },
  {
    title: 'Géneros favoritos',
    id: 'ob-6',
    type: 'questionItem',
    questionType: {
      type: 'choiceQuestion',
      subtype: 'CHECKBOX',
      paragraph: undefined,
    },
    questionChoices: [
      'Puzzles (ej. Tetris, Candy Crush)',
      'Arcade (ej. Pac-man, Super Mario)',
      'Habilidad y probabilidad (ej. Solitario, Bingo)',
      'Acción (ej. Zelda, Uncharted)',
      'Shooter (ej. Call of Duty, Halo)',
      'Simulación (ej. The Sims)',
      'RPG y Narrativa (ej. The Witcher, Skyrim)',
      'Estrategia (ej. Clash Royale, Imperio)',
      'Carreras y simulación de vehículos (ej. Forza, Microsoft flight simulator)',
      'Lucha (ej. Street Fighter, Super Smash Bros)',
      'Deportes (ej. FIFA, NBA 2k)',
    ],
    isRequired: true,
  },
  {
    title: 'Tiempo dedicado a Jugar',
    id: 'ob-7',
    type: 'questionItem',
    questionType: {
      type: 'choiceQuestion',
      subtype: 'RADIO',
      paragraph: undefined,
    },
    questionChoices: [
      'Una (1) a tres (3) horas por semana',
      'Más de tres (3) horas por semana',
      'Más de siete (7) horas por semana',
    ],
    scaleOptions: {},
    isRequired: true,
  },
]

export const defineRequest = (request: any, item?: any) => {
  if (item) item.position = item.position || request.position
  if (item && item.position === undefined) item.position = 0
  return request.isNew
    ? item
      ? defineAction(item)
      : {
          createItem: {
            item: {
              title: '',
              questionItem: {
                question: {
                  choiceQuestion: {
                    type: 'RADIO',
                    options: [
                      {
                        value: 'Opción 1',
                      },
                    ],
                  },
                },
              },
            },
            location: { index: 0 },
          },
        }
    : request.isUpdated
    ? {
        updateItem: item
          ? {
              item: {
                title: item.title,
                description: item.description,
                [item.type]: defineItemType(item),
              },
              location: { index: request.position },
              updateMask: [...(request.updateMask || [])]?.join(','),
            }
          : {
              item: {
                title: '',
                questionItem: {
                  question: {
                    choiceQuestion: {
                      type: 'RADIO',
                      options: [
                        {
                          value: 'Opción 1',
                        },
                      ],
                    },
                  },
                },
              },
              location: { index: request.position },
            },
      }
    : request
}

export const defineAction = (actionItem: any) => {
  switch (actionItem.action) {
    case 'deleteItem':
      return {
        deleteItem: {
          location: { index: actionItem.position },
        },
      }

    case 'moveItem':
      return {
        moveItem: {
          originalLocation: { index: actionItem.oldIndex },
          newLocation: { index: actionItem.newIndex },
        },
      }

    case 'updateItem':
      return {
        updateItem: {
          item: {
            title: actionItem.title,
            description: actionItem.description,
            [actionItem.type]: defineItemType(actionItem),
          },
          location: { index: actionItem.position },
          updateMask: [...(actionItem.updateMask || [])]?.join(','),
        },
      }

    default:
      return {
        createItem: {
          item: {
            title: actionItem.title,
            description: actionItem.description,
            [actionItem.type]: defineItemType(actionItem),
          },
          location: { index: actionItem.position },
        },
      }
  }
}

export const defineItemType = (f: any) => {
  switch (f.type) {
    case 'questionItem':
      return {
        question: {
          questionId: f.id && regex.test(f.id) ? stringToHex(f.id) : undefined,
          [f.questionType.type]: defineQuestionTypeItem(f),
          required: f.isRequired,
        },
      }
    case 'textItem':
      return {}
    default:
      break
  }
}

export const defineQuestionTypeItem = (f: any) => {
  switch (f.questionType.type) {
    case 'choiceQuestion':
      return {
        type: f.questionType.subtype,
        options:
          f.questionChoices?.map((q: string) => ({
            value: q,
          })) || [],
      }
    case 'textQuestion':
      return {
        paragraph: f.questionType.paragraph,
      }
    case 'scaleQuestion':
      return {
        low: f.scaleOptions.from,
        high: f.scaleOptions.to,
      }
    case 'dateQuestion':
      return {
        includeTime: false,
        includeYear: true,
      }
    case 'timeQuestion':
      return {
        duration: false,
      }

    default:
      break
  }
}

export const transformDataFromGoogleData = (originalData: any[]) => {
  return originalData.map((item: any) => {
    if (item.questionItem) {
      const { itemId, title, questionItem } = item
      const {
        question,
        question: { questionId, required },
      } = questionItem

      let questionType: string | undefined,
        questionChoices: string[] | undefined,
        questionSubtype: string | undefined,
        scaleOptions: { from: number; to: number } | undefined,
        paragraph: boolean | undefined

      if (questionItem.question.choiceQuestion) {
        questionType = 'choiceQuestion'
        questionSubtype = questionItem.question.choiceQuestion.type
        questionChoices = questionItem.question.choiceQuestion.options.map(
          (option: any) => option.value
        )
      } else if (questionItem.question.textQuestion) {
        questionType = 'textQuestion'
        paragraph = questionItem.question.textQuestion.paragraph
      } else if (questionItem.question.scaleQuestion) {
        questionType = 'scaleQuestion'
        scaleOptions = {
          from: questionItem.question.scaleQuestion.low,
          to: questionItem.question.scaleQuestion.high,
        }
      } else if (questionItem.question.dateQuestion) {
        questionType = 'dateQuestion'
      } else if (questionItem.question.timeQuestion) {
        questionType = 'timeQuestion'
      }

      return {
        type: 'questionItem',
        id: questionId,
        questionType: {
          type: questionType,
          subtype: questionSubtype,
          paragraph: paragraph !== undefined && paragraph,
        },
        isRequired: required,
        // questionId,
        questionChoices,
        scaleOptions,
        title,
      }
    } else if (item.textItem) {
      const { itemId, title, description } = item

      return {
        type: 'textItem',
        id: itemId,
        title,
        description,
      }
    }
  })
}

export const isObligatoryForm = (id: string) => {
  return regex.test(id) || regex.test(hexToString(id))
}
