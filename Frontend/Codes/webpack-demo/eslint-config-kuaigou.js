// ./eslint-config-kuaigou.js
module.exports = {
    extends: "eslint:recommended",
    env: {
        browser: true,
        es6: true,
        node: true
    },
    /**
     * 我们在 rules 中自定义了我们的规则，在代码中允许使用 console 和 alert，
     * 将代码缩进风格设置为两个空格，字符串的引号采用单引号形式。
     * 每一条规则除了接受字符串外，还可以接受一个数组，
     * 数组的第一项用来指定警告的级别，默认警告级别是 error。
     */
    rules: {
        "no-console": "off",
        "no-alert": "off",
        indent: ["error", 2],
        quotes: ["warn", "single"]
    }
};