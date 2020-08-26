# 目录

- [目录](#目录)
  - [常用命令](#常用命令)
  - [忽略文件](#忽略文件)
  - [下载速度](#下载速度)

## 常用命令

```sh
# 1. 初始化git项目
git init
# 2. 查看当前项目状态
git status
# 3. 新建文件并再次查看状态
echo "# My Project" > README.md
git status
# 4. 记录当前操作，记录新加入的文件并再次查看状态
git add README.md
git status
# 5. 记录当前更改并加以信息描述
git commit 文件名 -m'add my first project'
# 6. 查看提交历史
git log
# 7. 新建远程仓库
git remote add origin https://github.com/limingios/git-test.git
# 8. 同步到远程仓库
git push -u origin master
# 9. 从远程代码库同步到本地
git pull origin master
# 10. 与同步前对比变更
git diff HEAD
# 11. 查看当前更改变更
git diff –staged
# 12. 恢复到未更改状态
git reset README.md
# 13. 覆盖本地文件
git checkout octocat.txt
# 14. 冲突处理
简单的冲突直接手工编辑，复杂的冲突可以借助工具解决。下面的命令会自动找到本机上的合并工具：
git mergetool
------------------------------------------------------------

# 全局变量
------------------------------------------------------------
# 示例：设置用户名和邮箱
git config --global user.name "Colin Chen"
git config --global user.email "colin.chen@softtek.com"
# 查看设置的变量：
git config --list --global
------------------------------------------------------------

# 远程版本库
------------------------------------------------------------
# 查看关联的远程版本库
git remote -v
# 查看某个远程版本库详情
git remote show <name>
# 给远程版本库添加别名
git remote add <alias> git://xxx/xxx.git
------------------------------------------------------------

# 分支相关命令
------------------------------------------------------------
# 拉取服务器新的分支
git pull origin <branch>:<branch>
# 新建分支
git branch feature1 # 或者
git checkout -b feature1
# 推送到远程仓库
git push origin feature1
# 切换分支
git checkout feature1
# 设置上游分支
git branch --set-upstream-to=origin/feature1 [feature1]
# 查看上下游分支关系
git branch -vv

# 合并分支
# 1、直接合并
git checkout master
git merge feature1
# 2、压力合并：将一条分支上的所有历史提交压合成一条提交
git checkout -b feature1 master
...
git checkout master
git merge --squash feature1
# 此时提交还在暂存区中，查看状态
git status
# 提交
git commit
# 3、拣选合并
# 加了参数-n后，不会在主分支立即提交，会等待下一个文件的合并
git cherry-pick -n <fileId>

# 查看当前库中有哪些分支
git branch -a

# 删除本地已经合并了的分支
git branch -d 分支名
# 删除本地未合并的分支
git branch -D 分支名
# 删除服务器远端的分支
git push origin --delete 分支名
# -d,--delete
```

## 忽略文件

1、使用 `.gitignore` 文件

- 在项目目下创建.gitignore文件。
- 在.gitignore文件中添加忽略内容。eg：
  
  ```gitignore
  /node_modules/
  /dist/
  ```

（需要注意的是，.gitignore文件本身是会加入到版本控制当中的。也就是说有机会会影响到同时开发该项目的同事的提交）

2、使用 `.git/info/exclude` 文件

在exclude文件中添加需要忽略的内容，具体的忽略规则与.gitignore文件中的差不多。

（但是，需要注意的是，.gitignore是会被提交到远程仓库的，会影响到他人的提交，所以，.gitignore中忽略的内容应该是公司共同需要忽略的东西。而exclude文件不会加入到版本控制中、不会提交到远程仓库，因此不会影响到他人的提交。可以是用exclude来忽略到自己本地项目中的一些文件）

## 下载速度

1、打开本机host文件

2、利用[网站](https://www.ipaddress.com/)查询IP：github.com, github.global.ssl.fastly.net

3、配置在host中

```sh
140.82.113.4 github.com
199.232.5.194 github.global.ssl.fastly.net
```

同时将DNS信息配置到Git安装目录下的hosts文件中（未验证）

4、刷新 DNS 缓存：`ipconfig /flushdns`，OK!

**git push一直停留在writing objects，速度慢**

```sh
git config --global http.postBuffer 5242880000
```

作用：因为 `http.postBuffer` 默认上限为1M，上面的命令是把 git 的配置里 http.postBuffer 的变量改大为500M，文件大、上传慢

```sh
git config --global http.lowSpeedLimit 0
git config --global http.lowSpeedTime 999999
```

使用 git 更新或提交中途有时出现 `The remote end hung up unexpectedly` 的异常，特别是资源库在国外的情况下。此问题可能由网络原因引起。配置 git 的最低速度和最低速度时间：

```sh
git config --global pack.windowMemory 1024m
```

`fatal: Out of memory, malloc failed` 问题的解决

```sh
git push <远程主机名> <本地分支名>:<远程分支名>
git push origin master:master
git branch --set-upstream-to=origin/dev master
```

`git push origin` 与 `git push -u origin master` 的区别

`git push origin` 命令表示，将当前分支推送到 origin 主机的对应分支。如果当前分支只有一个追踪分支，那么主机名都可以省略。

`git push` 如果当前分支与多个主机存在追踪关系，那么这个时候 `-u` 选项会指定一个默认主机，

这样后面就可以不加任何参数使用 `git push`。

`git push -u origin master` 命令将本地的 master 分支推送到 origin 主机，同时指定 origin 为默认主机，

后面就可以不加任何参数使用 `git push` 了。 不带任何参数的 `git push`，默认只推送当前分支，这叫做 simple 方式。

此外，还有一种 matching 方式，会推送所有有对应的远程分支的本地分支。
Git 2.0版本之前，默认采用 matching 方法，现在改为默认采用 simple 方式。
