<script setup lang="ts">
//State
const route = useRoute()
const router = useRouter()

const { fetchCategories } = useCategories()
const { fetchGames } = useGames()

const {
  data: categories,
  error,
  status,
} = await fetchCategories({ select: ['name', 'id'] })

const routeCategories = computed(
  () =>
    (route.query?.categories &&
      (Array.isArray(route.query.categories)
        ? route.query?.categories?.map((c) => Number(c))
        : [Number(route.query?.categories)])) ||
    []
)

let response = ref()

//Actions
const handleFilterUpdated = async (elements: Set<any>) => {
  await router.push({ query: { categories: [...elements] } })
  await useFetch('/api/game', {
    query: {
      categories: routeCategories.value,
    },
    onResponse(context) {
      console.log('trying')
      console.log(context.response._data)
      response.value = context?.response?._data
    },
  })
}

onMounted(async () => {
  await useFetch('/api/game', {
    query: {
      categories: routeCategories.value,
    },
    onResponse(context) {
      console.log('trying')
      console.log(context.response._data)
      response.value = context?.response?._data
    },
  })
})
</script>

<template>
  <NuxtLayout>
    <h1 class="title">Nuestros juegos</h1>
    <ToolsHorizontalFilter
      :initial-list="routeCategories || []"
      :elements="categories"
      @filter-updated="handleFilterUpdated"
    />
    <div class="grid grid-cols-3 py-4 gap-20 w-full">
      <div
        v-for="game in response"
        class="w-full h-[40vh] relative cursor-pointer group overflow-hidden"
        @click="$router.push(`/game/${game.id}`)"
      >
        <UtilsImg
          class="w-full h-full content-center object-cover group-hover:scale-110 transition"
          :src="game.pictures[0]"
        />
        <div
          class="absolute bottom-0 w-full bg-gray-800/60 backdrop-blur-md text-white p-2 py-4"
        >
          {{ game.name }}
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<style scoped></style>
