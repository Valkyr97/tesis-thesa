<script setup lang="ts">


const { fetchNews, deleteNew } = useNews()

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
    :keys="keys"
    :tableRowsData="data"
    :onPlusClick="() => $router.push(path)"
    :actions="[
      {
        name: 'edit',
        icon: 'tools',
        iconColor: 'green-950',
        onAction: (id) => $router.push({ path, query: id }),
      },
      {
        name: 'delete',
        icon: 'trash',
        iconColor: 'red-950',
        onAction: handleDelete,
      },
    ]"
  />
</template>