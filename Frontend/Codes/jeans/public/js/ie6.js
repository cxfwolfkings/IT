// 以下所有脚本只为IE6写，其他浏览器完全可以删除。
function getViewportScrollX() {
    var scrollX = 0;
    if (document.documentElement && document.documentElement.scrollLeft) {
      scrollX = document.documentElement.scrollLeft;
    }
    else if (document.body && document.body.scrollLeft) {
      scrollX = document.body.scrollLeft;
    }
    else if (window.pageXOffset) {
      scrollX = window.pageXOffset;
    }
    else if (window.scrollX) {
      scrollX = window.scrollX;
    }
    return scrollX;
}
 
function getViewportScrollY() {
    var scrollY = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
      scrollY = document.documentElement.scrollTop;
    }
    else if (document.body && document.body.scrollTop) {
      scrollY = document.body.scrollTop;
    }
    else if (window.pageYOffset) {
      scrollY = window.pageYOffset;
    }
    else if (window.scrollY) {
      scrollY = window.scrollY;
    }
    return scrollY;
}
 
function getViewportWidth() {
    var width = 0;
    if (document.documentElement && document.documentElement.clientWidth) {
      width = document.documentElement.clientWidth;
    }
    else if (document.body && document.body.clientWidth) {
      width = document.body.clientWidth;
    }
    else if (window.innerWidth) {
      width = window.innerWidth - 18;
    }
    return width;
}
 
function getViewportHeight() {
    var height = 0;
    if (window.innerHeight) {
      height = window.innerHeight - 18;
    }
    else if (document.documentElement && document.documentElement.clientHeight) {
      height = document.documentElement.clientHeight;
    }
    else if (document.body && document.body.clientHeight) {
      height = document.body.clientHeight;
    }
    return height;
}
 
if (navigator.userAgent.indexOf("MSIE 6") > -1 && navigator.userAgent.indexOf("MSIE 7") == -1 && navigator.userAgent.indexOf("MSIE 8") == -1) {
    window.ononload = window.onscroll = window.onresize = function (e) {
        var t = getViewportScrollY();
        var l = getViewportScrollX();
        var w = getViewportWidth();
        var h = getViewportHeight();
        document.getElementById("y1").style.left = l + "px";
        document.getElementById("y1").style.top = t + "px";
 
        document.getElementById("y2").style.left = l + w - document.getElementById("y2").offsetWidth + "px";
        document.getElementById("y2").style.top = t + "px";
 
        document.getElementById("y3").style.left = l + "px";
        document.getElementById("y3").style.top = t + h - document.getElementById("y2").offsetHeight + "px";
 
        document.getElementById("y4").style.left = l + w - document.getElementById("y2").offsetWidth + "px";
        document.getElementById("y4").style.top = t + h - document.getElementById("y2").offsetHeight + "px";
    }
}