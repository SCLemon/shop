const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
    publicPath: './',
    devServer:{
        https:false,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:3007',
            },
        }
    },
})