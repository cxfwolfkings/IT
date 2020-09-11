# 微服务架构

当我们把镜像名称添加到 Dockerfile 文件时，可以通过标签来指定操作系统和运行时的具体版本，下面是一些具体的实例：

| 镜像                                           | 说明                                                         |
| ---------------------------------------------- | ------------------------------------------------------------ |
| microsoft/dotnet:2.0.0-runtime-jessie          | Linux上的`.NET Core 2.0`运行时                               |
| microsoft/dotnet:2.0.0-runtime-nanoserver-1709 | Windows Nano Server上的`.NET Core 2.0`运行时（Windows Server 2016秋季创意者更新版本1709） |
| microsoft/aspnetcore:2.0                       | .NET Core 2.0多架构：支持依赖于具体主机的Linux和Windows Nano Server。aspnetcore镜像针对`ASP.NET Core`做了一些优化 |

对于.NET仓库来说，微软的愿景是尽量构建小而专的仓库。一个仓库代表一种具体场景，或者一个需要完成的具体工作。例如，[microsoft/aspnetcore](https://hub.docker.com/r/microsoft/dotnet/) 镜像应该在 Docker 上使用 `ASP.NET Core` 的场景下使用，因为这些镜像做了额外优化，可以让容器更快地启动。

而.NET Core镜像([microsoft/dotnet](https://hub.docker.com/r/microsoft/dotnet/))是为基于 `.NET Core` 的控制台应用程序设计的。例如：批处理、Azure WebJobs 和其他应该使用 `.NET Core` 的控制台场景。这些镜像并不包含 `ASP.NET Core` 栈，所以容器镜像的体积会更小一些。

大多数镜像仓库都提供了很多标签，帮助我们选择特定的框架版本和操作系统（Linux发行版或不同版本的Windows）。

关于微软提供的官方 `.NET Docker` 镜像的详细信息，可参考[`.NET Docker`镜像摘要](https://aka.ms/dotnetdockerimages)。

**开发和构建阶段**

开发阶段最重要的事情是：迭代新功能的速度和调试新功能的能力。镜像体积并不像代码变更以及快速查看这些变更的能力那么重要。一些工具和“生成代理容器”，会在开发和生成时使用开发版的`ASP.NET Core`镜像（[microsoft/aspnetcore-build](https://hub.docker.com/r/microsoft/aspnetcore-build/)）。在容器内部构建时，重要的事情是编译应用程序所需的组件，这其中包括编译器、其他.NET依赖，以及类似npm、Gulp和Bower这样的网页开发所需的依赖。

这种构建镜像为什么重要？实际上我们并不会把这种镜像部署到生产环境中，这种镜像只是用来构建一些需要放到生产镜像中的内容，用于持续集成（CI）环境和构建环境。举例来说，与其直接在构建代理主机（例如虚拟机）上手动安装所有应用程序依赖，不如让构建代理直接实例化一个带有构建应用程序所需所有依赖的`.NET Core`构建镜像。构建代理只需要知道怎样运行这个Docker镜像就可以了。借此可简化CI环境，使其变得更加可预测。

**生产环境**

在生产环境中，最重要的事情是我们可以快速部署并启动基于产品化`.NET Core`镜像的容器。所以，基于 [microsoft/aspnetcore](https://hub.docker.com/r/microsoft/aspnetcore/) 的运行时镜像通常比较小，借此可以更快速地从Docker注册表传输到Docker主机。提前准备好需要运行的内容，可以让启动容器后在最短时间内产生处理结果。在Docker模型中，无需从C#代码的编译开始，而是在构建容器过程中，运行dotnet build或dotnet publish命令完成的。

在这个优化过的镜像中，我们只需要把二进制文件和运行应用程序所需的其他内容放进去即可。例如，通过dotnet publish命令创建的部署包只包含编译过的.NET二进制文件、图片、.js和.css文件。运行之后，我们会看到一些包含JIT预编译包的镜像。

虽然.NET Core和ASP.NET Core镜像有多个版本，但它们之间共享了一个或多个镜像层，其中包括基础镜像层。所以，存储一个镜像所需的磁盘空间很小。它只包含自定义镜像相对于基础镜像的增量内容，因此从注册表拉取镜像的过程也可以更快。

在Docker Hub上浏览.NET镜像仓库的时候，我们会发现用标签分类或标记的多个版本。下表可以帮助我们选择应该使用的版本：

| 镜像                           | 说明                                                         |
| ------------------------------ | ------------------------------------------------------------ |
| microsoft/aspnetcore:2.0       | 基于Linux和Windows（多架构），只包含`ASP.NET Core`运行时和`ASP.NET Core`的一些优化 |
| microsoft/aspnetcore-build:2.0 | 基于Linux和Windows（多架构），包含`ASP.NET Core`的SDK        |



