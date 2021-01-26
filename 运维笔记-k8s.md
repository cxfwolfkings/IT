# Kubenetes

1. 理论
2. 实战
   - [安装](#安装)
     - [Minikube快速搭建K8S单节点环境](#Minikube快速搭建K8S单节点环境)
3. 总结



## 理论

Kubernetes 单词起源于希腊语，是 **舵手** 或者 **领航员** 的意思，是 **管理者** 和 **控制论** 的根源。K8s是把用8代替8个字符 ubernete 而成的缩写。

**Docker Swarm 和 k8s的前世今生**

可以很明确的说：先有的k8s，后有的docker swarm。

1. 容器编排工具Kubernetes诞生，并迅速得到Google和RedHat的支持。2014年7月，Docker收购Orchard Labs，由此Docker公司开始涉足容器编排领域，Orchard Labs这家2013年由两位牛逼的年轻人创建的公司，有一个当时非常著名的容器编排工具fig，而这个fig就是docker-compose的前身。Docker Compose虽然能编排多容器的APP，但是却不能实现在多个机器上进行容器的创建和管理。所以此时Docker公司和Kubernetes并未开始正面竞争和冲突。

2. 10月17日，Docker公司在其丹麦哥本哈根举行的 DockerCon大会上宣布，将扩大其Docker平台并拥抱支持Kubernetes。显然，在容器编排领域的战火已然分出结果，尘埃落定，Kubernetes得到了包括Google、Huawei、Microsoft、IBM、AWS、Rancher、Redhat、CoreOS等容器玩家的一致认可。

3. Docker容器不关心用户使用哪种编排框架，它的工作是让用户轻松地选择最喜欢的编排框架，无论Kubernetes、Mesos、Docker Swarm还是其他。这个选择在价值上无关紧要，真正的价值在于平台，那才是钱。因此，将Kubernetes与Docker容器进行比较是没有意义的，Docker的真正的竞争对手是VMWare、CloudFoundry等平台。

  另外，k8s的热度远高于Docker Swarm

**回顾下docker Swarm**

docker Swarm分为Manager节点和Worker节点，Manager具备管理功能，维持这个cls的状态，提供对外的接口，可以通过manager部署我们的application，部署service，部署stack。

k8s相比docker Swarm来说Manage等于master，worker等于node节点

![x](./Resources/k8s01.png)

**1、k8s的master节点**

master节点主要是k8s的一个大脑，k8s集群的管理节点，负责管理集群，提供集群的资源数据访问入口。拥有Etcd存储服务（可选），运行Api Server进程，Controller Manager服务进程及Scheduler服务进程，关联工作节点Node。Kubernetes API server提供HTTP Rest接口的关键服务进程，是Kubernetes里所有资源的增、删、改、查等操作的唯一入口。也是集群控制的入口进程；Kubernetes Controller Manager是Kubernetes所有资源对象的自动化控制中心；Kubernetes Schedule是负责资源调度（Pod调度）的进程

![x](./Resources/k8s02.png)

**2、k8s的node节点**

Node是Kubernetes集群架构中运行Pod的服务节点（亦叫agent或minion）。Node是Kubernetes集群操作的单元，用来承载被分配Pod的运行，是Pod运行的宿主机。关联Master管理节点，拥有名称和IP、系统资源信息。运行docker eninge服务，守护进程kunelet及负载均衡器kube-proxy。

每个Node节点都运行着以下一组关键进程

- kubelet：负责对Pod对于的容器的创建、启停等任务
- kube-proxy：实现Kubernetes Service的通信与负载均衡机制的重要组件
- Docker Engine(Docker)：Docker引擎，负责本机容器的创建和管理工作

Node节点可以在运行期间动态增加到Kubernetes集群中，默认情况下，kubelet会向master注册自己，这也是Kubernetes推荐的Node管理方式，kubelet进程会定时向Master汇报自身情报，如操作系统、Docker版本、CPU和内存，以及有哪些Pod在运行等等，这样Master可以获知每个Node节点的资源使用情况，并实现高效均衡的资源调度策略。

![x](./Resources/k8s03.png)

**3、全局**

![x](./Resources/k8s04.png)



## 实战



1. 安装部署
2. [安装问题](#安装问题)

- [Kubernetes](https://kubernetes.io/) 是一款开源产品，提供各种功能，从群集基础结构和容器计划到安排功能均涵盖在内。它能实现跨主机群集自动部署、缩放以及执行各种应用程序容器操作。
- Kubernetes 提供以容器为中心的基础结构，将应用程序容器分组为逻辑单元，以便管理和发现。
- Kubernetes 在 Linux 中的运用已发展成熟，但在 Windows 中相对较弱。

### 安装部署

```sh
#docker
curl -o /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo

curl -o /etc/yum.repos.d/docker-ce.repo  https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

yum clean all
yum makecache
yum install docker-ce -y

mkdir -pv /etc/docker/
# tee /etc/docker/daemon.json <<-'EOF'
# {
#   #阿里镜像加速
#   "registry-mirrors": [*****************],
#   #设定使用的driver ，节点要一致
#   "exec-opts": ["native.cgroupdriver=systemd"],
#   "log-driver": "json-file",
#   "log-opts": {
#     "max-size": "100m"
#   },
#   "storage-driver": "overlay2",
#   "storage-opts": [
#     "overlay2.override_kernel_check=true"
#   ]
# }
# EOF
tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://6o1rxqal.mirror.aliyuncs.com"]
}
EOF

# 重启docker服务
systemctl restart docker && echo "restart"
# 开机自动启动
systemctl enable docker  && echo "enable"

#k8s
cat <<EOF > /etc/yum.repos.d/kubernetes.repo
[kubernetes]
name=Kubernetes
baseurl=http://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64
enabled=1
gpgcheck=0
repo_gpgcheck=0
EOF

yum clean all
yum makecache && echo "yum makecache ok"

# 此时最新版1.17.2
yum install kubelet kubeadm kubectl -y

systemctl enable kubelet && echo "enable kubelet"

echo "1" >/proc/sys/net/bridge/bridge-nf-call-iptables
echo "1" >/proc/sys/net/bridge/bridge-nf-call-ip6tables
swapoff -a && sysctl -w vm.swappiness=0
sed -ri '/^[^#]*swap/s@^@#@' /etc/fstab  

# master首先下载使用的镜像
docker pull registry.cn-hangzhou.aliyuncs.com/google_containers/kube-apiserver:v1.17.2
docker pull registry.cn-hangzhou.aliyuncs.com/google_containers/kube-controller-manager:v1.17.2
docker pull registry.cn-hangzhou.aliyuncs.com/google_containers/kube-scheduler:v1.17.2
docker pull registry.cn-hangzhou.aliyuncs.com/google_containers/kube-proxy:v1.17.2
docker pull registry.cn-hangzhou.aliyuncs.com/google_containers/pause:3.1
docker pull registry.cn-hangzhou.aliyuncs.com/google_containers/etcd:3.4.3-0
docker pull registry.cn-hangzhou.aliyuncs.com/google_containers/coredns:1.6.5
# 打标签
docker tag registry.cn-hangzhou.aliyuncs.com/google_containers/kube-apiserver:v1.17.2 k8s.gcr.io/kube-apiserver:v1.17.2
docker tag registry.cn-hangzhou.aliyuncs.com/google_containers/kube-controller-manager:v1.17.2 k8s.gcr.io/kube-controller-manager:v1.17.2
docker tag registry.cn-hangzhou.aliyuncs.com/google_containers/kube-scheduler:v1.17.2 k8s.gcr.io/kube-scheduler:v1.17.2
docker tag registry.cn-hangzhou.aliyuncs.com/google_containers/kube-proxy:v1.17.2 k8s.gcr.io/kube-proxy:v1.17.2
docker tag registry.cn-hangzhou.aliyuncs.com/google_containers/pause:3.1 k8s.gcr.io/pause:3.1
docker tag registry.cn-hangzhou.aliyuncs.com/google_containers/etcd:3.4.3-0 k8s.gcr.io/etcd:3.4.3-0
docker tag registry.cn-hangzhou.aliyuncs.com/google_containers/coredns:1.6.5 k8s.gcr.io/coredns:1.6.5
# 删除原来的镜像
docker rmi registry.cn-hangzhou.aliyuncs.com/google_containers/kube-apiserver:v1.17.2
docker rmi registry.cn-hangzhou.aliyuncs.com/google_containers/kube-controller-manager:v1.17.2
docker rmi registry.cn-hangzhou.aliyuncs.com/google_containers/kube-scheduler:v1.17.2
docker rmi registry.cn-hangzhou.aliyuncs.com/google_containers/kube-proxy:v1.17.2
docker rmi registry.cn-hangzhou.aliyuncs.com/google_containers/pause:3.1
docker rmi registry.cn-hangzhou.aliyuncs.com/google_containers/etcd:3.4.3-0
docker rmi registry.cn-hangzhou.aliyuncs.com/google_containers/coredns:1.6.5

# node下载使用的镜像
docker pull registry.cn-hangzhou.aliyuncs.com/google_containers/kube-proxy:v1.17.2
docker pull registry.cn-hangzhou.aliyuncs.com/google_containers/pause:3.1
docker pull registry.cn-hangzhou.aliyuncs.com/google_containers/coredns:1.6.5
# 注意，这个下载的特别特别慢，建议先下载一个，其他的复制过去效率更高 save 和 load
docker pull quay.io/coreos/flannel:v0.11.0-amd64
# 修改镜像tag
docker tag registry.cn-hangzhou.aliyuncs.com/google_containers/kube-proxy:v1.17.2 k8s.gcr.io/kube-proxy:v1.17.2
docker tag registry.cn-hangzhou.aliyuncs.com/google_containers/pause:3.1 k8s.gcr.io/pause:3.1
docker tag registry.cn-hangzhou.aliyuncs.com/google_containers/coredns:1.6.5 k8s.gcr.io/coredns:1.6.5
# 删除原来的镜像
docker rmi registry.cn-hangzhou.aliyuncs.com/google_containers/kube-proxy:v1.17.2
docker rmi registry.cn-hangzhou.aliyuncs.com/google_containers/pause:3.1
docker rmi registry.cn-hangzhou.aliyuncs.com/google_containers/coredns:1.6.5

# master初始化
# kubeadm初始化会先检查使用的版本，默认为初始化最新版
# 部署k8s集群的时候如果下载和部署的不是同一版本，在初始化没问题，但是node节点会有问题，不如在下载时使用要部署的版本
kubeadm init --kubernetes-version=v1.17.2 --ignore-preflight-errors=Swap --pod-network-cidr=10.244.0.0/16 --apiserver-advertise-address=192.168.101.100

# 输出提示：
-----------------------------------------------------------------------------------------
Your Kubernetes control-plane has initialized successfully!

To start using your cluster, you need to run the following as a regular user:

  mkdir -p $HOME/.kube
  sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
  sudo chown $(id -u):$(id -g) $HOME/.kube/config

You should now deploy a pod network to the cluster.
Run "kubectl apply -f [podnetwork].yaml" with one of the options listed at:
  https://kubernetes.io/docs/concepts/cluster-administration/addons/

Then you can join any number of worker nodes by running the following on each as root:

kubeadm join 192.168.101.100:6443 --token scutif.nr9tilzk0oyfu8hv \
    --discovery-token-ca-cert-hash sha256:ff9001b677576a4fd14b3b13b3338479224ae5765769c6a62941505cc10d7ec1
-----------------------------------------------------------------------------------------

#curl -LO https://storage.googleapis.com/kubernetes-release/release/v1.17.1/bin/linux/amd64/kubectl
# 赋予执行权限
#chmod +x ./kubectl
# 将其移动到bin目录下
#sudo mv ./kubectl /usr/local/bin/kubectl

# 根据初始化后的提示，进行下面的操作
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
#kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml
# 为了方便添加提示
echo "source <(kubectl completion bash)" >> ~/.bashrc

# node节点加入master节点
kubeadm join 192.168.101.100:6443 --token scutif.nr9tilzk0oyfu8hv \
    --discovery-token-ca-cert-hash sha256:ff9001b677576a4fd14b3b13b3338479224ae5765769c6a62941505cc10d7ec1 --ignore-preflight-errors=Swap

# 等待一会，在maste节点查看成功
kubectl get nodes

# 查看日志
journalctl -f -u kubelet.service
```

**卸载清理K8S：**

```sh
kubeadm reset -f
modprobe -r ipip
lsmod
rm -rf ~/.kube/
rm -rf /etc/kubernetes/
rm -rf /etc/systemd/system/kubelet.service.d
rm -rf /etc/systemd/system/kubelet.service
rm -rf /usr/bin/kube*
rm -rf /etc/cni
rm -rf /opt/cni
rm -rf /var/lib/etcd
rm -rf /var/etcd
```

**安装问题**

**1、kubectl: command not found**

错误原因：`kubectl`没有添加到系统的环境变量中。

解决方法：

1. 用命令 `find / -name kubectl` 查找 `kubectl` 所在的位置
2. 将这个路径添加到系统的path，编辑 `vim /etc/profile`

   ```sh
   # 假如 kubectl 所在的位置：/root/ubuntu/binaries/kubectl
   export PATH="/root/ubuntu/binaries/:$PATH"
   ```

**2、Node节点NotReady："No networks found in /etc/cni/net.d"**

```sh
sysctl net.bridge.bridge-nf-call-iptables=1
wget https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml
# 修改docker镜像地址
# sed 's/quay.io\/coreos/registry.cn-beijing.aliyuncs.com\/imcto/g'
# 安装flannel
sudo kubectl apply -f kube-flannel.yml
```

**3、Master节点NotReady："docker: network plugin is not ready: cni config uninitialized"**

错误原因：没有下载flannel镜像

解决方法：

```sh
# 保存镜像
docker save -o flannel.tar quay.io/coreos/flannel:v0.11.0-amd64
# 复制到远程主机目录下
scp -r /root/flannel.tar 192.168.101.100:/root/flannel.tar
# 载入镜像
docker load --input flannel.tar
```



#### Minikube快速搭建K8S单节点环境

**k8s集群的搭建**

k8s的著名人物https://github.com/kelseyhightower，在youtube上可以通过搜索他的名字观看他的视频讲解。

最困难的搭建k8s的方式：https://github.com/kelseyhightower/kubernetes-the-hard-way

最简单的搭建k8s的方式：

1. https://github.com/kubernetes/minikube，不过是单节点的，这个节点有点类似vagrant，也是创建一个虚拟机，依赖外部的vritualbox的方式，在讲解vagrant的时候讲过vritualbox，翻看以往的课程吧！
2. https://github.com/kubernetes/kubeadm，可以多节点的
3. https://github.com/kubernetes/kops
4. 企业的k8s：https://coreos.com/tectonic/，小于10个节点是免费的，大于10个节点是收费的。
5. 在线学习k8s：https://labs.play-with-k8s.com/。这个有点像https://labs.play-with-docker.com/，都是在线学习的，注册个账号。可以玩就2个节点的集群，但是这个集群有时间限制的，4个小时。

我本地的安装方式：

```sh
wget http://www.rpmfind.net/linux/centos/7.6.1810/extras/x86_64/Packages/kubernetes-1.5.2-0.7.git269f928.el7.x86_64.rpm
# 注意：如果wget命令未安装，执行命令：# yum install wget
yum install kubernetes-1.5.2-0.7.git269f928.el7.x86_64.rpm
# 安装完成（Docker会依赖安装）。
```

**通过Minikube安装k8s**

开始之前，必须在计算机的BIOS中启用VT-x或AMD-v虚拟化。要在Linux上检查这一点，请运行以下命令并验证输出是否为空：

```sh
egrep --color 'vmx|svm' /proc/cpuinfo
```

需要先安装kubectl 和 minikube

kubectl地址：https://kubernetes.io/docs/tasks/tools/install-kubectl/

