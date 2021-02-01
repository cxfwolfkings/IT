# node

1. 简介
   - [安装](#安装)
   - [常用命令](#常用命令)
   - [安装模块](#安装模块)
   - [入门示例](#入门示例)
   - [回调函数](#回调函数)
   - 数据类型
     - [Buffer](#Buffer（缓冲区）)
     - [Stream](#Stream（流）)
   - [模块系统](#模块系统)
   - [函数](#函数)
   - [路由](#路由)
   - [全局对象](#全局对象)
     - [__filename](#__filename)
     - [__dirname](#__dirname)
     - [process](#process)
   - [常用工具](#常用工具)
   
2. [参考](#参考)



## 简介

简单的说 Node.js 就是运行在服务端的 JavaScript。Node.js 是一个基于Chrome JavaScript 运行时建立的一个平台。Node.js是一个事件驱动I/O服务端JavaScript环境，基于Google的V8引擎，V8引擎执行Javascript的速度非常快，性能非常好。

在 Node.js 出现之前，前端开发领域有很多事情我们是做不到的，比如：JS 代码的合并、压缩、混淆， CSS 预处理，前端自动化测试。而这一切在 Node.js 出现之后都得到了很好的解决，对 JS 代码的预处理经历了 Grunt、Gulp 的短暂辉煌之后，终于在 Webpack 这里形成了事实标准的局面；CSS 的预处理也从 LESS 发展到了 SASS 等；自动化测试一直是前端开发中的一个巨大痛点，由于前端在运行时严重依赖浏览器环境，导致我们一直无法像测试后端代码那样可以去编写测试用例。在有了 Node.js 之后，我们终于有了 Karma + Jasmine 这样的单元测试组合，也有了基于 WebDriverJS 这样的可以和浏览器进行通讯的集成测试神器。

就前端开发目前整体的状态来说，无论你使用什么框架，Node.js、Webpack、SASS、Karma + Jasmine、WebDriverJS 这个组合是无论如何绕不过去的。

Node.js特点：

1. 每个Node.js进程**只有一个主线程**在执行程序代码。
2. 当用户的网络请求或者其它的异步操作到来时，Node.js都会把它放到“事件队列”之中，并**不会立即执行它**，代码就不会被阻塞，主线程继续往下走，直到主线程代码执行完毕。
3. 当主线程代码执行完毕完成后，通过事件循环机制，从“事件队列”的开头取出一个事件，从线程池中分配一个线程去执行这个事件，接下来继续取出第二个事件，再从线程池中分配一个线程去执行，一直执行到事件队列的尾部。期间主线程不断的检查事件队列中是否有未执行的事件，直到事件队列中所有事件都执行完，此后每当有新的事件加入到事件队列中，都会通知主线程按顺序取出交代码循环处理。当有事件执行完毕后，会通知主线程，主线程执行回调，线程归还给线程池。

我们所看到的Node.js单线程只是一个js主线程，本质上的异步操作还是由线程池完成的，Node.js将所有的阻塞操作都交给了内部的线程池去实现，本身只负责不断的往返调度，并没有进行真正的I/O操作，从而实现异步非阻塞I/O，这便是Node.js单线程和事件驱动的精髓之处了。

Node.js官方是说不需要锁，但是不需要锁，不代表可以乱来，**不需要锁的是代码function，而不是资源！**这点要分清楚。

参考：

- https://blog.csdn.net/xllily_11/article/details/84303153



## 实战



### 安装

**windows**

直接使用安装程序

**Linux**

1、使用已编译好的包

```sh
wget https://nodejs.org/dist/v10.9.0/node-v10.9.0-linux-x64.tar.xz #下载
tar xf  node-v10.9.0-linux-x64.tar.xz #解压
cd node-v10.9.0-linux-x64/ #进入解压目录
./bin/node -v #执行node命令查看版本
```

解压文件的 bin 目录底下包含了 node、npm 等命令，使用 `ln` 命令来设置软连接：

```sh
ln -s /usr/software/nodejs/bin/npm   /usr/local/bin/
ln -s /usr/software/nodejs/bin/node   /usr/local/bin/
```

强烈建议使用nvm(Node Version Manager) ，nvm是 Nodejs 版本管理器，它让我们方便的对切换Nodejs 版本。

nvm 介绍：[使用 nvm 管理不同版本的 node 与 npm](https://www.runoob.com/w3cnote/nvm-manager-node-versions.html)

关于nvm的详细安装以及使用可以访问以下链接：

- Linux: [https://github.com/creationix/nvm](https://github.com/creationix/nvm)
- Windows: [https://github.com/coreybutler/nvm-windows](https://github.com/coreybutler/nvm-windows)



### 常用命令

```sh
# 使用版本
node -v
# 执行js文件，在终端输出结果
node helloworld.js
```

打开终端，键入 `node` 进入命令交互模式，可以输入一条代码语句后立即执行并显示结果。

## 安装模块

![x](./Resource/72.png)

```sh
npm install express
npm install jade
npm install moment
npm install mongoose
npm install bower -g
bower install bootstrap
```

## 入门示例

```js
// 使用 require 指令来载入 http 模块
var http = require('http');
// 创建服务器
http.createServer(function (req, res) {
  // 发送 HTTP 头部
  // HTTP 状态值: 200 : OK
  // 内容类型: text/plain
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  // 发送响应数据 "Hello World"
  res.end('Hello World\n');
}).listen(1337, '127.0.0.1');
// 终端打印如下信息
console.log('Server running at http://127.0.0.1:1337/');
```

## 回调函数

Node.js 异步编程的直接体现就是回调：

- 异步编程依托于回调来实现，但不能说使用了回调后程序就异步化了
- 回调函数在完成任务后就会被调用，Node 使用了大量的回调函数，Node 所有 API 都支持回调函数

例如，我们可以一边读取文件，一边执行其他命令，在文件读取完成后，我们将文件内容作为回调函数的参数返回。这样在执行代码时就没有阻塞或等待文件 I/O 操作。这就大大提高了 Node.js 的性能，可以处理大量的并发请求。

回调函数一般作为函数的最后一个参数出现：

```js
function foo1(name, age, callback) { }
function foo2(value, callback1, callback2) { }
```

### 阻塞代码实例

1、创建一个文件 input.txt ，内容如下：`Hello World`

2、创建 main.js 文件, 代码如下：

```js
var fs = require("fs");
var data = fs.readFileSync('input.txt');
console.log(data.toString());
console.log("程序执行结束!");
```

3、执行代码：`node main.js`

结果如下：

```sh
Hello World
程序执行结束!
```

### 非阻塞代码实例

```js
var fs = require("fs");

fs.readFile('input.txt', function (err, data) {
    if (err) return console.error(err);
    console.log(data.toString());
});

console.log("程序执行结束!");
```

执行结果如下：

```sh
程序执行结束!
Hello World
```

以上两个实例我们了解了阻塞与非阻塞调用的不同：

- 第一个实例在文件读取完后才执行完程序。
- 第二个实例我们不需要等待文件读取完，这样就可以在读取文件时同时执行接下来的代码，大大提高了程序的性能。

因此，阻塞是按顺序执行的，而非阻塞是不需要按顺序的，所以如果需要处理回调函数的参数，我们就需要写在回调函数内。

阻塞和非阻塞，同步和异步是node.js里经常遇到的词汇，我举个简单的例子来说明：

>我要看足球比赛，但是妈妈叫我烧水，电视机在客厅，烧水要在厨房。家里有2个水壶，一个是普通的水壶，另一个是水开了会叫的那种水壶。我可以：
>
>1、用普通的水壶烧，人在边上看着，水开了再去看球。（同步，阻塞）这个是常规做法，但是我看球不爽了。  
>2、用普通水壶烧，人去看球，隔几分钟去厨房看看。（同步，非阻塞）这有个大问题，万一在我离开的几分钟水开了，我就麻烦了。  
>3、用会叫的水壶，人在边上看着。（异步，阻塞）这个没有问题，但是我太傻了。  
>4、用会叫的水壶，人去看球，听见水壶叫了再去看。（异步，非阻塞）这个应该是最好的。
>
>等着看球的我：<b style="color:red">阻塞</b>  
>看着电视的我：<b style="color:red">非阻塞</b>  
>普通水壶：<b style="color:red">同步</b>  
>会叫的水壶：<b style="color:red">异步</b>
>
>所以，异步往往配合非阻塞，才能发挥出威力。
>
><b style="color:green">同步</b>：同步就是你要做的事你列了一个清单，按照清单上的顺序 一个一个执行  
><b style="color:green">异步</b>：就是可以同时干好几件事  
><b style="color:green">阻塞</b>：就是按照清单上的顺序一件一件的往下走，当一件事没有做完，下面的事都干不了  
><b style="color:green">非阻塞</b>：就是这件事没有干完，后面的事不会等你这件事干完了再干，而是直接开始干下一件事，等你这件事干完了，后面的事也干完了，这样就大大提高了效率
>
>A "callback" is any function that is called by another function which takes the first function as a parameter. （在一个函数中调用另外一个函数就是callback）

基于新版本 ES 的语法糖，Node 的异步操作可以替换成以下两种写法。

**1、Promise:**

```js
const _submit = (payload, formid, destination) => {
  return new Promise((resolve, reject) => { // 返回一个Promise对象，实现异步回调
    app.requestPost(destination, {
      payload,
      formid: formid
    }, true).then((res) => { // 调用一个异步函数，使用then方法对接成功回调
      if (res) {
        resolve(); // call成功回调
      } else {
        reject(); // call失败回调
      }
    }).catch(() => { // 调用一个异步函数，使用catch方法对接失败回调
      reject();
    })
  });
}
```

**2、async/await:**

```js
async function query(collection, querySelector, queryOptions) {
  let db, data;
  try {
    db = await MongoClient.connect(_dburl); // 使用await标记上游异步函数，此时event loop会将与该变量有关的操作阻塞
    data = await db.db(DBNAME).collection(collection).find(querySelector, queryOptions || {}).toArray();
  } catch (e) {
    log(e.message, 2);
  }
  return data;
}
```

## Buffer（缓冲区）

JavaScript 语言自身只有字符串数据类型，没有二进制数据类型。但在处理像TCP流或文件流时，必须使用到二进制数据。因此在 Node.js中，定义了一个 Buffer 类，该类用来创建一个专门存放二进制数据的缓存区。

在 Node.js 中，Buffer 类是随 Node 内核一起发布的核心库。Buffer 库为 Node.js 带来了一种存储原始数据的方法，可以让 Node.js 处理二进制数据，每当需要在 Node.js 中处理 I/O 操作中移动的数据时，就有可能使用 Buffer 库。原始数据存储在 Buffer 类的实例中。一个 Buffer 类似于一个整数数组，但它对应于 V8 堆内存之外的一块原始内存。

在 v6.0 之前创建 Buffer 对象直接使用 `new Buffer()` 构造函数来创建对象实例，但是 Buffer 对内存的权限操作相比很大，可以直接捕获一些敏感信息，所以在 v6.0 以后，官方文档里面建议使用 `Buffer.from()` 接口去创建 Buffer 对象。

### Buffer 与字符编码

Buffer 实例一般用于表示编码字符的序列，比如 UTF-8 、 UCS2 、 Base64 、或十六进制编码的数据。 通过使用显式的字符编码，就可以在 Buffer 实例与普通的 JavaScript 字符串之间进行相互转换。

```js
const buf = Buffer.from('runoob', 'ascii');
// 输出 72756e6f6f62
console.log(buf.toString('hex'));
// 输出 cnVub29i
console.log(buf.toString('base64'));
```

Node.js 目前支持的字符编码包括：

- **ascii** - 仅支持 7 位 ASCII 数据。如果设置去掉高位的话，这种编码是非常快的。
- **utf8** - 多字节编码的 Unicode 字符。许多网页和其他文档格式都使用 UTF-8 。
- **utf16le** - 2 或 4 个字节，小字节序编码的 Unicode 字符。支持代理对（U+10000 至 U+10FFFF）。
- **ucs2** - utf16le 的别名。
- **base64** - Base64 编码。
- **latin1** - 一种把 Buffer 编码成一字节编码的字符串的方式。
- **binary** - latin1 的别名。
- **hex** - 将每个字节编码为两个十六进制字符。

### 创建 Buffer 类

Buffer 提供了以下 API 来创建 Buffer 类：

- `Buffer.alloc(size[, fill[, encoding]])`：返回一个指定大小的 Buffer 实例，如果没有设置 fill，则默认填满 0
- `Buffer.allocUnsafe(size)`：返回一个指定大小的 Buffer 实例，但是它不会被初始化，所以它可能包含敏感的数据
- `Buffer.allocUnsafeSlow(size)`
- `Buffer.from(array)`：返回一个被 array 的值初始化的新的 Buffer 实例（传入的 array 的元素只能是数字，不然就会自动被 0 覆盖）
- `Buffer.from(arrayBuffer[, byteOffset[, length]])`：返回一个新建的与给定的 ArrayBuffer 共享同一内存的 Buffer。
- `Buffer.from(buffer)`：复制传入的 Buffer 实例的数据，并返回一个新的 Buffer 实例
- `Buffer.from(string[, encoding])`：返回一个被 string 的值初始化的新的 Buffer 实例

```js
// 创建一个长度为 10、且用 0 填充的 Buffer。
const buf1 = Buffer.alloc(10);
// 创建一个长度为 10、且用 0x1 填充的 Buffer。
const buf2 = Buffer.alloc(10, 1);
// 创建一个长度为 10、且未初始化的 Buffer。
// 这个方法比调用 Buffer.alloc() 更快，
// 但返回的 Buffer 实例可能包含旧数据，
// 因此需要使用 fill() 或 write() 重写。
const buf3 = Buffer.allocUnsafe(10);
// 创建一个包含 [0x1, 0x2, 0x3] 的 Buffer。
const buf4 = Buffer.from([1, 2, 3]);
// 创建一个包含 UTF-8 字节 [0x74, 0xc3, 0xa9, 0x73, 0x74] 的 Buffer。
const buf5 = Buffer.from('tést');
// 创建一个包含 Latin-1 字节 [0x74, 0xe9, 0x73, 0x74] 的 Buffer。
const buf6 = Buffer.from('tést', 'latin1');
```

### 写入缓冲区

**语法：**

写入 Node 缓冲区的语法如下所示：

```js
buf.write(string[, offset[, length]][, encoding])
```

**参数：**

参数描述如下：

- string - 写入缓冲区的字符串。
- offset - 缓冲区开始写入的索引值，默认为 0 。
- length - 写入的字节数，默认为 buffer.length
- encoding - 使用的编码。默认为 'utf8' 。

根据 encoding 的字符编码写入 string 到 buf 中的 offset 位置。length 参数是写入的字节数。如果 buf 没有足够的空间保存整个字符串，则只会写入 string 的一部分。只部分解码的字符不会被写入。

**返回值：**

返回实际写入的大小。如果 buffer 空间不足，则只会写入部分字符串。实例：

```js
buf = Buffer.alloc(256);
len = buf.write("www.runoob.com");

console.log("写入字节数 : "+  len);
```

执行以上代码，输出结果为：

```sh
node main.js
写入字节数 : 14
```

### 从缓冲区读取数据

**语法：**

```js
buf.toString([encoding[, start[, end]]])
```

**参数：**

- encoding - 使用的编码。默认为 'utf8' 。
- start - 指定开始读取的索引位置，默认为 0。
- end - 结束位置，默认为缓冲区的末尾。

**返回值：**

解码缓冲区数据并使用指定的编码返回字符串。

**实例：**

```js
buf = Buffer.alloc(26);
for (var i = 0 ; i < 26 ; i++) {
  buf[i] = i + 97;
}

console.log(buf.toString('ascii'));       // 输出: abcdefghijklmnopqrstuvwxyz
console.log(buf.toString('ascii',0,5));   // 输出: abcde
console.log(buf.toString('utf8',0,5));    // 输出: abcde
console.log(buf.toString(undefined,0,5)); // 使用 'utf8' 编码, 并输出: abcde
```

执行以上代码，输出结果为：

```sh
node main.js
abcdefghijklmnopqrstuvwxyz
abcde
abcde
abcde
```

### 将 Buffer 转换为 JSON 对象

```js
var buf = Buffer.from('www.runoob.com');
var json = buf.toJSON(buf);

console.log(json);
```

执行以上代码，输出结果为：

```sh
{
   type: 'Buffer',
   data: [ 119, 119, 119, 46, 114, 117, 110, 111, 111, 98, 46, 99, 111, 109 ]
}
```

### 缓冲区合并

```js
var buffer1 = Buffer.from(('菜鸟教程'));
var buffer2 = Buffer.from(('www.runoob.com'));
var buffer3 = Buffer.concat([buffer1,buffer2]);
console.log("buffer3 内容: " + buffer3.toString());
```

执行以上代码，输出结果为：

```sh
buffer3 内容: 菜鸟教程 www.runoob.com
```

### 缓冲区比较

```js
var buffer1 = Buffer.from('ABC');
var buffer2 = Buffer.from('ABCD');
var result = buffer1.compare(buffer2);

if(result < 0) {
   console.log(buffer1 + " 在 " + buffer2 + "之前");
}else if(result == 0){
   console.log(buffer1 + " 与 " + buffer2 + "相同");
}else {
   console.log(buffer1 + " 在 " + buffer2 + "之后");
}
```

执行以上代码，输出结果为：

```sh
ABC在ABCD之前
```

### 拷贝缓冲区

```js
var buf1 = Buffer.from('abcdefghijkl');
var buf2 = Buffer.from('RUNOOB');

//将 buf2 插入到 buf1 指定位置上
buf2.copy(buf1, 2);

console.log(buf1.toString());
```

执行以上代码，输出结果为：

```sh
abRUNOOBijkl
```

### 缓冲区裁剪

```js
var buffer1 = Buffer.from('runoob');
// 剪切缓冲区
var buffer2 = buffer1.slice(0,2);
console.log("buffer2 content: " + buffer2.toString());
```

执行以上代码，输出结果为：

```sh
buffer2 content: ru
```

### 缓冲区长度

**语法：**

```js
buf.length;
```

## Stream（流）

Stream 是一个抽象接口，Node 中有很多对象实现了这个接口。例如，对http 服务器发起请求的request 对象就是一个 Stream，还有stdout（标准输出）。

Node.js，Stream 有四种流类型：

- Readable - 可读操作。
- Writable - 可写操作。
- Duplex - 可读可写操作.
- Transform - 操作被写入数据，然后读出结果。

所有的 Stream 对象都是 EventEmitter 的实例。常用的事件有：

- data - 当有数据可读时触发。
- end - 没有更多的数据可读时触发。
- error - 在接收和写入过程中发生错误时触发。
- finish - 所有数据已被写入到底层系统时触发。

### 从流中读取数据

1、创建 input.txt 文件，内容如下：`菜鸟教程官网地址：www.runoob.com`

2、创建 main.js 文件, 代码如下：

```js
var fs = require("fs");
var data = '';

// 创建可读流
var readerStream = fs.createReadStream('input.txt');

// 设置编码为 utf8。
readerStream.setEncoding('UTF8');

// 处理流事件 --> data, end, and error
readerStream.on('data', function(chunk) {
   data += chunk;
});

readerStream.on('end',function(){
   console.log(data);
});

readerStream.on('error', function(err){
   console.log(err.stack);
});

console.log("程序执行完毕");
```

3、以上代码执行结果如下：

```sh
程序执行完毕
菜鸟教程官网地址：www.runoob.com
```

### 写入流

创建 main.js 文件, 代码如下：

```js
var fs = require("fs");
var data = '菜鸟教程官网地址：www.runoob.com';

// 创建一个可以写入的流，写入到文件 output.txt 中
var writerStream = fs.createWriteStream('output.txt');

// 使用 utf8 编码写入数据
writerStream.write(data,'UTF8');

// 标记文件末尾
writerStream.end();

// 处理流事件 --> data, end, and error
writerStream.on('finish', function() {
    console.log("写入完成。");
});

writerStream.on('error', function(err){
   console.log(err.stack);
});

console.log("程序执行完毕");
```

以上程序会将 data 变量的数据写入到 output.txt 文件中。代码执行结果如下：

```sh
node main.js
程序执行完毕
写入完成。
```

查看 output.txt 文件的内容：

```sh
cat output.txt
菜鸟教程官网地址：www.runoob.com
```

### 管道流

管道提供了一个输出流到输入流的机制。通常我们用于从一个流中获取数据并将数据传递到另外一个流中。

我们把文件比作装水的桶，而水就是文件里的内容，我们用一根管子(pipe)连接两个桶使得水从一个桶流入另一个桶，这样就慢慢的实现了大文件的复制过程。

以下实例我们通过读取一个文件内容并将内容写入到另外一个文件中。

1、设置 input.txt 文件内容如下：`菜鸟教程官网地址：www.runoob.com`

2、创建 main.js 文件，代码如下：

```js
var fs = require("fs");

// 创建一个可读流
var readerStream = fs.createReadStream('input.txt');

// 创建一个可写流
var writerStream = fs.createWriteStream('output.txt');

// 管道读写操作
// 读取 input.txt 文件内容，并将内容写入到 output.txt 文件中
readerStream.pipe(writerStream);

console.log("程序执行完毕");
```

代码执行结果如下：

```sh
node main.js
程序执行完毕
```

查看 output.txt 文件的内容：

```sh
cat output.txt
菜鸟教程官网地址：www.runoob.com
```

### 链式流

链式是通过连接输出流到另外一个流并创建多个流操作链的机制。链式流一般用于管道操作。

接下来我们就是用管道和链式来压缩和解压文件。

创建 compress.js 文件，代码如下：

```js
var fs = require("fs");
var zlib = require('zlib');

// 压缩 input.txt 文件为 input.txt.gz
fs.createReadStream('input.txt')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('input.txt.gz'));
  
console.log("文件压缩完成。");
```

代码执行结果如下：

```sh
node compress.js
--
文件压缩完成。
```

执行完以上操作后，我们可以看到当前目录下生成了 input.txt 的压缩文件 input.txt.gz。

接下来，让我们来解压该文件，创建 decompress.js 文件，代码如下：

```js
var fs = require("fs");
var zlib = require('zlib');

// 解压 input.txt.gz 文件为 input.txt
fs.createReadStream('input.txt.gz')
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream('input.txt'));
  
console.log("文件解压完成。");
```

代码执行结果如下：

```sh
node decompress.js
--
文件解压完成。
```

## 模块系统

为了让 Node.js 的文件可以相互调用，Node.js提供了一个简单的模块系统。

模块是Node.js 应用程序的基本组成部分，文件和模块是一一对应的。换言之，一个 Node.js 文件就是一个模块，这个文件可能是JavaScript 代码、JSON 或者编译过的C/C++ 扩展。

### 创建模块

在 Node.js 中，创建一个模块非常简单，如下我们创建一个 main.js 文件，代码如下:

```js
var hello = require('./hello');
hello.world();
```

以上实例中，代码 `require('./hello')` 引入了当前目录下的 hello.js 文件（./ 为当前目录，node.js 默认后缀为 js）。

Node.js 提供了 exports 和 require 两个对象，其中 exports 是模块公开的接口，require 用于从外部获取一个模块的接口，即所获取模块的 exports 对象。

接下来我们就来创建 hello.js 文件，代码如下：

```js
exports.world = function() {
  console.log('Hello World');
}
```

在以上示例中，hello.js 通过 exports 对象把 world 作为模块的访问接口，在 main.js 中通过 `require('./hello')` 加载这个模块，然后就可以直接访问 hello.js 中 exports 对象的成员函数了。

有时候我们只是想把一个对象封装到模块中，格式如下：

```js
module.exports = function() {
  // ...
}
```

例如:

```js
// hello.js
function Hello() {
    var name;
    this.setName = function(thyName) {
        name = thyName;
    };
    this.sayHello = function() {
        console.log('Hello ' + name);
    };
};
module.exports = Hello;
```

这样就可以直接获得这个对象了：

```js
// main.js
var Hello = require('./hello');
hello = new Hello();
hello.setName('BYVoid');
hello.sayHello();
```

模块接口的唯一变化是使用 `module.exports = Hello` 代替了 `exports.world = function(){}`。在外部引用该模块时，其接口对象就是要输出的 Hello 对象本身，而不是原先的 exports。

**服务端的模块放在哪里？**

也许你已经注意到，我们已经在代码中使用了模块了。像这样：

```js
var http = require("http");

...

http.createServer(...);
```

Node.js 中自带了一个叫做 http 的模块，我们在我们的代码中请求它并把返回值赋给一个本地变量。

这把我们的本地变量变成了一个拥有所有 http 模块所提供的公共方法的对象。

Node.js 的 require 方法中的文件查找策略如下：

由于 Node.js 中存在 4 类模块（原生模块和3种文件模块），尽管 require 方法极其简单，但是内部的加载却是十分复杂的，其加载优先级也各自不同。如下图所示：

![x](./Resource/85.png)

- 从文件模块缓存中加载

  尽管原生模块与文件模块的优先级不同，但是都会优先于从文件模块的缓存中加载已经存在的模块。

- 从原生模块加载

  原生模块的优先级仅次于文件模块缓存的优先级。require 方法在解析文件名之后，优先检查模块是否在原生模块列表中。
  
  以http模块为例，尽管在目录下存在一个 http/http.js/http.node/http.json 文件，require("http") 都不会从这些文件中加载，而是从原生模块中加载。

  原生模块也有一个缓存区，同样也是优先从缓存区加载。如果缓存区没有被加载过，则调用原生模块的加载方式进行加载和执行。

- 从文件加载

  当文件模块缓存中不存在，而且不是原生模块的时候，Node.js 会解析 require 方法传入的参数，并从文件系统中加载实际的文件，加载过程中的包装和编译细节在前一节中已经介绍过，这里我们将详细描述查找文件模块的过程，其中，也有一些细节值得知晓。

require方法接受以下几种参数的传递：

- http、fs、path等，原生模块。
- ./mod或../mod，相对路径的文件模块。
- /pathtomodule/mod，绝对路径的文件模块。
- mod，非原生模块的文件模块。

在路径 Y 下执行 require(X) 语句执行顺序：

1. 如果 X 是内置模块
   - a. 返回内置模块
   - b. 停止执行
2. 如果 X 以 '/' 开头
   - a. 设置 Y 为文件根路径
3. 如果 X 以 './' 或 '/' or '../' 开头
   - a. LOAD_AS_FILE(Y + X)
   - b. LOAD_AS_DIRECTORY(Y + X)
4. LOAD_NODE_MODULES(X, dirname(Y))
5. 抛出异常 "not found"

LOAD_AS_FILE(X)

1. 如果 X 是一个文件, 将 X 作为 JavaScript 文本载入并停止执行。
2. 如果 X.js 是一个文件, 将 X.js 作为 JavaScript 文本载入并停止执行。
3. 如果 X.json 是一个文件, 解析 X.json 为 JavaScript 对象并停止执行。
4. 如果 X.node 是一个文件, 将 X.node 作为二进制插件载入并停止执行。

LOAD_INDEX(X)

1. 如果 X/index.js 是一个文件,  将 X/index.js 作为 JavaScript 文本载入并停止执行。
2. 如果 X/index.json 是一个文件, 解析 X/index.json 为 JavaScript 对象并停止执行。
3. 如果 X/index.node 是一个文件,  将 X/index.node 作为二进制插件载入并停止执行。

LOAD_AS_DIRECTORY(X)

1. 如果 X/package.json 是一个文件,
   a. 解析 X/package.json, 并查找 "main" 字段。
   b. let M = X + (json main 字段)
   c. LOAD_AS_FILE(M)
   d. LOAD_INDEX(M)
2. LOAD_INDEX(X)

LOAD_NODE_MODULES(X, START)

1. let DIRS=NODE_MODULES_PATHS(START)
2. for each DIR in DIRS:
   a. LOAD_AS_FILE(DIR/X)
   b. LOAD_AS_DIRECTORY(DIR/X)

NODE_MODULES_PATHS(START)

1. let PARTS = path split(START)
2. let I = count of PARTS - 1
3. let DIRS = []
4. while I >= 0,
   a. if PARTS[I] = "node_modules" CONTINUE
   b. DIR = path join(PARTS[0 .. I] + "node_modules")
   c. DIRS = DIRS + DIR
   d. let I = I - 1
5. return DIRS

## 函数

在JavaScript中，一个函数可以作为另一个函数的参数。我们可以先定义一个函数，然后传递，也可以在传递参数的地方直接定义函数。

Node.js中函数的使用与Javascript类似，举例来说，你可以这样做：

```js
function say(word) {
  console.log(word);
}

function execute(someFunction, value) {
  someFunction(value);
}

execute(say, "Hello");
```

以上代码中，我们把 say 函数作为 execute 函数的第一个变量进行了传递。这里返回的不是 say 的返回值，而是 say 本身！

这样一来，say 就变成了 execute 中的本地变量 someFunction，execute 可以通过调用 someFunction()（带括号的形式）来使用 say 函数。

当然，因为 say 有一个变量，execute 在调用 someFunction 时可以传递这样一个变量。

### 匿名函数

我们可以把一个函数作为变量传递。但是我们不一定要绕这个“先定义，再传递”的圈子，我们可以直接在另一个函数的括号中定义和传递这个函数：

```js
function execute(someFunction, value) {
  someFunction(value);
}

execute(function(word){ console.log(word) }, "Hello");
```

我们在 execute 接受第一个参数的地方直接定义了我们准备传递给 execute 的函数。

用这种方式，我们甚至不用给这个函数起名字，这也是为什么它被叫做 **匿名函数**。

**函数传递是如何让HTTP服务器工作的？**

带着这些知识，我们再来看看我们简约而不简单的HTTP服务器：

```js
var http = require("http");

http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World");
  response.end();
}).listen(8888);
```

现在它看上去应该清晰了很多：我们向 createServer 函数传递了一个匿名函数。
用这样的代码也可以达到同样的目的：

```js
var http = require("http");

function onRequest(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World");
  response.end();
}

http.createServer(onRequest).listen(8888);
```

## 路由

我们要为路由提供请求的 URL 和其他需要的 GET 及 POST 参数，随后路由需要根据这些数据来执行相应的代码。

因此，我们需要查看 HTTP 请求，从中提取出请求的 URL 以及 GET/POST 参数。这一功能应当属于路由还是服务器（甚至作为一个模块自身的功能）确实值得探讨，但这里暂定其为我们的 HTTP 服务器的功能。

我们需要的所有数据都会包含在 request 对象中，该对象作为 onRequest() 回调函数的第一个参数传递。但是为了解析这些数据，我们需要额外的 Node.JS 模块，它们分别是 url 和 querystring 模块。

```js
url.parse(string).query
url.parse(string).pathname
// http://localhost:8888/start?foo=bar&hello=world
querystring.parse(queryString)["foo"]
querystring.parse(queryString)["hello"]
```

当然我们也可以用 querystring 模块来解析 POST 请求体中的参数。现在我们来给 onRequest() 函数加上一些逻辑，用来找出浏览器请求的 URL 路径。

server.js 文件代码：

```js
var http = require("http");
var url = require("url");
function start() {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
  }
  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}
exports.start = start;
```

好了，我们的应用现在可以通过请求的 URL 路径来区别不同请求了--这使我们得以使用路由（还未完成）来将请求以 URL 路径为基准映射到处理程序上。

在我们所要构建的应用中，这意味着来自 /start 和 /upload 的请求可以使用不同的代码来处理。稍后我们将看到这些内容是如何整合到一起的。

现在我们可以来编写路由了，建立一个名为 router.js 的文件，添加以下内容：

```js
function route(pathname) {
  console.log("About to route a request for " + pathname);
}
exports.route = route;
```

如你所见，这段代码什么也没干，不过对于现在来说这是应该的。在添加更多的逻辑以前，我们先来看看如何把路由和服务器整合起来。

我们的服务器应当知道路由的存在并加以有效利用。我们当然可以通过硬编码的方式将这一依赖项绑定到服务器上，但是其它语言的编程经验告诉我们这会是一件非常痛苦的事，因此我们将使用依赖注入的方式较松散地添加路由模块。

首先，我们来扩展一下服务器的 start() 函数，以便将路由函数作为参数传递过去，server.js 文件代码如下

```js
var http = require("http");
var url = require("url");
function start(route) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
    route(pathname);
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
  }
  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}
exports.start = start;
```

同时，我们会相应扩展 index.js，使得路由函数可以被注入到服务器中：

```js
var server = require("./server");
var router = require("./router");
server.start(router.route);
```

在这里，我们传递的函数依旧什么也没做。

如果现在启动应用（node index.js，始终记得这个命令行），随后请求一个URL，你将会看到应用输出相应的信息，这表明我们的HTTP服务器已经在使用路由模块了，并会将请求的路径传递给路由：

```sh
node index.js
--
Server has started.
```

以上输出已经去掉了比较烦人的 /favicon.ico 请求相关的部分。

## 全局对象

JavaScript 中有一个特殊的对象，称为全局对象（Global Object），它及其所有属性都可以在程序的任何地方访问，即全局变量。

在浏览器 JavaScript 中，通常 window 是全局对象， 而 Node.js 中的全局对象是 global，所有全局变量（除了 global 本身以外）都是 global 对象的属性。

在 Node.js 我们可以直接访问到 global 的属性，而不需要在应用中包含它。

### 全局对象与全局变量

global 最根本的作用是作为全局变量的宿主。按照 ECMAScript 的定义，满足以下条件的变量是全局变量：

- 在最外层定义的变量；
- 全局对象的属性；
- 隐式定义的变量（未定义直接赋值的变量）。

当你定义一个全局变量时，这个变量同时也会成为全局对象的属性，反之亦然。需要注意的是，在 Node.js 中你不可能在最外层定义变量，因为所有用户代码都是属于当前模块的，而模块本身不是最外层上下文。

>注意：永远使用 var 定义变量以避免引入全局变量，因为全局变量会污染命名空间，提高代码的耦合风险。

### __filename

__filename 表示当前正在执行的脚本的文件名。它将输出文件所在位置的绝对路径，且和命令行参数所指定的文件名不一定相同。 如果在模块中，返回的值是模块文件的路径。

创建文件 main.js ，代码如下所示：

```js
// 输出全局变量 __filename 的值
console.log( __filename );
```

执行 main.js 文件，代码如下所示:

```sh
node main.js
--
/web/com/runoob/nodejs/main.js
```

### __dirname

__dirname 表示当前执行脚本所在的目录。

创建文件 main.js ，代码如下所示：

```js
// 输出全局变量 __dirname 的值
console.log( __dirname );
```

执行 main.js 文件，代码如下所示：

```sh
node main.js
--
/web/com/runoob/nodejs
```

### process

process 是一个全局变量，即 global 对象的属性。

它用于描述当前 Node.js 进程状态的对象，提供了一个与操作系统的简单接口。通常在你写本地命令行程序的时候，少不了要和它打交道。下面将会介绍 process 对象的一些最常用的成员方法。

序号 | 事件 | 描述
-|-|-
1 | exit | 当进程准备退出时触发。
2 | beforeExit | 当 node 清空事件循环，并且没有其他安排时触发这个事件。通常来说，当没有进程安排时 node 退出，但是 'beforeExit' 的监听器可以异步调用，这样 node 就会继续执行。
3 | uncaughtException | 当一个异常冒泡回到事件循环，触发这个事件。如果给异常添加了监视器，默认的操作（打印堆栈跟踪信息并退出）就不会发生。
4 | Signal 事件 | 当进程接收到信号时就触发。信号列表详见标准的 POSIX 信号名，如 SIGINT、SIGUSR1 等。

创建文件 main.js，代码如下所示：

```js
process.on('exit', function(code) {

  // 以下代码永远不会执行
  setTimeout(function() {
    console.log("该代码不会执行");
  }, 0);
  
  console.log('退出码为:', code);
});
console.log("程序执行结束");
```

执行 main.js 文件，代码如下所示:

```sh
node main.js
--
程序执行结束
退出码为: 0
```

退出状态码如下所示：

状态码 | 名称 | 描述
-|-|-
1 | Uncaught Fatal Exception | 有未捕获异常，并且没有被域或 uncaughtException 处理函数处理。
2 | Unused | 保留
3 | Internal JavaScript Parse Error | JavaScript的源码启动 Node 进程时引起解析错误。非常罕见，仅会在开发 Node 时才会有。
4 | Internal JavaScript Evaluation Failure | JavaScript 的源码启动 Node 进程，评估时返回函数失败。非常罕见，仅会在开发 Node 时才会有。
5 | Fatal Error | V8 里致命的不可恢复的错误。通常会打印到 stderr ，内容为： FATAL ERROR
6 | Non-function Internal Exception Handler | 未捕获异常，内部异常处理函数不知为何设置为on-function，并且不能被调用。
7 | Internal Exception Handler Run-Time Failure | 未捕获的异常， 并且异常处理函数处理时自己抛出了异常。例如，如果 process.on('uncaughtException') 或 domain.on('error') 抛出了异常。
8 | Unused | 保留
9 | Invalid Argument | 可能是给了未知的参数，或者给的参数没有值。
10 | Internal JavaScript Run-Time Failure | JavaScript的源码启动 Node 进程时抛出错误，非常罕见，仅会在开发 Node 时才会有。
12 | Invalid Debug Argument | 设置了参数--debug 和/或 --debug-brk，但是选择了错误端口。
128 | Signal Exits | 如果 Node 接收到致命信号，比如SIGKILL 或 SIGHUP，那么退出代码就是128 加信号代码。这是标准的 Unix 做法，退出信号代码放在高位。

**Process 属性：**

Process 提供了很多有用的属性，便于我们更好的控制系统的交互：

序号 | 属性 | 描述
-|-|-
1 | stdout | 标准输出流。
2 | stderr | 标准错误流。
3 | stdin | 标准输入流。
4 | argv | argv 属性返回一个数组，由命令行执行脚本时的各个参数组成。它的第一个成员总是node，第二个成员是脚本文件名，其余成员是脚本文件的参数。
5 | execPath | 返回执行当前脚本的 Node 二进制文件的绝对路径。
6 | execArgv | 返回一个数组，成员是命令行下执行脚本时，在Node可执行文件与脚本文件之间的命令行参数。
7 | env | 返回一个对象，成员为当前 shell 的环境变量
8 | exitCode | 进程退出时的代码，如果进程优通过 process.exit() 退出，不需要指定退出码。
9 | version | Node 的版本，比如v0.10.18。
10 | versions | 一个属性，包含了 node 的版本和依赖.
11 | config | 一个包含用来编译当前 node 执行文件的 javascript 配置选项的对象。它与运行 ./configure 脚本生成的 "config.gypi" 文件相同。
12 | pid | 当前进程的进程号。
13 | title | 进程名，默认值为"node"，可以自定义该值。
14 | arch | 当前 CPU 的架构：'arm'、'ia32' 或者 'x64'。
15 | platform | 运行程序所在的平台系统 'darwin', 'freebsd', 'linux', 'sunos' 或 'win32'
16 | mainModule | require.main 的备选方法。不同点，如果主模块在运行时改变，require.main可能会继续返回老的模块。可以认为，这两者引用了同一个模块。

创建文件 main.js ，代码如下所示：

```js
// 输出到终端
process.stdout.write("Hello World!" + "\n");

// 通过参数读取
process.argv.forEach(function(val, index, array) {
   console.log(index + ': ' + val);
});

// 获取执行路径
console.log(process.execPath);

// 平台信息
console.log(process.platform);
```

执行 main.js 文件，代码如下所示:

```sh
node main.js
--
Hello World!
0: node
1: /web/www/node/main.js
/usr/local/node/0.10.36/bin/node
darwin
```

Process 提供了很多有用的方法，便于我们更好的控制系统的交互：

序号 | 方法 | 描述
-|-|-
1 | abort() | 这将导致 node 触发 abort 事件。会让 node 退出并生成一个核心文件。
2 | chdir(directory) | 改变当前工作进程的目录，如果操作失败抛出异常。
3 | cwd() | 返回当前进程的工作目录
4 | exit([code]) | 使用指定的 code 结束进程。如果忽略，将会使用 code 0。
5 | getgid() | 获取进程的群组标识（参见 getgid(2)）。获取到得时群组的数字 id，而不是名字。<br/>注意：这个函数仅在 POSIX 平台上可用（例如，非Windows 和 Android）。
6 | setgid(id) | 设置进程的群组标识（参见 setgid(2)）。可以接收数字 ID 或者群组名。如果指定了群组名，会阻塞等待解析为数字 ID。<br/>注意：这个函数仅在 POSIX 平台上可用（例如，非Windows 和 Android）。
7 | getuid() | 获取进程的用户标识（参见 getuid(2)）。这是数字的用户 id，不是用户名。<br/>注意：这个函数仅在 POSIX 平台上可用（例如，非Windows 和 Android）。
8 | setuid(id) | 设置进程的用户标识（参见setuid(2)）。接收数字 ID或字符串名字。果指定了群组名，会阻塞等待解析为数字 ID。<br/>注意：这个函数仅在 POSIX 平台上可用（例如，非Windows 和 Android）。
9 | getgroups() | 返回进程的群组 iD 数组。POSIX 系统没有保证一定有，但是 node.js 保证有。<br/>注意：这个函数仅在 POSIX 平台上可用(例如，非Windows 和 Android)。
10 | setgroups(groups) | 设置进程的群组 ID。这是授权操作，所有你需要有 root 权限，或者有 CAP_SETGID 能力。<br/>注意：这个函数仅在 POSIX 平台上可用(例如，非Windows 和 Android)。
11 | initgroups(user, extra_group) | 读取 /etc/group ，并初始化群组访问列表，使用成员所在的所有群组。这是授权操作，所有你需要有 root 权限，或者有 CAP_SETGID 能力。<br/>注意：这个函数仅在 POSIX 平台上可用(例如，非Windows 和 Android)。
12 | kill(pid[, signal]) | 发送信号给进程. pid 是进程id，并且 signal 是发送的信号的字符串描述。信号名是字符串，比如 'SIGINT' 或 'SIGHUP'。如果忽略，信号会是 'SIGTERM'。
13 | memoryUsage() | 返回一个对象，描述了 Node 进程所用的内存状况，单位为字节。
14 | nextTick(callback) | 一旦当前事件循环结束，调用回到函数。
15 | umask([mask]) | 设置或读取进程文件的掩码。子进程从父进程继承掩码。如果mask 参数有效，返回旧的掩码。否则，返回当前掩码。
16 | uptime() | 返回 Node 已经运行的秒数。
17 | hrtime() | 返回当前进程的高分辨时间，形式为 [seconds, nanoseconds]数组。它是相对于过去的任意事件。该值与日期无关，因此不受时钟漂移的影响。主要用途是可以通过精确的时间间隔，来衡量程序的性能。<br/>你可以将之前的结果传递给当前的 process.hrtime() ，会返回两者间的时间差，用来基准和测量时间间隔。

创建文件 main.js ，代码如下所示：

```js
// 输出当前目录
console.log('当前目录: ' + process.cwd());

// 输出当前版本
console.log('当前版本: ' + process.version);

// 输出内存使用情况
console.log(process.memoryUsage());
```

执行 main.js 文件，代码如下所示:

```sh
node main.js
当前目录: /web/com/runoob/nodejs
当前版本: v0.10.36
{ rss: 12541952, heapTotal: 4083456, heapUsed: 2157056 }
```

## 常用工具

util 是一个Node.js 核心模块，提供常用函数的集合，用于弥补核心JavaScript 的功能 过于精简的不足。
util.inherits
util.inherits(constructor, superConstructor)是一个实现对象间原型继承的函数。
JavaScript 的面向对象特性是基于原型的，与常见的基于类的不同。JavaScript 没有提供对象继承的语言级别特性，而是通过原型复制来实现的。
在这里我们只介绍util.inherits 的用法，示例如下：
var util = require('util'); 
function Base() { 
    this.name = 'base'; 
    this.base = 1991; 
    this.sayHello = function() { 
    console.log('Hello ' + this.name); 
    }; 
} 
Base.prototype.showName = function() { 
    console.log(this.name);
}; 
function Sub() { 
    this.name = 'sub'; 
} 
util.inherits(Sub, Base); 
var objBase = new Base(); 
objBase.showName(); 
objBase.sayHello(); 
console.log(objBase); 
var objSub = new Sub(); 
objSub.showName(); 
//objSub.sayHello(); 
console.log(objSub); 
我们定义了一个基础对象Base 和一个继承自Base 的Sub，Base 有三个在构造函数 内定义的属性和一个原型中定义的函数，通过util.inherits 实现继承。运行结果如下：
base 
Hello base 
{ name: 'base', base: 1991, sayHello: [Function] } 
sub 
{ name: 'sub' }
注意：Sub 仅仅继承了Base 在原型中定义的函数，而构造函数内部创造的 base 属性和 sayHello 函数都没有被 Sub 继承。
同时，在原型中定义的属性不会被console.log 作为对象的属性输出。如果我们去掉 objSub.sayHello(); 这行的注释，将会看到：
node.js:201 
throw e; // process.nextTick error, or 'error' event on first tick 
^ 
TypeError: Object #&lt;Sub&gt; has no method 'sayHello' 
at Object.&lt;anonymous&gt; (/home/byvoid/utilinherits.js:29:8) 
at Module._compile (module.js:441:26) 
at Object..js (module.js:459:10) 
at Module.load (module.js:348:31) 
at Function._load (module.js:308:12) 
at Array.0 (module.js:479:10) 
at EventEmitter._tickCallback (node.js:192:40) 
util.inspect
util.inspect(object,[showHidden],[depth],[colors])是一个将任意对象转换 为字符串的方法，通常用于调试和错误输出。它至少接受一个参数 object，即要转换的对象。
showHidden 是一个可选参数，如果值为 true，将会输出更多隐藏信息。
depth 表示最大递归的层数，如果对象很复杂，你可以指定层数以控制输出信息的多少。如果不指定depth，默认会递归2层，指定为 null 表示将不限递归层数完整遍历对象。 如果color 值为 true，输出格式将会以ANSI 颜色编码，通常用于在终端显示更漂亮的效果。
特别要指出的是，util.inspect 并不会简单地直接把对象转换为字符串，即使该对象定义了toString 方法也不会调用。
var util = require('util'); 
function Person() { 
    this.name = 'byvoid'; 
    this.toString = function() { 
    return this.name; 
    }; 
} 
var obj = new Person(); 
console.log(util.inspect(obj)); 
console.log(util.inspect(obj, true)); 
运行结果是：
Person { name: 'byvoid', toString: [Function] }
Person {
  name: 'byvoid',
  toString: 
   { [Function]
     [length]: 0,
     [name]: '',
     [arguments]: null,
     [caller]: null,
     [prototype]: { [constructor]: [Circular] } } }
util.isArray(object)
如果给定的参数 "object" 是一个数组返回true，否则返回false。
var util = require('util');

util.isArray([])
  // true
util.isArray(new Array)
  // true
util.isArray({})
  // false
util.isRegExp(object)
如果给定的参数 "object" 是一个正则表达式返回true，否则返回false。
var util = require('util');

util.isRegExp(/some regexp/)
  // true
util.isRegExp(new RegExp('another regexp'))
  // true
util.isRegExp({})
  // false
util.isDate(object)
如果给定的参数 "object" 是一个日期返回true，否则返回false。
var util = require('util');

util.isDate(new Date())
  // true
util.isDate(Date())
  // false (without 'new' returns a String)
util.isDate({})
  // false
util.isError(object)
如果给定的参数 "object" 是一个错误对象返回true，否则返回false。
var util = require('util');

util.isError(new Error())
  // true
util.isError(new TypeError())
  // true
util.isError({ name: 'Error', message: 'an error occurred' })
  // false
文件系统
Node.js 提供一组类似 UNIX（POSIX）标准的文件操作API。 Node 导入文件系统模块(fs)语法如下所示：
var fs = require("fs")
异步和同步
Node.js 文件系统（fs 模块）模块中的方法均有异步和同步版本，例如读取文件内容的函数有异步的 fs.readFile() 和同步的 fs.readFileSync()。
异步的方法函数最后一个参数为回调函数，回调函数的第一个参数包含了错误信息(error)。
建议大家是用异步方法，比起同步，异步方法性能更高，速度更快，而且没有阻塞。
实例
创建 input.txt 文件，内容如下：
菜鸟教程官网地址：www.runoob.com
文件读取实例
创建 file.js 文件, 代码如下：
var fs = require("fs");

// 异步读取
fs.readFile('input.txt', function (err, data) {
   if (err) {
       return console.error(err);
   }
   console.log("异步读取: " + data.toString());
});

// 同步读取
var data = fs.readFileSync('input.txt');
console.log("同步读取: " + data.toString());

console.log("程序执行完毕。");
以上代码执行结果如下：
$ node file.js 
同步读取: 菜鸟教程官网地址：www.runoob.com
文件读取实例

程序执行完毕。
异步读取: 菜鸟教程官网地址：www.runoob.com
文件读取实例
接下来，让我们来具体了解下 Node.js 文件系统的方法。
打开文件
语法
以下为在异步模式下打开文件的语法格式：
fs.open(path, flags[, mode], callback)
参数
参数使用说明如下：
	path - 文件的路径。
	flags - 文件打开的行为。具体值详见下文。
	mode - 设置文件模式(权限)，文件创建默认权限为 0666(可读，可写)。
	callback - 回调函数，带有两个参数如：callback(err, fd)。
flags 参数可以是以下值：
Flag	描述
r	以读取模式打开文件。如果文件不存在抛出异常。
r+	以读写模式打开文件。如果文件不存在抛出异常。
rs	以同步的方式读取文件。
rs+	以同步的方式读取和写入文件。
w	以写入模式打开文件，如果文件不存在则创建。
wx	类似 'w'，但是如果文件路径存在，则文件写入失败。
w+	以读写模式打开文件，如果文件不存在则创建。
wx+	类似 'w+'， 但是如果文件路径存在，则文件读写失败。
a	以追加模式打开文件，如果文件不存在则创建。
ax	类似 'a'， 但是如果文件路径存在，则文件追加失败。
a+	以读取追加模式打开文件，如果文件不存在则创建。
ax+	类似 'a+'， 但是如果文件路径存在，则文件读取追加失败。
实例
接下来我们创建 file.js 文件，并打开 input.txt 文件进行读写，代码如下所示：
var fs = require("fs");

// 异步打开文件
console.log("准备打开文件！");
fs.open('input.txt', 'r+', function(err, fd) {
   if (err) {
       return console.error(err);
   }
  console.log("文件打开成功！");     
});
以上代码执行结果如下：
$ node file.js 
准备打开文件！
文件打开成功！
获取文件信息
语法
以下为通过异步模式获取文件信息的语法格式：
fs.stat(path, callback)
参数
参数使用说明如下：
	path - 文件路径。
	callback - 回调函数，带有两个参数如：(err, stats), stats 是 fs.Stats 对象。
fs.stat(path)执行后，会将stats类的实例返回给其回调函数。可以通过stats类中的提供方法判断文件的相关属性。例如判断是否为文件：
var fs = require('fs');

fs.stat('/Users/liuht/code/itbilu/demo/fs.js', function (err, stats) {
    console.log(stats.isFile()); //true
})
stats类中的方法有：
方法	描述
stats.isFile()	如果是文件返回 true，否则返回 false。
stats.isDirectory()	如果是目录返回 true，否则返回 false。
stats.isBlockDevice()	如果是块设备返回 true，否则返回 false。
stats.isCharacterDevice()	如果是字符设备返回 true，否则返回 false。
stats.isSymbolicLink()	如果是软链接返回 true，否则返回 false。
stats.isFIFO()	如果是FIFO，返回true，否则返回 false。FIFO是UNIX中的一种特殊类型的命令管道。
stats.isSocket()	如果是 Socket 返回 true，否则返回 false。
实例
接下来我们创建 file.js 文件，代码如下所示：
var fs = require("fs");

console.log("准备打开文件！");
fs.stat('input.txt', function (err, stats) {
   if (err) {
       return console.error(err);
   }
   console.log(stats);
   console.log("读取文件信息成功！");

   // 检测文件类型
   console.log("是否为文件(isFile) ? " + stats.isFile());
   console.log("是否为目录(isDirectory) ? " + stats.isDirectory());    
});
以上代码执行结果如下：
$ node file.js 
准备打开文件！
{ dev: 16777220,
  mode: 33188,
  nlink: 1,
  uid: 501,
  gid: 20,
  rdev: 0,
  blksize: 4096,
  ino: 40333161,
  size: 61,
  blocks: 8,
  atime: Mon Sep 07 2015 17:43:55 GMT+0800 (CST),
  mtime: Mon Sep 07 2015 17:22:35 GMT+0800 (CST),
  ctime: Mon Sep 07 2015 17:22:35 GMT+0800 (CST) }
读取文件信息成功！
是否为文件(isFile) ? true
是否为目录(isDirectory) ? false
写入文件
语法
以下为异步模式下写入文件的语法格式：
fs.writeFile(file, data[, options], callback)
如果文件存在，该方法写入的内容会覆盖旧的文件内容。
参数
参数使用说明如下：
	file - 文件名或文件描述符。
	data - 要写入文件的数据，可以是 String(字符串) 或 Buffer(流) 对象。
	options - 该参数是一个对象，包含 {encoding, mode, flag}。默认编码为 utf8, 模式为 0666 ， flag 为 'w'
	callback - 回调函数，回调函数只包含错误信息参数(err)，在写入失败时返回。
实例
接下来我们创建 file.js 文件，代码如下所示：
var fs = require("fs");

console.log("准备写入文件");
fs.writeFile('input.txt', '我是通过写入的文件内容！',  function(err) {
   if (err) {
       return console.error(err);
   }
   console.log("数据写入成功！");
   console.log("--------我是分割线-------------")
   console.log("读取写入的数据！");
   fs.readFile('input.txt', function (err, data) {
      if (err) {
         return console.error(err);
      }
      console.log("异步读取文件数据: " + data.toString());
   });
});
以上代码执行结果如下：
$ node file.js 
准备写入文件
数据写入成功！
--------我是分割线-------------
读取写入的数据！
异步读取文件数据: 我是通过写入的文件内容
读取文件
语法
以下为异步模式下读取文件的语法格式：
fs.read(fd, buffer, offset, length, position, callback)
该方法使用了文件描述符来读取文件。
参数
参数使用说明如下：
	fd - 通过 fs.open() 方法返回的文件描述符。
	buffer - 数据写入的缓冲区。
	offset - 缓冲区写入的写入偏移量。
	length - 要从文件中读取的字节数。
	position - 文件读取的起始位置，如果 position 的值为 null，则会从当前文件指针的位置读取。
	callback - 回调函数，有三个参数err, bytesRead, buffer，err 为错误信息， bytesRead 表示读取的字节数，buffer 为缓冲区对象。
实例
input.txt 文件内容为：菜鸟教程官网地址：www.runoob.com
接下来我们创建 file.js 文件，代码如下所示：
var fs = require("fs");
var buf = new Buffer(1024);

console.log("准备打开已存在的文件！");
fs.open('input.txt', 'r+', function(err, fd) {
   if (err) {
       return console.error(err);
   }
   console.log("文件打开成功！");
   console.log("准备读取文件：");
   fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
      if (err){
         console.log(err);
      }
      console.log(bytes + "  字节被读取");
      
      // 仅输出读取的字节
      if(bytes > 0){
         console.log(buf.slice(0, bytes).toString());
      }
   });
});
以上代码执行结果如下：
$ node file.js 
准备打开已存在的文件！
文件打开成功！
准备读取文件：
42  字节被读取
菜鸟教程官网地址：www.runoob.com
关闭文件
语法
以下为异步模式下关闭文件的语法格式：
fs.close(fd, callback)
该方法使用了文件描述符来读取文件。
参数
参数使用说明如下：
	fd - 通过 fs.open() 方法返回的文件描述符。
	callback - 回调函数，没有参数。
实例
input.txt 文件内容为：菜鸟教程官网地址：www.runoob.com
接下来我们创建 file.js 文件，代码如下所示：
var fs = require("fs");
var buf = new Buffer(1024);

console.log("准备打开文件！");
fs.open('input.txt', 'r+', function(err, fd) {
   if (err) {
       return console.error(err);
   }
   console.log("文件打开成功！");
   console.log("准备读取文件！");
   fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
      if (err){
         console.log(err);
      }

      // 仅输出读取的字节
      if(bytes > 0){
         console.log(buf.slice(0, bytes).toString());
      }
    
      // 关闭文件
      fs.close(fd, function(err){
         if (err){
            console.log(err);
         } 
         console.log("文件关闭成功");
      });
   });
});
以上代码执行结果如下：
$ node file.js 
准备打开文件！
文件打开成功！
准备读取文件！
菜鸟教程官网地址：www.runoob.com
文件关闭成功
截取文件
语法
以下为异步模式下截取文件的语法格式：fs.ftruncate(fd, len, callback)
该方法使用了文件描述符来读取文件。
参数
参数使用说明如下：
	fd - 通过 fs.open() 方法返回的文件描述符。
	len - 文件内容截取的长度。
	callback - 回调函数，没有参数。
实例
input.txt 文件内容为：site:www.runoob.com
接下来我们创建 file.js 文件，代码如下所示：
var fs = require("fs");
var buf = new Buffer(1024);

console.log("准备打开文件！");
fs.open('input.txt', 'r+', function(err, fd) {
   if (err) {
       return console.error(err);
   }
   console.log("文件打开成功！");
   console.log("截取10字节后的文件内容。");

   // 截取文件
   fs.ftruncate(fd, 10, function(err){
      if (err){
         console.log(err);
      } 
      console.log("文件截取成功。");
      console.log("读取相同的文件"); 
      fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
         if (err){
            console.log(err);
         }

         // 仅输出读取的字节
         if(bytes > 0){
            console.log(buf.slice(0, bytes).toString());
         }
    
         // 关闭文件
         fs.close(fd, function(err){
            if (err){
               console.log(err);
            } 
            console.log("文件关闭成功！");
         });
      });
   });
});
以上代码执行结果如下：
$ node file.js 
准备打开文件！
文件打开成功！
截取10字节后的文件内容。
文件截取成功。
读取相同的文件
site:www.r
文件关闭成功
删除文件
语法
以下为删除文件的语法格式：fs.unlink(path, callback)
参数
参数使用说明如下：
	path - 文件路径。
	callback - 回调函数，没有参数。
实例
input.txt 文件内容为：site:www.runoob.com
接下来我们创建 file.js 文件，代码如下所示：
var fs = require("fs");

console.log("准备删除文件！");
fs.unlink('input.txt', function(err) {
   if (err) {
       return console.error(err);
   }
   console.log("文件删除成功！");
});
以上代码执行结果如下：
$ node file.js 
准备删除文件！
文件删除成功！
再去查看 input.txt 文件，发现已经不存在了。
创建目录
语法
以下为创建目录的语法格式：fs.mkdir(path[, mode], callback)
参数
参数使用说明如下：
	path - 文件路径。
	mode - 设置目录权限，默认为 0777。
	callback - 回调函数，没有参数。
实例
接下来我们创建 file.js 文件，代码如下所示：
var fs = require("fs");

console.log("创建目录 /tmp/test/");
fs.mkdir("/tmp/test/",function(err){
   if (err) {
       return console.error(err);
   }
   console.log("目录创建成功。");
});
以上代码执行结果如下：
$ node file.js 
创建目录 /tmp/test/
目录创建成功。
读取目录
语法
以下为读取目录的语法格式：fs.readdir(path, callback)
参数
参数使用说明如下：
	path - 文件路径。
	callback - 回调函数，回调函数带有两个参数err, files，err 为错误信息，files 为 目录下的文件数组列表。
实例
接下来我们创建 file.js 文件，代码如下所示：

var fs = require("fs");

console.log("查看 /tmp 目录");
fs.readdir("/tmp/",function(err, files){
   if (err) {
       return console.error(err);
   }
   files.forEach( function (file){
       console.log( file );
   });
});
以上代码执行结果如下：
$ node file.js 
查看 /tmp 目录
input.out
output.out
test
test.txt
删除目录
语法
以下为删除目录的语法格式：fs.rmdir(path, callback)
参数
参数使用说明如下：
	path - 文件路径。
	callback - 回调函数，没有参数。
实例
接下来我们创建 file.js 文件，代码如下所示：
var fs = require("fs");
// 执行前创建一个空的 /tmp/test 目录
console.log("准备删除目录 /tmp/test");
fs.rmdir("/tmp/test",function(err){
   if (err) {
       return console.error(err);
   }
   console.log("读取 /tmp 目录");
   fs.readdir("/tmp/",function(err, files){
      if (err) {
          return console.error(err);
      }
      files.forEach( function (file){
          console.log( file );
      });
   });
});
以上代码执行结果如下：
$ node file.js 
准备删除目录 /tmp/test
读取 /tmp 目录
……
文件模块方法参考手册
以下为 Node.js 文件模块相同的方法列表：
序号	方法 & 描述
1	fs.rename(oldPath, newPath, callback)
异步 rename().回调函数没有参数，但可能抛出异常。
2	fs.ftruncate(fd, len, callback)
异步 ftruncate().回调函数没有参数，但可能抛出异常。
3	fs.ftruncateSync(fd, len)
同步 ftruncate()
4	fs.truncate(path, len, callback)
异步 truncate().回调函数没有参数，但可能抛出异常。
5	fs.truncateSync(path, len)
同步 truncate()
6	fs.chown(path, uid, gid, callback)
异步 chown().回调函数没有参数，但可能抛出异常。
7	fs.chownSync(path, uid, gid)
同步 chown()
8	fs.fchown(fd, uid, gid, callback)
异步 fchown().回调函数没有参数，但可能抛出异常。
9	fs.fchownSync(fd, uid, gid)
同步 fchown()
10	fs.lchown(path, uid, gid, callback)
异步 lchown().回调函数没有参数，但可能抛出异常。
11	fs.lchownSync(path, uid, gid)
同步 lchown()
12	fs.chmod(path, mode, callback)
异步 chmod().回调函数没有参数，但可能抛出异常。
13	fs.chmodSync(path, mode)
同步 chmod().
14	fs.fchmod(fd, mode, callback)
异步 fchmod().回调函数没有参数，但可能抛出异常。
15	fs.fchmodSync(fd, mode)
同步 fchmod().
16	fs.lchmod(path, mode, callback)
异步 lchmod().回调函数没有参数，但可能抛出异常。Only available on Mac OS X.
17	fs.lchmodSync(path, mode)
同步 lchmod().
18	fs.stat(path, callback)
异步 stat(). 回调函数有两个参数 err, stats，stats 是 fs.Stats 对象。
19	fs.lstat(path, callback)
异步 lstat(). 回调函数有两个参数 err, stats，stats 是 fs.Stats 对象。
20	fs.fstat(fd, callback)
异步 fstat(). 回调函数有两个参数 err, stats，stats 是 fs.Stats 对象。
21	fs.statSync(path)
同步 stat(). 返回 fs.Stats 的实例。
22	fs.lstatSync(path)
同步 lstat(). 返回 fs.Stats 的实例。
23	fs.fstatSync(fd)
同步 fstat(). 返回 fs.Stats 的实例。
24	fs.link(srcpath, dstpath, callback)
异步 link().回调函数没有参数，但可能抛出异常。
25	fs.linkSync(srcpath, dstpath)
同步 link().
26	fs.symlink(srcpath, dstpath[, type], callback)
异步 symlink().回调函数没有参数，但可能抛出异常。 type 参数可以设置为 'dir', 'file', 或 'junction' (默认为 'file') 。
27	fs.symlinkSync(srcpath, dstpath[, type])
同步 symlink().
28	fs.readlink(path, callback)
异步 readlink(). 回调函数有两个参数 err, linkString。
29	fs.realpath(path[, cache], callback)
异步 realpath(). 回调函数有两个参数 err, resolvedPath。
30	fs.realpathSync(path[, cache])
同步 realpath()。返回绝对路径。
31	fs.unlink(path, callback)
异步 unlink().回调函数没有参数，但可能抛出异常。
32	fs.unlinkSync(path)
同步 unlink().
33	fs.rmdir(path, callback)
异步 rmdir().回调函数没有参数，但可能抛出异常。
34	fs.rmdirSync(path)
同步 rmdir().
35	fs.mkdir(path[, mode], callback)
S异步 mkdir(2).回调函数没有参数，但可能抛出异常。 mode defaults to 0777.
36	fs.mkdirSync(path[, mode])
同步 mkdir().
37	fs.readdir(path, callback)
异步 readdir(3). 读取目录的内容。
38	fs.readdirSync(path)
同步 readdir().返回文件数组列表。
39	fs.close(fd, callback)
异步 close().回调函数没有参数，但可能抛出异常。
40	fs.closeSync(fd)
同步 close().
41	fs.open(path, flags[, mode], callback)
异步打开文件。
42	fs.openSync(path, flags[, mode])
同步 version of fs.open().
43	fs.utimes(path, atime, mtime, callback)

44	fs.utimesSync(path, atime, mtime)
修改文件时间戳，文件通过指定的文件路径。
45	fs.futimes(fd, atime, mtime, callback)

46	fs.futimesSync(fd, atime, mtime)
修改文件时间戳，通过文件描述符指定。
47	fs.fsync(fd, callback)
异步 fsync.回调函数没有参数，但可能抛出异常。
48	fs.fsyncSync(fd)
同步 fsync.
49	fs.write(fd, buffer, offset, length[, position], callback)
将缓冲区内容写入到通过文件描述符指定的文件。
50	fs.write(fd, data[, position[, encoding]], callback)
通过文件描述符 fd 写入文件内容。
51	fs.writeSync(fd, buffer, offset, length[, position])
同步版的 fs.write()。
52	fs.writeSync(fd, data[, position[, encoding]])
同步版的 fs.write().
53	fs.read(fd, buffer, offset, length, position, callback)
通过文件描述符 fd 读取文件内容。
54	fs.readSync(fd, buffer, offset, length, position)
同步版的 fs.read.
55	fs.readFile(filename[, options], callback)
异步读取文件内容。
56	fs.readFileSync(filename[, options])<="" td="">
57	fs.writeFile(filename, data[, options], callback)
异步写入文件内容。
58	fs.writeFileSync(filename, data[, options])
同步版的 fs.writeFile。
59	fs.appendFile(filename, data[, options], callback)
异步追加文件内容。
60	fs.appendFileSync(filename, data[, options])
The 同步 version of fs.appendFile.
61	fs.watchFile(filename[, options], listener)
查看文件的修改。
62	fs.unwatchFile(filename[, listener])
停止查看 filename 的修改。
63	fs.watch(filename[, options][, listener])
查看 filename 的修改，filename 可以是文件或目录。返回 fs.FSWatcher 对象。
64	fs.exists(path, callback)
检测给定的路径是否存在。
65	fs.existsSync(path)
同步版的 fs.exists.
66	fs.access(path[, mode], callback)
测试指定路径用户权限。
67	fs.accessSync(path[, mode])
同步版的 fs.access。
68	fs.createReadStream(path[, options])
返回ReadStream 对象。
69	fs.createWriteStream(path[, options])
返回 WriteStream 对象。
70	fs.symlink(srcpath, dstpath[, type], callback)
异步 symlink().回调函数没有参数，但可能抛出异常。
更多内容，请查看官网文件模块描述：File System。
GET/POST请求
在很多场景中，我们的服务器都需要跟用户的浏览器打交道，如表单提交。
表单提交到服务器一般都使用 GET/POST 请求。
本章节我们将为大家介绍 Node.js GET/POST请求。
获取GET请求内容
由于GET请求直接被嵌入在路径中，URL是完整的请求路径，包括了?后面的部分，因此你可以手动解析后面的内容作为GET请求的参数。
node.js 中 url 模块中的 parse 函数提供了这个功能。
var http = require('http');
var url = require('url');
var util = require('util');

http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    res.end(util.inspect(url.parse(req.url, true)));
}).listen(3000);
在浏览器中访问 http://localhost:3000/user?name=菜鸟教程&url=www.runoob.com 然后查看返回结果:

![x](./Resource/86.png)


获取 URL 的参数
我们可以使用 url.parse 方法来解析 URL 中的参数，代码如下：
var http = require('http');
var url = require('url');
var util = require('util');

http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/plain'});

    // 解析 url 参数
    var params = url.parse(req.url, true).query;
    res.write("网站名：" + params.name);
    res.write("\n");
    res.write("网站 URL：" + params.url);
    res.end();

}).listen(3000);
获取 POST 请求内容
POST 请求的内容全部的都在请求体中，http.ServerRequest 并没有一个属性内容为请求体，原因是等待请求体传输可能是一件耗时的工作。
比如上传文件，而很多时候我们可能并不需要理会请求体的内容，恶意的POST请求会大大消耗服务器的资源，所以 node.js 默认是不会解析请求体的，当你需要的时候，需要手动来做。
基本语法结构说明
var http = require('http');
var querystring = require('querystring');

http.createServer(function(req, res){
    // 定义了一个post变量，用于暂存请求体的信息
    var post = '';     

    // 通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
    req.on('data', function(chunk){    
        post += chunk;
    });
     
    // 在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
    req.on('end', function(){    
        post = querystring.parse(post);
        res.end(util.inspect(post));
    });
}).listen(3000);
以下实例表单通过 POST 提交并输出数据：
var http = require('http');
var querystring = require('querystring');

var postHTML = 
  '<html><head><meta charset="utf-8"><title>菜鸟教程 Node.js 实例</title></head>' +
  '<body>' +
  '<form method="post">' +
  '网站名： <input name="name"><br>' +
  '网站 URL： <input name="url"><br>' +
  '<input type="submit">' +
  '</form>' +
  '</body></html>';

http.createServer(function (req, res) {
  var body = "";
  req.on('data', function (chunk) {
    body += chunk;
  });
  req.on('end', function () {
    // 解析参数
    body = querystring.parse(body);
    // 设置响应头部信息及编码
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});

    if(body.name && body.url) { // 输出提交的数据
        res.write("网站名：" + body.name);
        res.write("<br>");
        res.write("网站 URL：" + body.url);
    } else {  // 输出表单
        res.write(postHTML);
    }
    res.end();
  });
}).listen(3000);
工具模块
在 Node.js 模块库中有很多好用的模块。接下来我们为大家介绍几种常用模块的使用：
序号	模块名 & 描述
1	OS 模块
提供基本的系统操作函数。
2	Path 模块
提供了处理和转换文件路径的工具。
3	Net 模块
用于底层的网络通信。提供了服务端和客户端的的操作。
4	DNS 模块
用于解析域名。
5	Domain 模块
简化异步代码的异常处理，可以捕捉处理try catch无法捕捉的。
OS 模块
var os = require("os")
方法
序号	方法 & 描述
1	os.tmpdir()
返回操作系统的默认临时文件夹。
2	os.endianness()
返回 CPU 的字节序，可能的是 "BE" 或 "LE"。
3	os.hostname()
返回操作系统的主机名。
4	os.type()
返回操作系统名
5	os.platform()
返回操作系统名
6	os.arch()
返回操作系统 CPU 架构，可能的值有 "x64"、"arm" 和 "ia32"。
7	os.release()
返回操作系统的发行版本。
8	os.uptime()
返回操作系统运行的时间，以秒为单位。
9	os.loadavg()
返回一个包含 1、5、15 分钟平均负载的数组。
10	os.totalmem()
返回系统内存总量，单位为字节。
11	os.freemem()
返回操作系统空闲内存量，单位是字节。
12	os.cpus()
返回一个对象数组，包含所安装的每个 CPU/内核的信息：型号、速度（单位 MHz）、时间（一个包含 user、nice、sys、idle 和 irq 所使用 CPU/内核毫秒数的对象）。
13	os.networkInterfaces()
获得网络接口列表。
属性
序号	属性 & 描述
1	os.EOL
定义了操作系统的行尾符的常量。
Path 模块
var path = require("path")
方法
序号	方法 & 描述
1	path.normalize(p)
规范化路径，注意'..' 和 '.'。
2	path.join([path1][, path2][, ...])
用于连接路径。该方法的主要用途在于，会正确使用当前系统的路径分隔符，Unix系统是"/"，Windows系统是"\"。
3	path.resolve([from ...], to)
将 to 参数解析为绝对路径。
4	path.isAbsolute(path)
判断参数 path 是否是绝对路径。
5	path.relative(from, to)
用于将相对路径转为绝对路径。
6	path.dirname(p)
返回路径中代表文件夹的部分，同 Unix 的dirname 命令类似。
7	path.basename(p[, ext])
返回路径中的最后一部分。同 Unix 命令 bashname 类似。
8	path.extname(p)
返回路径中文件的后缀名，即路径中最后一个'.'之后的部分。如果一个路径中并不包含'.'或该路径只包含一个'.' 且这个'.'为路径的第一个字符，则此命令返回空字符串。
9	path.parse(pathString)
返回路径字符串的对象。
10	path.format(pathObject)
从对象中返回路径字符串，和 path.parse 相反。
属性
序号	属性 & 描述
1	path.sep
平台的文件路径分隔符，'\\' 或 '/'。
2	path.delimiter
平台的分隔符, ; or ':'.
3	path.posix
提供上述 path 的方法，不过总是以 posix 兼容的方式交互。
4	path.win32
提供上述 path 的方法，不过总是以 win32 兼容的方式交互。
Net 模块
var net = require("net")
方法
序号	方法 & 描述
1	net.createServer([options][, connectionListener])
创建一个 TCP 服务器。参数 connectionListener 自动给 'connection' 事件创建监听器。
2	net.connect(options[, connectionListener])
返回一个新的 'net.Socket'，并连接到指定的地址和端口。
当 socket 建立的时候，将会触发 'connect' 事件。
3	net.createConnection(options[, connectionListener])
创建一个到端口 port 和 主机 host的 TCP 连接。 host 默认为 'localhost'。
4	net.connect(port[, host][, connectListener])
创建一个端口为 port 和主机为 host的 TCP 连接 。host 默认为 'localhost'。参数 connectListener 将会作为监听器添加到 'connect' 事件。返回 'net.Socket'。
5	net.createConnection(port[, host][, connectListener])
创建一个端口为 port 和主机为 host的 TCP 连接 。host 默认为 'localhost'。参数 connectListener 将会作为监听器添加到 'connect' 事件。返回 'net.Socket'。
6	net.connect(path[, connectListener])
创建连接到 path 的 unix socket 。参数 connectListener 将会作为监听器添加到 'connect' 事件上。返回 'net.Socket'。
7	net.createConnection(path[, connectListener])
创建连接到 path 的 unix socket 。参数 connectListener 将会作为监听器添加到 'connect' 事件。返回 'net.Socket'。
8	net.isIP(input)
检测输入的是否为 IP 地址。 IPV4 返回 4， IPV6 返回 6，其他情况返回 0。
9	net.isIPv4(input)
如果输入的地址为 IPV4， 返回 true，否则返回 false。
10	net.isIPv6(input)
如果输入的地址为 IPV6， 返回 true，否则返回 false。
net.Server
net.Server通常用于创建一个 TCP 或本地服务器。
序号	方法 & 描述
1	server.listen(port[, host][, backlog][, callback])
监听指定端口 port 和 主机 host ac连接。 默认情况下 host 接受任何 IPv4 地址(INADDR_ANY)的直接连接。端口 port 为 0 时，则会分配一个随机端口。
2	server.listen(path[, callback])
通过指定 path 的连接，启动一个本地 socket 服务器。
3	server.listen(handle[, callback])
通过指定句柄连接。
4	server.listen(options[, callback])
options 的属性：端口 port, 主机 host, 和 backlog, 以及可选参数 callback 函数, 他们在一起调用server.listen(port, [host], [backlog], [callback])。还有，参数 path 可以用来指定 UNIX socket。
5	server.close([callback])
服务器停止接收新的连接，保持现有连接。这是异步函数，当所有连接结束的时候服务器会关闭，并会触发 'close' 事件。
6	server.address()
操作系统返回绑定的地址，协议族名和服务器端口。
7	server.unref()
如果这是事件系统中唯一一个活动的服务器，调用 unref 将允许程序退出。
8	server.ref()
与 unref 相反，如果这是唯一的服务器，在之前被 unref 了的服务器上调用 ref 将不会让程序退出（默认行为）。如果服务器已经被 ref，则再次调用 ref 并不会产生影响。
9	server.getConnections(callback)
异步获取服务器当前活跃连接的数量。当 socket 发送给子进程后才有效；回调函数有 2 个参数 err 和 count。
事件
序号	事件 & 描述
1	listening
当服务器调用 server.listen 绑定后会触发。
2	connection
当新连接创建后会被触发。socket 是 net.Socket实例。
3	close
服务器关闭时会触发。注意，如果存在连接，这个事件不会被触发直到所有的连接关闭。
4	error
发生错误时触发。'close' 事件将被下列事件直接调用。
net.Socket
net.Socket 对象是 TCP 或 UNIX Socket 的抽象。net.Socket 实例实现了一个双工流接口。 他们可以在用户创建客户端(使用 connect())时使用, 或者由 Node 创建它们，并通过 connection 服务器事件传递给用户。
事件
net.Socket 事件有：
序号	事件 & 描述
1	lookup
在解析域名后，但在连接前，触发这个事件。对 UNIX sokcet 不适用。
2	connect
成功建立 socket 连接时触发。
3	data
当接收到数据时触发。
4	end
当 socket 另一端发送 FIN 包时，触发该事件。
5	timeout
当 socket 空闲超时时触发，仅是表明 socket 已经空闲。用户必须手动关闭连接。
6	drain
当写缓存为空得时候触发。可用来控制上传。
7	error
错误发生时触发。
8	close
当 socket 完全关闭时触发。参数 had_error 是布尔值，它表示是否因为传输错误导致 socket 关闭。
属性
net.Socket 提供了很多有用的属性，便于控制 socket 交互：
序号	属性 & 描述
1	socket.bufferSize
该属性显示了要写入缓冲区的字节数。
2	socket.remoteAddress
远程的 IP 地址字符串，例如：'74.125.127.100' or '2001:4860:a005::68'。
3	socket.remoteFamily
远程IP协议族字符串，比如 'IPv4' or 'IPv6'。
4	socket.remotePort
远程端口，数字表示，例如：80 or 21。
5	socket.localAddress
网络连接绑定的本地接口 远程客户端正在连接的本地 IP 地址，字符串表示。例如，如果你在监听'0.0.0.0'而客户端连接在'192.168.1.1'，这个值就会是 '192.168.1.1'。
6	socket.localPort
本地端口地址，数字表示。例如：80 or 21。
7	socket.bytesRead
接收到得字节数。
8	socket.bytesWritten
发送的字节数。
方法
序号	方法 & 描述
1	new net.Socket([options])
构造一个新的 socket 对象。
2	socket.connect(port[, host][, connectListener])
指定端口 port 和 主机 host，创建 socket 连接 。参数 host 默认为 localhost。通常情况不需要使用 net.createConnection 打开 socket。只有你实现了自己的 socket 时才会用到。
3	socket.connect(path[, connectListener])
打开指定路径的 unix socket。通常情况不需要使用 net.createConnection 打开 socket。只有你实现了自己的 socket 时才会用到。
4	socket.setEncoding([encoding])
设置编码
5	socket.write(data[, encoding][, callback])
在 socket 上发送数据。第二个参数指定了字符串的编码，默认是 UTF8 编码。
6	socket.end([data][, encoding])
半关闭 socket。例如，它发送一个 FIN 包。可能服务器仍在发送数据。
7	socket.destroy()
确保没有 I/O 活动在这个套接字上。只有在错误发生情况下才需要。（处理错误等等）。
8	socket.pause()
暂停读取数据。就是说，不会再触发 data 事件。对于控制上传非常有用。
9	socket.resume()
调用 pause() 后想恢复读取数据。
10	socket.setTimeout(timeout[, callback])
socket 闲置时间超过 timeout 毫秒后 ，将 socket 设置为超时。
11	socket.setNoDelay([noDelay])
禁用纳格（Nagle）算法。默认情况下 TCP 连接使用纳格算法，在发送前他们会缓冲数据。将 noDelay 设置为 true 将会在调用 socket.write() 时立即发送数据。noDelay 默认值为 true。
12	socket.setKeepAlive([enable][, initialDelay])
禁用/启用长连接功能，并在发送第一个在闲置 socket 上的长连接 probe 之前，可选地设定初始延时。默认为 false。 设定 initialDelay （毫秒），来设定收到的最后一个数据包和第一个长连接probe之间的延时。将 initialDelay 设为0，将会保留默认（或者之前）的值。默认值为0.
13	socket.address()
操作系统返回绑定的地址，协议族名和服务器端口。返回的对象有 3 个属性，比如{ port: 12346, family: 'IPv4', address: '127.0.0.1' }。
14	socket.unref()
如果这是事件系统中唯一一个活动的服务器，调用 unref 将允许程序退出。如果服务器已被 unref，则再次调用 unref 并不会产生影响。
15	socket.ref()
与 unref 相反，如果这是唯一的服务器，在之前被 unref 了的服务器上调用 ref 将不会让程序退出（默认行为）。如果服务器已经被 ref，则再次调用 ref 并不会产生影响。
实例
创建 server.js 文件，代码如下所示：
var net = require('net');
var server = net.createServer(function(connection) { 
   console.log('client connected');
   connection.on('end', function() {
      console.log('客户端关闭连接');
   });
   connection.write('Hello World!\r\n');
   connection.pipe(connection);
});
server.listen(8080, function() { 
  console.log('server is listening');
});
执行以上服务端代码：
$ node server.js
server is listening   # 服务已创建并监听 8080 端口
新开一个窗口，创建 client.js 文件，代码如下所示：
var net = require('net');
var client = net.connect({port: 8080}, function() {
   console.log('连接到服务器！');  
});
client.on('data', function(data) {
   console.log(data.toString());
   client.end();
});
client.on('end', function() { 
   console.log('断开与服务器的连接');
});
执行以上客户端的代码：
连接到服务器！
Hello World!

断开与服务器的连接
DNS 模块
var dns = require("dns")
方法
序号	方法 & 描述
1	dns.lookup(hostname[, options], callback)
将域名（比如 'runoob.com'）解析为第一条找到的记录 A （IPV4）或 AAAA(IPV6)。参数 options可以是一个对象或整数。如果没有提供 options，IP v4 和 v6 地址都可以。如果 options 是整数，则必须是 4 或 6。
2	dns.lookupService(address, port, callback)
使用 getnameinfo 解析传入的地址和端口为域名和服务。
3	dns.resolve(hostname[, rrtype], callback)
将一个域名（如 'runoob.com'）解析为一个 rrtype 指定记录类型的数组。
4	dns.resolve4(hostname, callback)
和 dns.resolve() 类似, 仅能查询 IPv4 (A 记录）。 addresses IPv4 地址数组 (比如，['74.125.79.104', '74.125.79.105', '74.125.79.106']）。
5	dns.resolve6(hostname, callback)
和 dns.resolve4() 类似， 仅能查询 IPv6( AAAA 查询）
6	dns.resolveMx(hostname, callback)
和 dns.resolve() 类似, 仅能查询邮件交换(MX 记录)。
7	dns.resolveTxt(hostname, callback)
和 dns.resolve() 类似, 仅能进行文本查询 (TXT 记录）。 addresses 是 2-d 文本记录数组。(比如，[ ['v=spf1 ip4:0.0.0.0 ', '~all' ] ]）。 每个子数组包含一条记录的 TXT 块。根据使用情况可以连接在一起，也可单独使用。
8	dns.resolveSrv(hostname, callback)
和 dns.resolve() 类似, 仅能进行服务记录查询 (SRV 记录）。 addresses 是 hostname可用的 SRV 记录数组。 SRV 记录属性有优先级（priority），权重（weight）, 端口（port）, 和名字（name） (比如，[{'priority': 10, 'weight': 5, 'port': 21223, 'name': 'service.example.com'}, ...]）。
9	dns.resolveSoa(hostname, callback)
和 dns.resolve() 类似, 仅能查询权威记录(SOA 记录）。
10	dns.resolveNs(hostname, callback)
和 dns.resolve() 类似, 仅能进行域名服务器记录查询(NS 记录）。 addresses 是域名服务器记录数组（hostname 可以使用） (比如, ['ns1.example.com', 'ns2.example.com']）。
11	dns.resolveCname(hostname, callback)
和 dns.resolve() 类似, 仅能进行别名记录查询 (CNAME记录)。addresses 是对 hostname 可用的别名记录数组 (比如，, ['bar.example.com']）。
12	dns.reverse(ip, callback)
反向解析 IP 地址，指向该 IP 地址的域名数组。
13	dns.getServers()
返回一个用于当前解析的 IP 地址数组的字符串。
14	dns.setServers(servers)
指定一组 IP 地址作为解析服务器。
rrtypes
以下列出了 dns.resolve() 方法中有效的 rrtypes值:
	'A' IPV4 地址, 默认
	'AAAA' IPV6 地址
	'MX' 邮件交换记录
	'TXT' text 记录
	'SRV' SRV 记录
	'PTR' 用来反向 IP 查找
	'NS' 域名服务器记录
	'CNAME' 别名记录
	'SOA' 授权记录的初始值
错误码
每次 DNS 查询都可能返回以下错误码：
•	dns.NODATA: 无数据响应。
•	dns.FORMERR: 查询格式错误。
•	dns.SERVFAIL: 常规失败。
•	dns.NOTFOUND: 没有找到域名。
•	dns.NOTIMP: 未实现请求的操作。
•	dns.REFUSED: 拒绝查询。
•	dns.BADQUERY: 查询格式错误。
•	dns.BADNAME: 域名格式错误。
•	dns.BADFAMILY: 地址协议不支持。
•	dns.BADRESP: 回复格式错误。
•	dns.CONNREFUSED: 无法连接到 DNS 服务器。
•	dns.TIMEOUT: 连接 DNS 服务器超时。
•	dns.EOF: 文件末端。
•	dns.FILE: 读文件错误。
•	dns.NOMEM: 内存溢出。
•	dns.DESTRUCTION: 通道被摧毁。
•	dns.BADSTR: 字符串格式错误。
•	dns.BADFLAGS: 非法标识符。
•	dns.NONAME: 所给主机不是数字。
•	dns.BADHINTS: 非法HINTS标识符。
•	dns.NOTINITIALIZED: c c-ares 库尚未初始化。
•	dns.LOADIPHLPAPI: 加载 iphlpapi.dll 出错。
•	dns.ADDRGETNETWORKPARAMS: 无法找到 GetNetworkParams 函数。
•	dns.CANCELLED: 取消 DNS 查询。
实例
创建 main.js 文件，代码如下所示：
var dns = require('dns');

dns.lookup('www.github.com', function onLookup(err, address, family) {
   console.log('ip 地址:', address);
   dns.reverse(address, function (err, hostnames) {
   if (err) {
      console.log(err.stack);
   }

   console.log('反向解析 ' + address + ': ' + JSON.stringify(hostnames));
});  
});
执行以上代码，结果如下所示:
address: 192.30.252.130
reverse for 192.30.252.130: ["github.com"]
Domain 模块
Node.js Domain(域) 简化异步代码的异常处理，可以捕捉处理try catch无法捕捉的异常。引入 Domain 模块 语法格式如下：
var domain = require("domain")
domain模块，把处理多个不同的IO的操作作为一个组。注册事件和回调到domain，当发生一个错误事件或抛出一个错误时，domain对象会被通知，不会丢失上下文环境，也不导致程序错误立即退出，与process.on('uncaughtException')不同。
Domain 模块可分为隐式绑定和显式绑定：
•	隐式绑定: 把在domain上下文中定义的变量，自动绑定到domain对象
•	显式绑定: 把不是在domain上下文中定义的变量，以代码的方式绑定到domain对象
方法
序号	方法 & 描述
1	domain.run(function)
在域的上下文运行提供的函数，隐式的绑定了所有的事件分发器，计时器和底层请求。
2	domain.add(emitter)
显式的增加事件
3	domain.remove(emitter)
删除事件。
4	domain.bind(callback)
返回的函数是一个对于所提供的回调函数的包装函数。当调用这个返回的函数被时，所有被抛出的错误都会被导向到这个域的 error 事件。
5	domain.intercept(callback)
和 domain.bind(callback) 类似。除了捕捉被抛出的错误外，它还会拦截 Error 对象作为参数传递到这个函数。
6	domain.enter()
进入一个异步调用的上下文，绑定到domain。
7	domain.exit()
退出当前的domain，切换到不同的链的异步调用的上下文中。对应domain.enter()。
8	domain.dispose()
释放一个domain对象，让node进程回收这部分资源。
9	domain.create()
返回一个domain对象。
属性
序号	属性 & 描述
1	domain.members
已加入domain对象的域定时器和事件发射器的数组。
实例
创建 main.js 文件，代码如下所示：
var EventEmitter = require("events").EventEmitter;
var domain = require("domain");

var emitter1 = new EventEmitter();

// 创建域
var domain1 = domain.create();

domain1.on('error', function(err){
   console.log("domain1 处理这个错误 ("+err.message+")");
});

// 显式绑定
domain1.add(emitter1);

emitter1.on('error',function(err){
   console.log("监听器处理此错误 ("+err.message+")");
});

emitter1.emit('error',new Error('通过监听器来处理'));

emitter1.removeAllListeners('error');

emitter1.emit('error',new Error('通过 domain1 处理'));

var domain2 = domain.create();

domain2.on('error', function(err){
   console.log("domain2 处理这个错误 ("+err.message+")");
});

// 隐式绑定
domain2.run(function(){
   var emitter2 = new EventEmitter();
   emitter2.emit('error',new Error('通过 domain2 处理'));   
});


domain1.remove(emitter1);
emitter1.emit('error', new Error('转换为异常，系统将崩溃!'));
执行以上代码，结果如下所示:
监听器处理此错误 (通过监听器来处理)
domain1 处理这个错误 (通过 domain1 处理)
domain2 处理这个错误 (通过 domain2 处理)

events.js:72
        throw er; // Unhandled 'error' event
              ^
Error: 转换为异常，系统将崩溃!
    at Object.<anonymous> (/www/node/main.js:40:24)
    at Module._compile (module.js:456:26)
    at Object.Module._extensions..js (module.js:474:10)
    at Module.load (module.js:356:32)
    at Function.Module._load (module.js:312:12)
    at Function.Module.runMain (module.js:497:10)
    at startup (node.js:119:16)
    at node.js:929:3
Web 模块
什么是 Web 服务器？
Web服务器一般指网站服务器，是指驻留于因特网上某种类型计算机的程序，Web服务器的基本功能就是提供Web信息浏览服务。它只需支持HTTP协议、HTML文档格式及URL，与客户端的网络浏览器配合。
大多数 web 服务器都支持服务端的脚本语言（php、python、ruby）等，并通过脚本语言从数据库获取数据，将结果返回给客户端浏览器。
目前最主流的三个Web服务器是Apache、Nginx、IIS。
Web 应用架构

![x](./Resource/87.png)


•	Client - 客户端，一般指浏览器，浏览器可以通过 HTTP 协议向服务器请求数据。
•	Server - 服务端，一般指 Web 服务器，可以接收客户端请求，并向客户端发送响应数据。
•	Business - 业务层， 通过 Web 服务器处理应用程序，如与数据库交互，逻辑运算，调用外部程序等。
•	Data - 数据层，一般由数据库组成。
使用 Node 创建 Web 服务器
Node.js 提供了 http 模块，http 模块主要用于搭建 HTTP 服务端和客户端，使用 HTTP 服务器或客户端功能必须调用 http 模块，代码如下：
var http = require('http');
以下是演示一个最基本的 HTTP 服务器架构(使用8081端口)，创建 server.js 文件，代码如下所示：
var http = require('http');
var fs = require('fs');
var url = require('url');


// 创建服务器
http.createServer( function (request, response) {  
   // 解析请求，包括文件名
   var pathname = url.parse(request.url).pathname;

   // 输出请求的文件名
   console.log("Request for " + pathname + " received.");

   // 从文件系统中读取请求的文件内容
   fs.readFile(pathname.substr(1), function (err, data) {
      if (err) {
         console.log(err);
         // HTTP 状态码: 404 : NOT FOUND
         // Content Type: text/plain
         response.writeHead(404, {'Content-Type': 'text/html'});
      }else{             
         // HTTP 状态码: 200 : OK
         // Content Type: text/plain
         response.writeHead(200, {'Content-Type': 'text/html'});    
         
         // 响应文件内容
         response.write(data.toString());        
      }
      //  发送响应数据
      response.end();
   });   
}).listen(8080);

// 控制台会输出以下信息
console.log('Server running at http://127.0.0.1:8080/');
接下来我们在该目录下创建一个 index.html 文件，代码如下：
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>菜鸟教程(runoob.com)</title>
</head>
<body>
    <h1>我的第一个标题</h1>
    <p>我的第一个段落。</p>
</body>
</html>
执行 server.js 文件：
$ node server.js
Server running at http://127.0.0.1:8080/
接着我们在浏览器中打开地址：http://127.0.0.1:8080/index.html，显示如下图所示:

![x](./Resource/88.png)


执行 server.js 的控制台输出信息如下：
Server running at http://127.0.0.1:8080/
Request for /index.html received.     #  客户端请求信息
使用 Node 创建 Web 客户端
Node 创建 Web 客户端需要引入 http 模块，创建 client.js 文件，代码如下所示：
var http = require('http');

// 用于请求的选项
var options = {
   host: 'localhost',
   port: '8080',
   path: '/index.html'  
};

// 处理响应的回调函数
var callback = function(response){
   // 不断更新数据
   var body = '';
   response.on('data', function(data) {
      body += data;
   });

   response.on('end', function() {
      // 数据接收完成
      console.log(body);
   });
}
// 向服务端发送请求
var req = http.request(options, callback);
req.end();
新开一个终端，执行 client.js 文件，输出结果如下：
$ node  client.js 
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>菜鸟教程(runoob.com)</title>
</head>
<body>
    <h1>我的第一个标题</h1>
    <p>我的第一个段落。</p>
</body>
</html>
执行 server.js 的控制台输出信息如下：
Server running at http://127.0.0.1:8080/
Request for /index.html received.   # 客户端请求信息
Express 框架
Express 是一个简洁而灵活的 node.js Web应用框架, 提供了一系列强大特性帮助你创建各种 Web 应用，和丰富的 HTTP 工具。
使用 Express 可以快速地搭建一个完整功能的网站。
Express 框架核心特性：
•	可以设置中间件来响应 HTTP 请求。
•	定义了路由表用于执行不同的 HTTP 请求动作。
•	可以通过向模板传递参数来动态渲染 HTML 页面。
安装 Express
安装 Express 并将其保存到依赖列表中：$ cnpm install express --save
以上命令会将 Express 框架安装在当前目录的 node_modules 目录中， node_modules 目录下会自动创建 express 目录。以下几个重要的模块是需要与 express 框架一起安装的：
•	body-parser - node.js 中间件，用于处理 JSON, Raw, Text 和 URL 编码的数据。
•	cookie-parser - 这就是一个解析Cookie的工具。通过req.cookies可以取到传过来的cookie，并把它们转成对象。
•	multer - node.js 中间件，用于处理 enctype="multipart/form-data"（设置表单的MIME编码）的表单数据。
$ cnpm install body-parser --save
$ cnpm install cookie-parser --save
$ cnpm install multer --save
安装完后，我们可以查看下 express 使用的版本号：
$ cnpm list express
/data/www/node
└── express@4.15.2  -> /Users/tianqixin/www/node/node_modules/.4.15.2@express
第一个 Express 框架实例
接下来我们使用 Express 框架来输出 "Hello World"。
以下实例中我们引入了 express 模块，并在客户端发起请求后，响应 "Hello World" 字符串。
创建 express_demo.js 文件，代码如下所示：
//express_demo.js 文件
var express = require('express');
var app = express();

app.get('/', function (req, res) {
   res.send('Hello World');
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})
执行以上代码：
$ node express_demo.js 
应用实例，访问地址为 http://0.0.0.0:8081
请求和响应
Express 应用使用回调函数的参数： request 和 response 对象来处理请求和响应的数据。
app.get('/', function (req, res) {
   // --
})
request 和 response 对象的具体介绍：
Request 对象 - request 对象表示 HTTP 请求，包含了请求查询字符串，参数，内容，HTTP 头部等属性。常见属性有：
1.	req.app：当callback为外部文件时，用req.app访问express的实例
2.	req.baseUrl：获取路由当前安装的URL路径
3.	req.body / req.cookies：获得「请求主体」/ Cookies
4.	req.fresh / req.stale：判断请求是否还「新鲜」
5.	req.hostname / req.ip：获取主机名和IP地址
6.	req.originalUrl：获取原始请求URL
7.	req.params：获取路由的parameters
8.	req.path：获取请求路径
9.	req.protocol：获取协议类型
10.	req.query：获取URL的查询参数串
11.	req.route：获取当前匹配的路由
12.	req.subdomains：获取子域名
13.	req.accepts()：检查可接受的请求的文档类型
14.	req.acceptsCharsets / req.acceptsEncodings / req.acceptsLanguages：返回指定字符集的第一个可接受字符编码
15.	req.get()：获取指定的HTTP请求头
16.	req.is()：判断请求头Content-Type的MIME类型
Response 对象 - response 对象表示 HTTP 响应，即在接收到请求时向客户端发送的 HTTP 响应数据。常见属性有：
1.	res.app：同req.app一样
2.	res.append()：追加指定HTTP头
3.	res.set()在res.append()后将重置之前设置的头
4.	res.cookie(name，value [，option])：设置Cookie
5.	opition: domain / expires / httpOnly / maxAge / path / secure / signed
6.	res.clearCookie()：清除Cookie
7.	res.download()：传送指定路径的文件
8.	res.get()：返回指定的HTTP头
9.	res.json()：传送JSON响应
10.	res.jsonp()：传送JSONP响应
11.	res.location()：只设置响应的Location HTTP头，不设置状态码或者close response
12.	res.redirect()：设置响应的Location HTTP头，并且设置状态码302
13.	res.render(view,[locals],callback)：渲染一个view，同时向callback传递渲染后的字符串，如果在渲染过程中有错误发生next(err)将会被自动调用。callback将会被传入一个可能发生的错误以及渲染后的页面，这样就不会自动输出了。
14.	res.send()：传送HTTP响应
15.	res.sendFile(path [，options] [，fn])：传送指定路径的文件 -会自动根据文件extension设定Content-Type
16.	res.set()：设置HTTP头，传入object可以一次设置多个头
17.	res.status()：设置HTTP状态码
18.	res.type()：设置Content-Type的MIME类型
路由
我们已经了解了 HTTP 请求的基本应用，而路由决定了由谁(指定脚本)去响应客户端请求。
在HTTP请求中，我们可以通过路由提取出请求的URL以及GET/POST参数。
接下来我们扩展 Hello World，添加一些功能来处理更多类型的 HTTP 请求。
创建 express_demo2.js 文件，代码如下所示：
var express = require('express');
var app = express();

//  主页输出 "Hello World"
app.get('/', function (req, res) {
   console.log("主页 GET 请求");
   res.send('Hello GET');
})


//  POST 请求
app.post('/', function (req, res) {
   console.log("主页 POST 请求");
   res.send('Hello POST');
})

//  /del_user 页面响应
app.get('/del_user', function (req, res) {
   console.log("/del_user 响应 DELETE 请求");
   res.send('删除页面');
})

//  /list_user 页面 GET 请求
app.get('/list_user', function (req, res) {
   console.log("/list_user GET 请求");
   res.send('用户列表页面');
})

// 对页面 abcd, abxcd, ab123cd, 等响应 GET 请求
app.get('/ab*cd', function(req, res) {   
   console.log("/ab*cd GET 请求");
   res.send('正则匹配');
})


var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})
执行以上代码：
$ node express_demo2.js 
应用实例，访问地址为 http://0.0.0.0:8081
接下来你可以尝试访问 http://127.0.0.1:8081 不同的地址，查看效果。
静态文件
Express 提供了内置的中间件 express.static 来设置静态文件如：图片， CSS, JavaScript 等。
你可以使用 express.static 中间件来设置静态文件路径。例如，如果你将图片， CSS, JavaScript 文件放在 public 目录下，你可以这么写：
app.use(express.static('public'));
我们可以到 public/images 目录下放些图片,如下所示：
node_modules
server.js
public/
public/images
public/images/logo.png
让我们再修改下 "Hello World" 应用添加处理静态文件的功能。
创建 express_demo3.js 文件，代码如下所示：
var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/', function (req, res) {
   res.send('Hello World');
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})
执行以上代码：
$ node express_demo3.js 
应用实例，访问地址为 http://0.0.0.0:8081
在浏览器中访问 http://127.0.0.1:8081/images/logo.png（本实例采用了菜鸟教程的logo），结果如下图所示：

GET 方法
以下实例演示了在表单中通过 GET 方法提交两个参数，我们可以使用 server.js 文件内的 process_get 路由器来处理输入：
index.htm 文件代码：
<html>
<body>
<form action="http://127.0.0.1:8081/process_get" method="GET">
First Name: <input type="text" name="first_name">  <br>

Last Name: <input type="text" name="last_name">
<input type="submit" value="Submit">
</form>
</body>
</html>
server.js 文件代码：
var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/index.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "index.htm" );
})

app.get('/process_get', function (req, res) {

   // 输出 JSON 格式
   var response = {
       "first_name":req.query.first_name,
       "last_name":req.query.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})
执行以上代码：
node server.js 
应用实例，访问地址为 http://0.0.0.0:8081
浏览器访问 http://127.0.0.1:8081/index.htm
POST 方法
以下实例演示了在表单中通过 POST 方法提交两个参数，我们可以使用 server.js 文件内的 process_post 路由器来处理输入：
index.htm 文件代码：
<html>
<body>
<form action="http://127.0.0.1:8081/process_post" method="POST">
First Name: <input type="text" name="first_name">  <br>

Last Name: <input type="text" name="last_name">
<input type="submit" value="Submit">
</form>
</body>
</html>
server.js 文件代码：
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));

app.get('/index.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "index.htm" );
})

app.post('/process_post', urlencodedParser, function (req, res) {

   // 输出 JSON 格式
   var response = {
       "first_name":req.body.first_name,
       "last_name":req.body.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})
执行以上代码：
$ node server.js
应用实例，访问地址为 http://0.0.0.0:8081
浏览器访问 http://127.0.0.1:8081/index.htm
文件上传
以下我们创建一个用于上传文件的表单，使用 POST 方法，表单 enctype 属性设置为 multipart/form-data。
index.htm 文件代码：
<html>
<head>
<title>文件上传表单</title>
</head>
<body>
<h3>文件上传：</h3>
选择一个文件上传: <br />
<form action="/file_upload" method="post" enctype="multipart/form-data">
<input type="file" name="image" size="50" />
<br />
<input type="submit" value="上传文件" />
</form>
</body>
</html>
server.js 文件代码：
var express = require('express');
var app = express();
var fs = require("fs");

var bodyParser = require('body-parser');
var multer  = require('multer');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: '/tmp/'}).array('image'));

app.get('/index.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "index.htm" );
})

app.post('/file_upload', function (req, res) {

   console.log(req.files[0]);  // 上传的文件信息

   var des_file = __dirname + "/" + req.files[0].originalname;
   fs.readFile( req.files[0].path, function (err, data) {
        fs.writeFile(des_file, data, function (err) {
         if( err ){
              console.log( err );
         }else{
               response = {
                   message:'File uploaded successfully', 
                   filename:req.files[0].originalname
              };
          }
          console.log( response );
          res.end( JSON.stringify( response ) );
       });
   });
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})
执行以上代码：
$ node server.js 
应用实例，访问地址为 http://0.0.0.0:8081
浏览器访问 http://127.0.0.1:8081/index.htm
Cookie 管理
我们可以使用中间件向 Node.js 服务器发送 cookie 信息，以下代码输出了客户端发送的 cookie 信息：
express_cookie.js 文件代码：
// express_cookie.js 文件
var express      = require('express')
var cookieParser = require('cookie-parser')

var app = express()
app.use(cookieParser())

app.get('/', function(req, res) {
  console.log("Cookies: ", req.cookies)
})

app.listen(8081)
执行以上代码：
$ node express_cookie.js 
现在你可以访问 http://127.0.0.1:8081 并查看终端信息的输出
相关资料
•	Express官网： http://expressjs.com/
•	Express4.x API 中文版： Express4.x API Chinese
•	Express4.x API：http://expressjs.com/zh-cn/4x/api.html
RESTful API
REST即表述性状态传递（英文：Representational State Transfer，简称REST）是Roy Fielding博士在2000年他的博士论文中提出来的一种软件架构风格。
表述性状态转移是一组架构约束条件和原则。满足这些约束条件和原则的应用程序或设计就是RESTful。需要注意的是，REST是设计风格而不是标准。REST通常基于使用HTTP，URI，和XML（标准通用标记语言下的一个子集）以及HTML（标准通用标记语言下的一个应用）这些现有的广泛流行的协议和标准。REST 通常使用 JSON 数据格式。
HTTP 方法
以下为 REST 基本架构的四个方法：
•	GET - 用于获取数据。
•	PUT - 用于更新或添加数据。
•	DELETE - 用于删除数据。
•	POST - 用于添加数据。
RESTful Web Services
Web service是一个平台独立的，低耦合的，自包含的、基于可编程的web的应用程序，可使用开放的XML（标准通用标记语言下的一个子集）标准来描述、发布、发现、协调和配置这些应用程序，用于开发分布式的互操作的应用程序。
基于 REST 架构的 Web Services 即是 RESTful。
由于轻量级以及通过 HTTP 直接传输数据的特性，Web 服务的 RESTful 方法已经成为最常见的替代方法。可以使用各种语言（比如 Java 程序、Perl、Ruby、Python、PHP 和 Javascript[包括 Ajax]）实现客户端。
RESTful Web 服务通常可以通过自动客户端或代表用户的应用程序访问。但是，这种服务的简便性让用户能够与之直接交互，使用它们的 Web 浏览器构建一个 GET URL 并读取返回的内容。
更多介绍，可以查看：RESTful 架构详解
创建 RESTful
首先，创建一个 json 数据资源文件 users.json，内容如下：
{
   "user1" : {
      "name" : "mahesh",
      "password" : "password1",
      "profession" : "teacher",
      "id": 1
   },
   "user2" : {
      "name" : "suresh",
      "password" : "password2",
      "profession" : "librarian",
      "id": 2
   },
   "user3" : {
      "name" : "ramesh",
      "password" : "password3",
      "profession" : "clerk",
      "id": 3
   }
}
基于以上数据，我们创建以下 RESTful API：
序号	URI	HTTP 方法	发送内容	结果
1	listUsers	GET	空	显示所有用户列表
2	addUser	POST	JSON 字符串	添加新用户
3	deleteUser	DELETE	JSON 字符串	删除用户
4	:id	GET	空	显示用户详细信息
获取用户列表：
以下代码，我们创建了 RESTful API listUsers，用于读取用户的信息列表， server.js 文件代码如下所示：
var express = require('express');
var app = express();
var fs = require("fs");

app.get('/listUsers', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
   });
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})
接下来执行以下命令：
$ node server.js 
应用实例，访问地址为 http://0.0.0.0:8081
在浏览器中访问 http://127.0.0.1:8081/listUsers，结果如下所示：
{
   "user1" : {
      "name" : "mahesh",
      "password" : "password1",
      "profession" : "teacher",
      "id": 1
   },
   "user2" : {
      "name" : "suresh",
      "password" : "password2",
      "profession" : "librarian",
      "id": 2
   },
   "user3" : {
      "name" : "ramesh",
      "password" : "password3",
      "profession" : "clerk",
      "id": 3
   }
}
添加用户
以下代码，我们创建了 RESTful API addUser， 用于添加新的用户数据，server.js 文件代码如下所示：
var express = require('express');
var app = express();
var fs = require("fs");

//添加的新用户数据
var user = {
   "user4" : {
      "name" : "mohit",
      "password" : "password4",
      "profession" : "teacher",
      "id": 4
   }
}

app.get('/addUser', function (req, res) {
   // 读取已存在的数据
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       data["user4"] = user["user4"];
       console.log( data );
       res.end( JSON.stringify(data));
   });
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port
  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})
接下来执行以下命令：
$ node server.js 
应用实例，访问地址为 http://0.0.0.0:8081
在浏览器中访问 http://127.0.0.1:8081/addUser，结果如下所示：
{ user1:
   { name: 'mahesh',
     password: 'password1',
     profession: 'teacher',
     id: 1 },
  user2:
   { name: 'suresh',
     password: 'password2',
     profession: 'librarian',
     id: 2 },
  user3:
   { name: 'ramesh',
     password: 'password3',
     profession: 'clerk',
     id: 3 },
  user4:
   { name: 'mohit',
     password: 'password4',
     profession: 'teacher',
     id: 4 } 
}
显示用户详情
以下代码，我们创建了 RESTful API :id（用户id）， 用于读取指定用户的详细信息，server.js 文件代码如下所示：
var express = require('express');
var app = express();
var fs = require("fs");

app.get('/:id', function (req, res) {
   // 首先我们读取已存在的用户
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       var user = data["user" + req.params.id] 
       console.log( user );
       res.end( JSON.stringify(user));
   });
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port
  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})
接下来执行以下命令：
$ node server.js 
应用实例，访问地址为 http://0.0.0.0:8081
在浏览器中访问 http://127.0.0.1:8081/2，结果如下所示：
{
   "name":"suresh",
   "password":"password2",
   "profession":"librarian",
   "id":2
}
删除用户
以下代码，我们创建了 RESTful API deleteUser， 用于删除指定用户的详细信息，以下实例中，用户 id 为 2，server.js 文件代码如下所示：
var express = require('express');
var app = express();
var fs = require("fs");

var id = 2;

app.get('/deleteUser', function (req, res) {

   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       delete data["user" + 2];
       
       console.log( data );
       res.end( JSON.stringify(data));
   });
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port
  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})
接下来执行以下命令：
$ node server.js 
应用实例，访问地址为 http://0.0.0.0:8081
在浏览器中访问 http://127.0.0.1:8081/deleteUser，结果如下所示：
{ user1:
   { name: 'mahesh',
     password: 'password1',
     profession: 'teacher',
     id: 1 },
  user3:
   { name: 'ramesh',
     password: 'password3',
     profession: 'clerk',
     id: 3 } 
}
多进程
我们都知道 Node.js 是以单线程的模式运行的，但它使用的是事件驱动来处理并发，这样有助于我们在多核 cpu 的系统上创建多个子进程，从而提高性能。
每个子进程总是带有三个流对象：child.stdin, child.stdout 和child.stderr。他们可能会共享父进程的 stdio 流，或者也可以是独立的被导流的流对象。
Node 提供了 child_process 模块来创建子进程，方法有：
•	exec - child_process.exec 使用子进程执行命令，缓存子进程的输出，并将子进程的输出以回调函数参数的形式返回。
•	spawn - child_process.spawn 使用指定的命令行参数创建新进程。
•	fork - child_process.fork 是 spawn()的特殊形式，用于在子进程中运行的模块，如 fork('./son.js') 相当于 spawn('node', ['./son.js']) 。与spawn方法不同的是，fork会在父进程与子进程之间，建立一个通信管道，用于进程之间的通信。
exec() 方法
child_process.exec 使用子进程执行命令，缓存子进程的输出，并将子进程的输出以回调函数参数的形式返回。
语法如下所示：
child_process.exec(command[, options], callback)
参数
参数说明如下：
command： 字符串， 将要运行的命令，参数使用空格隔开
options ：对象，可以是：
•	cwd ，字符串，子进程的当前工作目录
•	env，对象 环境变量键值对
•	encoding ，字符串，字符编码（默认： 'utf8'）
•	shell ，字符串，将要执行命令的 Shell（默认: 在 UNIX 中为/bin/sh， 在 Windows 中为cmd.exe， Shell 应当能识别 -c开关在 UNIX 中，或 /s /c 在 Windows 中。 在Windows 中，命令行解析应当能兼容cmd.exe）
•	timeout，数字，超时时间（默认： 0）
•	maxBuffer，数字， 在 stdout 或 stderr 中允许存在的最大缓冲（二进制），如果超出那么子进程将会被杀死 （默认: 200*1024）
•	killSignal ，字符串，结束信号（默认：'SIGTERM'）
•	uid，数字，设置用户进程的 ID
•	gid，数字，设置进程组的 ID
callback ：回调函数，包含三个参数error, stdout 和 stderr。
exec() 方法返回最大的缓冲区，并等待进程结束，一次性返回缓冲区的内容。
实例
让我们创建两个 js 文件 support.js 和 master.js。
support.js 文件代码：
console.log("进程 " + process.argv[2] + " 执行。" );
master.js 文件代码：
const fs = require('fs');
const child_process = require('child_process');

for(var i=0; i<3; i++) {
   var workerProcess = child_process.exec('node support.js '+i,
      function (error, stdout, stderr) {
         if (error) {
            console.log(error.stack);
            console.log('Error code: '+error.code);
            console.log('Signal received: '+error.signal);
         }
         console.log('stdout: ' + stdout);
         console.log('stderr: ' + stderr);
      });

      workerProcess.on('exit', function (code) {
      console.log('子进程已退出，退出码 '+code);
   });
}
执行以上代码，输出结果为：
$ node master.js 
子进程已退出，退出码 0
stdout: 进程 1 执行。

stderr: 
子进程已退出，退出码 0
stdout: 进程 0 执行。

stderr: 
子进程已退出，退出码 0
stdout: 进程 2 执行。

stderr: 
spawn() 方法
child_process.spawn 使用指定的命令行参数创建新进程，语法格式如下：
child_process.spawn(command[, args][, options])
参数
参数说明如下：
command： 将要运行的命令
args： Array 字符串参数数组
options Object
•	cwd String 子进程的当前工作目录
•	env Object 环境变量键值对
•	stdio Array|String 子进程的 stdio 配置
•	detached Boolean 这个子进程将会变成进程组的领导
•	uid Number 设置用户进程的 ID
•	gid Number 设置进程组的 ID
spawn() 方法返回流 (stdout & stderr)，在进程返回大量数据时使用。进程一旦开始执行时 spawn() 就开始接收响应。
实例
让我们创建两个 js 文件 support.js 和 master.js。
support.js 文件代码：
console.log("进程 " + process.argv[2] + " 执行。" );
master.js 文件代码：
const fs = require('fs');
const child_process = require('child_process');

for(var i=0; i<3; i++) {
   var workerProcess = child_process.spawn('node', ['support.js', i]);

   workerProcess.stdout.on('data', function (data) {
      console.log('stdout: ' + data);
   });

   workerProcess.stderr.on('data', function (data) {
      console.log('stderr: ' + data);
   });

   workerProcess.on('close', function (code) {
      console.log('子进程已退出，退出码 '+code);
   });
}
执行以上代码，输出结果为：
$ node master.js stdout: 进程 0 执行。

子进程已退出，退出码 0
stdout: 进程 1 执行。

子进程已退出，退出码 0
stdout: 进程 2 执行。

子进程已退出，退出码 0
fork 方法
child_process.fork 是 spawn() 方法的特殊形式，用于创建进程，语法格式如下：
child_process.fork(modulePath[, args][, options])
参数
参数说明如下：
modulePath： String，将要在子进程中运行的模块
args： Array 字符串参数数组
options：Object
•	cwd String 子进程的当前工作目录
•	env Object 环境变量键值对
•	execPath String 创建子进程的可执行文件
•	execArgv Array 子进程的可执行文件的字符串参数数组（默认： process.execArgv）
•	silent Boolean 如果为true，子进程的stdin，stdout和stderr将会被关联至父进程，否则，它们将会从父进程中继承。（默认为：false）
•	uid Number 设置用户进程的 ID
•	gid Number 设置进程组的 ID
返回的对象除了拥有ChildProcess实例的所有方法，还有一个内建的通信信道。
实例
让我们创建两个 js 文件 support.js 和 master.js。
support.js 文件代码：
console.log("进程 " + process.argv[2] + " 执行。" );
master.js 文件代码：
const fs = require('fs');
const child_process = require('child_process');

for(var i=0; i<3; i++) {
   var worker_process = child_process.fork("support.js", [i]);    

   worker_process.on('close', function (code) {
      console.log('子进程已退出，退出码 ' + code);
   });
}
执行以上代码，输出结果为：
$ node master.js 
进程 0 执行。
子进程已退出，退出码 0
进程 1 执行。
子进程已退出，退出码 0
进程 2 执行。
子进程已退出，退出码 0
JXcore 打包
Node.js 是一个开放源代码、跨平台的、用于服务器端和网络应用的运行环境。
JXcore 是一个支持多线程的 Node.js 发行版本，基本不需要对你现有的代码做任何改动就可以直接线程安全地以多线程运行。
但我们这篇文章主要是要教大家介绍 JXcore 的打包功能。
JXcore 安装
下载 JXcore 安装包，并解压，在解压的的目录下提供了 jx 二进制文件命令，接下来我们主要使用这个命令。
步骤1、下载
下载 JXcore 安装包 https://github.com/jxcore/jxcore-release，你需要根据你自己的系统环境来下载安装包。
1、Window 平台下载：Download(Windows x64 (V8))。
2、Linux/OSX 安装命令：$ curl http://jxcore.com/xil.sh | bash
如果权限不足，可以使用以下命令：curl http://jxcore.com/xil.sh | sudo bash
以上步骤如果操作正确，使用以下命令，会输出版本号信息：
$ jx --version
v0.10.32
包代码
例如，我们的 Node.js 项目包含以下几个文件，其中 index.js 是主文件：
drwxr-xr-x  2 root root  4096 Nov 13 12:42 images
-rwxr-xr-x  1 root root 30457 Mar  6 12:19 index.htm
-rwxr-xr-x  1 root root 30452 Mar  1 12:54 index.js
drwxr-xr-x 23 root root  4096 Jan 15 03:48 node_modules
drwxr-xr-x  2 root root  4096 Mar 21 06:10 scripts
drwxr-xr-x  2 root root  4096 Feb 15 11:56 style
接下来我们使用 jx 命令打包以上项目，并指定 index.js 为 Node.js 项目的主文件：
$ jx package index.js index
以上命令执行成功，会生成以下两个文件：
•	index.jxp 这是一个中间件文件，包含了需要编译的完整项目信息。
•	index.jx 这是一个完整包信息的二进制文件，可运行在客户端上。
载入 JX 文件
我们使用 jx 命令打包项目：$ node index.js command_line_arguments
使用 JXcore 编译后，我们可以使用以下命令来执行生成的 jx 二进制文件：
$ jx index.jx command_line_arguments
更多 JXcore 功能特性你可以参考官网：http://jxcore.com/。
连接 MySQL
本章节我们将为大家介绍如何使用 Node.js 来连接 MySQL，并对数据库进行操作。
如果你还没有 MySQL 的基本知识，可以参考我们的教程：MySQL 教程。
本教程使用到的 Websites 表 SQL 文件：websites.sql。
安装驱动
本教程使用了淘宝定制的 cnpm 命令进行安装：
$ cnpm install mysql
连接数据库
在以下实例中修改根据你的实际配置修改数据库用户名、及密码及数据库名：
test.js 文件代码：
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'test'
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});
执行以下命令输出就结果为：
$ node test.js
The solution is: 2
数据库连接参数说明：
参数	描述
host	主机地址 （默认：localhost）
　　user	用户名
　　password	密码
　　port	端口号 （默认：3306）
　　database	数据库名
　　charset	连接字符集（默认：'UTF8_GENERAL_CI'，注意字符集的字母都要大写）
　　localAddress	此IP用于TCP连接（可选）
　　socketPath	连接到unix域路径，当使用 host 和 port 时会被忽略
　　timezone	时区（默认：'local'）
　　connectTimeout	连接超时（默认：不限制；单位：毫秒）
　　stringifyObjects	是否序列化对象
　　typeCast	是否将列值转化为本地JavaScript类型值 （默认：true）
　　queryFormat	自定义query语句格式化方法
　　supportBigNumbers	数据库支持bigint或decimal类型列时，需要设此option为true （默认：false）
　　bigNumberStrings	supportBigNumbers和bigNumberStrings启用 强制bigint或decimal列以JavaScript字符串类型返回（默认：false）
　　dateStrings	强制timestamp,datetime,data类型以字符串类型返回，而不是JavaScript Date类型（默认：false）
　　debug	开启调试（默认：false）
　　multipleStatements	是否许一个query中有多个MySQL语句 （默认：false）
　　flags	用于修改连接标志
　　ssl	使用ssl参数（与crypto.createCredenitals参数格式一至）或一个包含ssl配置文件名称的字符串，目前只捆绑Amazon RDS的配置文件
更多说明可参见：https://github.com/mysqljs/mysql
数据库操作( CURD )
在进行数据库操作前，你需要将本站提供的 Websites 表 SQL 文件websites.sql 导入到你的 MySQL 数据库中。
本教程测试的 MySQL 用户名为 root，密码为 123456，数据库为 test，你需要根据自己配置情况修改。
查询数据
将上面我们提供的 SQL 文件导入数据库后，执行以下代码即可查询出数据：
var mysql  = require('mysql');  

var connection = mysql.createConnection({     
  host     : 'localhost',       
  user     : 'root',              
  password : '123456',       
  port: '3306',                   
  database: 'test', 
}); 

connection.connect();

var  sql = 'SELECT * FROM websites';
//查
connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }

       console.log('--------------------------SELECT----------------------------');
       console.log(result);
       console.log('------------------------------------------------------------\n\n');  
});

connection.end();
执行以下命令输出就结果为：
$ node test.js
--------------------------SELECT----------------------------
[ RowDataPacket {
    id: 1,
    name: 'Google',
    url: 'https://www.google.cm/',
    alexa: 1,
    country: 'USA' },
  RowDataPacket {
    id: 2,
    name: '淘宝',
    url: 'https://www.taobao.com/',
    alexa: 13,
    country: 'CN' },
  RowDataPacket {
    id: 3,
    name: '菜鸟教程',
    url: 'http://www.runoob.com/',
    alexa: 4689,
    country: 'CN' },
  RowDataPacket {
    id: 4,
    name: '微博',
    url: 'http://weibo.com/',
    alexa: 20,
    country: 'CN' },
  RowDataPacket {
    id: 5,
    name: 'Facebook',
    url: 'https://www.facebook.com/',
    alexa: 3,
    country: 'USA' } ]
------------------------------------------------------------
插入数据
我们可以向数据表 websties 插入数据：
var mysql  = require('mysql');  

var connection = mysql.createConnection({     
  host     : 'localhost',       
  user     : 'root',              
  password : '123456',       
  port: '3306',                   
  database: 'test', 
}); 

connection.connect();

var  addSql = 'INSERT INTO websites(Id,name,url,alexa,country) VALUES(0,?,?,?,?)';
var  addSqlParams = ['菜鸟工具', 'https://c.runoob.com','23453', 'CN'];
//增
connection.query(addSql,addSqlParams,function (err, result) {
        if(err){
         console.log('[INSERT ERROR] - ',err.message);
         return;
        }        

       console.log('--------------------------INSERT----------------------------');
       //console.log('INSERT ID:',result.insertId);        
       console.log('INSERT ID:',result);        
       console.log('-----------------------------------------------------------------\n\n');  
});

connection.end();
执行以下命令输出就结果为：
$ node test.js
--------------------------INSERT----------------------------
INSERT ID: OkPacket {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 6,
  serverStatus: 2,
  warningCount: 0,
  message: '',
  protocol41: true,
  changedRows: 0 }
-----------------------------------------------------------------
执行成功后，查看数据表，即可以看到添加的数据：

更新数据
我们也可以对数据库的数据进行修改：
var mysql  = require('mysql');  

var connection = mysql.createConnection({     
  host     : 'localhost',       
  user     : 'root',              
  password : '123456',       
  port: '3306',                   
  database: 'test', 
}); 

connection.connect();

var modSql = 'UPDATE websites SET name = ?,url = ? WHERE Id = ?';
var modSqlParams = ['菜鸟移动站', 'https://m.runoob.com',6];
//改
connection.query(modSql,modSqlParams,function (err, result) {
   if(err){
         console.log('[UPDATE ERROR] - ',err.message);
         return;
   }        
  console.log('--------------------------UPDATE----------------------------');
  console.log('UPDATE affectedRows',result.affectedRows);
  console.log('-----------------------------------------------------------------\n\n');
});

connection.end();
执行以下命令输出就结果为：
--------------------------UPDATE----------------------------
UPDATE affectedRows 1
-----------------------------------------------------------------
执行成功后，查看数据表，即可以看到更新的数据：

删除数据
我们可以使用以下代码来删除 id 为 6 的数据:
var mysql  = require('mysql');  

var connection = mysql.createConnection({     
  host     : 'localhost',       
  user     : 'root',              
  password : '123456',       
  port: '3306',                   
  database: 'test', 
}); 

connection.connect();

var delSql = 'DELETE FROM websites where id=6';
//删
connection.query(delSql,function (err, result) {
        if(err){
          console.log('[DELETE ERROR] - ',err.message);
          return;
        }        

       console.log('--------------------------DELETE----------------------------');
       console.log('DELETE affectedRows',result.affectedRows);
       console.log('-----------------------------------------------------------------\n\n');  
});

connection.end();
执行以下命令输出就结果为：
--------------------------DELETE----------------------------
DELETE affectedRows 1
-----------------------------------------------------------------
执行成功后，查看数据表，即可以看到 id=6 的数据已被删除：

连接 MongoDB
MongoDB是一种文档导向数据库管理系统，由C++撰写而成。
本章节我们将为大家介绍如何使用 Node.js 来连接 MongoDB，并对数据库进行操作。
如果你还没有 MongoDB 的基本知识，可以参考我们的教程：MongoDB 教程。
安装驱动
本教程使用了淘宝定制的 cnpm 命令进行安装：$ cnpm install mongodb
接下来我们来实现增删改查功能。
创建数据库
要在 MongoDB 中创建一个数据库，首先我们需要创建一个 MongoClient 对象，然后配置好指定的 URL 和 端口号。 如果数据库不存在，MongoDB 将创建数据库并建立连接。
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("数据库已创建!");
  db.close();
});
创建集合
我们可以使用 createCollection() 方法来创建集合：
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/mydb';
MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    console.log('数据库已创建');
    var dbase = db.db("mydb");
    dbase.createCollection('runoob', function (err, res) {
        if (err) throw err;
        console.log("创建集合!");
        db.close();
    });
});
数据库操作( CURD )
与 MySQL 不同的是 MongoDB 会自动创建数据库和集合，所以使用前我们不需要手动去创建。
插入数据
以下实例我们连接数据库 runoob 的 site 表，并插入两条数据：
var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/runoob'; # 数据库为 runoob

var insertData = function(db, callback) {  
    //连接到表 site
    var collection = db.collection('site');
    //插入数据
    var data = [{"name":"菜鸟教程","url":"www.runoob.com"},{"name":"菜鸟工具","url":"c.runoob.com"}];
    collection.insert(data, function(err, result) { 
        if(err)
        {
            console.log('Error:'+ err);
            return;
        }     
        callback(result);
    });
}

MongoClient.connect(DB_CONN_STR, function(err, db) {
    console.log("连接成功！");
    insertData(db, function(result) {
        console.log(result);
        db.close();
    });
});
执行以下命令输出就结果为：
$ node test.js
连接成功！
{ result: { ok: 1, n: 2 },
  ops: 
   [ { name: '菜鸟教程',
       url: 'www.runoob.com',
       _id: 58c25e13a08de70d3b9d4116 },
     { name: '菜鸟工具',
       url: 'c.runoob.com',
       _id: 58c25e13a08de70d3b9d4117 } ],
  insertedCount: 2,
  insertedIds: [ 58c25e13a08de70d3b9d4116, 58c25e13a08de70d3b9d4117 ] }
从输出结果来看，数据已插入成功。
我们也可以打开 MongoDB 的客户端查看数据，如：
> show dbs
admin   0.000GB
local   0.000GB
runoob  0.000GB          # 自动创建了 runoob 数据库
> show tables
site                     # 自动创建了 site 集合（数据表）
> db.site.find()         # 查看集合中的数据
{ "_id" : ObjectId("58c25f300cd56e0d7ddfc0c8"), "name" : "菜鸟教程", "url" : "www.runoob.com" }
{ "_id" : ObjectId("58c25f300cd56e0d7ddfc0c9"), "name" : "菜鸟工具", "url" : "c.runoob.com" }
> 
查询数据
以下实例检索 name 为 "菜鸟教程" 的实例：
var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/runoob';    

var selectData = function(db, callback) {  
  //连接到表  
  var collection = db.collection('site');
  //查询数据
  var whereStr = {"name":'菜鸟教程'};
  collection.find(whereStr).toArray(function(err, result) {
    if(err)
    {
      console.log('Error:'+ err);
      return;
    }     
    callback(result);
  });
}

MongoClient.connect(DB_CONN_STR, function(err, db) {
  console.log("连接成功！");
  selectData(db, function(result) {
    console.log(result);
    db.close();
  });
});
执行以下命令输出就结果为：
连接成功！
[ { _id: 58c25f300cd56e0d7ddfc0c8,
    name: '菜鸟教程',
    url: 'www.runoob.com' } ]
更新数据
我们也可以对数据库的数据进行修改，以下实例将 name 为 "菜鸟教程" 的 url 改为 https://www.runoob.com：
var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/runoob';    

var updateData = function(db, callback) {  
    //连接到表  
    var collection = db.collection('site');
    //更新数据
    var whereStr = {"name":'菜鸟教程'};
    var updateStr = {$set: { "url" : "https://www.runoob.com" }};
    collection.update(whereStr,updateStr, function(err, result) {
        if(err)
        {
            console.log('Error:'+ err);
            return;
        }     
        callback(result);
    });
}

MongoClient.connect(DB_CONN_STR, function(err, db) {
    console.log("连接成功！");
    updateData(db, function(result) {
        console.log(result);
        db.close();
    });
});
执行成功后，进入 mongo 管理工具查看数据已修改：
> db.site.find()
{ "_id" : ObjectId("58c25f300cd56e0d7ddfc0c8"), "name" : "菜鸟教程", "url" : "https://www.runoob.com" }
{ "_id" : ObjectId("58c25f300cd56e0d7ddfc0c9"), "name" : "菜鸟工具", "url" : "c.runoob.com" }
删除数据
以下实例将 name 为 "菜鸟工具" 的数据删除 :
var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/runoob';    

var delData = function(db, callback) {  
  //连接到表  
  var collection = db.collection('site');
  //删除数据
  var whereStr = {"name":'菜鸟工具'};
  collection.remove(whereStr, function(err, result) {
    if(err)
    {
      console.log('Error:'+ err);
      return;
    }     
    callback(result);
  });
}

MongoClient.connect(DB_CONN_STR, function(err, db) {
  console.log("连接成功！");
  delData(db, function(result) {
    console.log(result);
    db.close();
  });
});
执行成功后，进入 mongo 管理工具查看数据已删除：
> db.site.find()
{ "_id" : ObjectId("58c25f300cd56e0d7ddfc0c8"), "name" : "菜鸟教程", "url" : "https://www.runoob.com" }
> 

模块机制

![x](./Resource/89.png)

在Node中引人模块，需要经历如下3个步骤：路径分析、文件定位、编译执行

![x](./Resource/90.png)


Node引人过的模块都会进行援存。以减少二次引入时的开销。不同的地方在于.浏览器仅仅缓存文件而Node缓存的是编译和执行之后的对象。
二次加载，缓存优先。核心模块的缀存检查先于文件模块的缓存检查。
模块标识符分析
核心模块	如http、fs、path。优先级仅次于缓存加载。自定义模块如果与核心模块标识符相同，想要加载成功必须使用路径方式。（要么换一个标识符）
路径形式文件模块	相对（.或..）、绝对（/）
自定义模块	特殊文件模块（一个文件或者包的形式）。加载最慢。从当前目录逐级向上查找，直到根目录。
文件定位细节：
文件扩展名	标识符中不含扩展名，按.js、.node、.json次序依次查找
目录分析和包	如果找到同名目录，会当作包来处理。
编译和执行是引入文件模块的最后一个阶段。定位到具体的文件后，Node会新建一个模块对象，然后根据路径载入并编译。对于不同的文件扩展名其载入方法也有所不同
	.js文件。通过fs模块同步读取文件后编译执行。
	.node文件。这是用C/C++描写的扩展文件，通过dlopen()方法加载最后编译生成的文件。
	.json文件。通过fs模块同步读取文件后，用JSON.parse()解析返回结果。
	其余扩展各立件。它们都被当做.js文件载入。
每一个编译成功的模块都会将其文件路径作为索引缓存在Module.cache对象上，以提高二次引入的性能。
根据不同的文件扩展名. Node会调用不同的读取方式，如.json文件调用如下：
// Native extension for .json
Module._extensions['.json'] = function(module, filename){
    var content = NativeModule.require('fs').readFileSync(filename, 'utf8');
    try{
        module.exports = JSON.parse(stripBOM(content));
    } catch (err) {
        err.message = filename + ': ' + err.message;
        throw err;  
    }
};
Module._extensions会被赋值给require()的extensions属性，所以通过在代码中访问require.extensions可以知道系统中已有的扩展加载方式。
如果想对自定义的扩展名进行特殊的加载，可以通过类似require.extensions['.ext']的方式实现。官方不鼓励通过这种方式来进行自定义扩展名的加载。而是期望先将其他语言或文件编译成JavaScript文件后再加载。这样做的好处在于不将烦琐的编译加载等过程引人Node的执行过程中。
在确定文件的扩展名之后。Node将调用具体的编译方式来将文件执行后返回给调用者。
	文件模块（自定义）编译
	javascript编译：Node对JS文件进行如下的头尾包装，这样每个模块文件都进行了作用域隔离
function(exports, require, module, _filename, _dirname) { 
    // js文件内容
}
	C/C++模块编译：Node调用process.dlopen()加载和执行。.node的模块文件不需要编译，只有加载和执行过程。
	JSON文件编译：Node利用fs模块同步读取JSON文件内容之后，调用JSON.parse()方法得到对象，然后赋值给模块对象的exports，供外部调用
	核心模块编译
Node的核心模块在编译成可执行文件的过程中被编译进了二进制文件。
	javascript：存放在lib目录下。用V8附带的js2c.py工具将javascript代码转换成C++的数组，在启动Node进程时，JS代码直接加载进内存。也经历头尾包装，与文件模块区别：核心模块是从内存加载的，编译成功的模块缓存在NativeModule._cache对象上，而文件模块缓则存在Module._cache对象上。
	C/C++：存放在src目录下。每一个内建模块（纯C/C++编写）在定义之后，都通过Node_MODULE宏定义到node命名空间中，模块的具体初始化方法加载为结构的register_func成员。node_extensions.h文件将这些散列的内建模块统一放进一个叫node_module_list的数组中。这些内建模块通过get_builtin_module()方法取出。Node启动时，会生成一个全局变量process，并提供Binding()方法协助加载内建模块。Binding()在src/node.cc中实现。
核心模块的引入流程：

![x](./Resource/91.png)



编写核心模块：
	编写头文件
	编写C/C++文件
	更改src/node_extensions.h（示例：在NODE_EXT_LIST_END前添加NODE_EXT_LIST_ITEM(node_hello)，将node_hello模块添加进node_module_list数组）
	让编写的代码编译进执行文件，同时更改Node项目生成文件node.gyp，在'target_name':'node'节点的sources中添加新文件，编译整个Node项目。
C/C++扩展模块：解决性能瓶颈
JS的典型弱点是位运算（参照Java，在int基础上执行，js只有double型数据类型，需要作转换再进行）。
模块调用栈：

![x](./Resource/92.png)

异步I/O

![x](./Resource/93.png)

轮询技术：
	read
	select
	poll
	epoll
	kqueue

异步编程
解决方案：
	事件发布/订阅模式
// 订阅
emitter.on("event1", function(message){
    console.log(message);
});
// 发布
emitter.emit('event1', "I am message!");
	Promise/Deferred模式
	流程控制库


Express.js是基于Node.js中http模块和Connect组件的Web框架。这些组件叫作中间件，它们是以约定大于配置原则作为开发的基础理念的。

## 参考

- [官网](https://nodejs.org/en/download/)
- [历史版本下载](https://nodejs.org/dist/)
- SQL Server连接
  - https://blogs.msdn.microsoft.com/sqlphp/2012/06/07/introducing-the-microsoft-driver-for-node-js-for-sql-server/
  - https://github.com/Azure/node-sqlserver
  - https://github.com/tediousjs/tedious
  - https://www.microsoft.com/en-us/sql-server/developer-get-started/
- MySQL连接
  - http://www.runoob.com/nodejs/nodejs-mysql.html

- [Mongoose基础入门](https://www.cnblogs.com/xiaohuochai/p/7215067.html)