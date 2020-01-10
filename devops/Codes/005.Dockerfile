# This is a Dockerfile
# Author:Colin
# 第一行必须指定基础镜像
FROM ubuntu
# 维护者信息 MAINTAINER (deprecated)
LABEL maintainer="399596326@qq.com"
# 镜像的操作指令
RUN apt-get update
RUN apt-get install -y nginx
RUN echo "\ndaemon off:" >> /etc/nginx/nginx.conf
# 容器启动时的指令
CMD /usr/sbin/nginx
