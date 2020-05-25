# 目录

1. [镜像命令](#镜像命令)
2. [容器命令](#容器命令)
3. [数据管理](#数据管理)

```sh
# 启动docker服务
service docker start
# 查看帮助信息
docker COMMAND --help
```

分类|命令
--|--
Docker环境信息|info、version
镜像仓库命令|login、logout、pull、push、search
镜像管理|build、images、import、load、rmi、save、tag、commit
容器生命周期管理|Create、exec、kill、pause、restart、rm、run、start、stop、unpause
容器运维操作|attach、export、inspect、port、ps、rename、stats、top、wait、cp、diff、update
容器资源管理|volume、network
系统日志信息| events、history、logs

## 镜像命令

Docker系统有两个程序：`docker服务端` 和 `docker客户端`。其中 `docker服务端`  是一个服务进程，管理着所有的容器。`docker客户端` 则扮演着 `docker服务端` 的远程控制器，可以用来控制 docker 的服务端进程。大部分情况下，`服务端` 和 `客户端` 运行在一台机器上。

```sh
# 检查docker的版本，这样可以用来确认docker服务在运行并可通过客户端链接
docker version
```

镜像是包含创建容器所需的所有依赖项和信息的包。映像包括所有依赖项（例如框架）以及容器运行时使用的部署和执行配置。通常情况下，映像派生自多个基础映像，这些基础映像是堆叠在一起形成容器文件系统的层。创建后，映像不可变。

`镜像`是一个静态的概念，可以从一个`镜像`创建多个`容器`，每个`容器`互不影响！所谓“仓库”，简单来说就是集中存放`镜像`的地方。

`Docker registry` 是存储容器镜像的仓库，用户可以通过 `Docker c1ient` 与 `Docker registry` 进行通信，以此来完成镜像的搜索、下载和上传等相关操作。`DockerHub` 是由 Docker 公司在互联网上提供的一个镜像仓库，提供镜像的公有与私有存储服务，它是用户最主要的镜像来源。除了 `DockerHub` 外，用户还可以自行搭建私有服务器来实现镜像仓库的功能。

Docker 官方维护着一个公共仓库 [Docker store](https://store.docker.com/)，你可以方便的在 Docker store 寻找自己想要的镜像。当然，你也可以在终端里面登录：`docker login` 输入你的用户名和密码就可以登陆了。然后，可以使用 `sudo docker search ubuntu` 来搜索 Ubuntu 镜像

### 查找镜像

```sh
# 使用 docker search 命令可以搜索远端仓库中共享的镜像，默认搜索 Docker hub 官方仓库中的镜像。
# 示例：搜索 tomcat 镜像
docker search tomcat
```

### 获取镜像

```sh
# 使用 docker pull 从仓库获取所需要的镜像
# 实际上相当于  docker pull registry.hub.docker.com/<name>:<tag> 命令，即从注册服务器 registry.hub.docker.com 中的 <name> 仓库下载标记为 <tag> 的镜像。
# 有时候官方仓库注册服务器下载较慢，可以从其他仓库下载。从其它仓库下载时需要指定完整的仓库注册服务器地址。
# name：镜像名称
# tag：可以应用于映像的标记或标签，以便可以识别同一映像的不同映像或版本（具体取决于版本号或目标环境）。
docker pull centos:7
```

### 查看镜像列表

```sh
# 列出所有顶层（top-level）镜像
docker images
---
REPOSITORY|TAG|IMAGE ID|CREATED|SIZE
-|-|-|-|-
centos|centos6|6a77ab6655b9|8 weeks ago|194.6 MB
ubuntu|latest|2fa927b5cdd3|9 weeks ago|122 MB
```

实际上，在这里我们没有办法区分一个镜像和一个只读层，所以我们提出了 `top-level` 镜像。只有创建容器时使用的镜像或者是直接pull下来的镜像能被称为顶层（top-level）镜像，并且每一个顶层镜像下面都隐藏了多个镜像层。

在列出信息中，可以看到几个字段信息

- 来自于哪个仓库，比如 ubuntu
- 镜像的标记，比如 14.04
- 它的 ID 号（唯一）
- 创建时间
- 镜像大小

### 创建镜像

```sh
docker commit
```

参数说明：

- -a, –author: 作者信息
- -m, –meassage: 提交消息
- -p, –pause=true: 提交时暂停容器运行

说明：基于已有的镜像的容器的创建。

```sh
# 以ubuntu为例子创建
docker pull ubuntu
# 运行ubuntu，-ti把容器内标准绑定到终端并运行bash，这样开跟传统的linux操作系统没什么两样
docker run -ti ubuntu bash
```

现在我们直接在容器内运行。这个内部系统是极简的，只保留一些系统运行参数，里面很多命令（vi）可能都是没有的。

```sh
# 退出容器
exit
# 容器创建成镜像的方法：docker commit
# 通过某个容器 <id> 创建对应的镜像，有点类似git
docker commit -a 'Colin Chen' -m 'This is a demo' d1d6706627f1 Colin/test
# 通过 docker images 发现里面多了一个镜像 Colin/test
```

### 上传镜像

```sh
# 用户可以通过 docker push 命令，把自己创建的镜像上传到仓库中来共享
# 例如，用户在 Docker Hub 上完成注册后，可以推送自己的镜像到仓库中。
docker push hainiu/httpd:1.0
```

### 删除镜像

```sh
# 删除构成镜像的一个只读层
docker rmi <image-id>
```

你只能够使用 `docker rmi` 来移除最顶层（top level layer）（也可以说是镜像），你也可以使用 `-f` 参数来强制删除中间的只读层

>注意：当同一个镜像拥有多个标签，`docker rmi` 只是删除该镜像多个标签中的指定标签而已，而不影响镜像文件。如果一个镜像只有一个tag的话，删除tag就删除了镜像的本身。

```sh
# 为一个镜像做一个tag
docker tag c9d990395902 Colin/ubuntu:test  
# 执行删除tag操作
docker rmi Colin/ubuntu:test
# 删除镜像操作
docker rmi ubuntu
```

如果镜像里面有容器正在运行，删除镜像的话，会提示error，系统默认是不允许删除的，如果强制删除需要加入 `-f` 操作，但是docker是不建议这么操作的，因为你删除了镜像其实容器并未删除，直接导致容器找不到镜像，这样会比较混乱。

```sh
# 运行一个镜像里面的容器
docker run ubuntu echo 'Hello World'
# 查看运行中的容器
docker ps -a
# 删除镜像，报错误error，有一个容器正在这个镜像内运行
docker rmi ubuntu  
# 强制删除
docker rmi -f ubuntu  
# 再次查看运行中的容器，已经找不到镜像（删除镜像未删除容器的后果）
```

### 查看镜像操作记录

```sh
docker history [name]
```

### 给镜像设置一个新的仓库：版本对

```sh
docker tag my_image:v1.0 my:v0.1
```

运行了上面的指令我们就得到了一个新的，和原来的镜像一模一样的镜像。

### 镜像保存

```sh
# 创建一个镜像的压缩文件，这个文件能够在另外一个主机的 Docker 上使用。
docker save <image-id>
```

和 `export` 命令不同，这个命令为每一个层都保存了它们的元数据。这个命令只能对镜像生效。

使用示例：

```sh
# 保存 centos 镜像到 centos_images.tar 文件
docker save -o centos_images.tar centos:centos6
# 或者直接重定向
docker save -o centos_images.tar centos:centos6 > centos_images.tar
```

### 载入镜像

```sh
# 使用 docker load 命令可以载入镜像，其中 image 可以为标签或ID。这将导入镜像及相关的元数据信息（包括标签等），可以使用 docker images 命令进行查看。我们先删除原有的 Colin/test 镜像，执行查看镜像，然后在导入镜像
docker load --input test.jar
# 可能这个镜像的名字不符合 docker 的要求，重新命名一下
docker tag <ImageId> <ImageName>
```

### 查看镜像详细信息

```sh
# inspect命令会提取出容器或者镜像最顶层的元数据，默认会列出全部信息
docker inspect <container-id> or <image-id>
# 查看镜像的某一个详细信息
docker inspect -f {{.os}} c9d990395902
```

说明：`docker inspect` 命令返回的是一个JSON的格式消息，如果我们只要其中的一项内容时，可以通过 `-f` 参数来指定。Image_id通常可以使用该镜像ID的前若干个字符组成的可区分字符串来替代完成的ID。

### 生成镜像

**Dockerfile**：包含有关如何生成 Docker 映像的说明的文本文件。与批处理脚本相似，首先第一行将介绍基础映像，然后是关于安装所需程序、复制文件等操作的说明，直至获取所需的工作环境。

**生成**：基于其 Dockerfile 提供的信息和上下文生成容器映像的操作，以及生成映像的文件夹中的其他文件。可以使用 `docker build` 命令生成映像 。

**多阶段生成**：Docker 17.05 或更高版本的一个功能，可帮助减小最终映像的大小。概括来说，借助多阶段生成，可以使用一个包含 SDK 的大型基础映像（以此为例）编译和发布应用程序，然后使用发布文件夹和一个小型仅运行时基础映像生成一个更小的最终映像。

**多体系结构映像**：多体系结构是一项功能，根据运行 Docker 的平台简化相应映像选择。例如，Dockerfile 从注册表请求基础映像  
`FROM mcr.microsoft.com/dotnet/core/sdk:2.2`  
时，实际上它会获得 2.2-nanoserver-1709、2.2-nanoserver-1803、2.2-nanoserver-1809 或 2.2-stretch，具体取决于操作系统和运行 Docker 的版本 。

**docker build：**

使用 `docker commit` 来扩展一个镜像比较简单，但是不方便在一个团队中分享。我们可以使用 `docker build` 来创建一个新的镜像。为此，首先需要创建一个 Dockerfile，包含一些如何创建镜像的指令。新建一个目录和一个 Dockerfile。

```sh
mkdir hainiu
cd hainiu
touch Dockerfile
```

Dockerfile中每一条指令都创建镜像的一层，例如：

```Dockerfile
FROM centos:centos6
LABEL maintainer="chenxiao8516@163.com"
# move all configuration files into container
RUN yum install -y httpd
EXPOSE 80
CMD ["sh","-c","service httpd start;bash"]
```

Dockerfile基本的语法是：

- 使用#来注释
- FROM指令告诉Docker使用哪个镜像作为基础
- 接着是维护者的信息
- RUN开头的指令会在创建中运行，比如安装一个软件包，在这里使用yum来安装了一些软件
- 更详细的语法说明请参考[Dockerfile](https://docs.docker.com/engine/reference/builder/)

编写完成 Dockerfile 后可以使用 `docker build` 来生成镜像。

```sh
docker build -t hainiu/httpd:1.0 .
```

其中 -t标记添加tag，指定新的镜像的用户信息。"."是Dockerfile所在的路径（当前目录），也可以替换为一个具体的Dockerfile的路径。注意一个镜像不能超过127层。用`docker images`查看镜像列表

```sh
docker images
```

| REPOSITORY   | TAG     | IMAGE ID     | CREATED       | SIZE     |
| ------------ | ------- | ------------ | ------------- | -------- |
| hainiu/httpd | 1.0     | 5f9aa91b0c9e | 3 minutes ago | 292.4 MB |
| centos       | centos6 | 6a77ab6655b9 | 8 weeks ago   | 194.6 MB |
| ubuntu       | latest  | 2fa927b5cdd3 | 9 weeks ago   | 122 MB   |

细心的朋友可以看到最后一层的 ID(5f9aa91b0c9e) 和 image id 是一样的

- [示例1](../Codes/2.1_python.dockerfile)
- 示例2

```sh
# 后台模式运行：获得应用程序的长容器ID，然后被踢回终端
docker run -d -p 4000:80 friendlyhello

# 查看运行容器：
docker container ls
# List all containers, even those not running
docker container ls -a
# 结束运行：
docker container stop <containId>
# Force shutdown of the specified container
docker container kill <hash>
# Remove specified container from this machine
docker container rm <hash>
# Remove all containers
docker container rm $(docker container ls -a -q)

 # Create image using this directory's Dockerfile
docker build -t friendlyhello .
# Run image from a registry
docker run username/repository:tag
# Run "friendlyhello" mapping port 4000 to 80
docker run -p 4000:80 friendlyhello
# 查看新标记的图像：
docker image ls
# List all images on this machine
docker image ls -a
# Remove specified image from this machine
docker image rm <image id>
# Remove all images from this machine
docker image rm $(docker image ls -a -q)
# 登录公共镜像库：
docker login
# Tag <image> for upload to registry
docker tag <image> username/repository:tag
# 标记镜像：
docker tag friendlyhello wolfkings/get-started:part2
# Upload tagged image to registry
docker push username/repository:tag
# 发布镜像：
docker push wolfkings/get-started:part2

# 从公共存储库中拉出并运行映像：
docker run -d -p 4000:80 wolfkings/get-started:part2
```

## 容器命令

Docker 映像的实例。容器表示单个应用程序、进程或服务的执行。它由 Docker 映像的内容、执行环境和一组标准指令组成。在缩放服务时，可以从相同的映像创建多个容器实例。 或者，批处理作业可以从同一个映像创建多个容器，向每个实例传递不同的参数。

### 容器的生命周期

![x](D:/Colin/Life Go/IT/devops/Resource/Docker容器生命周期.png)

- 查看容器详细信息：`sudo docker inspect [nameOfContainer]`
- 查看容器最近一个进程：`sudo docker top [nameOfContainer]`
- 停止一个正在运行的容器：`sudo docker stop [nameOfContainer]`
- 继续运行一个被停止的容器：`sudo docker restart [nameOfContainer]`
- 暂停一个容器进程：`sudo docker pause [nameOfContainer]`
- 取消暂停：`sudo docker unpause [nameOfContainer]`
- 终止一个容器：`sudo docker kill [nameOfContainer]`

### 创建容器

`docker create <image-id>`

docker create 命令为指定的镜像（image）添加了一个可读写层，构成了一个新的容器。注意，这个容器并没有运行。

docker create 命令提供了许多参数选项可以指定名字，硬件资源，网络配置等等。

运行示例：创建一个centos的容器，可以使用仓库＋标签的名字确定image，也可以使用image－id指定image。返回容器id

```sh
# 查看本地images列表
docker images

# 用仓库＋标签
docker create -it --name centos6_container centos:centos6

# 使用image -id
docker create -it --name centos6_container 6a77ab6655b9 bash
b3cd0b47fe3db0115037c5e9cf776914bd46944d1ac63c0b753a9df6944c7a67

#可以使用 docker ps查看一件存在的容器列表，不加参数默认只显示当前运行的容器
docker ps -a

# 可以使用 -v 参数将本地目录挂载到容器中。
docker create -it --name centos6_container -v /src/webapp:/opt/webapp centos:centos6

# 这个功能在进行测试的时候十分方便，比如用户可以放置一些程序到本地目录中，来查看容器是否正常工作。本地目录的路径必须是绝对路径，如果目录不存在 Docker 会自动为你创建它。
```

### 启动容器

`docker start <container-id>`

Docker start命令为容器文件系统创建了一个进程隔离空间。注意，每一个容器只能够有一个进程隔离空间。

运行实例：

```sh
# 通过名字启动
docker start -i centos6_container

# 通过容器ID启动
docker start -i b3cd0b47fe3d
```

### 进入容器

进入容器一般有三种方法：

1. ssh 登录
2. attach 和 exec
3. nesenter

attach 和 exec 方法是 Docker 自带的命令，使用起来比较方便；而无论是 ssh 还是 nesenter 的使用都需要一些额外的配置。

attach 实际就是进入容器的主进程，所以无论你同时 attach 多少，其实都是进入了主进程。比如，我使用两次 attach 进入同一个容器，然后我在一个 attach 里面运行的指令也会在另一个 attach 里面同步输出，因为它们两个 attach 进入的根本就是一个进程！

在 attach 进入的容器（前提是你退出了 exec）使用“ps -ef”指令可以看出，我们的容器只有一个 bash 进程和 ps 命令本身

而 exec 就不一样了，exec 的过程其实是给容器新开了一个进程，比如我们使用 exec 进入容器后，使用 ps -ef 命令查看进程，你会发现，我们除了 ps 命令本身，还有两个 bash 进程，究其原因，就是因为我们 exec 进入容器的时候实际是在容器里面新开了一个进程。

这就涉及到了另一个问题，如果你在 exec 里面执行 exit 命令，你只是关掉了 exec 命令新开的进程，而主进程依旧在运行，所以容器并不会停止；而在 attach 里面运行 exit 命令，你实际是终止了主进程，所以容器也就随之被停止了。总结一下，**attach 的使用不会在容器开辟新的进程；exec 主要用在需要给容器开辟新进程的情况下**。

现在来介绍一下如何终止一个运行的容器。我们的容器在后台运行，现在我们觉得这个容器已经完成了任务，可以把它终止了，怎么办呢？一种办法是 attach 进入容器之后运行"exit"结束容器主进程，这样容器也就随之被终止了。另一种比较推荐的方法是运行：`sudo kill nameOfContainer`

```sh
# 在当前容器中执行新命令
docker exec <container-id>
# 如果增加 -it参数运行 bash 就和登录到容器效果一样的。
docker exec -it centos6_container bash
# attach命令可以连接到正在运行的容器，观察该容器的运行情况，或与容器的主进程进行交互。
docker attach [OPTIONS] CONTAINER
```

### 停止容器

```sh
docker stop <container-id>
```

### 删除容器

```sh
docker rm <container-id>
```

如果删除正在运行的容器，需要停止容器再进行删除

```sh
docker stop <name>
docker rm <name>
```

不管容器是否运行，可以使用 `docker rm –f` 命令进行删除。

### 运行容器

`docker run <image-id>`

docker run 就是 docker create 和 docker start 两个命令的组合，支持参数也是一致的，如果指定容器名字时，容器已经存在会报错，可以增加 --rm 参数实现容器退出时自动删除。

运行示例：`docker run -it --rm --name hello hello-world:latest bash`

命令解释：

- Docker run 是从一个镜像运行一个容器的指令。
- -ti 参数的含义是：terminal interactive，这个参数可以让我们进入容器的交互式终端。
- --name 指定容器的名字，后面的 hello 就是我们给这个容器起的名字。
- hello-world:latest是指明从哪个镜像运行容器，hello-world是仓库名，latest是标签。如在选取镜像启动容器时，用户未指定具体tag，Docker将默认选取tag为latest的镜像。
- bash 指明我们使用 bash 终端。

具体来说，当你运行 "Docker run" 的时候：

- 检查本地是否存在指定的镜像，不存在就从公共仓库下载；
- 利用镜像创建并启动一个容器；
- 给容器包含一个主进程（Docker 原则之一：一个容器一个进程，只要这个进程还存在，容器就会继续运行）；
- 为容器分配文件系统，IP，从宿主主机配置的网桥接口中桥接一个虚拟接口等（会在之后的教程讲解）。

守护态运行

所谓“守护态运行”其实就是后台运行(background running)，有时候，需要让 Docker 在后台运行而不是直接把执行的结果输出到当前的宿主主机下，这个时候需要在运行 "docker run" 命令的时候加上 "-d" 参数(-d means detach)。

>注意：这里说的后台运行和容器长久运行不是一回事，后台运行只是说不会在宿主主机的终端打印输出，但是你给定的指令执行完成后，容器就会自动退出，所以，长久运行与否是与你给定的需要容器运行的命令有关，与"-d"参数没有关系。

### 查看容器列表

`docker ps`：docker ps 命令会列出所有运行中的容器。这隐藏了非运行态容器的存在，如果想要找出这些容器，增加 -a 参数。

### 提交容器

`docker commit <container-id>` --将容器的可读写层转换为一个只读层，这样就把一个容器转换成了不可变的镜像。

### 容器导出

`docker export <container-id>` --创建一个tar文件，并且移除了元数据和不必要的层，将多个层整合成了一个层，只保存了当前统一视角看到的内容。export后的容器再import到Docker中，只有一个容器当前状态的镜像；而save后的镜像则不同，它能够看到这个镜像的历史镜像。

接下来，根据我们学过的内容，列出一点使用容器的建议，更多的建议会随着阅读的深入进一步提出。

1. 要在容器里面保存重要文件，因为容器应该只是一个进程，数据需要使用数据卷保存，关于数据卷的内容在下一篇文章介绍；
2. 尽量坚持 **一个容器，一个进程** 的使用理念，当然，在调试阶段，可以使用exec命令为容器开启新进程。

### 容器导入

导出的文件又可以使用 `docker import` 命令导入，成为镜像。示例：

```sh
cat export.tar | docker import – Colin/testimport:latest
docker images
```

导入容器生成镜像，通过镜像生成容器。

## 数据管理

在容器里直接写入数据是很不好的习惯，那么，如果想在容器里面写入数据，该怎么做呢？

Docker 数据管理主要有两种方式：数据卷和数据卷容器。下面我们会分别展开介绍。

卷：提供一个容器可以使用的可写文件系统。由于映像只可读取，而多数程序需要写入到文件系统，因此卷在容器映像顶部添加了一个可写层，这样程序就可以访问可写文件系统。 程序并不知道它正在访问的是分层文件系统，此文件系统就是往常的文件系统。卷位于主机系统中，由 Docker 管理。

### 数据卷（Data Volume）

数据卷的使用其实和 Linux 挂载文件目录是很相似的。简单来说，数据卷就是一个可以供容器使用的特殊目录。

- 创建一个数据卷

  在运行 `Docker run` 命令的时候使用 `-v` 参数为容器挂载一个数据卷：

  ```sh
  docker run -ti --name volume1 -v /myDir ubuntu:16.04 bash
  ```

  可以发现我们的容器里面有一个 myDir 的目录，这个目录就是我们所说的数据卷

- 删除一个数据卷

  数据卷是用来持久化数据的，所以数据卷的生命周期独立于容器。所以在容器结束后数据卷并不会被删除，如果你希望删除数据卷，可以在使用 `docker rm` 命令删除容器的时候加上 `-v` 参数。

  值得注意的是，如果你删除挂载某个数据卷的所有容器的同时没有使用 -v 参数清理这些容器挂载的数据卷，你之后再想清理这些数据卷会很麻烦，所以在你确定某个数据卷没有必要存在的时候，在删除最后一个挂载这个数据卷的容器的时候，使用 `-v` 参数删除这个数据卷。

- 挂载一个主机目录作为数据卷

  当然，你也可以挂载一个主机目录到容器，同样是使用 `-v` 参数。

  ```sh
  docker run -ti --name volume2 -v /home/zsc/Music/:/myShare ubuntu:16.04 bash
  ```

  以上指令会把宿主主机的目录 /home/zsc/Music 挂载到容器的 myShare 目录下，然后你可以发现我们容器内的 myShare 目录就会包含宿主主机对应目录下的文件

  Docker 挂载数据卷的默认权限是读写，你可以通过 :ro 指令为只读：

  ```sh
  docker run -ti --name volume2 -v /home/zsc/Music/:/myShare:ro ubuntu:16.04 bash
  ```

  直接挂载宿主主机目录作为数据卷到容器内的方式在测试的时候很有用，你可以在本地目录放置一些程序，用来测试容器工作是否正确。当然，Docker也可以挂载宿主主机的一个文件到容器，但是这会出现很多问题，所以不推荐这样做。如果你要挂载某个文件，最简单的办法就是挂载它的父目录。

### 数据卷容器（Data Volume Container）

所谓数据卷容器，其实就是一个普通的容器，只不过这个容器专门作为数据卷供其它容器挂载。

首先，在运行 docker run 指令的时候使用 -v 参数创建一个数据卷容器（这和我们之前创建数据卷的指令是一样的）：

```sh
docker run -ti  -d -v /dataVolume --name v0 ubuntu:16.04
```

然后，创建一个新的容器挂载刚才创建的数据卷容器中的数据卷：使用 `--volumes-from` 参数

```sh
docker run -ti --volumes-from v0 --name v1 ubuntu:16.04 bash
```

然后，我们的新容器里就可以看到数据卷容器的数据卷内容

>注意：  
>1、数据卷容器被挂载的时候不必保持运行！  
>2、如果删除了容器 v0 和 v1，数据卷并不会被删除。如果想要删除数据卷，应该在执行 docker rm 命令的时候使用 -v 参数。
