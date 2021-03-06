require('dotenv').config()

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

  publicRuntimeConfig: {
    bucketName: process.env.AWS_BUCKET_NAME,
    dirName: process.env.AWS_DIR_NAME_1,
    dirName2: process.env.AWS_DIR_NAME_2,
    region: process.env.AWS_REGION_1,
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/styles/main.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~plugins/shorten-text.js',
    '~plugins/axios.js',
    '~plugins/convertToWebp.js',
    '~plugins/uploadToS3.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/pwa',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/dotenv',
    '@nuxtjs/axios',
  ],

  pwa: {
    manifest: {
      name: 'Lookaam',
      short_name: 'Lookaam',
      description: 'Find different locations for you planned videoshoot or event',
      theme_color: '#4D69B4',
      lang: 'en',
      useWebmanifestExtension: false
    }
  },

  axios: {
    baseURL: process.env.BASE_URL,
    Credentials: false
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  router: {
    middleware: 'check-auth'
  }
}
