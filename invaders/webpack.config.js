module.exports = {
    entry: "./source/game/main.js",
    output: {
        path: __dirname,
        filename: "bundle.js",
    },
    performance: {
        hints: process.env.NODE_ENV === 'production' ? "warning" : false,
        // The game bundle (engine + physics + game code) is about 600 KiB, so the
        // default 244 KiB web page budget doesn't apply. Warn only above 1 MB.
        maxAssetSize: 1024 * 1024,
        maxEntrypointSize: 1024 * 1024
    }
};
