module.exports = {
    /**
     * env 用来指定我们代码的运行环境，并将运行环境中的预置的全局变量导入。
     * 由于我们的项目是是前端项目，并且同时用到了 ES6 和 Node.js 环境，
     * 所以我们同时启用 Browser、ES6 和 Node.js 三个运行环境。
     */
    env: {
        browser: true,
        node: true,
        es6: true
    },
    /**
     * 通过 extends 我们可以指定特定的代码检查规则。
     * 我们这里使用 eslint:recommended 和 plugin:vue/essential 这两个规则集。
     */
    extends: ["eslint:recommended", "plugin:vue/essential"],
    /**
     * ESLint 默认使用 Espree 作为其解析器，
     * 因为我们代码中可能会用到一些实验性的语言特性，
     * 因此我们在 parserOptions 中指定 babel-eslint 作为解析器。
     * 由于我们使用的是 es 模块，因此将sourceType指定为 module。
     * 
     * 值得注意的地方是 我们没有在 parser 中指定 babel-eslint，而是在 parserOptions.parser 指定的，
     * 这是由于在 eslint-plugin-vue 中使用了自定义的解析器 vue-eslint-parser。
     * 如果直接在 parser 中指定 babel-eslint 会覆盖 vue-eslint-parser 导致 eslint-plugin-vue 无法正常工作。
     */
    parserOptions: {
        parser: "babel-eslint",
        sourceType: "module"
    },
    /**
     * 我们需要在 plugins 中将用到的插件声明。
     * 比如我们用到了 eslint-plugin-vue 插件，
     * 插件的引入可以省略 eslint-plugin-，比如：
     */
    plugins: ["vue"],
    rules: {}
};
