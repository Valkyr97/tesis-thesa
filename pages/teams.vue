<script setup lang="ts">


const { fetchTeams } = useTeams()

const { data } = await fetchTeams()

const handleClick = () => {
  // $router.push(`/team/${team.id}`)
}
</script>

<template>
  <NuxtLayout>
    <h1 class="title">Equipos de Desarrollo</h1>
    <div class="flex flex-col gap-10 py-2">
      <div
        @click="handleClick"
        v-for="team in data"
        class="flex h-[33vh] gap-4 w-full border"
      >
        <div class="flex h-full basis-2/5 flex-shrink-0">
          <img
            class="object-fill object-center h-full w-full"
            :src="team.picture"
            alt=""
          />
        </div>
        <div class="flex flex-col py-3 space-y-6">
          <h2
            class="font-semibold capitalize text-3xl text-indigo-800 w-full text-center py-1"
          >
            {{ team.name }}
          </h2>
          <div class="h-3/5 overflow-hidden">
            <p class="whitespace-pre-line overflow-hidden">
              {{ team.description }}
            </p>
          </div>
          <div class="gap-y-1">
            <h4 class="text-xl font-semibold text-indigo-800">Miembros:</h4>
            <div class="flex gap-x-4">
              <div v-for="member in team.developers" class="flex">
                <UiInteractiveAvatar
                  :img="member.avatar"
                  :title="member.name"
                  :subtitle="member.role"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<style scoped></style>
~/stores/api/useTeams