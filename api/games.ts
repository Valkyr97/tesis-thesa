import { useToast } from 'vue-toastification'

const toast = useToast()

const isLoading = useLoading()

export const fetchGames = async (query?: any) => {
  const response = await useFetch('/api/game', { query })

  if (response.error.value || response.status.value === 'error') {
    toast.error('Lo sentimos ha ocurrido un error')
    console.log(response.error.value)
  }

  isLoading.value =
    response.status.value === 'idle' || response.status.value === 'pending'

  return response
}

export const fetchGame = async (id: any, query?: any) => {
  const response = await useFetch(`/api/game/${id}`, { query })

  if (response.error.value || response.status.value === 'error') {
    toast.error('Lo sentimos ha ocurrido un error')
    console.log(response.error.value)
  }

  isLoading.value =
    response.status.value === 'idle' || response.status.value === 'pending'

  return response
}

export const deleteGame = async (id: any, query?: any) => {
  const response = await useFetch(`/api/game/${id}`, {
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
