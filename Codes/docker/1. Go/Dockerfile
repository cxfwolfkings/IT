# This is a Dockerfile
# Author:Colin
# 第一行必须指定基础镜像
FROM golang
# 维护者信息 MAINTAINER (deprecated)
LABEL maintainer="chenxiao8516@163.com"

WORKDIR /go/src/app
COPY . .

RUN go get -d -v ./...
RUN go install -v ./...

CMD ["app"]