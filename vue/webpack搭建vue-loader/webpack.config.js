//node 自带的
const path = require('path');
//引入本地的webpack
const webpack = require('webpack');

module.exports = {
    context:path.resolve(__dirname,'./src'),
    // entry:{
    //     app:'./main.js'
    // },
    // output:{
    //     path:path.resolve(__dirname,'./dist'),
    //     publicPath:'/build/',
    //     filename:'[name].build.js'
    // },
     entry: {
        /*
            app: ['./app.js', './a.js']  //按照顺序依次打包到app.bundle.js里面
        */
        /*
            app: './app.js',
		    a: './a.js'
            //最后生成两个打包文件 app.bundle.js和 a.bundle.js
        */
        app:'./main.js'
    },
    output: {
		/*
			开发环境    index引入方式<script src="./build.app.build.js">
						如果---》publicPath: '/build/',没有配  就直接引<script src="app.build.js">
						
						
			生产环境	index引入方式<script src="./dist.app.build.js">
		*/
        /* 输出目录，没有则新建 */
        path: path.resolve(__dirname, './dist'),
        /* 静态目录，可以直接从这里取文件 */
        publicPath: '/build/',
        /* 文件名 */
        filename: '[name].build.js'
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                use:['babel-loader'],
                //排除模块安装目录的文件
                exclude:/node_modules/
            },
            {
                test:/\.vue$/,
                use:['vue-loader']
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test:/\.less$/,
                use:['less-loader']
            },
            {
                test:/\.(png|jpg|svg)$/,
                use:['url-loader']
            },
            {
                test:/\.(png|jpg|svg)$/,
                use:[{
                    loader:'url-loader',
                    options:{
                        limit:50000
                    }
                }]
            }
        ]
    }
}