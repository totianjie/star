const webpack = require('webpack');
module.exports = {
	entry: {
		app: './index.js'
	},
	output: {
		path: __dirname + '/dist',
		filename: '[name].bundle.js',
		publicPath: '/assets'
	},
	devServer: {
		contentBase: __dirname + '/src',
		hot: true,
		inline: true,
		open: true
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
};