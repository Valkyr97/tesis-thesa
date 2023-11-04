import { defineFormKitConfig } from '@formkit/vue'
import { genesisIcons } from '@formkit/icons'
import { generateClasses } from '@formkit/themes'
import { es } from '@formkit/i18n'
import { createAutoHeightTextareaPlugin } from '@formkit/addons'

import myTilwindTheme from './tailwind-theme'

export default defineFormKitConfig({
  locales: { es },
  locale: 'es',
  icons: {
    ...genesisIcons,
  },
  config: {
    classes: generateClasses(myTilwindTheme),
  },
  plugins: [
    createAutoHeightTextareaPlugin()
  ]
})
