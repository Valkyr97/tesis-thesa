import { useToast } from 'vue-toastification'

export default defineStore('api/categories', () => {
  const toast = useToast()

  const { token } = useUserStore()

  const headers = {
    'x-authorization-token': `Bearer ${token}`,
  }

  const uiStore = useUiStore()

  const fetchCategories = async (query?: any) => {
    const response = await useFetch('/api/category', { query, headers })

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

  const deleteCategory = async (id: any, query?: any) => {
    const response = await useFetch(`/api/category/${id}`, {
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
    fetchCategories,
    deleteCategory,
  }
})
