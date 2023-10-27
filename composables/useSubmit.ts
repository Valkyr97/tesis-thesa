import { useToast } from 'vue-toastification'

export default function (path: string, id?: any) {
  const actualData = ref()
  const { handleCreate, handleUpdate } = useApi(path)

  onBeforeMount(async () => {
    if (id) {
      const { data } = await useFetch(`${path}/${id}`)
      actualData.value = data.value
    }
  })

  const submit = async (value: any) => {
    if (id) {
      return handleUpdate(id, value)
    } else {
      return handleCreate(value)
    }
  }

  return {
    submit,
    actualData,
  }
}
