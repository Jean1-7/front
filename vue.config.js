const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,

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

  publicPath: process.env.NODE_ENV === 'production' ? '/dist/' : '/',

  chainWebpack: config => {
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'media/[name].[hash:8].[ext]'
      })
  },
})
