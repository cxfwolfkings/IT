const merge = require("webpack-merge");
const baseConf = require("./webpack.config.base");
const webpack = require("webpack");
const {
    configureBabelLoader,
    configureURLLoader,
    configureCSSLoader
} = require("./util");

/**
 * 该模块对外暴露一个方法，该方法接收一个配置对象 options，该对象包含三个属性：
 *   1. env，表示构建的环境是什么，取值范围是 test、prod。默认值是 test。
 *   2. buildMode，表示是生成普通构建包、现代构建包还是旧浏览器构建包，取值范围是 common、modern 和 legacy。默认是在 common。
 *   3. browserslist，为 babel-loader 指定浏览器范围，用以划分现代浏览器和旧浏览器 。默认值是 null，值是一个字符串数组。
 */
module.exports = function (
    options = {
        env: "test",
        buildMode: "common",
        browserslist: ""
    }
) {
    let { env, buildMode, browserslist } = options;
    let filename = "js/[name].js";
    env = env === "prod" ? env : "test";
    if (buildMode !== "legacy" && buildMode !== "modern") {
        buildMode = "common";
    }
    if (!Array.isArray(browserslist)) {
        browserslist = null;
    }
    let plugins = [];
    let rules = [
        configureCSSLoader(env),
        configureBabelLoader(modern, browserslist),
        ...configureURLLoader(env)
    ];

    // 生产环境特定配置
    const prodConf = {
        output: {
            filename
        },
        module: { rules },
        plugins
    };

    return merge(baseConf, prodConf);
};