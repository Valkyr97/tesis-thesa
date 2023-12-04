export default defineStore('api/answers', () => {
  const answerInsights = ref()
  const relations = ref()
  const numericQuestionInsights = ref()

  const fetchData = async () => {
    const result = await useFetch('/api/survey/responses/data', {
      onResponse(context) {
        answerInsights.value = context.response._data.answerInsights
        relations.value = context.response._data.relations
        numericQuestionInsights.value =
          context.response._data.numericQuestionInsights
      },
    })

    if (!result.data.value) return result

    return result
  }

  // Age
  const ageAnswers =
    computed(() =>
      answerInsights.value?.filter(
        (answer: any) => answer.question.questionId === 'ob-0'
      )
    ) || []

  const ageInsights = computed(() =>
    numericQuestionInsights.value?.find(
      (a: any) => a.question.questionId == 'ob-0'
    )
  )

  const under18 = computed(() =>
    Number(
      (
        ageAnswers.value?.find((a: any) => a.answer == 'under_18')
          ?.percent as Number
      )?.toFixed(0)
    )
  )

  const over18 = computed(() => 100 - under18.value)
  const group18_34 = computed(() =>
    Number(
      (
        ageAnswers.value?.find((a: any) => a.answer == 'range_18_34')
          ?.percent as Number
      )?.toFixed(0)
    )
  )

  const group35_50 = computed(() =>
    Number(
      (
        ageAnswers.value?.find((a: any) => a.answer == 'range_35_50')
          ?.percent as Number
      )?.toFixed(0)
    )
  )

  const over50 = computed(() =>
    Number(
      (
        ageAnswers.value?.find((a: any) => a.answer == 'over_50')
          ?.percent as Number
      )?.toFixed(0)
    )
  )

  // Sex
  const sexAnswers = computed(() =>
    answerInsights.value?.filter(
      (answer: any) => answer.question.questionId === 'ob-1'
    )
  )

  const male = computed(() =>
    Number(
      sexAnswers.value?.find((a: any) => a.answer == 'Masculino')?.percent
    )?.toFixed(0)
  )

  const female = computed(() =>
    Number(
      sexAnswers.value?.find((a: any) => a.answer == 'Femenino')?.percent
    )?.toFixed(0)
  )

  // Game Generes
  const gameGenderAnswers = computed(() =>
    answerInsights.value?.filter(
      (answer: any) => answer.question.questionId === 'ob-5'
    )
  )

  // Benefits of play
  const benefitsOpinionAnswer = computed(() =>
    answerInsights.value?.filter(
      (answer: any) => answer.question.questionId === 'ob-2'
    )
  )

  const benefitsOpinionInsights = computed(() =>
    benefitsOpinionAnswer.value?.filter(
      (answer: any) =>
        answer.answer !== 'Ninguno de los anteriores' &&
        answer.answer !== 'Otro'
    )
  )

  const haveBenefitsOpinion = computed(() => {
    return benefitsOpinionAnswer.value?.reduce(
      (cumulativePercent: number, actualValue: any) => {
        if (
          actualValue.answer === 'Ninguno de los anteriores' ||
          actualValue.answer === 'Otro'
        ) {
          return cumulativePercent - actualValue.percent
        }
        return cumulativePercent
      },
      100
    )
  })

  // Devices
  const devicesAnswer = computed(() =>
    answerInsights.value?.filter(
      (answer: any) =>
        answer.question.questionId === 'ob-4' && answer.answer !== 'Otro'
    )
  )

  // Time of play
  const timeAnswer = computed(() =>
    answerInsights.value?.filter(
      (answer: any) => answer.question.questionId === 'ob-6'
    )
  )

  // Comunity answer
  const communityAnswer = computed(() =>
    answerInsights.value?.filter(
      (answer: any) => answer.question.questionId === 'ob-3'
    )
  )

  const communityAnswerInsights = computed(() =>
    communityAnswer.value?.filter(
      (answer: any) => answer.answer !== 'Solo' && answer.answer !== 'Otro'
    )
  )

  const improveRelationsOpinion = computed(() => {
    return communityAnswer.value?.reduce(
      (cumulativePercent: number, actualValue: any) => {
        if (
          actualValue.answer === 'Solo' ||
          actualValue.answer === 'Otro'
        ) {
          return cumulativePercent - actualValue.percent
        }
        return cumulativePercent
      },
      100
    )
  })

  return {
    fetchData,
    over18,
    under18,
    ageInsights,
    group18_34,
    group35_50,
    over50,
    answerInsights,
    relations,
    numericQuestionInsights,
    male,
    female,
    gameGenderAnswers,
    benefitsOpinionInsights,
    devicesAnswer,
    timeAnswer,
    haveBenefitsOpinion,
    communityAnswerInsights,
    improveRelationsOpinion,
  }
})
