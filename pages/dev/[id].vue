<script setup lang="ts">
const route = useRoute()
const dev = ref()

onBeforeMount(() => {
  if (!route.params.id) return
  dev.value = devsData.find((d) => d.id === route.params.id)
})
</script>

<template></template>

<style scoped></style>
