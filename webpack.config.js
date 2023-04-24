'use strict';
var path = require('path')
var webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
var devServerPort = 8093;

var appBasePath = './src/'
var fullAppBasePath = path.resolve(__dirname, appBasePath)

var dist = path.resolve(__dirname, 'dist')
module.exports = {
    //mode:'none',
    entry: './src/main',
    output: {
        path: dist,
        publicPath: "",
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': fullAppBasePath,
            //"@components": path.resolve(fullAppBasePath, "./views/components"),            
            // assets: path.resolve(__dirname, './content'),
        }
    },

    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: {
                    ts: 'ts-loader',
                    options: {
                        transpileOnly: true,// для ускорения сборки проекта
                        experimentalWatchApi: true, //для ускорения сборки проекта
                    },
                    //scss: 'vue-style-loader!css-loader!sass-loader', // <style lang="scss">
                    //sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax' // <style lang="sass">
                },
            }
        },
        {
            test: /\.tsx?$/,
            //include: /Scripts\/main/,
            loader: 'ts-loader',
            options: {
                // appendTsSuffixTo: [/^(?!.*admin).*\.vue$/]
                transpileOnly: true,  //для ускорения сборки проекта
                experimentalWatchApi: true,  //для ускорения сборки проекта
                appendTsSuffixTo: [/\.vue$/]
            }
        },

        {
            test: /\.less$/,
            loader: 'style-loader!css-loader!less-loader'
        },
        {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        },
        {
            test: /\.(eot|ttf|woff|woff2|ttc|otf)(\?\S*)?$/,
            loader: 'file-loader',
            
        },
        {
            test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
            loader: 'file-loader',
            options: {
                name: 'images/[name].[ext]?[hash]'
            },

        },
        ]
    },
    //https://webpack.js.org/configuration/dev-server/
    devServer: {
        contentBase: dist,
        publicPath: '/',
        inline: true,
        hot: true,
        compress: true,
        port: devServerPort,
        proxy: {

            // '/school':{
            //     target: 'http://localhost:8091',
            //     pathRewrite: {
            //         '/school' : ''
            //     }
            // },
            // '/websocket': {
            //     target: 'ws://localhost:54283',
            //     ws: true
            //  },
            // '/websocket':{
            //     target: 'ws://localhost:54283',
            //     pathRewrite: {
            //         '/websocket' : 'ws://localhost:54283/websocket'
            //     }
            // },

        },
        historyApiFallback: true,
        //compress: true,
        // proxy: {
        //     //todo: check
        //     '/WebSocket.ashx': 'ws://localhost:3000/WebSocket.ashx'
        // },        
    },

    //devtool: '#eval-cheap-module-source-map',
    //devtool: '#cheap-module-eval-source-map',
    devtool: 'source-map',

    //stats: "errors-only",

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
            //NODE_ENV: JSON.stringify('development')//JSON.stringify(NODE_ENV),
            //ApiBaseUrl: JSON.stringify(apiBaseUrl)
        }),
        //new VueLoaderPlugin(),// плагин для загрузки vue
        new HtmlWebpackPlugin({
            title: 'Progressme',
            filename: 'index.html',
            template: `${fullAppBasePath}/index.html`,
            //hash: true,
            //publicPath: `${fullAppBasePath}`,
            //inject: 'body',
            //favicon: `${paths.src}/images/favicon.ico`,
            //minify: {
            //collapseWhitespace: true,
            //},
        })
    ]

}
//module.exports.devtool = 'source-map'
//process.traceDeprecation = true

if (process.env.NODE_ENV === 'production') {

    module.exports.plugins = (module.exports.plugins || []).concat([

        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            comments: false,
            compress: {
                sequences: true,
                booleans: true,
                loops: true,
                unused: true,
                warnings: false,
                drop_console: true,
                unsafe: true
            }
        }),
    ]);
}