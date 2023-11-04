<script setup lang="ts">
import useCategories from '~/composables/api/useCategories'

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
    @delete="handleDelete"
    :keys="keys"
    :tableRowsData="data"
    :onPlusClick="() => $router.push(path)"
    :onEditClick="(id: any) => $router.push({ path, query: { id } })"
  />
</template>
