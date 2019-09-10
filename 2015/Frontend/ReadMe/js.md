# javascript

## 目录

1. [总结](#总结)
   - [DOM](#DOM)
     - [frame](#frame)
   - [异步](#异步)
   - [跨域](#跨域)

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

## 异步

JavaScript是单线程执行的，无法同时执行多段代码。当某一段代码正在执行的时候，所有后续的任务都必须等待，形成一个队列。一旦当前任务执行完毕，再从队列中取出下一个任务，这也常被称为 “阻塞式执行”。

所以一次鼠标点击，或是计时器到达时间点，或是Ajax请求完成触发了回调函数，这些事件处理程序或回调函数都不会立即运行，而是立即排队，一旦线程有空闲就执行。

假如当前 JavaScript线程正在执行一段很耗时的代码，此时发生了一次鼠标点击，那么事件处理程序就被阻塞，用户也无法立即看到反馈，事件处理程序会被放入任务队列，直到前面的代码结束以后才会开始执行。

如果代码中设定了一个 setTimeout，那么浏览器便会在合适的时间，将代码插入任务队列，如果这个时间设为 0，就代表立即插入队列，但不是立即执行，仍然要等待前面代码执行完毕。所以 setTimeout 并不能保证执行的时间，是否及时执行取决于 JavaScript 线程是拥挤还是空闲。

## 总结

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

## 跨域

我们经常会在页面上使用ajax 请求访问其他服务器的数据，此时，客户端会出现跨域问题.跨域问题是由于javascript语言安全限制中的同源策略造成的。

ajax通过XMLHttpRequest进行数据交互，浏览器出于安全考虑，不允许js代码进行跨域操作。

一般jQuery解决跨域是通过jsonp的方式，添加callback=xxx，服务器返回xxx(...)

服务端对于CORS的支持，主要通过设置Access-Control-Allow_Origin来进行

[http://www.phonegap100.com/portal.php?mod=view&aid=72](http://www.phonegap100.com/portal.php?mod=view&aid=72)

[http://www.cnblogs.com/oneword/archive/2012/12/03/2799443.html](http://www.cnblogs.com/oneword/archive/2012/12/03/2799443.html)

Jsonp实现跨域

```js
$.ajax({
  type: "get",
  async: false,
  url: "http://www.57lehuo.com/index.php?a=index&m=api&method=itemsSearchGet&keyword=连衣裙&sign=5cb85c3eed22c1908e05c584813c8dd2",
  dataType: "jsonp",
  jsonp: "callback",//传递给请求处理程序或页面的，用以获得 jsonp 回调函数名的参数名（一般默认为:callback）
  jsonpCallback: "itemsSearchGet",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以写"?"，jQuery会自动为你处理数据
  success: function(json){
    alert(json['result'][0].title);
  },
  error: function(){
    alert('fail');
  }
})
```
