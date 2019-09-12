# vscode

## 目录

1. [调试C#控制台应用](调试C#控制台应用)
2. [调试.NET Core WebApi](#调试.NET&nbsp;Core&nbsp;WebApi)
3. [git的配置](#git的配置)
4. [配置项](#配置项)

## 调试C#控制台应用

- A-[环境安装](https://www.microsoft.com/net/download)
  
  下载 [.NET Core SDK Installer](https://www.microsoft.com/net/download/core)

  [VSCode](https://code.visualstudio.com/)

  VSCode C#插件：可以在安装好的VSCode里的插件扩展中搜索安装：

  ![x](./Resource/5.png)

- B-创建项目

  1. 先打开VSCode
  2. 在CTRL+R，输入CMD调出控制台程序（或者在VSCode中的终端cmd输入框中），并输入命令：cd 文件目录 （转到创建项目的文件夹）
  3. 然后输入命令：dotnet new --help （会出现创建新项目命令的提示信息）
  4. 然后创建一个简单控制台程序如：dotnet new console （创建控制台应用程序，.net core2.02版本已经可以在创建程序时，自动还原所需的nuget包了，也就是自动执行了命令： dotnet restore）
     使用命令：dotnet run   （可以在控制台运行创建的控制台程序）
  5. 最后通过VS Code打开项目所在文件夹，会自动下载`.NET Core Debugger`，等待下载安装（安装调式插件）
  6. 安装成功。 重新使用VSCode打开我们的创建项目的目录文件夹。

  VS Code是可以自动配置的，注意刚打开项目的时候有条提示：

  ![x](./Resource/6.png)

  点击yes自动配置，再点击Restore

  .net core2.02版本已经可以在创建程序时，自动还原所需的nuget包了，也就是自动执行了命令： dotnet restore，因此编译这一步就可以省略了...

- C-调试

  F5运行之后使用浏览器访问程序：[http://localhost:5000/](http://localhost:5000/)。（如果想调试的话需要配置launch.json和tasks.json）或者 安装图形操作就可以了：

  ![x](./Resource/7.png)

- D-备注

  推荐两个开发C#非常实用的插件：

  1. XML Documentation Comments Support for Visual Studio Code

     这个插件是实现和vs一样的xml注释。比如按三下///自动补全

  2. .NET Core Project Manager (Nuget)

     这个插件是可以搜索Nuget包并自动向project.json添加

  目前Visual Studio Code里官方C#插件只支持.NET Core编译调试。暂不支持Mono和传统.NET Framework

- E-发布

  准备发布 部署.net core项目到iis服务器

  1. 需要下载安装window server hosting：[https://www.microsoft.com/net/download/core#/runtime](https://www.microsoft.com/net/download/core#/runtime)；
  2. 安装完成以后，在vs终端运行命令  dotnet publish -c release，回车即可在当前项目文件夹bin/release/下生成可部署文件夹publish；
  3. 在iis服务器上添加网站，地址指定到刚才生成的可部署文件夹，运行站点，即可看到.net core开发的第一个站点运行起来啦；

  注：Microsoft弃用了project.json，转回使用.csproj文件

## 调试.NET&nbsp;Core&nbsp;WebApi

1、安装Visual Studio Code

安装好之后, 可以选择把vscode添加到Path:

使用command+option+p(mac)或者ctrl+shift+p(win)打开命令板, 输入path, 选择install code command in path.

![x](./Resource/9.png)

然后打开命令行 输入 code. 如果vscode能打开当前目录, 那么说明操作成功了.

2、安装.net core sdk

到官网下载并安装相应平台的.net core sdk: `https://dotnet.github.io`

安装好之后, 打开命令行: 执行dotnet --version, 可以看到版本号, 这就说明安装成功了.

3、编写Demo程序

```sh
dotnet new webapi --初始化项目
dotnet run --运行项目
```

## git的配置

### git的集成

vscode中对git进行了集成，很多操作只需点击就能操作，无需写一些git指令。

不过这就需要你对vscode进行配置。下面我会讲到git的配置与免密码上传github

首先需要你的电脑上已经安装了git，且window电脑里git添加到环境变量中去了。

![x](./Resource/10.png)

这样你的电脑就可以使用git了，但是想要在vccode中使用git还要配置git.path。

git.path是git中的一个exe文件路径，找到你的电脑git的安装目录，找到里面的cmd文件夹。里面的git.exe文件把该文件的完整路径复制下来。

![x](./Resource/11.png)

点击设置在设置里找到git设置里面的git.path选项。将设置复制到右边的用户默认设置

![x](./Resource/12.png)

把git.exe文件的路径复制到这里就可以了。

### git的使用

![x](./Resource/13.png)

先输入指令git init在文件夹创建git相关配置文件，然后执行上面几句，当前分支就是主分支，上传到github上了

这样每次上传是都需要输入git仓库的用户名和密码（这里也就是github的用户名和密码）

### github的免密码上传

git的免密码上传的设置为，找到文件夹的.git文件夹里面配置文件config

![x](./REsource/14.png)

里面的url本来为`https://github.com/****/****.git`

替换为`https://github用户名:github密码@github.com/****/****.git`，这样每次推送到github仓库就不需要输入账户和密码了

### 快捷键

Ctrl+P 查找插件，Ctrl+`打开命令行

主命令框

F1 或 Ctrl+Shift+P: 打开命令面板。在打开的输入框内，可以输入任何命令，例如：

- 按一下 Backspace 会进入到 Ctrl+P 模式
- 在 Ctrl+P 下输入 > 可以进入 Ctrl+Shift+P 模式

在 Ctrl+P 窗口下还可以:

- 直接输入文件名，跳转到文件
- ? 列出当前可执行的动作
- ! 显示 Errors或 Warnings，也可以 Ctrl+Shift+M
- : 跳转到行数，也可以 Ctrl+G 直接进入
- @ 跳转到 symbol（搜索变量或者函数），也可以 Ctrl+Shift+O 直接进入
- @ 根据分类跳转 symbol，查找属性或函数，也可以 Ctrl+Shift+O 后输入:进入
- `#` 根据名字查找 symbol，也可以 Ctrl+T

编辑器与窗口管理

1. 打开一个新窗口： Ctrl+Shift+N
2. 关闭窗口： Ctrl+Shift+W
3. 同时打开多个编辑器（查看多个文件）
4. 新建文件 Ctrl+N
5. 文件之间切换 Ctrl+Tab
6. 切出一个新的编辑器（最多 3 个） Ctrl+\，也可以按住 Ctrl 鼠标点击 Explorer 里的文件名
7. 左中右 3 个编辑器的快捷键 Ctrl+1 Ctrl+2 Ctrl+3
8. 3 个编辑器之间循环切换 Ctrl+
9. 编辑器换位置， Ctrl+k然后按 Left或 Right

格式调整

1. 代码行缩进 Ctrl+[ 、 Ctrl+]
2. Ctrl+C、Ctrl+V 复制或剪切当前行/当前选中内容
3. 代码格式化：Shift+Alt+F 或 Ctrl+Shift+P 后输入 format code
4. 上下移动一行： Alt+Up 或 Alt+Down
5. 向上向下复制一行： Shift+Alt+Up 或 Shift+Alt+Down
6. 在当前行下边插入一行 Ctrl+Enter
7. 在当前行上方插入一行 Ctrl+Shift+Enter

光标相关

1. 移动到行首： Home
2. 移动到行尾： End
3. 移动到文件结尾： Ctrl+End
4. 移动到文件开头： Ctrl+Home
5. 移动到定义处： F12
6. 定义处缩略图：只看一眼而不跳转过去 Alt+F12
7. 移动到后半个括号： Ctrl+Shift+]
8. 选择从光标到行尾： Shift+End
9. 选择从行首到光标处： Shift+Home
10. 删除光标右侧的所有字： Ctrl+Delete
11. 扩展/缩小选取范围： Shift+Alt+Left 和 Shift+Alt+Right
12. 多行编辑(列编辑)：Alt+Shift+鼠标左键，Ctrl+Alt+Down/Up
13. 同时选中所有匹配： Ctrl+Shift+L
14. Ctrl+D 下一个匹配的也被选中 (在 sublime 中是删除当前行，后面自定义快键键中，设置与 Ctrl+Shift+K 互换了)
15. 回退上一个光标操作： Ctrl+U

重构代码

1. 找到所有的引用： Shift+F12
2. 同时修改本文件中所有匹配的： Ctrl+F12
3. 重命名：比如要修改一个方法名，可以选中后按 F2，输入新的名字，回车，会发现所有的文件都修改了
4. 跳转到下一个 Error 或 Warning：当有多个错误时可以按 F8 逐个跳转
5. 查看 diff： 在 explorer 里选择文件右键 Set file to compare，然后需要对比的文件上右键选择 Compare with file_name_you_chose

查找替换

1. 查找 Ctrl+F
2. 查找替换 Ctrl+H
3. 整个文件夹中查找 Ctrl+Shift+F

显示相关

1. 全屏：F11
2. zoomIn/zoomOut：Ctrl +/-
3. 侧边栏显/隐：Ctrl+B
4. 显示资源管理器 Ctrl+Shift+E
5. 显示搜索 Ctrl+Shift+F
6. 显示 Git Ctrl+Shift+G
7. 显示 Debug Ctrl+Shift+D
8. 显示 Output Ctrl+Shift+U

其他

- 动保存：File -> AutoSave ，或者 Ctrl+Shift+P，输入 auto

修改默认快捷键

打开默认键盘快捷方式设置：

File -> Preferences -> Keyboard Shortcuts，或者：Alt+F -> p -> k

修改 keybindings.json：

```json
// Place your key bindings in this file to overwrite the defaults
[
    // ctrl+space 被切换输入法快捷键占用
    {
        "key": "ctrl+alt+space",
        "command": "editor.action.triggerSuggest",
        "when": "editorTextFocus"
    },
    // ctrl+d 删除一行
    {
        "key": "ctrl+d",
        "command": "editor.action.deleteLines",
        "when": "editorTextFocus"
    },
    // 与删除一行的快捷键互换
    {
        "key": "ctrl+shift+k",
        "command": "editor.action.addSelectionToNextFindMatch",
        "when": "editorFocus"
    },
    // ctrl+shift+/多行注释
    {
        "key":"ctrl+shift+/",
        "command": "editor.action.blockComment",
        "when": "editorTextFocus"
    },
    // 定制与 sublime 相同的大小写转换快捷键，需安装 TextTransform 插件
    {
        "key": "ctrl+k ctrl+u",
        "command": "uppercase",
        "when": "editorTextFocus"
    },
    {
        "key": "ctrl+k ctrl+l",
        "command": "lowercase",
        "when": "editorTextFocus"
    }
]
```

前端开发必备插件

- PostCSS Sorting
- stylelint
- stylefmt
- ESLint
- javascript standard format
- beautify
- Babel ES6/ES7
- Debugger for Chrome
- Add jsdoc comments
- javascript(ES6) code snippets
- vue
- weex
- Reactjs code snippets
- React Native Tools
- Npm Intellisense
- Instant Markdown
- Markdown Shortcuts
- TextTransform

自定义设置参考

vscode 自定义配置参考：

```json
{
    "editor.fontSize": 18,
    "files.associations": {
        "*.es": "javascript",
        "*.es6": "javascript"
    },
    // 控制编辑器是否应呈现空白字符
    "editor.renderWhitespace": true,
    // 启用后，将在保存文件时剪裁尾随空格。
    "files.trimTrailingWhitespace": true,
    // File extensions that can be beautified as javascript or JSON.
    "beautify.JSfiles": [
        "",
        "es",
        "es6",
        "js",
        "json",
        "jsbeautifyrc",
        "jshintrc"
    ]
}
```

相关参考

官方快捷键大全：

[https://code.visualstudio.com/docs/customization/keybindings](https://code.visualstudio.com/docs/customization/keybindings)

[http://blog.csdn.net/u010019717/article/details/50443970](http://blog.csdn.net/u010019717/article/details/50443970)

## 配置项

```json
{
  "jshint.enable": false,
  // 添加 vue 支持
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "html",
    "vue",
    {
      "language": "html",
      "autoFix": true
    }
  ],
  "files.associations": {
    "*.vue": "vue"
  },
  "[javascript]": {
    "editor.defaultFormatter": "vscode.typescript-language-features"
  },
  // vscode默认启用了根据文件类型自动设置tabsize的选项
  "editor.detectIndentation": false,
  // #每次保存的时候自动格式化 
  "editor.formatOnSave": true,
  // #每次保存的时候将代码按eslint格式进行修复
  "eslint.autoFixOnSave": true,
  //  #让prettier使用eslint的代码格式进行校验 
  "prettier.eslintIntegration": true,
  //  #去掉代码结尾的分号 
  "prettier.semi": false,
  //  #使用带引号替代双引号 
  "prettier.singleQuote": true,
  //  #让函数(名)和后面的括号之间加个空格
  "javascript.format.insertSpaceBeforeFunctionParenthesis": true,
  // #这个按用户自身习惯选择 
  "vetur.format.defaultFormatter.html": "js-beautify-html",
  // #让vue中的js按编辑器自带的ts格式进行格式化 
  "vetur.format.defaultFormatter.js": "vscode-typescript",
  "vetur.format.defaultFormatterOptions": {
    "js-beautify-html": {
      "wrap_attributes": "force-aligned"
      // #vue组件中html代码格式化样式
    }
  },
  // 格式化stylus, 需安装Manta's Stylus Supremacy插件
  "stylusSupremacy.insertColons": false, // 是否插入冒号
  "stylusSupremacy.insertSemicolons": false, // 是否插入分好
  "stylusSupremacy.insertBraces": false, // 是否插入大括号
  "stylusSupremacy.insertNewLineAroundImports": false, // import之后是否换行
  "stylusSupremacy.insertNewLineAroundBlocks": false,
  "[html]": {
    "editor.defaultFormatter": "vscode.html-language-features"
  },
  "editor.tabSize": 2,
  "workbench.activityBar.visible": true,
  "workbench.statusBar.visible": true,
  "window.menuBarVisibility": "default",
  "editor.minimap.enabled": false, // 两个选择器中是否换行
  "markdown.extension.tableFormatter.enabled": false, // 表格格式化
  "markdownlint.config": {
    "MD033": false // 是否允许插入html
  }
}
```
