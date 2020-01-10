# 准备工作：创建一个目录，并在目录里面创建文件，文件内写入内容，查看文件内容。
mkdir webapp
cd webapp
touch hellofile
echo 'Hello Docker' > hellofile
cat hellofile
# 在使用docker run的命令时，使用 -v 标记可以在容器内创建一个数据卷，并且可以指定挂在一个本地已有的目录到容器中作为数据卷：
docker run -d –name app1 -it -v ${PWD}/webapp:/root/webapp ubuntu bash
# echo ${PWD} 命令标识当前目录
# 通过目录跟容器内建立了一层关系，数据卷发生变化后，容器内和容器外都会随之发生改变。例如容器挂载一个文件，当容器挂了后，文件不会丢失。
# 注意：默认挂载的数据卷的权限是rw（可读写），如果要求ro（只读），则需要加上对应的ro参数，命令可改为：
#docker run -d –name app1 -it -v ${PWD}/webapp:/root/webapp:ro ubuntu bash
# 进入docker容器
docker exec -ti app1 bash

# 下面是容器内执行的命令

# 进入/root/webapp目录
cd /root/webapp
# 查看文件
cat hellofile
