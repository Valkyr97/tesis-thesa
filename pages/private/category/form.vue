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
    <FormKit outer-class="max-w-lg" required type="text" name="name" label="Nombre del Género" placeholder="Acción" />
  </FormKit>
</template>
