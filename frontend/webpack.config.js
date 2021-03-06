const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname);
const APP_DIR = path.resolve(__dirname, 'src/app');

const config = {
	entry: APP_DIR + '/index.js',
	output: {
		path: BUILD_DIR,
		filename: 'bundle.js',
		publicPath: 'http://0.0.0.0:3001/'
	},
	devtool: 'source-map',
	devServer: {
		inline: true,
		port: 3001,
		contentBase: '/',
		historyApiFallback: {
			index: './index.html'
		},
		publicPath: 'http://0.0.0.0:3001/',
		hot: true,
		quiet: false,
		noInfo: false,
		headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
	},
	module: {
		loaders : [
			{
				test: /\.json$/,
				loaders: [
					'json-loader'
				]
			},
			{
				test : /\.(jsx|js)$/,
				include : APP_DIR,
				loader : ['babel-loader']
			},
			{
				test: /\.(css|scss)$/,
				loaders: ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap=true']
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/app/index.html',
			favicon: './src/app/css/favicon.png'
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin()
	]
};

module.exports = config;