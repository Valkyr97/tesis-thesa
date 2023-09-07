<script setup lang="ts"></script>

<template>
  <NuxtLayout>
    <h1
      class="text-7xl text-indigo-900 font-semibold uppercase w-full tracking-tighter py-12 text-center"
    >
      Equipos de Desarrollo
    </h1>
    <div class="flex flex-col gap-10 py-2">
      <div
        v-for="team in teamsData"
        class="flex h-[33vh] gap-4 w-full border"
      >
        <div class="flex h-full basis-2/5 flex-shrink-0">
          <img
            class="object-fill object-center h-full w-full"
            :src="team.teamPicture"
            alt=""
          />
        </div>
        <div class="flex flex-col py-1 space-y-6">
          <h2
            class="font-semibold capitalize text-3xl text-indigo-800 w-full text-center py-1"
          >
            {{ team.name }}
          </h2>
          <p class="whitespace-pre-line overflow-hidden">
            {{ team.teamDescription }}
          </p>
          <h4 class="text-xl font-semibold text-indigo-800">
            Miembros:
          </h4>
          <div class="flex gap-x-4">
            <div v-for="member in team.members" class="flex">
              <div class="flex flex-col relative group">
                <img
                  class="h-16 cursor-pointer w-full object-center object-contain rounded-full"
                  :src="member.avatar"
                  alt=""
                />
                <div
                  class="pointer-events-none z-10 top-0 -translate-y-full -my-1 p-2 absolute opacity-0 rounded-sm group-hover:opacity-100 flex transition flex-col bg-gray-700 text-white"
                >
                  <h3 class="font-medium capitalize text-lg whitespace-nowrap">
                    {{ member.memberName }}
                  </h3>
                  <span class="-my-1 whitespace-nowrap capitalize text-opacity-80">{{ member.memberPosition }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<style scoped></style>
