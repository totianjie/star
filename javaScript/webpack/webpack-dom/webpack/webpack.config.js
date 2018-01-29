module.exports={
	entry:'./entry.js',
	output:{
		filename:'main.js'
	},
	devtool:'source-map',//直接生成不用加-d了
	devServer:{"port":8088,"inline":true,open:true},
	module:{
		loaders:[
			{
				test:/\.css$/,
				loader:'style-loader!css-loader'
			},
			{
				test:/\.js$/,
				loader:'babel-loader',
				exclude:/node_modules///排除这个文件的js
			}
		]
	},
	// resolve:{//省略后缀  现在有问题
	// 	"extensions":['','.js','.css']
	// }
}