<script setup lang="ts">
import { FormKitIcon } from '@formkit/vue'

const route = useRoute()
const selectedCategories = computed(() => new Set(route.query.categories))
</script>

<template>
  <NuxtLayout>
    <h1 class="title">Nuestros juegos</h1>
    <div
      class="flex gap-x-4 place-content-between border-y py-3 px-1 sticky top-0.5 z-10 bg-white flex-wrap overflow-hidden"
    >
      <span
        v-for="category in categories"
        class="text-indigo-900 capitalize font-semibold text-lg cursor-pointer w-fit hover:text-cyan-500 active:!text-cyan-300 transition"
        :class="{
          '!text-cyan-500': selectedCategories.has(category.value),
        }"
        @click="
          $router.push({
            query: {
              categories: selectedCategories.has(category.value)
                ? (selectedCategories.delete(category.value) || []) && [
                    ...selectedCategories,
                  ]
                : [...selectedCategories.add(category.value)],
            },
          })
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
      <div
        v-for="game in gamesData"
        class="w-full h-[40vh] relative cursor-pointer group overflow-hidden"
        @click="$router.push(`/game/${game.id}`)"
      >
        <img
          class="w-full h-full content-center object-cover group-hover:scale-110 transition"
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
