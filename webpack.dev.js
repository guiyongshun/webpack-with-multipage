const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common,{
    devtool: 'inline-source-map',
    output:{
        // publicPath: '/dist/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin({
            // multiStep: true
        })
    ],
    devServer: {
        publicPath: '/dist/',
        historyApiFallback: true,
        openPage: 'dist/',
        inline: true,
        // noInfo: true,
        port: 8080,
        hot: true,
        proxy: {
            "/api": "http://localhost:3000"
        }
    }
})