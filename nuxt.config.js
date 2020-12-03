export default {
  server: {
      port: 80, // 默认
      host: '0.0.0.0' // 本地
  },
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: '夏叶的技术博客',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '夏叶，夏叶博客，夏叶的技术博客' },
      // { "http-equiv": "Content-Security-Policy", content: "upgrade-insecure-requests" }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [{
        src: '/js/prism.js',
        ssr: true
    }]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '~assets/css/myface.css',
    '~assets/css/animate.css',
    '~assets/css/element-ui.css',
    '~assets/css/markdown.css',
    '~assets/css/reset.css',
    '~assets/iconfont/iconfont.css',
  ],
  styleResources: {
    scss: [
      '~assets/css/theme.scss',
      '~assets/css/common.scss'
    ]
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/filter',
    '@/plugins/axios'
    // {
    //   src: "@/plugins/vue-swiper.js", 
    //   ssr: false
    // }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    '@nuxtjs/style-resources',
    'cookie-universal-nuxt'
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {
    markdown: {
      prism: {
        theme: 'prism-themes/themes/prism-atom-dark.css'
      }
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: [/^element-ui/]
  },
  env: {
    // AXIOS_URL: 'http://127.0.0.1:3002'
    // AXIOS_URL: process.env.NODE_ENV === 'production' ? 'http://121.196.34.102:3002' : 'http://127.0.0.1:3002'
    AXIOS_URL: process.env.NODE_ENV === 'production' ? 'https://www.xiaye.cloud' : 'http://127.0.0.1:3002'
  }
}
