import { ChoiceQuestion, Question } from '~/server/database/entities/Question'

export default defineStore('api/question', () => {
  const { token } = useUserStore()

  const headers = {
    'x-authorization-token': `Bearer ${token}`,
  }

  const getObligatoryQuestions = (options?: {
    onResponse: (response?: any) => void
  }) => {
    return useFetch<(Question & ChoiceQuestion)[]>('/api/question', {
      query: {
        obligatoryQuestion: true,
      },
      headers,
      onResponse(response) {
        options?.onResponse(response.response._data)
      },
    })
  }

  return {
    getObligatoryQuestions,
  }
})
