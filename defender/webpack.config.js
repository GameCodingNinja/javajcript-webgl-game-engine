module.exports = {
    entry: "./source/game/main.js",
    output: {
        path: __dirname,
        filename: "bundle.js",
    },
    performance: {
        hints: process.env.NODE_ENV === 'production' ? "warning" : false
    }
};
