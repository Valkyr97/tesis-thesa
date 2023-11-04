<script setup lang="ts">
import type { Category } from '~/server/entities/category'
import type { Developer } from '~/server/entities/developer'

const categoriesList = ref<{ label: string; value: number }[] | undefined>([])
const devsList = ref<{ label: string; value: number }[] | undefined>([])
const route = useRoute()
const { id } = route.query

const devs = ref<number[]>([])
const categories = ref<number[]>([])
const images = ref<string[]>([''])

const { actualData, submit } = useSubmit('/api/game', id)

onBeforeMount(async () => {
  const { data: categories } = await useFetch('/api/category')

  categoriesList.value = categories.value?.map((cat) => ({
    value: cat.id,
    label: cat.name,
  }))

  const { data: developers } = await useFetch('/api/developer')

  devsList.value = [
    { label: '', value: 0 },
    ...(developers.value?.map((dev) => ({
      value: dev.id,
      label: dev.name,
    })) || []),
  ]

  devs.value = actualData.value.developers.map((d: Developer) => d.id)
  categories.value = actualData.value.categories.map((c: Category) => c.id)
})
</script>

<template>
  <FormKit
    :submit-label="id ? 'Actualizar' : 'Crear'"
    @submit="submit"
    type="form"
    v-model="actualData"
  >
    <div class="flex xl:flex-row flex-col flex-grow gap-x-8">
      <div class="flex-1">
        <FormKit required label="Nombre" type="text" name="name" />
        <FormKit label="Descripción" type="textarea" auto-height name="description" />

        <FormKit
          label="Categorías en las que encaja"
          options-class="flex place-content-between gap-x-2 flex-wrap"
          label-class="whitespace-nowrap"
          type="checkbox"
          name="categories"
          v-model="categories"
          :options="categoriesList"
        />
        <FormKit
          name="developers"
          type="list"
          dynamic
          v-model="devs"
          #default="{ items }"
        >
          <FormKit
            type="select"
            label="Desarrollador"
            suffix-icon="trash"
            suffix-icon-class="cursor-pointer $remove:p-3 text-red-800"
            @suffix-icon-click="() => devs.splice(index, 1)"
            v-for="(item, index) in items"
            :key="item"
            :index="index"
            :options="devsList"
          />
          <button
            type="button"
            @click="devs.push(0)"
            class="border rounded-sm px-2 bg-blue-500 text-white py-1 mb-2"
          >
            Agregar Desarrollador
          </button>
        </FormKit>
      </div>

      <div class="flex-1">
        <FormKit label="Link al Demo" type="text" name="demo" />
        <FormKit
          required
          label="Link de Descarga"
          type="text"
          name="downloadLink"
        />

        <FormKit
          name="pictures"
          type="list"
          dynamic
          v-model="images"
          #default="{ items }"
        >
          <FormKit
            type="text"
            label="Link de Imagen"
            suffix-icon="trash"
            suffix-icon-class="cursor-pointer $remove:p-3 text-red-800"
            @suffix-icon-click="() => images.splice(index, 1)"
            v-for="(item, index) in items"
            :key="item"
            :index="index"
          />
          <button
            type="button"
            @click="images.push('')"
            class="border rounded-sm px-2 bg-blue-500 text-white py-1 mb-2"
          >
            Agregar Imagen
          </button>
        </FormKit>
      </div>
    </div>
  </FormKit>
</template>
