<script setup lang="ts">
const route = useRoute()

const { id } = route.query

const { submit, actualData } = useSubmit('/api/subscriptor', id)
</script>

<template>
  <FormKit
    :submit-label="id ? 'Actualizar' : 'Crear'"
    type="form"
    @submit="submit"
    v-model="actualData"
  >
    <FormKit
      outer-class="max-w-lg"
      required
      type="email"
      name="email"
      label="Correo del Subscriptor"
      placeholder="some@mail.com"
    />
  </FormKit>
</template>
