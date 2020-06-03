# Flutter

- [DartPad](https://dartpad.dartlang.org/)：网上练习Dart代码
- [官方下载地址](https://flutter.dev/docs/development/tools/sdk/releases#windows)
- [示例-豆瓣](https://github.com/kaina404/FlutterDouBan)

### Flutter环境搭建

**环境变量：**

- 变量名：PUB_HOSTED_URL，变量值：`https://pub.flutter-io.cn`
- 变量名：FLUTTER_STORAGE_BASE_URL，变量值：`https://storage.flutter-io.cn`
- 将 Flutter 的 bin 目录加入Path环境变量
- 安装 android studio
- 在 android studio 编辑 -> 设置，搜索 Dart 和 Flutter 插件
- 检查：`flutter doctor`

**创建项目：**

- Ctrl+Shif+P 打开命令面板，找到 Flutter：New Project
- 自动生成项目目录结构

  >Android 相关的修改和配置在 android 目录下，结构和 Android 应用项目结构一样；iOS 相关修改和配置在 ios 目录下，结构和 iOS 应用项目结构一样。最重要的 flutter 代码文件是在 lib 目录下，类文件以 .dart 结尾，语法结构为 Dart 语法结构。

- 创建[bat文件](../../Codes/wind_eim/runAndroid.bat)，便于启动Android模拟器
- 运行项目：`flutter run`

**主要建议：**

- 使用稳定版或者开发版 Flutter SDK，推荐使用稳定版。
- 如果遇到下载 SDK 慢或者无法下载情况，请按照课程内设置国内下载镜像地址。
- 配置好环境变量后，用 `flutter doctor` 检查环境。
- 尝试新建一个项目运行到手机或模拟器上，看配置是否有问题。
- 开发工具可以使用 Visual Studio Code 或 Android Studio 等。