import { useToast } from 'vue-toastification'

export default (path: string) => {
  const toast = useToast()

  const uiStore = useUiStore()

  const { token } = useUserStore()

  const headers = {
    'x-authorization-token': `Bearer ${token}`,
  }

  const handleDeleteOne = async (id: any, query?: any) => {
    const response = await useFetch(`${path}/${id}`, {
      method: 'DELETE',
      query,
    })
    watch(
      () => response.status,
      (status) => {
        uiStore.setIsLoading(
          status.value === 'idle' || status.value === 'pending'
        )
      }
    )

    if (response.error.value || response.status.value === 'error') {
      toast.error('Lo sentimos ha ocurrido un error')
      console.log(response.error.value)
    } else if (response.status.value === 'success') {
      toast.success('Eliminado satisfactorio')
    }
    return response
  }

  const handleCreate = async (value: any, query?: any) => {
    const response = await useFetch(path, {
      method: 'POST',
      body: { ...value },
      query,
      headers,
    })
    watch(
      () => response.status,
      (status) => {
        uiStore.setIsLoading(
          status.value === 'idle' || status.value === 'pending'
        )
      }
    )

    console.log(response)

    if (response.error.value || response.status.value === 'error') {
      toast.error(
        response.error?.value?.data?.message ||
          'Lo sentimos ha ocurrido un error'
      )
      console.log(response.error.value)
    } else if (response.status.value === 'success') {
      toast.success('Creación completada')
    }
    return response
  }

  const handleUpdate = async (id: any, value: any, query?: any) => {
    const response = await useFetch(`${path}/${id}`, {
      method: 'PUT',
      body: { ...value },
      query,
      headers,
    })
    watch(
      () => response.status,
      (status) => {
        uiStore.setIsLoading(
          status.value === 'idle' || status.value === 'pending'
        )
      }
    )

    if (response.error.value || response.status.value === 'error') {
      toast.error(
        response.error?.value?.message || 'Lo sentimos ha ocurrido un error'
      )
      console.log(response.error.value)
    } else if (response.status.value === 'success') {
      toast.success('Actualización completada')
    }
    return response
  }

  return {
    handleDeleteOne,
    handleCreate,
    handleUpdate,
  }
}
