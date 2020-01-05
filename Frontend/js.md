# javascript

## 目录

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