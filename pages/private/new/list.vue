<script setup lang="ts">
import { fetchNews, deleteNew } from '~/api'

const { data: news, refresh } = await fetchNews()

const { warningToast } = useWarningToast()

const keys = ['Noticia', 'Fecha']

const path = '/private/new/form'

const data = computed(
  () =>
    news.value?.map((c) => ({
      id: c.id,
      Noticia: c.name,
      Fecha: c.lastUpdated,
    })) || []
)

const handleDelete = (id: any) => {
  warningToast('eliminar', {
    text: 'la noticia: ' + news.value?.find((h) => h.id === id)?.name,
    onConfirm: async () => {
      await deleteNew(id)
      await refresh()
    },
  })
}
</script>

<template>
  <TemplatesDynamicTable
    @delete="handleDelete"
    :keys="keys"
    :tableRowsData="data"
    :onPlusClick="() => $router.push(path)"
    :onRowClick="(id: any) => $router.push({ path, query: {id}})"
  />
</template>
