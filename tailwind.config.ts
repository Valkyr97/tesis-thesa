const FormKitVariants = require('@formkit/themes/tailwindcss')
import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
    content: ['./tailwind-theme.js'],
    plugins: [FormKitVariants],
    theme: {
        extend: {
            backgroundImage: {
                door: "url('/img/door-background.jpg')",
            },
        },
    },
}
