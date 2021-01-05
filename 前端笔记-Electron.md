# 跨平台框架

## 目录

1. [技术选型](#技术选型)
2. [PhoneGap](#PhoneGap)
3. [React Native](#React&nbsp;Native)
   - [搭建开发环境](#搭建开发环境)
   - [集成到现有原生应用](#集成到现有原生应用)
4. [Electron](#Electron)
5. [参考](#参考)



## 技术选型

**React Native** (RN) 的开发者是 Facebook，Facebook 本身也在尝试使用 RN 技术开发自己的 App。

RN 使用 JS 更新虚拟 DOM，通过一个桥接器将需要更新的结果通知到 UI 层，让 Native 执行 UI 的改变。

![x](./Resource/RN渲染.png)

**Weex** 核心思想上，与 RN 其实并没有什么区别，Weex 也可以算是站在 RN 的肩膀上起步的，目前活跃度不高，大多数是在观望中。Weex 使用 Vue，熟悉 Vue 的开发者可能会更熟悉。

**Flutter**是谷歌的移动UI框架，可以快速在iOS和Android上构建高质量的原生用户界面。Flutter可以与现有的代码一起工作。在全世界，Flutter正在被越来越多的开发者和组织使用，并且Flutter是完全免费、开源的。

Flutter中文社区：[https://flutterchina.club/](https://flutterchina.club/)

技术|性能|开发效率|渲染方式|学习成本|可扩展性
-|-|-|-|-|-
Flutter|高，接近原生体验|高|Skia 高性能自绘引擎|低，Widget 组件化|高，采用插件化的库进行扩展
RN/Weex/小程序|有延迟，一般|一般，复杂、效率低|Js驱动原生渲染|高，复杂|一般
原生应用|高|一般|原生渲染|高，需要学习 Android 和 iOS 原生 API|高

Flutter 不使用系统提供的组件，自己实现了一套渲染机制，所以在性能优化、跨平台方面表现优秀。实际体验上，性能比 RN 要高不少。

![x](./Resource/Flutter渲染机制.png)

Flutter 内置了对 Material Design 的支持，给开发者提供了丰富的 UI 控件库选择，同时所有的组件都有扩展，保持了很高的灵活性。

RN 通过 React 也做到了组件式开发，跟 Flutter 相比，多了一个桥接器的转换，性能上肯定不如 Flutter。

Flutter 使用 Dart 实现，Dart 号称要完全取代 JS，不过目前离这个目标还非常远，初期上手还是有一些难度的。

RN 使用 JS 开发，做过前端的都非常熟悉，上手很容易。

**Electron**是一个基于 V8 引擎和 Node.js 的开发框架，允许用 JavaScript 开发跨平台（Windows、Mac OS X 和 Linux）桌面应用。

目前有相当多的桌面应用是使用 Electron 开发的，例如，著名的 Visual Studio Code（微软推出的一个跨平台源代码编辑器）就是用 Electron 开发的；还有蚂蚁小程序（在支付宝中运行的小程序）的开发工具也是用 Electron 来开发的；以小米、华为为主的众多手机厂商推出的快应用（类似于微信小程序）的 IDE 也是用 Electron 开发的。

从 Electron 的主要用户来看，很多都是大厂，如蚂蚁金服、小米、华为、GitHub（Electron 就是 GitHub 推出的）、微软等，由于现在 GitHub 被微软收购了，因而目前 Electron 的后台是微软。

Node.js 和 Electron 堪称 JavaScript 的左右护法，前者让 JavaScript 可以轻而易举地跨越不同类型应用的界限，后者让 JavaScript 可以进入服务端和桌面应用领域。有了这两个护法，JavaScript 可以真正成为唯一的全栈开发语言，从 Web 到移动，再到服务端，再到桌面应用，甚至是终端程序，无所不能。

## Web App, Native APP, Hybird App

1、Web App

主要 HTML, JavaScript, CSS 等 web 技术开发。无需下载，通过不同平台的浏览器访问来实现跨平台，同时可以通过浏览器支持充分使用 HTML5 特性，缺点是这些基于浏览器的应用无法调用系统API来实现一些高级功能，也不适合高性能要求的场合。

2、Native APP

原生应用，用平台特定的开发语言所开发的应用。使用它们的优点是可以完全利用系统的 API 和平台特性，在性能上也最好。缺点是由于开发技术不同，如果你要覆盖多个平台，则要针对每个平台独立开发，无跨平台特性。

3、Hybird App

为了弥补如上两者开发模式的缺陷的产物，分别继承双方的优势：

- 首先它让为数众多的 web 开发人员可以几乎零成本的转型成移动应用开发者；
- 其次，相同的代码只需针对不同平台进行编译就能实现在多平台的分发，大大提高了多平台开发的效率；
- 相较于 web App，开发者可以通过包装好的接口，调用大部分常用的系统API。

## React&nbsp;Native

示例项目：[https://gitee.com/cuo9958/react-native-demo](https://gitee.com/cuo9958/react-native-demo)

创建项目的前提条件：

- nodejs
- react-native-cli：`cnpm install -g react-native-cli`
- Python
- JDK 1.8
- Android Studio
- Git
- Xcode（仅 iOS 项目中）
- Watchman（仅 Mac 系统用到）
- VSCode

### 搭建开发环境

最简单的方法（沙盒环境，不建议国内使用）：

```sh
npm install -g create-react-native-app
# 创建项目
create-react-native-app AwesomeProject
cd AwesomeProject
npm start
```

推荐使用 [Homebrew](https://brew.sh/) 来安装 Node 和 Watchman

>**注意**：不要使用 cnpm！cnpm 安装的模块路径比较奇怪，packager 不能正常识别！node版本，本地测试时选用的是10.6，npm使用官方源

[Yarn](http://yarnpkg.com/) 是 Facebook 提供的替代 npm 的工具，可以加速 node 模块的下载。React Native 的命令行工具用于执行创建、初始化、更新项目、运行打包服务（packager）等任务。

```sh
# 使用nrm工具切换淘宝源
npx nrm use taobao
# 如果之后需要切换回官方源可使用
npx nrm use npm
# Yarn、React Native 的命令行工具（react-native-cli）
npm install -g yarn react-native-cli
```

![x](./Resource/yarn.png)

创建项目：

```sh
react-native init minioaapp --version 0.55.4
```

![x](./Resource/95.png)

- 图中1代表之前安装的 react-native-cli 的命令。
- 图中2代表初始化命令。
- 图中3代表项目的名称，这里是anxintao。
- 图中4代表指定 RN 的版本号，这个参数不传默认使用最新版。
- 图中5代表 RN 具体使用的版本号。

安装 SDK Manager，配置 ANDROID_HOME 环境变量，把 platform-tools 目录添加到环境变量 Path 中：

```txt
set ANDROID_HOME = ...\Android\Sdk
set Path = ...\Android\Sdk\platform-tools
```

真机调试更方便！连接电脑后，在Android手机上打开“开发者选项”和“usb调试”。

```sh
# 查看连接的手机，手机上会弹出认证，点击通过
adb devices
```

最后就可以运行项目（出错时可以多试几次，js server 没有启动时，可以使用 start 命令）：

```sh
react-native run-ios
react-native run-android
```

升级到最新版本：`react-native upgrade`

### 集成到现有原生应用

**Android：**

把 React Native 组件集成到 Android 应用中有如下几个主要步骤：

1. 配置好 React Native 依赖和项目结构。
2. 创建 js 文件，编写 React Native 组件的 js 代码。
3. 在应用中添加一个RCTRootView。这个RCTRootView正是用来承载你的 React Native 组件的容器。
4. 启动 React Native 的 Packager 服务，运行应用。
5. 验证这部分组件是否正常工作。

**从设备上访问开发服务器：**

在启用开发服务器（官方名称 metro，但我们更常称之为 Packager）的情况下，你可以快速的迭代修改应用，然后在设备上立即查看结果。按照下面描述的任意一种方法来使你的设备可以访问到运行在电脑上的开发服务器。

1. (Android 5.0 及以上)使用 adb reverse 命令
   - 运行：`adb reverse tcp:8081 tcp:8081`，不需要更多配置，你就可以使用Reload JS和其它的开发选项了。
2. [(Android 5.0 以下)通过 Wi-Fi 连接你的本地开发服务器](https://reactnative.cn/docs/running-on-device/#android-50-%E4%BB%A5%E4%B8%8B-%E9%80%9A%E8%BF%87-wi-fi-%E8%BF%9E%E6%8E%A5%E4%BD%A0%E7%9A%84%E6%9C%AC%E5%9C%B0%E5%BC%80%E5%8F%91%E6%9C%8D%E5%8A%A1%E5%99%A8)

## Electron

- 安装：`cnpm install electron -g`
- 查看版本：`electron -v`
- 删除：`npm uninstall electron`
- 升级：`npm update electron -g`
- 运行应用：`electron .`

对于 Electron 应用来说，事件分为如下两类：

- 原生事件
- Web 事件

打开对话框：

```js
dialog.showOpenDialog([browserWindow, ]options[, callback])
```

其中 browserWindow 和 callback 都是可选的，browserWindow 参数允许该对话框将自身附加到父窗口，作为父窗口的模态对话框。callback 是回调函数，用于返回打开文件或目录后的返回值（文件或目录的绝对路径），如果步指定 callback 参数，通过 showOpenDialog 方法返回打开的文件或目录的绝对路径。

options 是必选参数，该参数是一个对象，包含了一些用于设置打开对话框的属性，主要属性的功能及含义如下表所示。

属性|数据类型|功能|可选 / 必选
-|-|-|-
title|String|对话框标题|可选
defaultPath|String|默认路径|可选
buttonLabel|String|按钮文本，当为空时，使用默认按钮文本|可选
filters|Array|过滤器，用于过滤指定类型的文件|可选
properties|Array|包含对话框的功能，如打开文件、打开目录、多选等|必选
message|String|将标题显示在打开对话框顶端|可选

Electron 桌面应用支持三种菜单：应用菜单、上下文菜单及托盘菜单。

由于 Electron 是跨平台的，所以选择打包工具时应尽量选择支持多个操作系统平台的，如 [electron-packager](https://github.com/electron-userland/electron-packager)

```sh
npm install electron-packager -g
```

打包：

```sh
electron-packager . firstmenu --electron-version=3.0.0
```

在 Electron 中，可以直接使用组件的 id 引用组件中的属性和方法。

**编译 sqlite 3 模块：**

在 Windows 下 C/C++ 开发环境通常使用 Visual Studio，目前最新的是 Visual Studio 2017，读者可以安装免费的 Visual Studio 2017 社区版，不过社区版安装程序的尺寸很大，安装比较费事，可以单独安装 Windows 的建立[工具](https://github.com/felixrieseberg/windows-build-tools)。

在编译的过程中，需要使用 node-gyp 工具，来为 Node.js 编译本地模块，不过这个工具是用 Python 写的，而且是 Python 2.7，在安装 node-gyp 之前，需要确认一下。如果读者使用的是 Mac OS X 和大多数 Linux 发行版，默认带 Python 2.7，如果读者使用的 Windows，就需要安装 Python 2.7；如果读者的机器上已经安装了多个 Python 版本，建议安装 Anaconda 环境，可以很容易在 Python 2.7 和 Python 3.x 之间切换。

安装完 Python 2.7 后，使用下面的命令安装 node-gyp。

```sh
npm install -g node-gyp
```

node-gyp 的官方地址详见[这里](https://github.com/nodejs/node-gyp)。

一切就绪后，就可以开始编译 sqlite 3 模块了。

现在进入 Electron 工程根目录，使用下面的 3 个命令从零开始安装和编译 sqlite 3 模块。其中 7.1.1 是依赖的 Electron 版本，一般与当前使用的 Electron 版本相同。

```sh
npm install --save sqlite3
npm install --save electron-rebuild
# Linux or Mac
./node_modules/.bin/electron-rebuild -v 7.1.1
# Windows
.\node_modules\.bin\electron-rebuild.cmd -v 7.1.1
```

>注意：如果编译成功，可以直接将 node_modules 目录中的 sqlite 3 子目录备份，以后换到新机器上，直接将 sqlite 3 目录作为 node_modules 目录的子目录即可，这样就不需要再编译 sqlite 3 模块了。

## 打包发布：**

以下任意一种都行

1、electron-packager

[官网](https://github.com/electron-userland/electron-packager)

```sh
npm install electron-packager --save-dev
# 或者 全局安装
npm install electron-packager -g
```

现在准备一个 Electron 工程（假设是 release/Test），首先使用 `electron .` 命令运行工程，接下来在终端进入 release/Test 目录，然后输入下面的命令打包 Test 应用：

```sh
electron-packager . --electron-version=7.1.1
```

其中 electron-packager 命令后面的点（.）表示要打包当前目录的工程，后面的 --electron-version 命令行参数表示要打包的 Electron 版本号，注意，这个版本号不是本地安装的 electron 版本号，而是打包到安装包中的 electron 版本，但建议打包的 Electron 版本尽量与开发中使用的 Electron 版本相同，否则容易出现代码不兼容的问题。在打包的过程中，electron-packager 会下载指定的 Electron 安装包

<b style="color:red">问题</b>：图像目录没在工程目录中

方法1：亡羊补牢（复制图像目录到包目录）

方法2：直接在包目录中修改图像路径

>electron-packager 命令在打包时，会将 Electron 应用的源代码也放到包目录中，因此可以直接修改包目录中的源代码，将图像或其他资源的路径指向正确的文件。

方法3：在开始时将资源放到工程目录中

方法4：使用 Web 资源

修改可执行文件的名称：

```sh
# 执行命令，将可执行程序的名字改为 new。
electron-packager . --executable-name new --electron-version=7.1.1
```

>如果包目录已经存在，可以使用 --overwrite 命令行参数覆盖包目录。

修改应用程序名：

```sh
electron-packager . hello  --electron-version=7.1.1
```

修改应用程序图标：为了方便生成 10 个不同size 的 png 图像，可以利用 sips 命令。因此我们可以编写一个 buildicns.sh 脚本文件，代码如下：

```sh
mkdir me.iconset
sips -z 16 16     icon1024.png --out me.iconset/icon_16x16.png
sips -z 32 32     icon1024.png --out me.iconset/icon_16x16@2x.png
sips -z 32 32     icon1024.png --out me.iconset/icon_32x32.png
sips -z 64 64     icon1024.png --out me.iconset/icon_32x32@2x.png
sips -z 128 128   icon1024.png --out me.iconset/icon_128x128.png
sips -z 256 256   icon1024.png --out me.iconset/icon_128x128@2x.png
sips -z 256 256   icon1024.png --out me.iconset/icon_256x256.png
sips -z 512 512   icon1024.png --out me.iconset/icon_256x256@2x.png
sips -z 512 512   icon1024.png --out me.iconset/icon_512x512.png
cp icon1024.png me.iconset/icon_512x512@2x.png
iconutil --convert icns --output me.icns me.iconset
rm -R me.iconset
```

在上面的代码中，首先会创建一个名为 me.iconset 的目录（该目录必须以 iconset 作为扩展名），然后使用 sips 命令将 1024 × 1024 尺寸的图像压缩成相应尺寸的图像，并将这些图像放到 me.iconset 目录中，然后使用 iconutil 命令生成 me.icns 文件，最后删除 me.iconset 目录。

接下来使用 `sh buildicns.sh` 命令生成 me.icns 文件

将 me.icns 文件改成 electron.icns，也可以修改图标，不过这里使用 --icon 命令行参数修改图标，命令如下：

```sh
electron-packager .  me  --icon=/Users/lining/Desktop/icns/me.icns  --electron-version=7.1.1
```

在 Windows 下修改应用程序图标相对简单，只需要找一个 ico 文件，并使用下面的命令打包即可：

```sh
electron-packager .  me  --icon=D:\MyStudio\resources\electron\images\folder.ico  --electron-version=7.1.1
```

操作系统平台：

一个在 Mac OS X 平台下模拟 Windows 运行环境的工具：

```sh
brew install wine
```

如果指定 --platform 命令行参数为 all，那么 electron-packager 命令就会为所有的平台打包：

```sh
electron-packager .  me  --platform=all --electron-version=7.1.1
```

--platform 命令函数参数除了 all 外，还支持如下 4 个值。

- darwin：Mac OS X 系统
- Linux：Linux 系统
- mas：与 darwin 相同，也是 Mac OS X 系统
- win32：Windows 系统

如果不想生成所有平台的包目录，可以使用上面 4 个值，多个值之间用逗号分隔。

**打包源代码：**

默认情况下，electron-packager 会将源代码直接放到包目录中（app 目录中），不过使用 --asar 命令行参数可以将 Electron 应用中的源代码打包成 asar 文件（app.asar）

```sh
electron-packager .  me  --asar --platform=all  --electron-version=7.1.1
```

不过 asar 文件并不保险，因为可以直接用这个命令解开：`asar extract app.asar app`

如果读者的机器上没有 asar 命令，可以使用下面的命令安装：`npm install asar -g`

**嵌入元信息：**

```sh
electron-packager .  me  --asar --win32metadata.CompanyName="欧瑞科技"  --win32metadata.ProductName="我的Electron应用"  --win32metadata.FileDescription="这是一个测试程序" --win32metadata.OriginalFilename="abcd.exe"  --electron-version=3.0.2
```

命令行参数的描述如下：

- --win32metadata.CompanyName，公司名称
- --win32metadata.ProductName，产品名称
- --win32metadata.FileDescription，文件描述
- --win32metadata.OriginalFilename，原始文件名

2、electron-packager-interactive

使用 electron-packager 工具打包需要指定多个命令行参数，比较麻烦，为了方便，可以使用 electron-packager 交互工具 electron-packager-interactive，这个程序也是一个命令行工具，执行 electron-packager-interactive 后，会在控制台一步一步提示该如何去做。

```sh
npm install  electron-packager-interactive -g
```

**参考：**

- [官网](https://electronjs.org/)
- [electron_gitchat_src](https://github.com/geekori/electron_gitchat_src)

## PhoneGap

<b style="color:red">已过时的技术</b>

1、PhoneGap 是什么

PhoneGap 是一个用基于 HTML，CSS 和 JavaScript 的，创建移动跨平台移动应用程序的快速开发框架。

它使开发者能够利用 iPhone, Android, Palm, Symbian, WP7, Bada 和 Blackberry 智能手机的核心功能——包括地理定位，加速器，联系人，声音和振动等，此外 PhoneGap 拥有丰富的插件，可以以此扩展无限的功能。

PhoneGap 是免费的，但是它需要特定平台提供的附加软件，例如 iPhone 的iPhone SDK，Android 的 Android SDK 等，也可以和 DW5.5 配套开发。

使用 PhoneGap 只比为每个平台分别建立应用程序好一点点，因为虽然基本代码是一样的，但是你仍然需要为每个平台分别编译应用程序。

PhoneGap 针对不同平台的 WebView 做了扩展和封装，使 WebView 这个组件变成可访问设备本地API的强大浏览器，所以开发人员在 PhoneGap 框架下可通过 JavaScript 访问设备本地API。

WebView 组件实质是移动设备的内置浏览器。WebView 这个内置浏览器特性是Web能被打包成本地客户端的基础，可方便的用 HTML5、CSS3 页面布局，这是移动Web技术的优势相对于原生开发）

![x](./Resource/71.png)

2、PhoneGap 的优势

- 可跨平台
- 易用性，基于标准的Web开发技术（html + css + js）
- 提供硬件访问控制api
- 可利用成熟 javascript 框架（JqueryMobile SenchaTouch）
- 方便的安装和使用

3、PhoneGap 的不足

- PhoneGap 应用程序的运行是寄托于移动设备上各平台的内置浏览器 webkit 的，受到 webkit 处理速度影响，以及各个平台的硬件与软件的性能制约，其程序运行的速度会比原生的程序稍微慢点，但是笔者认为，这些问题在1-2年内都会解决，因为现在的硬件的发展速度太快了。
- 还有一些底层的功能需要插件来实现比如（推送功能）
- 平台差异化不同，PhoneGap 应用程序在所有平台上运行界面看起来都一样。即使这个应用程序与原生应用很相像，但对于习惯了 iOS 与 Android 平台的用户来说，会觉得不习惯，他们还是会很快看出差异。

通过综合比较 PhoneGap 的优点与不足，我们认为，如果你想快速实现一般的移动 WebApp 或者普通的2D游戏，那么可以采用 PhoneGap 技术。如果你想要实现需要大量CPU计算的应用或者3D游戏，或者对用户体验及界面有极致的追求，考虑目前的硬件条件和开发成本，使用原生开发来实现比较适合。

4、PhoneGap 前景

2011年10月4日，Adobe 宣布收购了创建了 HTML5 移动应用框架 PhoneGap 和 PhoneGap Build 的新创公司Nitobi Software。这使得 phonegap 有了坚强的后盾，phonegap 的发展前景也是一片光明。与此同时，PhoneGap 的开源框架已经被累积下载 60 万次，借助 PhoneGap 平台，已有数千应用程序建立在 iOS，android 以及其它操作系统之上。

## 参考

- [React Native中文网](https://reactnative.cn/)
