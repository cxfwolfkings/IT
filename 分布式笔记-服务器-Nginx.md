# Nginx

简介：

- Nginx("engine x") 是一个高性能的HTTP和反向代理服务器，也是一个IMAP/POP3/SMTP代理服务器。

- 第一个公开版本0.1.0发布于2004年10月4日。

- 其将源代码以类BSD许可证的形式发布，因它的稳定性、丰富的功能集、示例配置文件和低系统资源的消耗而闻名

- 官方测试nginx能够支撑5万并发链接，并且cpu、内存等资源消耗却非常低，运行非常稳定
- 2011年6月1日，nginx1.0.4发布。

- 俄罗斯程序设计师Igor Sysoev开发，特点：占有内存少，并发能力强。

  > 事实上nginx的并发能力确实在同类型的网页服务器中表现较好，中国大陆使用 nginx 网站用户有：新浪、网易、腾讯等。

功能：

- web服务器
- web reverse proxy
- smtp proxy

Nginx 和 apache 的优缺点：

1. nginx相对于apache的优点：轻量级，同样起web服务，比apache占用更少的内存及资源，抗并发，nginx处理请求是异步非阻塞的，而apache则是阻塞型的，在高并发下nginx能保持低资源低消耗高性能高度模块化的设计，编写模块相对简单，社区活跃，各种高性能模块出品迅速
2. apache相对于nginx的优点：rewrite，比nginx的rewrite模块强大超多，基本想到的都可以找到，少bug，nginx的bug相对较多
3. Nginx配置简洁，Apache复杂
4. 最核心的区别在于apache是同步多进程模型，一个连接对应一个进程；nginx是异步的，多个连接（万级别）可以对应一个进程

Tengine是nginx的加强、封装版，淘宝开源

- 官网 http://tengine.taobao.org/
- [动态模块加载（DSO）](http://tengine.taobao.org/document_cn/dso_cn.html)支持。加入一个模块不再需要重新编译整个Tengine；
- [支持 SO_REUSEPORT 选项](http://tengine.taobao.org/document_cn/core_cn.html)，建连性能提升为[官方 nginx 的三倍](http://tengine.taobao.org/document_cn/benchmark_cn.html)；
- 支持 [SPDY v3 协议](http://tengine.taobao.org/document_cn/ngx_http_spdy_module_cn.html)，自动检测同一端口的 SPDY 请求和 HTTP 请求；
- 流式上传到 HTTP 后端服务器或 FastCGI 服务器，大量减少机器的 I/O 压力；
- 更加强大的负载均衡能力，包括[一致性 hash 模块](http://tengine.taobao.org/document_cn/http_upstream_check_cn.html)、[会话保持模块](http://tengine.taobao.org/document_cn/http_upstream_check_cn.html)，还可以对后端的服务器进行[主动健康检查](http://tengine.taobao.org/document_cn/http_upstream_check_cn.html)，根据服务器状态自动上线下线，以及[动态解析 upstream 中出现的域名](http://tengine.taobao.org/document_cn/http_upstream_dynamic_cn.html)；
- [输入过滤器机制](http://blog.zhuzhaoyuan.com/2012/01/a-mechanism-to-help-write-web-application-firewalls-for-nginx/)支持。通过使用这种机制 Web 应用防火墙的编写更为方便；
- 支持设置 proxy、memcached、fastcgi、scgi、uwsgi 在[后端失败时的重试次数](http://tengine.taobao.org/document_cn/ngx_limit_upstream_tries_cn.html)
- [动态脚本语言 Lua](http://wiki.nginx.org/HttpLuaModule) 支持。扩展功能非常高效简单；
- [支持管道（pipe）和syslog（本地和远端）形式的日志以及日志抽样](http://tengine.taobao.org/document_cn/http_log_cn.html)；
- 支持按指定关键字（域名，url等）[收集Tengine运行状态](http://tengine.taobao.org/document_cn/http_reqstat_cn.html)；
- [组合多个CSS、JavaScript文件的访问请求变成一个请求](http://tengine.taobao.org/document_cn/http_concat_cn.html)；
- [自动去除空白字符和注释](http://tengine.taobao.org/document_cn/http_trim_filter_cn.html)从而减小页面的体积
- …….

**什么是高并发和负载均衡？**

单个 tomcat 支持最高并发

![x](http://121.196.182.26:6100/public/images/nginx01.jpg)

**如何解决高并发和负载均衡？**

解决单个服务器过载问题

前端和后端架构：

Tomcat，一个 Servlet 和 JSP 容器；前端服务器处理静态页面

什么是高可用？

如何解决高可用问题？

负载均衡的session一致性问题

**安装之前准备**

1、依赖 `gcc openssl-devel pcre-devel zlib-devel`
      安装：`yum install gcc openssl-devel pcre-devel zlib-devel`
2、创建用户和用户组。为了方便 nginx 运行而不影响 linux 安全
      创建组：`groupadd -r nginx`
      创建用户：`useradd -r -g nginx -M nginx`
                         -M 表示不创建用户的 Home 目录。
简洁方式：

```sh
./configure \
--prefix=/usr/tengine
make && make install
```

普通方式：

```sh
./configure \
--prefix=/usr\
--sbin-path=/usr/sbin/nginx\
--conf-path=/etc/nginx/nginx.conf\
--error-log-path=/var/log/nginx/error.log \
--http-log-path=/var/log/nginx/access.log \
--pid-path=/var/run/nginx/nginx.pid\
--lock-path=/var/lock/nginx.lock\
--user=nginx\
--group=nginx\
--with-http_ssl_module\
--with-http_flv_module\
--with-http_stub_status_module\
--with-http_gzip_static_module\
--http-client-body-temp-path=/var/tmp/nginx/client/ \
--http-proxy-temp-path=/var/tmp/nginx/proxy/ \
--http-fastcgi-temp-path=/var/tmp/nginx/fcgi/ \
--http-uwsgi-temp-path=/var/tmp/nginx/uwsgi\
--http-scgi-temp-path=/var/tmp/nginx/scgi\
--with-pcre
make && make install
```

启动和配置路径用默认的，用户和用户组限制，都去掉。其中 /var/tmp/nginx/client/ 目录需要手动创建

```sh
./configure \
--prefix=/opt/sxt/soft/tengine-2.1.0/ \
--error-log-path=/var/log/nginx/error.log \
--http-log-path=/var/log/nginx/access.log \
--pid-path=/var/run/nginx/nginx.pid\
--lock-path=/var/lock/nginx.lock\
--with-http_ssl_module\
--with-http_flv_module\
--with-http_stub_status_module\
--with-http_gzip_static_module\
--http-client-body-temp-path=/var/tmp/nginx/client/ \
--http-proxy-temp-path=/var/tmp/nginx/proxy/ \
--http-fastcgi-temp-path=/var/tmp/nginx/fcgi/ \
--http-uwsgi-temp-path=/var/tmp/nginx/uwsgi\
--http-scgi-temp-path=/var/tmp/nginx/scgi\
--with-pcre
make && make install
```

nginx文件（不能用xftp传进去，否则文件不被识别）

```ini
#!/bin/bash
#
# chkconfig: - 85 15
# description: nginx is a World Wide Web server. It is used to serve
# Source function library.
. /etc/rc.d/init.d/functions
 
# Source networking configuration.
. /etc/sysconfig/network
 
# Check that networking is up.
[ "$NETWORKING" = "no" ] && exit 0
 
# 注意修改路径，而且必须是在/etc/init.d
nginx="/usr/tengine-2.1/sbin/nginx"
prog=$(basename $nginx)
 
NGINX_CONF_FILE="/usr/tengine-2.1/conf/nginx.conf"
 
#[ -f /etc/sysconfig/nginx ] && . /etc/sysconfig/nginx
 
lockfile=/var/lock/subsys/nginx
 
#make_dirs() {
#   # make required directories
#   user=`nginx -V 2>&1 | grep "configure arguments:" | sed 's/[^*]*--user=\([^ ]*\).*/\1/g' -`
#   options=`$nginx -V 2>&1 | grep 'configure arguments:'`
#   for opt in $options; do
#       if [ `echo $opt | grep '.*-temp-path'` ]; then
#           value=`echo $opt | cut -d "=" -f 2`
#           if [ ! -d "$value" ]; then
#               # echo "creating" $value
#               mkdir -p $value && chown -R $user $value
#           fi
#       fi
#   done
#}

# 添加安装的tengine到注册表
start() {
    [ -x $nginx ] || exit 5
    [ -f $NGINX_CONF_FILE ] || exit 6
#    make_dirs
    echo -n $"Starting $prog: "
    daemon $nginx -c $NGINX_CONF_FILE
    retval=$?
    echo
    [ $retval -eq 0 ] && touch $lockfile
    return $retval
}
 
stop() {
    echo -n $"Stopping $prog: "
    killproc $prog -QUIT
    retval=$?
    echo
    [ $retval -eq 0 ] && rm -f $lockfile
    return $retval
}
 
restart() {
    configtest || return $?
    stop
    sleep 1
    start
}
 
reload() {
    configtest || return $?
    echo -n $"Reloading $prog: "
#  -HUP是nginx平滑重启参数  
    killproc $nginx -HUP
    RETVAL=$?
    echo
}
 
force_reload() {
    restart
}
 
configtest() {
  $nginx -t -c $NGINX_CONF_FILE
}
 
rh_status() {
    status $prog
}
 
rh_status_q() {
    rh_status >/dev/null 2>&1
}
 
case "$1" in
    start)
        rh_status_q && exit 0
        $1
        ;;
    stop)
        rh_status_q || exit 0
        $1
        ;;
    restart|configtest)
        $1
        ;;
    reload)
        rh_status_q || exit 7
        $1
        ;;
    force-reload)
        force_reload
        ;;
    status)
        rh_status
        ;;
    condrestart|try-restart)
        rh_status_q || exit 0
            ;;
    *)
        echo $"Usage: $0 {start|stop|status|restart|condrestart|try-restart|reload|force-reload|configtest}"
        exit 2
esac
```

1、修改nginx文件的执行权限 `chmod+x nginx`
2、添加该文件到系统服务中去 `chkconfig--add nginx`
      查看是否添加成功 `chkconfig--list nginx`
3、启动，停止，重新装载 `service nginxstart|stop|reload`

