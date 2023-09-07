<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>

<template>
  <div
    class="flex items-center gap-x-1 text-cyan-900 relative w-fit h-fit group transition"
  >
    <span
      class="arrow opacity-0 pointer-events-none group-hover:opacity-100 transition absolute top-0 whitespace-nowrap -mx-[150%] my-[120%] rounded-full border-current p-0.5 bg-cyan-900 bg-opacity-20 backdrop-blur-sm px-2 font-medium"
      >{{ text }}</span
    >
    <slot />
  </div>
</template>

<style scoped></style>
