# Linux实战

## 目录

1. 安装
   - [宝塔Linux面板](#宝塔Linux面板)
   - [CentOS7安装SFTP](#CentOS7安装SFTP)

## 宝塔Linux面板

官网：[https://www.bt.cn/download/linux.html](https://www.bt.cn/download/linux.html)

安装方法：

- Centos安装脚本：
  
  ```sh
  yum install -y wget && wget -O install.sh http://download.bt.cn/install/install_6.0.sh && sh install.sh
  ```

- Ubuntu/Deepin安装脚本：
  
  ```sh
  wget -O install.sh http://download.bt.cn/install/install-ubuntu_6.0.sh && sudo bash install.sh
  ```

- Debian安装脚本：
  
  ```sh
  wget -O install.sh http://download.bt.cn/install/install-ubuntu_6.0.sh && bash install.sh
  ```

- Fedora安装脚本：
  
  ```sh
  wget -O install.sh http://download.bt.cn/install/install_6.0.sh && bash install.sh
  ```

默认端口：8888

为了提高安全性，当前宝塔新安装的已经开启了安全目录登录，新装机器都会随机一个8位字符的目录名，亦可以在面板设置处修改，如您没记录或不记得了，可以使用以下方式解决：登陆SSH终端输入以下一种命令来解决

1. 查看面板入口：/etc/init.d/bt default
2. 关闭入口验证：rm -f /www/server/panel/data/admin_path.pl

## CentOS7安装SFTP

```sh
# 查看openssh版本，openssh版本必须大于4.8p1
ssh -V
# 创建sftp组
groupadd sftp
# 创建sftp用户
useradd -g sftp -s /sbin/nologin -M sftp
passwd sftp
输入密码
# 建立目录
mkdir -p /data/sftp/mysftp
usermod -d /data/sftp/mysftp sftp

# 修改sshd_config
vim /etc/ssh/sshd_config
# 注释掉
# Subsystem sftp /usr/libexec/openssh/sftp-server
# 添加
Subsystem sftp internal-sftp
Match Group sftp
ChrootDirectory /data/sftp/mysftp
ForceCommand internal-sftp
AllowTcpForwarding no
X11Forwarding no

# 设置Chroot目录权限
chown root:sftp /data/sftp/mysftp
chmod 755 /data/sftp/mysftp

# 设置可以写入的目录
mkdir /data/sftp/mysftp/upload
chown sftp:sftp /data/sftp/mysftp/upload
chmod 755 /data/sftp/mysftp/upload

# 关闭selinux：
vim /etc/selinux/config
# 将文件中的 SELINUX=enforcing 修改为 SELINUX=disabled，然后保存。

# 执行：
setenforce 0
service sshd restart
# 或
systemctl restart sshd.service

# 测试
sftp sftp@127.0.0.1
```
