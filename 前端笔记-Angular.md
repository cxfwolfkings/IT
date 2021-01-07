# 目录

1. [简介](#简介)
   - [禅道理念](#禅道理念)
   - [运行条件](#运行条件)
   - [Schematics代码生成器](#Schematics代码生成器)
   - [Workspace与多项目支持](#Workspace与多项目支持)
   - [Angular架构](#Angular架构)
   - [浏览器兼容性](#浏览器兼容性)
2. 实战
   - [创建项目示例](#创建项目示例)
   - [一些常见的坑](#一些常见的坑)
   - [组件](#组件)
   - [模板](#模板)
   - [Mustache语法](#Mustache语法)
   - [值绑定](#值绑定)
   - [事件绑定](#事件绑定)
   - [双向绑定](#双向绑定)
   - [在模板里面使用结构型指令](#在模板里面使用结构型指令)
   - [在模板里面使用属性型指令](#在模板里面使用属性型指令)
   - [管道](#管道)
   - [组件通讯](#组件通讯)
   - [生命周期钩子](#生命周期钩子)
   - [OnPush策略](#OnPush策略)
   - [动效](#动效)
   - [动态组件](#动态组件)
   - [ShadowDOM](#ShadowDOM)
   - [内容投影](#内容投影)
   - [封装并发布你自己的组件库](#封装并发布你自己的组件库)
   - [元数据(Metadata)](#元数据(Metadata))
   - [构建](#构建)
3. 总结
   - [环境变量](#环境变量)
4. 参考



## 简介

Angular 是 Google 开源出来的一套 js 工具，简称为 ng。

### 禅道理念

Angular信奉的是，当组建视图(UI)同时又要写软件逻辑时，声明式的代码会比命令式的代码好得多，尽管命令式的代码非常适合用来表述业务逻辑。

- 将 DOM 操作和应用逻辑解耦是一种非常好的思路，它能大大改善代码的可调性；
- 将 **测试** 和 **开发** 同等看待是一种非常非常好的思路，测试的难度在很大程度上取决于代码的结构；
- 将客户端和服务器端解耦是一种特别好的做法，它能使两边并行开发，并且使两边代码都能实现重用；
- 如果框架能够在整个开发流程里都引导着开发者：从设计UI，到编写业务逻辑，再到测试，那对开发者将是极大的帮助；
- “化繁为简，化简为零”总是好的。

### 运行条件

由于目前各种环境（浏览器或 Node）暂不支持 ES6 的代码，所以需要一些 shim 和 polyfill（IE需要）让 ES6 写的代码能够转化为 ES5 形式并可以正常运行在浏览器中。

![x](http://wxdhhg.cn/wordpress/wp-content/uploads/2020/04/toolchain.jpg)

从上图可以看出在 Es5 浏览器下需要以下模块加载器：

- systemjs - 通用模块加载器，支持AMD、CommonJS、ES6等各种格式的JS模块加载。
- es6-module-loader - ES6模块加载器，systemjs会自动加载这个模块。
- traceur - ES6转码器，将ES6代码转换为当前浏览器支持的ES5代码，systemjs会自动加载 这个模块。

如果你用过其他前端框架的话，就知道手动配置这些东西有多痛苦了，那一坨配置文件没有半天功夫是搞不定的。Angular 项目组从一开始就注意到了这个问题，因此有了 @angular/cli 这个神器

```sh
npm i -g cnpm --registry=https://registry.npm.taobao.org
cnpm i -g @angular/cli
```

`cnpm` 是淘宝发布的一款工具，会自动把 `npm` 上面的所有包定时同步到国内的服务器上来（目前大约 10 分钟全量同步一次），`cnpm` 本身也是一款 Node.js 模块。由于 `cnpm` 的服务器在国内，因而中文开发者用它装东西比较快。除了定时同步 `npm` 模块之外，`cnpm` 还做了一些其他的事情，比如把某些包预先编译好了缓存在服务器上，这样就不用拉源码到你本地进行编译了。有人抱怨使用 `cnpm` 安装的目录结构和 `npm` 不同，包括还有其他一些小坑，如果你非常在意这些，可以使用 `nrm` 来管理多个 `registry`。`nrm` 本身也是一个 Node.js 模块，你可以这样安装：

```sh
npm i -g nrm
```

然后你就可以用 `nrm` 来随时切换 `registry` 了，比如：

```sh
nrm use cnpm
```

`@angular/cli` 安装成功之后你的终端里面将会多出一个名叫 ng 的命令

![x](http://wxdhhg.cn/wordpress/wp-content/uploads/2020/04/ng命令.png)

6.0 的时候 @angular/cli 新增了一个命令 ng add。

```sh
ng add @angular/material
```

### Schematics代码生成器

`@angular/cli` 内部用来自动生成代码的工具叫做 Schematics ：当我们使用 `ng g c \<组件名>` 的时候，它实际上调用了底层的 Schematics 来生成组件对应的 4 个文件。

Schematics 是框架无关的，它可以脱离 Angular 环境使用，因此你也可以把它单独拿出来，用来自动生成其他框架的代码。为了演示自定义 Schematic 的方法，请看运行效果：

![x](http://wxdhhg.cn/wordpress/wp-content/uploads/2020/04/Schematics运行效果.gif)

**请特别注意：由于 `@angular/schematics` 是 cli 工具的组成部分，它的版本号与 cli 之间有对应关系。因此，如果你不确定对应关系是什么，请不要修改示例项目中的 package.json！**

你可以利用 Schematics 来创建自己的代码生成器，可以参考以下步骤：

- `npm i -g @angular-devkit/schematics-cli`
- 用 schematics 命令创建一个新项目 `schematics blank --name=learn-schematics`
- 创建 schema.json 和 schema.ts 接口，修改 collection.json，指向自己创建的 shema.json 配置文件
- 修改 index.ts ，加一些生成代码的逻辑，可以参考 @angluar/cli 内部的代码
- 创建 files 目录和模板文件，目录名和文件名本身也可以参数化
- 构建项目：npm run build
- 链接到全局，方便本地调试：npm link
- 准备测试 schema ，用 @angular/cli 创建一个全新的项目 test-learn-schematics 并装好依赖。cd 到新项目 test-learn-schematics，链接 npm link learn-schematics，然后尝试用我们自定义的规则来生成一个组件 ng g my-component My --service --name="damo" --collection learn-schematics --force

### Workspace与多项目支持

从 6.0 开始，`@angular/cli` 支持 workspace 特性，之所以能支持 workspace，也是因为背后有 Schematics 这个底层的工具。

有了 workspace 这个机制之后，可以在一个项目里面配置多个子项目，cli 会根据里面的配置进行依赖管理、校验、编译等等操作。

### Angular架构

![x](http://wxdhhg.cn/wordpress/wp-content/uploads/2020/04/overview2.png)

**核心概念模型：**

![x](http://wxdhhg.cn/wordpress/wp-content/uploads/2020/04/Angular的核心概念模型.png)

- **Component**（组件）是整个框架的核心，也是终极目标。“组件化”的意义有 2 个：第一是分治，因为有了组件之后，我们可以把各种逻辑封装在组件内部，避免混在一起；第二是复用，封装成组件之后不仅可以在项目内部复用，而且可以沉淀下来跨项目复用。
- **NgModule**（模块）是组织业务代码的利器，按照你自己的业务场景，把组件、服务、路由打包到模块里面，形成一个个的积木块，然后再用这些积木块来搭建出高楼大厦。
- **Router**（路由）的角色也非常重要，它有 3 个重要的作用：第一是封装浏览器的 History 操作；第二是负责异步模块的加载；第三是管理组件的生命周期。

### 浏览器兼容性

![x](http://wxdhhg.cn/wordpress/wp-content/uploads/2020/04/Angular的浏览器兼容性.png)

数据来源：[http://gs.statcounter.com/browser-market-share](http://gs.statcounter.com/browser-market-share)

## 实战

### 创建项目示例

创建项目 beauty（真美），请在你的终端里面运行：

```sh
ng new beauty
```

>**注意**：@angular/cli 在自动生成好项目骨架之后，会立即自动使用 `npm` 来安装所依赖的 Node 模块，因此这里我们要 Ctrl+C 终止掉，然后自己进入项目的根目录，使用 `cnpm` 来进行安装。

安装完成之后，使用 `ng serve` 命令启动项目

**请注意以下几点：**

- 如果你需要修改端口号，可以用 `ng serve --port ****` 来进行指定。
- `ng serve --open` 可以自动打开你默认的浏览器。
- 如果你想让编译的包更小一些，可以使用 `ng serve --prod`，@angular/cli 会启用 TreeShaking 特性，加了参数之后编译的过程也会慢很多。因此，在正常的开发过程里面请不要加 --prod 参数。
- `ng serve` 是在内存里面生成项目，如果你想看到项目编译之后的产物，请运行 `ng build`。构建最终产品版本可以加参数，`ng build --prod`。

`ng` 提供了很多非常好用的工具，除了可以利用 `ng new` 来自动创建项目骨架之外，它还可以帮助我们创建 Angular 里面所涉及到的很多模块，最常用的几个如下。

- 自动创建组件：`ng generate component MyComponent`，可以简写成 `ng g c MyComponent`。创建组件的时候也可以带路径，如 `ng generate component mydir/MyComponent`
- 自动创建指令：`ng g d MyDirective`
- 自动创建服务：`ng g s MyService`
- 构建项目：`ng build`，如果你想构建最终的产品版本，可以用 `ng build --prod`

更多的命令和参数请在终端里面敲 `ng g --help` 仔细查看，尽快熟悉这些工具可以非常显著地提升你的编码效率。

### 一些常见的坑

@angular/cli 这种“全家桶”式的设计带来了很大的方便，同时也有一些人不太喜欢，因为很多底层的东西被屏蔽掉了，开发者不能天马行空地自由发挥。比如，@angular/cli 把底层 webpack 的配置文件屏蔽掉了，很多喜欢自己手动配 webpack 的开发者就感到很不爽。

对于国内的开发者来说，上面这些其实不是最重要的，国内开发者碰到的坑主要是由两点引起的：

- 第一点是网络问题，比如 `node-sass` 这个模块你很有可能就安装不上，原因你懂的；
- 第二点是开发环境导致的问题，国内使用 Windows 平台的开发者比例依然巨大，而 `@angular/cli` 在 Windows 平台上有一些非常恶心的依赖，比如它需要依赖 Python 环境、Visual Studio 环境，这是因为某些 Node.js 的模块需要下载到你的本地进行源码编译。

因此，如果你的开发平台是 Windows，请特别注意：

- 如果你知道如何给 `npm` 配置代理，也知道如何翻墙，请首选 `npm` 来安装`@angular/cli`。
- 否则，请使用 `cnpm` 来安装 `@angular/cli`，原因有三：（1）`cnpm` 的缓存服务器在国内，你装东西的速度会快很多；（2）用 `cnpm` 可以帮你避开某些模块装不上的问题，因为它在服务器上面做了缓存；（3）`cnpm` 还把一些包都预编译好了缓存在服务端，比如 `node-sass`。使用 `cnpm` 不需要在你本地进行源码编译，因此你的机器上可以没有那一大堆麻烦的环境。
- 推荐装一个 `nrm` 来自动切换 registry：`npm i -g nrm`。
- 如果 cli 安装失败，请手动把 node_modules 目录删掉重试一遍，全局的 `@angular/cli` 也需要删掉重装，`cnpm uninstall -g @angular/cli`。
- 如果 node_modules 删不掉，爆出路径过长之类的错误，请尝试用一些文件粉碎机之类的工具强行删除。这是 npm 的锅，与 Angular 无关。
- 最新版本的 `@angular/cli` 经常会有 bug，尤其是在 Windows 平台上面，因此请不要追新版本追太紧。如果你发现了莫名其妙的问题，请尝试降低一个主版本试试。这一点非常重要，很多初学者会非常困惑，代码什么都没改，就升级了一下环境，然后就各种编译报错。如果你愿意，去官方提 issue 是个很不错的办法。
- 对于 MAC 用户或者 *nix 用户，请特别注意权限问题，命令前面最好加上 sudo，保证有 root 权限。
- 无论你用什么开发环境，安装的过程中请仔细看 log。很多朋友没有看 log 的习惯，报错的时候直接懵掉，根本不知道发生了什么。

### 组件

```js
import { Component } from '@angular/core';

/**
 * @Component 是一个 Decorator（装饰器），其作用类似于 Java 里面的 Annotation（注解）。
 * selector：组件的标签名，外部使用者可以这样来使用以上组件：<app-root>。默认情况下，ng 命令生成出来的组件都会带上一个 app 前缀，如果你不喜欢，可以在 angular-cli.json 里面修改 prefix 配置项，设置为空字符串将会不带任何前缀。
 * templateUrl：引用外部 HTML 模板。如果你想直接编写内联模板，可以使用 template，支持 ES6 引入的“模板字符串”写法。
 * styleUrls：引用外部 CSS 样式文件，这是一个数组，也就意味着可以引用多份 CSS 文件
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { // 这是 ES6 里面引入的模块和 class 定义方式
  title = 'beauty';
}
```

- 组件是一个模板的控制类用于处理应用和逻辑页面的视图部分。
- 组件是构成 Angular 应用的基础和核心，可用于整个应用程序中。
- 组件知道如何渲染自己及配置依赖注入。
- 组件通过一些由属性和方法组成的 API 与视图交互。

创建 Angular 组件的方法有三步：

1. 从 `@angular/core` 中引入 `Component` 修饰器
2. 建立一个普通的类，并用 `@Component` 修饰它
3. 在 `@Component` 中，设置 `selector` 自定义标签，以及 `template` 模板

**把CSS预编译器改成SASS**

`SASS` 是一款非常好用的 `CSS` 预编译器，Bootstrap 官方从 4.0 开始已经切换到了 `SASS`。

1、创建项目的时候指定

2、手动修改

- angular-cli.json 里面的 styleExt 改成 scss
- angular-cli.json 里面的 styles.css 后缀改成 .scss
- src 下面 style.css 改成 style.scss
- app.component.scss，app.component.ts 里面对应修改

`SASS` 只是一个预编译器，它支持所有 `CSS` 原生语法。利用 `SASS` 可以提升你的 `CSS` 编码效率，增强 `CSS` 代码的可维护性，但是千万不要幻想从此就可以不用学习 `CSS` 基础知识了。

### 模板

模板是编写 Angular 组件最重要的一环，你必须深入理解以下知识点才能玩转 Angular 模板：

- 对比各种 JS 模板引擎的设计思路
- Mustache（八字胡）语法
- 模板内的局部变量
- 属性绑定、事件绑定、双向绑定
- 在模板里面使用结构型指令 `*ngIf`、`*ngFor`、`ngSwitch`
- 在模板里面使用属性型指令 `NgClass`、`NgStyle`、`NgModel`
- 在模板里面使用管道格式化数据
- 一些小 feature：安全导航、非空断言

>“深入理解”的含义是：你需要很自如地运用这些 API，写代码的时候不翻阅 API 文档。因为很多新手之所以编码效率不高，其中一个主要的原因就是在编码过程中不停翻文档、查资料。

**对比各种 JS 模板引擎的设计思路**

几乎每一款前端框架都会提供自己的模板语法：

- 在 jQuery 如日中天的时代，有 `Handlebars` 那种功能超强的模板
- React 推崇 JSX 模板语法
- 当然还有 Angular 提供的那种与“指令”紧密结合的模板语法

综合来说，无论是哪一种前端模板，大家都比较推崇“轻逻辑”（logic-less）的设计思路。

**何为“轻逻辑”？**

简而言之，所谓“轻逻辑”就是说，你不能在模板里面编写非常复杂的 JavaScript 表达式。比如，Angular 的模板语法就有规定：

- 你不能在模板里面 new 对象
- 不能使用 =、+=、-= 这类的表达式
- 不能用 ++、-- 运算符
- 不能使用位运算符

**为什么要“轻逻辑”？**

>最重要的原因是怕影响运行性能，因为模板可能会被执行很多次。

比如你编写了以下 Angular 模板：

```html
<ul>
  <li *ngFor="let race of races">
    {{race.name}}
  </li>
</ul>
```

很明显，浏览器不认识 `*ngFor` 和 `{{...}}` 这种语法，因此必须在浏览器里面进行“编译”，获得对应的模板函数，然后再把数据传递给模板函数，最终结合起来获得一堆 HTML 标签，然后才能把这一堆标签插入到 DOM 树里面去。

如果启用了 AOT，处理的步骤有一些变化，`@angular/cli` 会对模板进行“静态编译”，避免在浏览器里面动态编译的过程。

而 Handlebars 这种模板引擎完全是运行时编译模板字符串的，你可以编写以下代码：

```js
// 定义模板字符串
var source=`
<ul>
  {{#each races}}
    <li>{{name}}</li>
  {{/each}}
</ul>
`;

// 在运行时把模板字符串编译成 JS 函数
var templateFn=Handlebars.compile(source);

// 把数据传给模板函数，获得最终的 HTML
var html=templateFn([
  {name:'人族'},
  {name:'神族'},
  {name:'虫族'}
]);
```

注意到 `Handlebars.compile` 这个调用了吧？这个地方的本质是在运行时把模板字符串“编译”成了一个 JS 函数。

鉴于 JS 解释执行的特性，你可能会担忧这里会有性能问题。这种担忧是合理的，但是 Handlebars 是一款非常优秀的模板引擎，它在内部做了各种优化和缓存处理。模板字符串一般只会在第一次被调用的时候编译一次，Handlebars 会把编译好的函数缓存起来，后面再次调用的时候会从缓存里面获取，而不会多次进行“编译”。

上面我们多次提到了“编译”这个词，因此很显然这里有一个东西是无法避免的，那就是我们必须提供一个 JS 版的“编译器”，让这个“编译器”运行在浏览器里面，这样才能在运行时把用户编写的模板字符串“编译”成模板函数。

有一些模板引擎会真的去用 JS 编写一款“编译器”出来，比如 Angular 和 Handlebars，它们都真的编写了一款 JS（TS）版的编译器。而有一些简单的模板引擎，例如 Underscore 里面的模板函数，只是用正则表达式做了字符串替换而已，显得特别简陋。这种简陋的模板引擎对模板的写法有非常多的限制，因为它不是真正的编译器，能支持的语法特性非常有限。

因此，评估一款模板引擎的强弱，最核心的东西就是评估它的“编译器”做得怎么样。但是不管怎么说，毕竟是 JS 版的“编译器”，我们不可能把它做得像 G++ 那么强大，也没有必要做得那么强大，因为这个 JS 版的编译器需要在浏览器里面运行，搞得太复杂浏览器拖不动！

以上就是为什么大多数模板引擎都要强调“轻逻辑”的最根本原因。

对于 Angular 来说，强调“轻逻辑”还有另一个原因：在组件的整个生命周期里面，模板函数会被执行很多次。你可以想象，Angular 每次要刷新组件外观的时候，都需要去调用一下模板函数，如果你在模板里面编写了非常复杂的代码，一定会增加渲染时间，用户一定会感到界面有“卡顿”。

人眼的视觉延迟大约是 100ms 到 400ms 之间，如果整个页面的渲染时间超过 400ms，界面基本上就卡得没法用了。有一些做游戏的开发者会追求 60fps 刷新率的细腻感觉，60 分之 1 秒约等于 16.7ms，如果 UI 整体的渲染时间超过了 16.7ms，就没法达到这个要求了。

轻逻辑（logic-less）带来了效率的提升，也带来了一些不方便，比如很多模板引擎都实现了 if 语句，但是没有实现 else，因此开发者们在编写复杂业务逻辑的时候模板代码会显得非常啰嗦。

目前来说，并没有完美的方案能同时兼顾运行效率和语法表现能力，这里只能取一个平衡。

### Mustache语法

Mustache 语法也就是你们说的双花括号语法 `{{...}}`，老外觉得它像八字胡子，很奇怪啊，难道老外喜欢侧着头看东西？

好消息是，很多模板引擎都接受了 Mustache 语法，这样一来学习量又降低了不少，开心吧？

关于 Mustache 语法，你需要掌握 3 点：

- 它可以获取到组件里面定义的属性值
- 它可以自动计算简单的数学表达式，如加减乘除、取模
- 它可以获得方法的返回值

**模板内的局部变量**

```html
<input #heroInput>
<p>{{heroInput.value}}</p>
```

有一些朋友会追问，如果我在模板里面定义的局部变量和组件内部的属性重名会怎么样呢？如果真的出现了重名，Angular 会按照以下优先级来进行处理：

>模板局部变量 > 指令中的同名变量 > 组件中的同名属性。

### 值绑定

方括号

```html
<img [src]="imgSrc" />
```

```js
public imgSrc:string="./assets/imgs/1.jpg";
```

很明显，这种绑定是单向的。

### 事件绑定

圆括号

```html
<button class="btn btn-success" (click)="btnClick($event)">测试事件</button>
```

```js
public btnClick(event):void{
  alert("测试事件绑定！");
}
```

### 双向绑定

方括号里面套一个圆括号

```html
<font-resizer [(size)]="fontSizePx"></font-resizer>
```

```js
public fontSizePx:number=14;
```

AngularJS 是第一个把“双向数据绑定”这个特性带到前端来的框架，这也是 AngularJS 当年最受开发者追捧的特性之一。

根据 AngularJS 团队当年讲的故事，“双向数据绑定”这个特性可以大幅度压缩前端代码的规模。大家可以回想一下 jQuery 时代的做法，如果要实现类似的效果，是不是要自己去编写大量的代码？尤其是那种大规模的表单，一大堆的赋值和取值操作，都是非常丑陋的“面条”代码，而有了“双向数据绑定”特性之后，一个绑定表达式就搞定。

目前，主流的几款前端框架都已经接受了“双向数据绑定”这个特性。

当然，也有一些人不喜欢“双向数据绑定”，还有人专门写了文章来进行批判，也算是前端一景。

### 在模板里面使用结构型指令

Angular 有 3 个内置的结构型指令：`*ngIf`、`*ngFor`、`ngSwitch`。`ngSwitch` 的语法比较啰嗦，使用频率小一些。

>特别注意：一个 HTML 标签上只能同时使用一个结构型的指令。

因为“结构型”指令会修改 DOM 结构，如果在一个标签上使用多个结构型指令，大家都一起去修改 DOM 结构，到时候到底谁说了算？

那么需要在同一个 HTML 上使用多个结构型指令应该怎么办呢？有两个办法：

- 加一层空的 `div` 标签
- 加一层 `<ng-container>`

### 在模板里面使用属性型指令

使用频率比较高的 3 个内置指令是：`NgClass`、`NgStyle`、`NgModel`。

`NgClass` 使用案例代码：

```html
<div [ngClass]="currentClasses">同时批量设置多个样式</div>
<button class="btn btn-success" (click)="setCurrentClasses()">设置</button>
```

```ts
public currentClasses: {};

public canSave: boolean = true;
public isUnchanged: boolean = true;
public isSpecial: boolean = true;

setCurrentClasses() {
  this.currentClasses = {
    'saveable': this.canSave,
    'modified': this.isUnchanged,
    'special': this.isSpecial
  };
}
```

```css
.saveable{
  font-size: 18px;
}
.modified {
  font-weight: bold;
}
.special{
  background-color: #ff3300;
}
```

`NgStyle` 使用案例代码：

```html
<div [ngStyle]="currentStyles">
  用NgStyle批量修改内联样式！
</div>
<button class="btn btn-success" (click)="setCurrentStyles()">设置</button>
```

```js
public currentStyles: {}
public canSave:boolean=false;
public isUnchanged:boolean=false;
public isSpecial:boolean=false;

setCurrentStyles() {
  this.currentStyles = {
    'font-style':  this.canSave      ? 'italic' : 'normal',
    'font-weight': !this.isUnchanged ? 'bold'   : 'normal',
    'font-size':   this.isSpecial    ? '36px'   : '12px'
  };
}
```

`ngStyle` 这种方式相当于在代码里面写 `CSS` 样式，比较丑陋，违反了注意点分离的原则，而且将来不太好修改，非常不建议这样写。

`NgModel` 使用案例代码：

```html
<p class="text-danger">ngModel只能用在表单类的元素上面</p>
  <input [(ngModel)]="currentRace.name">
<p>{{currentRace.name}}</p>
```

```js
public currentRace:any={name:"随机种族"};
```

>请注意，如果你需要使用 `NgModel` 来进行双向数据绑定，必须要在对应的模块里面 `import FormsModule`。

### 管道

管道的一个典型作用是用来格式化数据，来一个最简单的例子：

```html
{{currentTime | date:'yyyy-MM-dd HH:mm:ss'}}
```

```ts
public currentTime: Date = new Date();
```

Angular 里面一共内置了 17 个指令（有一些已经过时了）：

![x](./Resources/Angular管道指令.png)

在复杂的业务场景里面，17 个指令肯定不够用，如果需要自定义指令，请查看这里的例子：[https://angular.io/guide/pipes](https://angular.io/guide/pipes)。

管道还有另一个典型的作用，就是用来做国际化，后面有一个独立的小节专门演示 Angular 的国际化写法。

### 组件通讯

组件就像零散的积木，我们需要把这些积木按照一定的规则拼装起来，而且要让它们互相之间能进行通讯，这样才能构成一个有机的完整系统。

在真实的应用中，组件最终会构成树形结构，就像人类社会中的家族树一样：

![x](http://wxdhhg.cn/wordpress/wp-content/uploads/2020/04/组件树.png)

在树形结构里面，组件之间有几种典型的关系：父子关系、兄弟关系、没有直接关系。

相应地，组件之间有以下几种典型的通讯方案：

- 直接的父子关系：父组件直接访问子组件的 `public` 属性和方法
- 直接的父子关系：借助于 `@Input` 和 `@Output` 进行通讯
- 没有直接关系：借助于 `Service` 单例进行通讯
- 利用 `cookie` 和 `localstorage` 进行通讯
- 利用 `session` 进行通讯

无论你使用什么前端框架，组件之间的通讯都离开不以上几种方案，这些方案与具体框架无关。

**直接调用**

对于有直接父子关系的组件，父组件可以直接访问子组件里面 `public` 型的属性和方法，示例代码片段如下：

```html
<child #child></child>
<button (click)="child.childFn()" class="btn btn-success">调用子组件方法</button>
```

显然，子组件里面必须暴露一个 `public` 型的 `childFn` 方法，就像这样：

```ts
public childFn():void{
  console.log("子组件的名字是>" + this.panelTitle);
}
```

以上是通过在模板里面定义局部变量的方式来直接调用子组件里面的 `public` 型方法。在父组件的内部也可以访问到子组件的实例，需要利用到 `@ViewChild` 装饰器，示例如下：

```ts
@ViewChild(ChildComponent)
private childComponent: ChildComponent;
```

关于 `@ViewChild` 在后面的内容里面会有更详细的解释。

很明显，如果父组件直接访问子组件，那么两个组件之间的关系就被固定死了。父子两个组件紧密依赖，谁也离不开谁，也就都不能单独使用了。所以，除非你知道自己在做什么，最好不要直接在父组件里面直接访问子组件上的属性和方法，以免未来一改一大片。

**@Input 和 @Output**

我们可以利用 `@Input` 装饰器，让父组件直接给子组件传递参数，子组件上这样写：

```ts
@Input()
public panelTitle:string;
```

父组件上可以这样设置 `panelTitle` 这个参数：

```html
<child panelTitle="一个新的标题"></child>
```

`@Output` 的本质是事件机制，我们可以利用它来监听子组件上派发的事件，子组件上这样写：

```ts
@Output()
public follow = new EventEmitter<string>();
```

触发 `follow` 事件的方式如下：

```ts
this.follow.emit("follow");
```

父组件上可以这样监听 `follow` 事件：

```html
<child (follow)="doSomething()"></child>
```

我们可以利用 `@Output` 来自定义事件，监听自定义事件的方式也是通过小圆括号，与监听 HTML 原生事件的方式一模一样。

**利用 `Service` 单例进行通讯**

![x](http://wxdhhg.cn/wordpress/wp-content/uploads/2020/04/利用Service单例进行通讯.png)

如果你在根模块（一般是 `app.module.ts`）的 `providers` 里面注册一个 `Service`，那么这个 `Service` 就是全局单例的，这样一来我们就可以利用这个单例的 `Service` 在不同的组件之间进行通讯了。

- 比较粗暴的方式：我们可以在 `Service` 里面定义 `public` 型的共享变量，然后让不同的组件都来访问这块变量，从而达到共享数据的目的。
- 优雅一点的方式：利用 `RxJS`，在 `Service` 里面定义一个 `public` 型的 `Subject`（主题），然后让所有组件都来 `subscribe`（订阅）这个主题，类似于一种“事件总线”的效果。

实例代码片段：

```ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

/**
 * 用来充当事件总线的 Service
 */
@Injectable()
export class EventBusService {
  public eventBus:Subject<string> = new Subject<string>();
  constructor() { }
}
```

触发组件：

```ts
import { Component, OnInit } from '@angular/core';
import { EventBusService } from '../service/event-bus.service';

@Component({
  selector: 'child-1',
  templateUrl: './child-1.component.html',
  styleUrls: ['./child-1.component.css']
})
export class Child1Component implements OnInit {
  constructor(public eventBusService:EventBusService) { }

  ngOnInit() {
  }

  public triggerEventBus():void{
    this.eventBusService.eventBus.next("第一个组件触发的事件");
  }
}
```

订阅组件：

```ts
import { Component, OnInit } from '@angular/core';
import { EventBusService } from '../service/event-bus.service';

@Component({
  selector: 'child-2',
  templateUrl: './child-2.component.html',
  styleUrls: ['./child-2.component.css']
})
export class Child2Component implements OnInit {
  public events:Array<any>=[];

  constructor(public eventBusService:EventBusService) { }

  ngOnInit() {
    this.eventBusService.eventBus.subscribe((value)=>{
      this.events.push(value+"-"+new Date());
    });
  }
}
```

**利用 cookie 或者 localstorage 进行通讯**

![x](http://wxdhhg.cn/wordpress/wp-content/uploads/2020/04/利用cookie或者localstorage进行通讯.png)

```ts
public writeData():void {
  window.localStorage.setItem("json", JSON.stringify({ name:'大漠穷秋', age:18 }));
}
```

```ts
var json = window.localStorage.getItem("json");
// window.localStorage.removeItem("json");
var obj = JSON.parse(json);
console.log(obj.name);
console.log(obj.age);
```

**利用 session 进行通讯**

![x](http://wxdhhg.cn/wordpress/wp-content/uploads/2020/04/利用session进行通讯.png)

**小结**

组件间的通讯方案是通用的，无论你使用什么样的前端框架，都会面临这个问题，而解决的方案无外乎本文所列出的几种。

### 生命周期钩子

参考：[https://angular.io/guide/lifecycle-hooks](https://angular.io/guide/lifecycle-hooks)

我们只讨论以下 4 件事：

1. 什么是 UI 组件的生命周期？
2. Angular 组件的生命周期有什么特别的地方？
3. `OnPush` 策略的使用方式。
4. 简要介绍脏检查的实现原理。

**UI组件的生命周期**

![x](http://wxdhhg.cn/wordpress/wp-content/uploads/2020/04/UI组件的生命周期.png)

无论使用什么样的前端框架，只要编写 UI 组件，生命周期都是必须要考虑的重要内容。请展开你的想象，如果让你来设计 UI 系统，组件有几个重要的阶段一定是绕不开的，比如：

- **初始化**（init）阶段：在这个阶段你需要把组件 `new` 出来，把一些属性设置上去，等等这些操作。
- **渲染**（render）阶段：在这个阶段需你要把组件的模板和数据结合起来，生成 `HTML` 标签结构，并且要整合到现有的 `DOM` 树里面去。
- **存活**阶段：既然带有 UI，那么在组件的存活期内就一定会和用户进行交互。一般来说，带有 UI 的系统都是通过事件机制进行用户交互的。也就是说，这个阶段将会处理大量的用户事件：鼠标点击、键盘按键、手指触摸。
- **销毁**（destory）阶段：最后，组件使用完了，需要把一些资源释放掉。最典型的操作：需要把组件上的所有事件全部清理干净，避免造成内存泄漏。

在组件生命的不同阶段，框架一般会暴露出一些“接口”，开发者可以利用这些接口来实现一些自己的业务逻辑。这种接口在有些框架里面叫做“事件”，在 Angular 里面叫做“钩子”，但其底层的本质都是一样的。

**Angular组件的生命周期钩子**

![x](http://wxdhhg.cn/wordpress/wp-content/uploads/2020/04/Angular组件的生命周期钩子.png)

- Angular 一共暴露了 8 个“钩子”，构造函数不算。
- 并没有组件或者指令会实现全部钩子。
- 绿色的 1357 会被执行很多次，2468 只会执行一次。
- Content 和 View 相关的 4 个钩子只对组件有效，指令上不能使用。因为在新版本的 Angular 里面，指令不能带有 HTML 模板。指令没有自己的 UI，当然就没有 View 和 Content 相关的“钩子”了。
- 请不要在生命周期钩子里面实现复杂的业务逻辑，尤其是那 4 个会被反复执行的钩子，否则一定会造成界面卡顿。
- 对于 `@Input` 型的属性，在构造函数里面是取不到值的，在 `ngOnInit` 里面才有值。
- 在 `ngAfterViewChecked` 这个钩子里面不可以再修改组件内部被绑定的值，否则会抛出异常。

>特别注意：对于业务开发者来说，一般只用到 `ngOnInit` 这个钩子，其它几个钩子在日常业务开发中是用不到的。

### OnPush策略

在真实的业务系统中，组件会构成 Tree 型结构，就像这样：

![x](http://wxdhhg.cn/wordpress/wp-content/uploads/2020/04/Tree型结构.png)

当某个叶子组件上的数据模型发生变化之后，就像这样：

![x](http://wxdhhg.cn/wordpress/wp-content/uploads/2020/04/数据模型发生变化.png)

>这时候，Angular 将会从根组件开始，遍历整颗组件树，把所有组件上的 `ngDoCheck()` 方法都调用一遍。
>
>请注意，默认情况下，无论哪个叶子组件上发生了变化，都会把整个组件树遍历一遍。如果组件树非常庞大，嵌套非常深，很明显会有效率问题。在绝大部分时间里面，并不会出现每个组件都需要刷新的情况，根本没有必要每次都去全部遍历。所以 Angular 提供了一种叫做 `OnPush` 的策略，只要把某个组件上的检测策略设置为 `OnPush`，就可以忽略整个子树了，就像这样：

![x](http://wxdhhg.cn/wordpress/wp-content/uploads/2020/04/OnPush.png)

很明显，使用了 `OnPush` 策略之后，检查效率将会获得大幅度的提升，尤其在组件的数量非常多的情况下：

Angular 内置的两种变更检测策略：

- `Default`：无论哪个组件发生了变化，从根组件开始全局遍历，调用每个组件上的 `ngDoCheck()` 钩子。
- `OnPush`：只有当组件的 `@Input` 属性发生变化的时候才调用本组件的 `ngDoCheck()` 钩子。

有一些开发者建议 Angular 项目组把 `OnPush` 作为默认策略，但是目前还没有得到官方支持，或许在未来的某个版本里面会进行修改。

**了解一点点原理**

大家都知道，AngularJS 是第一个把“双向数据绑定”这种设计带到前端领域来的框架，“双向数据绑定”最典型的场景就是对表单的处理。

双向数据绑定的目标很明确：数据模型发生变化之后，界面可以自动刷新；用户修改了界面上的内容之后，数据模型也会发生自动修改。

很明显，这里需要一种同步机制，在 Angular 里面这种同步机制叫做“变更检测”。

在老版本 AgnularJS 里面，变更检测机制实现得不太完善，经常会出现检测不到变更的情况，所以才有了让大家很厌烦的 `$apply()` 调用。

在新版本的 Angular 里面不再存在这个问题了，因为新版本的 Angular 使用 `Zone.js` 这个库，它会把所有可能导致数据模型发生变更的情况全部拦截掉，从而在数据发生变化的时候去通知 Angular 进行刷新。

有一些朋友可能会觉得奇怪，`Zone.js` 怎么这么牛叉？它内部到底是怎么玩的呢？

实际上要做到这一点并不复杂，因为在浏览器环境下，有可能导致数据模型发生变化的情况只有 3 种典型的回调：

1. 事件回调：鼠标、键盘、触摸
2. 定时器回调：`setTimeout` 和 `setInterval`
3. Ajax 回调

Zone.js 覆盖了所有原生实现，当开发者在调用这些函数的时候，并不是调用的原生方法，而是调用的 Zone.js 自己的实现，因此 Zone.js 就可以做一些自己的处理了。

也就是说 Zone.js 会负责通知 Angular：“数据模型发生变化了”！然后 Angular 的 `ChangeDetector` 就会在下一次 **dirty check** 的周期里面来检查哪些组件上的值发生了变化，然后做出相应的处理。

如果你的好奇心特别旺盛，这里有一篇非常长的[文章](https://blog.thoughtram.io/angular/2016/02/22/angular-2-change-detection-explained.html)，大约二十多页，详细解释了这一话题。

### 动效

Angular 默认的动画模块使用的是 Web Animations 规范，这个规范目前处于 Editor's Draft 状态(2017-09-22)，详情请看[这里](https://drafts.csswg.org/web-animations/)

目前，各大浏览器厂商对 Web Animations 规范的支持并不好

![x](http://wxdhhg.cn/wordpress/wp-content/uploads/2020/04/WebAnimations规范的支持.png)

图片来自：[http://caniuse.com/#feat=web-animation](http://caniuse.com/#feat=web-animation)

Web Animations 这套新的规范在 FireFox、Chrome、Opera 里面得到了完整的支持，而其它所有浏览器内核几乎都完全不支持，所以请慎重选择。我的建议是，请优先使用 CSS3 规范里面的 anmimation 方案

**用法示范**

第一步，导入动画模块：

![x](http://wxdhhg.cn/wordpress/wp-content/uploads/2020/04/导入动画模块.png)

第二步，编写动效：

![x](http://wxdhhg.cn/wordpress/wp-content/uploads/2020/04/编写动效.png)

`flyIn` 是这个动效的名称，后面我面就可以在组件里面引用 `flynIn` 这个名字了。

动效整体上是由“状态”和“转场”两个部分构成的：

以上代码里面的星号（*）表示“不可见状态”，`void` 表示任意状态。这是两种内置的状态，`*=>void` 表示是进场动画，而 `void=>*` 表示离场动画。当然你也可以定义自己的状态名称，注意不要和内置的状态名称发生冲突。

`keyframes` 里面的内容是关键帧的定义，语法和 CSS3 里面定义动画的方式非常类似。

第三步，在组件里面使用 `flyIn` 这个动效：

![x](http://wxdhhg.cn/wordpress/wp-content/uploads/2020/04/使用flyIn.png)
![x](http://wxdhhg.cn/wordpress/wp-content/uploads/2020/04/使用flyIn2.png)

**动效小结**

- Angular 官方的动效文档在这里：[https://angular.io/guide/animations](https://angular.io/guide/animations)
- 如果你不愿意自己编写动效，推荐这个开源项目，它和 Angular 之间结合得比较紧：[https://github.com/jiayihu/ng-animate](https://github.com/jiayihu/ng-animate)
- 完整代码[示例](https://gitee.com/learn-angular-series/learn-component)

### 动态组件

我们可以通过标签的方式使用组件，也可以通过代码的方式来动态创建组件。动态创建组件的过程是通过 `ViewContainerRef` 和 `ComponentFactoryResolver` 这两个工具类来配合完成的。

我们可以定义一个这样的模板：

```html
<div #dyncomp></div>
```

在组件定义里面需要首先 `import` 需要用到的工具类：

```ts
import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';
```

组件内部这样写：

```ts
// 这里引用模板里面定义的 dyncomp 容器标签
@ViewChild("dyncomp", { read:ViewContainerRef })
dyncomp:ViewContainerRef;

comp1:ComponentRef<Child11Component>;
comp2:ComponentRef<Child11Component>;

constructor(private resolver:ComponentFactoryResolver) {
}
```

然后我们就可以在 `ngAfterContentInit` 这个钩子里面用代码来动态创建组件了：

```ts
ngAfterContentInit(){
  const childComp = this.resolver.resolveComponentFactory(Child11Component);
  this.comp1 = this.dyncomp.createComponent(childComp);
}
```

对于创建出来的 comp1 这个组件，可以通过代码直接访问它的 `public` 型属性，也可以通过代码来 `subscribe`（订阅）comp1 上面发出来的事件，就像这样：

```ts
this.comp1.instance.title = "父层设置的新标题";
this.comp1.instance.btnClick.subscribe((param) => {
  console.log("--->" + param);
});
```

对于用代码动态创建出来的组件，我们可以通过调用 `destory()` 方法来手动销毁：

```ts
public destoryChild():void{
  this.comp1.destroy();
  this.comp2.destroy();
}
```

>注意：用代码动态创建组件这种方式在一般的业务开发里面不常用，而且可能存在一些隐藏的坑，如果你一定要用，请小心避雷。

参考代码：[https://gitee.com/learn-angular-series/learn-component](https://gitee.com/learn-angular-series/learn-component)

### ShadowDOM

根据 Angular 官方的说法，Angular 组件的设计灵感来源于 Web Component，在 Web Component 里面，`ShadowDOM` 是重要的组成部分。在底层，Angular 渲染组件的方式有 3 种：

1. Native：采用 `ShadowDOM` 的模式来进行渲染。
2. Emulated：模拟模式。对于不能支持 `ShadowDOM` 模式的浏览器，Angular 在底层会采用模拟的方式来渲染组件，**这是 Angular 默认的渲染模式**。
3. None：不采用任何渲染模式。直接把组件的 HTML 结构和 CSS 样式插入到 DOM 流里面，这种方式很容易导致组件互相之间出现 CSS 命名污染的问题。

在定义组件的时候，可以通过 `encapsulation` 配置项手动指定组件的渲染模式，关键代码如下：

```ts
@Component({
  selector: 'emulate-mode',
  encapsulation: ViewEncapsulation.Emulated, // 默认模式
  templateUrl: './emulate-mode.component.html',
  styleUrls: ['./emulate-mode.component.scss']
})
```

请自己尝试修改 `encapsulation` 这个配置项来测试不同的效果。

>注意：Angular 官方在 2018 年的 NGConnet 大会上表示，在将来的某个版本中，会在内核里面把 `ShadowDOM` 设置为默认模式。因为这一变更会在内核层面进行，所以业务开发者不用改代码。

注意点：

- `ShadowDOM` 模式的封装性更好，运行效率也更高。
- `ShadowDOM` 在 W3C 的状态是 Working Draft（2017-09-22），如果你想深入研究参考以下链接：[https://developer.mozilla.org/en-US/docs/Web/Web_Components/Shadow_DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Shadow_DOM)、[https://www.w3.org/TR/shadow-dom/](https://www.w3.org/TR/shadow-dom/)。
- `ShadowDOM` 目前只有 Chrome 和 Opera 支持得非常好，其它浏览器都非常糟糕：
  ![x](http://wxdhhg.cn/wordpress/wp-content/uploads/2020/04/ShadowDOM兼容性.png)
- 一般来说，你不需要自己手动指定组件的渲染模式，除非你自己知道在做什么。

### 内容投影

你编写了一个这样的面板组件：

![x](http://wxdhhg.cn/wordpress/wp-content/uploads/2020/04/最简单的组件模板.png)

组件对应的模板代码是这样的：

```html
<div class="panel panel-primary">
  <div class="panel-heading">标题</div>
  <div class="panel-body">内容</div>
  <div class="panel-footer">底部</div>
</div>
```

但是，你希望把面板里面的标题设计成可变的，让调用者能把这个标题传进来，而不是直接写死。这时候“内容投影”机制就可以派上用场了，我们可以这样来编写组件的模板：

```html
<div class="panel panel-primary">
  <div class="panel-heading">
    <ng-content></ng-content>
  </div>
  <div class="panel-body">内容</div>
  <div class="panel-footer">底部</div>
</div>
```

请注意以上模板里面的 `<ng-content></ng-content>`，你看可以把它想象成一个占位符，我们用它来先占住一块空间，等使用方把参数传递进来之后，再用真实的内容来替换它。使用方可以这样来传递参数：

```html
<test-child-two>
  <h3>这是父层投影进来的内容</h3>
</test-child-two>
```

运行起来的效果是这样的：

![x](http://wxdhhg.cn/wordpress/wp-content/uploads/2020/04/投影内容.png)

可以看到，标题的部分是由使用方从外部传递进来的。

**投影多块内容**

接着，问题又来了，你不仅希望面板的标题部分是动态的，你还希望面板的主体区域和底部区域全部都是动态的，应该怎么实现呢？

你可以这样编写组件的模板：

```html
<div class="panel panel-primary">
  <div class="panel-heading">
    <ng-content select="h3"></ng-content>
  </div>
  <div class="panel-body">
    <ng-content select=".my-class"></ng-content>
  </div>
  <div class="panel-footer">
    <ng-content select="p"></ng-content>
  </div>
</div>
```

然后使用方可以这样来使用你所编写的组件：

```html
<test-child-two>
  <h3>这是父层投影进来的内容</h3>
  <p class="my-class">利用CSS选择器</p>
  <p>这是底部内容</p>
</test-child-two>
```

运行起来的效果是这样的：

![x](http://wxdhhg.cn/wordpress/wp-content/uploads/2020/04/投影多块内容.png)

你可能已经猜出来了，`<ng-content></ng-content>` 里面的那个 `select` 参数，其作用和 CSS 选择器非常类似。

这种投影多块内容的方式叫 **多插槽模式**（multi-slot），你可以把 `<ng-content></ng-content>` 想形成一个一个的插槽，内容会被插入到这些插槽里面。

**投影一个复杂的组件**

到这里还没完，你不仅仅想投影简单的 HTML 标签到子层组件里面，你还希望把自己编写的一个组件投影进去，那又应该怎么办呢？

请看：

```html
<div class="panel panel-primary">
  <div class="panel-heading">
    <ng-content select="h3"></ng-content>
  </div>
  <div class="panel-body">
    <ng-content select="test-child-three"></ng-content>
  </div>
  <div class="panel-footer">
    <ng-content select="p"></ng-content>
  </div>
</div>
```

使用方可以这样来使用这个组件：

```html
<test-child-two>
  <h3>这是父层投影进来的内容</h3>
  <test-child-three (sayhello)="doSomething()"></test-child-three>
  <p>这是底部内容</p>
</test-child-two>
```

运行起来的效果是这样的：

![x](http://wxdhhg.cn/wordpress/wp-content/uploads/2020/04/投影一个复杂的组件.png)

请注意 `<ng-content select="test-child-three"></ng-content>` 里面的内容，你把 `select` 属性设置成了子组件的名称。

同时，对于被投影的组件 `<test-child-three></test-child-three>` 来说，我们同样可以利用小圆括号的方式来进行事件绑定，就像上面例子里的 `(sayhello)="doSomething()"` 这样。

**内容投影这个特性存在的意义是什么**

如果没有“内容投影”特性我们也能活得很好，那么它就没有存在的必要了，而事实并非如此，如果没有“内容投影”，有些事情我们就没法做了，典型的有两类：

- 组件标签不能嵌套使用。
- 不能优雅地包装原生的 HTML 标签。

依次解释如下：

比如你自己编写了两个组件 my-comp-1 和 my-comp-2，如果没有内容投影，这两个组件就没办法嵌套使用，比如你想这样用就不行：

```html
<my-comp-1>
  <my-comp-2></my-comp-2>
</my-comp-1>
```

因为没有“内容投影”机制，my-comp-1 无法感知到 my-comp-2 的存在，也无法和它进行交互。这明显有违 HTML 设计的初衷，因为 HTML 的本质是一种 XML 格式，标签能嵌套是最基本的特性，原生的 HTML 本身就有很多嵌套的情况：

```html
<ul>
  <li>神族</li>
  <li>人族</li>
  <li>虫族</li>
</ul>
```

在真实的业务开发里面，另一个典型的嵌套组件就是 Tab 页，以下代码是很常见的：

```html
<tab>
  <pane title="第一个标签页"/>
  <pane title="第二个标签页"/>
  <pane title="第三个标签页"/>
</tab>
```

如果没有内容投影机制，想要这样嵌套地使用自定义标签也是不可能的。

内容投影存在的第二个意义与组件的封装有关。

虽然 Angular 提供了 `@Component` 装饰器让开发者可以自定义标签，但是请不要忘记，自定义标签毕竟与 HTML 原生标签不一样，原生 HTML 标签上面默认带有很多属性、事件，而你自己定义标签是没有的。原生 HTML 标签上面暴露的属性和事件列表请参见 [W3C 的规范](https://www.w3schools.com/tags/ref_attributes.asp)

从宏观的角度看，所有的自定义标签都只不过是一层“虚拟的壳子”，浏览器并不认识自定义标签，真正渲染出来的还是 div、form、input 之类的原生标签。所以，自定义标签只不过是一层逻辑上的抽象和包装，让人类更容易理解和组织自己的代码而已。

既然如此，自定义标签 和 HTML原生标签 之间的关系是什么呢？本质上说，这是“装饰模式”的一种应用，而内容投影存在的意义就是可以让这个“装饰”的过程做得更加省力、更加优雅一些。

我们已经学会了内容投影最基本的用法，但是故事并没有结束，接下来的问题又来了：

- 如何访问投影进来的复杂组件？比如：如何访问被监听组件上的 `public` 属性？如何监听被投影组件上的事件？接下来的小节就来解决这个问题。

- 如何访问投影进来的 HTML 元素？比如：如何给被投影进来的 HTML 元素添加 CSS 样式？这个话题反而比访问被投影组件要复杂一些，我们在讲指令的那一个小节里面给例子来描述。

**`@ContentChild` 和 `@ContentChildren`**

我们可以利用 `@ContentChild` 这个装饰器来操控被投影进来的组件。

```html
<child-one>
  <child-two></child-two>
</child-one>
```

```ts
import { Component, ContentChild, ContentChildren, ElementRef, OnInit, QueryList } from '@angular/core';

// 注解的写法
@ContentChild(ChildTwoComponent)
childTwo:ChildTwoComponent;

// 在 ngAfterContentInit 钩子里面访问被投影进来的组件
ngAfterContentInit():void{
  console.log(this.childTwo);
  // 这里还可以访问 this.childTwo 的 public 型方法，监听 this.childTwo 所派发出来的事件
}
```

从名字可以看出来，`@ContentChildren` 是一个复数形式。当被投影进来的是一个组件列表的时候，我们可以用 `@ContentChildren` 来进行操控。

```html
<child-one>
  <child-two></child-two>
  <child-two></child-two>
  <child-two></child-two>
  <child-two></child-two>
  <child-two></child-two>
  <child-two></child-two>
  <child-two></child-two>
  <child-two></child-two>
</child-one>
```

```ts
import { Component, ContentChild, ContentChildren, ElementRef, OnInit, QueryList } from '@angular/core';

// 这时候不是单个组件，是一个列表了 QueryList
@ContentChildren(ChildTwoComponent)
childrenTwo:QueryList<ChildTwoComponent>;

// 遍历列表
ngAfterContentInit():void{
  this.childrenTwo.forEach((item)=>{
    console.log(item);
  });
}
```

**`@ViewChild` 与 `@ViewChildren`**

我们可以利用 `@ViewChild` 这个装饰器来操控直属的子组件。

```html
<div class="panel panel-primary">
  <div class="panel-heading">父组件</div>
  <div class="panel-body">
    <child-one></child-one>
  </div>
</div>
```

```ts
import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';

@ViewChild(ChildOneComponent,{static:false})
childOne:ChildOneComponent;

// 在 ngAfterViewInit 这个钩子里面可以直接访问子组件
ngAfterViewInit():void{
  console.log(this.childOne);
  // 用代码的方式订阅子组件上的事件
  this.childOne.helloEvent.subscribe((param)=>{
    console.log(this.childOne.title);
  });
}
```

>注意：8.0 这里有一个 breaking change，`@ViewChild` 这里提供了第二个参数，增强了一些功能。这里有详细的描述：[https://angular.io/api/core/ViewChild](https://angular.io/api/core/ViewChild)。

```html
<div class="panel panel-primary">
  <div class="panel-heading">父组件</div>
  <div class="panel-body">
    <child-one></child-one>
    <child-one></child-one>
    <child-one></child-one>
    <child-one></child-one>
    <child-one></child-one>
  </div>
</div>
```

```ts
import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';

@ViewChildren(ChildOneComponent)
children:QueryList<ChildOneComponent>;

ngAfterViewInit():void{
  this.children.forEach((item)=>{
    // console.log(item);
    // 动态监听子组件的事件
    item.helloEvent.subscribe((data)=>{
      console.log(data);
    });
  });
}
```

**与 `Polymer` 封装组件的方式简单对比**

我看到了一些观点，一些开发者认为 Angular 的组件设计不如 `Polymer` 那种直接继承原生 HTMLElement 的方式优雅。

以下是 `Polymer` 组件的定义方式：

![x](http://wxdhhg.cn/wordpress/wp-content/uploads/2020/04/Polymer组件的定义方式.png)

以下是 `Polymer` 的根类 `Polymer.Element` 的源代码：

![x](http://wxdhhg.cn/wordpress/wp-content/uploads/2020/04/Polymer.Element的源代码.png)

可以看到，在 `Polymer` 中，开发者自定义标签的地位与浏览器原生标签完全是平等的，属性、事件、行为，都是平等的，`Polymer` 组件的渲染由浏览器内核直接完成。

[Polymer](https://www.polymer-project.org/) 的这种封装方式和目前市面上的大部分前端框架都不一样，Polymer 直接继承原生 HTML 元素，而其它大部分框架都只是在“包装”、“装饰”原生 HTML 元素，这是两种完全不同的设计哲学。目前，使用 Polymer 最著名的网站是 Google 自家的 YouTube。

### 封装并发布你自己的组件库

**市面上可用的 Angular 组件库介绍**

开源免费的组件库：

- PrimeNG：[http://www.primefaces.org/primeng](http://www.primefaces.org/primeng)，这款组件库做得比较早，代码质量比较高。Telerik 这家公司专门做各种 UI 组件库，jQuery/Flex/Angular，全部都有。
- NG-Zorro：[https://github.com/NG-ZORRO/ng-zorro-antd](https://github.com/NG-ZORRO/ng-zorro-antd)，来自阿里云团队，外观是 AntDesign 风格。
- Clarity：[https://vmware.github.io/clarity/](https://vmware.github.io/clarity/)，来自 Vmware 团队。
- Angular-Material：[https://github.com/angular/material2](https://github.com/angular/material2)，Angular 官方提供的组件库。
- Element-Angular：[https://element-angular.faas.ele.me/guide/install](https://element-angular.faas.ele.me/guide/install)，作者来自饿了么团队。
- Jigsaw（七巧板）：[https://github.com/rdkmaster/jigsaw](https://github.com/rdkmaster/jigsaw)，来自 ZTE 中兴通讯。组件数量比较多，外观不够漂亮。
- Ionic：[https://ionic.io/](https://ionic.io/)，专门为移动端打造的组件库，自带周边工具，生态很完善。

收费版组件库：

- 来自 Telerik 的 KendoUI for Angular：[http://www.telerik.com/kendo-angular-ui/](http://www.telerik.com/kendo-angular-ui/)，Telerik 的这套组件库的特色是组件的功能比较强大，尤其是 Grid，做得非常强大。

**如何在你的项目里面引入开源组件库**

以 PrimeNG 为例，首先在 package.json 里面定义好依赖：

![x](http://wxdhhg.cn/wordpress/wp-content/uploads/2020/04/定义依赖.png)

然后打开终端用 `cnpm install` 安装 PrimeNG 到你本地，在你自己的业务模块里面 import 需要用到的组件模块就好了：

![x](http://wxdhhg.cn/wordpress/wp-content/uploads/2020/04/import组件模块.png)

从 Angular 6.0 开始，`@angular/cli` 增加了一个 `ng add` 命令，所有支持 Schematics 语法的组件库都可以通过这个命令自动整合，并且在创建你自己组件的时候可以指定需要哪种风格，详细的例子和解释请参考“[Schematics 与代码生成器](#Schematics代码生成器)”这一小节。

**如何把你的组件库发布到 npm 上去**

有朋友问过一个问题，他觉得 npm 很神奇，比如当我们在终端里面输入以下命令的时候：

```sh
npm install -g @angular/cli
```

npm 就会自动去找到 @angular/cli 并安装，看起来很神奇的样子。

其实，背后的处理过程很简单，npm 官方有一个固定的 registry url，你可以把它的作用想象成一个 App Store，全球所有开发者编写的 node 模块都需要发布上去，然后其他人才能安装使用。

如果你开发了一个很强大的 Angular 组件库，希望发布到 node 上面让其他人也能使用，应该怎么做呢？简略的处理步骤如下：

- 第 1 步：用 `npm init` 初始化项目（只要你的项目里面按照 npm 的规范编写一份 package.json 文件就可以了，不一定用 `npm init` 初始化）。
- 第 2 步：编写你自己的代码。
- 第 3 步：到 [https://www.npmjs.com/](https://www.npmjs.com/) 去注册一个账号。
- 第 4 步：用 `npm publish` 把项目 push 上去。publish 之后，全球开发者都可以通过名字查找并安装你这个模块了。

**一些小小的经验供你参考**

在我的上一家公司工作期间，我曾经参与、领导过公司两代前端框架的组件库设计和维护，涉及到 jQuery、Flex 等多个技术体系。从 2011 年开始计算，整个维护周期已经有 6 年多。

我自己也从零开始编写过一款页面流程图组件库，整体大约 1.9 万行 AS3 代码，至今仍在公司几十个产品里面运行。

因此，我特别想谈一谈两个常见的误区：

第一个误区是：开源组件可以满足你的所有需求。我可以负责任地告诉你，这是不可能的！开源组件库都是通用型的组件，并不会针对任何特定的行业或者领域进行设计。无论选择哪一款开源组件库，组件的外观 CSS 你总要重新写一套的吧？组件里面缺的那些功能你总得自己去写吧？组件里面的那些 Bug 你总得自己去改掉吧？所以，千万不要幻想开源组件能帮你解决所有问题，二次开发是必然的。

第二个误区是：开发组件库很简单，分分钟可以搞定。在 jQuery 时代，有一款功能极其强大树组件叫 [zTree](http://www.treejs.cn/v3/main.php#_zTreeInfo)。你能想到的那些功能 zTree 都实现了，而且运行效率特别高。但是你要知道，zTree 的作者已经花了超过 5 年的时间来维护这个组件。维护一个组件尚且如此，何况要长期维护一个庞大的库？所以，做好一个组件库并不像有些人想象的那么轻松，这件事是需要花钱、花时间的。做开源，最让使用者蛋疼的不是功能够不够强大，而是开发者突然弃坑，这也是很多企业宁愿花钱自己开发组件库的原因。所以，如果你只是单兵作战，最好选一款现有的开源库，在此基础上继续开发。强烈建议你只做一个组件，就像 zTree 的作者那样，把一个组件做好、做透，并且长期维护下去。这比搞一个庞大的组件库，每个组件做得都像个玩具，然后突然弃坑要好很多。

### 元数据(Metadata)

元数据告诉 Angular 如何处理一个类。

考虑以下情况我们有一个组件叫作 Component ，它是一个类，直到我们告诉 Angular 这是一个组件为止。

你可以把元数据附加到这个类上来告诉 Angular Component 是一个组件。

在 TypeScript 中，我们用 装饰器 (decorator) 来附加元数据。

示例：

```ts
@Component({
   selector : 'mylist',
   template : '<h2>菜鸟教程</h2>'
   directives : [ComponentDetails]
})
export class ListComponent{...}
```

@Component 装饰器能接受一个配置对象，并把紧随其后的类标记成了组件类。Angular 会基于这些信息创建和展示组件及其视图。

@Component 中的配置项说明：

- selector - 一个 css 选择器，它告诉 Angular 在 父级 HTML 中寻找一个 `<mylist>` 标签，然后创建该组件，并插入此标签中。
- templateUrl - 组件 HTML 模板的地址。
- directives - 一个数组，包含 此 模板需要依赖的组件或指令。
- providers - 一个数组，包含组件所依赖的服务所需要的依赖注入提供者。

## 数据绑定(Data binding)

数据绑定为应用程序提供了一种简单而一致的方法来显示数据以及数据交互，它是管理应用程序里面数值的一种机制。通过这种机制，可以从HTML里面取值和赋值，使得数据的读写，数据的持久化操作变得更加简单快捷。

如图所示，数据绑定的语法有四种形式。每种形式都有一个方向——从 DOM 来、到 DOM 去、双向，就像图中的箭头所示意的。

![x](http://wxdhhg.cn/wordpress/wp-content/uploads/2020/04/databinding.png)

- **插值**：在 HTML 标签中显示组件值。

  ```html
  <h3>
    {{title}}<img src="{{ImageUrl}}">
  </h3>
  ```

- **属性绑定**：把元素的属性设置为组件中属性的值。

  ```html
  <img [src]="userImageUrl">
  ```

- **事件绑定**：在组件方法名被点击时触发。

  ```html
  <button (click)="onSave()">保存</button>
  ```

- **双向绑**：使用Angular里的NgModel指令可以更便捷的进行双向绑定。

  ```html
  <input [value]="currentUser.firstName"
         (input)="currentUser.firstName=$event.target.value" >
  ```

## 指令

Angular模板是动态的 。当 Angular 渲染它们时，它会根据指令对 DOM 进行修改。指令是一个带有"指令元数据"的类。在 TypeScript 中，要通过 `@Directive` 装饰器把元数据附加到类上。

![x](./Resource/组件与指令之间的关系.png)

在Angular中包含以下三种类型的指令：

- 属性指令：用来修改 DOM 元素的外观和行为，但是不会改变 DOM 结构，Angular 内置指令里面典型的属性型指令有 ngClass、ngStyle。如果你打算封装自己的组件库，属性型指令是必备的内容。
- 结构指令：可以修改 DOM 结构，内置的常用结构型指令有 `*ngFor`、`*ngIf` 和 `NgSwitch`。由于结构型指令会修改 DOM 结构，所以同一个 HTML 标签上面不能同时使用多个结构型指令，否则大家都来改 DOM 结构，到底听谁的呢？如果要在同一个 HTML 元素上面使用多个结构性指令，可以考虑加一层空的元素来嵌套，比如在外面套一层空的 `<ng-container></ng-container>`，或者套一层空的 `<div>`。
- 组件：作为指令的一个重要子类，组件本质上可以看作是一个带有**模板**的指令。

### 有了组件为什么还要指令

请注意：即使你认真、仔细地看完以上内容，你依然会感到非常茫然。因为有一个最根本的问题在所有文档里面都没有给出明确的解释，这个问题也是很多开发者经常来问我的，那就是：既然有了组件（Component），为什么还要指令（Directive）？

我们知道，在很多的 UI 框架里面，并没有指令的概念，它们的基类都是从 Component 开始的。比如：

- Swing 里面基类名字就叫 Component，没有指令的概念
- ExtJS 里面基类是 Ext.Component，没有指令的概念
- Flex 里面基类名字叫 UIComponent，没有指令的概念
- React 里面的基类名字叫 React.Component，没有指令的概念

以下是 Swing 的类结构图：

![x](./Resource/Swing的类结构图.png)

以下是 ExtJS 3.2 的 UI 组件继承结构图局部，请注意 Ext.Component 类的位置：

![x](./Resource/ExtJS3.2的UI组件继承结构图局部.png)

下面是整体缩略图：

![x](./Resource/整体缩略图.png)

以下是Adobe Flex 3的类结构图：

![x](./Resource/AdobeFlex3的类结构图.png)

上面这些框架都走的组件化的路子，Swing 和 ExtJS 完全是“代码流”，所有 UI 都通过代码来创建；而 Flex 和 React 是“标签流”，也就通过标签的方式来创建 UI。

但是，所有这些框架都没有“指令”这个概念，为什么 Angular 里面一定要引入“指令”这个概念呢？

**根本原因是：我们需要用指令来增强标签的功能，包括 HTML 原生标签和你自己自定义的标签。**

举例来说：`<div>` 是一个常用的原生 HTML 标签，但是请不要小看它，它上面实际上有非常多的属性，这些属性都是 W3C 规范规定好的。

![x](./Resource/div属性.png)

还能支持以下事件属性：

![x](./Resource/div事件属性.png)

完整的列表请查看 [W3C 规范](https://www.w3schools.com/tags/ref_standardattributes.asp)。

**但是，这些内置属性还不够用，你想给原生的 HTML 标签再扩展一些属性。比方说：你想给 `<div>` 标签增加一个自定义的属性叫做 my-high-light，当鼠标进入 div 内部时，div 的背景就会高亮显示，可以这样使用 `<div my-high-light>`。这时候，没有指令机制就无法实现了。**

指令示例：

```html
<li *ngFor="let site of sites"></li>
<site-detail *ngIf="selectedSite"></site-detail>
```

- *ngFor 告诉 Angular 为 sites 列表中的每个项生成一个 `<li>` 标签。
- *ngIf 表示只有在选择的项存在时，才会包含 SiteDetail 组件。

## 自定义指令

一个官方示例的核心代码：

```ts
import { Directive, ElementRef, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[my-high-light]'
})
export class MyHighLightDirective {
  @Input()
  highlightColor: string;

  constructor(private el: ElementRef) {
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.highlightColor);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
```

以上指令的用法如下：

```html
<p my-high-light highlightColor="#ff3300">内容高亮显示！</p>
```

### 自定义结构型指令

这个例子会动态创建 3 个组件，每个延迟 500 毫秒。指令代码如下：

```ts
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[appDelay]'
})
export class DelayDirective {
    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainerRef: ViewContainerRef
    ) { }

    @Input() set appDelay(time: number) {
        setTimeout(() => {
            this.viewContainerRef.createEmbeddedView(this.templateRef);
        }, time);
    }
}
```

指令的用法核心代码：

```html
<div *ngFor="let item of [1,2,3]">
    <card *appDelay="500 * item">
        第 {{item}} 张卡片
    </card>
</div>
```

**你应该注意到了，结构性指令在使用的时候前面都会带上星号，即使是你自定义的结构性指令，也是一样的。**

强烈建议仔细阅读官方文档里面的关于 [Directive](https://angular.io/guide/attribute-directives) 的细节描述。

## 直接在组件里面操作DOM

有一个常见的问题：既然组件是指令的子类，那么指令里面能干的事儿组件应该都能干，我可以在指令里面直接操作 DOM 吗？答案是肯定的。我们来修改一下上一节里面的例子，直接在组件里面来实现背景高亮效果，关键代码如下：

```ts
@Component({
  selector: 'test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  @Input()
  highlightColor: string;

  private containerEl:any;

  constructor(private el: ElementRef) {

  }

  ngOnInit() {
  }

  ngAfterContentInit() {
    console.log(this.el.nativeElement);
    console.log(this.el.nativeElement.childNodes);
    console.log(this.el.nativeElement.childNodes[0]);
    console.log(this.el.nativeElement.innerHTML);

    this.containerEl=this.el.nativeElement.childNodes[0];
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.highlightColor);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }

  private highlight(color: string) {
    this.containerEl.style.backgroundColor = color;
  }
}
```

组件的标签结构如下：

```html
<div class="my-container">
  鼠标移进来就会改变背景
</div>
```

这个组件的使用方式如下：

```html
<div class="container">
    <test highlightColor="#F2DEDE"></test>
</div>
```

可以看到，直接在组件里面操作 DOM 是可以的，但是一旦把操作 DOM 的这部分逻辑放在组件里面，就没法再在其它标签上面使用了。

## 模块

模块：`NgModules`；根模块：`AppModule`。关于 `NgModule` 的十万个为什么，官方编写了一份很长的[文档](https://angular.io/guide/ngmodule-faq)来做说明。

### @NgModule 的定义方式

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TestViewChildComponent } from './test-view-child/test-view-child.component';
import { ChildOneComponent } from './test-view-child/child-one/child-one.component';

@NgModule({
  declarations: [
    AppComponent,
    TestViewChildComponent,
    ChildOneComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

几个重要的属性如下：

- declarations （声明） - 视图类属于这个模块。 Angular 有三种类型的视图类： 组件、指令 和 管道。
- exports - **声明**的子集，可用于其它模块中的组件模板。
- imports - 用来导入外部模块。
- providers - 服务的创建者。本模块把它们加入全局的服务表中，让它们在应用中的任何部分都可被访问到。
- bootstrap - 应用的主视图，称为根组件，它是所有其它应用视图的宿主。只有根模块需要设置 bootstrap 属性中。你可能注意到了这个配置项是一个数组，也就是说可以指定多个组件作为启动点，但是这种用法是很罕见的。

### @NgModule 的重要作用

在 Angular 中，NgModule 有以下几个重要的作用：

- **NgModule 最根本的意义是帮助开发者组织业务代码**，开发者可以利用 `NgModule` 把关系比较紧密的组件组织到一起，这是首要的。
- NgModule 用来控制组件、指令、管道等的可见性，处于同一个 NgModule 里面的组件默认互相可见，而对于外部的组件来说，只能看到 NgModule 导出（exports）的内容，这一特性非常类似 Java 里面 package 的概念。也就是说，如果你定义的 NgModule 不 exports 任何内容，那么外部使用者即使 import 了你这个模块，也没法使用里面定义的任何内容。
- **NgModule 是@angular/cli 打包的最小单位**。打包的时候，@angular/cli 会检查所有 @NgModule 和路由配置，如果你配置了异步模块，cli 会自动把模块切分成独立的 chunk（块）。这一点是和其它框架不同的，其它框架基本上都需要你自己去配置 webpack，自己定义切分 chunck 的规则；而在 Angular 里面，打包和切分的动作是@angular/cli 自动处理的，不需要你干预。当然，如果你感到不爽，也可以自己从头用 webpack 配一个环境出来，因为@angular/cli 底层也是用的 webpack。
- **NgModule 是 Router 进行异步加载的最小单位，Router 能加载的最小单位是模块，而不是组件**。当然，模块里面只放一个组件是允许的，很多组件库都是这样做的。

## 路由概述

**Angular 中的 Router 模块会负责模块的加载、组件的初始化、销毁等操作，它是整个乐队的总指挥。**

### 前端为什么要路由

我发现，很多开发者代码写得很溜，但是并不理解为什么要 Router 这个机制。

在目前的前端开发领域，无论你使用哪一种框架，“路由”都是一个绕不开的机制。那么，前端为什么一定要路由机制？举两个简单的例子来帮助理解：

- 如果没有 Router，浏览器的前进后退按钮没法用。做过后台管理系统的开发者应该遇到过这种场景，整个系统只有一个 login.jsp 和 index.jsp，用户从 login.jsp 登录完成之后，跳转到 index.jsp 上面，然后浏览器地址栏里面的 URL 就一直停留在 index.jsp 上面，页面内部的所有内容全部通过 Ajax 进行刷新。这种处理方式实际上把浏览器的 URL 机制给废掉了，整个系统只有一个 URL，用户完全无法通过浏览器的前进、后退按钮进行导航。
- 如果没有 Router，你将无法把 URL 拷贝并分享给你的朋友。比如：你在某段子网站上看到了一个很搞笑的内容，你把 URL 拷贝下来分享给了你的朋友。如果这个段子网站没有做好路由机制，你的朋友将无法顺利打开这个链接。
Router 的本质是记录当前页面的状态，它和当前页面上展示的内容一一对应。

在 Angular 里面，Router 是一个独立的模块，定义在 @angular/router 模块里面，它有以下重要的作用：

- Router 可以配合 NgModule 进行模块的懒加载、预加载操作；
- Router 会管理组件的生命周期，它会负责创建、销毁组件。

### 服务端的配置

很多开发者会遇到这个问题：代码在开发状态运行得好好的，但是部署到真实的环境上之后所有路由都 404。

这是一个非常典型的问题，你需要配置一下 Server 才能很好地支持前端路由。

你想啊，既然你启用了前端路由，也就意味着浏览器地址栏里面的那些 URL 在 Server 端并没有真正的资源和它对应，你直接访问过去当然 404 了。

以 Tomcat 为例，你需要在 web.xml 里面加一段配置：

```xml
<error-page>
    <error-code>404</error-code>
    <location>/</location>
</error-page>
```

这意思就是告诉 Tomcat，对于 404 这种事你别管了，直接扔回前端去。由于 Angular 已经在浏览器里面接管了路由机制，所以接下来就由 Angular 来负责了。

如果你正在使用其它的 WEB 容器，请从[这里](https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions)查找对应的配置方式。在 How to: Configure your server to work with html5Mode 这个小节里面把常见的 Web 容器的配置方式都列举出来了，包括：IIS、Apache、nginx、NodeJS、Tomcat 全部都有，你过去抄过来就行。

Angular 新版本的路由机制极其强大，除了能支持无限嵌套之外，还能支持模块懒加载、预加载、路由守卫、辅助路由等高级功能，在接下来的几个小节里面我们就来写例子一一演示。

Angular Router 模块的作者是 Victor Savkin，这是他的个人 Blog：[https://vsavkin.com/](https://vsavkin.com/)，他专门编写了一本小薄书来完整描述 Angular 路由模块的设计思路和运行原理，这本书只有 151 页，如果你有兴趣请点这里：[https://leanpub.com/router](https://leanpub.com/router)。

## 路由基本用法

app.routing.module.ts 里面就是路由规则配置，内容如下：

```ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { JokesComponent } from './jokes/jokes.component';

export const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'jokes',
        component: JokesComponent
    },
    {
        path: '**',
        component: HomeComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
```

app.module.ts 里面首先需要 import 这份路由配置文件：

```ts
import { AppRoutingModule } from './app.routing.module';
```

然后 @NgModule 里面的 imports 配置项内容如下：

```ts
imports: [
    BrowserModule,
    AppRoutingModule
]
```

HTML 模板里面的写法：

![x](./Resource/路由模板写法.png)

这个例子的看点：

- 整个导航过程是通过 RouterModule、app.routing.module.ts、routerLink、router-outlet 这几个东西一起配合完成的。
- 请点击顶部导航条，观察浏览器地址栏里面URL的变化，这里体现的是Router模块最重要的作用，就是对 URL 和对应界面状态的管理。
- 请注意路由配置文件 app.routing.module.ts 里面的写法，里面全部用的 component 配置项，这种方式叫“同步路由”。也就是说，@angular/cli 在编译的时候不会把组件切分到独立的 module 文件里面去，当然也不会异步加载，所有的组件都会被打包到一份 JS 文件里面去

>注意：通配符配置必须写在最后一项，否则会导致路由无效。

![x](./Resource/路由与懒加载模块.png)

### 模块懒加载

目的很简单：提升 JS 文件的加载速度，提升 JS 文件的执行效率。

对于一些大型的后台管理系统来说，里面可能会有上千份 JS 文件，如果你把所有 JS 全部都压缩到一份文件里面，那么这份文件的体积可能会超过 5M，这是不能接受的，尤其对于移动端应用。

所以，一个很自然的想法就是：我们能不能按照业务功能，把这些 JS 打包成多份 JS 文件，当用户导航到某个路径的时候，再去异步加载对应的 JS 文件。对于大型的系统来说，用户在使用的过程中不太可能会用到所有功能，所以这种方式可以非常有效地提升系统的加载和运行效率。

最重要的修改在 app.routing.module.ts 里面，路由的配置变成了这样：

```ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const appRoutes:Routes=[
    {
        path:'',
        redirectTo:'home',
        pathMatch:'full'
    },
    {
        path:'home',
        loadChildren: () => import("./home/home.module").then(m => m.HomeModule)
    },
    {
        path:'jokes',
        loadChildren: () => import("./jokes/jokes.module").then(m => m.JokesModule)
    },
    {
        path:'**',
        loadChildren: () => import("./home/home.module").then(m => m.HomeModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
```

**注意：从 Angular 8.0 开始，为了遵守最新的 import() 标准，官方建议采用新的方式来写 loadChildren：**

```ts
//8.0 之前是这样的：
loadChildren:'./home/home.module#HomeModule'

//从 8.0 开始这样写：
loadChildren: () => import("./blog/home/home.module").then(m => m.HomeModule)
```

### N层嵌套路由

示例：

```ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { PictureComponent } from './picture/picture.component';
import { TextComponent } from './text/text.component';

export const homeRoutes:Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: '',
                redirectTo: 'pictures',
                pathMatch: 'full'
            },
            {
                path: 'pictures',
                component: PictureComponent
            },
            {
                path: 'text',
                component: TextComponent
            },
            {
                path: '**',
                component: PictureComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(homeRoutes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
```

### 共享模块

根据 Angular 的规定：组件必须定义在某个模块里面，但是不能同时属于多个模块。

如果你把一个 UserInfo 面板定义在 home.module 里面，jokes.module 就不能使用了，反之亦然。

当然，你可能说，这还不简单，把 UserInfo 定义在根模块 app.module 里面不就好了嘛。

不错，确实可以这样做。但是这样会造成一个问题：如果系统的功能不断增多，你总不能把所有共用的组件都放到 app.module 里面吧？如果真的这样搞，app.module 最终打包出来会变得非常胖。

所以，更优雅的做法是切分一个“共享模块”出来。对于所有想使用 UserInfo 的模块来说，只要 import 这个 SharedModule 就可以了。

### 处理路由事件

Angular 的路由上面暴露了 8 个事件：

- NavigationStart
- RoutesRecognized
- RouteConfigLoadStart
- RouteConfigLoadEnd
- NavigationEnd
- NavigationCancel
- NavigationError
- Scroll

从 Angular 5.0 开始，新增了 8 个路由事件：

- GuardsCheckStart
- ChildActivationStart
- ActivationStart
- GuardsCheckEnd
- ResolveStart
- ResolveEnd
- ActivationEnd
- ChildActivationEnd

详细的描述参见[这里](https://angular.io/guide/router#router-events)

我们可以监听这些事件，来实现一些自己的业务逻辑。

```ts
import { Component, OnInit } from '@angular/core';
import { Router,NavigationStart } from '@angular/router';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) {

  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      console.log(event);
      //可以用instanceof来判断事件的类型，然后去做你想要做的事情
      console.log(event instanceof NavigationStart);
    });
  }
}
```

### 如何传递和获取路由参数

在路由上面传递参数是必备的功能，Angular 的 Router 可以传递两种类型的参数：简单类型的参数、“矩阵式”参数。

请注意以下 routerLink 的写法：

```html
<ul class="nav navbar-nav">
    <li routerLinkActive="active" class="dropdown">
        <a [routerLink]="['home','1']">主页</a>
    </li>
    <li routerLinkActive="active" class="dropdown">
        <a [routerLink]="['jokes',{id:111,name:'damo'}]">段子</a>
    </li>
</ul>
```

在 HomeComponent 里面，我们是这样来获取简单参数的：

```ts
constructor(
    public router:Router,
    public activeRoute: ActivatedRoute) {

}

ngOnInit() {
    this.activeRoute.params.subscribe(
        (params)=>{console.log(params)}
    );
}
```

在 JokesComponent 里面，我们接受“矩阵式”参数的方法是一样的。“矩阵式”传参 `[routerLink]="['jokes',{id:111,name:'damo'}]"` 对应的 URL 是这样一种形态：`http://localhost:4200/jokes;id=111;name=damo`

这种 URL 形态不常见，很多朋友应该没有看到过，但是它确实是合法的。它不是 W3C 的规范，但是互联网之父 Tim Berners-Lee 在 1996 年的文档里面有详细的解释，主流浏览器都是支持的：[https://www.w3.org/DesignIssues/MatrixURIs.html](https://www.w3.org/DesignIssues/MatrixURIs.html)。这种方式的好处是，我们可以传递大块的参数，因为第二个参数可以是一个 JSON 格式的对象。

### 用代码触发路由导航

除了通过 `<a routerLink="home">主页</a>` 这种方式进行导航之外，我们还可以通过代码的方式来手动进行导航：

```ts
this.router.navigate(["/jokes"],{ queryParams: { page: 1,name:222 } });
```

接受参数的方式如下：

```ts
this.activeRoute.queryParams.subscribe(
    (queryParam) => { console.log(queryParam) }
);
```

### 模块预加载

修改 app.routing.module.ts

```ts
import { RouterModule, PreloadAllModules } from '@angular/router';

RouterModule.forRoot(appRoutes,{preloadingStrategy:PreloadAllModules})
```

Angular 内置了两种预加载策略：`PreloadAllModules` 和 `NoPreloading`，PreloadAllModules 的意思是：预加载所有模块，不管有没有被访问到。也就是说，要么就一次预加载所有异步模块，要么就彻底不做预加载。

“一次预加载所有模块”的方式太简单粗暴，进一步优化，你希望实现自己的预加载策略，最好能在路由配置里面加入一些自定义的配置项，让某些模块预加载、某些模块不要进行预加载，就像这样：

```ts
{
    path:'jokes',
    data:{preload:true},
    loadChildren: () => import("./jokes/jokes.module").then(m => m.JokesModule)
},
{
    path:'picture',
    data:{preload:false},
    loadChildren: () => import("./picture/picture.module").then(m => m.PictureModule)
}
```

当 preload 这个配置项为 true 的时候，就去预加载对应的模块，否则什么也不做。实现一个自己的预加载策略：my-preloading-strategy.ts，内容如下：

```ts
import { Route,PreloadingStrategy } from '@angular/router';
import { Observable } from "rxjs";
import "rxjs/add/observable/of";

export class MyPreloadingStrategy implements PreloadingStrategy {
    preload(route: Route, fn: () => Observable<any>): Observable<any>{
        return route.data&&route.data.preload?fn():Observable.of(null);
    }
}
```

当然，别忘记修改一下 app.routing.module.ts 里面的配置，换成你自己的预加载策略：

```ts
RouterModule.forRoot(appRoutes,{preloadingStrategy:MyPreloadingStrategy})
```

OK，这样一来，模块预加载的控制权就完全交到你自己的手里了。你可以继续修改这个预加载策略，比如用加个延时，或者根据其它某个业务条件来决定是不是要执行预加载，如此等等。

## 路由守卫

在实际的业务开发过程中，我们经常需要限制某些 URL 的可访问性。比如：对于系统管理界面，只有那些拥有管理员权限的用户才能打开。

我看到过一些简化的处理方案，比如把菜单隐藏起来。但是这样做是不够的，因为用户还可以自己手动在地址栏里面尝试输入，或者更暴力一点，可以通过工具来强行遍历 URL。

请特别注意：前端代码应该默认被看成是不安全的，安全的重头戏应该放在 Server 端，而前端只是做一些基本的防护。

在 Angular 里面，权限控制的任务由“路由守卫”来负责，路由守卫的典型用法：

- 控制路由能否激活
- 控制路由的能否退出
- 控制异步模块能否被加载
- 控制路由能否激活

### 控制路由能否激活

代码结构：

![x](./Resource/控制路由.png)

auth.guard.ts 里面这样写：

```ts
import { Injectable } from '@angular/core';
import { CanLoad, CanActivate, CanActivateChild } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanLoad,CanActivate,CanActivateChild{

    constructor(private authService:AuthService){

    }

    /**
     * 验证路由是否可以激活
     */
    canActivate(){
        //在真实的应用里面需要写一个 Service 到后端去验证权限
        return this.authService.canActivate();
    }

    /**
     * 验证子路由是否可以激活
     */
    canActivateChild(){
        //在真实的应用里面需要写一个 Service 到后端去验证权限
        return true;
    }
}
```

别忘记把相关的服务放到 app.module.ts 里面去：

```ts
providers: [AuthService,AuthGuard]
```

然后 app.routing.module.ts 里面这样配置：

```ts
{
    path:'jokes',
    data:{preload:true},
    canLoad:[AuthGuard],
    canActivate:[AuthGuard],
    loadChildren: () => import('./jokes/jokes.module').then(m => m.JokesModule)
}
```

这里的 canActivate 配置项就是用来控制路由是否能被激活的，如果 AuthGuard 里面对应的 canActivate 方法返回 false，jokes 这个路由就无法激活。

在所有子模块的路由里面也可以做类似的配置。

### 控制路由的退出

有时候，我们还需要控制路由能否退出。

比如：当用户已经在表单里面输入了大量的内容，如果不小心导航到了其它 URL，那么输入的内容就会全部丢失。很显然，这会让用户非常恼火。

所以，我们需要做一定的防护，避免这种意外的情况。

我们给 jokes 模块单独写了以守卫 jokes-guard.ts：

```ts
import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { JokesComponent } from './jokes.component';

@Injectable()
export class JokesGuard implements CanDeactivate<any>{
   canDeactivate(component:JokesComponent){
       console.log(component);
       if(!component.saved){
           return window.confirm("确定不保存吗？");
       }
       return true;
   }
}
```

注意 jokes.module.ts 和 jokes.routing.module.ts 里面相关的配置。

### 控制模块能否被加载

除了可以控制路由能否被激活之外，还可以控制模块能否被加载，处理方式类似，在 AuthGuard 里面增加一个处理方法：

```ts
/**
 * 验证是否有权限加载一个异步模块
 */
canLoad(){
    // 在真实的应用里面需要写一个 Service 到后端去验证权限
    return this.authService.canLoad();
}
```

如果 canLoad 方法返回 false，模块就根本不会被加载到浏览器里面了。

## 多重出口

到目前为止，在我们所有例子里面，界面结构都是这样的：

![x](./Resource/多重出口.png)

但是，有时候我们在同一个界面上需要同时出现两块或者多块动态的内容。比如，你想让左侧的导航栏和右侧的主体区域全部变成动态的，就像这样：

![x](./Resource/动态区域.png)

核心代码如下：

app.component.html 里面的内容：

```ts
<a [routerLink]="['home', {outlets: {'left-nav': ['leftNav'], 'main-area': ['none']}}]">主页</a>
```

home.component.html 里面的内容：

```ts
<div class="row">
  <div class="col-xs-3">
    <router-outlet name="left-nav"></router-outlet>
  </div>
  <div class="col-xs-9">
    <router-outlet name="main-area"></router-outlet>
  </div>
</div>
```

left-nav.component.html 里面的核心代码：

```html
<a class="list-group-item" (click)="toogle(1)">只看图片</a>
<a class="list-group-item" (click)="toogle(2)">只看文字</a>
```

left-nav.component.ts 里面的核心代码：

```ts
toogle(id) {
    this.router.navigate(['/home', {outlets: {'main-area': [id]}}]);
}
```

运行效果：

![x](./Resource/多重出口运行效果.png)

请注意看浏览器地址栏里面的内容，形式比较复杂，而且代码写起来也比较繁琐，所以，请尽量避开这种用法。

## 表单快速入手

如果没有表单，我们将没有途径收集用户输入。所以，表单是前端开发里面的重头戏。在日常开发中，处理表单会占据你大块的编码时间。

我们先来做一个最简单的用户注册界面。

HTML 模版里面的核心代码：

```html
<input type="email" class="form-control" placeholder="Email" (keyup)="userNameChange($event)">

<input #pwd type="password" class="form-control" placeholder="Password" (keyup)="0">
```

组件核心代码：

```ts
export class FormQuickStartComponent implements OnInit {
  public userName:string;

  public userNameChange(event):void{
    this.userName=event.target.value;
  }
}
```

这个例子非常简单，里面有两个 input，分别演示两种传递参数的方式：

- 第一个 input：用事件绑定的方式，把 input 的值传递给组件内部定义的 userName 属性，然后页面上再用 {{userName}} 获取数据。
- 第二个 input：我们定义了一个模板局部变量 #pwd，然后底部直接用这个名字来获取 input 的值 {{pwd.value}}。这里有一个小小的注意点，标签里面必须写 (keyup)="0"，要不然 Angular 不会启动变更检测机制，{{pwd.value}} 取不到值。

## 双向数据绑定

Angular 是第一个把“双向数据绑定”机制引入到前端开发领域来的框架，这也是当年 AngularJS 最受开发者欢迎的特性。

我们接着上一个例子继续改。

HTML 模版里面的核心代码：

```html
<input type="email" class="form-control" placeholder="Email" [(ngModel)]="regModel.userName" name="userName">

<input type="password" class="form-control" placeholder="Password" [(ngModel)]="regModel.password" name="password">

<input type="checkbox" name="rememberMe" [(ngModel)]="regModel.rememberMe">记住我
```

数据模型和组件核心代码：

```ts
export class RegisterModel {
    userName: string;
    password: string;
    rememberMe:boolean=false;
}
```

组件里面的核心代码：

```ts
import { RegisterModel } from './model/register-model';

export class FormQuickStartComponent implements OnInit {
  public regModel:RegisterModel=new RegisterModel();
}
```

一些常见的坑：

- 要想使用 `[(ngModel)]` 进行双向绑定，必须在你的 `@NgModule` 定义里面 `import FormsModule` 模块。
- 用双向绑定的时候，必须给 `<input>` 标签设置 name 或者 id，否则会报错。（这个行为挺奇怪的，吐槽一下！）
- 表单上面展现的字段和你处理业务用的数据模型不一定完全一致，推荐设计两个 Model，一个用来给表单进行绑定操作，一个用来处理你的业务。

## 表单校验

表单校验一定会牵扯到一个大家都比较头疼的技术点：正则表达式。正则表达式学起来有难度，但是又不可或缺。

强制所有开发者都能精通正则表达式是不太现实的事情，但是有一点是必须要做到的，那就是至少要能读懂别人编写正则。

先来一个例子，关键 HTML 模板代码如下：

```html
<form #registerForm="ngForm" class="form-horizontal">
      <div class="form-group" [ngClass]="{'has-error': userName.invalid && (userName.dirty || userName.touched) }">
        <label class="col-xs-2 control-label">用户名：</label>
        <div class="col-xs-10">
          <input #userName="ngModel" [(ngModel)]="regModel.userName" name="userName" type="email" class="form-control" placeholder="Email" required minlength="12" maxlength="32">
          <div *ngIf="userName.invalid && (userName.dirty || userName.touched)" class="text-danger">
            <div *ngIf="userName.errors.required">
              用户名不能为空
            </div>
            <div *ngIf="userName.errors.minlength">
              最小长度不能小于12个字符
            </div>
            <div *ngIf="userName.errors.maxlength">
              最大长度不能大于32个字符
            </div>
          </div>
        </div>
      </div>
    </form>

    <div class="panel-footer">
        <p>用户名：{{userName.value}}</p>
        <p>密码：{{pwd.value}}</p>
        <p>表单状态： {{registerForm.valid}}
                    {{registerForm.invalid}}
                    {{registerForm.pending}}
                    {{registerForm.pristine}}
                    {{registerForm.dirty}}
                    {{registerForm.untouched}}
                    {{registerForm.touched}}
        </p>
    </div>
```

模板和组件里面的关键代码：

```ts
export class RegisterModel {
    userName: string;
    password: string;
    rememberMe:boolean=false;
}
```

```ts
import { RegisterModel } from './model/register-model';

export class FormQuickStartComponent implements OnInit {
  public regModel:RegisterModel=new RegisterModel();
}
```

### 状态标志位

Form、FormGroup、FormControl（输入项）都有一些标志位可以使用，这些标志位是 Angular 提供的，一共有 9 个（官方的文档里面没有明确列出来，或者列得不全）：

- valid：校验成功
- invalid：校验失败
- pending：表单正在提交过程中
- pristine：数据依然处于原始状态，用户没有修改过
- dirty：数据已经变脏了，被用户改过了
- touched：被触摸或者点击过
- untouched：未被触摸或者点击
- enabled：启用状态
- disabled：禁用状态

Form 上面多一个状态标志位 `submitted`，可以用来判断表单是否已经被提交。

我们可以利用这些标志位来判断表单和输入项的状态。

### 内置校验规则

Angular 一共内置了 8 种校验规则：

1. required
2. requiredTrue
3. minLength
4. maxLength
5. pattern
6. nullValidator
7. compose
8. composeAsync

详细的 API 描述参见这里：[https://angular.io/api/forms/Validators](https://angular.io/api/forms/Validators)

### 自定义校验规则

内置的校验规则经常不够用，尤其在需要多条件联合校验的时候，所以我们需要自己定义校验规则。

关键 HTML 模板代码：

```html
<div class="form-group"  [ngClass]="{'has-error': mobile.invalid && (mobile.dirty || mobile.touched) }">
  <label class="col-xs-2 control-label">手机号：</label>
  <div class="col-xs-10">
    <input #mobile="ngModel" [(ngModel)]="regModel.mobile" name="mobile" ChineseMobileValidator class="form-control" placeholder="Mobile">
    <div *ngIf="mobile.invalid && (mobile.dirty || mobile.touched)" class="text-danger">
        <div *ngIf="!mobile.errors.ChineseMobileValidator">
          请输入合法的手机号
        </div>
    </div>
  </div>
</div>
```

自定义的校验规则代码：

```ts
import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';


@Directive({
    selector: '[ChineseMobileValidator]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: ChineseMobileValidator,
            multi: true
        }
    ]
})
export class ChineseMobileValidator implements Validator {
    @Input() ChineseMobileValidator: string;

    constructor() { }

    validate(control: AbstractControl): { [error: string]: any } {
        let val = control.value;
        let flag=/^1(3|4|5|7|8)\d{9}$/.test(val);
        console.log(flag);
        if(flag){
            control.setErrors(null);
            return null
        }else{
            control.setErrors({ChineseMobileValidator:false});
            return {ChineseMobileValidator:false};
        }
    }
}
```

可以看到，自定义校验规则的使用方式和内置校验规则并没有什么区别。

当然，也可以把正则表达式传给内置的 pattern 校验器来实现这个效果，但是每次都拷贝正则比较麻烦，对于你的业务系统常见的校验规则，还是把它沉淀成你们自己的校验规则库可复用性更高。

关于校验器更详细的 API 描述参见这里：[https://angular.io/api/forms/Validators](https://angular.io/api/forms/Validators)

## 模型驱动型表单

前面的例子都是“模板驱动型表单”，我们把表单相关的逻辑，包括校验逻辑全部写在模板里面，组件内部几乎没写什么代码。

表单的另一种写法是“模型驱动型表单”，又叫做“响应式表单”。特点是：把表单的创建、校验等逻辑全部用代码写到组件里面，让 HTML 模板变得很简单。

**特别注意**：如果想使用响应式表单，必须在你的 `@NgModule` 定义里面 `import ReactiveFormsModule`。

完整可运行的例子请参见：[https://gitee.com/mumu-osc/NiceFish](https://gitee.com/mumu-osc/NiceFish)，代码在 user-register.component.ts 里面。

如果你想查阅“响应式表单”的详细文档，请参考这里：[https://angular.io/guide/reactive-forms](https://angular.io/guide/reactive-forms)

## 动态表单

有这样一种业务场景：表单里面的输入项不是固定的，需要根据服务端返回的数据动态进行创建。

这时候我们压根没法把表单的 HTML 模板写死，我们需要根据配置项用代码动态构建表单，而这些配置项甚至可能是在服务端动态生成的。

完整可运行的例子请参见：[https://gitee.com/mumu-osc/NiceFish](https://gitee.com/mumu-osc/NiceFish)，代码在 user-profile.component.ts 里面。

## 服务(Services)

Angular中的服务是封装了某一特定功能，并且可以通过注入的方式供他人使用的独立模块。服务分为很多种，包括：值、函数，以及应用所需的特性。例如，多个组件中出现了重复代码时，把重复代码提取到服务中实现代码复用。

以下是几种常见的服务：

- 日志服务
- 数据服务
- 消息总线
- 税款计算器
- 应用程序配置

以下实例是一个日志服务，用于把日志记录到浏览器的控制台：

```ts
export class Logger {
  log(msg: any)   { console.log(msg); }
  error(msg: any) { console.error(msg); }
  warn(msg: any)  { console.warn(msg); }
}
```

在组件的构造函数里面声明，Angular 会在运行时自动把 Service 实例创建出来并注射给组件。

### 单例模式

如果你希望 Service 是全局单例的，需要把它定义到根模块里面。

### 多例模式

下面这个例子用来测试 UserListService 是否是单例，第一个组件会向 UserListService 里面塞数据，第二个组件会尝试去读取数据：

```ts
@Component({
  selector: 'order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
  providers: [UserListService] //如果你在这里提供了 providers 配置，UserListService 就不是全局单例了
})
```

**简单解释一下原理：**

在新版本的 Angular 里面，每个组件上都有自己的注射器(Injector)实例，所以很明显，注射器也构成了一个树形的结构。

![x](./Resource/注射器.png)

我们的 UserListService 是通过依赖注入机制注射给组件的，DI 机制会根据以下顺序查找服务实例：

- 如果组件内部的 providers 上面配置了服务，优先使用组件上的配置。
- 否则继续向父层组件继续查找。
- 直到查询到模块里面的 providers 配置。
- 如果没有找到指定的服务，抛异常。

所以请特别注意：

- 在 Component 里面直接引入 Service，就不是单例了，而是会为每个组件实例都创建一个单独的 Service 单例。
- 如果你在多个模块(`@NgModule`)里面同时定义 providers，那也不是单例。
- 如果你在异步加载的模块里面定义 Service，那也不是全局单例的，因为 Angular 会为异步模块创建独立的 Injector 空间。

### 关于 Service 的基本注意点

有很多朋友说：OK，我会写 Service 了，也知道怎么玩注入了，但还有一个最基本的问题没有解决，那就是应该把什么样的东西做成服务？

整体上说，Angular 里面的 Service 与后端框架里面的 Service 设计思想是一致的：

- Service 应该是无状态的。
- Service 应该可以被很多组件复用，不应该和任何组件紧密相关。
- 多个 Service 可以组合起来，实现更复杂的服务。

在 Angular 核心包里面，最典型的一个服务就是 Http 服务：[https://en.wikipedia.org/wiki/Service-oriented_architecture](https://en.wikipedia.org/wiki/Service-oriented_architecture)

## ReactiveX&nbsp;与&nbsp;RxJS

ReactiveX 本身是一种编程范式，或者叫一种设计思想，目前有Java/C++/Python 等 18 种语言实现了 ReactiveX，RxJS 是其中的 JavaScript 版本。

ReactiveX 的官方网站在这里：[http://reactivex.io/](http://reactivex.io/)，上面有详细介绍、入门文档、技术特性等。

这篇文章不会重复文档上已经有的内容，而是从另外一个视角，带你领略 RxJS 的核心用法。

### 回调地狱与Promise

在使用 Ajax 的过程中，经常会遇到这种情况：我们需要在一个 Ajax 里面嵌套另一个 Ajax 调用，有时候甚至需要嵌套好几层 Ajax 调用，于是就形成了所谓的“回调地狱”：

![x](./Resource/回调地狱.png)

这种代码最大的问题是可读性非常差，时间长了之后根本无法维护。

Promise 的出现主要就是为了解决这个问题，在 Promise 的场景下，我们可以这样写代码：

```ts
new Promise(function(resolve,reject){
    //异步操作之后用 resolve 返回 data
})
.then(function(data){
    //依赖于 Promise 的第一个异步操作
})
.then(function(data){
    //依赖于 Promise 的第二个异步操作
})
.then(function(data){
    //依赖于 Promise 的第三个异步操作
})
.catch(function(reason){
    //处理异常
});
```

很明显，这样的代码可读性就强太多了，而且未来维护起来也很方便。

当然，Promise 的作用不止于此，如果你想更细致地研究 Promise，请看 MDN 上的这篇资料：[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

### RxJS 与 Promise 的共同点

RxJS 与 Promise 具有相似的地方，请看以下两个代码片段：

```ts
let promise = new Promise(resolve => {
    setTimeout(() => {
        resolve('---promise timeout---');
    }, 2000);
});
promise.then(value => console.log(value));
```

```ts
let stream1$ = new Observable(observer => {
    let timeout = setTimeout(() => {
        observer.next('observable timeout');
    }, 2000);

    return () => {
        clearTimeout(timeout);
    }
});
let disposable = stream1$.subscribe(value => console.log(value));
```

可以看到，RxJS 和 Promise 的基本用法非常类似，除了一些关键词不同。Promise 里面用的是 then() 和 resolve()，而 RxJS 里面用的是 next() 和 subscribe()。

### RxJS 与 Promise 的 3 大重要不同点

任何一种技术或者框架，一定要有自己的特色，如果跟别人完全一样，解决的问题也和别人一样，那存在的意义和价值就会遭到质疑。

所以，RxJS 一定有和 Promise 不一样的地方，最重要的不同点有 3 个，请看下图：

![x](./Resource/RxJS与Promise的3大重要不同点.png)

依次给 3 块代码来示范一下：

```ts
let promise = new Promise(resolve => {
    setTimeout(() => {
        resolve('---promise timeout---');
    }, 2000);
});
promise.then(value => console.log(value));

let stream1$ = new Observable(observer => {
    let timeout = setTimeout(() => {
        observer.next('observable timeout');
    }, 2000);

    return () => {
        clearTimeout(timeout);
    }
});
let disposable = stream1$.subscribe(value => console.log(value));
setTimeout(() => {
    disposable.unsubscribe();
}, 1000);
```

从以上代码可以看到，Promise 的创建之后，动作是无法撤回的。Observable 不一样，动作可以通过 unsbscribe() 方法中途撤回，而且 Observable 在内部做了智能的处理，如果某个主题的订阅者为 0，RxJS 将不会触发动作。

```ts
let stream2$ = new Observable<number>(observer => {
    let count = 0;
    let interval = setInterval(() => {
        observer.next(count++);
    }, 1000);

    return () => {
        clearInterval(interval);
    }
});
stream2$.subscribe(value => console.log("Observable>"+value));
```

以上代码里面我们用 setInterval 每隔一秒钟触发一个新的值，源源不断，就像流水一样。

这一点 Promise 是做不到的，对于 Promise 来说，最终结果要么 resolve（兑现）、要么 reject（拒绝），而且都只能触发一次。如果在同一个 Promise 对象上多次调用 resolve 方法，则会抛异常。而 Observable 不一样，它可以不断地触发下一个值，就像 next() 这个方法的名字所暗示的那样。

```ts
let stream2$ = new Observable<number>(observer => {
    let count = 0;
    let interval = setInterval(() => {
        observer.next(count++);
    }, 1000);

    return () => {
        clearInterval(interval);
    }
});
stream2$
.pipe(
    filter(val => val % 2 == 0)
)
.subscribe(value => console.log("filter>" + value));

stream2$
.pipe(
    map(value => value * value)
)
.subscribe(value => console.log("map>" + value));
```

在上述代码里面，我们用到了两个工具函数：filter 和 map。

- filter 的作用就如它的名字所示，可以对结果进行过滤，在以上代码里面，我们只对偶数值有兴趣，所以给 filter 传递了一个箭头函数，当这个函数的返回值为 true 的时候，结果就会留下来，其它值都会被过滤掉。
- map 的作用是用来对集合进行遍历，比如例子里面的代码，我们把 Observable 返回的每个值都做了一次平方，然后再传递给监听函数。

类似这样的工具方法在 Observable 里面叫做 operator（操作符），所以有人说 Observable 就相当于异步领域的 Underscore 或者 lodash，这样的比喻是非常贴切的。这也是 Observable 比较强的地方，Promise 里面就没有提供这些工具函数。

Observable 里面提供了数百个这样的“操作符”，完整的列表和 API 文档请参考这里：[http://reactivex.io/documentation/operators.html](http://reactivex.io/documentation/operators.html)

RxJS 官方的 GitHub 仓库在这里：[https://github.com/ReactiveX/rxjs.git](https://github.com/ReactiveX/rxjs.git)

**特别注意**：Angular 5.0之后，修改了 RxJS 的 import 方式，与其它模块的引入格式进行了统一。

```ts
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';
```

我也看到有一些朋友在抱怨，说 RxJS 太过复杂，操作符（operator）的数量又特别多，不知道在什么场景下面应该用什么操作符。

实际上这种担心是多余的，因为在 RxJS 里面最常用的操作符不超过 10 个，不常用的操作符都可以在使用的时候再去查阅文档。

RxJS 和你自己开发的系统一样，常用的功能只有其中的 20%，而剩余 80% 的功能可能永远不会被用到。所以，RxJS 并不像很多人说的那么玄乎，你一定能学会，我相信你。

**RxJS 在 Angular 的典型应用场景 1：HTTP 服务：**

```ts
this.http
.get(url, { search: params })
.pipe(
    map((res: Response) => {
        let result = res.json();
        console.log(result);
        return result;
    }),
    catchError((error: any) => Observable.throw(error || 'Server error'))
);
```

在新版本的 Angular 里面，HTTP 服务的返回值都是 Observable 类型的对象，所以我们可以 subscribe（订阅）这个对象。当然，Observable 所提供的各种“操作符”都可以用在这个对象上面，比如上面这个例子就用到了 map 操作符。

**RxJS 在 Angular 的典型应用场景 2：事件处理：**

```ts
this.searchTextStream
.pipe(
    debounceTime(500),
    distinctUntilChanged()
)
.subscribe(searchText => {
    console.log(this.searchText);
    this.loadData(this.searchText)
});
```

这个例子里面最有意思的部分是 debounceTime 方法和 distinctUntilChanged 方法，这是一种“去抖动”效果。“去抖动”这个场景非常能体现 Observable 的优势所在，有一些朋友可能没遇到过这种场景，我来解释一下，以防万一。

在搜索引擎里面，我们经常会看到这样的效果：

![x](./Resource/动态搜索建议.png)

这种东西叫做“动态搜索建议”，在用户敲击键盘的过程中，浏览器已经向后台发起了请求，返回了一些结果，目的是给用户提供一些建议。

效果看起来很简单，但是如果没有这个 debounceTime 工具函数，我们自己实现起来是非常麻烦的。这里的难点在于：用户敲击键盘的过程是源源不断的，我们并不知道用户什么时候才算输入完成。所以，如果让你自己来从零开始实现这种效果，你将会不得不使用定时器，不停地注册、取消，自己实现延时，还要对各种按键码做处理。

在 Observable 里面，处理这种情况非常简单，只要一个简单的 debounceTime 加 distinctUntilChanged 调用就可以了。

**小结：**

- ReactiveX 本身是一种编程范式，或者叫一种设计思想，RxJS 是其中的一种实现，其它还有 Java/C++/Python 等15种语言的实现版本。ReactiveX 本身涉及到的内容比较多，特别是一些设计思想层面的内容，如果你对它特别有兴趣，请参考官方的站点：[http://reactivex.io](http://reactivex.io)。
- 关于 RxJS 目前已经有专门的书籍来做介绍，但是还没有中文版。在网络上有各种翻译和文章，如果你想深入研究，请自行搜索。
- RxJS 是 Angular 内核的重要组成部分，它和 Zone.js 一起配合实现了“变更检测”机制，所以在编写 Angular 应用的过程中应该优先使用 RxJS 相关的 API。
- RxJS 可以独立使用，它并不一定要和 Angular 一起使用。
- 本节所有的实例代码都在这里：[https://gitee.com/mumu-osc/NiceFish](https://gitee.com/mumu-osc/NiceFish)，这篇文章里面涉及到的完整案例代码在 postlist.component.ts 和 postlist.service.ts 这两份文件里面。

## Reactive&nbsp;Programming

从本质上来说，计算机编程语言分成两大种大的范式：命令式和声明式。

- 典型的命令式编程语言有：C、C++、Java 等。
- 典型的声明式编程语言有：SQL、XML、HTML、SVG 等。

为了帮助你更好地理解这两种编程范式的不同点，我用自己的语言来解释一下。比如 SQL 是一种典型的声明式语言，你会写出这样的语句：

```sql
select u.* from user u where u.age > 15;
```

但是，数据库在底层是如何解释并执行这条语句，是由数据库自己决定的，不需要程序员来控制，程序员只是在“描述”自己想要什么，而并不需要告诉计算机具体怎么做。

命令式编程语言刚好相反，程序员必须想好需要什么结果，同时需要提供完整的执行过程。

Reactive Programming 属于声明式编程语言的一种，有很多中文资料把它翻译成“响应式编程”，我认为这不够准确，而且容易和UI设计领域的“响应式编程”发生混淆，翻译成“反应式编程”更加贴切，请参考题图。

![x](./Resource/反应式编程.png)

### 发展历程

Reactive Programming 在 1970 年代就开始发展了，后来微软在 .NET 上面做了第一个实现，后面 2013 年的时候有了 Java 版的实现，然后才有了 ReactiveX 宣言。

目前有 18 种语言实现了 ReactiveX，而 RxJS 是其中的 JS 版本。所以，你可以看到，ReactiveX 本身是和语言无关的，你可以把它看成一种编程思想、一种协议、一种规范。

![x](./Resource/反应式编程发展历程.png)

### 典型的业务场景

有人会说，OK，我懂了，这是一种编程思想，但是我为什么要用它呢？它能带来什么好处呢？

我举几个典型的业务场景帮助你理解。

- 场景一：事件流与“防抖动”

  用户连续不断地敲击键盘，如果用户每次按下一个键就发起一个网络请求进行查询，很明显就会产生大量无效的查询。那么，如何才能在用户真正输入完成之后再发起查询请求呢？这个场景用 RxJS 实现起来就非常简单。

- 场景二：数据流

  我有 3 个 Ajax 请求，业务需要 3 个请求全部都成功之后才能继续后面的业务操作。这个场景可以用 Promise 来实现，也可以用 RxJS 来实现。

- 场景三：数据与 UI 的同步
- 场景四：Android 中 UI 线程与其它线程的同步问题

对于以上 4 种典型的业务场景，如果完全靠程序员从零自己实现，会非常繁琐，而用 ReactiveX 的思路来做就会非常简单。

### ReactiveX 中的难点：Operator（操作符）

ReactiveX 所描述的设计思想是非常清晰的，理解起来也不困难。

但是，在工程实践中，有很多人在抱怨 ReactiveX 过于繁琐，这里面最大的一个难点就是所谓的“操作符”（Operator）的用法。

ReactiveX 官方移动定义了 70 个 Operator，分成 11 个大类（各种语言实现 Operator 的数量不一样）：

![x](./Resource/ReactiveX操作符.png)

### RxJS

RxJS 是 ReactiveX 的 JavaScript 版实现，它本身是独立的，只是 Angular 选用了它来构建自己的内核。

RxJS 一共实现了 105 个 Operator，分成 10 个大类，完整的分类和列表参见这里：[https://rxjs.dev/guide/operators](https://rxjs.dev/guide/operators)

请不用担忧，这里面很多 Operator 在日常业务开发里面永远都不会用到。所以你不需要一次性全部掌握，刚开始的时候只要能熟练使用其中的 15 个就可以了。

创建型：

- ajax
- empty
- from
- of
- range

join 创建型：

- concat
- merge
- zip

变换型：

- map
- scan

过滤型：

- filter
- first
- last
- throttle

异常处理型：

- catchError

对于其他 Operator，你可以在用到的时候再查文档，也可以通过类比的方式进行理解和记忆。比如：对于数学运算类的 Operator，当你看到有 max 的时候，就能想到一定有 min。这是非常自然的事情，并不需要额外的努力。

在官方的文档中 [https://rxjs.dev/guide/operators](https://rxjs.dev/guide/operators)，为每一个 Operator 都提供了实例代码，总共有一千多个例子，你可以对照这些例子进行理解。在例子页面上，还提供了弹珠图。我看到有一些初学者还不会看弹珠图，附一张中文版的弹珠图说明如下：

![x](./Resource/弹珠图.png)

**弹珠图是从上向下看的：上方的时间线是输入，中间的方框是 Operator，下方的时间线是输出。由于输入输出都是 Observable，所以可以无限链式调用。**

比如下面这张弹珠图：

![x](./Resource/弹珠图2.png)

输入是上方的两条时间线，中间的 merge 是 Operator，下方的时间线是输出，所以 merge 操作的效果就是把两条时间线上的值“合并”成了下方的一条时间线。

**参考资料：**

- [https://en.wikipedia.org/wiki/Declarative_programming](https://en.wikipedia.org/wiki/Declarative_programming)
- ReactiveX 宣言：[http://reactivex.io/](http://reactivex.io/)
- RxJS：[https://github.com/ReactiveX/rxjs](https://github.com/ReactiveX/rxjs)
- RxJava：[https://github.com/ReactiveX/RxJava](https://github.com/ReactiveX/RxJava)

## 国际化用法

**第一步：在项目的 package.json 里面的 dependencies 配置项中加上 "ng2-translate": "5.0.0"。**

**第二步：在 app.module.ts 里面导入需要使用的模块：**

```ts
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
```

在 imports 配置项里面加上以下内容：

```ts
TranslateModule.forRoot({
    provide: TranslateLoader,
    useFactory: (http: Http) => new TranslateStaticLoader(http,'./assets/i18n', '.json'),
    deps: [Http]
})
```

**第三步：在 app.component.ts 中的 ngOnInit 钩子里面加上以下内容：**

```ts
this.translate.addLangs(["zh", "en"]);
this.translate.setDefaultLang('zh');
const browserLang = this.translate.getBrowserLang();
this.translate.use(browserLang.match(/zh|en/) ? browserLang : 'zh');
```

**第四步：在 HTML 模板里面通过管道的方式来编写需要进行国际化的Key：**

![x](./Resource/国际化管道.png)

可以看到，国际化插件本质上是利用了 Angular 的“管道”机制。

**第五步：用来编写国际化字符串的 JSON 文件是这样的：**

![x](./Resource/国际化JSON.png)

**小结：**

ng2-translate 的主页在这里：[https://github.com/ngx-translate/core](https://github.com/ngx-translate/core)

它是一个第三方提供的 i18n 库，和 Angular 结合得比较好，ngx-translate 是后来改的名字。

## 自动化测试

自动化测试一直是前端开发中的一个巨大痛点，由于前端在运行时严重依赖浏览器环境，导致我们一直没法像测试后端代码那样可以自动跑用例。

在有了 NodeJS 之后，我们终于有了 Karma+Jasmine 这样的单元测试组合，也有了基于 WebDriverJS 这样的可以和浏览器进行通讯的集成测试神器。

目前，无论你使用什么样的前端框架，做单元测试一定会用到 Karma+Jasmine，这个组合已经成为了事实标准。Karma 是一个运行时平台，Jasmine 是用来编写测试用例的一种语法。

集成测试（场景测试）稍微复杂一些，但是一般都会用 WebDriverJS 来实现，它也是事实标准。对于 Angular 来说，集成测试所用的工具叫做 Protractor（量角器），底层也是 WebDriverJS。

如果你使用 @angular/cli 作为开发环境，在前端自动化测试方面会非常简单，因为它已经在内部集成了这些工具。

但是有一件事非常遗憾，在@angular/cli 目前发布的所有版本里面，默认生成的项目和配置文件都无法直接运行单元测试，因为@angular/cli 默认引用的一些 Node.js 模块在 Windows 平台上面有 Bug。

所以，这篇文章不会列举 Jasmine 和 Protractor 的那些语法特性，而是帮你填平这些小坑，让你能把这个机制跑起来。至于 Jasmine 和 Protractor 详细 API 调用方式，需要你自己去研究并熟悉，请参见：

- [https://jasmine.github.io/](https://jasmine.github.io/)
- [http://www.protractortest.org](http://www.protractortest.org)

>注意，Karma、Jasmine、WebDriverJS 是通用技术，与具体的框架无关；Protractor 是专门针对 Angular 设计的，不能用在其它框架里面。

### 单元测试

在 `@angular/cli` 自动生成的项目结构里面，karma.conf.js 里面有这样一些配置项：

![x](./Resource/单元测试配置.png)

很可惜，这里引用的 karma-jasmine-html-reporter 这个 Node 模块在 Windows 下面有 Bug。

所以我们需要进行一些修改，把报告生成器改成 karma-htmlfile-reporter 和 karma-mocha-reporter。

我们需要修改两份配置文件：package.json 和 karma.conf.js。

第一步，把 package.json 里面的 "karma-jasmine-html-reporter" 这一行删掉，换成以下内容：

```json
"karma-mocha-reporter":"^2.2.3",
"karma-htmlfile-reporter": "~0.3",
```

第二步，把 karma.conf.js 里面的 `require('karma-jasmine-html-reporter')` 这一行配置换成以下内容：

```js
require('karma-htmlfile-reporter'),
require('karma-mocha-reporter'),
```

同时把原来 `reporters: ['progress', 'kjhtml']` 这一行替换成下面的一段内容：

```js
reporters: ['progress','mocha','html'],
htmlReporter: {
    outputFile: 'unit-test-report/report.html',

    // Optional
    pageTitle: '单元测试结果',
    subPageTitle: 'learn-test',
    groupSuites: true,
    useCompactStyle: true,
    useLegacyStyle: true
},
```

改完这些配置之后，使用 cnpm install 重新安装一下所依赖的 Node 模块，然后在终端里面执行：`ng test`

Karma 将会自动把你本地的 Chrome 浏览器拉起来，并且自动运行所有测试用例。同时，在 unit-test-report 这个目录里面会生成一个 report.html 输出测试结果。

接下来就看你自己的了，你需要去 Jasmine 的主页上面熟悉一下基本语法，然后编写更多的单元测试用例。

### 集成测试

在 `@angular/cli` 自动生成的项目结构里面，有一个 e2e 目录，里面有 3 个文件：

![x](./Resource/集成测试目录.png)

打开 app.po.ts，可以看到下面的内容：

```ts
import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
```

我不打算在这篇文章里面列举 Protractor 的技术特性和 API 列表，借着上面的这段代码，我大概给你介绍一下 Protractor 的整体设计思路和使用方式。

如前所述，Protractor 的底层是 WebDriverJS，从 WebDriverJS 这个名字你可以猜出来，这是一个 Driver（驱动），它是用来和浏览器进程通讯的。

Protractor 在 WebDriverJS 的基础上封装了一层，暴露出了几个非常核心的接口：

- browser 对象：我们可以利用这个对象来操纵浏览器，比如打开和关闭浏览器窗口、让浏览器窗口最大（小）化、控制浏览器导航到某个 URL 路径。
- element 和 by 对象：我们可以利用这两个对象来控制浏览器内部的 HTML 元素，而其基本的语法和 CSS 选择器非常类似，并没有太多的学习成本。

**小结：**

推荐阿里发布的前端自动化测试 f2etest 框架，这是我目前看到的最强大的一款前端自动化框架，而且是开源免费的。f2etest 的底层也是用的 Karma+Jasmine 和 WebDriverJS 这套东西，它在此基础上进行了自己的封装，可以利用多台虚拟机实现浏览器云的效果。关于 f2etest 的更多详情请参考这个链接：[https://github.com/alibaba/f2etest](https://github.com/alibaba/f2etest)，里面有详细的文档和上手教程。

据我所知，虽然已经有了这么多强大的工具，但是国内大多数企业并没有真正去编写测试用例。因为测试用例本身也是代码，而国内大多数企业都会不停地改需求，这就会导致测试用例的代码也需要不停地改。不写测试用例我们已经 996 了，根本没有任何动力去把工作量增加一倍。

所以，如你所知，像 TDD 这种东西，还是让它停留在美丽的幻想里面吧。

对于自动化测试这件事，各位量力而行，能做就做一些，实在不想做的话，最起码要知道怎么做。

当然，我也看到有少量的企业自己搭建了完善的持续集成平台，如果有这样的技术基础，自动化测试做起来会轻松很多。

## 注射器树基础知识

为了能更方便地理解后面的内容，你需要预先理解以下两个概念：

- 组件树
- 注射器树

同时还要介绍一个调试神器 Augury，注意，这货读 ['ɔ:ɡjuri]，是“占卜”、“预言”的意思，不是 angry，不是愤怒！

### 组件树

目前，几乎所有前端框架都在玩“组件化”，而且最近都不约而同地选择了“标签化”这种思路，Angular 也不例外。“标签化”会导致一个很自然的结果，组件之间会形成树形结构。例如，对于下面这样一个界面：

![x](./Resource/组件树界面.png)

用 Angular 实现出来的组件树结构是这样的：

![x](./Resource/组件树结构.png)

### Injector Tree

如你所知，AngularJS 是第一个把“依赖注入”（Dependency Injection）思想带到前端开发领域的框架。

如果一个 DOM 元素上面被创建了 Component 或者 Directive，Angular 就会创建一个对应的注射器实例。

对于上面的组件结构，形成的注射器结构是这样的：

![x](./Resource/注射器结构.png)

很明显，这些 Injector 实例也构成了树形结构

请记住这个树形结构，后续的所有内容都是以此为基础展开的。

### 利用 Augury 可视化查看注射器树

Augury 是一款 Chrome 插件，它是调试 Angular 应用的利器，利用它可以可视化展示组件树、路由树，以及服务依赖关系。

**小结：**

到这里为止，你知道了：在 Angular 应用运行时，组件之间会构成树形结构，Injector（注射器）的实例也会构成树形结构。

接下来，我们从易到难，把注射器玩儿出花来。

**参考资源：**

- [https://angular.io/guide/dependency-injection](https://angular.io/guide/dependency-injection)
- [http://git.oschina.net/mumu-osc/NiceFish](http://git.oschina.net/mumu-osc/NiceFish)

## 依赖注入

Angular 的依赖注入机制很强大，这一节我们玩儿三种最典型的场景：

- 全局单例模式的 Service
- 多实例模式的 Service
- 异步模块上的 Service

### 全局单例模式

我们有一个 UserListComponent，它会利用 UserListService 来加载数据，写法如下。

在 UserListComponent 的构造函数里声明 UserListService：

![x](./Resource/全局单例UserListComponent.png)

编写 UserListService 的具体实现：

![x](./Resource/全局单例UserListService.png)

在根模块 AppModule 的 providers 里面配置 UserListService：

![x](./Resource/全局单例AppModule.png)

运行起来的效果是这样的：

![x](./Resource/全局单例运行效果.png)

再看一下以上代码，你没有直接 new UserListService 对不对？很明显，Angular 在运行时自动帮你创建了 Service 的实例。

OK，看起来不错，但是如何证明这个 Service 是全局单例呢？

我们在界面上再放一个 UserListComponent 的实例，然后把 UserListService 的 id 打印出来看是否相同，就像这样：

![x](./Resource/全局单例修改代码.png)

运行起来的效果是这样的：

![x](./Resource/全局单例运行效果2.png)

可以看到，在两个 UserListComponent 实例中，使用的都是同一个 UserListService 实例。

这种全局单例模式很有用，你可以利用它来实现整个 App 范围内的数据共享。

**注意：在同步 NgModule 里面配置的 provider 在整个 App 范围内都是可见的，也就是说，即使你在某个子模块里面配置的 provider，它们依然是全局可见的，可以被注射到任意类里面。**

### 多实例模式

有人会说，如果我想创建多个 UserListService 实例，怎么办？

我们把 UserListComponent 改成这样：

![x](./Resource/多实例模式UserListComponent.png)

然后在界面上放两个实例，运行起来可以看到，如果把 UserListService 配置在 UserListComponent 内部的 providers 中，就不再是单例模式了，每个 UserListComponent 都拥有自己独立的 UserListService 实例。

组件内部的 provider 生命周期与组件自身保持一致，当组件被销毁的时候，它内部的 provider 也会被销毁掉。

### 异步模块上的注射器

以上都是同步模块，对于懒加载进来的异步模块，注射器是一种什么样的结构呢？

**异步模块里面配置的 providers 只对本模块中的成员可见。如果你在其它模块里面引用异步模块里面配置的 provider，会产生异常。这里的本质原因是，Angular 会给异步加载的模块创建独立的注射器树。**

**小结：**

来总结一下这个注入机制，它的运行规则是这样的：

- 如果组件内部配置了 providers，优先使用组件上的配置来创建注入对象。
- 否则向父层组件继续查找，父组件上找不到继续向所属的模块查找。
- 一直到查询到根模块 AppModule 里面的 providers 配置。
- 如果没有找到指定的服务，抛异常。
- 同步模块里面配置的 providers 是全局可见的，即使是很深的子模块里面配置的 providers，依然是全局可见的。
- **异步模块里面配置的 providers 只对本模块中的成员可见。这里的本质是，Angular 会给异步加载的模块创建独立的注射器树。**
- 组件里面配置的 providers 对组件自身和所有子层组件可见。
- 注射器的生命周期与组件自身保持一致，当组件被销毁的时候，对应的注射器实例也会被销毁。

简而言之，Angular 的 Injector Tree 机制与 JavaScript 的原型查找类似。对于日常的开发来说，知道这些已经足够，可以覆盖 90% 以上的业务场景了。

但是，既然这是一个针对 DI 的专题，我们当然要玩儿一些复杂的花样，请继续下一个小节。

**参考资源：**

- [http://es6.ruanyifeng.com/#docs/decorator](http://es6.ruanyifeng.com/#docs/decorator)
- [https://www.typescriptlang.org/docs/handbook/decorators.html](https://www.typescriptlang.org/docs/handbook/decorators.html)

## @Injectable与@Inject

在真实的应用中，我们需要到服务端去加载数据。这就需要用到 Angular 提供的 HttpClient 服务了，这里我们需要把 HttpClient 服务注射到 UserListService 服务里面去，做法如下：

![x](./Resource/@Injectable示例.png)

别忘记在 app.module 里面 import 一下 HttpClientModule

![x](./Resource/插入HttpClientModule.png)

我们注意到，在以上第一段代码里面，UserListService 顶部有一个 @Injectable 装饰器。那么 @Injectable 到底对 UserListService 做了什么猥琐的事情呢？

我们来看 ng build 之后生成的代码：

![x](./Resource/build后代码.png)

可以看到，编辑器生成了一些奇怪的东西，看起来像是保留了一些类型信息。

如果我们把 @Injectable 删掉会怎么样呢？来看最终编译出来的代码：

![x](./Resource/build后代码2.png)

可以看到，去掉 @Injectable 装饰器之后，生成出来的代码发生了很大的变化，而且运行会报错：

![x](./Resource/@Injectable报错.png)

OK，我们大概可以猜到 @Injectable 装饰器的作用了：如果存在 @Injectable 装饰器，TS 编译器就会在最终生成的代码里面保留类型元数据（实际上是内核里面定义的 decorator 函数），然后 Angular 在运行时就可以根据这些信息来注射指定的对象。否则，运行时就无法解析参数类型了。

**简而言之：如果一个 Service 里面需要依赖其它 Service，需要使用 @Injectable 装饰器进行装饰。**

**为了不给自己找麻烦，最好所有 Service 都加上 @Injectable 装饰器，这是一种良好的编码风格。用 @angular/cli 生成的 Service 会自动在头部加上 @Injectable 装饰器，不需要你操心。**

### 手动档：利用 @Inject 自己指定类型信息

除了在 UserListService 顶部添加 @Injectable 装饰器之外，还有一种非常不常用的方法，利用 @Inject 装饰器手动指定类型信息，代码如下：

![x](./Resource/@Inject示例.png)

编译之后生成的代码如下：

![x](./Resource/@Inject生成代码.png)

可以看到，我们自己使用 @Inject 装饰器编译之后也生成了对应的类型元数据，并且运行起来也不会报错。

**仔细观察你就会发现，用 @Inject 和用 @Injectable 最终编译出来的代码是不一样的。用 @Inject 生成的代码多了很多东西，如果出现大量这种代码，最终编译出来的文件体积会变大。**

### @Inject 的其它用法

在以上例子里面，我们注入的都是强类型的对象。有人就会问了：如果我想注入弱类型的对象字面值可不可以呢？当然可以，但是稍微麻烦一点。比如你想把这样一个配置对象注入给 LiteralService 服务：

![x](./Resource/@Inject示例2.png)

app.module 里面是这样配置的：

![x](./Resource/@Inject配置.png)

在 LiteralService 里面使用 @Inject 来注入：

![x](./Resource/@Inject注入.png)

运行查看效果。

**特别注意：这种玩法非常罕见，除非你想自己实现一些特别猥琐的功能才用得到。比如上面这个例子，你可以直接利用 TypeScript 的 import 机制，直接把配置文件 import 进来完事。**

**总结：**

简而言之，@Injectable 与 @Inject 之间的关系，就像自动档和手动档的区别。如果不是有奇怪的癖好，当然是自动档开起来舒服，老司机都懂的。

- 我们可以自己手动用 @Inject 装饰器来让 TypeScript 编译器保留类型元数据，但是一般来说不需要这么干。（也就是说，@Inject 装饰器一般是用不到的，除非你想做一些猥琐的事情。）
- 保留类型元数据的另一个简便方法是使用 @Injectable 装饰器，@Injectable 并没有什么神奇的作用，它只是告诉 TS 编译器：请生成类型元数据。然后 Angular 在运行时就知道应该注射什么类型的对象了。
- 这是 TypeScript 强加的一个规则，如果不加 @Injectable 装饰器，TS 编译器会把参数类型元数据丢弃。
- **对于 Angular 中的 Service 来说，最好都加上@Injectable 装饰器，这是一种良好的编码风格。**

## @Self的用法

第一节里面说到，Injector 会构成树形结构，**这就意味着，如果我们在父层组件里面定义了 UserListService，子层组件可以直接使用同一个实例**。

那么问题就来了，如果 ChildComponent 想要自己独立的 UserListService 实例，应该怎么做呢？

我们可以利用 `@Self` 装饰器来提示注射器，不要向上查找，只在组件自身内部查找依赖。

顺便说一句：很多初学者遇到异常的时候不仔细看堆栈，碰到问题就在群里叫，然后被人鄙视。

**像“No provider for...”基本上都是因为缺了 providers 配置项导致的，老司机扫一眼就懂，并不需要 Debug，也不需要查文档，知道为什么别人打代码速度辣么快了吧？**

![x](./Resource/令人窒息的操作.png)

## @Optional用法

注射器看到 @Optional 装饰器之后就知道这个服务是可选的，处理逻辑如下：

- 沿着 Injector Tree 向上找一遍，如果找到了需要注入的类型，就创建实例。
- 如果啥都没找到，直接赋值为 null，不抛异常。

**装饰器是可以组合使用的。**

## @SkipSelf用法

从名字可以猜出来它的含义：跳过组件自身，然后沿着 Injector Tree 向上查找。

## @Host用法

Host 这个单词有“宿主”的意思，就像病毒和 OS 之间的关系。你可以意会一下 @Host 这个装饰器的特性。

默认情况下，@Host 装饰器会指示注射器在组件自己内部去查找所依赖的类型，不过如果 @Host 只有这一个特性的话，它就没什么存在的必要了，实际上它更核心的功能与所谓的 Content Projection（内容投影）机制有关。

### Content Projection（内容投影）

有时候，组件内部放什么内容并不固定，而是需要调用方在使用组件的时候去指定，这是 Content Projection 最核心的一个作用。

@Host 装饰器会提示注射器：要么在组件自己内部查找需要的依赖，要么到 Host（宿主）上去查找。

简而言之：**@Host 装饰器是用来在被投影的组件和它的宿主之间构建联系的。**

## 手动操作注射器

官方文档特别强调：开发者可以手动操作 Injector 的实例，但是这种情况非常罕见。

### 注入 Injector 实例

尝试手动操作 Injector 的实例：

![x](./Resource/注入Injector实例.png)

用 Chrome 打开开发者工具看看 Injector 实例上面都有些什么属性。很明显，Injector 本身也是一个服务。

### 手动创建注射器实例

在上面的例子里面，Injector 实例是 Angular 帮我们自动创建的。如果我们自己创建注射器，可不可以呢？

当然是 OK 的，Angular 内核默认提供了 3 种 Injector 的实现：

![x](./Resource/Injector实现.png)

- _NullInjector 是内部使用的私有类，外部无法引用。
- StaticInjector 可以在外部使用，但是文档里面没有描述。
- ReflectiveInjector，反射型注射器。如果你学过 Java 里面的反射机制，从 ReflectiveInjector 这个名字你可以猜测到它内部是怎么运行的。

测试 Demo 的核心代码如下：

```ts
import { Component, OnInit, Injector, ReflectiveInjector } from '@angular/core';
import { TestService } from './service/test.service';

ngOnInit() {
    // 尝试自己手动创建 userListService 实例
    this.userListService=this.injector.get(UserListService);
    console.log(this.userListService);

    this.userListService.getUserList().subscribe((userList:Array<any>)=>{
        this.userList=userList;
    });

    // 尝试自己创建注射器，然后利用注射器自己注射 TestService 服务实例
    let myInjector = ReflectiveInjector.resolveAndCreate([
        { provide: "TestService", useClass: TestService }
    ]);

    console.log(myInjector);

    this.testService = myInjector.get("TestService");

    console.log(this.testService);
}
```

查看运行效果：尝试自己创建注射器，然后利用注射器自己创建了 TestService 服务实例。

**注意：从 Angular 5.x 开始，ReflectiveInjector 被标记成了过时的，官方建议使用静态方法 Injector.create。**

## 综合案例

[OpenWMS](https://github.com/damoqiongqiu/OpenWMS-Frontend) 是一个开源项目，技术特性如下：

- Angular 核心包：7.0.0
- 组件库：PrimeNG 6.1.5
- 图表：ngx-echarts
- 国际化：ngx-translate
- 字体图标：font-awesome

OpenWMS 为你提供了一个可以借鉴的项目模板，把真实业务开发过程中的模块都配置好了。

以下是项目 build 出来的体积：

![x](./Resource/OpenWMS打包.png)

用 webpack-bundle-analyzer 分析之后可以看到各个模块在编译之后所占的体积：

![x](./Resource/分析体积.png)

可以看到，主要是因为 ECharts 和 PrimeNG 占的体积比较大，建议您在使用的时候做一下异步，用不到的组件不要一股脑全部导入进来。

## 快速上手PWA

PWA 是 Google 在 2015 年提出的一种全新的 Web 应用开发规范。PWA 这个缩写是由 Google Chrome 团队的 Alex Russell 提出来的。PWA 的全称是 Progressive Web Apps，翻译成中文是“渐进式WEB应用”。PWA 不针对特定的语言，也不针对特定的框架，它本身只是一种规范，只要你的应用能满足 PWA 提出的规范，那么它就是一款 PWA 应用。

PWA 需要具备的关键特性有：

- 应用无需安装，无需发布到应用市场
- 可以在主屏幕上创建图标
- 可以离线运行，利用后台线程与服务端通讯（由 ServiceWorker 特性来支持）
- 对搜索引擎友好
- 支持消息推送
- 支持响应式设计，支持各种类型的终端和屏幕
- 方便分享，用户可以方便地把应用内部的 URL 地址分享出去

如果你想知道自己的应用是否是 PWA，官方提供了一份清单可供核对：[https://developers.google.com/web/progressive-web-apps/checklist](https://developers.google.com/web/progressive-web-apps/checklist)

Google 官方对 PWA 的描述是这样的：

>Progressive Web Apps are just great web sites that can behave like native apps—or, perhaps, Progressive Web Apps are just great apps, powered by Web technologies and delivered with Web infrastructure.

目前，Apple、Microsoft、Google 已经全部支持 PWA 技术。

>注意：国内外的互联网生态完全不同，国内移动互联网基本上被微信、今日头条所把持，目前微信小程序的影响力比 PWA 更大，微信小程序的数量已经超过 100 万个。另外，很多消息推送服务在国内用不了。

2018 年 3 月 20 日，国内 10 大手机厂商共同参会，支持“快应用”标准，这些厂商包括：华为、中兴、小米、Oppo、Vivo、魅族、联想等。

从技术层面看，“快应用”与 ReactNative 类似，它和 PWA 完全不同。PWA 是完全的 Web 技术，借助于浏览器渲染，是“页面”。而“快应用”是类似于 RN 的“原生渲染”模式，JS 相关的代码运行在 JSCore 里面，然后通过 Bridge 驱动原生代码渲染 UI 界面，整体思路如下图：

![x](./Resource/快应用.png)

[示例项目](https://github.com/damoqiongqiu/NiceFish-ionic)

**参考资源：**

- 2015 年 11 月，Alex Russell 关于 PWA 的[原始文章](https://medium.com/@slightlylate/progressive-apps-escaping-tabs-without-losing-our-soul-3b93a8561955)
- Google 官方提供的[文档](https://developers.google.com/web/progressive-web-apps/)
- [快应用官方网站](https://www.quickapp.cn/)

## 爬坑

- 很多开发者到我这里来抱怨说，在 Windows 平台上安装 @angular/cli 会报很多 error，那是因为 @angular/cli 在 Windows 平台上面依赖 Python 和 Visual Studio 环境，而很多开发者的机器上并没有安装这些东西。为什么要依赖这些环境？因为某些 npm 包需要在你本地进行源码编译。
- node-sass 模块被墙的问题，强烈推荐使用 cnpm 进行[安装](http://npm.taobao.org/)，可以非常有效地避免撞墙。
- 一些开发者来抱怨说 @angular/cli 在打包的时候加上 --prod 参数会报错，无法编译。这是一个很常见的问题，因为 @angular/cli 最新的版本经常会有 bug，只要在项目的 package.json 里面降低一个小版本号就 OK 了。另外，加 --prod 参数之后，编译器会进行更加严格的检查，如果存在无用的组件或者配置错误，编译过不去。
- @angular/cli 默认生成的 karma.conf.js 配置文件里面采用了一个有 bug 的 html 报告生成器，导致 ng test 运行报错，我们需要把这个 reporter 改成 mocha（摩卡），具体的配置和实例请参考“前端自动化测试”中的讲解。
- 有一些朋友说，本地开发的时候运行得很好，上线之后所有请求 404。这也是一个常见的坑，因为你需要给 Web 容器配置一下处理 HTTP 请求的规则，把前端路由扔回去交给 Angular 处理，请参考[这里](https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions)。

**ERROR in node_modules/rxjs/internal/types.d.ts(81,44): error TS1005: ';' expected.**

原因：rxjs版本问题造成的

解决方案：

1.使用npm：
```sh
npm uninstall rxjs --save
npm install rxjs@6.3.3 --save
```
2.使用yarn
```sh
yarn remove rxjs
yarn add rxjs@6.3.3
```

### 构建

如果要发布在子网站下，需要做如下配置：

**1、html中引用的静态文件要从assets开始写，不可以使用相对路径**

```html
<!-- 不可以，会出现路径引用错误，找不到此图片文件 -->
<img src="../images/bg.png"/>
<!-- 是可以的，正常显示 -->
<img src="assets/images/bg.png"/>
```

**2、karma.conf.js**

```js
module.exports = function (config) {
  config.set({
    basePath: 'attd',  // 修改此处，部署在子网站[应用] attd 下
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    // 其余配置...
  })
}
```

**3、index.html**

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>考勤管理</title>
  <base href="/attd/"> <!-- 部署在子网站[应用] attd 下 -->
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
  <app-root></app-root>
</body>
</html>
```

**4、angular.json**

```json
"serve": {
  "builder": "@angular-devkit/build-angular:dev-server",
  "options": {
    "baseHref": "/attd/",  // 添加，调试时和部署时子目录统一
    "browserTarget": "attence:build"
  },
  // ...
}
```

## 总结

### 环境变量

首先在 angular.json 文件中复制 production 部分代码，然后放在当前代码的后面，将 `production` 更改为 `test`, 文件引用更改为`environment.test.ts`。

**构建所需环境的项目：**

```sh
# 1. 构建生产环境项目
# 默认使用的就是environment.prod.ts
ng build
ng build --configuration=production

# 2. 构建测试环境项目
ng build --configuration=test

# 3. 开发环境
# 直接启动默认就是开发环境
ng serve

# 4. 压缩文件
# --prod: 压缩构建文件
ng build --prod
```



## 参考

- [Angular 官网](https://angular.io/)
- [Angular 官方文档](https://angular.io/docs/ts/latest/quickstart.html)
- [Angular 中文文档](https://angular.cn/docs)
- [Angular Github](https://github.com/angular/angular)
- [ngx-admin](https://github.com/akveo/ngx-admin)：基于 Angular 8+ 和 [Nebular](https://github.com/akveo/nebular) 的管理模板
- [angular2-rxjs-chat](https://github.com/ng-book/angular2-rxjs-chat)：基于 Angular 2 的聊天小程序（网页版）
- [Angular 基础教程](https://gitbook.cn/m/mazi/comp/column?columnId=5bebdaf22c33167c317cc285&utm_source=dmsd001)
- [Schematics 的用法文档，请点击这里查看](https://www.npmjs.com/package/@angular-devkit/schematics)
- [@angular/cli 官方的 wiki 文档，请点击这里查看](https://github.com/angular/angular-cli/wiki)
- [workspace 多项目配置，请点击这里查看](https://angular.io/guide/workspace-config)
- [Angular 官方 blog 里面关于 Schematics 的解释，请点击这里查看](https://blog.angular.io/schematics-an-introduction-dc1dfbc2a2b2)
- [SASS 的 API 请参考官方网站](http://sass-lang.com/)
- [学习 RxJS](https://rxjs-cn.github.io/learn-rxjs-operators/)
- [Angualr6表单提交验证并跳转](https://www.cnblogs.com/yangchaojie/p/9686028.html)
