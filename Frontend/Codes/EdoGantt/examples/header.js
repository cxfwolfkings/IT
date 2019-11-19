var exampleName = document.title.split('|')[0];
var headerHTML = '<div class="hd">\
    <a class="logo" href="http://www.edogantt.com">\
        <img src="../images/logo.gif" alt="易度甘特图，专业的web gantt解决方案" />\
    </a>\
    <div class="hd-top">\
        <form class="search" action="http://www.google.cn/search" method="get">\
            <input type=hidden name=domains value="www.edogantt.com"/>\
            <input type=hidden name=sitesearch value="www.edogantt.com"/>\
            <input name="q" type="text" class="search-text"/>\
            <input type="submit" value="" class="search-btn" />\
        </form>\
        <div class="language">\
            <a href="javascript:changelan();" class="language-sel">简体中文</a>\
        </div>\
        <div class="clear"></div>\
    </div>\
    <div class="hd-nav">\
        <div class="hd-menu">\
            <div class="hd-menu-inner">\
                <a href="http://www.edogantt.com/zh_cn/index.html">首页</a>\
                <a href="http://www.edogantt.com/zh_cn/product.html">产品</a>\
                <a href="http://www.edogantt.com/zh_cn/support.html">技术支持</a>\
                <a href="http://www.edogantt.com/zh_cn/download.html">下载</a>\
                <a href="http://www.edogantt.com/zh_cn/buy.html">购买</a>\
                <a href="http://www.edogantt.com/zh_cn/cases/index.html">成功案例</a>\
                <a href="http://www.edogantt.com/zh_cn/about.html">关于易度</a>\
                <div class="clear"></div>\
            </div>\
        </div>\
        <div class="hd-path">\
            导航： <a href="../index.html">首页</a> > <a href="../product.html">产品</a> > <a href="index.html">开发手册</a> > '+exampleName+'\
        </div>\
    </div>\
</div>';

document.write('<link href="../css/core.css" rel="stylesheet" type="text/css" />');
document.write(headerHTML);