<script setup lang="ts">
const router = useRouter()

const handleFooterNav = (href: string) => {
  console.log(href)
  if (href.startsWith('http')) {
  } else {
    router.push(href)
  }
}
</script>

<template>
  <div class="border-t-2 border-gray-300 py-12">
    <div class="default_layout">
      <div
        class="flex flex-col md:flex-row items-center space-y-12 md:space-y-0 md:items-start md:place-content-between"
      >
        <div v-for="col in footerData" class="flex flex-col space-y-1.5 md:space-y-3 items-center md:items-start">
          <h4
            class="uppercase text-indigo-900 font-medium pb-4 text-2xl md:text-xl xl:text-2xl"
          >
            {{ col.title }}
          </h4>
          <span
            v-for="link in col.links"
            class="text-xl md:text-base xl:text-xl capitalize hover:text-green-600 transition cursor-pointer w-fit"
            @click="handleFooterNav(link.href)"
            >{{ link.name }}</span
          >
        </div>
      </div>
    </div>
  </div>
  <Contact />
</template>

<style scoped></style>
