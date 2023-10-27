import Toast, { PluginOptions } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

export default defineNuxtPlugin((nuxtApp) => {
  const options: PluginOptions = {
    toastClassName: '!rounded-sm',
    transition: 'Vue-Toastification__fade',
    timeout: 1500
  }

  nuxtApp.vueApp.use(Toast, options)
})
