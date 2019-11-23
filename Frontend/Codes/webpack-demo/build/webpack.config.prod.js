const merge = require("webpack-merge");
const baseConf = require("./webpack.config.base");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
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
    // 文件压缩
    let plugins = [new TerserPlugin()];
    let rules = [
        configureCSSLoader(env),
        configureBabelLoader(modern, browserslist),
        ...configureURLLoader(env)
    ];

    /**
     * 根据不同的构建环境，添加不同的ExtractTextPlugin
     * 这里，将生产环境分成了测试环境和线上环境。
     * 当构建的目标是线上环境时，我们为 css 文件都加上了 hash。
     * 当构建目标是测试环境时，css 不加 hash。
     * 与入口文件中的变量类似，ExtractTextPlugin 中使用的 [name] 和 [hash:8] 是会自动被 css 的名字和 hash 值替换。
     */ 
    if (env === "prod") {
        plugins.push(new ExtractTextPlugin("css/[name].[hash:8].css"));
    } else {
        plugins.push(new ExtractTextPlugin("css/[name].css"));
    }

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