# 前端工程师

## 目录

1. 第一部分 javascript + jQuery
2. 第二部分 node + npm + es6 + typescript
3. 第三部分 vue + angular + react
4. 第四部分 微信小程序 + Flutter
5. 第五部分 项目总结 + 附录
6. 第六部分 UI设计

## 第一部分 javascript + jQuery

### 第1天：概述

### 第2天：词法结构

### 第3天：类型、值和变量

### 第4天：表达式、运算符和语句

### 第5天：对象、数组和函数

### 第6天：类、模块、子集和扩展

### 第7天：客户端javascript

1. web中的js简介
2. dom操作
3. 样式设置
4. 事件处理
5. 示例

### 第8天：客户端存储、多媒体和图形

### 第9天：html5

### 第10天：[jQuery类库](./1.10_jQuery类库.md)

1. jQuery简介
2. 选择器
3. Dom操作
4. 样式设置
5. 事件处理
6. 动画效果
7. 示例
   - 输入框输入限制

### 第11天：[jQuery常用插件库](./1.11_jQuery常用插件库.md)

## 第二部分 node + npm + es6 + typescript

### 第1天：[服务器端javascript](./2.1_服务器端javascript.md)

### 第2天：[node入门](./2.2_node入门.md)

### 第3天：[npm介绍](./2.3_npm介绍.md)

## 第三部分 vue + angular + react

### 第1天：[vue入门](./3.1_vue入门.md)

- 安装 / 目录结构 / 单文件应用
- 模板语法 / 常用指令
- 过滤器 / 计算属性 / 监听
- 响应接口

### 第2天：[vue语法](./3.2_vue语法.md)

- 条件语句
- 循环语句
- 样式绑定
- [事件处理](./3.2_vue语法.md#事件处理)
- [周期事件](./3.2_vue语法.md#周期事件)

### 第3天：[vue开发](./3.3_vue开发.md)

- 表单
- 组件
- 自定义指令

### 第4天：[vue请求插件](./3.4_vue请求插件.md)

- [vue-resource](./3.4_vue请求插件.md#vue-resource)
- [axios](./3.4_vue请求插件.md#axios)

### 第5天：[vue其它基本插件](./3.5_vue其它基本插件.md)

- vue-router
- [i18n](./3.5_vue其它基本插件.md#i18n)
- wappalyzer
- [Vuex](./3.5_vue其它基本插件.md#Vuex)

### 第6天：[VueUI插件](./3.6_VueUI插件.md)

- ElementUI
  - 表单验证
- mint-ui
- iview

### 第7天：[Vue更多知识](./3.7_更多知识.md)

- 动画
- 混入

### 第8天：[Vue项目总结与参考](./3.8_Vue总结与参考.md)

### 第9天：[Angular入门](./3.9_Angular入门.md)

- 起步
  - 什么是 AngularJS
  - 端对端的解决方案
  - AngularJS的可爱之处
  - AngularJS的禅道（理念）
  - 引导程序
  - 自动初始化
  - 手动初始化
- 开始例子

### 第10天：[Angular开发](./3.10_Angular开发.md)

### 第11天：[Angular开发2](./3.11_Angular开发2.md)

### 第10天：[React简介](./3.10_React简介.md)

## 第四部分 微信小程序

### 第1天：[小程序简介](./4.1_小程序简介.md)

## 第五部分 项目总结 + 附录

### 第1天：[js总结](./5.1_js总结.md)

## 附录

网上有一个站点；禅意花园 -> csdn 网页论坛

开源之祖 sourceforeg .net  

Php 开源 php-open.com  模仿->()创新

[Spine](http://maccman.github.com/spine)实现了类

## 第六部分 UI设计

### 第1天：css介绍

### [第2天：css常用样式](./6.2_css常用样式.md)

1. 布局
2. 内容
   - 文字效果

### [第3天：jQMobile](./6.3_jQMobile.md)

### [第4天：PhoneGap](./6.4_PhoneGap.md)

## 谷歌浏览器出现“错误代码：ERR_UNSAFE_PORT”的解决办法

出错原因：谷歌浏览器（FF浏览器也有）对一些特殊的端口进行了限制

解决方法：最简单的办法就是直接修改搭建项目的端口号，避开这些谷歌限制的端口号。

```sh
# 谷歌浏览器限制的一些端口号：
1：    // tcpmux
7：    // echo
9：    // discard
11：   // systat
13：   // daytime
15：   // netstat
17：   // qotd
19：   // chargen
20：   // ftp data
21：   // ftp access
22：   // ssh
23：   // telnet
25：   // smtp
37：   // time
42：   // name
43：   // nicname
53：   // domain
77：   // priv-rjs
79：   // finger
87：   // ttylink
95：   // supdup
101：  // hostriame
102：  // iso-tsap
103：  // gppitnp
104：  // acr-nema
109：  // pop2
110：  // pop3
111：  // sunrpc
113：  // auth
115：  // sftp
117：  // uucp-path
119：  // nntp
123：  // NTP
135：  // loc-srv /epmap
139：  // netbios
143：  // imap2
179：  // BGP
389：  // ldap
465：  // smtp+ssl
512：  // print / exec
513：  // login
514：  // shell
515：  // printer
526：  // tempo
530：  // courier
531：  // chat
532：  // netnews
540：  // uucp
556：  // remotefs
563：  // nntp+ssl
587：  // stmp?
601：  // ??
636：  // ldap+ssl
993：  // ldap+ssl
995：  // pop3+ssl
2049： // nfs
3659： // apple-sasl / PasswordServer
4045： // lockd
6000： // X11
6665： // Alternate IRC [Apple addition]
6666： // Alternate IRC [Apple addition]
6667： // Standard IRC [Apple addition]
6668： // Alternate IRC [Apple addition]
6669： // Alternate IRC [Apple addition]
```
