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
		presets: [['/lib/node_modules/babel-preset-babili', {
                    "booleans"            : false,
                    "builtIns"            : false,
                    "consecutiveAdds"     : false,
                    "deadcode"            : false,
                    "evaluate"            : false,
                    "flipComparisons"     : false,
                    "guards"              : false,
                    "infinity"            : false,
                    "mangle"              : false,
                    "memberExpressions"   : false,
                    "mergeVars"           : false,
                    "numericLiterals"     : false,
                    "propertyLiterals"    : false,
                    "regexpConstructors"  : false,
                    "removeConsole"       : false,
                    "removeDebugger"      : false,
                    "removeUndefined"     : false,
                    "replace"             : false,
                    "simplify"            : false,
                    "simplifyComparisons" : false,
                    "typeConstructors"    : false,
                    "undefinedToVoid"     : false,
                }]]
	      }
	    }
	]
    }
};
