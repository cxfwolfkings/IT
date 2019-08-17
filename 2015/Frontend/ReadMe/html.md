# html

## 目录

1. [基础](#基础)
   - [标题](#标题)
   - [段落](#段落)
   - [样式](#样式)
   - [格式化](#格式化)
   - [注释](#注释)
   - [超连接](#超连接)
   - [图像](#图像)
   - [表格](#表格)
   - [列表](#列表)
   - [线包字](#线包字)
   - [块](#块)
   - [类](#类)
   - [布局](#布局)
   - [响应式&nbsp;Web&nbsp;设计](#响应式&nbsp;Web&nbsp;设计)
   - [框架](#框架)
2. [图形](#图形)
   - [Canvas](#Canvas)
   - [SVG](#SVG)
   - [Canvas&nbsp;vs&nbsp;SVG](#Canvas&nbsp;vs&nbsp;SVG)

蒂姆•伯纳斯-李与罗伯特•卡里奥（Robert Cailliau）共同发明了Web，也发明了HTML：超文本标记语言

## 基础

### 标题

`<h1> - <h6>`

`<h1>`最大，`<h6>`最小

默认情况下，HTML会自动在块级元素前后添加一个额外的空行，比如段落、标题元素前后。

请确保将 HTML heading 标签只用于标题。不要仅仅是为了产生粗体或大号的文本而使用标题。

搜索引擎使用标题为您的网页的结构和内容编制索引。

`<hr />`标签在HTML页面中创建水平线。hr元素可用于分隔内容。

使用水平线（`<hr>`标签）来分隔文章中的小节是一个办法（但并不是唯一的办法）。

注释：`<!-- This is a comment -->`

### 段落

通过`<p>`标签定义。

使用空段落标记`<p></p>`去插入一个空行是坏习惯。用`<br/>`标签代替！但是不要用`<br/>`标签去创建列表。

`<br/>` 元素是一个空的HTML元素。由于关闭标签没有任何意义，因此它没有结束标签。

您无法通过在HTML代码中添加额外的空格或换行来改变输出的效果。

当显示页面时，浏览器会移除源代码中多余的空格和空行。所有连续的空格或空行都会被算作一个空格。

### 样式

style 属性的作用：提供了一种改变所有 HTML 元素的样式的通用方法。
样式是 HTML 4 引入的，它是一种新的首选的改变 HTML 元素样式的方式。通过 HTML 样式，能够通过使用 style 属性直接将样式添加到 HTML 元素，或者间接地在独立的样式表中（CSS 文件）进行定义。

### 格式化

**文本格式化标签：**

标签|描述
-|-
`<b>`|定义粗体文本。
`<big>`|定义大号字。
`<em>`|定义着重文字。
`<i>`|定义斜体字。
`<small>`|定义小号字。
`<strong>`|定义加重语气。
`<sub>`|定义下标字。
`<sup>`|定义上标字。
`<ins>`|定义插入字。
`<del>`|定义删除字。
`<s>`|不赞成使用。使用 `<del>` 代替。
`<strike>`|不赞成使用。使用 `<del>` 代替。
`<u>`|不赞成使用。使用样式（style）代替。

**“计算机输出”标签：**

标签|描述
-|-
`<code>`|定义计算机代码。
`<kbd>`|定义键盘码。
`<samp>`|定义计算机代码样本。
`<tt>`|定义打字机代码。
`<var>`|定义变量。
`<pre>`|定义预格式文本。
`<listing>`|不赞成使用。使用 `<pre>` 代替。
`<plaintext>`|不赞成使用。使用 `<pre>` 代替。
`<xmp>`|不赞成使用。使用 `<pre>` 代替。

**引用、引用和术语定义：**

标签|描述
-|-
`<abbr>`|定义缩写。
`<acronym>`|定义首字母缩写。
`<address>`|定义地址。
`<bdo>`|定义文字方向。
`<blockquote>`|定义长的引用。
`<q>`|定义短的引用语。
`<cite>`|定义引用、引证。
`<dfn>`|定义一个定义项目。

`<q>` 元素定义短的引用。浏览器通常会为 `<q>` 元素包围引号

`<blockquote>` 元素定义被引用的节。浏览器通常会对 `<blockquote>` 元素进行缩进处理。

`<abbr>` 元素定义缩写或首字母缩略语。对缩写进行标记能够为浏览器、翻译系统以及搜索引擎提供有用的信息。

`<dfn>` 元素定义项目或缩写的定义。

`<address>` 元素定义文档或文章的联系信息（作者/拥有者）。此元素通常以斜体显示。大多数浏览器会在此元素前后添加折行。

`<cite>` 元素定义著作的标题。浏览器通常会以斜体显示 `<cite>` 元素。

`<bdo>` 元素定义双流向覆盖（bi-directional override）。用于覆盖当前文本方向

### 注释

`<!-- 在此处写注释 -->`

条件注释

```html
<!--[if IE 8]>
  .... some HTML here ....
<![endif]-->
```

### 超连接

通过`<a>`标签进行定义，有两种使用 `<a>` 标签的方式：

- 通过使用 href 属性 - 创建指向另一个文档的链接
- 通过使用 name 属性 - 创建文档内的书签，锚（anchor）。

```html
<a name="tips">基本的注意事项 - 有用的提示</a>
<a href="#tips">有用的提示</a>
```

超链接分类

- 内部连接：在同一网站文档之间的连接
- 外部连接：不同网站文档之间的连接
- E-mail连接：电子邮件的连接
- 锚点连接：同一网页或不同网页的指定位置的连接
- 图形热点连接：指在一张图片上实现多个局部区域指向不同的网页链接

连接目标的target属性

- _blank 在新建窗口中打开超连接
- _parent 在父窗口中打开超连接，常在有框架结构的网页中应用
- _self 在本窗口或本框架中打开超连接
- _top 在整个浏览器窗口中打开超连接，并删除所有框架结构

请始终将正斜杠添加到子文件夹。假如这样书写链接：`href="http://www.w3school.com.cn/html"`，就会向服务器产生两次 HTTP 请求。这是因为服务器会添加正斜杠到这个地址，然后创建一个新的请求，就像这样：`href="http://www.w3school.com.cn/html/"`。

### 图像

通过`<img>`标签定义。`<img>`是空标签，意思是说，它只包含属性，并且没有闭合标签。要在页面上显示图像，你需要使用源属性(src)。src指"source"。源属性的值是图像的URL地址。

URL指存储图像的位置。如果名为"boat.gif"的图像位于 www.w3school.com.cn的images目录中，那么其 URL为 `http://www.w3school.com.cn/images/boat.gif`。

alt属性用来为图像定义一串预备的可替换的文本。替换文本属性的值是用户定义的。

假如某个HTML文件包含10个图像，那么为了正确显示这个页面，需要加载11个文件。加载图片是需要时间的，所以我们的建议是：慎用图片。

map定义一个客户端图像映射。图像映射（image-map）指带有可点击区域的一幅图像。area 元素永远嵌套在 map 元素内部。area 元素可定义图像映射中的区域。`<img>`中的 usemap 属性可引用 `<map>` 中的 id 或 name 属性（取决于浏览器），所以我们应同时向 `<map>` 添加 id 和 name 属性。

### 表格

在以前对网页布局要求不高的情况下，使用table布局(既使用表格来显示数据，同时又用于布局)。

表格由`<table>`标签定义。每个表格均有若干行(由`<tr>`标签定义)，每行被分割为若干单元格(由`<td>`标签定义)。字母td指表格数据(table data)，即数据单元格的内容。数据单元格可以包含文本、图片、列表、段落、表单、水平线、表格等等。

表格的表头使用`<th>`标签进行定义。大多数浏览器会把表头显示为粗体居中的文本。

在一些浏览器中，没有内容的表格单元显示得不太好。如果某个单元格是空的(没有内容)，浏览器可能无法显示出这个单元格的边框。为了避免这种情况，在空单元格中添加一个空格占位符，就可以将边框显示出来。

caption 元素定义表格标题。caption 标签必须紧随 table 标签之后。您只能对每个表格定义一个标题。通常这个标题会被居中于表格之上。

`<colgroup>` 标签用于对表格中的列进行组合，以便对其进行格式化。如需对全部列应用样式，`<colgroup>` 标签很有用，这样就不需要对各个单元和各行重复应用样式了。`<colgroup>` 标签只能在 table 元素中使用。请为 `<colgroup>` 标签添加 class 属性。这样就可以使用 CSS 来负责对齐方式、宽度和颜色等等。

### 列表

***无序列表***

无序列表始于`<ul>`标签。每个列表项始于`<li>`。列表项内部可以使用段落、换行符、图片、链接以及其他列表等等。

☞ type可以取 disc、circle、square

***有序列表***

有序列表始于`<ol>`标签。每个列表项始于`<li>`。列表项内部可以使用段落、换行符、图片、链接以及其他列表等等。

☞type用于指定用什么来显示, start表示从第几开始计算.

***自定义列表***

自定义列表以`<dl>`标签开始。每个自定义列表项以`<dt>`开始。每个自定义列表项的定义以`<dd>`开始。定义列表的列表项内部可以使用段落、换行符、图片、链接以及其他列表等等。

### 线包字

![x](./Resource/11.png)

代码：

```html
<html>
<body>
  <fieldset style="width: 300px">
    <legend><font color="blue">★审核状态</font></legend>
    <form>
      <input type="radio" name="state">已经审核
      <input type="radio" name="state">没有审核
      <input type="radio" name="state">全部
    </form>
  </fieldset>
</body>
</html>
```

### 块

大多数HTML元素被定义为块级元素或内联元素。编者注：“块级元素”译为block level element，“内联元素”译为inline element。块级元素在浏览器显示时，通常会以新行来开始(和结束)。例子：`<h1>, <p>, <ul>, <table>`

内联元素在显示时通常不会以新行开始。例子：`<b>, <td>, <a>, <img>`

`<div>`元素是块级元素，它是可用于组合其他HTML元素的容器。

`<div>`元素没有特定的含义。除此之外，由于它属于块级元素，浏览器会在其前后显示折行。如果与CSS一同使用，`<div>`元素可用于对大的内容块设置样式属性。`<div>`元素的另一个常见的用途是文档布局。它取代了使用表格定义布局的老式方法。使用`<table>`元素进行文档布局不是表格的正确用法。`<table>`元素的作用是显示表格化的数据。

`<span>`元素是内联元素，可用作文本的容器。`<span>`元素也没有特定的含义。当与CSS一同使用时，`<span>` 元素可用于为部分文本设置样式属性。

- 行内元素只占能显示自己内容的宽度，而且他不会占据整行
- 块元素不管自己的内容有多少，会占据整行，而且会换行显示

行内元素和块元素可以转换，使用

- display: inline 表示使用行内元素方式显示
- display: block 表示使用块元素方式显示

css文件之间的相互引用指令 `@import url('xxx.css')`

### 类

对 HTML 进行分类（设置类），使我们能够为元素的类定义 CSS 样式。为相同的类设置相同的样式，或者为不同的类设置不同的样式。

HTML `<div>` 元素是块级元素。它能够用作其他 HTML 元素的容器。设置 `<div>` 元素的类，使我们能够为相同的 `<div>` 元素设置相同的类：

HTML `<span>` 元素是行内元素，能够用作文本的容器。设置 `<span>` 元素的类，能够为相同的 `<span>` 元素设置相同的样式。

### 布局

`<div>` 元素常用作布局工具，因为能够轻松地通过 CSS 对其进行定位。
HTML5|语义元素
-|-
header|定义文档或节的页眉
nav|定义导航链接的容器
section|定义文档中的节
article|定义独立的自包含文章
aside|定义内容之外的内容（比如侧栏）
footer|定义文档或节的页脚
details|定义额外的细节
summary|定义 details 元素的标题

`<table>` 元素不是作为布局工具而设计的。`<table>` 元素的作用是显示表格化的数据。使用 `<table>` 元素能够取得布局效果，因为能够通过 CSS 设置表格元素的样式

### 响应式&nbsp;Web&nbsp;设计

- RWD 指的是响应式 Web 设计（Responsive Web Design）
- RWD 能够以可变尺寸传递网页
- RWD 对于平板和移动设备是必需的

另一个创建响应式设计的方法，是使用现成的 CSS 框架。

Bootstrap 是最流行的开发响应式 web 的 HTML, CSS, 和 JS 框架。Bootstrap 帮助您开发在任何尺寸都外观出众的站点：显示器、笔记本电脑、平板电脑或手机：

### 框架

通过使用框架，你可以在同一个浏览器窗口中显示不止一个页面。每份HTML文档称为一个框架，并且每个框架都独立于其他的框架。

使用框架的坏处：

- 开发人员必须同时跟踪更多的HTML文档
- 很难打印整张页面

框架结构标签（`<frameset>`）

- 框架结构标签（`<frameset>`）定义如何将窗口分割为框架
- 每个 frameset 定义了一系列行或列
- rows/columns 的值规定了每行或每列占据屏幕的面积

编者注：frameset 标签也被某些文章和书籍译为框架集。

框架标签（Frame）

Frame 标签定义了放置在每个框架中的 HTML 文档。

假如一个框架有可见边框，用户可以拖动边框来改变它的大小。为了避免这种情况发生，可以在`<frame>`标签中加入：noresize="noresize"。

为不支持框架的浏览器添加`<noframes>`标签。

重要提示：不能将`<body></body>`标签与`<frameset></frameset>`标签同时使用！不过，假如你添加包含一段文本的`<noframes>`标签，就必须将这段文字嵌套于`<body></body>`标签内。

## 图形

### Canvas

canvas 元素用于在网页上绘制图形。

***什么是 Canvas？***

HTML5 的 canvas 元素使用 JavaScript 在网页上绘制图像。

画布是一个矩形区域，您可以控制其每一像素。

canvas 拥有多种绘制路径、矩形、圆形、字符以及添加图像的方法。

***创建 Canvas 元素***

向 HTML5 页面添加 canvas 元素。规定元素的 id、宽度和高度：

`<canvas id="myCanvas" width="200" height="100"></canvas>`

***通过 JavaScript 来绘制***

canvas 元素本身是没有绘图能力的。所有的绘制工作必须在 JavaScript 内部完成：

```js
<script type="text/javascript">
var c=document.getElementById("myCanvas");
var cxt=c.getContext("2d");
cxt.fillStyle="#FF0000";
cxt.fillRect(0,0,150,75);
</script>
```

`getContext("2d")` 对象是内建的 HTML5 对象，拥有多种绘制路径、矩形、圆形、字符以及添加图像的方法。

fillStyle 方法将其染成红色，fillRect 方法规定了形状、位置和尺寸。

***理解坐标***

上面的 fillRect 方法拥有参数 (0,0,150,75)。意思是：在画布上绘制 150x75 的矩形，从左上角开始 (0,0)。画布的 X 和 Y 坐标用于在画布上对绘画进行定位。

一个查看坐标值的示例：

```js
<!DOCTYPE HTML>
<html>
<head>
<style type="text/css">
  body
  {
    font-size:70%;
    font-family:verdana,helvetica,arial,sans-serif;
  }
</style>

<script type="text/javascript">
  function cnvs_getCoordinates(e)
  {
    x=e.clientX;
    y=e.clientY;
    document.getElementById("xycoordinates").innerHTML="Coordinates: (" + x + "," + y + ")";
  }

  function cnvs_clearCoordinates()
  {
    document.getElementById("xycoordinates").innerHTML="";
  }
</script>
</head>

<body style="margin:0px;">

<p>把鼠标悬停在下面的矩形上可以看到坐标：</p>

<div id="coordiv" style="float:left;width:199px;height:99px;border:1px solid #c3c3c3" onmousemove="cnvs_getCoordinates(event)" onmouseout="cnvs_clearCoordinates()"></div>
<br />
<br />
<br />
<div id="xycoordinates"></div>

</body>
</html>
```

### SVG

HTML5 支持内联 SVG。

***什么是SVG？***

- SVG 指可伸缩矢量图形 (Scalable Vector Graphics)
- SVG 用于定义用于网络的基于矢量的图形
- SVG 使用 XML 格式定义图形
- SVG 图像在放大或改变尺寸的情况下其图形质量不会有损失
- SVG 是万维网联盟的标准

***SVG 的优势***

与其他图像格式相比（比如 JPEG 和 GIF），使用 SVG 的优势在于：

- SVG 图像可通过文本编辑器来创建和修改
- SVG 图像可被搜索、索引、脚本化或压缩
- SVG 是可伸缩的
- SVG 图像可在任何的分辨率下被高质量地打印
- SVG 可在图像质量不下降的情况下被放大

***实例***

```js
<!DOCTYPE html>
<html>
<body>
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="190">
  <polygon points="100,10 40,180 190,60 10,60 160,180"
  style="fill:lime;stroke:purple;stroke-width:5;fill-rule:evenodd;" />
</svg>
</body>
</html>
```

### Canvas&nbsp;vs&nbsp;SVG

Canvas 和 SVG 都允许您在浏览器中创建图形，但是它们在根本上是不同的。

***SVG***

SVG 是一种使用 XML 描述 2D 图形的语言。

SVG 基于 XML，这意味着 SVG DOM 中的每个元素都是可用的。您可以为某个元素附加 JavaScript 事件处理器。

在 SVG 中，每个被绘制的图形均被视为对象。如果 SVG 对象的属性发生变化，那么浏览器能够自动重现图形。

***Canvas***

Canvas 通过 JavaScript 来绘制 2D 图形。

Canvas 是逐像素进行渲染的。

在 canvas 中，一旦图形被绘制完成，它就不会继续得到浏览器的关注。如果其位置发生变化，那么整个场景也需要重新绘制，包括任何或许已被图形覆盖的对象。

***Canvas 与 SVG 的比较***

下表列出了 canvas 与 SVG 之间的一些不同之处。

Canvas

- 依赖分辨率
- 不支持事件处理器
- 弱的文本渲染能力
- 能够以 .png 或 .jpg 格式保存结果图像
- 最适合图像密集型的游戏，其中的许多对象会被频繁重绘

SVG

- 不依赖分辨率
- 支持事件处理器
- 最适合带有大型渲染区域的应用程序（比如谷歌地图）
- 复杂度高会减慢渲染速度（任何过度使用 DOM 的应用都不快）
- 不适合游戏应用
