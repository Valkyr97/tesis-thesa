<script setup lang="ts">
const selectedTechs = ref(new Set());
</script>

<template>
  <NuxtLayout>
    <h1 class="title">Desarrolladores</h1>
    <div
      class="flex flex-wrap gap-x-4 place-content-between border-y py-3 px-1 sticky top-0.5 z-10 bg-white"
    >
      <span
        v-for="tech in techs"
        class="text-indigo-900 capitalize font-semibold text-lg cursor-pointer w-fit hover:text-cyan-500 active:!text-cyan-300 transition"
        :class="{
          '!text-cyan-500': selectedTechs.has(tech.value),
        }"
        @click="
          selectedTechs.has(tech.value)
            ? selectedTechs.delete(tech.value)
            : selectedTechs.add(tech.value)
        "
        >{{ tech.name }}</span
      >
    </div>
    <div class="grid grid-cols-2 gap-4 py-4">
      <DevelopersCard v-for="dev in devsData" :devId="dev.id" />
    </div>
  </NuxtLayout>
</template>

<style scoped></style>
