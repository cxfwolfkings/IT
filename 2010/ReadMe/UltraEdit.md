# UltraEdit

## 目录

## C、C++环境搭建

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

## 配置文件高亮显示

1. 首先从ue官方网站下载wordfile扩展文件包：ALL WORDFILES IN ONE PACKAGE，([http://www.ultraedit.com/files/wf/wf.zip](http://www.ultraedit.com/files/wf/wf.zip))
2. 打开UltraEdit，点击菜单“高级”-“配置”，打开配置对话框。点击“编辑器显示”----“语法着色”，在右侧“字词列表完整路径”处找到uew配置文件路径

   C:\Users\userpathxxxx\AppData\Roaming\IDMComp\UltraEdit\wordfiles。

   假设要让.sh文件高亮显示：

3. 将下载的wf.zip解压缩，找到unixshell.uew文件复制到上述路径

   并在上述ultraedit的高级配置界面中选择打开，此时能够看到“语言选择中”多了选项 Unix Shell Scripts类型，再直接打开.sh文件，此时就可以看到shell脚本中关键字的已经以不同的颜色显示了。
