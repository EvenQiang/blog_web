module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: '王文强的个人网站 - Wang WenQiang’s Personal Website',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: '王文强的个人网站'
      }
    ],
    link: [{
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'manifest',
        href: '/manifest.json'
      },
    ]
  },
  css: [{
    src: '~assets/styles/base.styl',
    lang: 'stylus'
  }],
  env: {
    baseUrl: 'http://localhost:4000/',
    BASE_URL: 'http://example.com/'
  },
  /*
   ** Customize the progress bar color
   */
  loading: false,
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLint on save
     */
    extend(config, {
      isDev,
      isClient
    }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}