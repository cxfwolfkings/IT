/**
 * 如果模块依赖其他模块，可以通过 require 方法来加载，
 * 与 AMD 不同的是 CMD 是依赖就近，延迟执行。
 * 也就是说，需要的时候当用到的时候才 require，
 * 而不是像 AMD 需要在提前就声明好依赖，
 * 延迟执行指的是，模块 require 进来后并不会执行，
 * 在实际调用模块的时候才会执行。
 */

define(function (require, exports, module) {
    const $ = require('./jquery');
    const setBodyColor = color => {
        $('body').css('background-color', color)
    }
    module.exports = setBodyColor
})