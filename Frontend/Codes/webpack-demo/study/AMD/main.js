/**
 * 在入口文件中，我们通过 require.config 指定模块的路径映射，
 * 此外我们使用到了 calc 和 setBodyColor，
 * 我们通过 require 方法指定对他们的依赖，
 * 我们是在模块加载完成后才去执行回调函数中的代码。
 */

require.config({
    baseUrl: '/',
    paths: {
        setBodyColor: './setBodyColor',
        jquery: './jquery-3.4.0'
    }
})
require(['calc', 'setBodyColor'], function (calc, setBodyColor) {
    const r = 10;
    const c = '#000';
    console.log(calc.area(r));
    console.log(calc.circumference(r));
    setBodyColor(c);
});