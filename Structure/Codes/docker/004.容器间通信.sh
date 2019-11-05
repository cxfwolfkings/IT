# 使用 –link 参数可以让容器之间安全的进行交互。
# 创建一个数据库容器：
docker run -d -e MYSQL_ROOT_PASSWORD=1234 –name mysqldb mysql:5.6
# 创建一个web容器并和数据库容器建立连接：
docker run -d –name Webapp –p 8000:8080 –link mysqldb:MySQL tomcat:6.0
# 上边的MySQL别名就类似dns解析的方式，我给这个容器起了个别名叫MySQL，通过这个别名就可以找到对应的mysqldb容器，mysqldb容器和web容器建立了互联关系。
# –link参数的格式为–link name:alias，其中name是要连接的容器名称，alias是这个连接的别名。
# 可以使用docker ps（PORT字段）来查看容器的连接。
# Docker在两个容器之间创建了安全隧道，而且不用映射它们的端口到宿主机上。在启动mysqldb的时候并没有使用-p和-P标记，从而避免的了暴露数据库的端口到外部的网络上。
# link就是容器直接互相通信的
# 进入web容器
docker exec -ti webapp bash

# 在web容器中，测试MySQL连接
ping MySQL
