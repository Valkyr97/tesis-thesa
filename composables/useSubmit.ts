import { useToast } from 'vue-toastification'

export default function (path: string, id?: any) {
  const actualData = ref()
  const isLoading = useLoading()

  const toast = useToast()

  onBeforeMount(async () => {
    if (id) {
      const data = await $fetch(`${path}/${id}`)
      actualData.value = data
    }
  })

  const submit = async (value: any) => {
    isLoading.value = true
    if (id) {
      console.log(value)
      const response = await $fetch(`${path}/${id}`, {
        method: 'PUT',
        body: { ...value },
      })
    } else {
      const response = await $fetch(path, {
        method: 'POST',
        body: { ...value },
      })
    }
    toast.success('Operación realizada con éxito', { timeout: 1000 })
    isLoading.value = false
  }

  return {
    submit,
    actualData,
  }
}
