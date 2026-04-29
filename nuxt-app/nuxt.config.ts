// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    'nuxt-lottie',
    '@pinia/nuxt',
  ],
  pinia: {
    storesDirs: ['./app/stores/**']
  },
  routeRules: {
    '/': {
      isr: 3600
    },

  },

  fonts: {
    families: [
      { name: 'Barlow Condensed', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900] },
      { name: 'Barlow', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900] }
    ]
  }
})