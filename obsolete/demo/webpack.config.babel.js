module.exports = {
    entry: "./source/game/main.js",
    output: {
        path: __dirname,
        filename: "bundle.js",
    },
    performance: {
        hints: process.env.NODE_ENV === 'production' ? "warning" : false
    },
    module: {
        loaders: [
	    {
	      test: /\.js$/,
	      loader: '/lib/node_modules/babel-loader',
	      query: {
		presets: ['/lib/node_modules/babel-preset-es2015']
	      }
	    }
	]
    }
};
