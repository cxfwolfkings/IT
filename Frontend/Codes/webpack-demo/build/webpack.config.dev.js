const merge = require("webpack-merge");
const baseConf = require("./webpack.config.base");
const path = require("path");
const {
    configureBabelLoader,
    configureURLLoader,
    configureCSSLoader
} = require("./util");

// 本地开发服务器的配置
const devServer = {
    proxy: {
        "/api": "http://localhost:8081"
    },
    contentBase: path.resolve(__dirname, "../dist"),
    hot: true,
    compress: true,
    overlay: true,
    open: true,
    port: 3000
};
module.exports = merge(baseConf, {
    mode: "none",
    devtool: "eval-source-map",
    devServer,
    module: {
        rules: [
            configureCSSLoader(),
            configureBabelLoader(),
            ...configureURLLoader()
        ]
    }
});