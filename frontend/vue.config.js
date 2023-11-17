const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: '',
  transpileDependencies: true,
  pages: {
    index: {
      // entry for the page
      entry: 'src/main.js',
      title: 'Bulletin Board',
    },
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: { '^/api': '/' }
      }
    }
  }
})
