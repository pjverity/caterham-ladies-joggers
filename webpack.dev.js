const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');

module.exports = merge(common, {
	devtool: 'inline-source-map',
	devServer: {
		contentBase: path.resolve(__dirname, 'dist'),
		historyApiFallback: true,
		proxy: {
			'/': {
				target: 'http://localhost:8081/clj',
				secure: false,
				xfwd: true,
				autoRewrite: true,
				changeOrigin: true
			}
		}
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development')
		})
	],
	mode: "development"
});