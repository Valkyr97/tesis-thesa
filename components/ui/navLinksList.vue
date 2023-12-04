<script setup lang="ts">
import { FormKitIcon } from '@formkit/vue'

defineProps<{
  transparentModel: boolean
  isMenuOpen: boolean
  isMobile: boolean
}>()

export type links = { name: string; to: string }

const primaryLinks: links[] = [
  {
    name: 'Catálogo de juegos',
    to: '/games',
  },
  {
    name: 'Catálogo de desarrolladores',
    to: '/developers',
  },
  {
    name: 'Catálogo de equipos',
    to: '/teams',
  },
]

const secondaryLinks: links[] = [
  {
    name: `Hechos interesantes ${new Date().getFullYear()}`,
    to: '/interesting_facts',
  },
]
</script>

<template>
  <ul
    class="md:flex flex-row place-content-end gap-x-4 text-white uppercase items-center mb-1 hidden"
  >
    <li v-for="link in secondaryLinks">
      <NuxtLink
        :to="link.to"
        :class="{
          'hover:!text-cyan-400 !text-white': transparentModel && !isMenuOpen,
        }"
        class="transition cursor-pointer hover:text-indigo-800 text-black text-xs xl:text-sm font-medium"
      >
        {{ link.name }}
      </NuxtLink>
    </li>
    <li class="hidden md:block">
      <FormKit
        type="search"
        @input="
          {
          }
        "
        :disabled="true"
        inner-class="bg-white border shadow"
        placeholder="BUSCAR"
        input-class="text-black px-3 xl:py-2 !py-0"
      >
        <template #suffixIcon>
          <!-- <div class="bg-red-500 px-8 py-6"> -->
          <div class="bg-red-600 px-1.5 py-1.5">
            <FormKitIcon class="flex w-3 h-3 xl:w-6 xl:h-6" icon="search" />
          </div>
          <!-- </div> -->
        </template>
      </FormKit>
    </li>
  </ul>
  <ul
    class="flex flex-col md:flex-row text-white uppercase xl:text-lg font-semibold gap-x-2 xl:gap-x-12 place-content-end"
  >
    <li
      :class="{
        'flex w-full place-content-center items-center py-6 border-y': isMobile,
      }"
      v-for="link in isMobile
        ? primaryLinks.concat(secondaryLinks)
        : primaryLinks"
    >
      <NuxtLink
        :to="link.to"
        :class="{
          'hover:!text-cyan-400 !text-white': transparentModel && !isMenuOpen,
        }"
        class="transition cursor-pointer hover:text-indigo-800 text-black"
      >
        {{ link.name }}
      </NuxtLink>
    </li>
  </ul>
</template>

<style scoped></style>
