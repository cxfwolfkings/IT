# Git常用命令汇总

## 基本命令

1. 初始化git项目
    git init
2. 查看当前项目状态
    git status
3. 新建文件并再次查看状态
    echo "# My Project" > README.md
    git status
4. 记录当前操作，记录新加入的文件并再次查看状态
    git add README.md
    git status
5. 记录当前更改并加以信息描述
    git commit 文件名 -m'add my first project'
6. 查看提交历史
    git log
7. 新建远程仓库
    git remote add origin https://github.com/limingios/git-test.git
8. 同步到远程仓库
    git push -u origin master
9. 从远程代码库同步到本地
    git pull origin master
10. 与同步前对比变更
    git diff HEAD
11. 查看当前更改变更
    git diff –staged
12. 恢复到未更改状态
    git reset README.md
13. 覆盖本地文件
    git checkout octocat.txt
14. 冲突处理
    简单的冲突直接手工编辑，复杂的冲突可以借助工具解决。下面的命令会自动找到本机上的合并工具：
    `git mergetool`

## 设置变量

**全局变量**
示例：设置用户名和邮箱

```shell
git config --global user.name "Colin Chen"
git config --global user.email "colin.chen@softtek.com"
```

查看设置的变量：
`git config --list --global`

## 远程版本库

查看关联的远程版本库：`git remote -v`
查看某个远程版本库详情：`git remote show <name>`
给远程版本库添加别名：`git remote add <alias> git://xxx/xxx.git`

## 分支相关命令

```shell
# 新建分支
git branch feature1

# 切换分支
git checkout feature1

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



## 忽略无需加入版本库的文件

1. 使用.gitignore文件
   - 在项目目下创建.gitignore文件。
   - 在.gitignore文件中添加忽略内容。
     eg：/node_modules/
         /dist/ 
    （需要注意的是，.gitignore文件本身是会加入到版本控制当中的。也就是说有机会会影响到同时开发该项目的同事的提交）
2. 使用.git/info/exclude文件
    在exclude文件中添加需要忽略的内容，具体的忽略规则与.gitignore文件中的差不多。
   （但是，需要注意的是，.gitignore是会被提交到远程仓库的，会影响到他人的提交，所以，.gitignore中忽略的内容应该是公司共同需要忽略的东西。而exclude文件不会加入到版本控制中、不会提交到远程仓库，因此不会影响到他人的提交。可以是用exclude来忽略到自己本地项目中的一些文件）