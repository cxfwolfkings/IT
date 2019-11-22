/**
 * 我们在 calc.js 中定义了 area 方法用来计算圆的面积，
 * 定义了 circumference 方法用来计算圆的周长。
 * 两个方法定义在了 exports 对象上，对外暴露，
 * 模块内部的 PI 常量从是无法访问到的。
 */

const { PI } = Math;
exports.area = (r) => PI * r ** 2;
exports.circumference = (r) => 2 * PI * r;