<script setup lang="ts">
import { FormKitIcon } from '@formkit/vue'

const route = useRoute()
const team = ref()

onBeforeMount(() => {
  if (!route.params.id) return;
  team.value = teamsData.find((t) => t.id === route.params.id);
});
</script>

<template>
  <NuxtLayout v-if="team">
    <img
      :src="team.teamPicture"
      alt=""
      class="top-32 w-full left-0 right-0 h-[40vh] object-center object-cover absolute"
    />
    <div class="w-full pt-[37vh] flex flex-col -mt-32 relative h-fit">
      <div
        class="flex py-6 mb-12 bg-gradient-to-b from-indigo-950 to-indigo-900 shadow-md text-white px-24 mx-auto items-center place-content-between w-3/4"
        :style="{
          clipPath:
            'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)',
        }"
      >
        <h1 class="text-7xl font-semibold uppercase tracking-tighter">
          {{ team.name }}
        </h1>
        <h1 class="text-3xl font-thin">|</h1>
        <div class="flex flex-col h-full gap-y-2 place-content-start w-fit">
          <div class="flex items-center text-center gap-x-3 hover:text-cyan-400 cursor-pointer">
            <FormKitIcon icon="playCircle" class="flex h-5" />
            <span class="capitalize"> ver trailer </span>
          </div>
          <div class="flex items-center text-center gap-x-3 hover:text-cyan-400 cursor-pointer">
            <FormKitIcon icon="fileImage" class="flex h-5" />
            <span class="capitalize"> ver imágenes </span>
          </div>
        </div>
      </div>
      <div class="flex w-full space-x-16">
        <div class="flex flex-col w-2/3">
          <h2 class="text-3xl pb-6 font-semibold text-indigo-950">
            Descripción
          </h2>
          <p class="tracking-tight leading-8 whitespace-pre-line">
            {{ team.teamDescription }}
          </p>
        </div>
        <div class="w-1/3 flex flex-col space-y-7">
          <h4 class="list_title text-xl uppercase font-semibold">
            Datos del juego:
          </h4>
          <ul class="h-min">
            <li class="h-min">
              <h5 class="list_title w-fit mb-3">Desarrolladores</h5>
              <ul
                class="transition-all transform list-inside delay-75 flex gap-x-2"
              >
                <li v-for="dev in team.members">
                  <UiInteractiveAvatar
                    :img="dev.avatar"
                    :title="dev.memberName"
                    :subtitle="dev.memberPosition"
                  />
                </li>
              </ul>
            </li>
          </ul>
          <ul class="h-min">
            <li class="group h-min">
              <h5 class="list_title w-fit">Categorías</h5>
              <ul
                class="transition-all transform list-inside delay-75 flex gap-x-4"
              >
                <li
                  @click="
                    $router.push({
                      path: '/games',
                      query: { categories: category.id },
                    })
                  "
                  class="text-indigo-900 font-bold hover:text-cyan-500 cursor-pointer"
                  v-for="category in team.categories"
                >
                  {{ category.name }}
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<style scoped>
.list_title {
  @apply text-blue-800 text-lg font-medium;
}
</style>
