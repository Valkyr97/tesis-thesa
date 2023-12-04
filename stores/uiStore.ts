import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', () => {
  const isLoading = ref<boolean>()

  const sending = new Set()

  const setIsLoading = (loading: boolean) => {
    isLoading.value = loading
  }

  return {
    isLoading,
    setIsLoading,
    sending,
  }
})
