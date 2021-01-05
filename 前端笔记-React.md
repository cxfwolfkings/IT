# 目录

1. 简介
   - [安装](安装)
   - [React的发展历史](#React的发展历史)
   - [React与Vue的对比](#React与Vue的对比)
   - [创建React应用](#创建React应用)
   - [开启Chrome调试](#开启Chrome调试)
   - [样式编写](#样式编写)
   - [数据处理](#数据处理)
   - [前端路由](#前端路由)
   - [元素渲染](#元素渲染)
   - [JSX简介](#JSX简介)
     - [环境配置](#环境配置)
     - [基本语法规则](#基本语法规则)
     - [在JSX中嵌入JavaScript表达式](#在JSX中嵌入JavaScript表达式)
     - [在JavaScript表达式中嵌入JSX](#在JavaScript表达式中嵌入JSX)
     - [JSX中的节点属性](#JSX中的节点属性)
     - [声明子节点](#声明子节点)
     - [在JSX中使用注释](#在JSX中使用注释)
     - [JSX防注入攻击](#JSX防注入攻击)
     - [JSX原理](#JSX原理)
   - [列表循环](#列表循环)
   - [条件渲染](#条件渲染)
   - [事件处理](#事件处理)
   - [表单处理](#表单处理)
   - [组件](#组件)
     - [组件渲染](#组件渲染)
     - [组合组件](#组合组件)
     - [提取组件](#提取组件)
     - [组件生命周期](#组件生命周期)
     - [组件属性](#组件属性)
2. [实战](#实战)
   - [Ajax请求](#Ajax请求)
3. [参考](#参考)

Github 上最流行的示例代码库 [todomvc](http://todomvc.com/)

React 是一个用于构建用户界面的 JAVASCRIPT 库。主要用于构建UI，很多人认为 React 是 MVC 中的 V（视图）。React 起源于 Facebook 的内部项目，用来架设 Instagram 的网站，并于 2013 年 5 月开源。React 拥有较高的性能，代码逻辑非常简单，越来越多的人已开始关注和使用它。



## 安装

- 如果你想学习React或者创建一个单页应用，请看创建React应用
- 如果你想用Node.js构建一个服务端网站，试试 Next.js
- 如果你想构建一个静态的内容网站，试试 Gatsby
- 如果你想构建一个组件库或者与现有代码库集成，请试试More Flexible Toolchains

## React的发展历史

- Facebook 内部用来开发 Instagram
- 2013 年开源了 React
- 随后发布了 React Native
- React 开源协议
  - [知乎专栏 -React 的许可协议到底发生了什么问题？](https://zhuanlan.zhihu.com/p/28618630)
  - [知乎 - 如何看待 Facebook 计划将 React 改为 MIT 许可证？](https://www.zhihu.com/question/65728078)
  - [阮一峰 - 开源许可证教程](http://www.ruanyifeng.com/blog/2017/10/open-source-license-tutorial.html)
  - [阮一峰 - 如何选择开源许可证](http://www.ruanyifeng.com/blog/2011/05/how_to_choose_free_software_licenses.html)
  - React  最后架不住社区的压力，最后还是修改了许可协议条款。我分享，我骄傲。
- [React - Releases](https://github.com/facebook/react/releases)
- 2013 年 7 月 3 日 `v0.3.0`
- 2016 年 3 月 30 日 `v0.14.8`
- 2016 年 4 月 9 日 `v15.0.0`
- 2017 年 9 月 27 日 `v16.0.0`
- 截止到目前：2017 年 11 月 29 日 `v16.2.0`

## React与Vue的对比

### 技术层面

- Vue 生产力更高（更少的代码实现更强劲的功能）
- React 更 hack 技术占比比较重
- 两个框架的效率都采用了虚拟 DOM
  - 性能都差不多
- 组件化
  - Vue 支持
  - React 支持
- 数据绑定
  - 都支持数据驱动视图
  - Vue 支持表单控件双向数据绑定
  - React 不支持双向数据绑定
- 它们的核心库都很小，都是渐进式 JavaScript 库
- React 采用 JSX 语法来编写组件
- Vue 采用单文件组件
  - `template`
  - `script`
  - `style`

### 开发团队

- React 由 Facebook 前端维护开发
- Vue
  - 早期只有尤雨溪一个人
  - 由于后来使用者越来越多，后来离职专职开发维护
  - 目前也有一个小团队在开发维护

### 社区

- React 社区比 Vue 更强大
- Vue 社区也很强大

### Native APP 开发

- React Native
  - 可以原生应用
- Weex
  - 阿里巴巴内部搞出来的一个东西，基于 Vue

## 创建React应用

```sh
# 环境：Node>=6，npm>=5.2
# 创建一个项目：
npx create-react-app my-app
cd my-app
npm start
# npx是一个npm 5.2以上版本自带的包运行工具
```

`create-react-app` 创建的项目默认已经包含了 Webpack，只是为了让我们更快地上手，其配置文件都已经预先通过一个名为 `react-scripts` 的库封装设定好了。如果我们想要自己对它的配置进行修改，或者将一些新的库加入到我们开发的应用中，我们就需要先获取这些配置文件：

```sh
npm run eject
```

实际命令：

```json
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject"
}
```

在项目目录下运行此命令，即可生成 eject 之后的项目，要注意此操作是不可逆的。之后我们便可以在项目目录下看到一个 config 文件夹，其中包含了 webpack.config.dev.js 以及 webpack.config.prod.js 两个 Webpack 的配置文件

## 开启Chrome调试

VS Code 中安装 [Chrome Debugger Extension](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome) 插件，然后在项目文件夹 .vscode 里创建一个 launch.json 的配置文件：

```json
{
  "version": "0.2.0",
  "configurations": [{
    "name": "Chrome",
    "type": "chrome",
    "request": "launch",
    "url": "http://localhost:3000",
    "webRoot": "${workspaceRoot}/src",
    "userDataDir": "${workspaceRoot}/.vscode/chrome",
    "sourceMapPathOverrides": {
      "webpack:///src/*": "${webRoot}/*"
    }
  }]
}
```

保存之后就可以在 VS Code 里连接 Chrome 进行调试了，非常的方便，我们甚至可以直接在代码文件当中设置断点，就能在浏览器中实时生效并进行调试了。

## 样式编写

- CSS Modules
- Sass in React

  ```sh
  cnpm install sass-loader node-sass --save-dev
  ```

- PostCSS

  ```sh
  cnpm install autoprefixer postcss-initial postcss-import postcss-mixins postcss-nested postcss-simple-vars postcss-math postcss-color-function --save-dev
  ```

- Radium
  
  [在线体验 Radium 语法](https://formidable.com/open-source/radium/)

- 其他工具库

  - [React: CSS in JS](http://blog.vjeux.com/2014/javascript/react-css-in-js-nationjs.html)
  - [React: CSS in JS techniques comparison](https://github.com/MicheleBertoli/css-in-js)
  - [Radium](https://github.com/FormidableLabs/radium)
  - [jsxstyle](https://github.com/petehunt/jsxstyle)
  - [ReactCSS](https://github.com/casesandberg/reactcss)
  - [Aphrodite](https://github.com/Khan/aphrodite)
  - [Glamor](https://github.com/threepointone/glamor)
  - [Styletron](https://github.com/rtsao/styletron)
  - [TypeStyle](https://github.com/typestyle/typestyle)
  - [styled-components](https://github.com/styled-components/styled-components)

- 为静态版本的应用添加样式

  使用 Github 上最流行的示例代码库 [todomvc](http://todomvc.com/) 的模板样式：

  ```sh
  npm install --save todomvc-app-css
  ```

## 数据处理

```sh
cnpm install redux --save
cnpm install react-redux --save
```

## 前端路由

前端路由主要需要实现两个基本的功能：一个是改变当前的 url；另一个是根据改变了的 url 更改显示相应的页面内容。我们可以通过 `history.pushState` 方法来操作 url 地址。

至于根据改变后的 url 触发相关页面变化，浏览器本身自带一个 `onpopstate` 事件，但是只有在我们点击返回或前进按钮时才会正常触发，所以我们需要自己动手实现一个绑定事件的功能。

第一步，我们需要改写原本浏览器当中的 history 对象，在 pushState 方法被调用时，除了改变 url，我们还需要让它触发 `onpushstate` 事件。这里直接采用执行匿名函数的方法，完成对 history 对象的 pushState 方法的修改。

第二步，就需要来定义我们的 `window.onpopstate` 方法了，onpopstate 这个方法本来就是需要我们指向一个具体的函数，在这里，我们只进行最简单的操作，在路由切换改变的时候，在页面当中显示出具体的路由。

最后一步，就是为页面上的所有链接添加上事件绑定函数，这样在页面中的链接被点击之后才能够触发我们的 pushState 方法而不是直接从浏览器跳转了。

```js
/* patch history pushState */
(function (history) {
    var pushState = history.pushState;
    history.pushState = function (state) {
        if (typeof history.onpushstate == "function") {
            history.onpushstate({ state: state });
        }
        return pushState.apply(history, arguments);
    }
})(window.history);
/* Add trigger function */
window.onpopstate = history.onpushstate = function (event) {
    document.getElementById('state').innerHTML = "location: " + document.location + ", state: " + JSON.stringify(event.state);
}
/* Bind events to all links */
var elements = document.getElementsByTagName('a');
for (var i = 0, len = elements.length; i < len; i++) {
    elements[i].onclick = function (event) {
        event.preventDefault();
        var route = event.target.getAttribute('href');
        history.pushState({ page: route }, route, route);
        console.log('current state', history.state)
    }
}
```

>注：react-router-dom 默认为我们提供了几种封装好的 Router 组件，我们最常使用的就是 BrowserRouter ，另外还有 HashRouter 可以实现带 # 号的路由。在路由参数的结尾带上 ? 表示该参数为可选参数。

## 元素渲染

元素是构成 React 应用的最小单位，它用于描述屏幕上输出的内容。与浏览器的 DOM 元素不同，React 当中的元素事实上是普通的对象，React DOM 可以确保 浏览器 DOM 的数据内容与 React 元素保持一致。

首先我们在一个 HTML 页面中添加一个 id="example" 的 `<div>`：

```html
<div id="example"></div>
```

在此 div 中的所有内容都将由 React DOM 来管理，所以我们将其称为 "根" DOM 节点。

我们用 React 开发应用时一般只会定义一个根节点。但如果你是在一个已有的项目当中引入 React 的话，你可能会需要在不同的部分单独定义 React 根节点。

要将React元素渲染到根DOM节点中，我们通过把它们都传递给 `ReactDOM.render()` 的方法来将其渲染到页面上：

```js
const element = <h1>Hello, world!</h1>;
ReactDOM.render(
    element,
    document.getElementById('example')
);
```

<b style="color:red">React 元素都是不可变的。当元素被创建之后，你是无法改变其内容或属性的。</b>

目前更新界面的唯一办法是创建一个新的元素，然后将它传入 ReactDOM.render() 方法。React 只会更新必要的部分。值得注意的是 React DOM 首先会比较元素内容先后的不同，而在渲染过程中只会更新改变了的部分。

## JSX简介

- [Introducing JSX](https://reactjs.org/docs/introducing-jsx.html)
- [JSX In Depth](https://reactjs.org/docs/jsx-in-depth.html)
- [React Without JSX](https://reactjs.org/docs/react-without-jsx.html)

React 使用 JSX 来替代常规的 JavaScript。JSX 是一个看起来很像 XML 的 JavaScript 语法扩展。我们不需要一定使用 JSX，但它有以下优点：

- JSX 执行更快，因为它在编译为 JavaScript 代码后进行了优化。
- 它是类型安全的，在编译过程中就能发现错误。
- 使用 JSX 编写模板更加简单快速。

### 环境配置

- 非模块化环境
  - `babel-standalone`
- 模块化环境
  - `babel-preset-react`
- Babel REPL 赋值查看编译结果

### 基本语法规则

- 必须只能有一个根节点
- 遇到 HTML 标签 （以 `<` 开头） 就用 HTML 规则解析
  - 单标签不能省略结束标签。
- 遇到代码块（以 `{` 开头），就用 JavaScript 规则解析
- JSX 允许直接在模板中插入一个 JavaScript 变量
  - 如果这个变量是一个数组，则会展开这个数组的所有成员添加到模板中
- 单标签必须结束 `/>`

我们来观察一下声明的这个变量：

```jsx
const element = <h1>Hello, world!</h1>;
```

这种看起来可能有些奇怪的标签语法既不是字符串也不是 HTML。它被称为 JSX， 一种 JavaScript 的语法扩展。 我们推荐在 React 中使用 JSX 来描述用户界面。JSX 乍看起来可能比较像是模版语言，但事实上它完全是在 JavaScript 内部实现的。

>注意：由于 JSX 就是 JavaScript，一些标识符像 class 和 for 不建议作为 XML 属性名。作为替代，React DOM 使用 className 和 htmlFor 来做对应的属性。

### 在JSX中嵌入JavaScript表达式

```jsx
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

我们书写 JSX 的时候一般都会带上换行和缩进，这样可以增强代码的可读性。与此同时，我们同样推荐在 JSX 代码的外面扩上一个小括号，这样可以防止分号自动插入的bug。

### 在JavaScript表达式中嵌入JSX

```jsx
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}
```

JSX 本身其实也是一种表达式，在编译之后呢，JSX 其实会被转化为普通的 JavaScript 对象。这也就意味着，你其实可以在 if 或者 for 语句里使用 JSX，将它赋值给变量，当作参数传入，作为返回值都可以。

### JSX中的节点属性

- 动态绑定属性值
- `class` 使用 `className`
- `tabindex` 使用 `tabIndex`
- `for` 使用 `htmlFor`

普通的属性：

```jsx
const element = <div tabIndex="0"></div>;
```

在属性中使用表达式：

```jsx
const element = <img src={user.avatarUrl}></img>;
```

### 声明子节点

如果标签是空的，可以使用 `/>` 立即关闭它。

```jsx
const element = <img src={user.avatarUrl} />;
```

JSX 子节点可以包含子节点：

```jsx
const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);
```

### 在JSX中使用注释

写法一：

```jsx
{
  // 注释
  // ...
}
```

写法二（单行推荐）：

```jsx
{/* 单行注释 */}
```

写法三（多行推荐）：

```jsx
{
  /*
   * 多行注释
   */
}
```

### JSX防注入攻击

你可以放心地在 JSX 当中使用用户输入：

```js
const title = response.potentiallyMaliciousInput;
// 直接使用是安全的：
const element = <h1>{title}</h1>;
```

React DOM 在渲染之前默认会 过滤 所有传入的值。它可以确保你的应用不会被注入攻击。所有的内容在渲染之前都被转换成了字符串。这样可以有效地防止 XSS(跨站脚本) 攻击。

### JSX原理

Babel 转译器会把 JSX 转换成一个名为 `React.createElement()` 的方法调用。下面两种代码的作用是完全相同的：

```js
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);

const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```

React.createElement() 这个方法首先会进行一些避免bug的检查，之后会返回一个类似下面例子的对象：

```js
// 注意: 以下示例是简化过的（不代表在 React 源码中是这样）
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world'
  }
};
```

这样的对象被称为 “React元素”。它代表所有你在屏幕上看到的东西。React 通过读取这些对象来构建 DOM 并保持数据内容一致。

## 列表循环

JSX 允许直接在模板插入 JavaScript 变量。如果这个变量是一个数组，则会展开这个数组的所有成员。

```jsx
var arr = [
  <h1>Hello world!</h1>,
  <h2>React is awesome</h2>,
];
ReactDOM.render(
  <div>{arr}</div>,
  document.getElementById('example')
);
```

综上所述，我们可以这样：

```jsx
var names = ['Alice', 'Emily', 'Kate'];

ReactDOM.render(
  <div>
  {
    names.map(function (name) {
      return <div>Hello, {name}!</div>
    })
  }
  </div>,
  document.getElementById('example')
);
```

### DOM Elements

> 参考文档：[https://reactjs.org/docs/dom-elements.html](https://reactjs.org/docs/dom-elements.html)

### 列表渲染

> 参考文档：[https://reactjs.org/docs/lists-and-keys.html](https://reactjs.org/docs/lists-and-keys.html)

### 语法高亮

> [http://babeljs.io/docs/editors](http://babeljs.io/docs/editors)

## 条件渲染

> 参考文档：[https://reactjs.org/docs/conditional-rendering.html](https://reactjs.org/docs/conditional-rendering.html)

**示例1：**

```jsx
function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

ReactDOM.render(
  // Try changing to isLoggedIn={true}:
  <Greeting isLoggedIn={false} />,
  document.getElementById('root')
);
```

**示例2：**

```jsx
function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}

class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;

    let button = null;
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}

ReactDOM.render(
  <LoginControl />,
  document.getElementById('root')
);
```

**示例3（行内判断）：**

```jsx
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
  );
}

const messages = ['React', 'Re: React', 'Re:Re: React'];
ReactDOM.render(
  <Mailbox unreadMessages={messages} />,
  document.getElementById('root')
);
```

**示例4（if-else）：**

```jsx
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
    </div>
  );
}
```

```jsx
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      {isLoggedIn ? (
        <LogoutButton onClick={this.handleLogoutClick} />
      ) : (
        <LoginButton onClick={this.handleLoginClick} />
      )}
    </div>
  );
}
```

**示例5（阻止组件渲染）：**

```jsx
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return (
    <div className="warning">
      Warning!
    </div>
  );
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showWarning: true}
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(prevState => ({
      showWarning: !prevState.showWarning
    }));
  }

  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'Hide' : 'Show'}
        </button>
      </div>
    );
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('root')
);
```

## 事件处理

> 参考文档：[https://reactjs.org/docs/handling-events.html](https://reactjs.org/docs/handling-events.html)

**示例1：**

```jsx
<button onclick="activateLasers()">
  Activate Lasers
</button>
```

```jsx
<button onClick={activateLasers}>
  Activate Lasers
</button>
```

**示例2：**

```html
<a href="#" onclick="console.log('The link was clicked.'); return false">
  Click me
</a>
```

```jsx
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
```

**示例3（this 绑定问题）：**

```jsx
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);
```

箭头函数：

```jsx
class LoggingButton extends React.Component {
  // This syntax ensures `this` is bound within handleClick.
  // Warning: this is *experimental* syntax.
  handleClick = () => {
    console.log('this is:', this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}
```

更简单的方式：

```jsx
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    // This syntax ensures `this` is bound within handleClick
    return (
      <button onClick={(e) => this.handleClick(e)}>
        Click me
      </button>
    );
  }
}
```

**示例4（传递参数）：**

```jsx
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

### Class 和 Style

class:

```jsx
<div className="before" title="stuff" />
```

style:

```jsx
<div style={{color: 'red', fontWeight: 'bold'}} />
```

## 表单处理

> 参考文档：[https://reactjs.org/docs/forms.html](https://reactjs.org/docs/forms.html)

## 组件

组件可以将UI切分成一些独立的、可复用的部件，这样你就只需专注于构建每一个单独的部件。组件从概念上看就像是函数，它可以接收任意的输入值（称之为"props"），并返回一个需要在页面上展示的React元素。

**函数式组件（无状态）：**

- 名字不能用小写
  - React 在解析的时候，是以标签的首字母来区分的
  - 如果首字母是小写则当作 HTML 来解析
  - 如果首字母是大小则当作组件来解析
  - 结论：组件首字母必须大写

定义一个组件最简单的方式是使用JavaScript函数：

```js
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

该函数是一个有效的React组件，它接收一个单一的"props"对象并返回了一个React元素。我们之所以称这种类型的组件为函数定义组件，是因为从字面上来看，它就是一个JavaScript函数。

**类方式组件（有状态）：**

你也可以使用 ES6 class 来定义一个组件：

```js
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

上面两个组件在React中是相同的。

**组件规则注意事项：**

- 组件类的第一个首字母必须大写
- 组件类必须有 `render` 方法
- 组件类必须有且只有一个根节点
- 组件属性可以在组件的 `props` 获取
  - 函数需要声明参数：`props`
  - 类直接通过 `this.props`

### 组件渲染

在前面，我们遇到的React元素都只是DOM标签，然而，React元素也可以是用户自定义的组件。当React遇到的元素是用户自定义的组件，它会将JSX属性作为单个对象传递给该组件，这个对象称之为"props"。

例如，这段代码会在页面上渲染出"Hello, Sara"：

```js
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
  
const element = <Welcome name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

我们来回顾一下在这个例子中发生了什么：

1. 我们对`<Welcome name="Sara" />`元素调用了ReactDOM.render()方法。
2. React将 `{ name: 'Sara' }` 作为 props 传入并调用Welcome组件。
3. Welcome组件将`<h1>Hello, Sara</h1>`元素作为结果返回。
4. React DOM将DOM更新为`<h1>Hello, Sara</h1>`。

>警告：组件名称必须以大写字母开头。

### 组合组件

组件可以在它的输出中引用其它组件，这就可以让我们用同一组件来抽象出任意层次的细节。在React应用中，按钮、表单、对话框、整个屏幕的内容等，这些通常都被表示为组件。

例如，我们可以创建一个App组件，用来多次渲染Welcome组件：

```js
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
  
function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}
  
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

通常，一个新的React应用程序的顶部是一个App组件。但是，如果要将React集成到现有应用程序中，则可以从下而上使用像Button这样的小组件作为开始，并逐渐运用到视图层的顶部。

>警告：组件的返回值只能有一个根元素。这也是我们要用一个`<div>`来包裹所有`<Welcome />`元素的原因。

### 提取组件

你可以将组件切分为更小的组件，这没什么好担心的。例如，来看看这个Comment组件：

```js
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

这个组件接收author（对象）、text（字符串）、以及date（Date对象）作为props，用来描述一个社交媒体网站上的评论。

这个组件由于嵌套，变得难以被修改，可复用的部分也难以被复用。所以让我们从这个组件中提取出一些小组件。

首先，我们来提取Avatar组件：

```js
function Avatar(props) {
  return (
    <img className="Avatar"
      src={props.user.avatarUrl}
      alt={props.user.name}
    />
  );
}
```

Avatar作为Comment的内部组件，不需要知道是否被渲染。因此我们将author改为一个更通用的名字user。

我们建议从组件自身的角度来命名props，而不是根据使用组件的上下文命名。现在我们可以对Comment组件做一些小小的调整：

```js
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <Avatar user={props.author} />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

接下来，我们要提取一个UserInfo组件，用来渲染Avatar旁边的用户名：

```js
function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">
        {props.user.name}
      </div>
    </div>
  );
}
```

这可以让我们进一步简化Comment组件：

```js
function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

提取组件一开始看起来像是一项单调乏味的工作，但是在大型应用中，构建可复用的组件完全是值得的。当你的UI中有一部分重复使用了好几次（比如，Button、Panel、Avatar），或者其自身就足够复杂（比如，App、FeedStory、Comment），类似这些都是抽象成一个可复用组件的绝佳选择，这也是一个比较好的做法。

无论是使用函数或是类来声明一个组件，它决不能修改它自己的props。来看这个sum函数：

```js
function sum(a, b) {
  return a + b;
}
```

类似于上面的这种函数称为“纯函数”，它没有改变它自己的输入值，当传入的值相同时，总是会返回相同的结果。

与之相对的是非纯函数，它会改变它自身的输入值：

```js
function withdraw(account, amount) {
  account.total -= amount;
}
```

React是非常灵活的，但它也有一个严格的规则；所有的React组件必须像纯函数那样使用它们的props。

当然，应用的界面是随时间动态变化的，我们将在下面介绍一种称为"state"的新概念，State可以在不违反上述规则的情况下，根据用户操作、网络响应、或者其他状态变化，使组件动态的响应并改变组件的输出。

**`this.props.children`：**

> 参考文档：[https://reactjs.org/docs/react-api.html#reactchildren](https://reactjs.org/docs/react-api.html#reactchildren)

`this.props` 对象的属性与组件的属性一一对应，但是有一个例外，就是 `this.props.children` 属性。

它表示组件的所有子节点。

`this.props.children` 的值有三种可能：如果当前组件没有子节点，它就是 `undefined`;如果有一个子节点，数据类型是 `object` ；如果有多个子节点，数据类型就是 `array` 。所以，处理 `this.props.children` 的时候要小心。

React 提供一个工具方法 [`React.Children`](https://facebook.github.io/react/docs/top-level-api.html#react.children) 来处理 `this.props.children` 。我们可以用 `React.Children.map` 来遍历子节点，而不用担心 `this.props.children` 的数据类型是 `undefined` 还是 `object`。

### 组件生命周期

![x](./Resource/84.png)

**组件状态 State：**

> 参考文档：[https://reactjs.org/docs/state-and-lifecycle.html](https://reactjs.org/docs/state-and-lifecycle.html)

**组件生命周期：**

> 参考文档：[https://reactjs.org/docs/state-and-lifecycle.html](https://reactjs.org/docs/state-and-lifecycle.html)
>
> 完整生命周期 API：[https://reactjs.org/docs/react-component.html#the-component-lifecycle](https://reactjs.org/docs/react-component.html#the-component-lifecycle)

到目前为止我们只学习了一种方法来更新UI。我们调用 ReactDOM.render() 方法来改变输出：

```js
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(
    element,
    document.getElementById('root')
  );
}  
setInterval(tick, 1000);
```

接下来，我们将学习如何使Clock组件真正可重用和封装。它将设置自己的计时器，并每秒钟更新一次。我们可以从封装时钟开始：

```js
function Clock(props) {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}
  
function tick() {
  ReactDOM.render(
    <Clock date={new Date()} />,
    document.getElementById('root')
  );
}
  
setInterval(tick, 1000);
```

然而，它错过了一个关键的要求：Clock设置一个定时器并且每秒更新UI应该是Clock的实现细节。理想情况下，我们写一次 Clock 然后它能更新自身：

```js
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

为了实现这个需求，我们需要为Clock组件添加状态。状态与属性十分相似，但是状态是私有的，完全受控于当前组件。我们之前提到过，定义为类的组件有一些特性。局部状态就是如此：一个功能只适用于类。

将函数转换为类，你可以通过5个步骤将函数组件 Clock 转换为类

1. 创建一个名称扩展为 React.Component 的ES6 类
2. 创建一个叫做render()的空方法
3. 将函数体移动到 render() 方法中
4. 在 render() 方法中，使用 this.props 替换 props
5. 删除剩余的空函数声明

```jsx
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

Clock 现在被定义为一个类而不只是一个函数，使用类就允许我们使用其它特性，例如局部状态、生命周期钩子。

**和服务端交互：**

组件的数据来源，通常是通过 Ajax 请求从服务器获取，可以使用 `componentDidMount` 方法设置 Ajax 请求，等到请求成功，再用 `this.setState` 方法重新渲染 UI 。

**获取真实 DOM 节点：**

> 参考文档：[https://reactjs.org/docs/refs-and-the-dom.html](https://reactjs.org/docs/refs-and-the-dom.html)

组件并不是真实的 DOM 节点，而是存在于内存之中的一种数据结构，叫做虚拟 DOM （virtual DOM）。只有当它插入文档以后，才会变成真实的 DOM 。根据 React 的设计，所有的 DOM 变动，都先在虚拟 DOM 上发生，然后再将实际发生变动的部分，反映在真实 DOM上，这种算法叫做 [DOM diff](http://calendar.perfplanet.com/2013/diff/) ，它可以极大提高网页的性能表现。

但是，有时需要从组件获取真实 DOM 的节点，这时就要用到 `ref` 属性。

示例：

```jsx
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  focusTextInput() {
    // Explicitly focus the text input using the raw DOM API
    this.textInput.focus();
  }

  render() {
    // Use the `ref` callback to store a reference to the text input DOM
    // element in an instance field (for example, this.textInput).
    return (
      <div>
        <input
          type="text"
          ref={(input) => { this.textInput = input; }} />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}
```

### 组件属性

**PropTypes 类型校验：**

> 参考文档：[https://reactjs.org/docs/typechecking-with-proptypes.html](https://reactjs.org/docs/typechecking-with-proptypes.html)

组件的属性可以接受任意值，字符串、对象、函数等等都可以。有时，我们需要一种机制，验证别人使用组件时，提供的参数是否符合要求。

示例：

```jsx
import PropTypes from 'prop-types';

class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

Greeting.propTypes = {
  name: PropTypes.string
};
```

**Default Prop Values：**

> 参考文档：[https://reactjs.org/docs/typechecking-with-proptypes.html#default-prop-values](https://reactjs.org/docs/typechecking-with-proptypes.html#default-prop-values)

示例：

```jsx
class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

// Specifies the default values for props:
Greeting.defaultProps = {
  name: 'Stranger'
};

// Renders "Hello, Stranger":
ReactDOM.render(
  <Greeting />,
  document.getElementById('example')
);
```

或者：

```jsx
class Greeting extends React.Component {
  static defaultProps = {
    name: 'stranger'
  }

  render() {
    return (
      <div>Hello, {this.props.name}</div>
    )
  }
}
```

## TodoMVC

- [classnames](https://github.com/JedWatson/classnames)

### 开始

下载模板：

```shell
git clong https://github.com/tastejs/todomvc-app-template.git --depth=1 todomvc-react
```

安装依赖：

```shell
cd todomvc-react
npm install
```

安装 `react` 开发环境依赖：

```shell
npm install --save babel-standalone react react-dom
```

## React 其它

### React DevTools

> [https://github.com/facebook/react-devtools](https://github.com/facebook/react-devtools)

### create-react-app

## 实战

### Ajax请求

**jQuery $.ajax**

>这是一个快速又粗暴的方案。在旧版本的官方 React 教程（official React tutorial）中，他们使用了 jQuery $.ajax 来示范如何从服务器获取数据。如果你是刚刚开始学习和把玩 React，jQuery 可以节省你大量入门和开发的时间，因为我们都对 jQuery 非常熟悉了。这是 jQuery 实现 AJAX 的例子：

```js
loadCommentsFromServer: function() {
    $.ajax({
        url: this.props.url,
        dataType: 'json',
        cache: false,
        success: function(data) {
            this.setState({data: data});   // 注意这里
        }.bind(this),
        error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
        }.bind(this)
    });
}
```

这里演示了如何在一个 React 组件里面使用 jQuery 的 $.ajax。唯一需要注意的是如何在 success 回调里面调用 this.setState() ，即当 jQuery 成功收到数据之后应该如何通过 React 的 API 更新 state 的。

然而，jQuery 是一个包含很多功能的大头儿，只为了用一下 AJAX 功能而引入整个 jQuery 是没有意义的（除非你还使用 jQuery 做了很多别的事情）。So，用什么才好？答案是 fetch API。

**[Fetch API](https://github.com/github/fetch)**

>Fetch 是个新的、简单的、标准化的API，旨在统一Web通信机制，并替代 XMLHttpRequest。它已经被主流浏览器所支持，针对较旧的浏览器也有了一个 polyfill （Benz乱入：polyfill 直译是填充工具，就是旧浏览器本来不支持某个新的JS API，引入一段js代码后就支持了，这一段js代码给旧浏览器”填充“了一个API。这个单词我实在不知道怎么翻译 ，感觉反而保留原单词不翻译更能让读者理解。）。如果你在使用 Node.js ，你也可以通过 node-fetch 来使 Node.js 支持 Fetch。

若把上述用 jQuery $.ajax 的代码段改成 fetch 实现的话，代码应该长这样子：

```js
loadCommentsFromServer: function() {
  fetch(this.props.url).then(function(response){
    // 在这儿实现 setState
  });
}
```

在一些流行的 React 教程中你也许会发现 fetch 的身影。要了解更多关于 fetch 的情况，可参考下列链接（全英文）：

- Mozilla
- David Walsh Blog
- Google Developers
- WHATWG

**[SuperAgent](https://github.com/visionmedia/superagent)**

>SuperAgent 是一个轻量级的 AJAX API 库，为更好的可读性和灵活性而生。如果某些原因让你不太想用 fetch，那么 SuperAgent 就几乎是必然的选择了。SuperAgent 的用法大概是这样的：

```js
loadCommentsFromServer: function() {
  request.get(this.props.url).end(function(err,res){
    // 在这儿实现 setState
  });
}
```

SuperAgent 也有 Node.js 版本，API 是一样的。如果你在用 Node.js 和 React 开发同构应用（Benz 乱入：这个链接是我加的，旨在照顾初学者），你可以用 webpack 之类的东西嵌入 superagent 并让它适用于浏览器端。因为浏览器端和服务器端的 API 是一样的，所以其 Node.js 版本不需要修改任何代码就可以在浏览器上运行。

**[Axios](https://github.com/axios/axios)**

>Axios 是一个基于 promise 对象（Benz 乱入：这个链接也是我加的）的 HTTP 客户端。与 fetch 和 superagent 一样，它同时支持浏览器端和 Node.js 端。另外你可以在其 Github 主页上发现，它有很多很实用的高级功能。

这是 Axios 的大概用法：

```js
loadCommentsFromServer: function() {
  axios.get(this.props.url).then(function(response){
    // 在这儿实现 setState
  }).catch(function(error){
    // 处理请求出错的情况
  });
}
```

**[Request](https://github.com/request/request)**

>若不介绍这个 request 库，感觉上本文会不太完整。这是一个在思想上追求极简设计的JS库，在 Github 上拥有超过 12k 的 star （Benz 乱入：我翻译这文章时已经 16k+ star 了）。它也是最流行的 Node.js 模块之一。进入它的 GitHub 主页 了解更多。

用法示例：

```js
loadCommentsFromServer: function() {
  request(this.props.url, function(err, response, body){
    // 在这儿实现 setState
  });
}
```

**我的选择**

因为 fetch 是新的标准化的API，所以，在任何需要 AJAX 的地方（不论在 React 里或是其他所有 JS 应用），我都更倾向于使用 fetch。

原文链接：[https://blog.csdn.net/ZYC88888/java/article/details/82531610](https://blog.csdn.net/ZYC88888/java/article/details/82531610)

## 参考

- [React官网](https://www.reactjscn.com/)
- [React - GitHub](https://github.com/facebook/react)
- [阮一峰 - React 技术栈系列教程](http://www.ruanyifeng.com/blog/2016/09/react-technology-stack.html)
- [阮一峰 - React 入门实例教程](http://www.ruanyifeng.com/blog/2015/03/react.html)
- [awesome react](https://github.com/enaqx/awesome-react)
- [awesome-react-components](https://github.com/brillout/awesome-react-components)
- [路由](https://reacttraining.com/react-router/web/guides/quick-start)
- [Create React App](https://github.com/facebook/create-react-app#create-react-app)
- [Fabric](https://github.com/OfficeDev/office-ui-fabric-react#using-fabric-react)：一款用于构建类似Office和Office 365风格的React组件库。
- [Grommet](https://v2.grommet.io/)：一款针对企业应用开发的最高端的UX框架库。
- [React-toolbox](https://github.com/react-toolbox/react-toolbox/)：你是否听说过CSS Modules？React-Toolbox就是基于这个的。它允许你只需要引入CSS，而不需要使用像Purify-CSS这样的工具。另外React-toolbox还是包括了30多个开箱即用组件的高质量可自定义的库。
- [react-bootstrap](https://github.com/react-bootstrap/react-bootstrap)：React-Bootstrap是一款基于ReactJS对Bootstrap进行封装的库
- [blueprint](https://github.com/palantir/blueprint)：一款针对桌面应用程序构建复杂、数据密集的Web界面进行了优化的UI组件库
- [Ant-design](https://github.com/ant-design/ant-design)：阿里巴巴团队出品的ReactUI组件库
- [Semantic-UI-React](https://github.com/Semantic-Org/Semantic-UI-React)：个人认为最优秀的ReactUI框架
- [React-Desktop](http://reactdesktop.js.org/)：一款面向MacOS Sierra和Windows10桌面风格的ReactUI组件库。
- [Material-UI](https://github.com/callemall/material-ui)：一款React组件库来实现Google的Material Design风格UI界面框架。也是首个React的UI工具集之一。
