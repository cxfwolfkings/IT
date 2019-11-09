//如下JS代码实现将Twitter搜索gadget添加到文档中
//然后为文档中所有的链接都添加一个事件处理程序
//实现当鼠标指针划过一个链接的时候，就会调用postMessage()方法
//让gadget去搜索链接上的URL指定的内容。这可以允许用户要发一条包含网站内容的tweet时
//在未访问该站点前就能够先看到网站内容
window.addEventListener("load", function () { //在IE9以下的版本无效
    var origin = "http://davidflanagan.com";  // gadget源
    var gadget = "/demos/TwitterSearch.html";  // gadget路径
    var iframe = document.createElement("iframe");  //创建iframe
    iframe.src = origin + gadget;  //设置它的URL
    iframe.width = "250";  // 250个像素宽
    iframe.height = "100%"; //整个文档高度
    iframe.style.cssFloat = "right";  //右浮动
    //将该iframe插入到文档的最开始
    document.body.insertBefore(iframe, document.body.firstChild);
    //查找所有的链接，并把它们绑定到gadget上
    var links = document.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        // addEventListener在IE8及其早期版本无效
        links[i].addEventListener("mouseover", function () {
            //作为查询内容传递url
            //只当iframe仍然显示来自davidflanagan.com文档的时候传递它
            iframe.contentWindow.postMessage(this.href, origin);
        }, false);
    }
}, false); 