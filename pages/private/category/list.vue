<script setup lang="ts">
//State
const { fetchCategories, deleteCategory } = useCategories()

const { data: categories, refresh } = await fetchCategories()

const { warningToast } = useWarningToast()

const keys = ['Categoría']

const path = '/private/category/form'

const data = computed(
  () => categories.value?.map((c) => ({ id: c.id, Categoría: c.name })) || []
)

const handleDelete = async (id: any) => {
  const name = categories.value?.find((c) => c.id === id)?.name

  warningToast('eliminar', {
    text: 'la categoría' + ' ' + name,
    onConfirm: async () => {
      await deleteCategory(id)
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
        iconColor: 'green',
        onAction: (id) => $router.push({ path, query: { id } }),
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
