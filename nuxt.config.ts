// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@formkit/nuxt', '@nuxtjs/tailwindcss', '@pinia/nuxt'],
  routeRules: {
    '/private/**': { ssr: false },
    '/auth/**': { ssr: false },
  },

  runtimeConfig: {
    gapi_client_id:
      '904292748520-epvs2lqvad52jcb4f6jbuenned6ca3d5.apps.googleusercontent.com',
    secret_key: 'sOm3R4reStringt4hAt1muSingasK3y',
  },

  app: {
    head: {
      script: [{ src: 'https://accounts.google.com/gsi/client' }],
    },
  },

  pinia: {
    storesDirs: ['./stores/**', './stores/api/**'],
  },

  // formkit: {
  //   autoImport: true,
  // },

  nitro: {
    esbuild: {
      options: {
        tsconfigRaw: {
          compilerOptions: {
            experimentalDecorators: true,
          },
        },
      },
    },
  },
})
