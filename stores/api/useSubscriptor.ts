export default defineStore('api/subscriptor', () => {
  const uiStore = useUiStore()

  const create = async (email: string) => {
    const { pending, ...response } = await useFetch('/api/subscriptor', {
      method: 'POST',
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

  return {
    create,
  }
})
