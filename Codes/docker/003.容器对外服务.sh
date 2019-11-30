# 使用 -P 映射时，Docker会随机映射一个49000 ~ 49900 的端口至容器内部开放的端口：
docker run -d -P –name mysql mysql:5.6 #5.6是tag，mysql的版本号
# 通过docker ps可以看到端口映射关系。可以通过映射在宿主机的端口来访问对应容器内的服务。
# 进入docker的官网下载mysql镜像，映射到指定宿主机的端口：
docker run –name some-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:tag
# -e 是环境变量的意思，设置运行容器内的环境变量。这里设置了mysql数据库root账户的密码
# 容器里面的mysql已经启动了，现在咱们为了映射端口的话删除这个mysql容器
docker rm -f some-mysql
# 映射到指定地址的指定端口，为例：
docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=1234 –name mysql mysql:5.6
# 外部访问虚拟机的3306直接映射到容器的3306连接到数据库
# 映射到指定地址的指定端口，以127.0.0.1为例：
docker run -d -p 127.0.0.1:3306:3306 –name mysql mysql:5.6
# 查看映射端口配置：
docker port mysql 3306
