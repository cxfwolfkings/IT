# 开发工具

## vscode

### 调试C#控制台应用

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

### 调试.NET&nbsp;Core&nbsp;WebApi

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

### git的配置

#### git的集成

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

#### git的使用

![x](./Resource/13.png)

先输入指令git init在文件夹创建git相关配置文件，然后执行上面几句，当前分支就是主分支，上传到github上了

这样每次上传是都需要输入git仓库的用户名和密码（这里也就是github的用户名和密码）

#### github的免密码上传

git的免密码上传的设置为，找到文件夹的.git文件夹里面配置文件config

![x](./REsource/14.png)

里面的url本来为`https://github.com/****/****.git`

替换为`https://github用户名:github密码@github.com/****/****.git`，这样每次推送到github仓库就不需要输入账户和密码了

### 总结

#### 快捷键

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

- 自动保存：File -> AutoSave ，或者 Ctrl+Shift+P，输入 auto

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

#### 配置项

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
  },
  "search.followSymlinks": false
}
```

### 问题

#### rg.exe占用CPU过高

解决方法：添加如下配置

```json
"search.followSymlinks": false
```

## UltraEdit

### 环境搭建

**C & C++：**

1．在“我的电脑——属性——高级——环境变量”中，添加如下变量：

```sh
INCLUDE：$Home$\VC2008\include;$Home$\VC2008\PlatformSDK\Include
LIB：$Home$\VC2008\lib;$Home$\VC2008\PlatformSDK\Lib
PATH：$Home$\VC2008\bin
```

如果已经存在这些变量，则把以上值分别加在对应的变量值的后面，注意在添加前用分号隔开。

2．“高级——工具配置”，插入编译和运行命令

![x](./Resource/15.png)

![x](./Resource/16.png)

### 配置文件高亮显示

1. 首先从ue官方网站下载wordfile扩展文件包：ALL WORDFILES IN ONE PACKAGE，([http://www.ultraedit.com/files/wf/wf.zip](http://www.ultraedit.com/files/wf/wf.zip))
2. 打开UltraEdit，点击菜单“高级”-“配置”，打开配置对话框。点击“编辑器显示”----“语法着色”，在右侧“字词列表完整路径”处找到uew配置文件路径

   C:\Users\userpathxxxx\AppData\Roaming\IDMComp\UltraEdit\wordfiles。

   假设要让.sh文件高亮显示：

3. 将下载的wf.zip解压缩，找到unixshell.uew文件复制到上述路径

   并在上述ultraedit的高级配置界面中选择打开，此时能够看到“语言选择中”多了选项 Unix Shell Scripts类型，再直接打开.sh文件，此时就可以看到shell脚本中关键字的已经以不同的颜色显示了。

## Notepad++

### Notepad环境配置

#### Java开发

1. 安装JDK

   为了能够在控制台窗口中方便的使用JDK中的工具，需要在Windows系统环境变量PATH中追加JDK二进制（bin）文件所在的路径，在控制台窗口中执行如下命令，更新PATH环境变量。

   ```sh
   set path=.;%path%;E:/Program Files/Java/jdk1.6.0_02/bin
   ```

2. 安装Notepad++

   Notepad++是运行在Windows操作系统下的一款代码编辑器软件，能够对绝大多数的编程语言进行语法着色，为自由软件，遵循GPL。

3. 配置Notepad++

   3.1 单词自动补全功能配置

   (何为单词自动补全：你的源文件以前输入过的单词，即token，会缓存下来， 当你输入一个字符后会显示出来，按回车选中) Notepad++提供了一系列编程相关的功能，如自动识别源代码类型，支持自动缩进，语法着色，支持单词/函数名称自动补全功能等。Notepad++ 默认设置支持了大部分代码编写功能，下面将使Notepad++支持“单词自动补全”功能。

   点击“设置”菜单，选择“首选项”菜单项，弹出“首选项对话框”，选中“备份与自动完成”，在此标签页底部中选中“所有输入均启用自动完成”复选框，并选择“单词自动完成”。

   3.2 Notepad++的插件NppExec实现Console Dialog，此插件可以完成Windows控制台基本功能，如可以在此窗口中进行编译、运行Java程序；Notepad++还能够运行外部程序，通过 菜单项与外部程序建立映射关系，支持为外部程序输入参数等。

   3.3 Console Dialog作为Java开发环境

   显示Console Dialog对话框

   点击“插件”主菜单，在其下拉菜单中选中“NppExec”，在二级菜单中选中“Show Console Dialog”。

   默认在编辑器的底部出现Console Dialog。

   编辑Java源文件

   新建一个Java源文件HelloNpp.java，在编辑器中输入如下内容：

   ```java
   public class HelloNpp{
       public static void main(String[] args){
           System.out.println("Hello Notepad++!");
       }
   }

   3.4 编译运行Java程序

   notepad有两个运行代码的功能，一个是Run(F5)，另一个是Plugins -> NppExec(F6),用前者实现比较困难，所以选择后者，他带的命令行模拟非常好用。

   首先按F6，会弹出执行命令的对话框，在Command(s)中输入下列三行：

   ```sh
   npp_save //转载注：保存文件
   cd "$(CURRENT_DIRECTORY)"
   D:/jdk1.6.0_10/bin/Javac.exe "$(FILE_NAME)"// 转载注：java PATH已经设置好了，可以直接使用:Javac.exe "$(FILE_NAME)"
   D:/jdk1.6.0_10/bin/java.exe "$(NAME_PART)"// java.exe "$(NAME_PART)"
   javaRunWin:
   cd "$(CURRENT_DIRECTORY)"
   jar -cvfe "$(NAME_PART)".jar "$(NAME_PART)" *.class
   java与package:
   npp_save
   cd "$(CURRENT_DIRECTORY)"
   Javac -d . "$(FILE_NAME)"
   ```

   这里解释一下notepad++的环境变量，CURRENT_DIRECTORY表示当前路径，就是当前编辑文件的路径。然后另存为BuildAndRun脚本，表示编译然后运行。以后F6，可以直接选择该脚本，而不必输入命令了。

   在Console Dialog中编译器输出结果如下面的清单，绿色字体表示用户输入的命令和系统提示，黑色字体为Console Dialog的输出信息，与Windows 命令行程序相比多输出一些信息，表示程序执行的开始与结束，最后输出的信息表示Console Dialog处于等待新的命令状态。

   ```sh
   CD: D:/Java
   Current directory: D:/Java
   D:/jdk1.6.0_10/bin/Javac.exe "HelloWorld.java"
   Process started >>>
   <<< Process finished.
   D:/jdk1.6.0_10/bin/java.exe "HelloWorld"
   Process started >>>
   Hello World!
   b=true
   l=2000
   f=1.2
   <<< Process finished.
   ================ READY ================
   ```

4. 配置Java外部工具

   4.1 Notepad++环境变量

   表1为Notepad++定义的这些环境，可以作为参数传递给外部工具

   | 变量名称          | 含义                   | 例子                  |
   | ----------------- | ---------------------- | --------------------- |
   | FULL_CURRENT_PATH | 文件路径名称           | E:/java/HelloNpp.java |
   | CURRENT_DIRECTORY | 文件目录（不含文件名） | E:/java/              |
   | FILE_NAME         | 文件全名称             | HelloNpp.java         |
   | NAME_PART         | 文件名称（不含ext）    | HelloNpp              |
   | EXT_PART          | 文件扩展名             | java                  |

   4.2 创建外部工具

   这两个外部工具为javac和java，增加了暂停功能，可以在编译或运行Java程序时通过控制台窗口显示输出信息。

   4.2.1 javacnpp.bat：编译当前Java源文件，需要一个指定Java源文件作为参数，运行后屏幕处于暂停状态，并显示编译程序的执行结果。以下为javacnpp.bat代码：

   ```sh
   @echo on
   javac %1
   pause
   ```

   4.2.2 Javanpp.bat：运行Java的class二进制文件，需要指定两个参数，第一个参数为class文件所在的目录；第二个参数为Java程序名称。运行后屏幕处于暂停状态，显示程序执行的结果。以下为javanpp.bat代码：

   ```sh
   @echo on
   java -cp %1 %2
   pause
   ```

   4.3 创建javac菜单

   此菜单项用来编译Java源代码，生成class文件。选择主菜单“运行”，在下拉菜单中选择“运行...”或使用快捷键F5，显示“运行”对话框,输入如下运行程序名

   "E:/Program Files/Notepad++/javacnpp.bat" $(FULL_CURRENT_PATH)

   javacnpp.bat为上述创建的外部工具，$(FULL_CURRENT_PATH)为当前编辑的Java源代码文件。

   点击“保存”按钮，在名称编辑框中输入此外部工具名称，如javac；在快捷方式对话框中选择执行此外部程序对应的快捷键，选中(Control+Shift+J)作为编译Java源代码的快捷方式。

   4.4 创建java菜单

   java菜单用来运行java程序，创建的方式与javac菜单相同，但各自使用不同的外部工具，在“运行”对话框中输入运行程序名称：

   "E:/Program Files/Notepad++/javanpp.bat" $(CURRENT_DIRECTORY) $(NAME_PART)

   javanpp.bat为上述创建的外部工具，$(CURRENT_DIRECTORY)为Java class文件所在的目录，$(NAME_PART)为文件名称（不包含扩展名）。

   点击“保存”按钮，在名称编辑框中输入此外部工具名称，如java；在快捷方式对话框中选择执行此外部程序对应的快捷键，选中(Control+Shift+X)作为运行Java程序的快捷方式。

   建立这两个外部工具后，在“运行”菜单中会增加两个菜单项：javac和java，分别用来编译Java源代码和运行Java程序。在代码编辑区完成编写 工作后，执行javac命令（或使用快捷键Ctrl+Shift+J）编译当前Java源代码文件；编译通过后再执行java(或使用快捷键 Ctrl+Shift+X）运行编译后的Java程序。

5. 小结

本文介绍了如何使用Notepad++与JDK集成作为一个简单的Java IDE，适合与Java初学者。文中将所有的Java源文件都放置到缺省包（package）中，没有使用自定义包(package），如果使用 import/package关键字，按照本文描述的配置执行javac或java，则会在运行时会出现“ java.lang.NoClassDefFoundError:”错误，建议采用Console Dialog中执行

#### C开发

1. 打开菜单栏中的运行，点击其中的运行，或者按F5。弹出设置对话框。
2. 在弹出的设置对话框中填准确信息：

   cmd /k gcc -o "D:\study\$(NAME_PART).exe" "$(FULL_CURRENT_PATH)" & PAUSE & EXIT然后名字为编译c，快捷键自己设置。

   同样第二个：cmd /k "D:\study\$(NAME_PART)" & PAUSE & EXIT名字为运行c，快捷键自己设置。

   设置好以后关闭对话框即可。
3. 然后在软件简单地测试程序，检验是否通过。示例：

   ```C
   #include <stdio.h>
   int main(void)
   {
       int i1=1,i2=2;
       int sum=i1+i2;
       printf("%d\n",sum);
       return 0;
   }
   ```

4. 然后依次点击编译c和运行c，最终测试通过。恭喜大家可以使用这个编译器编程了。

   注意：D:\study为程序输出位置，这个需要自己设置。

   我自己设置的快捷键（如果快捷键无效，一般是因为快捷键冲突）：

   编译C：Ctrl+Shift+O

   运行C：Ctrl+Shift+G

## vs2019使用.NETCore3.0

![x](./Resource/8.png)

## EditPlus帮助手册

**php：**

步骤：【工具】-->【配置用户工具】-->【添加工具】，选择php的chm帮助文件。  

这样在php相应的函数上按ctrl+1（或者你定义的数字键）就可以跳到相应的函数解释，就像VC中在函数上按F1跳到MSDN上一样。

![x](./Resource/17.png)

## EditPlus调试工具

- 选择：【工具】->【配置用户工具】，在弹出的窗口中选择：【添加工具】->【程序】，在【菜单文本】中输入"Debug PHP"。
- 点击【命令】右边的按钮，找到你的php.exe所在的路径，我的电脑上是"D:\wamp\bin\php\php5.2.6\php.exe "。
- 再点击【参数】右边的下拉按钮选择【文件路径】，再点击【起始目录】右边的下拉按钮选择【文件目录】，最后再把【捕捉输出】前面的复选框选上，这样就可以开始调试PHP程序了。

  ![x](./Resource/18.png)

- 点击【输出模式】按钮，会弹出一个定义输出模式的窗体，把【使用默认输出方式】前面的复选框去掉，在【规则表达式】这一项的文本框中输入`^.+ in (.+) line ([0-9]+)`（不包括引号）。
- 然后，在下面的【文件名称】下拉菜单中选择【表达式标记1】，即上边正则表达式中的第一个参数，【行】下拉菜单项选择【表达式标记2】，【列】下拉项保持为空。然后保存设置。
- 这一步设置好后，当你调试PHP时输出窗口报错时，你只要双击报错信息，就能找到出错的PHP代码了，非常方便。
  
  ![x](./Resource/19.png)

- 确定后查看【工具】菜单，如下图，红色的为新添加的工具，后面对应的是快捷键：

  ![x](./Resource/20.png)

## 函数自动完成

去[http://editplus.com/html.html](http://editplus.com/html.html)，下载你需要的自动补全插件。推荐下载这个：[http://www.editplus.com/dn.cgi?php_acp3.zip](http://www.editplus.com/dn.cgi?php_acp3.zip)

说明：acp就是自动补全，stx是语法文件。

打开【工具】->【参数】，选择【设置与语法】->【文件类型】选择【PHP】，点击【自动完成】后面的【...】按钮，弹出文件选择框，将下好的php.acp复制到该目录下，并选中php.acp然后点击【打开】。

如果你不想使用Editplus的自动完成功能，你只要勾选禁用自动完成功能即可。最后重启下Editplus即可使用了。

使用Editplus的PHP自动完成功能时，注意在PHP文件中务必输入完整的PHP语句或PHP函数，然后按下空格即可启动自动完成功能，如果只输入了一部分，按空格是启动不了Editplus的PHP自动完成功能的
