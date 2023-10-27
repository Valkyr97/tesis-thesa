<script setup lang="ts">
// const router = useRouter()
// const selectedTechs = ref(new Set())
// const route = useRoute()

const developers = ref(await fetchDevelopers())

// const handleFilterUpdated = (elements: Set<any>) => {
//   router.push({ query: { techs: [...elements] } })
// }
</script>

<template>
  <NuxtLayout>
    <h1 class="title">Desarrolladores</h1>
    <!-- <ToolsHorizontalFilter
      :initial-list="[...(route.query.techs || [])]"
      :elements="categories"
      @filter-updated="handleFilterUpdated"
    /> -->
    <div class="grid grid-cols-2 gap-4 py-4">
      <DevelopersCard
        v-for="dev in developers"
        :address="dev.address"
        :avatar="dev.avatar"
        :email="dev.email"
        :phone="dev.phone"
        :title="dev.name"
        :subtitle="dev.role"
      />
    </div>
  </NuxtLayout>
</template>

<style scoped></style>
