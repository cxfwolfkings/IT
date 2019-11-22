/**
 * 如果模块依赖外部模块，需要在依赖数组中指出依赖的模块。
 * 这里指定的是模块的名称，具体的文件路径需要在 require.config 中进行配置。
 */

define(['jquery'], function ($) {
    const setBodyColor = color => {
        $('body').css('background-color', color)
    }
    return setBodyColor
});