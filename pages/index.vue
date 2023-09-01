<script setup lang="ts">
import { FormKitIcon } from '@formkit/vue'
</script>

<template>
  <div
    class="h-[160vh] bg-gradient-to-b from-blue-800 to-cyan-400 w-full pb-24"
  >
    <Nav />
    <div class="flex">
      <div class="w-5/6 mx-auto flex flex-col">
        <div class="flex h-[55%] flex-shrink-0 bg-gray-500">
          <div class="w-2/3 h-full flex-grow-0 flex-shrink-0">
            <img
              class="w-full h-full content-center object-cover"
              src="https://picsum.photos/600/400"
              alt=""
            />
          </div>
          <div
            class="w-full h-full bg-white flex flex-col space-y-12 px-12 place-content-center"
          >
            <h1 class="text-3xl text-indigo-900 font-bold">
              Nuestro Catálogo
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Ducimus odit accusamus magni, ut temporibus voluptatibus
              officiis.
            </p>
            <p
              class="group text-indigo-900 font-bold cursor-pointer transition-all w-full flex gap-x-2"
            >
              <NuxtLink to="/games" class=" ">Ver más </NuxtLink>
              <span
                class="transition group-hover:translate-x-2 items-center flex"
              >
                <FormKitIcon
                  icon="arrowRight"
                  class="flex w-8 h-4 self-center"
                />
              </span>
            </p>
          </div>
        </div>
        <div class="flex h-1/5 my-12 gap-x-12">
          <div class="w-1/3 flex flex-col space-y-3 cursor-pointer">
            <img
              class="w-full h-full"
              src="https://picsum.photos/400"
              alt=""
            />
            <h2
              class="font-medium text-xl text-white hover:text-blue-800 transition w-fit"
            >
              Hechos de Interés
            </h2>
          </div>
          <div class="w-1/3 flex flex-col space-y-3 cursor-pointer">
            <img
              class="w-full h-full"
              src="https://picsum.photos/400"
              alt=""
            />
            <h2
              class="font-medium text-2xl text-white hover:text-blue-800 transition w-fit"
            >
              Contacta con los desarrolladores responsables de estos
              trabajos
            </h2>
          </div>
          <div class="w-1/3 flex flex-col space-y-3 cursor-pointer">
            <img
              class="w-full h-full"
              src="https://picsum.photos/400"
              alt=""
            />
            <h2
              class="font-medium text-2xl text-white hover:text-blue-800 transition w-fit"
            >
              Contacta con un equipo de desarrollo especializado
            </h2>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="w-5/6 mx-auto">
    <Gallery
      title="Noticias"
      :elements="
        newsData.map(({ createdAt, ...rest }) => ({
          ...rest,
          date: createdAt,
        }))
      "
    />
    <Gallery
      title="próximos eventos"
      :elements="
        eventsData.map(({ eventDate, ...rest }) => ({
          ...rest,
          date: eventDate,
        }))
      "
    />
  </div>
  <div
    class="right-0 left-0 bottom-0 bg-gradient-to-b from-gray-100 to-white min-h-screen pb-24"
  >
    <div class="w-5/6 mx-auto">
      <div
        class="flex flex-col text-center w-full place-content-center px-24"
      >
        <h1 class="text-6xl text-indigo-900 font-bold uppercase my-12">
          Nuestros Miembros
        </h1>
        <p class="text-xl">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est
          maiores earum cupiditate voluptatum odio quis sunt omnis.
          Reiciendis quibusdam esse aliquid distinctio harum?
        </p>
      </div>
      <div class="grid grid-cols-4 gap-12 py-8 px-24">
        <img src="https://picsum.photos/200" alt="" />
        <img src="https://picsum.photos/200" alt="" />
        <img src="https://picsum.photos/200" alt="" />
        <img src="https://picsum.photos/200" alt="" />
        <img src="https://picsum.photos/200" alt="" />
        <img src="https://picsum.photos/200" alt="" />
        <img src="https://picsum.photos/200" alt="" />
        <img src="https://picsum.photos/200" alt="" />
        <img src="https://picsum.photos/200" alt="" />
        <img src="https://picsum.photos/200" alt="" />
        <img src="https://picsum.photos/200" alt="" />
        <img src="https://picsum.photos/200" alt="" />
      </div>
    </div>
  </div>
  <Footer />
  <ScrollToTop />
</template>

<style scoped></style>
