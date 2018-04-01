const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PurifyCSSPlugin = require('purifycss-webpack'); // 消除冗余的css   依赖glob
const glob = require('glob');

module.exports = {
    entry: {
        index: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'), // 输出目录
        filename: 'js/[name].bundle.js' // 输出文件名
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // devServer中配制hot
        new HtmlWebpackPlugin({ // 处理html   如果有多个就new多个就ok
            title: '你好 webpack',
            filename: 'index.html',
            template: './src/index.html',
            hash: true,
            minify: {
                collapseWhitespace: true, // 压缩
                removeAttributeQuotes: true, // 删除html双引号
            },
            inject: true, // 默认true/'body' | 'head' | false 所有静态资源不会被引入
            //chunks: ['index2'], // 默认是把全部打包的js引入 ，这里是指定需要引入的js文件（主要是多页面时会用到），相对于是entry里的名字
        }),
        new CleanWebpackPlugin(['dist']), // 打包前先删除dist目录
        // new CopyWebpackPlugin({ // 复制文件
        //     from: path.resolve(__dirname, 'src/assets'),
        //     to: './assets'
        // })
        // new webpack.ProvidePlugin({ // 全局引入外部库，如果没有使用则不打包进去
        //     $: 'jquery'
        // }),
        new ExtractTextPlugin('css/index.css'), // 分离css  里面放的是css的输出目录
        new PurifyCSSPlugin({ // 消除冗余css
            paths: glob.sync(path.resolve(__dirname, 'src/*.html'))
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader'],
                    publicPath: '../' // 处理背景图片路径问题 目前图片目录是在上一级，看实际情况
                })
            },
            {
                test: /\.(jpg|png|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 5000, // 超过500k就不压缩成base64
                            outputPath: 'images' // 图片输入目录
                        }
                    }
                ]
            },
            {
                test: /\.(js|jsx)$/,
                use: ['babel-loader'],
                exclude: /node_modules/ // 排除node_modules不转换
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader', 'less-loader'],
                    publicPath: '../'
                })
            },
            {
                test: /\.(sass|scss)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader', 'sass-loader'],
                    publicPath: '../'
                })
            }
        ]
    },
    resolve: {
        extensions: [".js", ".json", ".vue", ".less", ".scss", ".sass"],
        alias: {
            // static: path.resolve(__dirname, './static')
        }
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        host: 'localhost',
        port: 8081,
        hot: true,
        open: true
    },
    // devtool: 'source-map',  // webpack3.x才需要用  4.x  --mode development就ok
};