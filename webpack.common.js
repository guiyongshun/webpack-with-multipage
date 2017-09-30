const path = require('path')
const url = require('url')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const myPort = 8080;

module.exports = {
    entry: {
        app: path.resolve(__dirname,'src/script/index.js'),
        one: path.resolve(__dirname,'src/script/one.js'),
        html: path.resolve(__dirname,'src/index.html'),
        vendor: [
            'lodash'
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
                exclude: path.resolve(__dirname,'node_modules')
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: ''
                        }
                    },
                    'extract-loader',
                    {
                        loader: 'html-loader',
                        options: {
                            attrs: ["img:src", "link:href"],
                            interpolate: true,
                        }
                    }
                ],
                exclude: /app.html/
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
                    }
                ]
            },
            // {
            //     test: /\.(jpe?g|png|gif|svg)$/i,
            //     use: [
            //         {
            //             loader: 'file-loader',
            //             options: {
            //                 name: '[name]-[hash:6].[ext]',
            //                 outputPath: 'image/',    //相对于dist的输出路径，别在name上用[path]贼坑
            //                 // context: ''
            //                 publicPath: path.join(__dirname,'dist/')
            //             }
            //         }
            //     ]
            // }
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name]-[hash:6].[ext]',
                            outputPath: 'image/',
                            limit: 8192,
                            publicPath: url.format({
                                hostname:'localhost',
                                protocol:'http:',
                                port:8080,
                                pathname:'/dist/'
                            })
                            // context: 'dist',
                            // useRelativePath: true
                        }
                    },
                    'image-webpack-loader'
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,'src/app.html'),
            filename: 'app.html'
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