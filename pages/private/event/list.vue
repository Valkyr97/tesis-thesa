<script setup lang="ts">
import { Headline } from '~/server/entities/headline'

const { warningToast } = useWarningToast()

const headlines = ref<Headline[]>()

const keys = ['Evento', 'Fecha']

const path = '/private/event/form'

const data = computed(
  () =>
    headlines.value?.map((c) => ({
      id: c.id,
      Evento: c.name,
      Fecha: c.date,
    })) || []
)

const fetchHeadlines = async () => {
  headlines.value = await $fetch('/api/headline')
}

const handleDelete = (id: any) => {
  warningToast('eliminar', {
    text: 'el evento: ' + headlines.value?.find((h) => h.id === id)?.name,
    onConfirm: async () => {
      await $fetch(`/api/headline/${id}`, { method: 'DELETE' })
      await fetchHeadlines()
    },
  })
}

onMounted(() => fetchHeadlines())
</script>

<template>
  <TemplatesDynamicTable
    @delete="handleDelete"
    :keys="keys"
    :tableRowsData="data"
    :createRoute="path"
    :onRowClick="(id: any) => $router.push({ path, query: {id}})"
  />
</template>
