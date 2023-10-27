<script setup lang="ts">
definePageMeta({
  // middleware: 'oauth2',
  name: 'survey_list',
})

const keys = ['Encuesta']

const path = '/private/survey/form'

const handleDelete = () => {}

const data = computed(() => [])
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
