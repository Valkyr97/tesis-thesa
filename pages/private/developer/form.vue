<script setup lang="ts">
const submit = async (value: any) => {
  const response = await $fetch('/api/developer', {
    method: 'post',
    body: { ...value },
  })
}
</script>

<template>
  <NuxtLayout>
    <FormKit type="form" @submit="submit">
      <FormKit required label="Nombre" type="text" name="name" />
      <FormKit required label="Rol" type="text" name="role" />
      <FormKit required label="Avatar" type="text" name="avatar" />
      <FormKit label="Teléfono" type="tel" name="phone" />
      <FormKit label="Email" type="email" name="email" />
      <FormKit label="Dirección" type="text" name="address" />
      <!-- <FormKit label="abstract" type="textarea" name="abstract" /> -->
    </FormKit>
  </NuxtLayout>
</template>
