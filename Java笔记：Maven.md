# 目录

- Maven介绍 
  - 依赖管理 
  - 为什么使用？
  - 三套生命周期
  - Maven 的概念模型
- Maven安装
  - Maven仓库
  - Maven项目工程目录约定
- 常用 Maven 命令
- Eclipse 与 Maven 集成
  - 定义Maven坐标
  - 构建Web工程
  - 快照
  - 依赖管理/依赖传递，版本冲突处理
  - 单个Web工程实现SSH整合
  - 分模块构建工程
  - Maven自动化部署
  - 使用Maven模板创建项目
  - 使用Maven构建项目
- 私服搭建

## Maven介绍

Maven 翻译为”专家“，”内行“，是 Apache 下的一个纯 Java 开发的开源项目，它是一个项目管理工具，使用 maven 对 java 项目进行构建、依赖管理。当前使用 Maven 的项目在持续增长。

项目构建是一个项目从编写源代码到编译、测试、运行、打包、部署、运行的过程。

Maven 将项目构建的过程进行标准化， 每个阶段使用一个命令完成：

![x](http://hyw6485860001.my3w.com/public/images/maven.jpg)

部分阶段对应命令如下：

- 清理阶段对应maven的命令是clean，清理输出的class文件
- 编译阶段对应maven的命令是compile，将java代码编译成class文件。
- 打包阶段对应maven的命令是package，java工程可以打成jar包，web包可以打成war包

运行一个maven 工程（web工程）需要一个命令：`tomcat:run`

maven 工程构建的优点：

- 一个命令完成构建、运行，方便快捷。
- maven 对每个构建阶段进行规范，非常有利于大型团队协作开发。

### 依赖管理

**什么是依赖？**

一个java项目可能要使用一些第三方的jar包才可以运行，那么我们说这个java项目依赖了这些第三方的jar包。

举个例子：一个crm系统，它的架构是SSH框架，该crm项目依赖SSH框架，具体它依赖的Hibernate、Spring、Struts2。

**什么是依赖管理？**

就是对项目所有依赖的jar包进行规范化管理。传统的项目工程要管理所依赖的 jar 包完全靠人工进行，缺点：

- 没有对jar包的版本统一管理，容易导致版本冲突。
- 从网上找jar包非常不方便，有些jar找不到。
- jar包添加到工程中导致工程过大。

maven项目管理所依赖的jar包不需要手动向工程添加jar包，只需要在pom.xml（maven工程的配置文件）添加jar包的坐标，自动从maven仓库中下载jar包、运行。优点：

- 通过pom.xml文件对jar包的版本进行统一管理，可避免版本冲突。
- maven团队维护了一个非常全的maven仓库， 里边包括了当前使用的jar包，maven工程可以自动从maven仓库下载Jar包，非常方便。

### 为什么使用？

综上所述，使用maven的好处：

- 一步构建：maven对项目构建的过程进行标准化，通过一个命令即可完成构建过程。

- 依赖管理：maven工程不用手动导jar包，通过在pom.xml中定义坐标从maven仓库自动下载，方便且不易出错。

- maven跨平台，可在window、linux上使用。

- maven遵循规范开发有利于提高大型团队的开发效率，降低项目的维护戚本，大公司都会考虑使用maven来构建项目。

### 三套生命周期

maven 对项目构建过程分为三套相互独立的生命周期，这三套生命周期分别是：

- Clean Lifecycle 在进行真正的构建之前进行一些清理工作。
  - pre-clean 执行一些需要在clean 之前完成的工作
  - clean 移除所有上一次构建生成的文件
  - post-clean 执行一些需要在clean 之后立刻完成的工作
- Default Lifecycle 构建的核心部分，编译，测试，打包，部署等等。
  - validate
  - generate-sources
  - process-sources
  - generate-resources
  - process-resources 复制并处理资源文件，至目标目录，准备打包。
  - compile 编译项目的源代码。
  - process-classes
  - generate-test-sources
  - process-test-sources
  - generate-test-resources
  - process-test-resources 复制并处理资源文件，至目标测试目录。
  - test-compile 编译测试源代码。
  - process-test-classes
  - test 使用合适的单元测试框架运行测试。这些测试代码不会被打包或部署。
  - prepare-package
  - package 接受编译好的代码，打包成可发布的格式，如JAR。
  - pre-integration-test
  - integration-test
  - post-integration-test
  - verify
  - install 将包安装至本地仓库，以让其它项目依赖。
  - deploy 将最终的包复制到远程的仓库，以让其它开发人员与项目共享。
- Site Lifecycle 生成项目报告，站点， 发布站点。
  - pre-site 执行一些需要在生成站点文档之前完成的工作
  - site 生成项目的站点文档
  - post-site 执行一些需要在生成站点文档之后完成的工作，并且为部署做准备
  - site-deploy 将生成的站点文档部署到特定的服务器上


每个 maven 命令对应生命周期的某个阶段，例如：`mvn clean` 命令对应 clean 生命周期的 clean 阶段， mvn test 命令对应 default 生命周期的 test 阶段。
执行命令会将该命令在的在生命周期当中之前的阶段自动执行，比如：执行 `mvn clean` 命令会自动执行 pre-clean 和 clean 两个阶段，`mvn test` 命令会自动执行 validate、compile、test 等阶段。

注意：执行某个生命周期的某个阶段不会影响其它的生命周期！

如果要同时执行多个生命周期的阶段可在命令行输入多个命令，中间以空格隔开， 例如：`clean package`，该命令执行 clean 生命周期的 clean 阶段和 default 生命周期的 package 阶段。

### Maven的概念模型

Maven 包含了一个项目对象模型(Project Object Model)，一组标准集合，一个项目生命周期(Project Lifecycle)，一个依赖管理系统(Dependency Management System)和用来运行定义在生命周期阶段(phase) 中插件(plugin) 目标(goal) 的逻辑。

下图是maven的概念模型图：

![x](http://hyw6485860001.my3w.com/public/images/maven_model.jpg)

1、项目对象模型(Project Object Model)

一个 maven 工程都有一个pom.xml 文件， 通过pom.xml 文件定义项目的坐标、项目依赖、项目信息、插件目标等。

2、依赖管理系统(Dependency Management System)

通过 maven 的依赖管理对项目所依赖的jar包进行统一管理。

3、一个项目生命周期(Project Lifecycle)

使用 maven 完成项目的构建， 项目构建包括：清理、编译、测试、部署等过程，maven将这些过程规范为一个生命周期。maven 通过执行一些简单命令即可实现生命周期的各个过程

4、一组标准集合

maven 将整个项目管理过程定义一组标准，比如：通过 maven 构建工程有标准的目录结构，有标准的生命周期阶段、依赖管理有标准的坐标定义等。

5、插件(plugin) 目标(goal)

maven 管理项目生命周期过程都是基于插件完成的。

## Maven安装

下载：[官网下载地址](http://maven.apache.org/download.cgi)

解压：将 maven 解压到一个不含有中文和空格的目录中。

**目录结构：**

- bin 目录mvn.bat （以run 方式运行项目）、mvnDebug.bat（以debug 方式运行项目）
- boot 目录maven 运行需要类加载器
- conf 目录settings.xml 整个maven 工具核心配置文件
- lib 目录maven 运行依赖jar 包

**环境变量配置：**

电脑上需安装java 环境，安装JDK1.7+ 版本（设置好Java环境变量）

配置 M2_HOME / MAVEN_HOME：MAVEN解压的根目录；将 `%MAVEN_HOME%/bin`加入环境变量path

通过 `mvn -v` 命令检查 maven 是否安装成功。

注意：如果你的公司正在建立一个防火墙，并使用HTTP代理服务器来阻止用户直接连接到互联网。那么，Maven将无法下载任何依赖。

为了使它工作，你必须声明在 Maven 的配置文件中设置代理服务器：settings.xml。找到文件 {M2_HOME}/conf/settings.xml，并把你的代理服务器信息配置写入。

```xml
<!-- proxies
   | This is a list of proxies which can be used on this machine to connect to the network.
   | Unless otherwise specified (by system property or command-line switch), the first proxy
   | specification in this list marked as active will be used.
   |-->
  <proxies>
    <!-- proxy
     | Specification for one proxy, to be used in connecting to the network.
     |
    <proxy>
      <id>optional</id>
      <active>true</active>
      <protocol>http</protocol>
      <username>proxyuser</</username>
      <password>proxypass</password>
      <host>proxy.host.net</host>
      <port>80</port>
      <nonProxyHosts>local.net|some.host.com</nonProxyHosts>
    </proxy>
    -->
  </proxies>
```

常用配置：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 http://maven.apache.org/xsd/settings-1.0.0.xsd">

<!-- 本地仓库的路径设置的是D盘maven/repo目录下（自行配置一个文件夹即可，默认是~/.m2/repository） -->
<localRepository>D:\maven\repo</localRepository>  
<mirrors>
  <!-- 配置阿里云镜像服务器 国内镜像速度会快一些 -->
  <mirror>
    <id>alimaven</id>
    <name>aliyun maven</name>
    <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
    <mirrorOf>central</mirrorOf>
  </mirror>
</mirrors>
</settings>
```

### Maven仓库

- **本地仓库**：用来存储从远程仓库或中央仓库下载的插件和jar包，项目使用一些插件或jar包，优先从本地仓库查找。默认本地仓库位置在 `${user.dir}/.m2/repository`，${user.dir} 表示windows用户目录。
- **远程仓库**：如果本地需要插件或者jar包，本地仓库没有，默认去远程仓库下载。远程仓库可以在互联网内也可以在局域网内。
- **中央仓库**：在 maven 软件中内置一个远程仓库地址 http://repol.maven.org/maven2，它是中央仓库，服务于整个互联网，它由Maven团队自己维护，里面存储了非常全的jar包，包含了世界上大部分流行的开源项目构件。（Maven中心储存库网站已经改版本，目录浏览可能不再使用。这将直接被重定向到 http://search.maven.org/。这就好多了，现在有一个搜索功能）

  配置本地仓库：可以在 `MAVE_HOME/conf/settings.xml` 文件中配置本地仓库位置。假设位于 D:\maven\repo

```
<localRepository>D:\maven\repo</localRepository>
```

提示：中央仓库的网络不稳定，可以使用阿里的资源仓库：https://help.aliyun.com/document_detail/102512.html?spm=a2c4e.11153940.0.0.213c7bdeaNqmlq

### Maven项目工程目录约定

使用maven 创建的工程我们称它为maven 工程，maven 工程具有一定的目录规范，如下：

- src/main/java：存放项目的.java 文件
- src/main/resources：存放项目资源文件，如spring，hibernate 配置文件
- src/test/java：存放所有单元测试.java文件，如JUnit测试类
- src/test/resources：测试资源文件
- target：项目输出位置，编译后的class文件会输出到此目录
- pom.xml：maven项目核心配置文件

## 常用 Maven 命令

| **命令** | **说明**                                                     |
| -------- | ------------------------------------------------------------ |
| compile  | 编译命令。将src/main/java 下的文件编译为class 文件输出到target 目录下。 |
| test     | 测试命令。执行src/test/java 下的单元测试类                   |
| clean    | 清理命令。删除target 目录的内容                              |
| package  | 打包命令。java 工程打成jar包，web工程打成war包。             |
| install  | 安装命令。将maven 打成jar 包或war 包发布到本地仓库           |

## Eclipse 与 Maven 集成

Eclipse提供了一个很好的插件[m2eclipse](http://www.eclipse.org/m2e/)无缝将Maven和Eclipse集成在一起。Eclipse mars 2 版本自带maven 插件不用单独安装。

安装m2eclipse插件：

- Eclipse 3.5 (Gallileo)：[Installing m2eclipse in Eclipse 3.5 (Gallileo)](http://www.sonatype.com/books/m2eclipse-book/reference/ch02s03.htmll)
- Eclipse 3.6 (Helios)：[Installing m2eclipse in Eclipse 3.6 (Helios)](http://www.sonatype.com/books/m2eclipse-book/reference/install-sect-marketplace.htmll)

在 Eclipse 中配置使用的 Maven 的 setting.xml 文件，使用 Maven 安装目录下的 setting.xml 文件。

**注意**：如果修改了 setting.xml 文件需要点击 "update settings" 按钮对本地仓库重建索引，点击"Reindex"

Maven 配置完成需要测试在 eclipse 中是否可以浏览 maven 的本地仓库，如果可以正常浏览 Maven 本地仓库则说明 Eclipse 集成 Maven 己经完成。

打开 Eclipse 仓库视图，对插件和 jar 包建立索引

找到 Local respository 本地仓库项，点击 Rebuild index 重建索引

重建索引完成点击前边的 "+" 图标即可查看本地仓库的内容。

### 定义Maven坐标

### 构建web工程

1、从Maven模板创建Web项目

您可以通过使用 Maven 的 maven-archetype-webapp 模板来创建一个快速启动 Java Web 应用程序的项目。在终端(* UNIX或Mac)或命令提示符(Windows)中，导航至您想要创建项目的文件夹。键入以下命令：

```
mvn archetype:generate -DgroupId=com.colin -DartifactId=DemoWebApp -DarchetypeArtifactId=maven-archetype-webapp -DinteractiveMode=false
```

新的Web项目命名为 "DemoWebApp"，以及一些标准的 web 目录结构也会自动创建。

2、Eclipse IDE 支持

要导入这个项目到Eclipse中，需要生成一些 Eclipse 项目的配置文件：

在终端，进入到 "DemoWebApp" 文件夹中，键入以下命令：

```
cd DemoWebApp
mvn eclipse:eclipse -Dwtpversion=2.0
```

注意，此选项 -Dwtpversion=2.0 告诉 Maven 将项目转换到 Eclipse 的 Web 项目(WAR)，而不是默认的Java项目(JAR)。为方便起见，以后我们会告诉你如何配置 pom.xml 中的这个 WTP 选项。

导入到 Eclipse IDE – File -> Import… -> General -> Existing Projects into workspace. 在 Eclipse 中，如果看到项目顶部有地球图标，意味着这是一个 Web 项目。

3、更新POM

在 Maven 中，Web 项目的设置都通过这个单一的 pom.xml 文件配置。

- 添加项目依赖 - Spring, logback 和 JUnit
- 添加插件来配置项目

pom.xml：

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0  http://maven.apache.org/maven-v4_0_0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.Colin</groupId>
    <artifactId>DemoWebApp</artifactId>
    <packaging>war</packaging>
    <version>1.0-SNAPSHOT</version>
    <name>DemoWebApp Maven Webapp</name>
    <url>http://maven.apache.org</url>
    <properties>
        <jdk.version>1.7</jdk.version>
        <spring.version>4.1.1.RELEASE</spring.version>
        <jstl.version>1.2</jstl.version>
        <junit.version>4.11</junit.version>
        <logback.version>1.0.13</logback.version>
        <jcl-over-slf4j.version>1.7.5</jcl-over-slf4j.version>
    </properties>

    <dependencies>
        <!-- Unit Test -->
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>${junit.version}</version>
        </dependency>

        <!-- Spring Core -->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-core</artifactId>
            <version>${spring.version}</version>
            <exclusions>
                <exclusion>
                    <groupId>commons-logging</groupId>
                    <artifactId>commons-logging</artifactId>
                </exclusion>
            </exclusions>
        </dependency>

        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>jcl-over-slf4j</artifactId>
            <version>${jcl-over-slf4j.version}</version>
        </dependency>
        <dependency>
            <groupId>ch.qos.logback</groupId>
            <artifactId>logback-classic</artifactId>
            <version>${logback.version}</version>
        </dependency>

        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-web</artifactId>
            <version>${spring.version}</version>
        </dependency>

        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-webmvc</artifactId>
            <version>${spring.version}</version>
        </dependency>
        <!-- jstl -->
        <dependency>
            <groupId>jstl</groupId>
            <artifactId>jstl</artifactId>
            <version>${jstl.version}</version>
        </dependency>
    </dependencies>

    <build>
        <finalName>DemoWebApp</finalName>

        <plugins>
            <!-- Eclipse project -->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-eclipse-plugin</artifactId>
                <version>2.9</version>
                <configuration>
                    <!-- Always download and attach dependencies source code -->
                    <downloadSources>true</downloadSources>
                    <downloadJavadocs>false</downloadJavadocs>
                    <!-- Avoid type mvn eclipse:eclipse -Dwtpversion=2.0 -->
                    <wtpversion>2.0</wtpversion>
                </configuration>
            </plugin>

            <!-- Set JDK Compiler Level -->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>2.3.2</version>
                <configuration>
                    <source>${jdk.version}</source>
                    <target>${jdk.version}</target>
                </configuration>
            </plugin>

            <!-- For Maven Tomcat Plugin -->
            <plugin>
                <groupId>org.apache.tomcat.maven</groupId>
                <artifactId>tomcat7-maven-plugin</artifactId>
                <version>2.2</version>
                <configuration>
                    <path>/DemoWebApp</path>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
```

要编译，测试和项目打包成一个WAR文件，输入：`mvn package`

一个新的 WAR 文件将在 project/target/DemoWebApp.war 产生，只需复制并部署到 Tomcat 发布的目录。

如果想通过 Eclipse 服务器这个项目插件（Tomcat 或其它容器）调试，这里再输入：`mvn eclipse:eclipse`

如果一切顺利，该项目的依赖将被装配附加到 Web 部署项目。右键点击 project -> Properties -> Deployment Assembly

Maven 的 Tomcat 插件声明（加入到 pom.xml）：

pom.xml：

```
<!-- For Maven Tomcat Plugin -->
```

键入以下命令（有时网络不通畅需要执行2-3次）：

```
mvn tomcat:run
```

这将启动Tomcat，部署项目默认在端口8080。

**出错**：Maven项目下update maven后Eclipse报错：java.lang.ClassNotFoundException: ContextLoaderL

解决方案：

1. 右键点击项目--选择Properties，选择Deployment Assembly,在右边点击Add按钮，在弹出的窗口中选择Java Build Path Entries

2. 点击Next，选择Maven Dependencies

3. 点击Finish，然后可以看到已经把Maven Dependencies添加到Web应用结构中了

操作完后，重新部署工程，不再报错了。然后我们再到.metadata.plugins\org.eclipse.wst.server.core\tmp0\wtpwebapps\目录下，发现工程WEB-INF目录下自动生成了lib目录，并且所有的依赖jar包也都已经部署进来。问题因此解决。

### 快照

大型应用软件一般由多个模块组成，一般它是多个团队开发同一个应用程序的不同模块，这是比较常见的场景。例如，一个团队正在对应用程序的应用程序，用户界面项目(app-ui.jar:1.0) 的前端进行开发，他们使用的是数据服务工程 (data-service.jar:1.0)。

现在，它可能会有这样的情况发生，工作在数据服务团队开发人员快速地开发 bug 修复或增强功能，他们几乎每隔一天就要释放出库到远程仓库。

现在，如果数据服务团队上传新版本后，会出现下面的问题：

- 数据服务团队应该发布更新时每次都告诉应用程序UI团队，他们已经发布更新了代码。
- UI团队需要经常更新自己 pom.xml 以获得更新应用程序的版本。

为了处理这类情况，引入快照的概念，并发挥作用。

**什么是快照？**

快照（SNAPSHOT ）是一个特殊版本，指出目前开发拷贝不同于常规版本，Maven 每生成一个远程存储库都会检查新的快照版本。

现在，数据服务团队将在每次发布代码后更新快照存储库：data-service:1.0-SNAPSHOT 替换旧的 SNAPSHOT jar。

**快照与版本**

在使用版本时，如果 Maven 下载所提到的版本为 data-service:1.0，那么它永远不会尝试在库中下载已经更新的版本1.0。要下载更新的代码，data-service的版本必须要升级到1.1。

在使用快照（SNAPSHOT）时，Maven会在每次应用程序UI团队建立自己的项目时自动获取最新的快照（data-service:1.0-SNAPSHOT）。

**app-ui pom.xml**

app-ui 项目使用数据服务（data-service）的 1.0-SNAPSHOT 

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" 
   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
   xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
   http://maven.apache.org/xsd/maven-4.0.0.xsd">
   <modelVersion>4.0.0</modelVersion>
   <groupId>app-ui</groupId>
   <artifactId>app-ui</artifactId>
   <version>1.0</version>
   <packaging>jar</packaging>
   <name>health</name>
   <url>http://maven.apache.org</url>
   <properties>
      <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
   </properties>
   <dependencies>
      <dependency>
      <groupId>data-service</groupId>
         <artifactId>data-service</artifactId>
         <version>1.0-SNAPSHOT</version>
         <scope>test</scope>
      </dependency>
   </dependencies>
</project>
```

**data-service pom.xml**

数据服务（data-service）项目对于每一个微小的变化释放 1.0 快照：

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" 
   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
   xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
   http://maven.apache.org/xsd/maven-4.0.0.xsd">
   <modelVersion>4.0.0</modelVersion>
   <groupId>data-service</groupId>
   <artifactId>data-service</artifactId>
   <version>1.0-SNAPSHOT</version>
   <packaging>jar</packaging>
   <name>health</name>
   <url>http://maven.apache.org</url>
   <properties>
      <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
   </properties>
</project>
```

虽然，在使用快照（SNAPSHOT）时，Maven 自动获取最新的快照版本。不过我们也可以强制使用 -U 切换到任何 maven 命令来下载最新的快照版本。

```sh
mvn clean package -U
```

打开命令控制台，进入项目根目录，然后执行以下命令mvn命令。

```sh
mvn clean package -U
```

Maven会下载数据服务的最新快照后并开始构建该项目。

### 依赖管理

Maven提供了一个高程度的控制来管理依赖关系复杂的多模块项目。

**传递依赖发现**

通常情况下，当一个库A依赖于其他库B的情况下，另一个项目Ç想用A，则该项目需要使用库B。

在Maven帮助下以通过这样的依赖来发现所有需要的库。Maven通过读取依赖项（项目文件pom.xml中），找出所有的依赖。

我们只需要在每个项目POM定义直接依赖关系。Maven自动处理其余部分。

**依赖关系管理**

通常，我们在一个共同的项目下创建一套项目。我们依赖一个公共的POM，然后各个子项目POM继承这个父POM。下面的例子将帮助你理解这个概念

![x](http://viyitech.cn/public/images/maven_pom.jpg)

以下是上述的依赖图的细节：

- APP-UI-WAR依赖于App-Core-lib和 App-Data-lib。
- Root 是 App-Core-lib 和 App-Data-lib 的父类。
- Root 定义LIB1，LIB2，Lib3作为其依赖部分依赖关系。

### Maven自动化部署

在项目开发中，通常是部署过程包含以下步骤：

- 检入代码在建项目全部进入SVN或源代码库中，并标记它。
- 从SVN下载完整的源代码。
- 构建应用程序。
- 生成输出要么WAR或EAR文件存储到一个共同的网络位置。
- 从网络获取的文件和文件部署到生产现场。
- 更新日期和应用程序的更新版本号的文件。

问题说明：

通常有多人参与了上述部署过程。一个团队可能手动签入的代码，其他人可以处理构建等。这很可能是任何一个步骤可能会错过了，由于涉及和由于多团队环境手动工作。例如，较旧的版本可能不会被更换网络设备和部署团队再部署旧版本。

解决：

通过结合自动化的部署过程

- Maven构建和释放项目
- SubVersion源代码库，管理源代码，
- 和远程存储库管理器（Jfrog/ Nexus）来管理项目的二进制文件。

更新项目的pom.xml

我们将使用Maven发布插件来创建一个自动释放过程。例如：bus-core-api 项目POM.xml

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" 
   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
   xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
   http://maven.apache.org/xsd/maven-4.0.0.xsd">
   <modelVersion>4.0.0</modelVersion>
   <groupId>bus-core-api</groupId>
   <artifactId>bus-core-api</artifactId>
   <version>1.0-SNAPSHOT</version>
   <packaging>jar</packaging> 
   <scm>
      <url>http://www.svn.com</url>
      <connection>scm:svn:http://localhost:8080/svn/jrepo/trunk/Framework</connection>
      <developerConnection>
        scm:svn:${username}/${password}@localhost:8080:common_core_api:1101:code
      </developerConnection>
   </scm>
   <distributionManagement>
      <repository>
         <id>Core-API-Java-Release</id>
         <name>Release repository</name>
         <url>http://localhost:8081/nexus/content/repositories/Core-Api-Release</url>
      </repository>
   </distributionManagement>
   <build>
      <plugins>
         <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-release-plugin</artifactId>
            <version>2.0-beta-9</version>
            <configuration>
               <useReleaseProfile>false</useReleaseProfile>
               <goals>deploy</goals>
               <scmCommentPrefix>[bus-core-api-release-checkin]-</scmCommentPrefix>
            </configuration>
         </plugin>
      </plugins>
   </build>
</project>
```

| **元素**     | 描述                                                         |
| ------------ | ------------------------------------------------------------ |
| SCM          | Configures the SVN location from  where Maven will check out the source code. |
| Repositories | Location where built WAR/EAR/JAR  or any other artifact will be stored after code build is successful. |
| Plugin       | maven-release-plugin is  configured to automate the deployment process. |

**Maven发布插件**

Maven使用下列有用的任务maven-release-plugin.

```sh
mvn release:clean
```

它清除以防工作区的最后一个释放的过程并不顺利。

```sh
mvn release:rollback
```

回滚是为了以防工作空间代码和配置更改的最后一个释放的过程并不顺利。

```xml
mvn release:prepare
```

执行多个操作次数

- 检查是否有任何未提交的本地更改或不
- 确保没有快照依赖
- 更改应用程序的版本并删除快照从版本，以释放
- 更新文件到 SVN.
- 运行测试用例
- 提交修改后POM文件
- 标签代码在subversion中
- 增加版本号和附加快照以备将来发行

- 提交修改后的POM文件到SVN。

```sh
mvn release:perform
```

检查出使用前面定义的标签代码并运行Maven的部署目标来部署战争或内置工件档案库。让我们打开命令控制台，到项目根目录并执行以下命令mvn命令：

```sh
mvn release:prepare
```

Maven将开始建设该项目。一旦构建成功运行以下命令mvn命令：

```sh
mvn release:perform
```

一旦构建成功，您可以在资料库验证上传的JAR文件。

### 使用Maven模板创建项目

如何使用 `mvn archetype:generate` 从现有的Maven模板列表中生成项目？

通常情况下，我们只需要使用下面的两个模板：
1.	maven-archetype-webapp – Java Web Project (WAR)
2.	maven-archetype-quickstart – Java Project (JAR)

**Maven 1000+ 模板**

如果键入命令 `mvn archetype:generate`，1000 +模板会被提示在屏幕上，你没有办法看到它，或者选择什么。为了解决这个问题，输出模板列表，像这样保存为文本文件：

```sh
# waiting few seconds,then exits
mvn archetype:generate > templates.txt
# 列出 Maven 的模板
mvn archetype:generate
-----------------------------------------------------------------------------------------Choose archetype:
1: remote -> am.ik.archetype:maven-reactjs-blank-archetype (Blank Project for React.js)
2: remote -> am.ik.archetype:msgpack-rpc-jersey-blank-archetype (Blank Project for Spring Boot + Jersey)
...
-----------------------------------------------------------------------------------------
# 选择数字 “314” 来使用 ml.rugal.archetype:springmvc-spring-hibernate 模板，并填写详细信息。注意，这个数字314可能在您的环境有所不同。寻找正确的数字应该看上面步骤中列出的技术。
-----------------------------------------------------------------------------------------
Choose a number or apply filter...
...
Choose ml.rugal.archetype:springmvc-spring-hibernate version:
...
# 注意，要导入项目到Eclipse中，键入命令mvn eclipse:eclipse，并导入它作为一个正常的项目
```

如果您知道使用哪个 archetypeArtifactId，可以跳过交互模式命令：

```sh
# maven-archetype-quickstart (Java Project)
mvn archetype:generate -DgroupId=com.yiibai.core -DartifactId=ProjectName -DarchetypeArtifactId=maven-archetype-quickstart -DinteractiveMode=false
# maven-archetype-webapp (Java Web Project)
mvn archetype:generate -DgroupId=com.yiibai.web -DartifactId=ProjectName -DarchetypeArtifactId=maven-archetype-webapp -DinteractiveMode=false
```

### 使用Maven构建项目

要构建一个基于Maven的项目，打开控制台，进入到 pom.xml 文件所放的项目文件夹，并发出以下命令，这将执行Maven的"package"阶段。

```sh
mvn package
```

Maven是分阶段运行，因此，执行"package"阶段的时候，所有阶段 – "validate", "compile" 和 "test", 包括目前的阶段"package"将被执行。

将项目打包成一个"jar"文件

```xml
<project>
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.yiibai</groupId>
    <artifactId>Maven Example</artifactId>
    <packaging>jar</packaging>
</project>
```

将项目打包成一个"war"文件

```xml
<project>
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.yiibai</groupId>
    <artifactId>Maven Example</artifactId>
    <packaging>war</packaging>
</project>
```











