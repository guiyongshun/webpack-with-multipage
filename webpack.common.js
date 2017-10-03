const path = require('path')
const url = require('url')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        app: path.resolve(__dirname,'src/script/index.js'),
        one: path.resolve(__dirname,'src/script/one.js'),
        vendor: [
            'lodash',
            // 'babel-polyfill'
        ]
    },
    output: {
        filename: 'js/[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        // publicPath: '/dist/',
    },
    module:{
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                include: path.resolve(__dirname,'src'),
                exclude: [path.resolve(__dirname,'node_modules')]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]-[hash:6].[ext]',
                            outputPath: 'css/'
                        }
                    },
                    "extract-loader",
                    {
                        loader: "css-loader",
                        options: {
                            minimize: true
                        }
                    }
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name]-[hash:6].[ext]',
                            outputPath: 'image/',
                            limit: 1,
                            publicPath: url.format({
                                hostname:'localhost',
                                protocol:'http:',
                                port:8080,
                                pathname:'/dist/'
                            })
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            gifsicle: {
                                interlaced: false,
                                optimizationLevel: 1
                            },
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,'src/index.html'),
            filename: 'index.html'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function(module){
                return module.context && module.context.indexOf("node_modules") !== -1;
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "manifest",
            minChunks: Infinity
        })
    ]
};