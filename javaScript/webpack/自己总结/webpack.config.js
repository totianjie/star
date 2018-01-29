/* 引入操作路径模块和webpack */
var path = require('path');
var webpack = require('webpack');

module.exports = {
    context:path.resolve(__dirname,'./src'),
    /* 输入文件 */
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
        /* 输出目录，没有则新建 */   //build 构建后的路径就是在dist下面  平时开发的话就是在静态目录下取   如果没设静态目录就直接取就好  一定要注意
        path: path.resolve(__dirname, './dist'),
        /* 静态目录，可以直接从这里取文件 */
        publicPath: '/build/',
        /* 文件名 */
        filename: '[name].build.js'
    },
    //下面两个使用都会报错
    // resolve: {
    //     extensions: ['', '.js', '.vue']
    // },
    // devServer: {
	// 	contentBase: __dirname + '/src',
	// 	hot: true,
	// 	inline: true,
	// 	open: true,
    //     prot:8088
	// },
	devtool:'source-map',//直接生成不用加-d了   生成 .map  文件
    plugins: [
		// new webpack.optimize.CommonsChunkPlugin({
		// 	name: "commons",
		// 	filename: "commons.js",
		// 	minChunks: 2, //有任意模块加载了两次或更多,这里2就是设置超过2次以上使用   这样写在在页面中一定要引入公共的这个文件commons.js
		// }),
        //webpack-dev-server
        new webpack.HotModuleReplacementPlugin()
        /*
            css分开打包  要下载插件
            const ExtractTextPlugin = require("extract-text-webpack-plugin");
            new ExtractTextPlugin({
                filename: "[name].bundle.css",
                allChunks: true,
            }),
        */

        /*
            自动生成html页面
            const HtmlWebpackPlugin = require('html-webpack-plugin');
            new HtmlWebpackPlugin({
                title: 'My-App',
                filename: './index.html'
		    })
        */
        //new webpack.optimize.UglifyJsPlugin()  这个是专门用来压缩的插件，和 -p有点类似
	],
    module: {
        rules: [
            /* 用来解析vue后缀的文件 */
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            /* 用babel来解析js文件并把es6的语法转换成浏览器认识的语法 */
            {
                test: /\.js$/,
                use: 'babel-loader',
                /* 排除模块安装目录的文件 */
                exclude: /node_modules/
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
			/*
				//css模块化   详见webpack/webpack-demo/demo7
				{
					test: /\.css$/,
					use: [
						'style-loader', {
							loader: 'css-loader', //这样的配置，让其支持css模块化(css modules)   要下载----》normalize.css模块
							options: {
								modules: true
							}
						}
					]
				},
			*/
            //css分开打包
            // {
            //     test:/\.css$/,
            //     loader:ExtractTextPlugin.extract({
            //         loader: 'css-loader?importLoaders=1',
            //     })
            // },
            {
                test:/\.less$/,
                use:['less-loader']
            },
            // {
            //     test:/\.sass|scss$/,
            //     use:[
            //         'style-loader',
            //         'css-loader',
            //         'sass-loader'
            //     ]
            // },
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
    },
    /*
		//css模块化
        resolve: {
		    modules: [path.resolve(__dirname, 'src'), 'node_modules'] //css模块，先从src目录里面找，在从node_module里面找
	    }
    */
}


//要在css模块化开发   
/*
    比如有个a.css 要在main.js中使用
    在a.css中要引入      
        @import 'normalize.css';
        @import 'b.css';   这是自己的css  


    在main.js中
        import aStyle from './a.css';   就这样就可以生效了
*/


 /*
	自动生成html页面 
		在plugins里面这样配  打包就会自动生成html页面
	const HtmlWebpackPlugin = require('html-webpack-plugin');
	new HtmlWebpackPlugin({
		title: 'My-App',
		filename: './index.html'
	})
*/

/*
	自动拷贝进入文件夹dist  如果to:''    目前测试没成功   但肯定是可以用的
		在plugins里面配就行了   
	const CopyWebpackPlugin = require('copy-webpack-plugin');
	new CopyWebpackPlugin([{
		from: './*.html',
		to: ''
	}])
	
	
	from    定义要拷贝的源目录           from: __dirname + ‘/src/public’
	to      定义要拷贝到的目标目录     	 from: __dirname + ‘/dist’
	toType  file 或者 dir         		 可选，默认是文件
	force   强制覆盖先前的插件           可选 默认false
	context                              可选 默认base context可用specific context
	flatten 只拷贝文件不管文件夹         默认是false
	ignore  忽略拷贝指定的文件           可以用模糊匹配
*/


/*
	//提取公共的

	//有任意模块加载了两次或更多,这里2就是设置超过2次以上使用   这样写在在页面中一定要引入公共的这个文件commons.js
		
	 new webpack.optimize.CommonsChunkPlugin({
		name: "commons",
		filename: "commons.js",
		minChunks: 2, 
	}),
*/
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		