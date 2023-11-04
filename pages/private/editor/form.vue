<script setup lang="ts">
const route = useRoute()

const { id } = route.query

const { submit, actualData } = useSubmit('/api/developer', id)
</script>

<template>
  <FormKit
    :submit-label="id ? 'Actualizar' : 'Crear'"
    type="form"
    @submit="submit"
    v-model="actualData"
  >
    <div class="flex flex-wrap gap-x-8 xl:flex-row flex-col">
      <div class="flex-1">
        <FormKit required label="Nombre" type="text" name="name" />
        <FormKit required label="Rol" type="text" name="role" />
        <FormKit label="Avatar" type="text" name="avatar" />
      </div>
      <div class="flex-1">
        <FormKit label="Teléfono" type="tel" name="phone" />
        <FormKit required label="Email" type="email" name="email" />
        <FormKit label="Dirección" type="text" name="address" />
      </div>
      <!-- <FormKit label="abstract" type="textarea" auto-height name="abstract" /> -->
    </div>
  </FormKit>
</template>
~/composables/useSubmit
