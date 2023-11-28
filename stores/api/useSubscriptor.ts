import { useToast } from 'vue-toastification'

export default defineStore('api/subscriptor', () => {
  const uiStore = useUiStore()

  const { token } = useUserStore()

  const toast = useToast()

  const headers = {
    'x-authorization-token': `Bearer ${token}`,
  }

  const create = async (email: string) => {
    const { pending, ...response } = await useFetch('/api/subscriptor', {
      method: 'POST',
      headers,
      body: {
        email,
      },
    })

    watch(
      () => pending.value,
      (value) => {
        uiStore.isLoading = value
      }
    )

    return response
  }

  const fetchSubscriptors = async (query?: any) => {
    const response = await useFetch('/api/subscriptor', { query, headers })

    if (response.error.value || response.status.value === 'error') {
      toast.error('Lo sentimos ha ocurrido un error')
      console.log(response.error.value)
    }

    watch(
      () => response.status,
      (status) => {
        uiStore.setIsLoading(
          status.value === 'idle' || status.value === 'pending'
        )
      }
    )

    return response
  }

  const deleteSubscriptor = async (id: any, query?: any) => {
    const response = await useFetch(`/api/subscriptor/${id}`, {
      method: 'DELETE',
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
      toast.error('Lo sentimos ha ocurrido un error')
      console.log(response.error.value)
    } else if (response.status.value === 'success') {
      toast.success('Eliminado satisfactorio')
    }
    return response
  }

  return {
    create,
    fetchSubscriptors,
    deleteSubscriptor,
  }
})
