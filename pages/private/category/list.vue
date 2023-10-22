<script setup lang="ts">
import { Category } from '~/server/entities/category'

const categories = ref<Partial<Category>[]>()

const fetchCategories = async () => {
  const response = await $fetch('/api/category')
  categories.value = response
}

const { warningToast } = useWarningToast()

const keys = ['Categoría']

const path = '/private/category/form'

const data = computed(
  () => categories.value?.map((c) => ({ id: c.id, Categoría: c.name })) || []
)

const handleDelete = async (id: any) => {
  const name = categories.value?.find((c) => c.id === id)?.name

  warningToast('eliminar', {
    text: 'la categoría: ' + name,
    onConfirm: async () => {
      await $fetch(`/api/category/${id}`, { method: 'DELETE' })
      await fetchCategories()
    },
  })
}

onMounted(() => fetchCategories())
</script>

<template>
  <TemplatesDynamicTable
    @delete="handleDelete"
    :keys="keys"
    :tableRowsData="data"
    :createRoute="path"
    :onRowClick="(id: any) => $router.push({ path, query: { id } })"
  />
</template>
