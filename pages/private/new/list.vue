<script setup lang="ts">
import { Headline } from '~/server/entities/headline'

const headlines = ref<Headline[]>()

const { warningToast } = useWarningToast()

const keys = ['Noticia', 'Fecha']

const path = '/private/new/form'

const data = computed(
  () =>
    headlines.value?.map((c) => ({
      id: c.id,
      Noticia: c.name,
      Fecha: c.lastUpdated,
    })) || []
)

const fetchHeadlines = async () => {
  headlines.value = await $fetch('/api/headline')
}

const handleDelete = (id: any) => {
  warningToast('eliminar', {
    text: 'la noticia: ' + headlines.value?.find((h) => h.id === id)?.name,
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
