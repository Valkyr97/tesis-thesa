import { useToast } from 'vue-toastification'

export default (path: string) => {
  const toast = useToast()

  const isLoading = useLoading()

  const handleFetchMany = async (query?: any) => {
    const response = await useFetch(path, { query })

    isLoading.value =
      response.status.value === 'idle' || response.status.value === 'pending'

    if (response.error.value || response.status.value === 'error') {
      toast.error('Lo sentimos ha ocurrido un error')
      console.log(response.error.value)
    }
    return response
  }

  const handleFetchOne = async (id: any, query?: any) => {
    const response = await useFetch(`${path}/${id}`, { query })
    isLoading.value =
      response.status.value === 'idle' || response.status.value === 'pending'

    if (response.error.value || response.status.value === 'error') {
      toast.error('Lo sentimos ha ocurrido un error')
      console.log(response.error.value)
    }
    return response
  }

  const handleDeleteOne = async (id: any, query?: any) => {
    const response = await useFetch(`${path}/${id}`, {
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

  const handleCreate = async (value: any, query?: any) => {
    const response = await useFetch(path, {
      method: 'POST',
      body: { ...value },
      query,
    })
    isLoading.value =
      response.status.value === 'idle' || response.status.value === 'pending'

    if (response.error.value || response.status.value === 'error') {
      toast.error('Lo sentimos ha ocurrido un error')
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
    })
    isLoading.value =
      response.status.value === 'idle' || response.status.value === 'pending'

    if (response.error.value || response.status.value === 'error') {
      toast.error('Lo sentimos ha ocurrido un error')
      console.log(response.error.value)
    } else if (response.status.value === 'success') {
      toast.success('Actualización completada')
    }
    return response
  }

  return {
    handleFetchMany,
    handleFetchOne,
    handleDeleteOne,
    handleCreate,
    handleUpdate,
  }
}
