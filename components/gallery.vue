<script setup lang="ts">
defineProps<{
  title: string
  elements: {
    img: string
    name: string
    date: Date
    description: string
    link: string
  }[]
}>()

const handleNewsClick = (link: string) => {
  console.log(link)
}
</script>

<template>
  <h1
    class="text-3xl lg:text-5xl text-indigo-900 font-medium uppercase my-12"
  >
    {{ title }}
  </h1>
  <div class="w-full grid grid-cols-3 gap-7 gap-y-20 md:gap-y-16 pb-8">
    <template v-for="(el, i) in elements">
      <div
        :class="[
          { 'md:!col-span-2 row-span-2 h-[90vh]': i === 0 },
          { 'md:col-span-1': i <= 2 },
        ]"
        class="w-full flex flex-col gap-y-1 h-[45vh] lg:col-span-1 col-span-full"
      >
        <div class="h-[83%] border-b-8 border-blue-800">
          <img
            @click="handleNewsClick(el.link)"
            class="w-full h-full content-center object-cover cursor-pointer"
            :src="el.img"
          />
        </div>
        <h5 class="">
          {{
            new Date(
              el.date.toLocaleString('en-US', {
                timeZone: 'Europe/Madrid',
              })
            ).toLocaleDateString('es-ES', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })
          }}
        </h5>
        <h1
          @click="handleNewsClick(el.link)"
          class="text-xl font-bold hover:text-indigo-900 transition cursor-pointer w-fit"
        >
          {{ el.name }}
        </h1>
        <p class="text-lg" v-if="i === 0">
          {{ el.description }}
        </p>
      </div>
    </template>
  </div>
</template>

<style scoped></style>
