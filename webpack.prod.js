const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')
const path =require('path')

module.exports = merge(common, {
    devtool: 'source-map',
    output: {
        filename: 'js/[name]-[chunkhash:6].js',
        path: path.resolve(__dirname, 'dist'),       
    },
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true
        }),
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ]
})