<script setup lang="ts">
const categoriesList = ref<{ label: string; value: number }[]>([])

const images = ref<string[]>([''])

const submit = async (value: any) => {
  const response = await $fetch('/api/game', {
    method: 'post',
    body: { ...value },
  })
}

onBeforeMount(async () => {
  const response = await $fetch('/api/category')
  console.log(response)
  categoriesList.value = response.map((cat) => ({
    value: cat.id,
    label: cat.name,
  }))
})
</script>

<template>
  <NuxtLayout :nav="false" :scroll="false">
    <FormKit @submit="submit" type="form">
      <FormKit label="Nombre" type="text" name="name" />
      <FormKit label="Descripción" type="textarea" name="description" />
      <FormKit label="Link al Demo" type="text" name="demo" />
      <FormKit label="Link de Descarga" type="text" name="downloadLink" />
      <FormKit
        name="pictures"
        type="list"
        dynamic
        v-model="images"
        #default="{ items }"
      >
        <FormKit
          type="text"
          label="Imagen"
          v-for="(item, index) in items"
          :key="item"
          :index="index"
        />
        <button
          type="button"
          @click="images.push('')"
          class="border rounded-sm bg-blue-500 text-white px-6 py-3"
        >
          Agregar otra Imagen
        </button>
      </FormKit>
      <FormKit
        label="Categorías en las que encaja"
        options-class="flex place-content-between gap-x-2 flex-nowrap"
        type="checkbox"
        name="categories"
        :options="categoriesList"
      />
    </FormKit>
  </NuxtLayout>
</template>
