const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,

  // Configuración del servidor de desarrollo
  devServer: {
    proxy: {
      '/api': {
        target: 'https://liban.onrender.com',
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/api': '' },
      },
    },
  },

  // Configuración para manejar archivos estáticos
  configureWebpack: {
    output: {
      publicPath: process.env.NODE_ENV === 'production' ? '/dist/' : '/',
    },
  },

  // Configuración para manejar archivos de medios
  chainWebpack: config => {
    const imagesRule = config.module.rule('images')

    imagesRule
      .use('file-loader')
      .loader('file-loader')
      .tap(options => {
        options.name = 'media/[name].[hash:8].[ext]'
        return options
      })
  },
})
