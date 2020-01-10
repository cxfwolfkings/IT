# 创建数据卷容器db1
docker run -d –name db1 -v /dbdata -ti ubuntu bash
# 创建容器db2与db1共享dbdata的数据
docker run -d –name db2 –volumes-from db1 -ti ubuntu bash
# 在容器db1和容器db2任意一个容器修改dbdata的内容，在两个容器内均生效

# 数据卷容器的删除：
# 如果删除了挂载的容器，数据卷并不会被自动删除。
# 如果要删除一个数据卷，必须在删除最后一个还挂载它的容器时显式使用 docker rm -v 命令指定同时删除关联的数据卷。

# 可以利用数据卷容器对其中的数据卷进行备份、恢复，以实现数据的迁移。
# 备份：
# 使用下面的命令来备份dbdata数据卷容器内的数据卷：
docker run –volumes-from dbdata -v ${PWD}:/backup –name worker ubuntu \
tar cvf /backup/backup.tar /dbdata
# 说明：
# 利用ubuntu镜像创建一个容器worker。使用 –volumes-from dbdata 参数来让worker容器挂载dbdata的数据卷；使用 ${pwd}:/backup 参数来挂载本地目录到worker容器的/backup目录。
# worker启动后，使用tar命令将/dbdata下的内容备份为容器内的/backup/backup.tar。

# 恢复：
# 如果恢复数据到一个容器，可以参照下面的操作。首先创建一个带有数据卷的容器dbdata2:
docker run -d -v /dbdata –name dbdata2 ubuntu /bin/bash
# 然后创建另一个新的容器，挂载dbdata2的容器，并使用tar命令解压备份文件到挂载的容器卷中即可：
docker run –volumes-from dbdata2 -v ${pwd}:/backup ubuntu tar xvf /backup/backup.tar
