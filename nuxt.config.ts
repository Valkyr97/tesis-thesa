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
    gmail: 'ucigforms@gmail.com',
    gmailPass: 'GameHub.ucg.2023',
    serviceAccount_key_id: '6c6e73d1f99767e1a39907779b48b72e1bc6d2b1',
    serviceAccount_private_key:
      '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC9FosIufecADtn\nYPXe3vz6zNIRHMBgdseRa8YGttuu7rVwGJfdfjOatJ9f/ifBZ2hqP/jFQruwHrz2\nW5OET7QY68x/1Ei69zLQ1WgtueSOdVLOfGFx+HpHE3/pJop34fzpJosKBsTolOTH\nLGXg2zvXctewUBihGekENHd3t+lr0Ak92T3S02kbeVIMTmSmYwZpTWkLSRgqHF6W\nCowefg37BfQc8ODCbSzlrcPXWjQ3DSO5Ok19YGpbvMw2+EMJxHsp+gZMfAbTsVGB\nAh18SdWFsxVOMo5pcXYNCFqXfkHmzI8iilRkHctfIIINTkl83IuoWxGNhtn7Cq5a\nZIyAGP+lAgMBAAECggEAO8vGOgM9V3sHTiDugAV6cQGWqMyz1Y2afNVdMUBgZoic\nng9Y7zV6skDOabfg8Jt3/KmwTQlWe1KtJSc+lkfyRzNCX2ZNfbqwujPSlytDKP3X\nKu9QjY8rdBCpkZybi1/O8Bg9PfV4DakQVCApM5uA6BgsN1iNAV1FQAwrf5OMYIhD\n42sPhQsIsaM2NaY2CiRve52r6yCiN4g8HGqPM1Tdefmf3NS6OvbvFH+dNobEUTc4\nBX+eFOVMozJm18NzhbtdafkK+x7KjNqVYvyCXkOSVPoZSR1wPCijzT4UH5mq5mt8\noaQMPMPdwH/EZPOUvMfD3bxW+sRWD8n8XIaxnYUifQKBgQD9pTC47/OWjCeELHiC\nzhuCpnsXGuW7uC+50aHnrAYv1UvUhaRPl8T+vyxhd10l1J1SY6fsIgYlPaZnW5EF\nU+av+eCg/9wE8GMwtMZ1YWe8tC9/ijrBcERFFMwUUVjIJfjcZT0VcYDcWG8MaRAX\n5AF24NbgTmk5XWCZ7H4yHW/IawKBgQC+1+1SYG2K+5NfKbvSpbDrwPqrEBborYfa\nk+4pkYiFXIuFO13Shq3WSJ0bMxzzmueR1b42EXtH6lTFsk3EaMPgfcbYp6BxmxrQ\nYLIfXl06nqRm0wqFt+JZf7EF9bxmvfgDXGPdRMELlHph21WOPyj3YyCTPEh95Gev\nSGwmk9acLwKBgDX/dN/qNXFXZRI+ZWlzd2fZCVth3oaYL5DfkBhCBw8n2Xzk9pX7\nOXUCPfCB+NKU8OkZTiZ3F9fVyBc45ya7NeFA0RF1ZuGmS3eTBKz4j50cvv/n7ZpA\nzEfopYmtx7jUXKaO5vIpt8UxDnMV6tcrMySbuSMHjl8oAejC8Bq7KZEBAoGAZyVT\nOkutyQlRzIRE5IPzDGif0qb+isGHhKaheUwUKmgrbFX6zpdGC2PxrcrBYhSeBh8t\nEBIAvIy1RqipCXfKLmIsf9qRh/VZ17f7baLV5qHpnz1/GWiaaN7v8ZWwPyN7kW10\n+Bl58OVOA+fE5P3UCWlFKO7TC1/Qflc5RNxwiLcCgYEA8kHF/OjFlUMvaLXSjlZY\nAOCD/4KXZj4pyDK5uJ9VhXhm+6YAhczGnjMyvfIq/9zgV9x2iiuLoRFkAJXFOhMh\nOFwldKijB8lGXdX42jxRgyqYjHaJuXcNXWrvD9MIgUSp7vgcVKon28uTDUzGPdmV\n0OC3PaixBNHBXQ9KTqFEjlc=\n-----END PRIVATE KEY-----\n',
    courier_private_key: 'pk_test_5CG6ZYF78A4PZNKADM51P49XM73A',
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
