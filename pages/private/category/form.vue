<script setup lang="ts">
const submit = async (value: any) => {
  const response = await $fetch('/api/category', {
    method: 'post',
    body: { ...value },
  })
}
</script>

<template>
  <NuxtLayout>
    <FormKit type="form" @submit="submit">
      <FormKit type="text" name="name" label="name" />
    </FormKit>
  </NuxtLayout>
</template>
