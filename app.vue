<script setup lang="ts">
const isLoading = useLoading()
</script>

<template>
  <div v-if="isLoading" class="fixed top-0 bottom-0 left-0 right-0 bg-white bg-opacity-80 z-50 transition" />
  <NuxtPage />
</template>
