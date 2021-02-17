## Java

1. 简介
   - 诞生历史
   - 环境搭建
   - 基本类型
   - 运算符优先级
2. 实战
   - [构建工具](#构建工具)
3. 问题
4. 参考

   - [JDK历史版本](https://www.oracle.com/technetwork/java/javase/archive-139210.html)

   - [Eclipse历史版本](https://wiki.eclipse.org/Older_Versions_Of_Eclipse)



## 简介

![x](./Resources/java.jpg)

![x](./Resources/goslin.jpg)

**诞生历史**

- 1990 sun启动 绿色计划
- 1992 创建oak语言-->java
- 1994 Gosling（JAVA之父）参加硅谷大会演示java功能，震惊世界
- 1995 sun正式发布java第一个版本

**环境搭建**

windows：

```sh
set JAVA_HOME=C:\jdk
set PATH=%JAVA_HOME%\bin;%JAVA_HOME%\jre\bin
set CLASSPATH=.;%JAVA_HOME%\lib;%JAVA_HOME%\lib\tools.jar;%JAVA_HOME%\jre\lib\rt.jar
```

Linux：

```sh
export JAVA_HOME=/usr/local/jdk
export PATH=$JAVA_HOME/bin:$PATH
export CLASSPATH=.:$JAVA_HOME/jre/lib/rt.jar
```

检查：`java -version`

**基本类型：**

- 整型
- 浮点
- 字符
- 布尔

| **类型** | **byte** | **位数** | **范围**                                      |
| -------- | -------- | -------- | --------------------------------------------- |
| byte     | 1b       | 8        | -128到127                                     |
| short    | 2b       | 16       | -2^15到2^15-1  (-32768~32767)                 |
| int      | 4b       | 32       | -2^31到2^31-1  (-2147483648~2147483647约21亿) |
| long     | 8b       | 64       | -2^63到2^63-1                                 |
| float    | 4b       | 32       | -3.403E38~3.403E38                            |
| double   | 8b       | 64       | -1.798E308~1.798E308                          |
| char     | 2b       | 16       | '\u0000' ~ '\uffff' 即 0 ~ 65535              |
| boolean  | 1b       | 1        | false/true                                    |

**运算符：**（优先级由高到低排列）

| **分类**   | **运算符**                 |
| ---------- | -------------------------- |
| 一元运算符 | ++ -- + - ! ~ ()           |
| 算术运算符 | * / % + -                  |
| 位移运算符 | << >> >>>                  |
| 比较运算符 | < <= > >= instanceof == != |
| 按位运算符 | & ^                        |
| 短路运算符 | && \|\|                    |
| 条件运算符 | ?:                         |
| 赋值运算符 | = += -+ *= /=              |



## 实战



### 构建工具

#### Maven

Maven 翻译为“专家”，“内行”，是 Apache 下的一个纯 Java 开发的开源项目，它是一个项目管理工具，使用 maven 对 java 项目进行构建、依赖管理。当前使用 Maven 的项目在持续增长。

项目构建是一个项目从编写源代码到编译、测试、运行、打包、部署、运行的过程。

Maven 将项目构建的过程进行标准化， 每个阶段使用一个命令完成：

![x](./Resources/maven.jpg)

部分阶段对应命令如下：

- 清理阶段对应 maven 的命令是 clean，清理输出的class文件
- 编译阶段对应 maven 的命令是 compile，将java代码编译成class文件。
- 打包阶段对应 maven 的命令是 package，java工程可以打成jar包，web包可以打成war包

运行一个maven 工程（web工程）需要一个命令：`tomcat:run`

maven 工程构建的优点：

- 一个命令完成构建、运行，方便快捷。
- maven 对每个构建阶段进行规范，非常有利于大型团队协作开发。

#### Gradle

简单的说，Gradle是一个构建工具，它是用来帮助我们构建app的，构建包括编译、打包等过程。

我们可以为Gradle指定构建规则，然后它就会根据我们的“命令”自动为我们构建app。Android Studio中默认就使用Gradle来完成应用的构建。

有些同学可能会有疑问：“我用AS不记得给Gradle指定过什么构建规则呀，最后不还是能搞出来个apk。”实际上，app的构建过程是大同小异的，有一些过程是“通用”的，也就是每个app的构建都要经历一些公共步骤。因此，在我们在创建工程时，Android Studio自动帮我们生成了一些通用构建规则，很多时候我们甚至完全不用修改这些规则就能完成我们app的构建。

有些时候，我们会有一些个性化的构建需求，比如我们引入了第三方库，或者我们想要在通用构建过程中做一些其他的事情，这时我们就要自己在系统默认构建规则上做一些修改。这时候我们就要自己向Gradle“下命令”了，这时候我们就需要用Gradle能听懂的话了，也就是Groovy。

Groovy是一种基于JVM的动态语言，关于它的具体介绍，感兴趣的同学可以文末参考“延伸阅读”部分给出的链接。
我们在开头处提到“Gradle是一种构建工具”。实际上，当我们想要更灵活的构建过程时，Gradle就成为了一个编程框架——我们可以通过编程让构建过程按我们的意愿进行。也就是说，当我们把Gradle作为构建工具使用时，我们只需要掌握它的配置脚本的基本写法就OK了；而当我们需要对构建流程进行高度定制时，就务必要掌握Groovy等相关知识了。

限于篇幅，本文只从构建工具使用者的角度来介绍Gradle的一些最佳实践，在文末“延伸阅读”部分给出了几篇高质量的深入介绍Gradle的文章，其中包含了Groovy等知识的介绍。

**Gradle工作的整个过程**

![x](./Resources/gradle.png)

**在网络查看Gradle存储库**

问题：在哪里查找信息groupId，artifactId和版本呢？

可以去网站：http://mvnrepository.com，例如在我们上面示例使用的 common-lang3，可在网站中搜索找到打开URL：http://mvnrepository.com/artifact/org.apache.commons/commons-lang3

参考：

- [Edison Xu](http://edisonxu.com/)
- [直到世界尽头](http://www.525.life/)
- [Arch Linux](https://wiki.archlinux.org/index.php/Main_page_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))
- [Shadowsocks](https://wiki.archlinux.org/index.php/Shadowsocks_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))
- [Privoxy](https://wiki.archlinux.org/index.php/Privoxy_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))
