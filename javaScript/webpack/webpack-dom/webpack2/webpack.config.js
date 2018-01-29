const webpack=require('webpack');//最好把本地的引入
const path=require('path');
module.exports={
	context:path.resolve(__dirname,'src'),//生成绝对路径
	entry:{
		app:'./main.js'
	},
	output:{
		path:path.resolve(__dirname,'build'),
		filename:'[name].bundle.js'
	},
	devServer:{"inline":true,"open":true,"port":8088},
	module:{
		rules:[
			{
				test:/\.js$/,
				use:['babel-loader'],
				exclude:/node_modules/
			},
			{
				test:/\.css$/,
				use:['style-loader','css-loader']
			},
			{
				test: /\.vue$/,
        		loader: 'vue-loader'
			}
		]
	}

}