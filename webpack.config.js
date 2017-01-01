module.exports = {
	entry: ['babel-polyfill', 'isomorphic-fetch', './src/index.js'],
	output: {
		path: __dirname + '/public/',
		publicPath: 'public/',
		filename: 'build.js'
	},
	module: {
		loaders: [
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.css$/, loader: 'style-loader!css-loader' }
    ]
	},
	babel: {
		presets: ['es2015', 'react', 'stage-2'],
		plugins: ['transform-runtime']
	}
};
