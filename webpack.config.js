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
			{ // Simple loader for just straight CSS files, see below for Sass and Less
				test: /\.css$/,
				loader: 'style!css'
			},
			{ // If you want to use Sass/Scss `npm install sass-loader --save-dev` and `node-sass` is also recommended
				test: /\.scss$/,
				loader: 'style!css!sass'
			},
			{ // Useful if your application is processing numerous Angular templates, `npm install ngtemplate-loader --save-dev`
				test: /\.html$/,
				loader: 'ngtemplate!html'
			}
			// { Useful if your application is processing numerous font or asset files, `npm install file-loader --save-dev`
			// 	test: /\.(gif|png|jpe?g|ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
			// 	loader: 'file-loader'
			// }
		]
	},
	plugins: [
        // Clean our build folder before each build
		new CleanPlugin(['dist']),
        // Looks through our project for common vendor files and brings them into
        // one built file instead of building the same files mutliple times
		new webpack.optimize.CommonsChunkPlugin('/vendors/commons.js'), //
		new HtmlPlugin({
			template: './app/index.ejs',
			minify: {
				collapseWhitespace: isProd
			},
            // Tells webpack whether or not we want the scripts injected or
            // if our template is manually setup
			inject: true
		}),
        // Extracts the CSS styles to an actual `.css` file that will be injected on build instead of it being included in the javascript
		new ExtractTextPlugin("styles.css")
        // Annotates Angular Code to make sure it is minified properly, `npm install ng-annotate-webpack-plugin`
		// new ngAnnotatePlugin({
		// 	add: true
		// }),
	]
};