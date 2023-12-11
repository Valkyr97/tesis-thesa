<script setup lang="ts">
import HorizontalColumn from '~/components/tables/HorizontalColumn.vue'
import useApiAnswers from '~/stores/api/useApiAnswers'
import { deviceNameShorter } from '~/utils/helpers'
import useD3 from '~/utils/useD3'

const apiAnswerStore = useApiAnswers()

const isFirstTime = ref(true)
const open = ref(false)
const mounted = ref(false)

const sortedGameGenders = computed(() =>
  (apiAnswerStore.gameGenderAnswers as Array<any>)?.sort((a, b) => {
    return b.percent - a.percent
  })
)

const deviceUsage = computed(() =>
  (apiAnswerStore.devicesAnswer as Array<any>)
    ?.sort((a, b) => {
      return b.percent - a.percent
    })
    .map((device) => ({
      ...device,
      answer: deviceNameShorter(device.answer),
    }))
)

const habitsVisualData = apiAnswerStore.timeAnswer
  ?.sort((a: any, b: any) => {
    return b.percent - a.percent
  })
  .map((timeAnswer: any) => ({
    description: timeAnswer.answer,
    value: `${timeAnswer.percent.toFixed(0)}%`,
  }))

const benefitsOfPlayVisualData = apiAnswerStore.benefitsOpinionInsights
  ?.sort((a: any, b: any) => {
    return b.percent - a.percent
  })
  .map((opinion: any) => ({
    value: `${opinion.percent.toFixed(0)}%`,
    description: `${opinion.answer}`,
  }))

const communityBuilding = apiAnswerStore.communityAnswerInsights
  ?.sort((a: any, b: any) => {
    return b.percent - a.percent
  })
  .map((opinion: any) => ({
    value: `${opinion.percent.toFixed(0)}%`,
    description: `Juega con ${opinion.answer.toLowerCase()}`,
  }))

const downloadPdf = async () => {
  if (!isFirstTime.value) {
    let element = document.getElementById('element-to-print')

    if (element) {
      //@ts-ignore
      await html2pdf(element, {
        filename: `Anuario de videojuegos de Cuba ${new Date().getFullYear()}`,
        jsPDF: {
          orientation: 'l',
        },
      })

      return
    }
  }

  const ageContainer = document.getElementById('pie-age-chart')
  const sexContainer = document.getElementById('pie-sex-chart')

  const agePie = await useD3(
    [
      { name: 'Edad<18', value: apiAnswerStore.under18 },
      { name: '18-34', value: apiAnswerStore.group18_34 },
      { name: '35-50', value: apiAnswerStore.group35_50 },
      { name: 'Edad>50', value: apiAnswerStore.over50 },
    ],
    350
  )

  const sexPie = await useD3(
    [
      { name: 'Masculino', value: apiAnswerStore.male },
      { name: 'Femenina', value: apiAnswerStore.female },
    ],
    350
  )

  ageContainer?.append(agePie)
  sexContainer?.append(sexPie)

  let myColors = [
    '#2bff95',
    'rgba(3, 24, 12, 0.8)',
    'rgb(66, 136, 181)',
    'rgba(19, 39, 52, 0.8)',
  ]

  for (let i = 0; i < sortedGameGenders.value.length; i++) {
    let gender = sortedGameGenders.value[i]
    document.getElementById(`${gender.answer}-pie-chart`)?.append(
      useD3(
        [
          { name: '', value: gender.percent.toFixed(0) },
          { name: '', value: 100 - gender.percent.toFixed(0) },
        ],
        200,
        {
          title: false,
          thickness: 0.58,
          colors: i % 2 == 0 ? myColors.slice(0, 2) : myColors.slice(2),
        }
      )
    )
  }

  for (let i = 0; i < deviceUsage.value.length; i++) {
    let device = deviceUsage.value[i]
    document.getElementById(`${device.answer}-pie-chart`)?.append(
      await useD3(
        [
          { name: '', value: device.percent.toFixed(0) },
          { name: '', value: 100 - device.percent.toFixed(0) },
        ],
        200,
        {
          title: false,
          thickness: 0.58,
          colors: i % 2 == 0 ? myColors.slice(0, 2) : myColors.slice(2),
        }
      )
    )
  }

  let element = document.getElementById('element-to-print')
  //@ts-ignore
  await html2pdf(element, {
    filename: `Anuario de videojuegos de Cuba ${new Date().getFullYear()}`,
    jsPDF: {
      orientation: 'l',
    },
  })

  isFirstTime.value = false
}

const handlePrint = async () => {
  await downloadPdf()
  // open.value = false
}

onMounted(() => {
  mounted.value = true
})
</script>

<template>
  <button
    @click="handlePrint"
    type="button"
    :disabled="open"
    class="border rounded p-4 bg-indigo-600 border-transparent disabled:opacity-50"
  >
    <slot> Descargar </slot>
  </button>
  <!-- <Teleport v-if="open" to=".pdf_to_exoprt_container"> -->
  <div class="w-[1920px] -z-50 top-0 absolute hidden">
    <div
      id="element-to-print"
      class="flex flex-col bg-gradient-to-r from-sky-900 to-sky-950 text-white w-full"
    >
      <div class="flex flex-col gap-y-10 pt-32">
        <div class="html2pdf__page-break px-12 flex flex-col gap-10">
          <h1 class="text-7xl font-semibold uppercase w-full tracking-tighter">
            Hechos Esenciales acerca de los videojuegos en Cuba,
            {{ new Date().getFullYear() }}
          </h1>

          <p>
            El informe de GameHub 2023 detalla la relación de Cuba con los
            videojuegos y las razones por las que los juegos continúan
            inspirándonos y deleitándonos a todos. Jugar es una necesidad
            universal tanto para niños como para adultos. Los videojuegos
            construyen comunidades, mantienen nuestras mentes agudas y nos
            acercan a los demás. Aceptar el poder de los juegos desbloquea
            nuestro extraordinario potencial, transformando vidas y el mundo.
          </p>
        </div>

        <div class="html2pdf__page-break px-12 flex flex-col gap-10">
          <h1 class="text-4xl font-semibold uppercase tracking-tighter w-2/3">
            La comunidad de jugadores de videojuegos en Cuba
          </h1>

          <div class="grid grid-cols-2 items-start">
            <div class="flex flex-col items-center gap-y-2 pb-6">
              <h1 class="uppercase text-xl text-center">
                Distribución por edad
              </h1>
              <div id="pie-age-chart" />
            </div>
            <div class="flex flex-col items-center gap-y-2 pb-6">
              <h1 class="uppercase text-xl text-center">
                Distribución por identidad sexual
              </h1>
              <div id="pie-sex-chart" />
            </div>
            <div
              class="text-center flex items-start place-content-center gap-x-2"
            >
              <div>
                <p>El jugador promedio es de</p>
                <p class="text-emerald-400 font-bold text-2xl">
                  {{ apiAnswerStore.ageInsights.median }} Años
                </p>
              </div>
              <div>
                <p>A lo largo de todas las edades</p>
                <p class="text-emerald-400 font-bold text-2xl">
                  {{ apiAnswerStore.over18 }}%
                </p>
                <p>De los jugadores son mayores de edad</p>
              </div>
            </div>
            <div
              class="text-center flex items-start place-content-center gap-x-4"
            >
              <div>
                <p class="text-emerald-400 font-bold text-2xl">70%</p>
                <p>De los hombres y chicos</p>
                <p>juegan videojuegos</p>
              </div>
              <div>
                <p class="text-emerald-400 font-bold text-2xl">44%</p>
                <p>De mujeres y chicas</p>
                <p>juegan videojuegos</p>
              </div>
            </div>
          </div>
        </div>

        <div class="html2pdf__page-break px-12 flex flex-col gap-10">
          <h1 class="text-4xl font-semibold uppercase tracking-tighter w-2/3">
            Hábitos y preferencias de los jugadores
          </h1>
          <h1 class="uppercase text-xl text-center">
            Géneros de videojuegos preferidos
          </h1>
          <div class="flex flex-wrap gap-x-6 gap-y-6 text-center">
            <template v-for="gender in sortedGameGenders">
              <div class="flex flex-1 flex-col items-center flex-shrink w-min">
                <div class="w-36" :id="`${gender.answer}-pie-chart`" />
                <span>
                  {{ gender.answer.split('(')[0] }}
                  {{ gender.percent.toFixed(0) }}%
                </span>
              </div>
            </template>
          </div>
        </div>

        <div class="html2pdf__page-break px-12 flex flex-col gap-10">
          <h1 class="text-4xl font-semibold uppercase tracking-tighter w-2/3">
            Hábitos y preferencias de los jugadores
          </h1>

          <h1 class="uppercase text-xl text-center">Dispositivos favoritos</h1>

          <!-- Dispositive Usage -->

          <div class="flex flex-wrap gap-x-8 gap-y-6 text-center mb-4">
            <template v-for="device in deviceUsage">
              <div class="flex flex-1 flex-col items-center flex-shrink w-min">
                <div class="w-40" :id="`${device.answer}-pie-chart`" />
                <span>
                  {{ device.answer }}
                  {{ device.percent.toFixed(0) }}%
                </span>
              </div>
            </template>
          </div>

          <HorizontalColumn
            title="tiempo dedicado a jugar"
            :data="habitsVisualData"
          />
        </div>

        <div class="pt-14 border-t-2 border-emerald-400 border-dotted mb-16">
          <h1
            class="font-bold text-5xl uppercase text-emerald-400 border-b-2 border-dotted w-fit pb-14 pr-24 border-indigo-500"
          >
            Los beneficios de jugar
          </h1>
        </div>

        <div class="html2pdf__page-break flex flex-col gap-y-12">
          <h1 class="text-3xl uppercase font-bold self-center">
            Beneficios de los juegos
          </h1>

          <div class="w-full h-12 rounded-full bg-indigo-950">
            <div
              :style="{
                width: `${apiAnswerStore.haveBenefitsOpinion?.toFixed(0)}%`,
              }"
              class="px-2 h-full rounded-l-full flex items-center text-lg place-content-between bg-indigo-500"
            >
              <span>Cubanos que opinan que los juegos son beneficiosos</span>
              <span class="font-medium justify-self-end">
                {{ apiAnswerStore.haveBenefitsOpinion?.toFixed(0) }}%
              </span>
            </div>
          </div>

          <TablesHorizontalColumn
            title="Los jugadores opinan que..."
            :data="benefitsOfPlayVisualData"
          />
        </div>

        <div class="pt-14 border-t-2 border-emerald-400 border-dotted mb-16">
          <h1
            class="font-bold text-5xl uppercase text-emerald-400 border-b-2 border-dotted w-fit pb-14 pr-24 border-indigo-500"
          >
            Los beneficios de jugar
          </h1>
        </div>

        <div class="flex flex-col gap-y-24 pb-10">
          <h4 class="text-3xl uppercase font-bold self-center">
            Construyendo una comunidad a través de los juegos
          </h4>

          <div class="w-full h-12 rounded-full bg-indigo-950">
            <div
              :style="{
                width: `${apiAnswerStore.improveRelationsOpinion?.toFixed(0)}%`,
              }"
              class="px-2 h-full rounded-l-full flex place-content-between items-center text-lg bg-indigo-500"
            >
              <span>Jugadores que suelen jugar con otros</span>
              <span class="font-medium justify-self-end">
                {{ apiAnswerStore.improveRelationsOpinion?.toFixed(0) }}%
              </span>
            </div>
          </div>

          <TablesHorizontalColumn title="" :data="communityBuilding" />
        </div>
      </div>
    </div>
  </div>
  <!-- </Teleport> -->
</template>
