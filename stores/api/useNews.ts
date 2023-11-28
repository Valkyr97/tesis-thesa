import { useToast } from 'vue-toastification'
import { HeadlineType } from '~/enums'

export default defineStore('api/news', () => {
  const toast = useToast()

  const uiStore = useUiStore()

  const { token } = useUserStore()

  const headers = {
    'x-authorization-token': `Bearer ${token}`,
  }

  const fetchNews = async (query?: any) => {
    const response = await useFetch('/api/headline', {
      query: { type: HeadlineType.NEW, ...query },
      headers,
    })

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

  const deleteNew = async (id: any, query?: any) => {
    const response = await useFetch(`/api/headline/${id}`, {
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
    fetchNews,
    deleteNew,
  }
})
