<script setup lang="ts">
const route = useRoute()
const { id } = route.query

const devsList = ref<{ label: string; value: number }[]>([])
const devs = ref<number[]>([])

const { actualData, submit } = useSubmit('/api/team', id)

onBeforeMount(async () => {
  const developers = await $fetch('/api/developer')
  devsList.value = developers.map((dev) => ({
    value: dev.id,
    label: dev.name,
  }))
})
</script>

<template>
  <FormKit
    :submit-label="id ? 'Actualizar' : 'Crear'"
    type="form"
    @submit="submit"
    v-model="actualData"
  >
    <div class="flex xl:flex-row flex-col flex-wrap gap-x-8">
      <div class="flex-1">
        <FormKit required type="text" name="name" label="Nombre del Equipo" />
        <FormKit
          type="textarea"
          auto-height
          name="description"
          label="Descripción del Equipo"
        />
      </div>
      <div class="flex-1">
        <FormKit
          type="text"
          name="picture"
          label="Link de la imagen del Equipo"
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
            :options="devsList.filter((d) => !devs.includes(d.value))"
          />
          <button
            type="button"
            @click="devs.push(0)"
            class="border rounded-sm px-2 bg-blue-500 text-white py-1 mb-2 basis-1/2"
          >
            Agregar Desarrollador
          </button>
        </FormKit>
      </div>
    </div>
  </FormKit>
</template>
