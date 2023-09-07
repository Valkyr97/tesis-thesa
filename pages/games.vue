<script setup lang="ts">
import { FormKitIcon } from '@formkit/vue'

const isCategoriesFilterOpen = ref(false)
const selectedCategories = ref(new Set())
</script>

<template>
  <NuxtLayout>
    <h1
      class="text-7xl text-indigo-900 font-semibold uppercase w-full tracking-tighter py-12 text-center"
    >
      Nuestros juegos
    </h1>
    <div class="flex gap-x-2 place-content-between border-y py-3 px-1 sticky top-0.5 z-10 bg-white/90">
      <span
        v-for="category in categories"
        class="text-indigo-900 capitalize font-semibold text-lg cursor-pointer w-fit hover:text-cyan-500 active:!text-cyan-300 transition"
        :class="{
          '!text-cyan-500': selectedCategories.has(category.value),
        }"
        @click="
          selectedCategories.has(category.value)
            ? selectedCategories.delete(category.value)
            : selectedCategories.add(category.value)
        "
        >{{ category.label }}</span
      >
    </div>
     <!-- <div class="w-full border-b py-2">
     <div class="flex flex-col relative">
        <button
          @click="isCategoriesFilterOpen = !isCategoriesFilterOpen"
          class="flex items-center gap-x-1 text-lg w-fit"
        >
          Filtrar por categorías
          <FormKitIcon
            :class="{ '-scale-y-100': isCategoriesFilterOpen }"
            class="flex w-5 h-5 transition"
            icon="down"
          />
        </button>
        <FormKit
          v-if="isCategoriesFilterOpen"
          type="checkbox"
          :options="categories"
          v-model="selectedCategories"
          outer-class="w-fit"
          label-class="!text-base capitalize"
          decorator-class="$remove:rounded $remove:bg-gradient-to-b"
          fieldset-class="$remove:border"
        />
      </div> 
    </div> -->
    <div class="grid grid-cols-3 py-4 gap-20 w-full">
      <div class="w-full h-[40vh] relative" v-for="game in games">
        <img
          class="w-full h-full content-center object-cover"
          :src="game.pictures[0]"
          alt=""
        />
        <div
          class="absolute bottom-0 w-full bg-gray-800/60 backdrop-blur-md text-white p-2 py-4"
        >
          {{ game.name }}
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<style scoped></style>
