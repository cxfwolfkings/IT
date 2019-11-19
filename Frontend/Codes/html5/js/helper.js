/*
 * 验证Canvas是否可用
 * elemId: 输出提示语句的element id
 */
function checkCanvas(elemId) {
    try{
        document.createElement("canvas").getContext("2d");
        document.getElementById(elemId).innerHTML = 'HTML5 Canvas is supported in your browser.';
    } catch (e) {
        document.getElementById(elemId).innerHTML = 'HTML5 Canvas is not supported in your browser.';
    }
}