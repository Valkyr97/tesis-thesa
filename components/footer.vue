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
    <div class="w-5/6 mx-auto">
      <div class="flex place-content-between">
        <div v-for="col in footerData" class="flex flex-col space-y-3">
          <h4
            class="uppercase text-indigo-900 font-medium pb-4 text-2xl"
          >
            {{ col.title }}
          </h4>
          <span
            v-for="link in col.links"
            class="text-xl capitalize hover:text-green-600 transition cursor-pointer w-fit"
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
