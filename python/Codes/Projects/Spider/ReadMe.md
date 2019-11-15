# 爬虫项目

这是我自己写的一些爬虫，仅做学习参考之用！

## 什么是爬虫

网络爬虫（又被称为网页蜘蛛，网络机器人，在FOAF社区中间，更常被称为网页追逐者），是一种按照一定的规则，自动地抓取万维网信息的程序或者脚本，从中获取大量的信息。爬虫爬取的过程从本质上说就是在模拟HTTP请求。

## 爬取过程

1. 通过HTTP库向目标站点发起请求，即发送一个Request，请求可以包含额外的headers等信息，等待服务器的响应。
2. 如果服务器正常响应，会得到一个Response，Response的内容便是所要获取的页面内容，类型可能有HTML、JSON、二进制文件（如图片、视频等类型）。
3. 得到的内容可能是HTML（可以用正则表达式、网页解析库进行解析），可能是JSON（可以直接转成JOSN对象进行解析），可能是二进制数据（可以保存或者进一步处理）。
4. 保存形式多样，可以保存成文本，也可以保存至数据库，或者保存成特定格式的文件。

## 爬虫作用

1. 市场分析：电商分析、商圈分析、一二级市场分析等
2. 市场监控：电商、新闻、房源监控、票房预测、股票分析等
3. 商机发现：招投标情报发现、客户资料发掘、企业客户发现等
4. 数据分析：对某个App的下载量跟踪、用户分析、评论分析，虚拟货币详情分析……

参考文档：
[BeautifulSoup 4.0文档](https://www.crummy.com/software/BeautifulSoup/bs4/doc/index.zh.html)
[我的教程ppt](爬虫.pptx)

```sh
python -m pip install --upgrade pip -i https://pypi.tuna.tsinghua.edu.cn/simple
```

## 1、天成医疗网

静态页面，最简单的一个[示例](tecenet.py)

```sh
# 安装 requests 库
pip install requests -i https://pypi.tuna.tsinghua.edu.cn/simple

# 安装 bs4 库
pip install bs4 -i https://pypi.tuna.tsinghua.edu.cn/simple

# 运行
python ./tecenet.py
```

## 2、淘宝联盟
