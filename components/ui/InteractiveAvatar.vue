<script setup lang="ts">
defineProps<{
  img: string
  title: string
  subtitle?: string
}>()
</script>

<template>
  <div class="flex flex-col relative group">
    <UtilsImg
      class="h-16 cursor-pointer w-full object-center object-contain rounded-full"
      :src="img"
    />
    <div
      class="pointer-events-none z-10 top-0 -translate-y-full -my-1 p-2 absolute opacity-0 rounded-sm group-hover:opacity-100 flex transition flex-col bg-gray-700 text-white"
    >
      <h3 class="font-medium capitalize text-lg whitespace-nowrap">
        {{ title }}
      </h3>
      <span
        v-if="subtitle"
        class="-my-1 whitespace-nowrap capitalize text-opacity-80"
      >
        {{ subtitle }}
      </span>
    </div>
  </div>
</template>
