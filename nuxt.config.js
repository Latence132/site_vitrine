module.exports = {
  /*
  ** Build configuration
  */
  build: {
    babel: {
     presets: ['env','vue-app'],
     plugins: ['transform-runtime']
   },
   vendor: [
     'babel-polyfill',
     'eventsource-polyfill',
   ],
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev }) {
      if (isDev && process.client) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
        //this rules is needed with nuxt-edge
        config.module.rules.push({
          test: /\.pug$/,
          loader: 'pug-plain-loader'
        })
      }
    }

  },
  css: [
    { src: '~/assets/stylus/main.styl', lang: 'styl' }
  ],
  /*
  ** Headers of the page
  */
  head: {
    title: 'Web developpeur A.Chaumet',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  plugins: [
    '~plugins/vuetify.js'
  ]

}
