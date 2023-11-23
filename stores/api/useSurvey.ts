import { useToast } from 'vue-toastification'

export default defineStore('api/survey', () => {
  const toast = useToast()

  const uiStore = useUiStore()

  const status = ref<any>()

  const { token } = useUserStore()

  const headers = {
    'x-authorization-token': `Bearer ${token}`,
  }

  const fetchSurveyById = async (
    formId: string,
    options?: {
      onResponse: (response?: any) => void
    }
  ) => {
    try {
      uiStore.isLoading = true

      const response = await useFetch(`/api/survey/${formId}`, {
        onResponse(response) {
          options?.onResponse(response)
        },
        headers,
      })

      uiStore.isLoading = false

      watch(
        () => response.pending.value,
        (value) => {
          uiStore.isLoading = value
        }
      )

      if (response.error.value || response.status.value === 'error') {
        throw response.error.value
      }

      return response
    } catch (e) {
      console.log(e)
      toast.error('Lo sentimos ha ocurrido un error')
      throw createError({
        statusCode: 400,
        message: 'Error obtaining the survey',
      })
    }
  }

  const createSurvey = async (title: string, requests: any[]) => {
    try {
      uiStore.isLoading = true

      const {
        error: createFormError,
        data: createFormData,
        status: createFormStatus,
      } = await useFetch('/api/survey', {
        method: 'POST',
        headers,
        body: {
          title,
          document_title: title,
        },
      })

      if (createFormError.value || createFormStatus.value === 'error') {
        toast.error('Lo sentimos ha ocurrido un error')
        console.log(createFormError.value)
        throw createError({
          statusCode:
            createFormError.value?.status ||
            createFormError.value?.statusCode ||
            400,
          message: createFormError.value?.message || 'error',
        })
      }

      //@ts-ignore
      const id = createFormData.value?.formId

      if (!id)
        throw createError({
          statusCode: 401,
          message: 'Not id in the created Form',
        })

      const response = await useFetch(`/api/survey/${id}`, {
        method: 'PUT',
        headers,
        body: {
          requests,
        },
      })

      watch(
        () => response.pending.value,
        (value) => {
          uiStore.isLoading = value
        }
      )

      if (response.error.value || response.status.value === 'error') {
        throw response.error
      } else if (response.status.value === 'success') {
        toast.success('Encuesta creada satisfactoriamente')
      }

      return response
    } catch (e) {
      console.log('error: ', e)
      toast.error(
        'Lo sentimos ha ocurrido un error en la creación de la encuesta'
      )
    } finally {
      uiStore.isLoading = false
    }
  }

  const updateSurvey = async (formId: any, requests: any[], query?: any) => {
    try {
      uiStore.isLoading = true

      if (requests.length === 0) {
        toast.success('Encuesta actualizada satisfactoriamente')
        uiStore.isLoading = false
        return
      }

      const response = await useFetch(`/api/survey/${formId}`, {
        method: 'PUT',
        headers,
        body: {
          requests,
        },
      })

      watch(
        () => response.pending.value,
        (value) => {
          uiStore.isLoading = value
        }
      )

      if (response.error.value || response.status.value === 'error') {
        throw response.error.value
      } else if (response.status.value === 'success') {
        toast.success('Encuesta actualizada satisfactoriamente')
        return response
      }
    } catch (e) {
      console.log(e)
      toast.error('Lo sentimos ha ocurrido un error al actualizar la encuesta')
    } finally {
      uiStore.isLoading = false
    }
  }

  const fetchSurveyList = async () => {
    uiStore.isLoading = true

    const response = await useFetch('/api/survey', { headers })

    if (response.error.value || response.status.value === 'error') {
      toast.error('Lo sentimos ha ocurrido un error')
      console.log(response.error.value)
    }

    uiStore.isLoading = false

    return response
  }

  const deleteSurvey = async (id: string) => {
    const response = await useFetch(`/api/survey/${id}`, {
      method: 'DELETE',
      headers,
    })
    if (response.error.value || response.status.value === 'error') {
      toast.error('Lo sentimos ha ocurrido un error')
      console.log(response.error.value)
    } else if (response.status.value === 'success') {
      toast.success('Encuesta eliminada satisfactoriamente')
    }

    return response
  }

  const fetchSurveyResponses = async (id: string) => {
    try {
      uiStore.isLoading = true

      const response = await useFetch(`/api/survey/responses/${id}`, {
        headers,
      })

      uiStore.isLoading = false

      watch(
        () => response.pending.value,
        (value) => {
          uiStore.isLoading = value
        }
      )

      if (response.error.value || response.status.value === 'error') {
        throw response.error.value
      }

      return response
    } catch (e) {
      console.log(e)
      toast.error('Lo sentimos ha ocurrido un error')
      throw createError({
        statusCode: 400,
        message: 'Error obtaining the survey responses',
      })
    }
  }

  return {
    updateSurvey,
    createSurvey,
    fetchSurveyById,
    fetchSurveyList,
    fetchSurveyResponses,
    deleteSurvey,
    status,
  }
})
