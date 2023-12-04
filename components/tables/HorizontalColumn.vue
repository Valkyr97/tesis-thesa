<script setup lang="ts">
defineProps<{
  title: string
  data: {
    value: string
    description: string
  }[]
}>()
</script>

<template>
  <div class="flex divide-x divide-violet-400 text-xl text-center">
    <h1
      v-if="title"
      class="px-[1%] flex-1 text-left font-semibold uppercase text-2xl"
    >
      {{ title }}
    </h1>
    <div
      v-for="item in data"
      class="px-[1%] flex-1 font-semibold flex flex-col place-content-start gap-y-4"
    >
      <h1 class="font-black text-6xl flex-1 h-1/2">
        {{ item.value }}
      </h1>
      <span
        class="flex flex-grow text-violet-500 leading-[1.35rem] tracking-tight font-bold"
      >
        {{ item.description }}
      </span>
    </div>
  </div>
</template>
