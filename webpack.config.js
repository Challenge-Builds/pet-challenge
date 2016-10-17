const webpack = require('webpack'),
	path = require('path'),
	CleanPlugin = require('clean-webpack-plugin'),
	HtmlPlugin = require('html-webpack-plugin'),
	ExtractTextPlugin = require('extract-text-webpack-plugin');

var ENV = process.env.npm_lifecycle_event;
var isProd = ENV === 'prod';

module.exports = {
	entry: './app/app.js',
	output: {
		path: './dist',
		filename: '[name]_bundle.js'
	},
	devServer: {
        outputPath: path.join(__dirname, 'dist')
    },
	module: {
		loaders: [
			{ // Allows us to bring in ES2015/ES6 to our Front End Javascript
				test: /\.js?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel'
			},
			{ // Simple loader for just straight CSS files, see below for Sass
				test: /\.css$/,
				loader: 'style!css'
			},
			{
				test: /\.scss$/,
				loader: 'style!css!sass'
			},
			{ // Useful if your application is processing numerous Angular templates
				test: /\.html$/,
				loader: 'ngtemplate!html'
			}
		]
	},
	plugins: [
        // Clean our build folder before each build
		new CleanPlugin(['dist']),
		new webpack.optimize.CommonsChunkPlugin('/vendors/commons.js'), //
		new HtmlPlugin({
			template: './app/index.ejs',
			minify: {
				collapseWhitespace: isProd
			},
			inject: true
		}),
        // Extracts the CSS styles to an actual `.css` file that will be injected on build instead of it being included in the javascript
		new ExtractTextPlugin("styles.css")
	]
};