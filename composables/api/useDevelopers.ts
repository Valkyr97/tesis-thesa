import { useToast } from 'vue-toastification'

export default () => {
  const toast = useToast()

  const isLoading = useLoading()

  const fetchDevelopers = async (query?: any) => {
    const response = await useFetch('/api/developer', { query })

    if (response.error.value || response.status.value === 'error') {
      toast.error('Lo sentimos ha ocurrido un error')
      console.log(response.error.value)
    }

    isLoading.value =
      response.status.value === 'idle' || response.status.value === 'pending'

    return response
  }

  const deleteDeveloper = async (id: any, query?: any) => {
    const response = await useFetch(`/api/developer/${id}`, {
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

  return {
    fetchDevelopers,
    deleteDeveloper,
  }
}
