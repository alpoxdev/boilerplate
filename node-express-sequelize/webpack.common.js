const path = require('path');
const { merge } = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
	mode: "development",
	target: 'node',
	externals: [nodeExternals()],
	entry: './src/index.ts',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: ['/node_modules'],
			},
		]
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
		fallback: {
			"fs": false,
			"tls": false,
			"net": false,
			"path": false,
			"zlib": false,
			"http": false,
			"https": false,
			"stream": false,
			"crypto": false,
			"url": false,
			"buffer": false,
			"querystring": require.resolve("querystring-es3")
		} 
	},
	optimization: {
		minimize: true,
		minimizer: [new TerserPlugin()],
	},
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, 'dist'),
	}
}