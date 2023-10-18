<script setup lang="ts">
const submit = async (value: any) => {
  const { body } = await $fetch('/api/developer', {
    method: 'post',
    body: { name: value.name, password: value.password },
  })
  console.log(body)
}
</script>

<template>
  <div>
    <FormKit type="form" @submit="submit">
      <FormKit type="text" name="name" />
      <FormKit type="text" name="password" />
    </FormKit>
  </div>
</template>
