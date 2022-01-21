export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  loading: '~/components/LoadingBar.vue',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Protected Bookmarks',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/vue-clipboard'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  //   [ "k-domains", {
  //     subDomains: [ 'app' ], // List of directories to hold te pages for your subdomains
  //     rootDomain: "main" //  directory to hold the pages for root domain  
  // }
  // ],
  // ["@nuxtjs/router",{
  //     keepDefaultRouter: true // this line is mandatory...
  // }
  // ]
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // Firebase
    '@nuxtjs/firebase',
    // Alerts
    'vue-sweetalert2/nuxt',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

firebase: {
  config: {
    apiKey: "AIzaSyA166NheeF4xyTXLDRPaK1SdRy3IgcKnD0",
    authDomain: "protected-bookmarks-36055.firebaseapp.com",
    databaseURL: "https://protected-bookmarks-36055.firebaseio.com",
    projectId: "protected-bookmarks-36055",
    storageBucket: "protected-bookmarks-36055.appspot.com",
    messagingSenderId: "679344432250",
    appId: "1:679344432250:web:1a059dad9b7657a34887c3",
    measurementId: "G-XX52LJFBZC"
  },
  services: {
    firestore: true,
    auth: {
      persistence: 'local', // default
      initialize: {
        onAuthStateChangedMutation: 'ON_AUTH_STATE_CHANGED_MUTATION',
        onAuthStateChangedAction: 'onAuthStateChangedAction',
        subscribeManually: false
      },
      ssr: false, // default
      // emulatorPort: 9099,
      // emulatorHost: 'http://localhost',
    },
  }
},

  
firestore: {
  memoryOnly: false, // default
  chunkName: process.env.NODE_ENV !== 'production' ? 'firebase-auth' : '[id]', // default
  enablePersistence: true,
  emulatorPort: 8080,
  emulatorHost: 'localhost',
  settings: {
    // Firestore Settings - currently only works in SPA mode
  }
},



  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
