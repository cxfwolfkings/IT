# javascript

## 目录

1. [DOM](DOM)
   - [frame](#frame)
   - [选项卡](#选项卡)
   - [下拉框](#下拉框)
   - [表格](#表格)
2. [API](#API)
   - [地理定位](#地理定位)
   - [拖放](#拖放)
   - [本地存储](#本地存储)
     - [HTML本地存储对象](#HTML本地存储对象)
       - [localStorage对象](#localStorage对象)
       - [sessionStorage对象](#sessionStorage对象)
     - [应用程序缓存](#应用程序缓存)
   - [Web Workers](#Web&nbsp;Workers)
   - [Server-Sent事件](#Server-Sent事件)
3. [总结](#总结)
   - [常用对象](#常用对象)
   - [call、Apply](#call、Apply)
   - [encode、decode](#encodeURI、encodeURIComponent、decodeURI、decodeURIComponent)
   - [content="IE=edge,chrome=1"详解](#content="IE=edge,chrome=1"详解)
   - [中文乱码问题](#中文乱码问题)
   - [对象获取](#对象获取)
   - [节点的兄弟，父级，子级元素](#节点的兄弟，父级，子级元素)
   - [opener、parent、top](#opener、parent、top)
   - [table设置问题](#table设置问题)
   - [table固定宽度](#table固定宽度)
   - [隐藏显示div](#隐藏显示div)
   - [让div自动适应内容的高度](#让div自动适应内容的高度)
   - [CSS的overflow:hidden属性详细解释](#CSS的overflow:hidden属性详细解释)
   - [document.oncontextmenu事件](#document.oncontextmenu事件)
   - [document.write()](#document.write())
   - [获取数组中的最大值和最小值的方法汇总](#获取数组中的最大值和最小值的方法汇总)
   - [理解javascript中的Function.prototype.bind](#理解javascript中的Function.prototype.bind)
   - [动态加载JS和CSS](#动态加载JS和CSS)
   - [Cookie](#Cookie)
   - [with](#with)
   - [打印](#打印)
   - [异步](#异步)
   - [跨域](#跨域)
   - [JS制作的日期](./datetime.html)
   - [HTML-embed标签详解](#HTML-embed标签详解)

## DOM

### frame

- iframe标签是成对出现的，以`<iframe>`开始，`</iframe>`结束
- iframe标签内的内容可以做为浏览器不支持iframe标签时显示

属性

Common -- 一般属性

- name -- 定义了内容页名称,此名称在框架页内链接时使用到
- src -- 定义了内容页URL(同frame标签)
- frameborder -- 定义了内容页的边框,取值为(1|0),缺省值为1
  - 1 -- 在每个页面之间都显示边框
  - 0 -- 不显示边框
- height -- 框架的高度,取值像素或百分比
- width -- 框架的宽度,取值像素或百分比
- marginwidth -- 定义了框架中HTML文件显示的左右边界的宽度,取值为px,缺省值由浏览器决定
- marginheight -- 定义了框架中HTML文件显示的上下边界的宽度,取值为px,缺省值由浏览器决定
- scrolling -- 定义是否有滚动条,取值为(yes|no|auto),缺省值为auto
  - yes -- 显示滚动条
  - no -- 不显示滚动条
  - auto -- 当需要时再显示滚动条
- align -- 垂直或水平对齐方式
- longdesc -- 定义框架页的说明

iframe的调用包括以下几个方面：（调用包含html dom，js全局变量，js方法）

- 主页面调用iframe；
- iframe页面调用主页面；
- 主页面包含的iframe之间相互调用；

主要知识点:

1. `document.getElementById("ii").contentWindow` 得到iframe对象后，就可以通过contentWindow得到iframe包含页面的window对象，然后就可以正常访问页面元素了；
2. `$("#ii")[0].contentWindow`  如果用jquery选择器获得iframe，需要加一个[0]；
3. `$("#ii")[0].contentWindow.$("#dd").val()` 可以在得到iframe的window对象后接着使用jquery选择器进行页面操作;
4. `$("#ii")[0].contentWindow.hellobaby="…";` 可以通过这种方式向iframe页面传递参数，在iframe页面window.hellobaby就可以获取到值，hellobaby是自定义的变量；
5. 在iframe页面通过parent可以获得主页面的window，接着就可以正常访问父亲页面的元素了；
6. `parent.$("#ii")[0].contentWindow.ff;` 同级iframe页面之间调用，需要先得到父亲的window，然后调用同级的iframe得到window进行操作；

一个页面中的所有框架以集合的形式作为window对象的属性提供，例如：window.frames就表示该页面内所有框架的集合，这和表单对象、链接对象、图片对象等是类似的，不同的是，这些集合是document的属性。因此，要引用一个子框架，可以使用如下语法：

```js
window.frames["frameName"];
window.frames.frameName
window.frames[index]
```

其中，window字样也可以用self代替或省略，假设frameName为页面中第一个框架，则以下的写法是等价的：

```js
self.frames["frameName"]
self.frames[0]
frames[0]
```

每个框架都对应一个HTML页面，所以这个框架也是一个独立的浏览器窗口，它具有窗口的所有性质，所谓对框架的引用也就是对window对象的引用。有了这个window对象，就可以很方便地对其中的页面进行操作，例如使用window.document对象向页面写入数据、使用window.location属性来改变框架内的页面等。

和parent属性类似，window对象还有一个top属性。它表示对顶层框架的引用，这可以用来判断一个框架自身是否为顶层框架，例如：

```js
// 判断本框架是否为顶层框架
if(self==top){
  //dosomething
}
```

### 选项卡

```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
  <head>
    <meta http-equiv="content-type" content="text/html;charset=utf-8" />
    <meta name="keywords" content="关键词1,关键词2,关键词3" />
    <meta name="description" content="对网站的描述" />
    <title>标题</title>
    <style type="text/css">
      *{
        margin:0;
        padding:0;
      }
       #box{
        margin: 150px;
        width: 310px;
        height: 263px;
       }
       #box .hd{
        height: 30px;
        border-top: 2px solid #206F96;
        text-align: center;
        font: 14px/30px "宋体";
       }
       #box  .hd .s1{
        width: 102px;
        height: 29px;
        border-left:1px solid #CFCFCF;
        border-right: 1px solid #CFCFCF;
        float: left;
       }
       #box  .hd .s2{
        width: 102px;
        height: 29px;
        border-right: 1px solid #CFCFCF;
        border-bottom: 1px solid #CFCFCF;
        background:url(images/1.jpg) repeat-x;
        float: left;
       }
        #box  .hd .s3{
        width: 102px;
        height: 29px;
        border-right: 1px solid #CFCFCF;
        border-bottom: 1px solid #CFCFCF;
        background:url(images/1.jpg) repeat-x;
        float: left;
       }
       #box .bd ul{
        list-style: none;
       }
        #box .bd ul li{
          line-height: 30px;
        }
        #box .bd ul li a:link,#box .bd ul li a:visited{
          text-decoration: none;
          color: #666;
          font-size: 14px;
        }
        #tupian,#junshi{
          display: none;
        }
    </style>
    <script type="text/javascript">
      function xianshitupian(){
        //让图片列表显示出来
        document.getElementById("tupian").style.display = "block";
        //让新闻列表隐藏
        document.getElementById("xinwen").style.display = "none";
        //让军事列表隐藏
        document.getElementById("junshi").style.display = "none";

        //让图片span去掉背景
        document.getElementById("span_tupian").style.background = "none";
        //让新闻span加上灰色背景
        document.getElementById("span_xinwen").style.background = "url(images/1.jpg) repeat-x";
        //让军事span加上灰色背景
        document.getElementById("span_junshi").style.background = "url(images/1.jpg) repeat-x";

        //让图片span去掉下边框线
        document.getElementById("span_tupian").style.borderBottom = "none";
        //让新闻span加上下边框线
        document.getElementById("span_xinwen").style.borderBottom = "1px solid #CFCFCF";
        //让军事span加上下边框线
        document.getElementById("span_junshi").style.borderBottom = "1px solid #CFCFCF";
      }

      function xianshixinwen(){
        //让新闻列表显示出来
        document.getElementById("xinwen").style.display = "block";
        //让图片列表隐藏
        document.getElementById("tupian").style.display = "none";
        //让军事列表隐藏
        document.getElementById("junshi").style.display = "none";

        //让新闻span去掉背景
        document.getElementById("span_xinwen").style.background = "none";
        //让图片span加上灰色背景
        document.getElementById("span_tupian").style.background = "url(images/1.jpg) repeat-x";
        //让军事span加上灰色背景
        document.getElementById("span_junshi").style.background = "url(images/1.jpg) repeat-x";

        //让新闻span去掉下边框线
        document.getElementById("span_xinwen").style.borderBottom = "none";
        //让图片span加上下边框线
        document.getElementById("span_tupian").style.borderBottom = "1px solid #CFCFCF";
        //让军事span加上下边框线
        document.getElementById("span_junshi").style.borderBottom = "1px solid #CFCFCF";
      }

      function xianshijunshi(){
        //让军事列表显示出来
        document.getElementById("junshi").style.display = "block";
        //让图片列表隐藏
        document.getElementById("tupian").style.display = "none";
        //让新闻列表隐藏
        document.getElementById("xinwen").style.display = "none";

        //让军事span去掉背景
        document.getElementById("span_junshi").style.background = "none";
        //让图片span加上灰色背景
        document.getElementById("span_tupian").style.background = "url(images/1.jpg) repeat-x";
        //让新闻span加上灰色背景
        document.getElementById("span_xinwen").style.background = "url(images/1.jpg) repeat-x";

        //让军事span去掉下边框线
        document.getElementById("span_junshi").style.borderBottom = "none";
        //让图片span加上下边框线
        document.getElementById("span_tupian").style.borderBottom = "1px solid #CFCFCF";
        //让新闻span加上下边框线
        document.getElementById("span_xinwen").style.borderBottom = "1px solid #CFCFCF";
      }
    </script>
  </head>
  <body>
     <div id="box">
      <div class="hd">
        <span id="span_xinwen" class="s1" onmouseover="xianshixinwen()">新闻</span>
        <span id="span_tupian" class="s2" onmouseover="xianshitupian()">图片</span>
        <span id="span_junshi" class="s3" onmouseover="xianshijunshi()">军事</span>
      </div>
      <div class="bd">
        <div id="xinwen" class="info">
          <ul>  
            <li><a href="#">新闻新闻新闻新闻新闻新闻新闻新闻</a></li>
            <li><a href="#">新闻新闻新闻新闻新闻新闻新闻新闻</a></li>
            <li><a href="#">新闻新闻新闻新闻新闻新闻新闻新闻</a></li>
            <li><a href="#">新闻新闻新闻新闻新闻新闻新闻新闻</a></li>
            <li><a href="#">新闻新闻新闻新闻新闻新闻新闻新闻</a></li>
            <li><a href="#">新闻新闻新闻新闻新闻新闻新闻新闻</a></li>
            <li><a href="#">新闻新闻新闻新闻新闻新闻新闻新闻</a></li>
          </ul>
        </div>
        <div id="tupian" class="info">
          <ul>  
            <li><a href="#">图片图片图片图片图片图片图片图片</a></li>
            <li><a href="#">图片图片图片图片图片图片图片图片</a></li>
            <li><a href="#">图片图片图片图片图片图片图片图片</a></li>
            <li><a href="#">图片图片图片图片图片图片图片图片</a></li>
            <li><a href="#">图片图片图片图片图片图片图片图片</a></li>
            <li><a href="#">图片图片图片图片图片图片图片图片</a></li>
            <li><a href="#">图片图片图片图片图片图片图片图片</a></li>
            <li><a href="#">图片图片图片图片图片图片图片图片</a></li>
          </ul>
        </div>
        <div id="junshi" class="info">
          <ul>  
            <li><a href="#">军事军事军事军事军事军事军事军事</a></li>
            <li><a href="#">军事军事军事军事军事军事军事军事</a></li>
            <li><a href="#">军事军事军事军事军事军事军事军事</a></li>
            <li><a href="#">军事军事军事军事军事军事军事军事</a></li>
            <li><a href="#">军事军事军事军事军事军事军事军事</a></li>
            <li><a href="#">军事军事军事军事军事军事军事军事</a></li>
            <li><a href="#">军事军事军事军事军事军事军事军事</a></li>
            <li><a href="#">军事军事军事军事军事军事军事军事</a></li>
          </ul>
        </div>
      </div>
     </div>
  </body>
</html>
```

### 下拉框

```html
<html>

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>下拉框</title>
</head>

<body>
  <select name="objSelect">
    <option value="鸣人">鸣人</option>
    <option value="佐助">佐助</option>
    <option value="路飞">路飞</option>
    <option value="佐罗">佐罗</option>
    <option value="黑崎一护">黑崎一护</option>
    <option value="蓝染">蓝染</option>
    <option value="幽助">幽助</option>
  </select>
  <input type="button" value="孙悟空" onclick="jsAddItemToSelect(document.all.objSelect,'孙悟空','孙悟空')" />
  <input type="button" value="黑崎一护" onclick="jsRemoveItemFromSelect(document.all.objSelect,'黑崎一护')" />
  <script type="text/javascript">
    // 1.判断select选项中是否存在Value=objItemValue的Item

    function jsSelectIsExitItem(objSelect, objItemValue) {
      var isExit = false;
      for (var i = 0; i < objSelect.options.length; i++) {
        if (objSelect.options[i].value == objItemValue) {
          isExit = true;
          break;
        }
      }
      return isExit;
    }

    // 2.向select选项中 加入一个Item
    function jsAddItemToSelect(objSelect, objItemText, objItemValue) {
      //判断是否存在
      if (jsSelectIsExitItem(objSelect, objItemValue)) {
        alert("该Item的Value值已经存在");
      } else {
        var varItem = new Option(objItemText, objItemValue);
        objSelect.options.add(varItem);
        alert("成功加入");
      }
    }

    // 3.从select选项中 删除一个Item
    function jsRemoveItemFromSelect(objSelect, objItemValue) {
      //判断是否存在
      if (jsSelectIsExitItem(objSelect, objItemValue)) {
        for (var i = 0; i < objSelect.options.length; i++) {
          if (objSelect.options[i].value == objItemValue) {
            objSelect.options.remove(i);
            break;
          }
        }
        alert("成功删除");
      } else {
        alert("该select中 不存在该项");
      }
    }

    // 4.删除select中选中的项
    function jsRemoveSelectedItemFromSelect(objSelect) {
      var length = objSelect.options.length - 1;
      for (var i = length; i >= 0; i--) {
        if (objSelect[i].selected == true) {
          objSelect.options[i] = null;
        }
      }
    }

    // 5.修改select选项中 value="paraValue"的text为"paraText"
    function jsUpdateItemToSelect(objSelect, objItemText, objItemValue) {
      //判断是否存在
      if (jsSelectIsExitItem(objSelect, objItemValue)) {
        for (var i = 0; i < objSelect.options.length; i++) {
          if (objSelect.options[i].value == objItemValue) {
            objSelect.options[i].text = objItemText;
            break;
          }
        }
        alert("成功修改");
      } else {
        alert("该select中 不存在该项");
      }
    }

    // 6.设置select中text="paraText"的第一个Item为选中
    function jsSelectItemByValue(objSelect, objItemText) {
      //判断是否存在
      var isExit = false;
      for (var i = 0; i < objSelect.options.length; i++) {
        if (objSelect.options[i].text == objItemText) {
          objSelect.options[i].selected = true;
          isExit = true;
          break;
        }
      }
      //Show出结果
      if (isExit) {
        alert("成功选中");
      } else {
        alert("该select中 不存在该项");
      }
    }

    /*
    // 7.设置select中value="paraValue"的Item为选中
    document.all.objSelect.value = objItemValue;

    // 8.得到select的当前选中项的value
    var currSelectValue = document.all.objSelect.value;

    // 9.得到select的当前选中项的text
    var currSelectText = document.all.objSelect.options[document.all.objSelect.selectedIndex].text;

    // 10.得到select的当前选中项的Index
    var currSelectIndex = document.all.objSelect.selectedIndex;

    // 11.清空select的项
    document.all.objSelect.options.length = 0;
    */
  </script>
</body>

</html>
```

### 表格

```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=gb2312">
  <title>js操作表格</title>
  <script language="javascript">
    /*生成表格，采用appendChild*/
    function init() {
      _table = document.getElementById("table");
      _table.border = "1px";
      _table.width = "800px";

      for (var i = 1; i < 10; i++) {
        var row = document.createElement("tr");
        row.id = i;
        for (var j = 1; j < 6; j++) {
          var cell = document.createElement("td");
          cell.id = i + "/" + j;
          cell.appendChild(document.createTextNode("第" + cell.id + "列"));
          row.appendChild(cell);
        }
        document.getElementById("newbody").appendChild(row);
      }
    }

    function rebulid() {
      var beginRow = document.getElementById("beginRow").value;/*开始行*/
      var endRow = document.getElementById("endRow").value;/*结束行*/

      var beginCol = document.getElementById("beginCol").value;/*开始列*/
      var endCol = document.getElementById("endCol").value;/*结束列*/

      var tempCol = beginRow + "/" + beginCol;/*定位要改变属性的列*/
      alert(tempCol);
      var td = document.getElementById(tempCol);

      /*删除要合并的单元格*/
      for (var x = beginRow; x <= endRow; x++) {
        for (var i = beginCol; i <= endCol; i++) {
          if (x == beginRow) {

            document.getElementById("table").rows[x].deleteCell(i + 1);

          }
          else {

            document.getElementById("table").rows[x].deleteCell(i);

          }

        }
      }
      td.rowSpan = (endRow - beginRow) + 1;
    }
    /*添加行，使用appendChild方法*/
    function addRow() {
      var length = document.getElementById("table").rows.length;
      /*document.getElementById("newbody").insertRow(length);
      document.getElementById(length+1).setAttribute("id",length+2);*/
      var tr = document.createElement("tr");
      tr.id = length + 1;
      var td = document.createElement("td");
      for (i = 1; i < 4; i++) {
        td.id = tr.id + "/" + i;
        td.appendChild(document.createTextNode("第" + td.id + "列"));
        tr.appendChild(td);

      }
      document.getElementById("newbody").appendChild(tr);
    }

    function addRow_withInsert() {
      var row = document.getElementById("table").insertRow(document.getElementById("table").rows.length);
      var rowCount = document.getElementById("table").rows.length;

      var countCell = document.getElementById("table").rows.item(0).cells.length;
      for (var i = 0; i < countCell; i++) {
        var cell = row.insertCell(i);

        cell.innerHTML = "新" + (rowCount) + "/" + (i + 1) + "列";
        cell.id = (rowCount) + "/" + (i + 1);

      }
    }

    /*删除行，采用deleteRow(row Index)*/
    function removeRow() {
      /* var row=document.getElementById("2");
       var index=row.rowIndex;
       alert(index);*/
      document.getElementById("newbody").deleteRow(document.getElementById(document.getElementById("table").rows.length).rowIndex);
    }

    /*添加列，采用insertCell(列位置)方法*/
    function addCell() {
      /*document.getElementById("table").rows.item(0).cells.length
       用来获得表格的列数
      */
      for (var i = 0; i < document.getElementById("table").rows.length; i++) {
        var cell = document.getElementById("table").rows[i].insertCell(2);
        cell.innerHTML = "第" + (i + 1) + "/" + 3 + "列";

      }
    }
    /*删除列，采用deleteCell(列位置)的方法*/
    function removeCell() {
      for (var i = 0; i < document.getElementById("table").rows.length; i++) {
        document.getElementById("table").rows[i].deleteCell(0);
      }
    }
  </script>
</head>

<body onLoad="init();">

  <table id="table" align="center">
    <tbody id="newbody"></tbody>

  </table>
  <div>
    <table width="800px" border="1px" align="center">
      <tr>
        <td align="center"><input type="button" id="addRow" name="addRow" onClick="addRow();" value="添加行" /></td>
        <td align="center"><input type="button" id="delRow" name="delRow" onClick="removeRow();" value="删除行" /></td>
      </tr>
      　　<tr>
        <td align="center"><input type="button" id="delCell" 　name="delCell" onClick="removeCell();" value="删除列" /></td>
        <td align="center"><input type="button" 　id="addCell" name="addCell" onClick=" addCell();" value="添加列" /></td>
      </tr>
      　<tr>
        <td align="center" colspan="2"><input type="button" id="addRows" 　name="addRows" onClick="addRow_withInsert();"
            value="添加行" /></td>
      </tr>
    </table>
  </div>
  <div>
    <table width="800px" border="1px" align="center">
      <tr>
        <td>从第<input type="text" id="beginRow" name="beginRow" value="" />行到<input type="text" name="endRow" id="endRow"
            value="" />行</td>
        <td rowspan="2" id="test"><input type="button" name="hebing" id="hebing" value="合并" onClick="rebulid();" /></td>
      </tr>
      　　<tr>
        <td>从第<input type="text" name="beginCol" id="beginCol" value="" />列到<input type="text" name="endCol" id="endCol"
            value="" />列</td>
      </tr>
    </table>
  </div>
</body>

</html>
```

### 理解javascript中的Function.prototype.bind

在初学Javascript时，我们也许不需要担心函数绑定的问题。

但是当我们需要在另一个函数中保持上下文对象this时，就会遇到相应的问题了。

我见过很多人处理这种问题都是先将this赋值给一个变量（比如self、_this、that等），尤其是var that = this是我见的最多的。

这样当你改变环境之后就可以使用它。这些都是可以的，但是还有一种更好的、更专有的方法，那就是使用Function.prototype.bind。

下面进行详尽的讲解。

第一部分：需要解决的问题

首先看下面的代码

```js
var myObj = {
  specialFunction: function () {
  },

  anotherSpecialFunction: function () {
  },

  getAsyncData: function (cb) {
    cb();
  },

  render: function () {
    this.getAsyncData(function () {
      this.specialFunction();
      this.anotherSpecialFunction();
    });
  }
};

myObj.render();
```

这里我希望创建一个对象。

包含了前面两个普通的方法；第三个方法可以传递一个函数，传入的这个函数立即执行。

最后一个方法会调用myObj对象的getAsyncData方法，这里使用了this。

然后在getAsyncData方法中传入了一个函数，这个函数继续调用这个对象的前两个方法，仍使用了this。

这时很多人实际上就可以看出问题所在了，将上述代码输入控制台，得到下面的结果：

TypeError: this.specialFunction is not a function

第二部分：问题剖析

在对象中render方法中的this的确是指向myObj对象的，所以我们可以通过this.getAsyncData来调用这个对象中的函数。

但是当我们给其传递函数作为参数时，这里的this就指向了全局环境window了，因为全局环境中没有对象中的前两个方法，所以才会报错。

第三部分：解决问题的几种方式

所以我们需要做的就是正确调用对象中的前两个方法 ，很多人使用的方法便是：

首先在对象的环境中获取this赋值给另一个变量，这时就可以在后面的环境中调用了，如下所示：

```js
render: function () {
  var that = this;
  this.getAsyncData(function () {
    that.specialFunction();
    that.anotherSpecialFunction();
  });
}
```

虽然这种方法是可行的。但是使用Function.prototype.bind()会使代码更清晰、易懂，如下所示：

```js
render: function () {
  this.getAsyncData(function () {
    this.specialFunction();
    this.anotherSpecialFunction();
  }.bind(this));
}
```

这里我们就成功地把this绑定到了环境中。

下面是另外一个简单的例子：

```js
var foo = {
  x: 3
}

var bar = function () {
  console.log(this.x);
}

bar(); // undefined

var boundFunc = bar.bind(foo);
boundFunc(); // 3
```

下面的例子也是常见的：

```js
this.x = 9;    // this refers to global "window" object here in the browser

var module = {
  x: 81,
  getX: function() { return this.x; }
};
module.getX(); // 81

var retrieveX = module.getX;
retrieveX();

// returns 9 - The function gets invoked at the global scope
// Create a new function with 'this' bound to module
// New programmers might confuse the
// global var x with module's property x
var boundGetX = retrieveX.bind(module);
boundGetX(); // 81
```

如果有兴趣想知道 Function.prototype.bind() 内部长什么样以及是如何工作的，这里有个非常简单的例子：

```js
Function.prototype.bind = function (scope) {
  var fn = this;
  return function () {
    return fn.apply(scope);
  };
}
```

第四部分：浏览器支持

但是这个方法在IE8及以下是不被支持的，所以我们可以使用MDN提供的方法来使得IE低版本支持.bind()方法：

`https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind`

```js
if (!Function.prototype.bind) {
  Function.prototype.bind = function (oThis) {
    if (typeof this !== "function") {
      // closest thing possible to the ECMAScript 5 internal IsCallable function
      throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var aArgs = Array.prototype.slice.call(arguments, 1),
      fToBind = this,
      fNOP = function () { },
      fBound = function () {
        return fToBind.apply(this instanceof fNOP && oThis
          ? this
          : oThis,
          aArgs.concat(Array.prototype.slice.call(arguments)));
      };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    return fBound;
  };
}
```

### 动态加载JS和CSS

1、直接document.write

```html
<script language="javascript">
  document.write("<script src='test.js'><\/script>");
</script>
```

2、动态改变已有script的src属性

```html
<script src='' id="s1"></script>
<script language="javascript">
  s1.src="test.js"
</script>
```

3、动态创建script元素

```html
<script>
  var oHead = document.getElementsByTagName('HEAD').item(0);
  var oScript= document.createElement("script");
  oScript.type = "text/javascript";
  oScript.src="test.js";
  oHead.appendChild( oScript);
</script>
```

4、原理：用XMLHTTP取得脚本的内容，再创建 Script 对象。

注意：a.js必须用UTF8编码保存，要不会出错。因为服务器与XML使用UTF8编码传送数据。

主页面代码：

```html
<script language="JavaScript">
function GetHttpRequest() {
    if (window.XMLHttpRequest) //Gecko
        return new XMLHttpRequest() ;
    else if (window.ActiveXObject) //IE
        return new ActiveXObject("MsXml2.XmlHttp") ;
}

function AjaxPage(sId, url){
    var oXmlHttp = GetHttpRequest();
    oXmlHttp.OnReadyStateChange = function() {
        if (oXmlHttp.readyState == 4) {
            if (oXmlHttp.status == 200 || oXmlHttp.status == 304) {
                IncludeJS(sId, url, oXmlHttp.responseText);
            } else {
                alert('XML request error: ' + oXmlHttp.statusText + ' (' + oXmlHttp.status + ')') ;
            }
        }
    }
    oXmlHttp.open('GET', url, true);
    oXmlHttp.send(null);
}

function IncludeJS(sId, fileUrl, source) {
    if ((source != null) && (!document.getElementById(sId))){
        var oHead = document.getElementsByTagName('HEAD').item(0);
        var oScript = document.createElement("script");
        oScript.language = "javascript";
        oScript.type = "text/javascript";
        oScript.id = sId;
        oScript.defer = true;
        oScript.text = source;
        oHead.appendChild(oScript);
    }
}

AjaxPage("srcA", "b.js");

// 动态加载css文件
function loadStyles(url) {
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = url;
    document.getElementsByTagName("head")[0].appendChild(link);
}
// 测试
loadStyles("css/secondindex.css");

// 动态加载css脚本
function loadStyleString(cssText) {
    var style = document.createElement("style");
    style.type = "text/css";
    try{
       // firefox、safari、chrome和Opera
       style.appendChild(document.createTextNode(cssText));
    }catch(ex) {
       // IE早期的浏览器，需要使用style元素的stylesheet属性的cssText属性
       style.styleSheet.cssText = cssText;
    }
    document.getElementsByTagName("head")[0].appendChild(style);
}

// 测试
var css = "body{color:blue;}";
loadStyleString(css);
</script>
```

### Cookie

JavaScript是运行在客户端的脚本，因此一般是不能够设置Session的，因为Session是运行在服务器端的。而cookie是运行在客户端的，所以可以用JS来设置cookie。

假设有这样一种情况，在某个用例流程中，由A页面跳至B页面，若在A页面中采用JS用变量temp保存了某一变量的值，在B页面的时候，同样需要使用JS来引用temp的变量值，对于JS中的全局变量或者静态变量的生命周期是有限的，当发生页面跳转或者页面关闭的时候，这些变量的值会重新载入，即没有达到保存的效果。解决这个问题的最好的方案是采用cookie来保存该变量的值，那么如何来设置和读取cookie呢？

首先需要稍微了解一下cookie的结构，简单地说：cookie是以键值对的形式保存的，即key=value的格式。各个cookie之间一般是以“;”分隔。

JS设置cookie：

```js
//假设在A页面中要保存变量username的值("jack")到cookie中，key值为name，则相应的JS代码为：
document.cookie="name="+username;  
```

JS读取cookie:

```js
//假设cookie中存储的内容为：name=jack;password=123
//则在B页面中获取变量username的值的JS代码如下：
var username=document.cookie.split(";")[0].split("=")[1];
```

```js
//写cookies
function setCookie(name,value) {
  var Days = 30;
  var exp = new Date();
  exp.setTime(exp.getTime() + Days*24*60*60*1000);
  document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

//读取cookies
function getCookie(name) {
  var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
  if(arr=document.cookie.match(reg))
    return unescape(arr[2]);
  else
    return null;
}

//删除cookies
function delCookie(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval=getCookie(name);
  if(cval!=null)
    document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}

//使用示例
setCookie("name","hayden");
alert(getCookie("name"));

//如果需要设定自定义过期时间
//那么把上面的setCookie函数换成下面两个函数就ok;

//程序代码
function setCookie(name,value,time){
  var strsec = getsec(time);
  var exp = new Date();
  exp.setTime(exp.getTime() + strsec*1);
  document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

function getsec(str) {
  alert(str);
  var str1=str.substring(1,str.length)*1;
  var str2=str.substring(0,1);
  if (str2=="s") {
    return str1*1000;
  } else if (str2=="h"){
    return str1*60*60*1000;
  } else if (str2=="d"){
    return str1*24*60*60*1000;
  }
}
//这是有设定过期时间的使用示例：
//s20是代表20秒
//h是指小时，如12小时则是：h12
//d是天数，30天则：d30
setCookie("name","hayden","s20");
```

### with

***简要说明***

with语句可以方便地用来引用某个特定对象中已有的属性，但是不能用来给对象添加属性。要给对象创建新的属性，必须明确地引用该对象。  

***语法格式***

```js
with(object instance) {
  //代码块  
}
```

有时候，我在一个程序代码中，多次需要使用某对象的属性或方法，照以前的写法，都是通过 `对象.属性` 或者 `对象.方法` 这样的方式来分别获得该对象的属性和方法，着实有点麻烦，学习了with语句后，可以通过类似如下的方式来实现：

```js
with(objInstance) {
  var str = 属性1;
  .....  
}
```

去除了多次写对象名的麻烦。

***举例***

```html
<script language="javascript">  
<!--  
function Lakers() {  
  this.name = "kobe bryant";  
  this.age = "28";  
  this.gender = "boy";  
}  
var people=new Lakers();  
with(people) {  
  var str = "姓名: " + name + "<br>";  
  str += "年龄：" + age + "<br>";  
  str += "性别：" + gender;  
  document.write(str);  
}  
//-->  
</script>
```

代码执行效果如下:  

```sh
姓名: kobe bryant  
年龄：28  
性别：boy
```

### 打印

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>中国绿色厨房计划</title>
  <script language=javascript>
    function printsetup(){
      //  打印页面设置
      wb.execwb(8,1);
    }
    function printpreview(){
      //  打印页面预览
      wb.execwb(7,1);
    }
    function printit(){
      if (confirm('确定打印吗？')){
        wb.ExecWB(6,1)
        //wb.execwb(1,1)//打开
        //wb.ExecWB(2,1);//关闭现在所有的IE窗口，并打开一个新窗口
        //wb.ExecWB(4,1)//;保存网页
        //wb.ExecWB(6,1)//打印
        //wb.ExecWB(7,1)//打印预览
        //wb.ExecWB(8,1)//打印页面设置
        //wb.ExecWB(10,1)//查看页面属性
        //wb.ExecWB(15,1)//好像是撤销，有待确认
        //wb.ExecWB(17,1)//全选
        //wb.ExecWB(22,1)//刷新
        //wb.ExecWB(45,1)//关闭窗体无提示
      }
    }
  </script>
</head>
<body>
  <div style="width:640px;height:20px;margin:100px auto 0 auto;font-size:12px;text-align:right;">
    <input value="打印" type="button" onclick="javascript:window.print()" />
    <OBJECT classid="CLSID:8856F961-340A-11D0-A96B-00C04FD705A2" height="0" id="wb" name="wb" width="0"></OBJECT>
    <input type=button name=button_print style="display:none;" value="打印本单据" onclick="javascript:printit()">
    <input type=button name=button_setup value="打印页面设置" onclick="javascript:printsetup();">
    <input type=button name=button_show value="打印预览" onclick="javascript:printpreview();">
    <input type=button name=button_fh value="关闭" onclick="javascript:window.close();">
  </div>
  <div style="width:640px;height:624px;margin:20px auto;">
    <img src="images/money.jpg" />
  </div>
</body>
</html>
```

### 异步

JavaScript是单线程执行的，无法同时执行多段代码。当某一段代码正在执行的时候，所有后续的任务都必须等待，形成一个队列。一旦当前任务执行完毕，再从队列中取出下一个任务，这也常被称为 “阻塞式执行”。

所以一次鼠标点击，或是计时器到达时间点，或是Ajax请求完成触发了回调函数，这些事件处理程序或回调函数都不会立即运行，而是立即排队，一旦线程有空闲就执行。

假如当前 JavaScript线程正在执行一段很耗时的代码，此时发生了一次鼠标点击，那么事件处理程序就被阻塞，用户也无法立即看到反馈，事件处理程序会被放入任务队列，直到前面的代码结束以后才会开始执行。

如果代码中设定了一个 setTimeout，那么浏览器便会在合适的时间，将代码插入任务队列，如果这个时间设为 0，就代表立即插入队列，但不是立即执行，仍然要等待前面代码执行完毕。所以 setTimeout 并不能保证执行的时间，是否及时执行取决于 JavaScript 线程是拥挤还是空闲。

1.回调函数

```js
function f1 (callback) {
  console.log('f1');
  setTimeout(function () {
    // f1的任务代码
    callback();
  }, 1000);
}
function f2 () {
  console.log('f2');
}
```

回调函数的优点是简单、容易理解和部署，缺点是不利于代码的阅读和维护，各个部分之间高度耦合(Coupling)，流程会很混乱，而且每个任务只能指定一个回调函数。

2.事件监听

```js
f1.on('done', f2);
function f1 () {
  setTimeout(function () {
    // f1的任务代码
    f1.trigger('done');
  }, 1000);
}
```

任务的执行不取决于代码的顺序，而取决于某个事件是否发生。还是以f1和f2为例。首先，为f1绑定一个事件（这里采用的jQuery的写法）。

`f1.trigger('done')`表示，执行完成后，立即触发done事件，从而开始执行f2。

这种方法的优点是比较容易理解，可以绑定多个事件，每个事件可以指定多个回调函数，而且可以"去耦合"（Decoupling），有利于实现模块化。缺点是整个程序都要变成事件驱动型，运行流程会变得很不清晰。

3.发布/订阅

```js
jQuery.subscribe("done", f2);
function f1 () {
  setTimeout(function () {
    // f1的任务代码
    jQuery.publish("done");
  }, 1000);
}
jQuery.unsubscribe("done", f2);//f2完成后可以取消订阅
```

上一节的"事件"，完全可以理解成"信号"。

我们假定，存在一个"信号中心"，某个任务执行完成，就向信号中心"发布"（publish）一个信号，其他任务可以向信号中心"订阅"（subscribe）这个信号，从而知道什么时候自己可以开始执行。这就叫做"发布/订阅模式"（publish-subscribe pattern），又称"观察者模式"（observer pattern）。

这个模式有多种实现，下面采用的是Ben Alman的Tiny Pub/Sub，这是jQuery的一个插件。

首先，f2向"信号中心"jQuery订阅"done"信号。

然后，改写f1，jQuery.publish("done")的意思是，f1执行完成后，向"信号中心"jQuery发布"done"信号，从而引发f2的执行。

此外，f2完成执行后，也可以取消订阅（unsubscribe）。

这种方法的性质与"事件监听"类似，但是明显优于后者。因为我们可以通过查看"消息中心"，了解存在多少信号、每个信号有多少订阅者，从而监控程序的运行。

4.Promises对象

```js
function f1 () {
  var dfd = $.Deferred();
  setTimeout(function () {
    // f1的任务代码
    dfd.resolve();
  }, 500);
  return dfd.promise;
}
f1().then(f2);
f1().then(f2).then(f3);//指定多个回调函数
f1().then(f2).fail(f3);//指定发生错误时的回调函数
```

Promises对象是CommonJS工作组提出的一种规范，目的是为异步编程提供统一接口。

简单说，它的思想是，每一个异步任务返回一个Promise对象，该对象有一个then方法，允许指定回调函数。

f1要进行改写（这里使用的是jQuery的实现）

这样写的优点在于，回调函数变成了链式写法，程序的流程可以看得很清楚，而且有一整套的配套方法，可以实现许多强大的功能。

而且，它还有一个前面三种方法都没有的好处：如果一个任务已经完成，再添加回调函数，该回调函数会立即执行。所以，你不用担心是否错过了某个事件或信号。这种方法的缺点就是编写和理解，都相对比较难。

## API

### 地理定位

定位用户的位置

HTML5 Geolocation API 用于获得用户的地理位置。

鉴于该特性可能侵犯用户的隐私，除非用户同意，否则用户位置信息是不可用的。

实例

```html
<!DOCTYPE html>
<html>
<body>
<p id="demo">点击这个按钮，获得您的坐标：</p>
<button onclick="getLocation()">试一下</button>
<script>
var x=document.getElementById("demo");
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition/*,showError*/);
  } else {
    x.innerHTML="Geolocation is not supported by this browser.";
  }
}
function showPosition(position) {
  x.innerHTML="Latitude: " + position.coords.latitude + "<br />Longitude: " + position.coords.longitude;
}
</script>
</body>
</html>
```

例子解释：

- 检测是否支持地理定位
- 如果支持，则运行 getCurrentPosition() 方法。如果不支持，则向用户显示一段消息。
- 如果getCurrentPosition()运行成功，则向参数showPosition中规定的函数返回一个coordinates对象
- showPosition() 函数获得并显示经度和纬度

上面的例子是一个非常基础的地理定位脚本，不含错误处理。

处理错误和拒绝

getCurrentPosition() 方法的第二个参数用于处理错误。它规定当获取用户位置失败时运行的函数：

```js
function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      x.innerHTML="User denied the request for Geolocation."
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML="Location information is unavailable."
      break;
    case error.TIMEOUT:
      x.innerHTML="The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML="An unknown error occurred."
      break;
  }
}
```

错误代码：

- Permission denied - 用户不允许地理定位
- Position unavailable - 无法获取当前位置
- Timeout - 操作超时

在地图中显示结果

如需在地图中显示结果，您需要访问可使用经纬度的地图服务，比如谷歌地图或百度地图：

```js
function showPosition(position) {
  var latlon=position.coords.latitude+","+position.coords.longitude;
  var img_url="http://maps.googleapis.com/maps/api/staticmap?center="
    +latlon+"&zoom=14&size=400x300&sensor=false";
  document.getElementById("mapholder").innerHTML="<img src='"+img_url+"' />";
}
```

给定位置的信息

本页演示的是如何在地图上显示用户的位置。不过，地理定位对于给定位置的信息同样很有用处。

案例：

- 更新本地信息
- 显示用户周围的兴趣点
- 交互式车载导航系统 (GPS)

getCurrentPosition() 方法 - 返回数据

若成功，则 getCurrentPosition() 方法返回对象。始终会返回 latitude、longitude 以及 accuracy 属性。如果可用，则会返回其他下面的属性。

| 属性                    | 描述                   |
| ----------------------- | ---------------------- |
| coords.latitude         | 十进制数的纬度         |
| coords.longitude        | 十进制数的经度         |
| coords.accuracy         | 位置精度               |
| coords.altitude         | 海拔，海平面以上以米计 |
| coords.altitudeAccuracy | 位置的海拔精度         |
| coords.heading          | 方向，从正北开始以度计 |
| coords.speed            | 速度，以米/每秒计      |
| timestamp               | 响应的日期/时间        |

Geolocation对象 - 其他有趣的方法

- watchPosition() - 返回用户的当前位置，并继续返回用户移动时的更新位置（就像汽车上的 GPS）。
- clearWatch() - 停止 watchPosition() 方法

下面的例子展示 watchPosition() 方法。您需要一台精确的 GPS 设备来测试该例（比如 iPhone）：

实例

```html
<script>
var x=document.getElementById("demo");
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(showPosition);
  } else {
    x.innerHTML="Geolocation is not supported by this browser.";
  }
}
function showPosition(position) {
  x.innerHTML="Latitude: " + position.coords.latitude + "<br />Longitude: " + position.coords.longitude;
}
</script>
```

### 拖放

拖放（Drag 和 Drop）是很常见的特性。它指的是您抓取某物并拖入不同的位置。

拖放是 HTML5 标准的组成部分：任何元素都是可拖放的。

```html
<!DOCTYPE HTML>
<html>
<head>
<script>
  function allowDrop(ev) {
    ev.preventDefault();
  }

  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }

  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
  }
</script>
</head>
<body>
  <div id="div1" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
  <img id="drag1" src="img_logo.gif" draggable="true" ondragstart="drag(event)" width="336" height="69">
</body>
</html>
```

***把元素设置为可拖放***

首先：为了把一个元素设置为可拖放，请把 draggable 属性设置为 true

拖放的内容 - ondragstart 和 setData()

然后，规定当元素被拖动时发生的事情。

在上面的例子中，ondragstart 属性调用了一个 drag(event) 函数，规定拖动什么数据。

dataTransfer.setData() 方法设置被拖动数据的数据类型和值

在本例中，数据类型是 "text"，而值是这个可拖动元素的 id ("drag1")。

拖到何处 - ondragover

ondragover 事件规定被拖动的数据能够被放置到何处。

默认地，数据/元素无法被放置到其他元素中。为了实现拖放，我们必须阻止元素的这种默认的处理方式。

这个任务由 ondragover 事件的 event.preventDefault() 方法完成

进行放置 - ondrop

当放开被拖数据时，会发生 drop 事件。

在上面的例子中，ondrop 属性调用了一个函数，drop(event)

代码解释：

- 调用 preventDefault() 来阻止数据的浏览器默认处理方式（drop 事件的默认行为是以链接形式打开）
- 通过 dataTransfer.getData() 方法获得被拖的数据。该方法将返回在 setData() 方法中设置为相同类型的任何数据
- 被拖数据是被拖元素的 id ("drag1")
- 把被拖元素追加到放置元素中

### 本地存储

HTML 本地存储：优于 cookies。

***什么是 HTML 本地存储？***

通过本地存储（Local Storage），web 应用程序能够在用户浏览器中对数据进行本地的存储。

在 HTML5 之前，应用程序数据只能存储在 cookie 中，包括每个服务器请求。本地存储则更安全，并且可在不影响网站性能的前提下将大量数据存储于本地。

与 cookie 不同，存储限制要大得多（至少5MB），并且信息不会被传输到服务器。

本地存储经由起源地（origin）（经由域和协议）。所有页面，从起源地，能够存储和访问相同的数据。

#### HTML本地存储对象

HTML 本地存储提供了两个在客户端存储数据的对象：

- window.localStorage - 存储没有截止日期的数据
- window.sessionStorage - 针对一个 session 来存储数据（当关闭浏览器标签页时数据会丢失）

在使用本地存储时，请检测 localStorage 和 sessionStorage 的浏览器支持：

```js
if (typeof(Storage) !== "undefined") {
  // 针对 localStorage/sessionStorage 的代码
} else {
  // 抱歉！不支持 Web Storage ..
}
```

##### localStorage对象

localStorage 对象存储的是没有截止日期的数据。当浏览器被关闭时数据不会被删除，在下一天、周或年中，都是可用的。

```js
// 存储
localStorage.setItem("lastname", "Gates");
// 取回
document.getElementById("result").innerHTML = localStorage.getItem("lastname");
```

实例解释：

- 创建 localStorage 名称/值对，其中：name="lastname"，value="Gates"
- 取回 "lastname" 的值，并把它插到 id="result" 的元素中

上例也可这样写：

```js
// 存储
localStorage.lastname = "Gates";
// 取回
document.getElementById("result").innerHTML = localStorage.lastname;
```

删除 "lastname" localStorage 项目的语法如下：

```js
localStorage.removeItem("lastname");
```

注释：名称/值对始终存储为字符串。如果需要请记得把它们转换为其他格式！

下面的例子对用户点击按钮的次数进行计数。在代码中，值字符串被转换为数值，依次对计数进行递增：

```js
if (localStorage.clickcount) {
  localStorage.clickcount = Number(localStorage.clickcount) + 1;
} else {
  localStorage.clickcount = 1;
}
document.getElementById("result").innerHTML = "您已经点击这个按钮 " + localStorage.clickcount + " 次。";
```

##### sessionStorage对象

sessionStorage 对象等同 localStorage 对象，不同之处在于只对一个 session 存储数据。如果用户关闭具体的浏览器标签页，数据也会被删除。

下例在当前 session 中对用户点击按钮进行计数：

```js
if (sessionStorage.clickcount) {
  sessionStorage.clickcount = Number(sessionStorage.clickcount) + 1;
} else {
  sessionStorage.clickcount = 1;
}
document.getElementById("result").innerHTML = "在本 session 中，您已经点击这个按钮 " + sessionStorage.clickcount + " 次。";
```

#### 应用程序缓存

使用应用程序缓存，通过创建 cache manifest 文件，可轻松创建 web 应用的离线版本。

***什么是应用程序缓存？***

HTML5 引入了应用程序缓存（Application Cache），这意味着可对 web 应用进行缓存，并可在没有因特网连接时进行访问。

应用程序缓存为应用带来三个优势：

1. 离线浏览 - 用户可在应用离线时使用它们
2. 速度 - 已缓存资源加载得更快
3. 减少服务器负载 - 浏览器将只从服务器下载更新过或更改过的资源

示例

```html
<!DOCTYPE HTML>
<html manifest="demo.appcache">
<body>
文档内容 ......
</body>
</html>
```

***Cache Manifest 基础***

如需启用应用程序缓存，请在文档的 `<html>` 标签中包含 manifest 属性

每个指定了 manifest 的页面在用户对其访问时都会被缓存。如果未指定 manifest 属性，则页面不会被缓存（除非在 manifest 文件中直接指定了该页面）。

manifest 文件的建议文件扩展名是：".appcache"。

注意：manifest 文件需要设置正确的 MIME-type，即 "text/cache-manifest"。必须在 web 服务器上进行配置。

***Manifest 文件***

manifest 文件是简单的文本文件，它告知浏览器被缓存的内容（以及不缓存的内容）。

manifest 文件有三个部分：

- CACHE MANIFEST - 在此标题下列出的文件将在首次下载后进行缓存
- NETWORK - 在此标题下列出的文件需要与服务器的连接，且不会被缓存
- FALLBACK - 在此标题下列出的文件规定当页面无法访问时的回退页面（比如 404 页面）

***CACHE MANIFEST***

第一行，CACHE MANIFEST，是必需的：

```sh
CACHE MANIFEST
/theme.css
/logo.gif
/main.js
```

上面的 manifest 文件列出了三个资源：一个 CSS 文件，一个 GIF 图像，以及一个 JavaScript 文件。当 manifest 文件被加载后，浏览器会从网站的根目录下载这三个文件。然后，无论用户何时与因特网断开连接，这些资源依然可用。

***NETWORK***

下面的 NETWORK 部分规定文件 "login.php" 永远不会被缓存，且离线时是不可用的：

```sh
NETWORK:
login.asp
```

可以使用星号来指示所有其他其他资源/文件都需要因特网连接：

```sh
NETWORK:
*
```

```sh
FALLBACK
/html/ /offline.html
```

下面的 FALLBACK 部分规定如果无法建立因特网连接，则用 "offline.html" 替代 /html/ 目录中的所有文件。

注释：第一个 URI 是资源，第二个是替补。

更新缓存

一旦应用被缓存，它就会保持缓存直到发生下列情况：

- 用户清空浏览器缓存
- manifest 文件被修改（参阅下面的提示）
- 由程序来更新应用缓存

实例 - 完整的 Cache Manifest 文件

```sh
CACHE MANIFEST
# 2012-02-21 v1.0.0
/theme.css
/logo.gif
/main.js

NETWORK:
login.asp

FALLBACK:
/html/ /offline.html
```

提示：以 "#" 开头的是注释行，但也可满足其他用途。应用的缓存只会在其 manifest 文件改变时被更新。如果您编辑了一幅图像，或者修改了一个 JavaScript 函数，这些改变都不会被重新缓存。更新注释行中的日期和版本号是一种使浏览器重新缓存文件的办法。

***关于应用程序缓存的注意事项***

请留心缓存的内容。

一旦文件被缓存，则浏览器会继续展示已缓存的版本，即使您修改了服务器上的文件。为了确保浏览器更新缓存，您需要更新 manifest 文件。

注释：浏览器对缓存数据的容量限制可能不太一样（某些浏览器的限制是每个站点 5MB）。

### Web&nbsp;Workers

Web worker 是运行在后台的 JavaScript，不会影响页面的性能。

***什么是 Web Worker？***

当在 HTML 页面中执行脚本时，页面是不可响应的，直到脚本已完成。

Web worker 是运行在后台的 JavaScript，独立于其他脚本，不会影响页面的性能。您可以继续做任何愿意做的事情：点击、选取内容等等，而此时 web worker 运行在后台。

示例

```html
<!DOCTYPE html>
<html>
<body>
  <p>计数: <output id="result"></output></p>
  <button onclick="startWorker()">开始 Worker</button>
  <button onclick="stopWorker()">停止 Worker</button>
  <br /><br />
  <script>
    var w;
    function startWorker() {
      if(typeof(Worker)!=="undefined") {
        if(typeof(w)=="undefined") {
          w=new Worker("/example/html5/demo_workers.js");
        }
        w.onmessage = function (event) {
          document.getElementById("result").innerHTML=event.data;
        };
      } else {
        document.getElementById("result").innerHTML="Sorry, your browser does not support Web Workers...";
      }
    }
    function stopWorker() {
      w.terminate();
      w = undefined;
    }
  </script>
</body>
</html>
```

***检测 Web Worker 支持***

在创建 web worker 之前，请检测用户浏览器是否支持它

创建 Web Worker 文件

现在，让我们在一个外部 JavaScript 文件中创建我们的 web worker。

在此处，我们创建了计数脚本。该脚本存储于 "demo_workers.js" 文件中

```js
var i=0;
function timedCount() {
  i=i+1;
  postMessage(i);
  setTimeout("timedCount()",500);
}
timedCount();
```

以上代码中重要的部分是 postMessage() 方法 - 它用于向 HTML 页面传回一段消息。

注释: web worker 通常不用于如此简单的脚本，而是用于更耗费 CPU 资源的任务。

***创建 Web Worker 对象***

现在我们已经有了 web worker 文件，我们需要从 HTML 页面调用它。

上面的代码行检测是否存在 worker，如果不存在，- 它会创建一个新的 web worker 对象，然后运行 "demo_workers.js" 中的代码

然后我们就可以从 web worker 发生和接收消息了。

向 web worker 添加一个 "onmessage" 事件监听器

当 web worker 传送消息时，会执行事件监听器中的代码。来自 web worker 的数据会存储于 event.data 中。

***终止 Web Worker***

当创建 web worker 后，它会继续监听消息（即使在外部脚本完成后）直到其被终止为止。

如需终止 web worker，并释放浏览器/计算机资源，请使用 terminate() 方法

***复用 Web Worker***

如果您把 worker 变量设置为 undefined，在其被终止后，可以重复使用该代码

***Web Worker 和 DOM***

由于 web worker 位于外部文件中，它们无法访问下例 JavaScript 对象：

- window 对象
- document 对象
- parent 对象

### Server-Sent事件

Server-Sent 事件允许网页从服务器获得更新。

***Server-Sent 事件 - One Way Messaging***

以前也可能做到这一点，前提是网页不得不询问是否有可用的更新。通过 Server-Sent 事件，更新能够自动到达。

例如：Facebook/Twitter 更新、股价更新、新的博文、赛事结果，等等。

***接收 Server-Sent 事件通知***

EventSource 对象用于接收服务器发送事件通知：

```js
var source = new EventSource("demo_sse.php");
source.onmessage = function(event) {
  document.getElementById("result").innerHTML += event.data + "<br>";
};
```

例子解释：

- 创建一个新的 EventSource 对象，然后规定发送更新的页面的 URL（本例中是 "demo_sse.php"）
- 每当接收到一次更新，就会发生 onmessage 事件
- 当 onmessage 事件发生时，把已接收的数据推入 id 为 "result" 的元素中

***检测 Server-Sent 事件支持***

```js
if(typeof(EventSource) !== "undefined") {
  // 是的！支持服务器发送事件！
  // 一些代码.....
} else {
  // 抱歉！不支持服务器发送事件！
}
```

***服务器端代码实例***

为了使上例运行，您需要能够发送数据更新的服务器（比如 PHP）。

服务器端事件流的语法非常简单。请把 "Content-Type" 报头设置为 "text/event-stream"。现在，您可以开始发送事件流了。

```php
<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');

$time = date('r');
echo "data: The server time is: {$time}\n\n";
flush();
?>
```

代码解释：

- 把报头 "Content-Type" 设置为 "text/event-stream"
- 规定不对页面进行缓存
- 输出要发送的日期（始终以 "data: " 开头）
- 向网页刷新输出数据

***EventSource 对象***

在上例中，我们使用 onmessage 事件来获取消息。不过还可以使用其他事件：

| 事件      | 描述                     |
| --------- | ------------------------ |
| onopen    | 当通往服务器的连接被打开 |
| onmessage | 当接收到消息             |
| onerror   | 当发生错误               |

## 总结

### 常用对象

```sh
网页可见区域宽： document.body.clientWidth;
网页可见区域高： document.body.clientHeight;
网页可见区域宽： document.body.offsetWidth （包括边线的宽）
网页可见区域高： document.body.offsetHeight （包括边线的宽）
网页正文全文宽： document.body.scrollWidth;
网页正文全文高： document.body.scrollHeight;
网页被卷去的高： document.body.scrollTop;
网页被卷去的左： document.body.scrollLeft;
网页正文部分上： window.screenTop;
网页正文部分左： window.screenLeft;
屏幕分辨率的高： window.screen.height;
屏幕分辨率的宽： window.screen.width;
屏幕可用工作区高度： window.screen.availHeight;
屏幕可用工作区宽度：window.screen.availWidth;

scrollHeight: 获取对象的滚动高度。  
scrollLeft:设置或获取位于对象左边界和窗口中目前可见内容的最左端之间的距离
scrollTop:设置或获取位于对象最顶端和窗口中可见内容的最顶端之间的距离
scrollWidth:获取对象的滚动宽度
offsetHeight:获取对象相对于版面或由父坐标 offsetParent 属性指定的父坐标的高度
offsetLeft:获取对象相对于版面或由 offsetParent 属性指定的父坐标的计算左侧位置
offsetTop:获取对象相对于版面或由 offsetTop 属性指定的父坐标的计算顶端位置  
event.clientX 相对文档的水平座标
event.clientY 相对文档的垂直座标

event.offsetX 相对容器的水平坐标
event.offsetY 相对容器的垂直坐标  
document.documentElement.scrollTop 垂直方向滚动的值
event.clientX+document.documentElement.scrollTop 相对文档的水平座标+垂直方向滚动的量
要获取当前页面的滚动条纵坐标位置，用：
document.documentElement.scrollTop;
而不是：
document.body.scrollTop;
documentElement 对应的是 html 标签，而 body 对应的是 body 标签

事件源对象
event.srcElement.tagName
event.srcElement.type

捕获释放
event.srcElement.setCapture();  
event.srcElement.releaseCapture();  

事件按键
event.keyCode
event.shiftKey
event.altKey
event.ctrlKey

事件返回值
event.returnValue

鼠标位置
event.x
event.y

窗体活动元素
document.activeElement

绑定事件
document.captureEvents(Event.KEYDOWN);

访问窗体元素
document.all("txt").focus();
document.all("txt").select();

窗体命令
document.execCommand

窗体COOKIE
document.cookie

菜单事件
document.oncontextmenu

创建元素
document.createElement("SPAN");  

根据鼠标获得元素：
document.elementFromPoint(event.x,event.y).tagName=="TD"
document.elementFromPoint(event.x,event.y).appendChild(ms)  

窗体图片
document.images[索引]

窗体事件绑定
document.onmousedown=scrollwindow;

元素
document.窗体.elements[索引]

对象绑定事件
document.all.xxx.detachEvent('onclick',a);

插件数目
navigator.plugins

取变量类型
typeof($js_libpath) == "undefined"

下拉框
下拉框.options[索引]
下拉框.options.length

查找对象
document.getElementsByName("r1");
document.getElementById(id);

定时
timer=setInterval('scrollwindow()',delay);
clearInterval(timer);

UNCODE编码
escape() ,unescape

父对象
obj.parentElement(dhtml)
obj.parentNode(dom)

交换表的行
TableID.moveRow(2,1)

替换CSS
document.all.csss.href = "a.css";

并排显示
display:inline

隐藏焦点
hidefocus=true

根据宽度换行
style="word-break:break-all"

自动刷新
<meta HTTP-EQUIV="refresh" C>

简单邮件
<a href="mailto:aaa@bbb.com?subject=ccc&body=xxxyyy">  

快速转到位置
obj.scrollIntoView(true)

锚
<a name="first">
<a href="#first">anchors</a>

网页传递参数
location.search();

可编辑
obj.contenteditable=true

执行菜单命令
obj.execCommand

双字节字符
/[^\x00-\xff]/

汉字
/[\u4e00-\u9fa5]/

让英文字符串超出表格宽度自动换行
word-wrap: break-word; word-break: break-all;

透明背景
<IFRAME src="1.htm" width=300 height=180 allowtransparency></iframe>

获得style内容
obj.style.cssText

HTML标签
document.documentElement.innerHTML

第一个style标签
document.styleSheets[0]

style标签里的第一个样式
document.styleSheets[0].rules[0]

防止点击空链接时，页面往往重置到页首端。
<a href="javascript unction()">word</a>

上一网页源
asp:
request.servervariables("HTTP_REFERER")
javascript:
document.referrer

释放内存
CollectGarbage();

禁止右键
document.oncontextmenu = function() { return false;}

禁止保存
<noscript><iframe src="*.htm"></iframe></noscript>

禁止选取
<body oncontextmenu="return false" ondragstart="return false" onselectstart ="return false" onselect="document.selection.empty()" oncopy="document.selection.empty()" onbeforecopy="return false"onmouseup="document.selection.empty()">

禁止粘贴
<input type=text>

地址栏图标
<link rel="Shortcut Icon" href="favicon.ico">
favicon.ico 名字最好不变16*16的16色,放虚拟目录根目录下

收藏栏图标
<link rel="Bookmark" href="favicon.ico">

查看源码
<input type=button value=查看网页源代码>

关闭输入法
<input style="ime-mode isabled">

自动全选
<input type=text name=text1 value="123">

ENTER键可以让光标移到下一个输入框
<input >

文本框的默认值
<input type=text value="123">

title换行
obj.title = "123 sdfs"

获得时间所代表的微秒
var n1 = new Date("2004-10-10".replace(/-/g, "\/")).getTime()

窗口是否关闭
win.closed

checkbox扁平
<input type=checkbox style="position: absolute; clip:rect(5px 15px 15px 5px)"><br>

获取选中内容
document.selection.createRange().duplicate().text

自动完成功能

<input  type=text  autocomplete=on>打开该功能  
<input  type=text  autocomplete=off>关闭该功能
窗口最大化
<body >

无关闭按钮IE
window.open("aa.htm", "meizz", "fullscreen=7");

统一编码/解码
alert(decodeURIComponent(encodeURIComponent("http://你好.com?as= hehe")))
encodeURIComponent对":"、"/"、";" 和 "?"也编码

表格行指示
```

```html
<tr>
//各种尺寸
s  +=  "\r\n网页可见区域宽："+  document.body.clientWidth;
s  +=  "\r\n网页可见区域高："+  document.body.clientHeight;
s  +=  "\r\n网页可见区域高："+  document.body.offsetWeight  +"  (包括边线的宽)";
s  +=  "\r\n网页可见区域高："+  document.body.offsetHeight  +"  (包括边线的宽)";
s  +=  "\r\n网页正文全文宽："+  document.body.scrollWidth;
s  +=  "\r\n网页正文全文高："+  document.body.scrollHeight;
s  +=  "\r\n网页被卷去的高："+  document.body.scrollTop;
s  +=  "\r\n网页被卷去的左："+  document.body.scrollLeft;
s  +=  "\r\n网页正文部分上："+  window.screenTop;
s  +=  "\r\n网页正文部分左："+  window.screenLeft;
s  +=  "\r\n屏幕分辨率的高："+  window.screen.height;
s  +=  "\r\n屏幕分辨率的宽："+  window.screen.width;
s  +=  "\r\n屏幕可用工作区高度："+  window.screen.availHeight;
s  +=  "\r\n屏幕可用工作区宽度："+  window.screen.availWidth;
```

### call、Apply

我们知道，Array.prototype.slice.call(arguments)能将具有length属性的对象转成数组，除了IE下的节点集合（因为ie下的dom对象是以com对象的形式实现的，js对象与com对象不能进行转换）。如：

```js
var a={length:2,0:'first',1:'second'};
Array.prototype.slice.call(a); // ["first", "second"]
  
var a={length:2};
Array.prototype.slice.call(a); // [undefined, undefined]
```

可能刚开始学习js的童鞋并不是很能理解这句为什么能实现这样的功能。比如我就是一个，所以，来探究一下。

首先，slice有两个用法，一个是String.slice,一个是Array.slice，第一个返回的是字符串，第二个返回的是数组，这里我们看第2个。

```js
Array.prototype.slice.call(arguments) // 能够将arguments转成数组，那么就是arguments.toArray().slice();到这里，是不是就可以说Array.prototype.slice.call(arguments)的过程就是先将传入进来的第一个参数转为数组，再调用slice？
```

再看call的用法，如下例子

```js
var a = function(){
  console.log(this);    // 'littledu'
  console.log(typeof this);      //  Object
  console.log(this instanceof String);    // true
}
a.call('littledu');
```

可以看出，call了后，就把当前函数推入所传参数的作用域中去了，不知道这样说对不对，但反正this就指向了所传进去的对象就肯定的了。

到这里，基本就差不多了，我们可以大胆猜一下slice的内部实现，如下

```js
Array.prototype.slice = function(start,end){
  var result = new Array();
  start = start || 0;
  end = end || this.length; //this指向调用的对象，当用了call后，能够改变this的指向，也就是指向传进来的对象，这是关键
  for(var i = start; i < end; i++){
    result.push(this[i]);
  }
  return result;
}
```

最后，附个转成数组的通用函数

```js
var toArray = function(s){
  try{
    return Array.prototype.slice.call(s);
  } catch(e){
    var arr = [];
    for(var i = 0,len = s.length; i < len; i++){
      //arr.push(s[i]);
      arr[i] = s[i];  //据说这样比push快
    }
    return arr;
  }
}
```

### encodeURI、encodeURIComponent、decodeURI、decodeURIComponent

1、用来编码和解码URI的

统一资源标识符，或叫做 URI，是用来标识互联网上的资源（例如，网页或文件）和怎样访问这些资源的传输协议（例如，HTTP 或 FTP）的字符串。除了encodeURI、encodeURIComponent、decodeURI、decodeURIComponent四个用来编码和解码 URI 的函数之外 ECMAScript 语言自身不提供任何使用 URL 的支持。

2、URI组成形式

一个 URI 是由组件分隔符分割的组件序列组成。其一般形式是：

Scheme : First / Second ; Third ? Fourth

其中的名字代表组件；":"  "/"  ";"  "?" 是当作分隔符的保留字符。

3、有何不同？

encodeURI 和 decodeURI 函数操作的是完整的 URI；这俩函数假定 URI 中的任何保留字符都有特殊意义，所有不会编码它们。

encodeURIComponent 和 decodeURIComponent 函数操作的是组成 URI 的个别组件；这俩函数假定任何保留字符都代表普通文本，所以必须编码它们，所以它们（保留字符）出现在一个完整 URI 的组件里面时不会被解释成保留字符了。

4、四个函数的不同：

一个URI可能包含以下5种类型的字符

1) 保留字符： ;/?:@&=+$,
2) 非转义字符：字母、数字、URI标记符 [-_.!~*'()]
3) '#'
4) 其它：
5) 被转义字符：16进制字符，"%xx"

encodeURI: 4)

encodeURIComponent: 1), 3), 4)

### content="IE=edge,chrome=1"详解

`<meta http-equiv = "X-UA-Compatible" content = "IE=edge,chrome=1" />`

这个是IE8的专用标记，用来指定IE8浏览器去模拟某个特定版本的IE浏览器的渲染方式(比如人见人烦的IE6)，以此来解决部分兼容问题，例如模拟IE7的具体方式如下：

`<meta http-equiv = "X-UA-Compatible" content = "IE=EmulateIE7" />`

但令我好奇的是，此处这个标记后面竟然出现了chrome这样的值，难道IE也可以模拟chrome了？

迅速搜索了一下，才明白原来不是微软增强了IE，而是谷歌做了个外挂：Google Chrome Frame(谷歌内嵌浏览器框架GCF)。这个插件可以让用户的IE浏览器外不变，但用户在浏览网页时，实际上使用的是Google Chrome浏览器内核，而且支持IE6、7、8等多个版本的IE浏览器，谷歌这个墙角挖的真给力！

而上文提到的那个meta标记，则是在是安装了GCF后，用来指定页面使用chrome内核来渲染。

GCF下载地址：`http://code.google.com/intl/zh-CN/chrome/chromeframe/`

安装完成后，如果你想对某个页面使用GCF进行渲染，只需要在该页面的地址前加上 gcf： 即可，例如：`gcf:http://cooleep.com`

但是如果想要在开发时指定页面默认首先使用GCF进行渲染，如果未安装GCF再使用IE内核进行渲染，该如何进行呢？

就是使用这个标记。

标记用法：

阅读了下chrome的开发文档(`http://www.chromium.org/developers/how-tos/chrome-frame-getting-started`，需翻墙)，下面来简单讲解一下这个标记的语法。

1.最基本的用法：在页面的头部加入

`<meta http-equiv = "X-UA-Compatible" content = "chrome=1">`

用以声明当前页面用chrome内核来渲染。

复杂一些的就是本文一开始看到的那中用法：

`<meta http-equiv = "X-UA-Compatible" content = "IE=edge,chrome=1" />`

这样写可以达到的效果是如果安装了GCF，则使用GCF来渲染页面，如果为安装GCF，则使用最高版本的IE内核进行渲染。

2.通过修改HTTP头文件的方法来实现让指定的页面使用GCF内核进行渲染：

在HTTP的头文件中加入以下信息：X-UA-Compatible: chrome=1

在Apache服务器中，确保 mod_headers 和 mod_setenvif文件可用，然后在httpd.conf中加入以下配置信息：

```conf
<IfModule mod_setenvif.c>
<IfModule mod_headers.c>

BrowserMatch chromeframe gcf
Header append X-UA-Compatible "chrome=1" env=gcf
```

在IIS7或者更高版本的服务器中，只需要修改web.config文件，添加如下信息即可即可:

```config
<configuration>
  <system.webServer>
    <httpProtocol>
      <customHeaders>
        <add name = "X-UA-Compatible" value = "chrome=1" />
      </customHeaders>
    </httpProtocol>
  </system.webServer>
</configuration>
```

### 中文乱码问题

归纳以下几点：

1. html文件是有编码格式的，这个在特定的编辑器中才能看出来，并进行设置。
2. html文件中头部的"content-type"中设置的"charset"是告诉浏览器打开该文件的编码方式。
3. 一般1、2点中的编码方式应该一致，不一致可能出现乱码。
4. 如果浏览器中显示乱码，但是页面源文件不是乱码，可以通过修改浏览器的编码方式看到正确的中文，如果在源文件中设置了正确的"charset"，就不需要修改浏览器的编码方式了。

### 对象获取

**[object Object]怎么获取？**

```js
var temp = "";
for(var i in obj) { //用javascript的for/in循环遍历对象的属性
  if(i.indexOf("Repeater1")>=0) {
    temp+=i+":"+obj[i]+"\n";
  }
}
alert(temp);
```

js中想根据动态key得到某对象中相对应的value的方法有二：
一、var key = "name1";var value = obj[key];
二、var key = "name1";var value = eval("obj."+key);

### 节点的兄弟，父级，子级元素

先说一下JS的获取方法，其要比JQUERY的方法麻烦很多，后面以JQUERY的方法作对比。

JS的方法会比JQUERY麻烦很多，主要则是因为FF浏览器，FF浏览器会把你的换行也当最DOM元素

```html
<div id="test">
  <div></div>
  <div></div>
</div>
```

原生的JS获取ID为test的元素下的子元素。可以用：

```js
var a = docuemnt.getElementById("test").getElementsByTagName("div"); // 这样是没有问题的
```

此时a.length=2；

但是如果我们换另一种方法

```js
var b = document.getElementById("test").childNodes;  
```

此时b.length 在IE浏览器中没问题，其依旧等于2，但是在FF浏览器中则会使4，是因为FF把换行也当做一个元素了。所以，在此，我们就要做处理了，需遍历这些元素，把元素类型为空格而且是文本都删除。

```js
function del_ff(elem) {
  var elem_child = elem.childNodes;
  for(var i=0; i<elem_child.length; i++) {
    if(elem_child[i].nodeName == "#text" && !/\s/.test(elem_child.nodeValue)){
      elem.removeChild(elem_child)
    }
  }
}
```

上述函数遍历子元素，当元素里面有节点类型是文本并且文本类型节点的节点值是空的。就把他删除。

nodeNames可以得到一个节点的节点类型，/\s/是非空字符在JS里的正则表达式。前面加！,则表示是空字符

test() 方法用于检测一个字符串是否匹配某个模式.语法是：RegExpObject.test(string)

如果字符串 string 中含有与 RegExpObject 匹配的文本，则返回 true，否则返回 false。

nodeValue表示得到这个节点里的值。

removeChild则是删除元素的子元素。

之后，在调用子，父，兄，这些属性之前，调用上面的函数把空格清理一下就可以了

```html
<div id="test">
  <div></div>
  <div></div>
</div>
<script>
  function dom() {
    var s= document.getElementById("test");
    del_ff(s); // 清理空格
    var chils= s.childNodes; // 得到s的全部子节点
    var par=s.parentNode; // 得到s的父节点
    var ns=s.nextSbiling; // 获得s的下一个兄弟节点
    var ps=s.previousSbiling; // 得到s的上一个兄弟节点
    var fc=s.firstChild; // 获得s的第一个子节点
    var lc=s.lastChile; // 获得s的最后一个子节点
  }
</script>
```

下面介绍JQUERY的父，子，兄弟节点查找方法

- jQuery.parent(expr)  找父亲节点，可以传入expr进行过滤，比如$("span").parent()或者$("span").parent(".class")
- jQuery.parents(expr),类似于jQuery.parent(expr),但是是查找所有祖先元素，不限于父元素
- jQuery.children(expr).返回所有子节点，这个方法只会返回直接的孩子节点，不会返回所有的子孙节点
- jQuery.contents(),返回下面的所有内容，包括节点和文本。这个方法和children()的区别就在于，包括空白文本，也会被作为一个jQuery对象返回，children()则只会返回节点
- jQuery.prev()，返回上一个兄弟节点，不是所有的兄弟节点
- jQuery.prevAll()，返回所有之前的兄弟节点
- jQuery.next(),返回下一个兄弟节点，不是所有的兄弟节点
- jQuery.nextAll()，返回所有之后的兄弟节点
- jQuery.siblings(),返回兄弟姐妹节点，不分前后
- jQuery.find(expr),跟jQuery.filter(expr)完全不一样。jQuery.filter()是从初始的jQuery对象集合中筛选出一部分，而jQuery.find()的返回结果，不会有初始集合中的内容，比如$("p"),find("span"),是从<p>元素开始找<span>,等同于$("p span")

```html
<noscript>
  <iframe src="*.htm"></iframe>
</noscript>
```

前面应该还有一段js代码。noscript元素用来定义在脚本未被执行时的替代内容（文本）。此标签可被用于可识别`<script>`标签但无法支持其中的脚本的浏览器。此段代码意思为如果浏览器不支持script的代码，则会显示嵌入的那个页面的内容。

### opener、parent、top

opener即谁打开我的，比如A页面利用window.open弹出了B页面窗口，那么A页面所在窗口就是B页面的opener，在B页面通过opener对象可以访问A页面。

parent表示父窗口，比如一个A页面利用iframe或frame调用B页面，那么A页面所在窗口就是B页面的parent。

top是parent的特殊情况，表示顶层窗口。

在JS 中，window.opener只是对弹出窗口的母窗口的一个引用。比如：a.html中，通过点击按钮等方式window.open出一个新的窗口 b.html。那么在b.html中，就可以通过window.opener（省略写为opener）来引用a.html，包括a.html的 document等对象，操作a.html的内容。

假如这个引用失败，那么将返回null。所以在调用opener的对象前，要先判断对象是否为null，否则会出现“对象为空或者不存在”的JS错误。

### table设置问题

设置table的Width

设置td的Width

如果用百分比，td的宽度有时候会有问题，用绝对值，显示就正常了，当然，先满足table宽度，再根据td宽度值按比例分配

table边框问题，一般在设置边框宽度时光增加border=1显示出来的边界并不是我们希望的那样，因为在各个边框之间还存在着间距，可以如下设置

```html
<table cellpadding="0" cellspacing="0" border=1>
```

### table固定宽度

table-layout:fixed 属性的解说

如果想要一个table固定大小，里面的文字强制换行(尤其是在一长串英文文本，并且中间无空格分隔的情况下)，以达到使过长的文字不撑破表格的目的，一般是使用样式：table-layout:fixed。但是在Firefox下面，会有一些问题，参考 Gmail的一些做法，做了几个测试，得出一种解决办法。

例1：(IE浏览器)普通的情况，CODE:

```html
<table border=1 width=80>
  <tr>
    <td>abcdefghigklmnopqrstuvwxyz 1234567890</td>
  </tr>
</table>
```

效果：可以看到width=80并没有起作用，表格被字符撑开了。

例2：(IE浏览器)使用样式 `table-layout:fixed`，CODE:

```html
<style>
  .tbl {
    table-layout:fixed
  }
</style>
<table class=tbl border=1 width=80>
  <tr>
    <td>abcdefghigklmnopqrstuvwxyz 1234567890</td>
  </tr>
</table>
```

效果：width=80起作用了，但是表格换行了。

例3：(IE浏览器)使用样式table-layout:fixed与nowrap，CODE:

```html
<style>
  .tbl {
    table-layout:fixed
  }
</style>
<table class=tbl border=1 width=80>
  <tr>
    <td nowrap>abcdefghigklmnopqrstuvwxyz 1234567890</td>
  </tr>
</table>
```

效果：width=80起作用了，换行也被干掉了。

例4：(IE浏览器)在使用数值固定td大小情况下使用样式table-layout:fixed与nowrap，CODE:

```html
<style>
  .tbl {
    table-layout:fixed
  }
</style>
<table class=tbl border=1 width=80>
  <tr>
    <td width=20 nowrap>abcdefghigklmnopqrstuvwxyz 1234567890</td>
    <td nowrap>abcdefghigklmnopqrstuvwxyz 1234567890</td>
  </tr>
</table>
```

效果：不幸发生了，第一个td的nowrap不起作用了

例5：(IE浏览器)在使用百分比固定td大小情况下使用样式table-layout:fixed与nowrap，CODE:

```html
<style>
  .tbl {
    table-layout:fixed
  }
</style>
<table class=tbl border=1 width=80>
  <tr>
    <td width=25% nowrap>abcdefghigklmnopqrstuvwxyz 1234567890</td>
    <td nowrap>abcdefghigklmnopqrstuvwxyz 1234567890</td>
  </tr>
</table>
```

效果：改成百分比，终于搞定了

例6：(Firefox浏览器)在使用百分比固定td大小情况下使用样式table-layout:fixed与nowrap 效果：把例5放到firefox下面，又ft了

例7：(Firefox浏览器)在使用百分比固定td大小情况下使用样式table-layout:fixed与nowrap,并且使用div，CODE:

```html
<style>
  .tbl {
    table-layout:fixed
  }
  .td {
    overflow:hidden;
  }
</style>
<table class=tbl border=1 width=80>
  <tr>
    <td width=25% class=td nowrap>
      <div>abcdefghigklmnopqrstuvwxyz 1234567890</div>
    </td>
    <td class=td nowrap>
      <div>abcdefghigklmnopqrstuvwxyz 1234567890</div>
    </td>
  </tr>
</table>
```

效果：天下终于太平了

例8：(Firefox浏览器)在使用数值固定td大小情况下使用样式table-layout:fixed与nowrap,并且使用div，CODE:

```html
<style>
  .tbl {
    table-layout:fixed
  }
  .td {
    overflow:hidden;
  }
</style>
<table class=tbl border=1 width=80>
  <tr>
    <td width=20 class=td nowrap>
      <div>abcdefghigklmnopqrstuvwxyz 1234567890</div>
    </td>
    <td class=td nowrap>
      <div>abcdefghigklmnopqrstuvwxyz 1234567890</div>
    </td>
  </tr>
</table>
```

效果： nowrap又不起作用了

但是使用它在不同浏览器中又会出现问题，显示效果整齐了，确显示内容被覆盖了，这又怎样解决呢，我又开始了搜索，可以强制换行，却又导致有的单词被分家了连不起来，后来有在表单格式中加了一句word-wrap:break-word，详细内容如下：word-wrap是控制换行的。

使用break-word时，是将强制换行。中文没有任何问题，英文语句也没问题。但是对于长串的英文，就不起作用。break-word是控制是否断词的。normal是默认情况，英文单词不被拆开。break-all，是断开单词。在单词到边界时，下个字母自动到下一行。主要解决了长串英文的问题。keep-all，是指Chinese, Japanese, and Korean不断词。即只用此时，不用word-wrap，中文就不会换行了。（英文语句正常。）

ie下：使用word-wrap:break-word;所有的都正常。

ff下：如这2个都不用的话，中文不会出任何问题。英文语句也不会出问题。但是，长串英文会出问题。

为了解决长串英文，一般用word-wrap:break-word;word-break:break-all;。但是，此方式会导致普通的英文语句中的单词会被断开（ie下也是）。

目前主要的问题存在于长串英文和英文单词被断开。其实长串英文就是一个比较长的单词而已。

即英文单词应不应该被断开那？那问题很明显了，显然不应该被断开了。

对于长串英文，就是恶意的东西，自然不用去管了。但是，也要想些办法，不让它把容器撑大。

用：overflow:auto; ie下，长串会自动折行。ff下，长串会被遮盖。

所以，综上，最好的方式是word-wrap:break-word;overflow:hidden;而不是word-wrap:break-word;word-break:break-all;。

word-wrap:break-word;overflow:auto;在ie下没有任何问题。在ff下，长串会被遮住部分内容。加这句话   style="word-wrap:break-word;table-layout: fixed;"，上面的问题就解决了。希望对大家有意!!!!!

table-layout  版本：CSS2　兼容性：IE5+　继承性：无

语法：table-layout : auto | fixed

取值：

- auto: 默认值。默认的自动算法。布局将基于各单元格的内容。表格在每一单元格内所有内容读取计算之后才会显示出来
- fixed: 固定布局的算法。在这种算法中，表格和列的宽度取决于 col 对象的宽度总和，假如没有指定，则会取决于第一行每个单元格的宽度。假如表格没有指定宽度( width )属性，则表格被呈递的默认宽度为 100% 。

说明：

设置或检索表格的布局算法。

你可以通过此属性改善表格呈递性能。此属性导致IE以一次一行的方式呈递表格内容从而提供给信息用户更快的速度。此属性依据此下顺序使用其中一种方式布置表格栏宽度：

使用 col 或 colGroup 对象的宽度( width )属性信息。

使用表格第一行内的单元格的宽度( width )信息。

依据表格列数等分表格宽度。而不考虑表格内容的实际宽度。

假如单元格的内容超过了列宽度，内容将会被换行。假如无法换行，则内容会被裁切。假如此属性被设置为 fixed ，则 overflow 能够被用于控制处理溢出单元格( td )宽度的内容。假如表格行高度被指定了，那么换行的内容如果超出了指定表格行高度也会在纵向上被裁切。

设置此属性值为 fixed ，有助于提高表格性能。对于长表格效果尤其显著。

设置表格行高可以进一步提高呈递速度，浏览器不需要检测行内每一个单元格内容去确定行高就可以开始解析以及呈递。

此属性对于 currentStyle 对象而言是只读的。对于其他对象而言是可读写的。

对应的脚本特性为 tableLayout。

```html
<!--固定表格的宽度，超出部分用...代替-->
<style>
table {
  font-size:small;
  text-align:left;
  table-layout:fixed;
  margin: 0px;
  border-style: solid;
  border-color:Black;
  border-collapse: collapse;
  border-spacing: 0px;
}
td {
  border:solid 1pxblack;
  overflow:hidden;
  white-space:nowrap;
  text-overflow:ellipsis;
}
</style>
<colgroup>
  <colwidth="65px"/>
  <colwidth="141px"/>
  <colwidth="60px"/>
  <colwidth="101px"/>
  <colwidth="52px"/>
  <colwidth="70px"/>
  <colwidth="59px"/>
  <colwidth="56px"/>
  <colwidth="56px"/>
  <colwidth="56px"/>
  <colwidth="56px"/>
  <colwidth="56px"/>
  <colwidth="56px"/>
  <colwidth="56px"/>
  <colwidth="42px"/>
  <colwidth="60px"/>
  <colwidth="50px"/>
  <colwidth="40px"/>
  <colwidth="20px"/>
  <colwidth="20px"/>
  <colwidth="20px"/>
</colgroup>
```

### 隐藏显示div

```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<html>
<head>
    <title>Test</title>
    <script type="text/javascript">
        function selectCond(id) {
            if (id == "" || id == null) {
                if (document.all['tab'].style.display == "") {
                    document.all['tab'].style.display = "none";
                    return;
                }
                document.all['tab'].style.display = "";
            } else {
                if (document.all['tab' + id].style.display == "") {
                    document.all['tab' + id].style.display = "none";
                    return;
                }
                document.all['tab' + id].style.display = "";
            }
        }
    </script>
</head>
<body>
    <fieldset>
        <legend>
            <span onclick="selectCond();">
                <span>请点击</span>
            </span>
        </legend>
        <div id="tab" style="display: none">
            这就是隐藏的内容！o(∩_∩)o 哈哈
        </div>
    </fieldset>
</body>
</html>
```

### 让div自动适应内容的高度

我们看下面的代码：

```html
<div id="main">
  <div id="content"></div>
</div>
```

当Content内容多时，即使main设置了高度100%或auto。在不同浏览器下还是不能完好的自动伸展。内容的高度比较高了，但容器main的高度还是不能撑开。

我们可以通过三种方法 来解决这个问题。

1.增加一个清除浮动，让父容器知道高度。请注意，清除浮动的容器中有一个空格。

```html
<div id="main">
  <div id="content"></div>
  <div style="font:0px/0px sans-serif;clear:both;display:block">空格</div>
</div>
```

2.增加一个容器，在代码中存在，但在视觉中不可见。

```html
<div id="main">
  <div id="content"></div>
  <div style="height:1px;margin-top:-1px;clear:both;overflow:hidden;"></div>
</div>
```

3.增加一个BR并设置样式为clear:both。

```html
<div id="main">
  <div id="content"></div>
  <br style="clear:both;"/>
</div>
```

### CSS的overflow:hidden属性详细解释

overflow:hidden这个CSS样式是大家常用到的CSS样式，但是大多数人对这个样式的理解仅仅局限于隐藏溢出，而对于清除浮动这个含义不是很了解。一提到清除浮动，我们就会想到另外一个CSS样式：clear:both，我相信对于这个属性的理解大家都不成问题的。但是对于“浮动”这个词到底包含什么样的含义呢？我们下面来详细的阐述一下。

这是一个常用的div写法，下面我们来书写样式。

```css
#box {
  width:500px;
  background:#000;
  height:500px;
}
#content {
  float:left;
  width:600px;
  height:600px;
  background:red;
}
```

我们知道 overflow:hidden 这个属性的作用是隐藏溢出，给box加上这个属性后，我们的 content 的宽高自动的被隐藏掉了。

另外，我们再做一个试验，将box这个div的高度值删除后，我们发现，box的高度自动的被content这个div的高度给撑开了。说到这里，我们再来理解一下“浮动”这个词的含义。

我们原先的理解是，在一个平面上的浮动，但是通过这个试验，我们发现，这不仅仅是一个平面上的浮动，而是一个立体的浮动！也就是说，当content这个div加上浮动这个属性的时候，在显示器的侧面，它已经脱离了box这个div，也就是说，此时content的宽高是多少，对于已经脱离了的box来说，都是不起作用的。

当我们全面的理解了浮动这个词的含义的时候，我们就理解 overflow:hidden 这个属性清除浮动是什么意思了。也就是说，当我们给box这个div加上 overflow:hidden 这个属性的时候，其中的content 等等带浮动属性的div的在这个立体的浮动已经被清除了。这就是overflow:hidden这个属性清除浮动的准确含义。

当我们没有给box这个div设置高度的时候，content这个div的高度，就会撑开box这个div，而在另一个方面，我们要注意到的是，当我们给box这个div加上一个高度值，那么无论content这个div的高度是多少，box这个高度都是我们设定的值。而当content的高度超过box的高度的时候，超出的部分就会被隐藏。这就是隐藏溢出的含义！

IE8/9使用 text-overflow:ellipsis 做块元素超长内容变省略号的问题。IE8支持 text-overflow: ellipsis; 不过都是有条件的

首先用的时候要配合：

```css
overflow: hidden;
white-space: nowrap;
```

这两个属性让溢出隐藏和不换行，然后IE8用的时候不要加

```css
word-berak:break-all;
word-wrap:break-word;
```

这样断开了，在IE8里面是不会变成省略号的（但是在IE6/7/FF/Chrome都没有问题），其实都单行省略了，本来也没有必要断词。

所以一般标准组合就是：

```css
overflow: hidden;
white-space: nowrap;
-o-text-overflow: ellipsis; /* for Opera */
text-overflow: ellipsis; /* for IE */
```

基本通杀所有浏览器。

像`<a>`这类默认非块的元素，要加上 display:block 才有效果。

别忘了设置width或者max-width

### document.oncontextmenu事件

鼠标右击，BODY中用 `oncontextmenu='return false'` 来取消鼠标右键；

### document.write()

可以用在两个方面：页面载入过程中用实时脚本创建页面内容，以及用延时脚本创建本窗口或新窗口的内容。该方法需要一个字符串参数，它是写到窗口或框架中的HTML内容。这些字符串参数可以是变量或值为字符串的表达式，写入的内容常常包括HTML标记语言。

记住，在载入页面后，浏览器输出流自动关闭。在此之后，任何一个对当前页面进行操作的document.write()方法将打开—个新的输出流，它将清除当前页面内容(包括源文档的任何变量或值)。因此，假如希望用脚本生成的HTML替换当前页面，就必须把HTML内容连接起来赋给一个变量，使用一个document.write()方法完成写操作。不必清除文档并打开一个新数据流，一个document.write()调用就可完成所有的操作。

关于document.write()方法还有一点要说明的是它的相关方法document.close()。脚本向窗口（不管是本窗口或其他窗口）写完内容后，必须关闭输出流。在延时脚本的最后一个document.write()方法后面，必须确保含有document.close()方法，不这样做就不能显示图像和表单。并且，任何后面调用的document.write()方法只会把内容追加到页面后，而不会清除现有内容来写入新值。为了演示document.write()方法，我们提供了同一个应用程序的两个版本。一个向包含脚本的文档中写内容，另—个向一个单独的窗口写内容。请在文本编辑器中键入每个文档，以.html文件扩展名保存，并在浏览器中打开文档。

示例1创建一个按钮，它为文档组合新的HTML内容，包括新文档标题的HTML标记和标记的颜色属性。示例中有一个读者所不熟悉的操作符+＝，它把其右侧的字符串加到其左侧的变量中，这个变量用来存放字符串，这个操作符能很方便地把几个单独的语句组合成—个长字符串。使用组合在newContent变量中的内容，document.write()语句可以把所有新内容写到文档中，完全清除示例1中的内容。然后需要调用document.close()语句关闭输出流。当载入该文档并单击按钮时，可以注意到浏览器标题栏中的文档标题因此而改变。当回到原始文档并再次单击该按钮时，可以看到动态写入的第二个页面的载入速度甚至比重载原始文档还要快。

示例1 在当前窗口使用document.write()。

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title>Writing to Same Doc</title>
  <script language="JavaScript">
    function reWrite(){
      // assemble content for new window
      var newContent = "<html><head><title>A New Doc</title></head>"
      newContent += "<body bgcolor='aqua'><h1>This document is brand new.</h1>"
      newContent += "Click the Back button to see original document."
      newContent += "</body></html>"
      // write HTML to new window document
      document.write(newContent)
      document.close() // close layout stream
    }
  </script>
</head>
<body>
  <form>
    <input type="button" value="Replace Content" onClick="reWrite()">
  </form>
</body>
</html>
```

示例2中，情况有点复杂，因为脚本创建了一个子窗口，整个脚本生成的文档都将写入该窗口中。为了使新窗口的引用在两个函数中保持激活状态，我们将newWindow变量声明为全局变量。页面载入时，onLoad事件处理调用makeNewWindow()函数，该函数生成一个空的子窗口。另外，我们在window.open()方法的第三个参数中加入一个属性，使子窗口的状态栏可见。

页面上的按钮调用subWrite()方法，它执行的第一个任务是检查子窗口的closed属性。假如关闭了引用窗口，该属性（只在较新的浏览器版本中存在）返回true。如果是这种情况（假如用户手动关闭窗口），该函数再次调用makeNewWindow()函数来重新打开那个窗口。

窗口打开后，新的内容作为字符串变量组合在一起。与示例1一样，一次性写入内容（虽然对单独的窗口没有必要），接下来调用close()方法。但是注意一个重要的区别：write()和close()方法都明显地指定了子窗口。

示例2 在另一个窗口中使用document.write()

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title>Writing to Subwindow</title>
  <script language="JavaScript">
    var newWindow
    function makeNewWindow(){
      newWindow = window.open("","","status,height=200,width=300")
    }
    function subWrite(){
      // make new window if someone has closed it
      if(newWindow.closed){
        makeNewWindow()
      }
      // bring subwindow to front
      newWindow.focus()
      // assemble content for new window
      var newContent = "<html><head><title>A New Doc</title></head>"
      newContent += "<body bgcolor='coral'><h1>This document is brand new.</h1>"
      newContent += "</body></html>"
      // write HTML to new window document
      newWindow.document.write(newContent)
      newWindow.document.close()    // close layout stream
    }
  </script>
</head>
<body onLoad="makeNewWindow()">
  <form>
    <input type="button" value="Write to Subwindow" onClick="subWrite()">
  </form>
</body>
</html>
```

### 获取数组中的最大值和最小值的方法汇总

```js
// 方法一：
// 最小值
if (typeof Array.prototype[min] == 'undefined') {
  Array.prototype.min = function() {
    var min = this[0];
    var len = this.length;
    for (var i = 1; i < len; i++){
      if (this[i] < min){
        min = this[i];
      }
    }
    return min;
  }
}
//最大值
if (typeof Array.prototype['max'] == 'undefined') {
  Array.prototype.max = function() {
    var max = this[0];
    var len = this.length;
    for (var i = 1; i < len; i++){
      if (this[i] > max) {
        max = this[i];
      }
    }
    return max;
  }
}

/*
方法二：
用Math.max和Math.min方法可以迅速得到结果。apply能让一个方法指定调用对象与传入参数，并且传入参数是以数组形式组织的。恰恰现在有一个方法叫Math.max，调用对象为Math，与多个参数
*/
Array.max = function(array){
  return Math.max.apply(Math, array);
};
Array.min = function(array){
  return Math.min.apply(Math, array);
};
// Math对象也是一个对象，我们用对象的字面量来写，又可以省几个比特了，直接使用null也可以
Array.max = function(array){
  return Math.max.apply({}, array);
};
Array.min = function(array){
  return Math.min.apply({}, array);
};
```

### 跨域

1.什么是跨域

我们经常会在页面上使用ajax 请求访问其他服务器的数据，此时，客户端会出现跨域问题.跨域问题是由于javascript语言安全限制中的同源策略造成的。

简单来说，同源策略是指一段脚本只能读取来自同一来源的窗口和文档的属性，这里的同一来源指的是主机名、协议和端口号的组合。

例如：

| URL                                                         | 说明                           | 是否允许通信                           |
| ----------------------------------------------------------- | ------------------------------ | -------------------------------------- |
| `http://www.a.com/a.js`, `http://www.a.com/b.js`            | 同一域名下                     | 允许                                   |
| `http://www.a.com/lab/a.js`, `http://www.a.com/script/b.js` | 同一域名下不同文件夹           | 允许                                   |
| `http://www.a.com:8000/a.js`, `http://www.a.com/b.js`       | 同一域名，不同端口             | 不允许                                 |
| `http://www.a.com/a.js`, `https://www.a.com/b.js`           | 同一域名，不同协议             | 不允许                                 |
| `http://www.a.com/a.js`, `http://70.32.92.74/b.js`          | 域名和域名对应ip               | 不允许                                 |
| `http://www.a.com/a.js`, `http://script.a.com/b.js`         | 主域相同，子域不同             | 不允许                                 |
| `http://www.a.com/a.js`, `http://a.com/b.js`                | 同一域名，不同二级域名（同上） | 不允许（cookie这种情况下也不允许访问） |
| `http://www.cnblogs.com/a.js`, `http://www.a.com/b.js`      | 不同域名                       | 不允许                                 |

2.实现原理

ajax通过XMLHttpRequest进行数据交互，浏览器出于安全考虑，不允许js代码进行跨域操作。

一般jQuery解决跨域是通过jsonp的方式，添加callback=xxx，服务器返回xxx(...)

通过CORS（跨域资源共享） Proxy对请求进行转发，就可以实现跨域访问。服务器端对于CORS的支持，主要就是通过设置Access-Control-Allow-Origin来进行的

什么是JSONP

1、一个众所周知的问题，Ajax直接请求普通文件存在跨域无权限访问的问题，甭管你是静态页面、动态网页、web服务、WCF，只要是跨域请求，一律不准；

2、不过我们又发现，Web页面上调用js文件时则不受是否跨域的影响（不仅如此，我们还发现凡是拥有"src"这个属性的标签都拥有跨域的能力，比如`<script>`、`<img>`、`<iframe>`）；

3、于是可以判断，当前阶段如果想通过纯web端（ActiveX控件、服务端代理、属于未来的HTML5之Websocket等方式不算）跨域访问数据就只有一种可能，那就是在远程服务器上设法把数据装进js格式的文件里，供客户端调用和进一步处理；

4、恰巧我们已经知道有一种叫做JSON的纯字符数据格式可以简洁的描述复杂数据，更妙的是JSON还被js原生支持，所以在客户端几乎可以随心所欲的处理这种格式的数据；

5、这样子解决方案就呼之欲出了，web客户端通过与调用脚本一模一样的方式，来调用跨域服务器上动态生成的js格式文件（一般以JSON为后缀），显而易见，服务器之所以要动态生成JSON文件，目的就在于把客户端需要的数据装入进去。

6、客户端在对JSON文件调用成功之后，也就获得了自己所需的数据，剩下的就是按照自己需求进行处理和展现了，这种获取远程数据的方式看起来非常像AJAX，但其实并不一样。

7、为了便于客户端使用数据，逐渐形成了一种非正式传输协议，人们把它称作JSONP，该协议的一个要点就是允许用户传递一个callback 参数给服务端，然后服务端返回数据时会将这个callback参数作为函数名来包裹住JSON数据，这样客户端就可以随意定制自己的函数来自动处理返回数据了。

如果对于callback参数如何使用还有些模糊的话，我们后面会有具体的实例来讲解。

JSONP的客户端具体实现：

不管jQuery也好，ExtJs也罢，又或者是其他支持jsonp的框架，他们幕后所做的工作都是一样的，下面我来循序渐进的说明一下jsonp在客户端的实现：

1、我们知道，哪怕跨域js文件中的代码（当然指符合web脚本安全策略的），web页面也是可以无条件执行的。

远程服务器remoteserver.com根目录下有个remote.js文件代码如下：

```js
alert('我是远程文件');
```

本地服务器localserver.com下有个jsonp.html页面代码如下：

```html
<!DOCTYPE html
  PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title></title>
  <script type="text/javascript" src="http://remoteserver.com/remote.js"></script>
</head>
<body>
</body>
</html>
```

毫无疑问，页面将会弹出一个提示窗体，显示跨域调用成功。

2、现在我们在jsonp.html页面定义一个函数，然后在远程remote.js中传入数据进行调用。

jsonp.html页面代码如下：

```html
<!DOCTYPE html
  PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title></title>
  <script type="text/javascript">
    var localHandler = function (data) {
      alert('我是本地函数，可以被跨域的remote.js文件调用，远程js带来的数据是：' + data.result);
    };
  </script>
  <script type="text/javascript" src="http://remoteserver.com/remote.js"></script>
</head>
<body>
</body>
</html>
```

remote.js文件代码如下：

```js
localHandler({"result":"我是远程js带来的数据"});
```

这里对返回的数据有个要求，即：服务器返回的数据不能是单纯的JSON。如果返回的是个json字符串，我们是没有办法引用这个字符串的，必须将它赋值给一个变量或者直接调用客户端JS方法。

运行之后查看结果，页面成功弹出提示窗口，显示本地函数被跨域的远程js调用成功，并且还接收到了远程js带来的数据。很欣喜，跨域远程获取数据的目的基本实现了，但是又一个问题出现了，我怎么让远程js知道它应该调用的本地函数叫什么名字呢？毕竟是jsonp的服务者都要面对很多服务对象，而这些服务对象各自的本地函数都不相同啊？我们接着往下看。

3、聪明的开发者很容易想到，只要服务端提供的js脚本是动态生成的就行了呗，这样调用者可以传一个参数过去告诉服务端“我想要一段调用XXX函数的js代码，请你返回给我”，于是服务器就可以按照客户端的需求来生成js脚本并响应了。

看jsonp.html页面的代码：

```html
<!DOCTYPE html
  PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title></title>
  <script type="text/javascript">
    // 得到航班信息查询结果后的回调函数
    var flightHandler = function (data) {
      alert('你查询的航班结果是：票价 ' + data.price + ' 元，' + '余票 ' + data.tickets + ' 张。');
    };
    // 提供jsonp服务的url地址（不管是什么类型的地址，最终生成的返回值都是一段javascript代码）
    var url = "http://flightQuery.com/jsonp/flightResult.aspx?code=CA1998&callback=flightHandler";
    // 创建script标签，设置其属性
    var script = document.createElement('script');
    script.setAttribute('src', url);
    // 把script标签加入head，此时调用开始
    document.getElementsByTagName('head')[0].appendChild(script);
  </script>
</head>
<body>
</body>
</html>
```

这次的代码变化比较大，不再直接把远程js文件写死，而是编码实现动态查询，而这也正是jsonp客户端实现的核心部分，本例中的重点也就在于如何完成jsonp调用的全过程。

我们看到调用的url中传递了一个code参数，告诉服务器我要查的是CA1998次航班的信息，而callback参数则告诉服务器，我的本地回调函数叫做flightHandler，所以请把查询结果传入这个函数中进行调用。

OK，服务器很聪明，这个叫做flightResult.aspx的页面生成了一段这样的代码提供给jsonp.html（服务端的实现这里就不演示了，与你选用的语言无关，说到底就是拼接字符串）：

```js
flightHandler({
  "code": "CA1998",
  "price": 1780,
  "tickets": 5
});
```

我们看到，传递给flightHandler函数的是一个json，它描述了航班的基本信息。运行一下页面，成功弹出提示窗口，jsonp的执行全过程顺利完成！

4、到这里为止的话，相信你已经能够理解jsonp的客户端实现原理了吧？剩下的就是如何把代码封装一下，以便于与用户界面交互，从而实现多次和重复调用。

什么？你用的是jQuery，想知道jQuery如何实现jsonp调用？好吧，那我就好人做到底，再给你一段jQuery使用jsonp的代码（我们依然沿用上面那个航班信息查询的例子，假定返回jsonp结果不变）：

```html
<!DOCTYPE html
  PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <title>Untitled Page</title>
  <script type="text/javascript" src=jquery.min.js"></script>
  <script type="text/javascript">
    jQuery(document).ready(function () {
      $.ajax({
        type: "get",
        async: false,
        url: "http://flightQuery.com/jsonp/flightResult.aspx?code=CA1998",
        dataType: "jsonp",
        jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
        jsonpCallback: "flightHandler",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以写"?"，jQuery会自动为你处理数据
        success: function (json) {
          alert('您查询到航班信息：票价： ' + json.price + ' 元，余票： ' + json.tickets + ' 张。');
        },
        error: function () {
          alert('fail');
        }
      });
    });
  </script>
</head>
<body>
</body>
</html>
```

通过jquery的jsonp的方式。使用此方式，对服务器端有要求。

服务器端如下:

```C#
protected void Page_Load(object sender, EventArgs e)
{
    string callback = Request.QueryString["jsoncallback"];
    string result = callback + "({\"name\":\"zhangsan\",\"date\":\"2012-12-03\"})";
    Response.Clear();
    Response.Write(result);
    Response.End();
}
```

是不是有点奇怪？为什么我这次没有写flightHandler这个函数呢？而且竟然也运行成功了！哈哈，这就是jQuery的功劳 了，jquery在处理jsonp类型的ajax时（还是忍不住吐槽，虽然jquery也把jsonp归入了ajax，但其实它们真的不是一回事儿），自动帮你生成回调函数并把数据取出来供success属性方法来调用，是不是很爽呀？

好啦，写到这里，我已经无力再写下去，又困又累，得赶紧睡觉。朋友们要是看这不错，觉得有启发，给点个“推荐”呗！由于实在比较简单，所以就不再提供demo源码下载了。

没想到上了博客园的头条推荐。看到大家对这篇文章的认可和评论，还是很开心的，这里针对ajax与jsonp的异同再做一些补充说明：

1、ajax和jsonp这两种技术在调用方式上“看起来”很像，目的也一样，都是请求一个url，然后把服务器返回的数据进行处理，因此jquery和ext等框架都把jsonp作为ajax的一种形式进行了封装；

2、但ajax和jsonp其实本质上是不同的东西。ajax的核心是通过XmlHttpRequest获取非本页内容，而jsonp的核心则是动态添加`<script>`标签来调用服务器提供的js脚本。

3、所以说，其实ajax与jsonp的区别不在于是否跨域，ajax通过服务端代理一样可以实现跨域，jsonp本身也不排斥同域的数据的获取。

4、还有就是，jsonp是一种方式或者说非强制性协议，如同ajax一样，它也不一定非要用json格式来传递数据，如果你愿意，字符串都行，只不过这样不利于用jsonp提供公开服务。

总而言之，jsonp不是ajax的一个特例，哪怕jquery等巨头把jsonp封装进了ajax，也不能改变这一点！
说道这里很多人还不明白后台如何处理数据，这里稍微的说一下：

拿php来说吧 比如 $items_list 是一个数组

```php
$items_list=json_encode($items_list);
$callback=$_GET['callback'];
echo $callback."($items_list)";
exit;
```

服务端对于CORS的支持，主要通过设置Access-Control-Allow_Origin来进行

[http://www.phonegap100.com/portal.php?mod=view&aid=72](http://www.phonegap100.com/portal.php?mod=view&aid=72)

[http://www.cnblogs.com/oneword/archive/2012/12/03/2799443.html](http://www.cnblogs.com/oneword/archive/2012/12/03/2799443.html)

### 正则表达式

```js
MatchCollection collection = Regex.Matches(html, "<(a|link|img|script|input|form).[^>]*(href|src|action)=(\\\"|'|)(.[^\\\"']*)(\\\"|'|)[^>]*>", RegexOptions.IgnoreCase);

foreach (Match match in collection) {
  if (match.Groups[match.Groups.Count - 2].Value.IndexOf("~") != -1) {
    string url = this.Page.ResolveUrl(match.Groups[match.Groups.Count - 2].Value);
    html = html.Replace(match.Groups[match.Groups.Count - 2].Value, url);
  }
}
```

### HTML-embed标签详解

一、基本语法：embed src=url

说明：embed可以用来插入各种多媒体，格式可以是 Midi、Wav、AIFF、AU、MP3等等，
      Netscape及新版的IE 都支持。url为音频或视频文件及其路径，可以是相对路径或绝对路径。

示例：

```html
<embed src="your.mid">
```

二、属性设置：

1、自动播放：

语法：autostart=true、false

说明：该属性规定音频或视频文件是否在下载完之后就自动播放。

- true：音乐文件在下载完之后自动播放；
- false：音乐文件在下载完之后不自动播放。

示例：

```html
<embed src="your.mid" autostart=true>
<embed src="your.mid" autostart=false>
```

2、循环播放：

语法：loop=正整数、true、false

说明：该属性规定音频或视频文件是否循环及循环次数。

属性值为正整数值时，音频或视频文件的循环次数与正整数值相同；

- 属性值为true时，音频或视频文件循环；
- 属性值为false时，音频或视频文件不循环。

示例：

```html
<embed src="your.mid" autostart=true loop=2>
<embed src="your.mid" autostart=true loop=true>
<embed src="your.mid" autostart=true loop=false>
```

3、面板显示：

语法：hidden=ture、no

说明：该属性规定控制面板是否显示，默认值为no。

- ture：隐藏面板；
- no：显示面板。

示例：

```html
<embed src="your.mid" hidden=ture>
<embed src="your.mid" hidden=no>
```

4、开始时间：

语法：starttime=mm:ss（分：秒）

说明：该属性规定音频或视频文件开始播放的时间。未定义则从文件开头播放。

示例：

```html
<embed src="your.mid" starttime="00:10">
```

5、音量大小：

语法：volume=0-100之间的整数

说明：该属性规定音频或视频文件的音量大小。未定义则使用系统本身的设定。

示例：

```html
<embed src="your.mid" volume="10">
```

6、容器属性：

语法：height=# width=#

说明：取值为正整数或百分数，单位为像素。该属性规定控制面板的高度和宽度。

- height：控制面板的高度；
- width：控制面板的宽度。

示例：

```html
<embed src="your.mid" height=200 width=200>
```

7、容器单位：

语法：units=pixels、en

说明：该属性指定高和宽的单位为pixels或en。

示例：

```html
<embed src="your.mid" units="pixels" height=200 width=200>
<embed src="your.mid" units="en" height=200 width=200>
```

8、外观设置：

语法：controls=console、smallconsole、playbutton、pausebutton、stopbutton、
      volumelever 说明：该属性规定控制面板的外观。默认值是console。

- console：一般正常面板；
- smallconsole：较小的面板；
- playbutton：只显示播放按钮；
- pausebutton：只显示暂停按钮；
- stopbutton：只显示停止按钮；
- volumelever：只显示音量调节按钮。

示例：

```html
<embed src="your.mid" controls=smallconsole>
<embed src="your.mid" controls=volumelever>
```

9、对象名称：

语法：name=#

说明：#为对象的名称。该属性给对象取名，以便其他对象利用。

示例：

```html
<embed src="your.mid" >
```

10、说明文字：

语法：title=#

说明：#为说明的文字。该属性规定音频或视频文件的说明文字。

示例：

```html
<embed src="your.mid" title="第一首歌">
```

11、前景色和背景色：

语法：palette=color|color

说明：该属性表示嵌入的音频或视频文件的前景色和背景色，第一个值为前景色，第二个值为背景
      色，中间用 | 隔开。color可以是RGB色（RRGGBB）也可以是颜色名，还可以是transparent
     （透明）。 示例：<embed src="your.mid" palette="red|black">

12、对齐方式：

语法：align=top、bottom、center、baseline、 left、right、texttop、middle、
      absmiddle、absbottom

说明：该属性规定控制面板和当前行中的对象的对齐方式。

- center：控制面板居中；
- left：控制面板居左；
- right：控制面板居右；
- top：控制面板的顶部与当前行中的最高对象的顶部对齐；
- bottom：控制面板的底部与当前行中的对象的基线对齐；
- baseline：控制面板的底部与文本的基线对齐；
- texttop：控制面板的顶部与当前行中的最高的文字顶部对齐；
- middle：控制面板的中间与当前行的基线对齐；
- absmiddle：控制面板的中间与当前文本或对象的中间对齐；
- absbottom：控制面板的底部与文字的底部对齐。

示例：

```html
<embed src="your.mid" align=top>
<embed src="your.mid" align=center>
```
