<script setup lang="ts">

const route = useRoute()

const { id } = route.query

const { submit, actualData } = useSubmit('/api/developer', id)
</script>

<template>
  <FormKit :submit-label="id ? 'Actualizar' : 'Crear'" type="form" @submit="submit" v-model="actualData">
    <FormKit required label="Nombre" type="text" name="name" />
    <FormKit required label="Rol" type="text" name="role" />
    <FormKit label="Avatar" type="text" name="avatar" />
    <FormKit label="Teléfono" type="tel" name="phone" />
    <FormKit required label="Email" type="email" name="email" />
    <FormKit label="Dirección" type="text" name="address" />
    <!-- <FormKit label="abstract" type="textarea" name="abstract" /> -->
  </FormKit>
</template>
~/composables/useSubmit