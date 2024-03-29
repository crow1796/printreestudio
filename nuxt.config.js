const webpack = require("webpack");

module.exports = {
  server: {
    port: process.env.PORT || 4123
  },
  env: {
    apiUrl: process.env.API_URL
  },
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width,initial-scale=1,viewport-fit=cover",
      },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || "",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  router: {
    middleware: 'flag-registrar'
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [
    "~/assets/css/tailwind.css",
    "~/assets/fonts/main.css",
    "~/resources/scss/main.scss",
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~/plugins/vuex-persist.js', ssr: false },
    { src: '~/plugins/vue-tags-input.js', ssr: false },
    "~/plugins/prototypes.js",
    "~/plugins/external-installs.js",
    "~/plugins/api.js",
    { src: '~plugins/vue-introjs.js', ssr: false },
    { src: '~plugins/flags.js', ssr: false },
    { src: '~plugins/locations.js', ssr: false },
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxtjs/auth-next",
    "@nuxtjs/pwa",
    [
      "nuxt-fontawesome",
      {
        imports: [
          {
            set: "@fortawesome/free-solid-svg-icons",
            icons: ["fas"],
          },
          ,
          {
            set: "@fortawesome/free-regular-svg-icons",
            icons: ["far"],
          },
          {
            set: "@fortawesome/free-brands-svg-icons",
            icons: ["fab"],
          },
        ],
      },
    ],
    "@nuxtjs/universal-storage",
    'vue-social-sharing/nuxt',
    '@nuxtjs/google-analytics',
    'vue-social-sharing/nuxt',
    [
      '@aceforth/nuxt-optimized-images',
      {
        optimizedImages: {
          optimizeImages: true
        },
        optimizeImagesInDev: true,

        mozjpeg: {
          quality: 80
        },
        pngquant: {
          quality: [0.4, 0.8]
        },
        svgo: {}
      }
    ],
    "@nuxtjs/device",
    'nuxt-facebook-pixel-module',
  ],
  facebook: {
    track: 'PageView',
    pixelId: '530983760973398',
    autoPageView: true,
    disabled: false
  },
  googleAnalytics: {
    id: 'UA-190265434-1'
  },
  storage: {
    cookie: {
      prefix: "printreestudio:",
    },
    localStorage: {
      prefix: "printreestudio:",
    },
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: process.env.API_URL
  },
  auth: {
    localStorage: false,
    resetOnError: true,
    cookie: {
      options: {
        expires: 7
      }
    },
    redirect: {
      login: false,
      callback: false,
      home: false,
      logout: false
    },
    strategies: {
      local: {
        token: {
          property: "token",
          maxAge: 604800
        },
        user: {
          property: "user",
          autoFetch: true
        },
        endpoints: {
          login: { url: 'login', method: 'post' },
          user: { url: 'me', method: 'post' },
          logout: false
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    extractCSS: true,
    postcss: {
      plugins: {
        tailwindcss: "./tailwind.config.js",
      },
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, { isDev, isClient }) {
      if (isClient) {
        config.module.rules.push({
          test: /\.worker\.js$/,
          use: { loader: "worker-loader" },
          exclude: /(node_modules)/,
        });
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        _: "lodash",
        introJs: ['intro.js'],
      }),
    ],
  },
};
