<script setup lang="ts">
import { FormKitIcon } from '@formkit/vue'

const route = useRoute()

const isHome = computed(
  () => route.name === 'index' && route.fullPath === '/'
)
</script>

<template>
  <div class="py-6">
    <div class="flex place-content-between items-center w-5/6 mx-auto">
      <NuxtLink class="flex basis-1/3 h-48" to="/">
        <img src="/logo_full.png" alt="" />
      </NuxtLink>
      <div class="flex flex-col flex-1">
        <ul
          class="flex place-content-end gap-x-4 text-white uppercase items-center mb-1"
        >
          <li>
            <NuxtLink
              to="interesting_facts"
              :class="{
                'hover:!text-cyan-400 !text-white': isHome,
              }"
              class="transition cursor-pointer hover:text-indigo-800 text-black"
            >
              Hechos interesantes
            </NuxtLink>
          </li>
          <li>
            <FormKit
              type="search"
              inner-class="bg-white"
              placeholder="BUSCAR"
              input-class="text-black px-3"
            >
              <template #suffixIcon>
                <!-- <div class="bg-red-500 px-8 py-6"> -->
                <div class="bg-red-500 px-4 py-1">
                  <FormKitIcon class="flex w-8 h-8" icon="search" />
                </div>
                <!-- </div> -->
              </template>
            </FormKit>
          </li>
        </ul>
        <ul
          class="flex text-white uppercase text-xl font-semibold gap-x-12 place-content-end"
        >
          <li>
            <NuxtLink
              to="/games"
              :class="{
                'hover:!text-cyan-400 !text-white': isHome,
              }"
              class="transition cursor-pointer hover:text-indigo-800 text-black"
            >
              Catálogo de juegos
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/developers"
              :class="{
                'hover:!text-cyan-400 !text-white': isHome,
              }"
              class="transition cursor-pointer hover:text-indigo-800 text-black"
            >
              Catálogo de desarrolladores
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="teams"
              :class="{
                'hover:!text-cyan-400 !text-white': isHome,
              }"
              class="transition cursor-pointer hover:text-indigo-800 text-black"
            >
              Catálogo de equipos
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <hr v-if="!isHome" class="w-full shadow-sm" />
</template>

<style scoped></style>
