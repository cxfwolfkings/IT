/**
 * calc 模块不依赖任何外部模块，因此只需要通过在回调函数中，
 * 定义模块的逻辑即可。需要使用 return 将对外暴露的方法返回出来。
 */

define(function () {
    const { PI } = Math;
    const area = (r) => PI * r ** 2;
    const circumference = (r) => 2 * PI * r;
    return { area, circumference }
});