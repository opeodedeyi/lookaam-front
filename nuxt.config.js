export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'lookaam',
    htmlAttrs: {
      lang: 'en'
    },
    script: [
      { src: "https://apis.google.com/js/platform.js" },
    ],
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/face.png' }
    ]
  },

  // loading indicator
  loading: { height: '5px', color: '#4D69B4', failedColor: '#F25858', duration: 10000, throttle: 0 },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/styles/main.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~plugins/shorten-text.js',
    '~plugins/axios.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
  ],

  axios: {
    baseURL: process.env.BASE_URL || 'https://lookaam.herokuapp.com',
    Credentials: false 
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  router: {
    middleware: 'check-auth'
  }
}
