/**
 * 在 main.js 中，通过 require 方法引入 calc 模块。
 * 调用 calc 模块中的方法进行计算。
 * 两个模块之间相互独立，依赖关系通过 require 方法体现。
 */

const calc = require('./calc.js')
const r = 10;
console.log(calc.area(r))
console.log(calc.circumference(r))

// 方式二
// const {area, circumference} = require('./calc.js')
// console.log(area(r))
// console.log(circumference(r))