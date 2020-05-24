# docker实战

## 目录

1. 安装与配置
   - [阿里云镜像配置](#阿里云镜像配置)
   - [Portainer](#Portainer)
   - [centos7](#centos7)
   - [gitlab](#gitlab)
   - [使用Docker Registry搭建私有镜像仓库](#使用Docker&nbsp;Registry搭建私有镜像仓库)
   - [docker搭建consul集群](#docker搭建consul集群)
   - [.NET Core微服务应用部署](#.NET&nbsp;Core微服务应用部署)
   - [可视化工具Grafana](#可视化工具Grafana)
   - [基于Docker安装RabbitMQ](#基于Docker安装RabbitMQ)
2. [问题](#问题)

## 安装与配置

### 阿里云镜像配置

提升获取官方镜像的速度：

```sh
mkdir -p /etc/docker
tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://6o1rxqal.mirror.aliyuncs.com"]
}
EOF
systemctl daemon-reload
systemctl restart docker
```

镜像仓库申请地址：[https://cr.console.aliyun.com/cn-shanghai/instances/repositories](#https://cr.console.aliyun.com/cn-shanghai/instances/repositories)

注册登录，创建命名空间，创建镜像仓库

```sh
# 登录阿里云 Docker Registry
docker login --username=一尾蜂 registry.cn-shanghai.aliyuncs.com
# 用于登录的用户名为阿里云账号全名，密码为开通服务时设置的密码。

# 从Registry中拉取镜像
docker pull registry.cn-shanghai.aliyuncs.com/daniel-hub/nginx-docker:[镜像版本号]

# 将镜像推送到Registry
docker tag [ImageId] registry.cn-shanghai.aliyuncs.com/daniel-hub/nginx-docker:[镜像版本号]
docker push registry.cn-shanghai.aliyuncs.com/daniel-hub/nginx-docker:[镜像版本号]
@ 请根据实际镜像信息替换示例中的[ImageId]和[镜像版本号]参数。
```

选择合适的镜像仓库地址：从ECS推送镜像时，可以选择使用镜像仓库内网地址，推送速度将得到提升并且将不会损耗您的公网流量。

如果您使用的机器位于经典网络，请使用 registry-internal.cn-shanghai.aliyuncs.com 作为Registry的域名登录，并作为镜像命名空间前缀。

如果您使用的机器位于VPC网络，请使用 registry-vpc.cn-shanghai.aliyuncs.com 作为Registry的域名登录，并作为镜像命名空间前缀。

### Portainer

好用的图形化管理界面

```sh
docker pull portainer/portainer
docker run -d -p 9000:9000 \
  --restart=always \
  -v /var/run/docker.sock:/var/run/docker.sock \
  --name prtainer-dev1 \
  portainer/portainer
```

### centos7

```sh
docker pull centos:7
docker run -it centos:7 /bin/bash
```

### gitlab

```sh
# gitlab-ce为稳定版本
docker pull gitlab/gitlab-ce
```

### 使用Docker&nbsp;Registry搭建私有镜像仓库

1、下载镜像registry

```sh
docker pull registry
```

2、运行registry容器

```sh
docker run -itd -v /data/registry:/var/lib/registry -p 5000:5000 --restart=always --name registry registry:latest

# 测试镜像仓库中所有的镜像
curl http://127.0.0.1:5000/v2/_catalog
```

参数说明：

- -itd：在容器中打开一个伪终端进行交互操作，并在后台运行；
- -v：把宿主机的/data/registry目录绑定 到 容器/var/lib/registry目录(这个目录是registry容器中存放镜像文件的目录)，来实现数据的持久化；
- -p：映射端口；访问宿主机的5000端口就访问到registry容器的服务了；
- --restart=always：这是重启的策略，假如这个容器异常退出会自动重启容器；
- --name registry：创建容器命名为registry，你可以随便命名；
registry:latest：这个是刚才pull下来的镜像；

3、为镜像打标签

```sh
docker tag consul:latest 10.30.100.103:5000/consul:v1
```

- consul:lastest 这是源镜像，也是刚才pull下来的镜像文件；
- 10.30.100.103:5000/consul:v1：这是目标镜像，也是registry私有镜像服务器的IP地址和端口；

4、上传到镜像服务器

```sh
docker push 10.30.100.103:5000/consul:v1
```

提示：`Get https://10.30.100.103:5000/v2/: http: server gave HTTP response to HTTPS client`

注意，这是报错了，需要https的方法才能上传，我们可以修改下daemon.json来解决：

```sh
vim /etc/docker/daemon.json
```

```json
{
  "registry-mirrors": ["https://registry.docker-cn.com"],
  "insecure-registries": ["10.30.100.103:5000"]
}
```

添加私有镜像服务器的地址，注意书写格式为json，有严格的书写要求，然后重启docker服务：

```sh
systemctl  restart docker
```

再次上传，没问题。

5、拉取私有镜像

```sh
docker pull 10.30.100.103:5000/consul:v1

# 测试镜像仓库中所有的镜像
curl http://127.0.0.1:5000/v2/_catalog
# 列出consul镜像有哪些tag
curl http://127.0.0.1:5000/v2/consul/tags/list
```

### docker搭建consul集群

1、拉取consul镜像

```sh
docker pull consul
```

2、网络配置（**验证未通过**）

我们准备搭建 3 个 server 节点和 1 个 client 节点，因此我们先需要配置 4 个 docker 容器节点的网络。

因为 docker 默认的 docker0 虚拟网卡是不支持直接设置静态ip的。所以我们先创建一个自己的虚拟网络。

```sh
docker network create --subnet=10.30.100.0/24 staticnet
# 执行完可以通过下面命令查看
docker network
```

>私有网络ip选取小知识：  
>这三个地址段分别位于A、B、C三类地址内：  
>A类地址：10.0.0.0--10.255.255.255  
>B类地址：172.16.0.0--172.31.255.255  
>C类地址：192.168.0.0--192.168.255.255

3、启动 server 节点

我们将要创建的两个 server 节点命名为 s1，s2。

```sh
mkdir -p /opt/config/consul/consul_server_config
```

下面先创建好配置文件，在 /opt/config/consul/consul_server_config 目录添加配置文件 basic_config.json，其中的内容如下：

```sh
vim /opt/config/consul/consul_server_config/basic_config.json
```

```json
{
  "datacenter": "dc1",
  "log_level": "INFO",
  "node_name": "s1", // 指定节点名，同集群内不能重复
  "server": true, // 以server模式运行，不添加默认以client模式运行
  "bootstrap_expect": 2, // 组成集群需要启动的server数量
  "bind_addr": "0.0.0.0",
  "client_addr": "0.0.0.0", // 可以访问的ip
  "ui": true, // 是否启用面板管理
  "ports": {
    "dns": 8600,
    "http": 8500,
    "https": -1,
    "server": 8300,
    "serf_lan": 8301,
    "serf_wan": 8302
  },
  "rejoin_after_leave": true,
  "retry_join": [ // 在意外断开连接后，会不会自动重新加入集群
    "10.30.100.103",
    "10.30.100.104"
  ],
  "retry_interval": "30s",
  "reconnect_timeout": "72h"
}
```

Consul Server是一个有状态的容器，它有两个目录可以挂载本地的目录进去，方便改动配置和数据持久化：

- /consul/config：配置目录，如果agent可以把json配置放这里，会自动加载
- /consul/data：consul数据目录，存放节点、KV、datacenter等数据

为了consul server能稳定提供服务，一般都建议有3-5个consul server组成集群。如果有很多台机器，在启动足够的consul server后，其它主机可以都作为client运行。

启动Consul：

```sh
# --net staticnet选项验证未通过，所以不加
docker run -d \
-p 8500:8500 \
-p 8300-8302:8300-8302 \
-p 8600:8600 \
-v /data/consul_data/data:/consul/data \
-v /data/consul_data/conf:/consul/config \
-v /opt/config/consul/consul_server_config/basic_config.json:/consul/config/basic_config.json \
-h node2 \
--name consul_s2 \
--net staticnet \
--ip 10.30.100.103 \
consul agent \
-server \
-bootstrap-expect=1 \
-node=node2 \
-rejoin \
-client 0.0.0.0 \
-ui \
-data-dir /consul/data \
-config-dir /consul/config
```

使用配置文件的方式暂未成功，使用直接加参数的方式启动集群：

```sh
# 建立数据目录和配置目录
mkdir -p /data/consul_data/data && mkdir -p /data/consul_data/conf

# 试一下这个命令（测试）
docker run -d \
-p 8500:8500 \
-p 8300-8302:8300-8302 \
-p 8600:8600 \
-v /data/consul_data/data:/consul/data \
-v /data/consul_data/conf:/consul/config \
-h node1 \
--name consul  \
--restart=always \
consul agent \
-server \
-bootstrap-expect=1 \
-node=node1 \
-rejoin \
-client 0.0.0.0 \
-ui \
-data-dir /consul/data \
-config-dir /consul/config

# 启动主机1（--net=host先不加入）
docker run -d \
-p 8500:8500 \
-p 8300-8302:8300-8302 \
-p 8600:8600 \
-h node1 \
-v /data/consul_data/data:/consul/data \
-v /data/consul_data/conf:/consul/config \
--net=host \
--restart=always \
--name consul_s1 \
consul agent \
-server \
-rejoin \
-node=node1 \
-bind=10.30.100.104 \
-client 0.0.0.0 \
-ui \
-bootstrap-expect=2 \
-data-dir /consul/data \
-config-dir /consul/config

# 启动主机2
docker run -d \
-p 8500:8500 \
-p 8300-8302:8300-8302 \
-p 8600:8600 \
-h node2 \
-v /data/consul_data/data:/consul/data \
-v /data/consul_data/conf:/consul/config \
--net=host \
--restart=always \
--name consul_s2 \
consul agent \
-server \
-rejoin \
-node=node2 \
-bind=10.30.100.103 \
-client 0.0.0.0 \
-ui \
-bootstrap-expect=2 \
-data-dir /consul/data \
-config-dir /consul/config \
-join 10.30.100.104
```

命令说明：

- --net=host：采用主机网络配置，若采用默认的bridge模式，则会存在容器跨主机间通信失败的问题
- -v /data/consul_data/data:/consul/data：主机的数据目录挂载到容器的/consul/data下，因为该容器默认的数据写入位置即是/consul/data
- -v /data/consul_data/conf:/consul/config：主机的配置目录挂载到容器的/consul/conf下，因为该容器默认的数据写入位置即是/consul/conf
- consul agent -server：consul的server启动模式
- consul agent -bind=10.30.100.103：consul绑定到主机的ip上
- consul agent  -bootstrap-expect=2：server要想启动，需要至少2个server
- consul agent -data-dir /consul/data：consul的数据目录
- consul agent -config-dir /consul/config：consul的配置目录
- consul agent -join 10.30.100.104：对于主机二来说，需要加入到这个集群里

都启动完成后，可以通过如下命令观察consul日志，了解启动情况：

```sh
docker logs 容器id/容器名称
```

查看docker image的构建过程：

```sh
docker history leadgateway --format "table {{.ID}}\t{{.CreatedBy}}" --no-trunc
```

### .NET&nbsp;Core微服务应用部署

查看docker启动命令：

```sh
# 外部
docker inspect
docker inspect container
# 内部
ps -fe
```

网关Dockfile：

```sh
# 拉取 .net core 2.1 镜像
FROM mcr.microsoft.com/dotnet/core/aspnet:2.1-stretch-slim AS base
# 工作目录
WORKDIR /app
# COPY . .
# 开放端口
# EXPOSE 80
# EXPOSE 443
ENTRYPOINT ["dotnet", "LeadChina.Gateway.dll"]
```

```sh
# 进入目录
cd /data/sftp/mysftp/upload/gateway/
# 生成镜像
docker build -t gateway .
# 启动
docker run -d -p 6080:6080 -v /data/sftp/mysftp/upload/gateway/:/app --name gateway gateway
```

认证服务器Dockfile：

```sh
FROM mcr.microsoft.com/dotnet/core/aspnet:2.1-stretch-slim AS base
WORKDIR /app
ENTRYPOINT ["dotnet", "LeadChina.JwtServer.dll"]
```

```sh
# 进入目录
cd /data/sftp/mysftp/upload/JwtServer/
# 生成镜像
docker build -t jwtserver .
# 启动
docker run -d -p 6181:6181 -v /data/sftp/mysftp/upload/JwtServer/:/app --name jwtserver jwtserver
```

**前端web的Dockerfile：**

```sh
# 拉取nginx镜像
FROM nginx:alpine
WORKDIR /app
# 从客户机复制到容器中
COPY nginx.conf /etc/nginx/nginx.conf
```

```sh
# 进入目录
cd /data/sftp/mysftp/upload/pmweb/
# 生成镜像
docker build -t pmweb .
# 启动
docker run -d -p 6100:6100 -v /data/sftp/mysftp/upload/pmweb/:/app --name pmweb pmweb
```

**系统设置微服务应用Dockfile：**

```sh
FROM mcr.microsoft.com/dotnet/core/aspnet:2.1-stretch-slim AS base
WORKDIR /app
#COPY . .
#EXPOSE 6082
ENTRYPOINT ["dotnet", "LeadChina.PM.SysSetting.API.dll"]
```

```sh
# 进入目录
cd /data/sftp/mysftp/upload/setting/SysSetting/
# 生成镜像
docker build -t pmsetting .
# 启动
docker run -d -p 6082:6082 -v /data/sftp/mysftp/upload/setting/SysSetting/:/app --name pmsetting pmsetting
```

**基础微服务应用Dockfile：**

```sh
FROM mcr.microsoft.com/dotnet/core/aspnet:2.1-stretch-slim AS base
WORKDIR /app
ENTRYPOINT ["dotnet", "LeadChina.Base.API.dll"]
```

```sh
# 进入目录
cd /data/sftp/mysftp/upload/base
# 生成镜像
docker build -t basic .
# 启动
docker run -d -p 6190:6190 -v /data/sftp/mysftp/upload/base/:/app --name basic basic
```

**项目微服务应用Dockfile：**

```sh
FROM mcr.microsoft.com/dotnet/core/aspnet:2.1-stretch-slim AS base
WORKDIR /app
ENTRYPOINT ["dotnet", "LeadChina.PM.Project.API.dll"]
```

```sh
# 进入目录
cd /data/sftp/mysftp/upload/project
# 生成镜像
docker build -t project .
# 启动
docker run -d -p 6083:6083 -v /data/sftp/mysftp/upload/project/:/app --name project project
```

**任务微服务应用Dockfile：**

```sh
FROM mcr.microsoft.com/dotnet/core/aspnet:2.1-stretch-slim AS base
WORKDIR /app
ENTRYPOINT ["dotnet", "LeadChina.PM.Task.API.dll"]
```

```sh
# 进入目录
cd /data/sftp/mysftp/upload/task
# 生成镜像
docker build -t task .
# 启动
docker run -d -p 6084:6084 -v /data/sftp/mysftp/upload/task/:/app --name task task
```

**消息微服务应用Dockfile：**

```sh
FROM mcr.microsoft.com/dotnet/core/aspnet:2.1-stretch-slim AS base
WORKDIR /app
ENTRYPOINT ["dotnet", "LeadChina.PM.Message.API.dll"]
```

```sh
# 进入目录
cd /data/sftp/mysftp/upload/message
# 生成镜像
docker build -t message .
# 启动
docker run -d -p 6085:6085 -v /data/sftp/mysftp/upload/message/:/app --name message message
```

**文档微服务应用Dockfile：**

```sh
FROM mcr.microsoft.com/dotnet/core/aspnet:2.1-stretch-slim AS base
WORKDIR /app
ENTRYPOINT ["dotnet", "LeadChina.PM.Document.API.dll"]
```

```sh
# 进入目录
cd /data/sftp/mysftp/upload/document
# 生成镜像
docker build -t document .
# 启动
docker run -d -p 6086:6086 -v /data/sftp/mysftp/upload/document/:/app --name document document
```

### 可视化工具Grafana

下载地址：[https://grafana.com/grafana/download?platform=windows](https://grafana.com/grafana/download?platform=windows)

1、把下载的.zip文件解压到您的想运行Grafana的任何地方，然后进入conf目录复制一份sample.ini并重命名为custom.ini。以后所有的配置应该编辑custom.ini，永远不要去修改defaults.ini。

### 基于Docker安装RabbitMQ

```sh
# 查找RabbitMQ镜像
docker search rabbitmq
# 拉取RabbitMQ镜像
docker pull rabbitmq #（镜像未配有控制台）
docker pull rabbitmq:management #（镜像配有控制台）
```

>注意：rabbitmq是官方镜像，该镜像不带控制台。如果要安装带控制台的镜像，需要在拉取镜像时附带tag标签，例如：management。tag标签可以通过[https://hub.docker.com/_/rabbitmq?tab=tags](https://hub.docker.com/_/rabbitmq?tab=tags)来查询。

```sh
# 安装并运行容器
docker run --name rabbitmq -d -p 15672:15672 -p 5672:5672 rabbitmq:management
# 停止容器
docker stop rabbitmq
# 启动容器
docker start rabbitmq
# 重启
docker restart rabbitmq
# 查看进程信息
docker restart rabbitmq
```

启动容器后，可以浏览器中访问[http://localhost:15672](http://localhost:15672)来查看控制台信息。RabbitMQ默认的用户名：guest，密码：guest

## 问题

### 1. iptables: No chain/target/match by that name

```sh
systemctl restart docker
```

### 2. Job for docker.service failed

解决：执行 `vim /etc/sysconfig/selinux`，把 selinux 属性值改为disabled。然后重启系统，docker就可以启动
