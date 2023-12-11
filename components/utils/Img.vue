<script setup lang="ts">
defineProps<{
  src: string
  class?: string
  placeholder?: string
}>()

const imageLoaded = ref(false)
</script>

<template>
  <img
    v-show="!imageLoaded"
    :class="class"
    :src="placeholder ?? 'image_placeholder.png'"
    alt="Imagen de marcador de posición"
  />
  <img
    v-show="imageLoaded"
    :class="class"
    :src="src"
    alt="Imagen real"
    @load="imageLoaded = true"
  />
</template>
