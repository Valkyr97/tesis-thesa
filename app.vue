<script setup lang="ts">
const uiStore = useUiStore()
</script>

<template>
  <div
    v-if="uiStore.isLoading"
    class="fixed top-0 bottom-0 left-0 right-0 bg-white bg-opacity-70 z-50 transition"
  />
  <NuxtPage />
</template>
