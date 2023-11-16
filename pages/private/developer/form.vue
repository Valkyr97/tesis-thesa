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
    <div class="flex flex-wrap gap-x-8 lg:flex-row flex-col">
      <div class="flex-1">
        <FormKit placeholder="Antonio" required label="Nombre" type="text" name="name" />
        <FormKit
          required
          label="Rol en el equipo"
          placeholder="Project Manager"
          name="role"
          type="text"
        />
        <FormKit placeholder="https://picsum.photos/200" type="text" label="Link a la imagen de perfil" name="avatar" />
        <FormKit type="textarea" label="Resumen" auto-height />
      </div>
      <div class="flex-1">
        <FormKit placeholder="some@correo.com" label="Correo Electrónico" type="email" name="email" />
        <FormKit label="Número de teléfono" type="tel" name="phone" />
        <FormKit label="Dirección" type="textarea" auto-height name="address" />
      </div>
    </div>
  </FormKit>
</template>
