module.exports = {
	entry: ['./src/scripts/index.js'],
	output: {
		path: __dirname + '/public/',
		publicPath: 'public/',
		filename: 'build.js'
	},
	module: {
		loaders: [{
			test: /\.js$/,
			loader: 'babel',
			exclude: /node_modules/
		}]
	},
	babel: {
		presets: ['react', 'es2015'],
		plugins: ['transform-runtime']
	}
};