// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr:false,

  nitro: {
    preset: 'azure'
  },

  auth: {
    globalAppMiddleware: true,
    provider: {
        type: 'authjs',
    }
  },

  modules: ["@sidebase/nuxt-auth"]
})