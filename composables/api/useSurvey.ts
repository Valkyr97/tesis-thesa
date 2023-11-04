import { useToast } from 'vue-toastification'

export default () => {
  const toast = useToast()

  const isLoading = useLoading()

  const createFormInGoogle = async (title: string) => {
    const params = JSON.parse(localStorage.getItem('oauth2-params') || '')

    const response = await useFetch('https://forms.googleapis.com/v1/forms', {
      method: 'POST',
      body: {
        info: {
          title: title,
          document_title: title,
        },
      },
      headers: {
        Authorization: `Bearer ${params['access_token']}`,
      },
    })

    isLoading.value =
      response.status.value === 'idle' || response.status.value === 'pending'

    if (!response.error.value && response.status.value === 'success') {
      //@ts-ignore
      // return saveToDb(data.value.formId, title)
      // toast.success('Success')
    } else {
      toast.error('Ha ocurrido un error al crear el formulario con google')
      console.log(response.error.value)
    }

    return response
  }

  const updateFormInGoogle = async (
    formId: any,
    requests: any[],
    query?: any
  ) => {
    const params = JSON.parse(localStorage.getItem('oauth2-params') || '')

    const response = await useFetch(
      `https://forms.googleapis.com/v1/forms/${formId}:batchUpdate`,
      {
        method: 'POST',
        body: {
          requests,
        },
        headers: {
          Authorization: `Bearer ${params['access_token']}`,
        },
      }
    )

    isLoading.value =
      response.status.value === 'idle' || response.status.value === 'pending'

    if (response.error.value || response.status.value === 'error') {
      toast.error('Ha ocurrido un error al crear el formulario con google')
      console.log(response.error.value)
    }

    return response
  }

  const fetchSurveyByIdFromGoogle = async (
    formId: string,
    options?: {
      onResponse: (response?: any) => void
    }
  ) => {
    const params = JSON.parse(localStorage.getItem('oauth2-params') || '')

    const response = await useFetch(
      `https://forms.googleapis.com/v1/forms/${formId}`,
      {
        headers: {
          Authorization: `Bearer ${params['access_token']}`,
        },
        onResponse(response) {
          options?.onResponse(response)
        },
      }
    )

    if (response.error.value || response.status.value === 'error') {
      toast.error('Lo sentimos ha ocurrido un error')
      console.log(response.error.value)
    }

    isLoading.value =
      response.status.value === 'idle' || response.status.value === 'pending'

    return response
  }

  const deleteFormInGoogle = async (formId: string) => {
    const params = JSON.parse(localStorage.getItem('oauth2-params') || '')

    const uri = `https://www.googleapis.com/drive/v3/files/${formId}`

    const response = await useFetch(uri, {
      headers: {
        Authorization: `Bearer ${params['access_token']}`,
      },
    })

    if (response.error.value || response.status.value === 'error') {
      toast.error('Lo sentimos ha ocurrido un error')
      console.log(response.error.value)
    }

    isLoading.value =
      response.status.value === 'idle' || response.status.value === 'pending'

    return response
  }

  const saveToDb = async (formId: string, title: string) => {
    const response = await useFetch('/api/survey', {
      method: 'POST',
      body: {
        formId,
        title,
      },
    })

    if (response.error.value || response.status.value === 'error') {
      toast.error(
        'Lo sentimos ha ocurrido un error al guardar la encuesta en nuestra base de datos'
      )
      console.log(response.error.value)
    }

    isLoading.value =
      response.status.value === 'idle' || response.status.value === 'pending'

    return response
  }

  const fetchSurveysFromDb = async (query?: any) => {
    const response = await useFetch('/api/survey', { query })

    if (response.error.value || response.status.value === 'error') {
      toast.error('Lo sentimos ha ocurrido un error')
      console.log(response.error.value)
    }

    isLoading.value =
      response.status.value === 'idle' || response.status.value === 'pending'

    return response
  }

  const fetchSurveyByIdFromDb = async (id: number, query?: any) => {
    const response = await useFetch(`/api/survey/${id}`, { query })

    if (response.error.value || response.status.value === 'error') {
      toast.error('Lo sentimos ha ocurrido un error')
      console.log(response.error.value)
    }

    isLoading.value =
      response.status.value === 'idle' || response.status.value === 'pending'

    return response
  }

  const deleteSurveyFromDb = async (id: number, query?: any) => {
    const response = await useFetch(`/api/survey/${id}`, {
      method: 'DELETE',
      query,
    })

    isLoading.value =
      response.status.value === 'idle' || response.status.value === 'pending'

    if (response.error.value || response.status.value === 'error') {
      toast.error('Lo sentimos ha ocurrido un error')
      console.log(response.error.value)
    } else if (response.status.value === 'success') {
      toast.success('Eliminado satisfactorio')
    }
    return response
  }

  const createSurvey = async (title: string, requests: any) => {
    const {
      data: createData,
      error: createError,
      status: createStatus,
    } = await createFormInGoogle(title)
    if (
      createError.value ||
      createStatus.value === 'error' ||
      //@ts-ignore
      !createData.value?.formId
    )
      return

    const {
      data: updateData,
      error: updateError,
      status: updateStatus,
    } = await updateFormInGoogle(
      //@ts-ignore
      createData.value.formId,
      requests
    )

    if (updateError.value || updateStatus.value === 'error') return

    const response = await saveToDb(
      //@ts-ignore
      createData.value.formId,
      title
    )

    if (response.error.value || response.status.value === 'error') return

    toast.success('Encuesta creada satisfactoriamente', { timeout: 1500 })

    return response
  }

  const fetchSurveyById = async (
    id: number,
    options?: {
      onResponseCallback: (response?: any) => void
    }
  ) => {
    const {
      data: dbData,
      error: dbError,
      status: dbStatus,
    } = await fetchSurveyByIdFromDb(id)

    if (dbError.value || dbStatus.value === 'error' || !dbData.value?.formId)
      return

    const response = await fetchSurveyByIdFromGoogle(
      dbData.value.formId,
      options?.onResponseCallback && {
        onResponse: options?.onResponseCallback,
      }
    )

    if (response.error.value || response.status.value === 'error') return

    return response
  }

  const deleteSurvey = async (id: number) => {
    const {
      data: dbData,
      error: dbError,
      status: dbStatus,
    } = await fetchSurveyByIdFromDb(id)

    if (dbError.value || dbStatus.value === 'error' || !dbData.value?.formId)
      return

    const {
      data: googleDeleteData,
      error: googleDeleteError,
      status: googleDeleteStatus,
    } = await deleteFormInGoogle(dbData.value.formId)

    if (googleDeleteError.value || googleDeleteStatus.value === 'error') return

    const response = await deleteSurveyFromDb(id)

    if (response.error.value || response.status.value === 'error') return

    return response
  }

  return {
    createFormInGoogle,
    saveToDb,
    fetchSurveysFromDb,
    updateFormInGoogle,
    createSurvey,
    fetchSurveyByIdFromDb,
    fetchSurveyByIdFromGoogle,
    fetchSurveyById,
    deleteSurveyFromDb,
    deleteFormInGoogle,
    deleteSurvey,
  }
}
