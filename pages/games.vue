<script setup lang="ts">
import useCategories from '~/composables/api/useCategories'
import useGames from '~/composables/api/useGames'

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

const { data: games, refresh } = await fetchGames({
  categories: routeCategories.value,
})

//Actions
const handleFilterUpdated = async (elements: Set<any>) => {
  await router.push({ query: { categories: [...elements] } })
  refresh()
}
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
        v-for="game in games"
        class="w-full h-[40vh] relative cursor-pointer group overflow-hidden"
        @click="$router.push(`/game/${game.id}`)"
      >
        <img
          class="w-full h-full content-center object-cover group-hover:scale-110 transition"
          :src="game.pictures[0]"
          alt=""
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
