/**
 * define 方法接收一个回调函数，来定义模块的代码逻辑，
 * 最后通过 module.exports 或者 exports 对象将接口对外暴露出去，
 * 这一点写法上与 CommonJS 非常相似。
 */

define(function (require, exports, module) {
    const { PI } = Math;
    const area = (r) => PI * r ** 2;
    const circumference = (r) => 2 * PI * r;
    module.exports = { area, circumference }
})