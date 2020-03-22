'use strict';

const Webpack = require('webpack');

const autoprefixer = require('autoprefixer');
const path = require('path');

module.exports = {
    watch: false,
    devtool: 'source-map',
    mode: 'development',
	entry:
	{
		main:
		[
            '@babel/polyfill',
            './src/scss/index.scss',
            './src/js/index.ts',
        ],
    },
	output:
	{
		path: path.join(__dirname, '../public/resources/js'),
		filename: 'bundle.js',
	},
	resolve: {
		extensions:
		[
			'.tsx',
			'.ts',
			'.jsx',
			'.js',
			'.json',
			'.scss',
			'.sass',
			'.css',
		],
	},
	module:	
	{
		rules:
		[
			{
            	test: /\.scss$/,
				use:
				[
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader',
						options:
						{
							sourceMap: true,
						},
					},
					{
						loader: 'postcss-loader',
						options:
						{
							plugins:
							[
								autoprefixer(),
							],
							sourceMap: true,
						},
					},
					{
						loader: 'sass-loader',
						options:
						{
							sourceMap: true,
						},
					}
				]
			},
			{
				test: /\.(js|jsx|ts|tsx)$/,
				exclude: /node_modules/,
				use:
				[
					{
						loader: 'babel-loader',
					},
				],
			},
		],
	},
	plugins:
	[
		new Webpack.NoEmitOnErrorsPlugin(),
	],
};