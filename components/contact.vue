<script setup lang="ts"></script>

<template>
  <div class="bg-blue-800 text-white min-h-[80vh] py-24">
    <div class="w-5/6 mx-auto">
      <h1 class="text-6xl font-semibold w-full pb-20 text-center">
        Ponte en Contacto
      </h1>
      <div class="xl:flex flex-col md:grid md:grid-cols-2 gap-y-12 lg:flex-row w-full gap-x-24 place-content-between">
        <div class="flex flex-col flex-1">
          <h5 class="uppercase font-semibold text-xl pb-4">
            Dirección
          </h5>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Tempore blanditiis, impedit amet inventore deleniti hic
            provident quas, praesentium debitis et laborum aliquam
            dolorum!
          </p>
        </div>
        <div class="flex flex-col flex-1">
          <h5 class="uppercase font-semibold text-xl pb-4">
            Inscríbete
          </h5>
          <FormKit
            wrapper-class=""
            inner-class="bg-white"
            input-class="text-black p-3"
            type="email"
            placeholder="Pon tu correo"
          >
            <template #suffixIcon>
              <button class="border tracking-tight md:text-lg bg-red-600 px-2 lg:px-8 2xl:px-12 py-2 h-full uppercase font-bold">Enviar</button>
            </template>
          </FormKit>
        </div>
        <div class="flex flex-col flex-1">
          <h5 class="uppercase font-semibold text-xl pb-4">
            Mantente al tanto
          </h5>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
