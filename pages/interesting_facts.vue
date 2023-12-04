<script setup lang="ts">
import useApiAnswers from '~/stores/api/useApiAnswers'
import { deviceNameShorter } from '~/utils/helpers'

const apiAnswerStore = useApiAnswers()
const { error, pending } = await apiAnswerStore.fetchData()

const top5GameGenders = computed(() =>
  (apiAnswerStore.gameGenderAnswers as Array<any>)
    ?.sort((a, b) => {
      return b.percent - a.percent
    })
    ?.slice(0, 5)
)

const topOpinion = computed(() => {
  let biggerPercentOpinion = { percent: -Infinity, answer: '' }
  for (let opinion of apiAnswerStore.benefitsOpinionInsights) {
    if (opinion.percent > biggerPercentOpinion.percent) {
      biggerPercentOpinion = opinion
    }
  }

  return biggerPercentOpinion
})

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

const mayorTimeUsageAvg = computed(() => {
  let biggerTimeAvgAnswer = { percent: -Infinity, answer: '' }
  for (let answer of apiAnswerStore.timeAnswer) {
    if (answer.percent > biggerTimeAvgAnswer.percent) {
      biggerTimeAvgAnswer = answer
    }
  }

  return biggerTimeAvgAnswer
})

// Device with the highest percentage of exclusive usage by a player
const mayorExclusiveDeviceUse = computed(() => {
  let deviceAnswer = { uniquePercent: -Infinity, answer: '' }
  for (let answer of apiAnswerStore.devicesAnswer) {
    if (answer.uniquePercent > deviceAnswer.uniquePercent) {
      deviceAnswer = answer
    }
  }
  return deviceAnswer
})

const totalMultipleDeviceUsagePercent = computed(() => {
  return (apiAnswerStore.devicesAnswer as Array<any>).reduce(
    (cummulativeValue, currentValue) => {
      if (currentValue.uniquePercent) {
        return cummulativeValue - currentValue.uniquePercent
      }
      return cummulativeValue
    },
    100
  )
})

const demographicVisualData = [
  {
    value: `${apiAnswerStore.over18}%`,
    description: 'De los jugadores son adultos(18+)',
  },
  {
    value: `${apiAnswerStore.under18}%`,
    description: 'De los jugadores son niños (menores de 18)',
  },
  {
    value: `${apiAnswerStore.ageInsights.median}`,
    description: 'Es la edad promedio entre los jugadores',
  },
  {
    value: `${apiAnswerStore.male}%`,
    description: 'De los jugadores se identifican masculinos',
  },
  {
    value: `${apiAnswerStore.female}%`,
    description: 'De los jugadores se identifican femeninas',
  },
]

const habitsVisualData: typeof demographicVisualData = [
  {
    value: `${mayorTimeUsageAvg.value.percent.toFixed(0)}%`,
    description: `Juega ${mayorTimeUsageAvg.value.answer.toLowerCase()}`,
  },
  {
    value: `${mayorExclusiveDeviceUse.value.uniquePercent.toFixed(0)}%`,
    description: `De jugadores solo juega en ${deviceNameShorter(
      mayorExclusiveDeviceUse.value.answer
    )}`,
  },
  {
    value: `${totalMultipleDeviceUsagePercent.value.toFixed(0)}%`,
    description: 'De jugadores utiliza múltiples plataformas',
  },
]

const benefitsOfPlayVisualData: typeof demographicVisualData =
  apiAnswerStore.benefitsOpinionInsights.map((opinion: any) => ({
    value: `${opinion.percent.toFixed(0)}%`,
    description: `${opinion.answer}`,
  }))

const communityBuilding: typeof demographicVisualData =
  apiAnswerStore.communityAnswerInsights.map((opinion: any) => ({
    value: `${opinion.percent.toFixed(0)}%`,
    description: `Juega con ${opinion.answer.toLowerCase()}`,
  }))
</script>

<template>
  <div
    class="h-full w-full flex flex-col bg-gradient-to-r from-sky-900 to-sky-950 text-white pdf_to_exoprt_container"
  >
    <NuxtLayout>
      <div class="flex flex-col gap-y-36 py-32">
        <div class="px-12 flex flex-col gap-10">
          <h1 class="text-7xl font-semibold uppercase w-full tracking-tighter">
            Hechos de Esenciales acerca de los videojuegos en Cuba,
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

        <TablesHorizontalColumn
          title="Diversidad en jugadores de videojugos"
          :data="demographicVisualData"
        />

        <!-- Flip cards -->
        <div class="flex space-x-8 place-content-center">
          <CardFlipCard>
            <template #front-card>
              <div
                class="h-full w-full !bg-emerald-500 flex flex-col items-center place-content-center tracking-tight leading-5 text-center"
              >
                <div class="flex-1 flex items-end w-32">
                  <svg
                    class="fill-white max-h-16"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    height="800px"
                    width="800px"
                    version="1.1"
                    id="Capa_1"
                    viewBox="0 0 53.626 53.626"
                    xml:space="preserve"
                  >
                    <g>
                      <path
                        d="M48.831,15.334c-7.083-11.637-17.753-3.541-17.753-3.541c-0.692,0.523-1.968,0.953-2.835,0.955   l-2.858,0.002c-0.867,0.001-2.143-0.429-2.834-0.952c0,0-10.671-8.098-17.755,3.539C-2.286,26.97,0.568,39.639,0.568,39.639   c0.5,3.102,2.148,5.172,5.258,4.912c3.101-0.259,9.832-8.354,9.832-8.354c0.556-0.667,1.721-1.212,2.586-1.212l17.134-0.003   c0.866,0,2.03,0.545,2.585,1.212c0,0,6.732,8.095,9.838,8.354c3.106,0.26,4.758-1.812,5.255-4.912   C53.055,39.636,55.914,26.969,48.831,15.334z M20.374,24.806H16.7v3.541c0,0-0.778,0.594-1.982,0.579   c-1.202-0.018-1.746-0.648-1.746-0.648v-3.471h-3.47c0,0-0.433-0.444-0.549-1.613c-0.114-1.169,0.479-2.114,0.479-2.114h3.675   v-3.674c0,0,0.756-0.405,1.843-0.374c1.088,0.034,1.885,0.443,1.885,0.443l-0.015,3.604h3.47c0,0,0.606,0.778,0.656,1.718   C20.996,23.738,20.374,24.806,20.374,24.806z M37.226,28.842c-1.609,0-2.906-1.301-2.906-2.908c0-1.61,1.297-2.908,2.906-2.908   c1.602,0,2.909,1.298,2.909,2.908C40.135,27.542,38.828,28.842,37.226,28.842z M37.226,20.841c-1.609,0-2.906-1.3-2.906-2.907   c0-1.61,1.297-2.908,2.906-2.908c1.602,0,2.909,1.298,2.909,2.908C40.135,19.542,38.828,20.841,37.226,20.841z M44.468,25.136   c-1.609,0-2.906-1.3-2.906-2.908c0-1.609,1.297-2.908,2.906-2.908c1.602,0,2.909,1.299,2.909,2.908   C47.377,23.836,46.07,25.136,44.468,25.136z"
                      />
                    </g>
                  </svg>
                </div>

                <h3 class="text-2xl font-semibold flex-1">
                  El {{ topOpinion.percent.toFixed(0) }}% de jugadores opina
                  que...
                </h3>
              </div>
            </template>
            <template #back-card>
              <div
                class="w-full h-full bg-emerald-700 flex flex-col items-center place-content-center tracking-tight leading-5 text-center"
              >
                <h3 class="text-2xl font-semibold">
                  {{ topOpinion.answer }}
                </h3>
              </div>
            </template>
          </CardFlipCard>

          <CardFlipCard>
            <template #front-card>
              <div
                class="w-full h-full bg-indigo-500 flex flex-col items-center place-content-center tracking-tight leading-5 text-center"
              >
                <div class="flex-1 flex items-end w-32">
                  <svg
                    class="fill-white flex-1 max-h-16"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    height="800px"
                    width="800px"
                    version="1.1"
                    id="Capa_1"
                    viewBox="0 0 53.626 53.626"
                    xml:space="preserve"
                  >
                    <g>
                      <path
                        d="M48.831,15.334c-7.083-11.637-17.753-3.541-17.753-3.541c-0.692,0.523-1.968,0.953-2.835,0.955   l-2.858,0.002c-0.867,0.001-2.143-0.429-2.834-0.952c0,0-10.671-8.098-17.755,3.539C-2.286,26.97,0.568,39.639,0.568,39.639   c0.5,3.102,2.148,5.172,5.258,4.912c3.101-0.259,9.832-8.354,9.832-8.354c0.556-0.667,1.721-1.212,2.586-1.212l17.134-0.003   c0.866,0,2.03,0.545,2.585,1.212c0,0,6.732,8.095,9.838,8.354c3.106,0.26,4.758-1.812,5.255-4.912   C53.055,39.636,55.914,26.969,48.831,15.334z M20.374,24.806H16.7v3.541c0,0-0.778,0.594-1.982,0.579   c-1.202-0.018-1.746-0.648-1.746-0.648v-3.471h-3.47c0,0-0.433-0.444-0.549-1.613c-0.114-1.169,0.479-2.114,0.479-2.114h3.675   v-3.674c0,0,0.756-0.405,1.843-0.374c1.088,0.034,1.885,0.443,1.885,0.443l-0.015,3.604h3.47c0,0,0.606,0.778,0.656,1.718   C20.996,23.738,20.374,24.806,20.374,24.806z M37.226,28.842c-1.609,0-2.906-1.301-2.906-2.908c0-1.61,1.297-2.908,2.906-2.908   c1.602,0,2.909,1.298,2.909,2.908C40.135,27.542,38.828,28.842,37.226,28.842z M37.226,20.841c-1.609,0-2.906-1.3-2.906-2.907   c0-1.61,1.297-2.908,2.906-2.908c1.602,0,2.909,1.298,2.909,2.908C40.135,19.542,38.828,20.841,37.226,20.841z M44.468,25.136   c-1.609,0-2.906-1.3-2.906-2.908c0-1.609,1.297-2.908,2.906-2.908c1.602,0,2.909,1.299,2.909,2.908   C47.377,23.836,46.07,25.136,44.468,25.136z"
                      />
                    </g>
                  </svg>
                </div>
                <h3 class="text-2xl font-semibold flex-1">
                  Los 5 géneros de juegos más populares entre los jugadores
                  son...
                </h3>
              </div>
            </template>
            <template #back-card>
              <div
                class="flip-card-back w-full h-full bg-indigo-700 flex flex-col items-center place-content-center tracking-tight leading-5 text-center"
              >
                <h4
                  class="text-xl font-medium"
                  v-for="gender in top5GameGenders"
                >
                  {{ (gender.answer as String).split('(')[0] }}
                  {{ gender.percent.toFixed(0) }}%
                </h4>
              </div>
            </template>
          </CardFlipCard>
        </div>

        <!-- Dispositive Usage -->
        <div class="flex flex-col items-center">
          <h4 class="text-3xl uppercase font-bold mb-6">Uso de dispositivos</h4>
          <div class="flex place-content-between gap-x-4 w-full">
            <div
              class="flex flex-col flex-1"
              v-for="(device, i) in deviceUsage"
            >
              <span class="font-medium whitespace-nowrap">{{
                device.answer
              }}</span>
              <div
                :class="i % 2 === 0 ? 'bg-green-700' : 'bg-indigo-700'"
                class="w-full h-7 rounded-full"
              >
                <div
                  :style="{
                    width: `${device.percent.toFixed(0)}%`,
                  }"
                  :class="i % 2 === 0 ? 'bg-green-500' : 'bg-indigo-500'"
                  class="px-2 h-full rounded-l-full text-right items-center text-lg"
                >
                  <span class="font-medium">
                    {{ device.percent.toFixed(0) }}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <TablesHorizontalColumn
          title="Hábitos en jugadores de videojugos"
          :data="habitsVisualData"
        />

        <div class="pt-14 border-t-2 border-emerald-400 border-dotted">
          <h1
            class="font-bold text-5xl uppercase text-emerald-400 border-b-2 border-dotted w-fit pb-14 pr-24 border-indigo-500"
          >
            Los beneficios de jugar
          </h1>
        </div>

        <div class="flex flex-col gap-y-12">
          <h4 class="text-3xl uppercase font-bold self-center">
            Beneficios de los juegos
          </h4>

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

        <div class="flex flex-col gap-y-12">
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
      <div class="w-full h-14">
        <InterestingFactsPdf>
          Descargar Anuario de Videojuegos {{ new Date().getFullYear() }}
        </InterestingFactsPdf>
      </div>
    </NuxtLayout>
  </div>
</template>

<style scoped></style>
