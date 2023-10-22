<script setup lang="ts">
const route = useRoute()

const { id } = route.query

const { submit, actualData } = useSubmit('/api/category', id)
</script>

<template>
  <FormKit
    :submit-label="id ? 'Actualizar' : 'Crear'"
    type="form"
    @submit="submit"
    v-model="actualData"
  >
    <FormKit required type="text" name="name" label="Nombre de la Categoría" />
  </FormKit>
</template>
