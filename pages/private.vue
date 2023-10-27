<script setup lang="ts">
const { trySampleRequest } = useOauth()
</script>

<template>
  <NuxtLayout>
    <div class="w-4/5 flex mx-auto gap-x-10">
      <div class="flex-grow">
        <NuxtPage />
      </div>
      <ul class="whitespace-nowrap space-y-3 flex flex-col w-fit">
        <NuxtLink active-class="text-green-600" to="/private/game/list">
          Juegos
        </NuxtLink>
        <NuxtLink active-class="text-green-600" to="/private/developer/list">
          Desarrolladores
        </NuxtLink>
        <NuxtLink active-class="text-green-600" to="/private/team/list">
          Equipos
        </NuxtLink>
        <NuxtLink active-class="text-green-600" to="/private/category/list">
          Géneros de juegos
        </NuxtLink>
        <NuxtLink active-class="text-green-600" to="/private/new/list">
          Noticias
        </NuxtLink>
        <NuxtLink active-class="text-green-600" to="/private/event/list">
          Eventos
        </NuxtLink>
        <NuxtLink active-class="text-green-600" to="/private/survey/list">
          Encuestas
        </NuxtLink>
      </ul>
    </div>
  </NuxtLayout>
</template>
