<script setup lang="ts">
import { useToast } from 'vue-toastification';

//State
const { fetchSubscriptors, deleteSubscriptor } = useSubscriptor()

const { data: subscriptor, refresh } = await fetchSubscriptors()

const { warningToast } = useWarningToast()

const toast = useToast()

const keys = ['Subscriptor']

const path = '/private/subscriptor/form'

const data = computed(
  () =>
    subscriptor.value?.map((c) => ({ id: c.id, Subscriptor: c.email })) || []
)

const handleDelete = async (id: any) => {
  const name = subscriptor.value?.find((c) => c.id === id)?.email

  warningToast('eliminar', {
    text: 'la categoría' + ' ' + name,
    onConfirm: async () => {
      await deleteSubscriptor(id)
      await refresh()
    },
  })
}

const handleSend = async (id: number) => {
  const {error, status} = await useFetch(`/api/subscriptor/send/${id}`)

  if(!error.value && status.value === 'success') {
    toast.success('Encuestas enviadas satisfactoriamente')
  } 
}
</script>

<template>
  <TemplatesDynamicTable
    :keys="keys"
    :tableRowsData="data"
    :onPlusClick="() => $router.push(path)"
    :actions="[
      {
        name: 'send',
        icon: 'email',
        onAction: (id) => handleSend(id),
      },
      {
        name: 'delete',
        icon: 'trash',
        iconColor: 'red',
        onAction: handleDelete,
      },
    ]"
  />
</template>
