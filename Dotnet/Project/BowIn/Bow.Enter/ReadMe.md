# 入市系统

## 目录

1. Xamarin
   - [视图与布局](#视图与布局)
   - [常用控件](#常用控件)
2. [参考](#参考)

[Windows10家庭版添加Hyper-V的方法](https://jingyan.baidu.com/article/d7130635e5678113fcf4757f.html)

Xamarin.Forms中每一个屏幕画面都有对应概念叫：Page，Xamarin.Forms.Page 在安卓中与 Activity对应，在 iOS 中与 ViewController对应，在Windows Phone中与Page对应。

## 视图与布局

Xamarin.Forms使用控件来进行布局，在运行时每一个控件都会对应一个原生控件，我们经常会使用下面的类型来构建UI。

- View - 通常指的是Label，Button以及输入框等等
- Page - 一个单独的screen，对应的概念是 Android Activity，Windows Phone Page 以及 iOS View Controller.
- Layout - 布局或者容器控件
- Cell - 表格或者列表控件的子项目

Xamarin.Forms有两种不同类型的容器控件：

- Managed Layout - 与CSS的盒模型类似，通过设定子控件的位置和大小来进行布局，应用程序不再直接设定子控件的位置，最常见的例子就是 StackLayout。
- Unmanaged Layouts - 与Managed Layout不同，开发人员需要直接设定子控件的位置和大小，常见的例子就是 AbsoluteLayout。

接下来我们再仔细讨论这两种布局方式：

**堆栈式布局：**

堆栈式布局是一种非常常用的布局方式，可以极大地的简化跨平台用户界面的搭建。堆栈式布局的子元素会按照添加到容器中的顺序一个接一个被摆放，堆栈式布局有两个方向：竖直与水平方向。

在StackLayout中我们可以通过 HeightRequest 和 WidthRequest 指定子元素的高度和宽度。

**绝对布局：**

绝对布局类似于Windows Forms布局，需要指定每一个子元素的位置。

子元素添加到容器中的顺序会影响子元素的Z-Order。先添加的元素可能会被后面添加的元素遮住。

**列表：**

ListView是一个非常常见的控件，用于展现一组数据，每一个条目都会被包含在一个单元格内部。默认情况下ListView使用了一个 TextCell 作为模板来展现每一个条目数据。

## 常用控件

Xamarin.Forms 控件|描述
-|-
Label|只读的文本展示控件
Entry|单行的文本输入框
Button|按钮
Image|图片
ListView|列表控件

## 参考

- [葡萄城技术团队](https://www.cnblogs.com/powertoolsteam/)
