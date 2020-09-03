# 目录

1. 理论
   - [Web应用机制和术语](#Web应用机制和术语)
2. 实战
   - [Django快速上手](#Django快速上手)
   - [Flask入门](#Flask入门)
3. 总结
4. 升华



## 理论



### Web应用机制和术语

Web开发的早期阶段，开发者需要手动编写每个页面，例如一个新闻门户网站，每天都要修改它的HTML页面，随着网站规模和体量的增大，这种方式就变得极度糟糕。

为了解决这个问题，开发人员想到了用外部程序来为Web服务器生成动态内容，也就是说HTML页面以及页面中的动态内容不再通过手动编写而是通过程序自动生成。

最早的时候，这项技术被称为CGI（公共网关接口），当然随着时间的推移，CGI暴露出的问题也越来越多，例如大量重复的样板代码，总体性能较为低下等，因此在时代呼唤新英雄的背景下，PHP、ASP、JSP这类Web应用开发技术在上世纪90年代中后期如雨后春笋般涌现。

通常我们说的Web应用是指通过浏览器来访问网络资源的应用程序，因为浏览器的普及性以及易用性，Web应用使用起来方便简单，免除了安装和更新应用程序带来的麻烦，而且也不用关心用户到底用的是什么操作系统，甚至不用区分是PC端还是移动端。

下图向我们展示了Web应用的工作流程，其中涉及到的术语如下表所示。

![x](http://wxdhhg.cn/wordpress/wp-content/uploads/2020/04/web-application.png)

>说明：相信有经验的读者会发现，这张图中其实还少了很多东西，例如反向代理服务器、数据库服务器、防火墙等，而且图中的每个节点在实际项目部署时可能是一组节点组成的集群。当然，如果你对这些没有什么概念也不要紧，继续下去就行了，后面会给大家一一讲解的。

术语|解释
-|-
URL/URI|统一资源定位符/统一资源标识符，网络资源的唯一标识
域名|与Web服务器地址对应的一个易于记忆的字符串名字
DNS|域名解析服务，可以将域名转换成对应的IP地址
IP地址|网络上的主机的身份标识，通过IP地址可以区分不同的主机
HTTP|超文本传输协议，构建在TCP之上的应用级协议，万维网数据通信的基础
反向代理|代理客户端向服务器发出请求，然后将服务器返回的资源返回给客户端
Web服务器|接受HTTP请求，然后返回HTML文件、纯文本文件、图像等资源给请求者
Nginx|高性能的Web服务器，也可以用作[反向代理](https://zh.wikipedia.org/wiki/%E5%8F%8D%E5%90%91%E4%BB%A3%E7%90%86)，[负载均衡](https://zh.wikipedia.org/wiki/%E8%B4%9F%E8%BD%BD%E5%9D%87%E8%A1%A1) 和 [HTTP缓存](https://zh.wikipedia.org/wiki/HTTP%E7%BC%93%E5%AD%98)

**HTTP协议：**

这里我们稍微费一些笔墨来谈谈上面提到的HTTP。HTTP（超文本传输协议）是构建于TCP（传输控制协议）之上应用级协议，它利用了TCP提供的可靠的传输服务实现了Web应用中的数据交换。按照维基百科上的介绍，设计HTTP最初的目的是为了提供一种发布和接收[HTML](https://zh.wikipedia.org/wiki/HTML)页面的方法，也就是说这个协议是浏览器和Web服务器之间传输的数据的载体。

关于这个协议的详细信息以及目前的发展状况，大家可以阅读阮一峰老师的[《HTTP 协议入门》](http://www.ruanyifeng.com/blog/2016/08/http.html)、[《互联网协议入门》](http://www.ruanyifeng.com/blog/2012/05/internet_protocol_suite_part_i.html)系列以及[《图解HTTPS协议》](http://www.ruanyifeng.com/blog/2014/09/illustration-ssl.html)进行了解。

下图是我在四川省网络通信技术重点实验室学习和工作期间使用开源协议分析工具Ethereal（抓包工具WireShark的前身）截取的访问百度首页时的HTTP请求和响应的报文（协议数据），由于Ethereal截取的是经过网络适配器的数据，因此可以清晰的看到从物理链路层到应用层的协议数据。

HTTP请求（请求行+请求头+空行+\[消息体]）：

![x](http://wxdhhg.cn/wordpress/wp-content/uploads/2020/04/http-request.png)

HTTP响应（响应行+响应头+空行+消息体）：

>说明：这两张图是在2009年9月10日截取的，但愿这两张如同泛黄的照片般的截图能帮助你了解HTTP到底是什么样子的。

## Django快速上手

Python 的 Web 框架有上百个，比它的关键字还要多。所谓 Web 框架，就是用于开发 Web 服务器端应用的基础设施（通常指封装好的模块和一系列的工具）。事实上，即便没有 Web 框架，我们仍然可以通过 socket 或 [CGI](https://zh.wikipedia.org/wiki/%E9%80%9A%E7%94%A8%E7%BD%91%E5%85%B3%E6%8E%A5%E5%8F%A3) 来开发 Web 服务器端应用，但是这样做的成本和代价在实际开发中通常是不能接受的。

通过 Web 框架，我们可以化繁为简，同时降低创建、更新、扩展应用程序的工作量。Python 的 Web 框架中比较有名的有：Flask、Django、Tornado、Sanic、Pyramid、Bottle、Web2py、web.py 等。

在基于 Python 的 Web 框架中，Django 是所有重量级选手中最有代表性的一位，开发者可以基于 Django 快速的开发可靠的 Web 应用程序，因为它减少了 Web 开发中不必要的开销，对常用的设计和开发模式进行了封装，并对 MVC 架构提供了支持（MTV）。

许多成功的网站和 App 都是基于 Django 框架构建的，国内比较有代表性的网站包括：知乎、豆瓣网、果壳网、搜狐闪电邮箱、101围棋网、海报时尚网、背书吧、堆糖、手机搜狐网、咕咚、爱福窝、果库等。

![x](http://wxdhhg.cn/wordpress/wp-content/uploads/2020/04/mvc.png)

Django 诞生于2003年，它是一个在真正的应用中成长起来的项目，由劳伦斯出版集团旗下在线新闻网站的内容管理系统(CMS)研发团队编写（主要是Adrian Holovaty 和 Simon Willison），以比利时的吉普赛爵士吉他手 Django Reinhardt 来命名，在2005年夏天作为开源框架发布。

使用 Django 能用很短的时间构建出功能完备的网站，因为它代替程序员完成了所有乏味和重复的劳动，剩下真正有意义的核心业务给程序员，这一点就是对 **DRY（Don't Repeat Yourself）** 理念的最好践行。

**准备工作**

1、检查 Python 环境：Django 1.11 需要 Python 2.7 或 Python 3.4 以上的版本；Django 2.0 需要 Python 3.4 以上的版本；Django 2.1 需要 Python 3.5 以上的版本。

>说明：我自己平时使用 macOS 做开发，macOS 和 Linux 平台使用的命令跟 Windows 平台有较大的区别，这一点在之前也有过类似的说明，如果使用 Windows 平台做开发，替换一下对应的命令即可。

```sh
python3 --version
```

```sh
python3
>>> import sys
>>> sys.version
>>> sys.version_info
```

2、创建项目文件夹并切换到该目录，例如我们要实例一个OA（办公自动化）项目。

```sh
mkdir oa
cd oa
```

3、创建并激活虚拟环境。

```sh
python3 -m venv venv
# 激活虚拟环境 Linux
source venv/bin/activate
# 激活虚拟环境 Windows
venv\Scripts\activate
```

>说明：上面使用了 Python 自带的 venv 模块完成了虚拟环境的创建，当然也可以使用 virtualenv 或 pipenv 这样的工具。

4、更新包管理工具pip。

```sh
(venv)$ pip install -U pip -i https://pypi.tuna.tsinghua.edu.cn/simple
```

或

```sh
(venv)$ python -m pip install -U pip -i https://pypi.tuna.tsinghua.edu.cn/simple
```

>注意：请注意终端提示符发生的变化，前面的(venv)说明我们已经进入虚拟环境，而虚拟环境下的 python 和 pip 已经是 Python 3 的解释器和包管理工具了。
>
>一般 pip 等插件安装在类似 C:\Users\Administrator\AppData\Local\Programs\Python\Python37-32\Scripts 的目录中，需要将这个目录加入环境变量path，才能方便地使用 pip 命令。

5、安装 Django。

```sh
(venv)$ pip install django -i https://pypi.tuna.tsinghua.edu.cn/simple
```

或指定版本号来安装对应的Django的版本。

```sh
(venv)$ pip install django==2.1.8
```

6、检查 Django 的版本。

```sh
(venv)$ python -m django --version
(venv)$ django-admin --version
```

或

```sh
(venv)$ python
>>> import django
>>> django.get_version()
```

当然，也可以通过 pip 来查看安装的依赖库及其版本，如：

```sh
(venv)$ pip freeze
(venv)$ pip list
```

下图展示了 Django 版本和 Python 版本的对应关系，如果在安装时没有指定版本号，将自动选择最新的版本（在写作这段内容时，Django 最新的版本是2.2）。

Django版本|Python版本
-|-
1.8|2.7、3.2、3.3、3.4、3.5
1.9、1.10|2.7、3.4、3.5
1.11|2.7、3.4、3.5、3.6、3.7
2.0|3.4、3.5、3.6、3.7
2.1、2.2|3.5、3.6、3.7

7、使用django-admin创建项目，项目命名为oa。

```sh
(venv)$ django-admin startproject oa .
```

>注意：上面的命令最后的那个点，它表示在当前路径下创建项目。

执行上面的命令后看看生成的文件和文件夹，它们的作用如下所示：

- `manage.py`： 一个让你可以管理Django项目的工具程序。
- `oa/__init__.py`：一个空文件，告诉Python解释器这个目录应该被视为一个Python的包。
- `oa/settings.py`：Django项目的配置文件。
- `oa/urls.py`：Django项目的URL声明（URL映射），就像是你的网站的“目录”。
- `oa/wsgi.py`：项目运行在WSGI兼容Web服务器上的接口文件。

>说明：WSGI全称是Web服务器网关接口，维基百科上给出的解释是“为Python语言定义的[Web服务器](https://zh.wikipedia.org/wiki/%E7%B6%B2%E9%A0%81%E4%BC%BA%E6%9C%8D%E5%99%A8)和[Web应用程序](https://zh.wikipedia.org/wiki/%E7%BD%91%E7%BB%9C%E5%BA%94%E7%94%A8%E7%A8%8B%E5%BA%8F)或框架之间的一种简单而通用的接口”。

8、启动服务器运行项目。

```sh
(venv)$ python manage.py runserver
```

在浏览器中输入 `http://127.0.0.1:8000` 访问我们的服务器

>说明1：刚刚启动的是Django自带的用于开发和测试的服务器，它是一个用纯Python编写的轻量级Web服务器，但它并不是真正意义上的生产级别的服务器，千万不要将这个服务器用于和生产环境相关的任何地方。
>
>说明2：用于开发的服务器在需要的情况下会对每一次的访问请求重新载入一遍Python代码。所以你不需要为了让修改的代码生效而频繁的重新启动服务器。然而，一些动作，比如添加新文件，将不会触发自动重新加载，这时你得自己手动重启服务器。
>
>说明3：可以通过 `python manage.py help` 命令查看可用命令列表；在启动服务器时，也可以通过 `python manage.py runserver 1.2.3.4:5678` 来指定将服务器运行于哪个IP地址和端口。
>
>说明4：可以通过 `Ctrl+C` 来终止服务器的运行。

9、接下来我们修改项目的配置文件 settings.py，Django是一个支持国际化和本地化的框架，因此刚才我们看到的默认首页也是支持国际化的，我们将默认语言修改为中文，时区设置为东八区。

```sh
(venv)$ vim oa/settings.py
```

```py
# 此处省略上面的内容

# 设置语言代码
LANGUAGE_CODE = 'zh-hans'
# 设置时区
TIME_ZONE = 'Asia/Chongqing'

# 此处省略下面的内容
```

10、刷新刚才的页面。

**动态页面**

1、创建名为hrs（人力资源系统）的应用，一个Django项目可以包含一个或多个应用。

```sh
(venv)$ python manage.py startapp hrs
```

执行上面的命令会在当前路径下创建hrs目录，其目录结构如下所示：

- `__init__.py`：一个空文件，告诉Python解释器这个目录应该被视为一个Python的包。
- `admin.py`：可以用来注册模型，用于在Django的管理界面管理模型。
- `apps.py`：当前应用的配置文件。
- `migrations`：存放与模型有关的数据库迁移信息。
- `__init__.py`：一个空文件，告诉Python解释器这个目录应该被视为一个Python的包。
- `models.py`：存放应用的数据模型，即实体类及其之间的关系（MVC/MTV中的M）。
- `tests.py`：包含测试应用各项功能的测试类和测试函数。
- `views.py`：处理请求并返回响应的函数（MVC中的C，MTV中的V）。

2、修改应用目录下的视图文件views.py。

```sh
(venv)$ vim hrs/views.py
```

```py
from django.http import HttpResponse

def index(request):
  return HttpResponse('<h1>Hello, Django!</h1>')
```

3、在应用目录创建一个urls.py文件并映射URL。

```sh
(venv)$ touch hrs/urls.py
(venv)$ vim hrs/urls.py
```

```py
from django.urls import path
from hrs import views

urlpatterns = [
  path('', views.index, name='index'),
]
```

>说明：上面使用的path函数是Django 2.x中新添加的函数，除此之外还可以使用支持正则表达式的URL映射函数re_path函数；Django 1.x中是用名为url函数来设定URL映射。

4、修改项目目录下的urls.py文件，对应用中设定的URL进行合并。

```sh
(venv) $ vim oa/urls.py
```

```py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
  path('admin/', admin.site.urls),
  path('hrs/', include('hrs.urls')),
]
```

>说明：上面的代码通过include函数将hrs应用中配置URL的文件包含到项目的URL配置中，并映射到hrs/路径下。

5、重新运行项目，并打开浏览器中访问 `http://localhost:8000/hrs` 。

```sh
(venv)$ python manage.py runserver
```

**使用视图模板**

通过拼接 HTML 代码的方式生成动态视图的做法在实际开发中是不能接受的，这一点大家一定能够想到。

为了解决这个问题，我们可以提前准备一个模板页，所谓模板页就是一个带占位符的 HTML 页面，当我们将程序中获得的数据替换掉页面中的占位符时，一个动态页面就产生了。

我们可以用 Django 框架中 template 模块的 `Template` 类创建模板对象，通过模板对象的 `render` 方法实现对模板的渲染，在 Django 框架中还有一个名为 `render` 的便捷函数可以来完成渲染模板的操作。

所谓的渲染就是用数据替换掉模板页中的占位符，当然这里的渲染称为后端渲染，即在服务器端完成页面的渲染再输出到浏览器中，这种做法的主要坏处是当并发访问量较大时，服务器会承受较大的负担，所以今天有很多的 Web 应用都使用了前端渲染，即服务器只提供所需的数据（通常是 JSON 格式），在浏览器中通过 JavaScript 获取这些数据并渲染到页面上，这个我们在后面的内容中会讲到。

1、先回到 manage.py 文件所在的目录创建名为 templates 文件夹。

```sh
(venv)$ mkdir templates
```

2、创建模板页index.html。

```sh
(venv)$ touch templates/index.html
(venv)$ vim templates/index.html
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>首页</title>
</head>
<body>
  <h1>部门信息</h1>
  <hr>
  <table>
    <tr>
      <th>部门编号</th>
      <th>部门名称</th>
      <th>所在地</th>
    </tr>
    {% for dept in depts_list %}
    <tr>
      <td>{{ dept.no }}</td>
      <td>{{ dept.name }}</td>
      <td>{{ dept.location }}</td>
    </tr>
    {% endfor %}
  </table>
</body>
</html>
```

>在上面的模板页中我们使用了 `{{ greeting }}` 这样的模板占位符语法，也使用了 `{% for %}` 这样的模板指令，这些都是 Django 模板语言(DTL)的一部分。
>
>如果对此不熟悉并不要紧，我们会在后续的内容中进一步的讲解，而且我们刚才也说到了，渲染页面还有更好的选择就是使用前端渲染，当然这是后话。

3、回到应用目录，修改 views.py 文件。

```sh
(venv)$ vim hrs/views.py
```

```py
from django.shortcuts import render

depts_list = [
  {'no': 10, 'name': '财务部', 'location': '北京'},
  {'no': 20, 'name': '研发部', 'location': '成都'},
  {'no': 30, 'name': '销售部', 'location': '上海'}
]

def index(request):
  return render(request, 'index.html', {'depts_list': depts_list})
```

> 说明：Django 框架通过 shortcuts 模块的便捷函数 `render` 简化了渲染模板的操作，有了这个函数，就不用先创建 Template 对象再去调用 render 方法。

到此为止，我们还没有办法让 views.py 中的 render 函数找到模板文件 index.html，为此我们需要修改 settings.py 文件，配置模板文件所在的路径。

4、切换到项目目录修改 settings.py 文件。

```sh
(venv)$ vim oa/settings.py
```

```py
# 此处省略上面的内容
TEMPLATES = [{
  'BACKEND': 'django.template.backends.django.DjangoTemplates',
  'DIRS': [os.path.join(BASE_DIR, 'templates')],
  'APP_DIRS': True,
  'OPTIONS': {
    'context_processors': [
      'django.template.context_processors.debug',
      'django.template.context_processors.request',
      'django.contrib.auth.context_processors.auth',
      'django.contrib.messages.context_processors.messages',
    ]
  }
}]
# 此处省略下面的内容
```

5、重新运行项目或直接刷新页面查看结果。

```sh
(venv)$ python manage.py runserver
```

![x](http://wxdhhg.cn/wordpress/wp-content/uploads/2020/04/show-depts.png)

**总结：**

至此，我们已经利用 Django 框架完成了一个非常小的 Web 应用，虽然它并没有任何的实际价值，但是可以通过这个项目对 Django 框架有一个感性的认识。

当然，实际开发中我们可以用 PyCharm 来创建项目，如果使用专业版的 PyCharm，可以直接创建 Django 项目。

使用 PyCharm 的好处在于编写代码时可以获得代码提示、错误修复、自动导入等功能，从而提升开发效率，但是专业版的 PyCharm 需要按年支付相应的费用，社区版的 PyCharm 中并未包含对 Django 框架直接的支持，但是我们仍然可以使用它来创建 Django 项目，只是在使用上没有专业版的方便。

关于 PyCharm 的使用，可以参考[《玩转PyCharm》](https://github.com/jackfrued/Python-100-Days/blob/master/%E7%8E%A9%E8%BD%ACPyCharm.md)一文。此外，Django 最好的学习资料肯定是它的[官方文档](https://docs.djangoproject.com/zh-hans/2.0/)，当然图灵社区出版的[《Django基础教程》](http://www.ituring.com.cn/book/2630)也是非常适合初学者的入门级读物。

**深入模型**

MVC 架构追求的是“模型”和“视图”的解耦合。所谓“模型”说得更直白一些就是数据（的表示），所以通常也被称作“数据模型”。

在实际的项目中，数据模型通常通过数据库实现持久化操作，而关系型数据库在过去和当下都是持久化的首选方案，下面我们以 MySQL 为例来说明如何使用关系型数据库来实现持久化操作。

**配置关系型数据库MySQL**

我们继续来完善 OA 项目，首先从配置项目使用的数据库开始。

1、修改项目的 settings.py 文件，首先将我们之前创建的应用 hrs 添加已安装的项目中，然后配置 MySQL 作为持久化方案。

```sh
(venv)$ vim oa/settings.py
```

```py
# 此处省略上面的代码
INSTALLED_APPS = [
  'django.contrib.admin',
  'django.contrib.auth',
  'django.contrib.contenttypes',
  'django.contrib.sessions',
  'django.contrib.messages',
  'django.contrib.staticfiles',
  'hrs'
]

DATABASES = {
  'default': {
    'ENGINE': 'django.db.backends.mysql',
    'NAME': 'oa',
    'HOST': '127.0.0.1',
    'PORT': 3306,
    'USER': 'root',
    'PASSWORD': '123456',
  }
}
# 此处省略下面的代码
```

在配置ENGINE属性时，常用的可选值包括：

- django.db.backends.sqlite3'：SQLite嵌入式数据库。
- django.db.backends.postgresql'：BSD许可证下发行的开源关系型数据库产品。
- django.db.backends.mysql'：转手多次目前属于甲骨文公司的经济高效的数据库产品。
- django.db.backends.oracle'：甲骨文公司的关系型数据库旗舰产品。

其他的配置可以参考官方文档中[数据库配置](https://docs.djangoproject.com/zh-hans/2.0/ref/databases/#third-party-notes)的部分。

`NAME` 属性代表数据库的名称，如果使用 SQLite 它对应着一个文件，在这种情况下 `NAME` 的属性值应该是一个绝对路径；使用其他关系型数据库，则要配置对应的 `HOST（主机）`、`PORT（端口）`、`USER（用户名）`、`PASSWORD（口令）`等属性。

2、安装 Python 操作 MySQL 的依赖库，Python3 中通常使用 PyMySQL，Python2 中通常用 MySQLdb。

```sh
(venv)$ pip install pymysql -i https://pypi.tuna.tsinghua.edu.cn/simple
```

如果使用 Python3 需要修改项目目录下的 `__init__.py` 文件并加入如下所示的代码，这段代码的作用是将 PyMySQL 视为 MySQLdb 来使用，从而避免 Django 找不到连接 MySQL 的客户端工具而询问你："Did you install mysqlclient?"（你安装了 mysqlclient 吗？）。

```py
import pymysql

pymysql.install_as_MySQLdb()
```

3、如果之前没有为应用程序创建数据库，那么现在是时候创建名为 oa 的数据库了。在 MySQL 中创建数据库的 SQL 语句如下所示：

```sql
create database oa default charset utf8;
```

4、Django 框架本身有自带的数据模型，我们稍后会用到这些模型，为此我们先做一次迁移操作。所谓迁移，就是根据模型自动生成关系数据库中的二维表，命令如下所示：

```sh
(venv)$ python manage.py migrate
Operations to perform:
Apply all migrations: admin, auth, contenttypes, sessions
Running migrations:
  Applying contenttypes.0001_initial... OK
  Applying auth.0001_initial... OK
  Applying admin.0001_initial... OK
  Applying admin.0002_logentry_remove_auto_add... OK
  Applying contenttypes.0002_remove_content_type_name... OK
  Applying auth.0002_alter_permission_name_max_length... OK
  Applying auth.0003_alter_user_email_max_length... OK
  Applying auth.0004_alter_user_username_opts... OK
  Applying auth.0005_alter_user_last_login_null... OK
  Applying auth.0006_require_contenttypes_0002... OK
  Applying auth.0007_alter_validators_add_error_messages... OK
  Applying auth.0008_alter_user_username_max_length... OK
  Applying auth.0009_alter_user_last_name_max_length... OK
  Applying sessions.0001_initial... OK
```

5、接下来，我们为自己的应用创建数据模型。如果要在 hrs 应用中实现对部门和员工的管理，我们可以先创建部门和员工数据模型，代码如下所示。

```sh
(venv)$ vim hrs/models.py
```

```py
from django.db import models

class Dept(models.Model):
  """部门类"""
  no = models.IntegerField(primary_key=True, db_column='dno', verbose_name='部门编号')
  name = models.CharField(max_length=20, db_column='dname', verbose_name='部门名称')
  location = models.CharField(max_length=10, db_column='dloc', verbose_name='部门所在地')

  class Meta:
    db_table = 'tb_dept'


class Emp(models.Model):
  """员工类"""
  no = models.IntegerField(primary_key=True, db_column='eno', verbose_name='员工编号')
  name = models.CharField(max_length=20, db_column='ename', verbose_name='员工姓名')
  job = models.CharField(max_length=10, verbose_name='职位')
  # 多对一外键关联(自参照)
  mgr = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True, verbose_name='主管')
  sal = models.DecimalField(max_digits=7, decimal_places=2, verbose_name='月薪')
  comm = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True, verbose_name='补贴')
  # 多对一外键关联(参照部门模型)
  dept = models.ForeignKey(Dept, db_column='dno', on_delete=models.PROTECT, verbose_name='所在部门')

  class Meta:
    db_table = 'tb_emp'
```

>说明：上面定义模型时使用了字段类及其属性，其中 IntegerField 对应数据库中的 integer 类型，CharField 对应数据库的 varchar 类型，DecimalField 对应数据库的 decimal 类型，ForeignKey 用来建立多对一外键关联。
>
>字段属性 primary_key 用于设置主键，max_length 用来设置字段的最大长度，db_column 用来设置数据库中与字段对应的列，verbose_name 则设置了 Django 后台管理系统中该字段显示的名称。如果对这些东西感到很困惑也不要紧，文末提供了字段类、字段属性、元数据选项等设置的相关说明，不清楚的读者可以稍后查看对应的参考指南。

6、再次执行迁移操作，先通过模型生成迁移文件，再执行迁移创建二维表。

```sh
(venv)$ python manage.py makemigrations hrs
Migrations for 'hrs':
  hrs/migrations/0001_initial.py
    - Create model Dept
    - Create model Emp
(venv)$ python manage.py migrate
Operations to perform:
  Apply all migrations: admin, auth, contenttypes, hrs, sessions
Running migrations:
  Applying hrs.0001_initial... OK
```



## Flask入门

**安装**

依赖套件：

- [Werkzeug](https://palletsprojects.com/p/werkzeug/) 用于实现 WSGI ，应用和服务之间的标准 Python 接口。
- [Jinja](https://palletsprojects.com/p/jinja/) 用于渲染页面的模板语言。
- [MarkupSafe](https://palletsprojects.com/p/markupsafe/) 与 Jinja 共用，在渲染页面时用于避免不可信的输入，防止注入攻击。
- [ItsDangerous](https://palletsprojects.com/p/itsdangerous/) 保证数据完整性的安全标志数据，用于保护 Flask 的 session cookie.
- [Click](https://palletsprojects.com/p/click/) 是一个命令行应用的框架。用于提供 flask 命令，并允许添加自定义 管理命令。

可选依赖：

- [Blinker](https://pythonhosted.org/blinker/) 为 信号 提供支持。
- [SimpleJSON](https://simplejson.readthedocs.io/) 是一个快速的 JSON 实现，兼容 Python’s json 模块。如果安装 了这个软件，那么会优先使用这个软件来进行 JSON 操作。
- [python-dotenv](https://github.com/theskumar/python-dotenv#readme) 当运行 flask 命令时为 通过 dotenv 设置环境变量 提供支持。
- [Watchdog](https://pythonhosted.org/watchdog/) 为开发服务器提供快速高效的重载。

**虚拟环境**

建议在开发环境和生产环境下都使用虚拟环境来管理项目的依赖。

**为什么要使用虚拟环境？**

>随着你的 Python 项目越来越多，你会发现不同的项目会需要 不同的版本的 Python 库。同一个 Python 库的不同版本可能不兼容。虚拟环境可以为每一个项目安装独立的 Python 库，这样就可以隔离不同项目之间的 Python 库，也可以隔离项目与操作系统之间的 Python 库。

Python 3 内置了用于创建虚拟环境的 venv 模块。如果你使用的是较新的 Python 版本，那么请接着阅读本文下面的内容。

如果你使用 Python 2 ，请首先参阅 [安装 virtualenv](#安装virtualenv)。

**创建一个虚拟环境**

创建一个项目文件夹，然后创建一个虚拟环境。创建完成后项目文件夹中会有一个 venv 文件夹：

```sh
mkdir myproject
cd myproject
python3 -m venv venv
```

在 Windows 下：

```bat
py -3 -m venv venv
```

在老版本的 Python 中要使用下面的命令创建虚拟环境：

```sh
python2 -m virtualenv venv
```

在 Windows 下：

```bat
\Python27\Scripts\virtualenv.exe venv
```

**激活虚拟环境**

在开始工作前，先要激活相应的虚拟环境：

```sh
. venv/bin/activate
```

在 Windows 下：

```bat
venv\Scripts\activate
```

激活后，你的终端提示符会显示虚拟环境的名称。

**安装Flask**

在已激活的虚拟环境中可以使用如下命令安装 Flask：

```sh
pip install Flask -i https://pypi.tuna.tsinghua.edu.cn/simple
```

Flask 现在已经安装完毕。

**与时俱进**

如果想要在正式发行之前使用最新的 Flask 开发版本，可以使用如下命令从主分支 安装或者更新代码：

```sh
pip install -U https://github.com/pallets/flask/archive/master.tar.gz
```

**安装virtualenv**

如果你使用的是 Python 2 ，那么 venv 模块无法使用。相应的，必须安装 virtualenv.

在 Linux 下， virtualenv 通过操作系统的包管理器安装：

```sh
# Debian, Ubuntu
sudo apt-get install python-virtualenv

# CentOS, Fedora
sudo yum install python-virtualenv

# Arch
sudo pacman -S python-virtualenv
```

如果是 Mac OS X 或者 Windows ，下载 [get-pip.py](https://bootstrap.pypa.io/get-pip.py) ，然后：

```sh
sudo python2 Downloads/get-pip.py
sudo python2 -m pip install virtualenv
```

在 Windows 下，需要 administrator 权限：

```bat
\Python27\python.exe Downloads\get-pip.py
\Python27\python.exe -m pip install virtualenv
```

现在可以返回[上面](#创建一个虚拟环境)， 创建一个虚拟环境

**快速上手**

一个最小的 Flask 应用（）:

```py
# 1、首先我们导入了Flask类。该类的实例将会成为我们的WSGI应用。
from flask import Flask
'''
2、
接着我们创建一个该类的实例。
第一个参数是应用模块或者包的名称。
如果你使用 一个单一模块（就像本例），那么应当使用 __name__ ，
  因为名称会根据这个模块是按应用方式使用还是作为一个模块导入而发生变化
  （可能是 '__main__' ， 也可能是实际导入的名称）。
这个参数是必需的，这样 Flask 才能知道在哪里可以找到模板和静态文件等东西。
'''
app = Flask(__name__)
# 3、然后我们使用route()装饰器来告诉Flask触发函数的URL。
@app.route('/')
def hello_world():
    return 'Hello, World!'
# 4、上面的函数名称被用于生成相关联的URL。函数最后返回需要在用户浏览器中显示的信息。
```

<b style="color:red">请不要使用 `flask.py` 作为应用名称，这会与 Flask 本身发生冲突</b>。

可以使用 flask 命令或者 python 的 -m 开关来运行这个应用。在运行应用之前，需要在终端里导出 FLASK_APP 环境变量：

```sh
export FLASK_APP=hello.py
flask run
 * Running on http://127.0.0.1:5000/
```

如果是在 Windows 下，那么导出环境变量的语法取决于使用的是哪种命令行解释器。 在 Command Prompt 下：

```bat
C:\path\to\app>set FLASK_APP=hello.py
```

在 PowerShell 下：

```ps
PS C:\path\to\app> $env:FLASK_APP = "hello.py"
```

还可以使用 `python -m flask`：

```sh
export FLASK_APP=hello.py
python -m flask run
 * Running on http://127.0.0.1:5000/
```

这样就启动了一个非常简单的内建的服务器。这个服务器用于测试应该是足够了，但是 用于生产可能是不够的。关于部署的有关内容参见[《部署方式》](https://dormousehole.readthedocs.io/en/latest/deploying/index.html#deployment)。

现在在浏览器中打开 `http://127.0.0.1:5000/`，应该可以看到 Hello World! 字样。

**外部可见的服务器**

运行服务器后，会发现只有你自己的电脑可以使用服务，而网络中的其他电脑却不行。缺省设置就是这样的，因为在调试模式下该应用的用户可以执行你电脑中的任意 Python 代码。

如果你关闭了调试器或信任你网络中的用户，那么可以让服务器被公开访问。只要在命令行上简单的加上 `--host=0.0.0.0` 即可：

```sh
flask run --host=0.0.0.0
```

这行代码告诉你的操作系统监听所有公开的 IP。

**如果服务器不能启动怎么办**

假如运行 `python -m flask` 命令失败或者 flask 命令不存在， 那么可能会有多种原因导致失败。首先应该检查错误信息。

1. 老版本的 Flask

   版本低于 0.11 的 Flask ，启动应用的方式是不同的。简单的说就是 flask 和 python -m flask 命令都无法使用。在这种情况有 两个选择：一是升级 Flask 到更新的版本，二是参阅《开发服务器》，学习其他 启动服务器的方法。

2. 非法导入名称

   FLASK_APP 环境变量中储存的是模块的名称，运行 flask run 命令就 会导入这个模块。如果模块的名称不对，那么就会出现导入错误。出现错误的时机是在 应用开始的时候。如果调试模式打开的情况下，会在运行到应用开始的时候出现导入 错误。出错信息会告诉你尝试导入哪个模块时出错，为什么会出错。

   最常见的错误是因为拼写错误而没有真正创建一个 app 对象。

**调试模式**

（只需要记录出错信息和追踪堆栈？参见[应用错误处理](https://dormousehole.readthedocs.io/en/latest/errorhandling.html#application-errors)）

虽然 flask 命令可以方便地启动一个本地开发服务器，但是每次应用代码 修改之后都需要手动重启服务器。这样不是很方便， Flask 可以做得更好。如果你打开 调试模式，那么服务器会在修改应用代码之后自动重启，并且当应用出错时还会提供一个 有用的调试器。

如果需要打开所有开发功能（包括调试模式），那么要在运行服务器之前导出 FLASK_ENV 环境变量并把其设置为 development:

```sh
export FLASK_ENV=development
flask run
```

（在 Windows 下需要使用 set 来代替 `export`。）

这样可以实现以下功能：

1. 激活调试器。
2. 激活自动重载。
3. 打开 Flask 应用的调试模式。

还可以通过导出 `FLASK_DEBUG=1` 来单独控制调试模式的开关。

[开发服务器](https://dormousehole.readthedocs.io/en/latest/server.html#server)文档中还有更多的参数说明。

>注意：虽然交互调试器不能在分布环境下工作（这使得它基本不可能用于生产环境），但是 它允许执行任意代码，这样会成为一个重大安全隐患。因此，<b style="color:red">绝对不能在生产环境中使用调试器</b>。

更多关于调试器的信息参见 [Werkzeug 文档](https://werkzeug.palletsprojects.com/debug/#using-the-debugger)。

想使用其他调试器？请参阅 [使用调试器](https://dormousehole.readthedocs.io/en/latest/errorhandling.html#working-with-debuggers)。

**路由**

现代 web 应用都使用有意义的 URL ，这样有助于用户记忆，网页会更得到用户的青睐， 提高回头率。

使用 route() 装饰器来把函数绑定到 URL：

```py
@app.route('/')
def index():
    return 'Index Page'

@app.route('/hello')
def hello():
    return 'Hello, World'
```

但是能做的不仅仅是这些！你可以动态变化 URL 的某些部分，还可以为一个函数指定多个规则。

**变量规则**

通过把 URL 的一部分标记为 `<variable_name>` 就可以在 URL 中添加变量。标记的部分会作为关键字参数传递给函数。通过使用 `<converter:variable_name>`，可以选择性的加上一个转换器，为变量指定规则。请看下面的例子：

```py
@app.route('/user/<username>')
def show_user_profile(username):
    # show the user profile for that user
    return 'User %s' % escape(username)

@app.route('/post/<int:post_id>')
def show_post(post_id):
    # show the post with the given id, the id is an integer
    return 'Post %d' % post_id

@app.route('/path/<path:subpath>')
def show_subpath(subpath):
    # show the subpath after /path/
    return 'Subpath %s' % escape(subpath)
```

转换器类型|说明
-|-
string|（缺省值） 接受任何不包含斜杠的文本
int|接受正整数
float|接受正浮点数
path|类似 string ，但可以包含斜杠
uuid|接受 UUID 字符串

#### 唯一的 URL / 重定向行为

以下两条规则的不同之处在于是否使用尾部的斜杠：

```py
@app.route('/projects/')
def projects():
    return 'The project page'

@app.route('/about')
def about():
    return 'The about page'
```

projects 的 URL 是中规中矩的，尾部有一个斜杠，看起来就如同一个文件夹。访问一个没有斜杠结尾的 URL 时 Flask 会自动进行重定向，帮你在尾部加上一个斜杠。

about 的 URL 没有尾部斜杠，因此其行为表现与一个文件类似。如果访问这个 URL 时添加了尾部斜杠就会得到一个 404 错误。这样可以保持 URL 唯一，并帮助 搜索引擎避免重复索引同一页面。

#### URL 构建

`url_for()` 函数用于构建指定函数的 URL。它把函数名称作为第一个参数。它可以接受任意个关键字参数，每个关键字参数对应 URL 中的变量。未知变量 将添加到 URL 中作为查询参数。

为什么不在把 URL 写死在模板中，而要使用反转函数 url_for() 动态构建？

1. 反转通常比硬编码 URL 的描述性更好。
2. 你可以只在一个地方改变 URL ，而不用到处乱找。
3. URL 创建会为你处理特殊字符的转义和 Unicode 数据，比较直观。
4. 生产的路径总是绝对路径，可以避免相对路径产生副作用。
5. 如果你的应用是放在 URL 根路径之外的地方（如在 /myapplication 中，不在 / 中），`url_for()` 会为你妥善处理。

例如，这里我们使用 `test_request_context()` 方法来尝试使用 `url_for()`。 `test_request_context()` 告诉 Flask 正在处理一个请求，而实际上也许我们正处在交互 Python shell 之中， 并没有真正的请求。参见[本地环境](https://dormousehole.readthedocs.io/en/latest/quickstart.html#context-locals)。

```py
from flask import Flask, escape, url_for

app = Flask(__name__)

@app.route('/')
def index():
    return 'index'

@app.route('/login')
def login():
    return 'login'

@app.route('/user/<username>')
def profile(username):
    return '{}\'s profile'.format(escape(username))

with app.test_request_context():
    print(url_for('index'))
    print(url_for('login'))
    print(url_for('login', next='/'))
    print(url_for('profile', username='John Doe'))
```

```sh
/
/login
/login?next=/
/user/John%20Doe
```

### HTTP 方法

Web 应用使用不同的 HTTP 方法处理 URL。当你使用 Flask 时，应当熟悉 HTTP 方法。 缺省情况下，一个路由只回应 GET 请求。可以使用 `route()` 装饰器的 methods 参数来处理不同的 HTTP 方法：

```py
from flask import request

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        return do_the_login()
    else:
        return show_the_login_form()
```

如果当前使用了 GET 方法， Flask 会自动添加 HEAD 方法支持，并且同时还会 按照 [HTTP RFC](https://www.ietf.org/rfc/rfc2068.txt) 来处理 HEAD 请求。同样，OPTIONS 也会自动实现。

### 静态文件

动态的 web 应用也需要静态文件，一般是 CSS 和 JavaScript 文件。理想情况下你的 服务器已经配置好了为你的提供静态文件的服务。但是在开发过程中， Flask 也能做好 这项工作。只要在你的包或模块旁边创建一个名为 `static` 的文件夹就行了。 静态文件位于应用的 `/static` 中。

使用特定的 `'static'` 端点就可以生成相应的 URL

```py
url_for('static', filename='style.css')
```

这个静态文件在文件系统中的位置应该是 `static/style.css`。

### 渲染模板

在 Python 内部生成 HTML 不好玩，且相当笨拙。因为你必须自己负责 HTML 转义， 以确保应用的安全。因此， Flask 自动为你配置 [Jinja2](http://jinja.pocoo.org/) 模板引擎。

使用 `render_template()` 方法可以渲染模板，你只要提供模板名称和需要 作为参数传递给模板的变量就行了。下面是一个简单的模板渲染例子：

```py
from flask import render_template

@app.route('/hello/')
@app.route('/hello/<name>')
def hello(name=None):
    return render_template('hello.html', name=name)
```

Flask 会在 `templates` 文件夹内寻找模板。因此，如果你的应用是一个模块， 那么模板文件夹应该在模块旁边；如果是一个包，那么就应该在包里面：

情形1：一个模块

```sh
/application.py
/templates
    /hello.html
```

情形2：一个包

```sh
/application
    /__init__.py
    /templates
        /hello.html
```

你可以充分使用 Jinja2 模板引擎的威力。更多内容，详见官方[Jinja2 模板文档](http://jinja.pocoo.org/docs/templates/)。

模板示例：

```html
<!doctype html>
<title>Hello from Flask</title>
{% if name %}
  <h1>Hello {{ name }}!</h1>
{% else %}
  <h1>Hello, World!</h1>
{% endif %}
```

在模板内部可以和访问 `get_flashed_messages()` 函数一样访问 `request` 、 `session` 和 `g` 对象。

>不理解什么是 `g` 对象？它是某个可以根据需要储存信息的 东西。更多信息参见 [g](https://dormousehole.readthedocs.io/en/latest/api.html#flask.g) 对象的文档和 使用 [SQLite 3](https://dormousehole.readthedocs.io/en/latest/patterns/sqlite3.html#sqlite3) 文档。

模板在继承使用的情况下尤其有用。其工作原理参见 [模板继承](https://dormousehole.readthedocs.io/en/latest/patterns/templateinheritance.html#template-inheritance) 方案文档。简单的说，模板继承可以使每个页面的特定元素（如页头、导航和页尾） 保持一致。

自动转义默认开启。因此，如果 name 包含 HTML ，那么会被自动转义。如果你可以 信任某个变量，且知道它是安全的 HTML （例如变量来自一个把 wiki 标记转换为 HTML 的模块），那么可以使用 `Markup` 类把它标记为安全的，或者在模板 中使用 `|safe` 过滤器。更多例子参见 Jinja 2 文档。

下面 Markup 类的基本使用方法：

```py
>>> from flask import Markup
>>> Markup('<strong>Hello %s!</strong>') % '<blink>hacker</blink>'
Markup(u'<strong>Hello <blink>hacker</blink>!</strong>')
>>> Markup.escape('<blink>hacker</blink>')
Markup(u'<blink>hacker</blink>')
>>> Markup('<em>Marked up</em> » HTML').striptags()
u'Marked up \xbb HTML'
```

### 操作请求数据

对于 web 应用来说对客户端向服务器发送的数据作出响应很重要。在 Flask 中由全局 对象 [request](https://dormousehole.readthedocs.io/en/latest/api.html#flask.request) 来提供请求信息。如果你有一些 Python 基础，那么 可能 会奇怪：既然这个对象是全局的，怎么还能保持线程安全？答案是本地环境：

#### 本地环境

某些对象在 Flask 中是全局对象，但不是通常意义下的全局对象。这些对象实际上是 特定环境下本地对象的代理。真拗口！但还是很容易理解的。

设想现在处于处理线程的环境中。一个请求进来了，服务器决定生成一个新线程（或者 叫其他什么名称的东西，这个下层的东西能够处理包括线程在内的并发系统）。当 Flask 开始其内部请求处理时会把当前线程作为活动环境，并把当前应用和 WSGI 环境绑定到 这个环境（线程）。它以一种聪明的方式使得一个应用可以在不中断的情况下调用另一个应用。

这对你有什么用？基本上你可以完全不必理会。这个只有在做单元测试时才有用。在测试 时会遇到由于没有请求对象而导致依赖于请求的代码会突然崩溃的情况。对策是自己创建 一个请求对象并绑定到环境。最简单的单元测试解决方案是使用 [test_request_context()](https://dormousehole.readthedocs.io/en/latest/api.html#flask.Flask.test_request_context) 环境管理器。通过使用 `with` 语句 可以绑定一个测试请求，以便于交互。例如：

```py
from flask import request

with app.test_request_context('/hello', method='POST'):
    # now you can do something with the request until the
    # end of the with block, such as basic assertions:
    assert request.path == '/hello'
    assert request.method == 'POST'
```

另一种方式是把整个 WSGI 环境传递给 `request_context()` 方法：

```py
from flask import request

with app.request_context(environ):
    assert request.method == 'POST'
```

#### 请求对象

请求对象在 API 一节中有详细说明这里不细谈（参见 [Request](https://dormousehole.readthedocs.io/en/latest/api.html#flask.Request)）。这里简略地谈一下最常见的操作。首先，你必须从 flask 模块导入请求对象：

```py
from flask import request
```

通过使用 [method](https://dormousehole.readthedocs.io/en/latest/api.html#flask.Request.method) 属性可以操作当前请求方法，通过使用 [form](https://dormousehole.readthedocs.io/en/latest/api.html#flask.Request.form) 属性处理表单数据（在 `POST` 或者 `PUT` 请求 中传输的数据）。以下是使用上述两个属性的例子:

```py
@app.route('/login', methods=['POST', 'GET'])
def login():
    error = None
    if request.method == 'POST':
        if valid_login(request.form['username'],
                       request.form['password']):
            return log_the_user_in(request.form['username'])
        else:
            error = 'Invalid username/password'
    # the code below is executed if the request method
    # was GET or the credentials were invalid
    return render_template('login.html', error=error)
```

当 `form` 属性中不存在这个键时会发生什么？会引发一个 [KeyError](https://docs.python.org/3/library/exceptions.html#KeyError)。如果你不像捕捉一个标准错误一样捕捉 `KeyError`，那么会显示一个 HTTP 400 Bad Request 错误页面。因此，多数情况下你不必处理这个问题。

要操作 URL （如 `?key=value`）中提交的参数可以使用 args 属性：

```py
searchword = request.args.get('key', '')
```

用户可能会改变 URL 导致出现一个 400 请求出错页面，这样降低了用户友好度。因此， 我们推荐使用 get 或通过捕捉 KeyError 来访问 URL 参数。

完整的请求对象方法和属性参见 [Request](https://dormousehole.readthedocs.io/en/latest/api.html#flask.Request) 文档。

### 文件上传

用 Flask 处理文件上传很容易，只要确保不要忘记在你的 HTML 表单中设置 `enctype="multipart/form-data"` 属性就可以了。否则浏览器将不会传送你的文件。

已上传的文件被储存在内存或文件系统的临时位置。你可以通过请求对象 `files` 属性来访问上传的文件。每个上传的文件都储存在这个字典型属性中。这个属性基本和标准 Python file 对象一样，另外多出一个用于把上传文件保存到服务器的文件系统中的 `save()` 方法。下例展示其如何运作：

```py
from flask import request

@app.route('/upload', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        f = request.files['the_file']
        f.save('/var/www/uploads/uploaded_file.txt')
    ...
```

如果想要知道文件上传之前其在客户端系统中的名称，可以使用 `filename` 属性。但是请牢记这个值是可以伪造的，永远不要信任这个值。如果想要把客户端的文件名作为服务器上的文件名，可以通过 Werkzeug 提供的 `secure_filename()` 函数：

```py
from flask import request
from werkzeug.utils import secure_filename

@app.route('/upload', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        f = request.files['the_file']
        f.save('/var/www/uploads/' + secure_filename(f.filename))
    ...
```

更好的例子参见[上传文件](https://dormousehole.readthedocs.io/en/latest/patterns/fileuploads.html#uploading-files)方案。

### Cookies

要访问 cookies ，可以使用 [cookies](https://dormousehole.readthedocs.io/en/latest/api.html#flask.Request.cookies) 属性。可以使用响应 对象 的 `set_cookie` 方法来设置 cookies 。请求对象的 cookies 属性是一个包含了客户端传输的所有 cookies 的字典。在 Flask 中，如果使用[会话](https://dormousehole.readthedocs.io/en/latest/quickstart.html#sessions)，那么就不要直接使用 cookies ，因为 会话 比较安全一些。

读取 cookies:

```py
from flask import request

@app.route('/')
def index():
    username = request.cookies.get('username')
    # use cookies.get(key) instead of cookies[key] to not get a
    # KeyError if the cookie is missing.
```

储存 cookies:

```py
from flask import make_response

@app.route('/')
def index():
    resp = make_response(render_template(...))
    resp.set_cookie('username', 'the username')
    return resp
```

注意，cookies 设置在响应对象上。通常只是从视图函数返回字符串， Flask 会把它们 转换为响应对象。如果你想显式地转换，那么可以使用 `make_response()` 函数，然后再修改它。

使用 [延迟的请求回调](https://dormousehole.readthedocs.io/en/latest/patterns/deferredcallbacks.html#deferred-callbacks) 方案可以在没有响应对象的情况下设置一个 cookie 。

同时可以参见 [关于响应](https://dormousehole.readthedocs.io/en/latest/quickstart.html#about-responses) 。

### 重定向和错误

使用 `redirect()` 函数可以重定向。使用 `abort()` 可以 更早退出请求，并返回错误代码：

```py
from flask import abort, redirect, url_for

@app.route('/')
def index():
    return redirect(url_for('login'))

@app.route('/login')
def login():
    abort(401)
    this_is_never_executed()
```

上例实际上是没有意义的，它让一个用户从索引页重定向到一个无法访问的页面（401 表示禁止访问）。但是上例可以说明重定向和出错跳出是如何工作的。

缺省情况下每种出错代码都会对应显示一个黑白的出错页面。使用 `errorhandler()` 装饰器可以定制出错页面：

```py
from flask import render_template

@app.errorhandler(404)
def page_not_found(error):
    return render_template('page_not_found.html'), 404
```

>注意 `render_template()` 后面的 404 ，这表示页面对应的出错代码是 404 ，即页面不存在。缺省情况下 200 表示：一切正常。

详见 [错误处理](https://dormousehole.readthedocs.io/en/latest/errorhandling.html#error-handlers)。

### 关于响应

视图函数的返回值会自动转换为一个响应对象。如果返回值是一个字符串，那么会被 转换为一个包含作为响应体的字符串、一个 `200 OK` 代码 和一个 text/html 类型的响应对象。如果返回值是一个字典，那么会调用 `jsonify()` 来产生一个响应。以下是转换的规则：

1. 如果视图返回的是一个响应对象，那么就直接返回它。
2. 如果返回的是一个字符串，那么根据这个字符串和缺省参数生成一个用于返回的 响应对象。
3. 如果返回的是一个字典，那么调用 `jsonify` 创建一个响应对象。
4. 如果返回的是一个元组，那么元组中的项目可以提供额外的信息。元组中必须至少包含一个项目，且项目应当由 `(response, status)` 、 `(response, headers)` 或者 `(response, status, headers)` 组成。 status 的值会重载状态代码， headers 是一个由额外头部值组成的列表 或字典。
5. 如果以上都不是，那么 Flask 会假定返回值是一个有效的 WSGI 应用并把它转换为 一个响应对象。

如果想要在视图内部掌控响应对象的结果，那么可以使用 `make_response()` 函数。

设想有如下视图：

```py
@app.errorhandler(404)
def not_found(error):
    return render_template('error.html'), 404
```

可以使用 `make_response()` 包裹返回表达式，获得响应对象，并对该对象进行修改，然后再返回：

```py
@app.errorhandler(404)
def not_found(error):
    resp = make_response(render_template('error.html'), 404)
    resp.headers['X-Something'] = 'A value'
    return resp
```

### JSON 格式的 API

JSON 格式的响应是常见的，用 Flask 写这样的 API 是很容易上手的。如果从视图返回一个 `dict`，那么它会被转换为一个 JSON 响应。

```py
@app.route("/me")
def me_api():
    user = get_current_user()
    return {
        "username": user.username,
        "theme": user.theme,
        "image": url_for("user_image", filename=user.image),
    }
```

如果 `dict` 还不能满足需求，还需要创建其他类型的 JSON 格式响应，可以使用 `jsonify()` 函数。该函数会序列化任何支持的 JSON 数据类型。也可以研究研究 Flask 社区扩展，以支持更复杂的应用。

```py
@app.route("/users")
def users_api():
    users = get_all_users()
    return jsonify([user.to_json() for user in users])
```

### 会话

除了请求对象之外还有一种称为 [session](https://dormousehole.readthedocs.io/en/latest/api.html#flask.session) 的对象，允许你在不同请求之间储存信息。这个对象相当于用密钥签名加密的 cookie ，即用户可以查看你的 cookie ，但是如果没有密钥就无法修改它。

使用会话之前你必须设置一个密钥。举例说明：

```py
from flask import Flask, session, redirect, url_for, escape, request

app = Flask(__name__)

# Set the secret key to some random bytes. Keep this really secret!
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'

@app.route('/')
def index():
    if 'username' in session:
        return 'Logged in as %s' % escape(session['username'])
    return 'You are not logged in'

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        session['username'] = request.form['username']
        return redirect(url_for('index'))
    return '''
        <form method="post">
            <p><input type=text name=username>
            <p><input type=submit value=Login>
        </form>
    '''

@app.route('/logout')
def logout():
    # remove the username from the session if it's there
    session.pop('username', None)
    return redirect(url_for('index'))
```

这里用到的 `escape()` 是用来转义的。如果不使用模板引擎就可以像上例一样使用这个函数来转义。

### 如何生成一个好的密钥

生成随机数的关键在于一个好的随机种子，因此一个好的密钥应当有足够的随机性。操作系统可以有多种方式基于密码随机生成器来生成随机数据。使用下面的命令可以快捷的为 `Flask.secret_key`（或者 [SECRET_KEY](https://dormousehole.readthedocs.io/en/latest/config.html#SECRET_KEY)）生成值：

```sh
$ python -c 'import os; print(os.urandom(16))'
b'_5#y2L"F4Q8z\n\xec]/'
```

基于 cookie 的会话的说明：Flask 会取出会话对象中的值，把值序列化后储存到 cookie 中。在打开 cookie 的情况下，如果需要查找某个值，但是这个值在请求中没有持续储存的话，那么不会得到一个清晰的出错信息。请检查页面响应中的 cookie 的大小是否与网络浏览器所支持的大小一致。

除了缺省的客户端会话之外，还有许多 Flask 扩展支持服务端会话。

### 消息闪现

一个好的应用和用户接口都有良好的反馈，否则到后来用户就会讨厌这个应用。 Flask 通过闪现系统来提供了一个易用的反馈方式。闪现系统的基本工作原理是在请求结束时 记录一个消息，提供且只提供给下一个请求使用。通常通过一个布局模板来展现闪现的消息。

`flash()` 用于闪现一个消息。在模板中，使用 `get_flashed_messages()` 来操作消息。完整的例子参见 [消息闪现](https://dormousehole.readthedocs.io/en/latest/patterns/flashing.html#message-flashing-pattern) 。

### 日志

有时候可能会遇到数据出错需要纠正的情况。例如因为用户篡改了数据或客户端代码出错而导致一个客户端代码向服务器发送了明显错误的 HTTP 请求。多数时候在类似情况下返回 `400 Bad Request` 就没事了，但也有不会返回的时候，而代码还得继续运行下去。

这时候就需要使用日志来记录这些不正常的东西了。自从 Flask 0.3 后就已经为你配置好 了一个日志工具。

以下是一些日志调用示例：

```py
app.logger.debug('A value for debugging')
app.logger.warning('A warning occurred (%d apples)', 42)
app.logger.error('An error occurred')
```

[logger](https://dormousehole.readthedocs.io/en/latest/api.html#flask.Flask.logger) 是一个标准的 Logger Logger 类，更多信息详见官方的 [logging 文档](https://docs.python.org/3/library/logging.html#module-logging)。

更多内容请参阅 [应用错误处理](https://dormousehole.readthedocs.io/en/latest/errorhandling.html#application-errors)。

### 集成 WSGI 中间件

如果想要在应用中添加一个 WSGI 中间件，那么可以包装内部的 WSGI 应用。假设为了解决 lighttpd 的错误，你要使用一个来自 Werkzeug 包的中间件，那么可以这样做：

```py
from werkzeug.contrib.fixers import LighttpdCGIRootFix
app.wsgi_app = LighttpdCGIRootFix(app.wsgi_app)
```

### 使用 Flask 扩展

扩展是帮助完成公共任务的包。例如 Flask-SQLAlchemy 为在 Flask 中轻松使用 SQLAlchemy 提供支持。

更多关于 Flask 扩展的内容请参阅 [扩展](https://dormousehole.readthedocs.io/en/latest/extensions.html#extensions) 。

### 部署到网络服务器

已经准备好部署你的新 Flask 应用了？请移步 [部署方式](https://dormousehole.readthedocs.io/en/latest/deploying/index.html#deployment) 。

## 参考

- [Flask 官方文档](https://dormousehole.readthedocs.io/en/latest/)


# Ajax和表单

基于前面章节讲解的知识，我们已经可以使用Django框架来完成Web应用的开发了。接下来我们就尝试实现一个投票应用，具体的需求是用户进入应用首先查看到“学科介绍”页面，该页面显示了一个学校所开设的所有学科；通过点击某个学科，可以进入“老师介绍”页面，该页面展示了该学科所有老师的详细情况，可以在该页面上给老师点击“好评”或“差评”；如果用户没有登录，在投票时会先跳转到“登录页”要求用户登录，登录成功才能投票；对于未注册的用户，可以在“登录页”点击“新用户注册”进入“注册页”完成用户注册操作，注册成功后会跳转到“登录页”，注册失败会获得相应的提示信息。

## 准备工作

由于之前已经详细的讲解了如何创建Django项目以及项目的相关配置，因此我们略过这部分内容，唯一需要说明的是，从上面对投票应用需求的描述中我们可以分析出三个业务实体：学科、老师和用户。学科和老师之间通常是一对多关联关系（一个学科有多个老师，一个老师通常只属于一个学科），用户因为要给老师投票，所以跟老师之间是多对多关联关系（一个用户可以给多个老师投票，一个老师也可以收到多个用户的投票）。首先修改应用下的models.py文件来定义数据模型，先给出学科和老师的模型。

```py
from django.db import models


class Subject(models.Model):
    """学科"""
    no = models.IntegerField(primary_key=True, verbose_name='编号')
    name = models.CharField(max_length=20, verbose_name='名称')
    intro = models.CharField(max_length=511, default='', verbose_name='介绍')
    create_date = models.DateField(null=True, verbose_name='成立日期')
    is_hot = models.BooleanField(default=False, verbose_name='是否热门')

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'tb_subject'
        verbose_name = '学科'
        verbose_name_plural = '学科'


class Teacher(models.Model):
    """老师"""
    no = models.AutoField(primary_key=True, verbose_name='编号')
    name = models.CharField(max_length=20, verbose_name='姓名')
    detail = models.CharField(max_length=1023, default='', blank=True, verbose_name='详情')
    photo = models.CharField(max_length=1023, default='', verbose_name='照片')
    good_count = models.IntegerField(default=0, verbose_name='好评数')
    bad_count = models.IntegerField(default=0, verbose_name='差评数')
    subject = models.ForeignKey(to=Subject, on_delete=models.PROTECT, db_column='sno', verbose_name='所属学科')

    class Meta:
        db_table = 'tb_teacher'
        verbose_name = '老师'
        verbose_name_plural = '老师'
```

模型定义完成后，可以通过“生成迁移”和“执行迁移”来完成关系型数据库中二维表的创建，当然这需要提前启动数据库服务器并创建好对应的数据库，同时我们在项目中已经安装了PyMySQL而且完成了相应的配置，这些内容此处不再赘述。

```sh
(venv)$ python manage.py makemigrations vote
...
(venv)$ python manage.py migrate
...
```

>注意：为了给vote应用生成迁移文件，需要修改Django项目settings.py文件，在INSTALLED_APPS中添加vote应用。

完成模型迁移之后，我们可以直接使用Django提供的后台管理来添加学科和老师信息，这需要先注册模型类和模型管理类。

```py
from django.contrib import admin

from poll2.forms import UserForm
from poll2.models import Subject, Teacher


class SubjectAdmin(admin.ModelAdmin):
    list_display = ('no', 'name', 'create_date', 'is_hot')
    ordering = ('no', )


class TeacherAdmin(admin.ModelAdmin):
    list_display = ('no', 'name', 'detail', 'good_count', 'bad_count', 'subject')
    ordering = ('subject', 'no')


admin.site.register(Subject, SubjectAdmin)
admin.site.register(Teacher, TeacherAdmin)
```

接下来，我们就可以修改views.py文件，通过编写视图函数先实现“学科介绍”页面。

```py
def show_subjects(request):
    """查看所有学科"""
    subjects = Subject.objects.all()
    return render(request, 'subject.html', {'subjects': subjects})
```

至此，我们还需要一个模板页，模板的配置以及模板页中模板语言的用法在之前已经进行过简要的介绍，如果不熟悉可以看看下面的代码，相信这并不是一件困难的事情。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>所有学科信息</title>
    <style>/* 此处略去了层叠样式表的选择器 */</style>
</head>
<body>
    <h1>所有学科</h1>
    <hr>
    {% for subject in subjects %}
    <div>
        <h3>
            <a href="/teachers/?sno={{ subject.no }}">{{ subject.name }}</a>
            {% if subject.is_hot %}
            <img src="/static/images/hot.png" width="32" alt="">
            {% endif %}
        </h3>
        <p>{{ subject.intro }}</p>
    </div>
    {% endfor %}
</body>
</html>
```

在上面的模板中，我们为每个学科添加了一个超链接，点击超链接可以查看该学科的讲师信息，为此需要再编写一个视图函数来处理查看指定学科老师信息。

```py
def show_teachers(request):
    """显示指定学科的老师"""
    try:
        sno = int(request.GET['sno'])
        subject = Subject.objects.get(no=sno)
        teachers = subject.teacher_set.all()
        return render(request, 'teachers.html', {'subject': subject, 'teachers': teachers})
    except (KeyError, ValueError, Subject.DoesNotExist):
        return redirect('/')
```

显示老师信息的模板页。

```html
<!DOCTYPE html>
{% load static %}
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>老师</title>
    <style>/* 此处略去了层叠样式表的选择器 */</style>
</head>
<body>
    <h1>{{ subject.name }}学科老师信息</h1>
    <hr>
    {% if teachers %}
    {% for teacher in teachers %}
    <div>
        <div>
            <img src="{% static teacher.photo %}" alt="">
        </div>
        <div>
            <h3>{{ teacher.name }}</h3>
            <p>{{ teacher.detail }}</p>
            <p class="comment">
                <a href="">好评</a>
                (<span>{{ teacher.good_count }}</span>)
                <a href="">差评</a>
                (<span>{{ teacher.bad_count }}</span>)
            </p>
        </div>
    </div>
    {% endfor %}
    {% else %}
    <h3>暂时没有该学科的老师信息</h3>
    {% endif %}
    <p>
        <a href="/">返回首页</a>
    </p>
</body>
</html>
```

## 加载静态资源

在上面的模板页面中，我们使用了 `<img>` 标签来加载老师的照片，其中使用了引用静态资源的模板指令 `{% static %}`，要使用该指令，首先要使用 `{% load static %}` 指令来加载静态资源，我们将这段代码放在了页码开始的位置。在上面的项目中，我们将静态资源置于名为static的文件夹中，在该文件夹下又创建了三个文件夹：css、js和images，分别用来保存外部层叠样式表、外部JavaScript文件和图片资源。为了能够找到保存静态资源的文件夹，我们还需要修改Django项目的配置文件settings.py，如下所示：

```py
# 此处省略上面的代码

STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static'), ]
STATIC_URL = '/static/'

# 此处省略下面的代码
```

接下来修改urls.py文件，配置用户请求的URL和视图函数的对应关系。

```py
from django.contrib import admin
from django.urls import path

from vote import views

urlpatterns = [
    path('', views.show_subjects),
    path('teachers/', views.show_teachers),
    path('admin/', admin.site.urls),
]
```

启动服务器运行项目，进入首页查看学科信息。

![x](./Resource/show_subjects.png)

点击学科查看老师信息。

![x](./Resource/show_teachers.png)

### Ajax请求

接下来就可以实现“好评”和“差评”的功能了，很明显如果能够在不刷新页面的情况下实现这两个功能会带来更好的用户体验，因此我们考虑使用[Ajax](https://zh.wikipedia.org/wiki/AJAX)技术来实现“好评”和“差评”，Ajax技术我们在Web前端部分已经介绍过了，此处不再赘述。

首先修改项目的urls.py文件，为“好评”和“差评”功能映射对应的URL。

```py
from django.contrib import admin
from django.urls import path

from vote import views

urlpatterns = [
    path('', views.show_subjects),
    path('teachers/', views.show_teachers),
    path('praise/', views.prise_or_criticize),
    path('criticize/', views.prise_or_criticize),
    path('admin/', admin.site.urls),
]
```

设计视图函数praise_or_criticize来支持“好评”和“差评”功能，该视图函数通过Django封装的JsonResponse类将字典序列化成JSON字符串作为返回给浏览器的响应内容。

```py
def praise_or_criticize(request):
    """好评"""
    try:
        tno = int(request.GET['tno'])
        teacher = Teacher.objects.get(no=tno)
        if request.path.startswith('/praise'):
            teacher.good_count += 1
        else:
            teacher.bad_count += 1
        teacher.save()
        data = {'code': 200, 'hint': '操作成功'}
    except (KeyError, ValueError, Teacher.DoseNotExist):
        data = {'code': 404, 'hint': '操作失败'}
    return JsonResponse(data)
```

修改显示老师信息的模板页，引入jQuery库来实现事件处理、Ajax请求和DOM操作。

```html
<!DOCTYPE html>
{% load static %}
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>老师</title>
    <style>/* 此处略去了层叠样式表的选择器 */</style>
</head>
<body>
    <h1>{{ subject.name }}学科老师信息</h1>
    <hr>
    {% if teachers %}
    {% for teacher in teachers %}
    <div class="teacher">
        <div class="photo">
            <img src="{% static teacher.photo %}" height="140" alt="">
        </div>
        <div class="info">
            <h3>{{ teacher.name }}</h3>
            <p>{{ teacher.detail }}</p>
            <p class="comment">
                <a href="/praise/?tno={{ teacher.no }}">好评</a>
                (<span>{{ teacher.good_count }}</span>)
                &nbsp;&nbsp;
                <a href="/criticize/?tno={{ teacher.no }}">差评</a>
                (<span>{{ teacher.bad_count }}</span>)
            </p>
        </div>
    </div>
    {% endfor %}
    {% else %}
    <h3>暂时没有该学科的老师信息</h3>
    {% endif %}
    <p>
        <a href="/">返回首页</a>
    </p>
    <script src="https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js"></script>
    <script>
        $(() => {
            $('.comment>a').on('click', (evt) => {
                evt.preventDefault()
                let anchor = $(evt.target)
                let url = anchor.attr('href')
                $.getJSON(url, (json) => {
                    if (json.code == 10001) {
                        let span = anchor.next()
                        span.text(parseInt(span.text()) + 1)
                    } else {
                        alert(json.hint)
                    }
                })
            })
        })
    </script>
</body>
</html>
```

到此为止，这个投票项目的核心功能已然完成，在下面的章节中我们会要求用户必须登录才能投票，没有账号的用户可以通过注册功能注册一个账号。

## 表单的应用

我们继续来实现“用户注册”和“用户登录”的功能，并限制只有登录的用户才能为老师投票。Django框架中提供了对表单的封装，而且提供了多种不同的使用方式。

首先添加用户模型。

```py
class User(models.Model):
    """用户"""
    no = models.AutoField(primary_key=True, verbose_name='编号')
    username = models.CharField(max_length=20, unique=True, verbose_name='用户名')
    password = models.CharField(max_length=32, verbose_name='密码')
    regdate = models.DateTimeField(auto_now_add=True, verbose_name='注册时间')

    class Meta:
        db_table = 'tb_user'
        verbose_name_plural = '用户'
```

通过生成迁移和执行迁移操作，在数据库中创建对应的用户表。

```sh
(venv)$ python manage.py makemigrations vote
...
(venv)$ python manage.py migrate
...
```

定制一个非常简单的注册模板页面。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>用户注册</title>
    <style>/* 此处省略层叠样式表选择器 */</style>
</head>
<body>
    <h1>用户注册</h1>
    <hr>
    <p class="hint">{{ hint }}</p>
    <form action="/register/" method="post">
        {% csrf_token %}
        <div class="input">
            <label for="username">用户名：</label>
            <input type="text" id="username" name="username">
        </div>
        <div class="input">
            <label for="password">密码：</label>
            <input type="password" id="password" name="password">
        </div>
        <div class="input">
            <label for="repassword">确认密码：</label>
            <input type="password" id="repassword" name="repassword">
        </div>
        <div class="input">
            <input type="submit" value="注册">
            <input type="reset" value="重置">
        </div>
    </form>
    <a href="/login">返回登录</a>
</body>
</html>
```

注意，在上面的表单中，我们使用了模板指令 `{% csrf_token %}` 为表单添加一个隐藏域（type属性值为hidden的input标签），它的作用是在表单中生成一个随机令牌（token）来防范[跨站请求伪造](https://zh.wikipedia.org/wiki/%E8%B7%A8%E7%AB%99%E8%AF%B7%E6%B1%82%E4%BC%AA%E9%80%A0)（通常简称为CSRF），这也是Django在提交表单时的硬性要求，除非我们设置了免除CSRF令牌。下图是一个关于CSRF简单生动的例子，它来自于[维基百科](https://zh.wikipedia.org/wiki/Wikipedia:%E9%A6%96%E9%A1%B5)。

![x](./Resource/CSRF.png)

用户在提交注册表单时，我们还需要对用户的输入进行验证，例如我们的网站要求用户名必须由字母、数字、下划线构成且长度在4-20个字符之间，密码的长度为8-20个字符，确认密码必须跟密码保持一致。这些验证操作首先可以通过浏览器中的JavaScript代码来完成，但是即便如此，在服务器端仍然要对用户输入再次进行验证来避免将无效的数据库交给数据库，因为用户可能会禁用浏览器的JavaScript功能，也有可能绕过浏览器的输入检查将注册数据提交给服务器，所以服务器端的用户输入检查仍然是必要的。

我们可以利用Django框架封装的表单功能来对用户输入的有效性进行检查，虽然Django封装的表单还能帮助我们定制出页面上的表单元素，但这显然是一种灵活性很差的设计，这样的功能在实际开发中基本不考虑，所以表单主要的作用就在于数据验证，具体的做法如下所示。

```py
USERNAME_PATTERN = re.compile(r'\w{4,20}')

class RegisterForm(forms.ModelForm):
    repassword = forms.CharField(min_length=8, max_length=20)
    
    def clean_username(self):
        username = self.cleaned_data['username']
        if not USERNAME_PATTERN.fullmatch(username):
            raise ValidationError('用户名由字母、数字和下划线构成且长度为4-20个字符')
        return username
        
    def clean_password(self):
        password = self.cleaned_data['password']
        if len(password) < 8 or len(password) > 20:
            raise ValidationError('无效的密码，密码长度为8-20个字符')
        return to_md5_hex(self.cleaned_data['password'])

    def clean_repassword(self):
        repassword = to_md5_hex(self.cleaned_data['repassword'])
        if repassword != self.cleaned_data['password']:
            raise ValidationError('密码和确认密码不一致')
        return repassword

    class Meta:
        model = User
        exclude = ('no', 'regdate')
```

上面，我们定义了一个与User模型绑定的表单（继承自ModelForm），我们排除了用户编号（no）和注册日期（regdate）这两个属性，并添加了一个repassword属性用来接收从用户表单传给服务器的确认密码。我们在定义User模型时已经对用户名的最大长度进行了限制，上面我们又对确认密码的最小和最大长度进行了限制，但是这些都不足以完成我们对用户输入的验证。上面以clean_打头的方法就是我们自定义的验证规则。很明显，clean_username是对用户名的检查，而clean_password是对密码的检查。由于数据库二维表中不应该保存密码的原文，所以对密码做了一个简单的MD5摘要处理，实际开发中如果只做出这样的处理还不太够，因为即便使用了摘要，仍然有利用彩虹表反向查询破解用户密码的风险，如何做得更好我们会在后续的内容中讲到。为字符串生成MD5摘要的代码如下所示。

```py
def to_md5_hex(message):
    return hashlib.md5(message.encode()).hexdigest()
```

新增一个视图函数实现用户注册的功能。

```py
def register(request):
    page, hint = 'register.html', ''
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            form.save()
            page = 'login.html'
            hint = '注册成功，请登录'
        else:
            hint = '请输入有效的注册信息'
    return render(request, page, {'hint': hint})
```

如果用户发起GET请求，将直接跳转到注册的页面；如果用户以POST方式提交注册表单，则创建自定义的注册表单对象并获取用户输入。可以通过表单对象的is_valid方法对表单进行验证，如果用户输入没有问题，该方法返回True，否则返回False；由于我们定义的RegisterForm继承自ModelForm，因此也可以直接使用表单对象的save方法来保存模型。下面是注册请求的URL配置。

```py
from django.contrib import admin
from django.urls import path

from vote import views

urlpatterns = [
	# 此处省略上面的代码
    path('register/', views.register, name='register'),
    # 此处省略下面的代码
]
```

>说明：path函数可以通过name参数给URL绑定一个逆向解析的名字，也就是说，如果需要可以从后面给的名字逆向解析出对应的URL。

我们再来定制一个非常简单的登录页。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>用户登录</title>
    <style>/* 此处省略层叠样式表选择器 */</style>
</head>
<body>
    <h1>用户登录</h1>
    <hr>
    <p class="hint">{{ hint }}</p>
    <form action="/login/" method="post">
        {% csrf_token %}
        <div class="input">
            <label for="username">用户名：</label>
            <input type="text" id="username" name="username">
        </div>
        <div class="input">
            <label for="password">密码：</label>
            <input type="password" id="password" name="password">
        </div>
        <div class="input captcha">
            <label for="captcha">验证码：</label>
            <input type="text" id="captcha" name="captcha">
            <img src="/captcha/" width="120">
        </div>
        <div class="input">
            <input type="submit" value="登录">
            <input type="reset" value="重置">
        </div>
    </form>
    <a href="/register">注册新用户</a>
</body>
</html>
```

上面的登录页中，我们要求用户提供验证码，验证码全称是**全自动区分计算机和人类的公开图灵测试**，它是一种用来区分系统的使用者是计算机还是人类的程序。简单的说就是程序出一个只有人类能够回答的问题，由系统使用者来解答，由于计算机理论上无法解答程序提出的问题，所以回答出问题的用户就可以被认为是人类。大多数的网站都使用了不同类型的验证码技术来防范用程序自动注册用户或模拟用户登录（暴力破解用户密码），因为验证码具有一次消费性，而没有通过图灵测试的程序是不能够完成注册或登录的。

在Python程序中生成验证码并不算特别复杂，但需要三方库Pillow的支持（PIL的分支），因为要对验证码图片进行旋转、扭曲、拉伸以及加入干扰信息来防范那些用OCR（光学文字识别）破解验证码的程序。下面的代码封装了生成验证码图片的功能，大家可以直接用这些代码来生成图片验证码，不要“重复发明轮子”。

```py
"""
图片验证码
"""
import os
import random

from io import BytesIO

from PIL import Image
from PIL import ImageFilter
from PIL.ImageDraw import Draw
from PIL.ImageFont import truetype


class Bezier(object):
    """贝塞尔曲线"""

    def __init__(self):
        self.tsequence = tuple([t / 20.0 for t in range(21)])
        self.beziers = {}

    def make_bezier(self, n):
        """绘制贝塞尔曲线"""
        try:
            return self.beziers[n]
        except KeyError:
            combinations = pascal_row(n - 1)
            result = []
            for t in self.tsequence:
                tpowers = (t ** i for i in range(n))
                upowers = ((1 - t) ** i for i in range(n - 1, -1, -1))
                coefs = [c * a * b for c, a, b in zip(combinations,
                                                      tpowers, upowers)]
                result.append(coefs)
            self.beziers[n] = result
            return result


class Captcha(object):
    """验证码"""

    def __init__(self, width, height, fonts=None, color=None):
        self._image = None
        self._fonts = fonts if fonts else \
            [os.path.join(os.path.dirname(__file__), 'fonts', font)
             for font in ['ArialRB.ttf', 'ArialNI.ttf', 'Georgia.ttf', 'Kongxin.ttf']]
        self._color = color if color else random_color(0, 200, random.randint(220, 255))
        self._width, self._height = width, height

    @classmethod
    def instance(cls, width=200, height=75):
        prop_name = f'_instance_{width}_{height}'
        if not hasattr(cls, prop_name):
            setattr(cls, prop_name, cls(width, height))
        return getattr(cls, prop_name)

    def background(self):
        """绘制背景"""
        Draw(self._image).rectangle([(0, 0), self._image.size],
                                    fill=random_color(230, 255))

    def smooth(self):
        """平滑图像"""
        return self._image.filter(ImageFilter.SMOOTH)

    def curve(self, width=4, number=6, color=None):
        """绘制曲线"""
        dx, height = self._image.size
        dx /= number
        path = [(dx * i, random.randint(0, height))
                for i in range(1, number)]
        bcoefs = Bezier().make_bezier(number - 1)
        points = []
        for coefs in bcoefs:
            points.append(tuple(sum([coef * p for coef, p in zip(coefs, ps)])
                                for ps in zip(*path)))
        Draw(self._image).line(points, fill=color if color else self._color, width=width)

    def noise(self, number=50, level=2, color=None):
        """绘制扰码"""
        width, height = self._image.size
        dx, dy = width / 10, height / 10
        width, height = width - dx, height - dy
        draw = Draw(self._image)
        for i in range(number):
            x = int(random.uniform(dx, width))
            y = int(random.uniform(dy, height))
            draw.line(((x, y), (x + level, y)),
                      fill=color if color else self._color, width=level)

    def text(self, captcha_text, fonts, font_sizes=None, drawings=None, squeeze_factor=0.75, color=None):
        """绘制文本"""
        color = color if color else self._color
        fonts = tuple([truetype(name, size)
                       for name in fonts
                       for size in font_sizes or (65, 70, 75)])
        draw = Draw(self._image)
        char_images = []
        for c in captcha_text:
            font = random.choice(fonts)
            c_width, c_height = draw.textsize(c, font=font)
            char_image = Image.new('RGB', (c_width, c_height), (0, 0, 0))
            char_draw = Draw(char_image)
            char_draw.text((0, 0), c, font=font, fill=color)
            char_image = char_image.crop(char_image.getbbox())
            for drawing in drawings:
                d = getattr(self, drawing)
                char_image = d(char_image)
            char_images.append(char_image)
        width, height = self._image.size
        offset = int((width - sum(int(i.size[0] * squeeze_factor)
                                  for i in char_images[:-1]) -
                      char_images[-1].size[0]) / 2)
        for char_image in char_images:
            c_width, c_height = char_image.size
            mask = char_image.convert('L').point(lambda i: i * 1.97)
            self._image.paste(char_image,
                        (offset, int((height - c_height) / 2)),
                        mask)
            offset += int(c_width * squeeze_factor)

    @staticmethod
    def warp(image, dx_factor=0.3, dy_factor=0.3):
        """图像扭曲"""
        width, height = image.size
        dx = width * dx_factor
        dy = height * dy_factor
        x1 = int(random.uniform(-dx, dx))
        y1 = int(random.uniform(-dy, dy))
        x2 = int(random.uniform(-dx, dx))
        y2 = int(random.uniform(-dy, dy))
        warp_image = Image.new(
            'RGB',
            (width + abs(x1) + abs(x2), height + abs(y1) + abs(y2)))
        warp_image.paste(image, (abs(x1), abs(y1)))
        width2, height2 = warp_image.size
        return warp_image.transform(
            (width, height),
            Image.QUAD,
            (x1, y1, -x1, height2 - y2, width2 + x2, height2 + y2, width2 - x2, -y1))

    @staticmethod
    def offset(image, dx_factor=0.1, dy_factor=0.2):
        """图像偏移"""
        width, height = image.size
        dx = int(random.random() * width * dx_factor)
        dy = int(random.random() * height * dy_factor)
        offset_image = Image.new('RGB', (width + dx, height + dy))
        offset_image.paste(image, (dx, dy))
        return offset_image

    @staticmethod
    def rotate(image, angle=25):
        """图像旋转"""
        return image.rotate(random.uniform(-angle, angle),
                            Image.BILINEAR, expand=1)

    def generate(self, captcha_text='', fmt='PNG'):
        """生成验证码(文字和图片)"""
        self._image = Image.new('RGB', (self._width, self._height), (255, 255, 255))
        self.background()
        self.text(captcha_text, self._fonts,
                  drawings=['warp', 'rotate', 'offset'])
        self.curve()
        self.noise()
        self.smooth()
        image_bytes = BytesIO()
        self._image.save(image_bytes, format=fmt)
        return image_bytes.getvalue()


def pascal_row(n=0):
    """生成Pascal三角第n行"""
    result = [1]
    x, numerator = 1, n
    for denominator in range(1, n // 2 + 1):
        x *= numerator
        x /= denominator
        result.append(x)
        numerator -= 1
    if n & 1 == 0:
        result.extend(reversed(result[:-1]))
    else:
        result.extend(reversed(result))
    return result


def random_color(start=0, end=255, opacity=255):
    """获得随机颜色"""
    red = random.randint(start, end)
    green = random.randint(start, end)
    blue = random.randint(start, end)
    if opacity is None:
        return red, green, blue
    return red, green, blue, opacity
```

>说明：上面的代码在生成验证码图片时用到了三种字体文件，使用上面的代码时需要添加字体文件到应用目录下的fonts目录中。

下面的视图函数用来生成验证码并通过HttpResponse对象输出到用户浏览器中。

```py
ALL_CHARS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'


def get_captcha_text(length=4):
    selected_chars = random.choices(ALL_CHARS, k=length)
    return ''.join(selected_chars)


def get_captcha(request):
    """获得验证码"""
    captcha_text = get_captcha_text()
    image = Captcha.instance().generate(captcha_text)
    return HttpResponse(image, content_type='image/png')
```

生成的验证码如下图所示。

![x](./Resource/captcha.png)

为了验证用户提交的登录表单，我们再定义个表单类。

```py
class LoginForm(forms.Form):
    username = forms.CharField(min_length=4, max_length=20)
    password = forms.CharField(min_length=8, max_length=20)
    captcha = forms.CharField(min_length=4, max_length=4)

    def clean_username(self):
        username = self.cleaned_data['username']
        if not USERNAME_PATTERN.fullmatch(username):
            raise ValidationError('无效的用户名')
        return username

    def clean_password(self):
        return to_md5_hex(self.cleaned_data['password'])
```

跟之前我们定义的注册表单类略有区别，登录表单类直接继承自Form没有跟模型绑定，定义了三个字段分别对应登录表单中的用户名、密码和验证码。接下来是处理用户登录的视图函数。

```py
def login(request):
    hint = ''
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = User.objects.filter(username=username, password=password).first()
            if user:
                return redirect('/')
            else:
                hint = '用户名或密码错误'
        else:
            hint = '请输入有效的登录信息'
    return render(request, 'login.html', {'hint': hint})
```

映射URL。

```py
from django.contrib import admin
from django.urls import path

from vote import views

urlpatterns = [
	# 此处省略上面的代码
    path('login/', views.login, name='login'),
    # 此处省略下面的代码
]
```

需要指出，上面我们设定用户登录成功时直接返回首页，而且在用户登录时并没有验证用户输入的验证码是否正确，这些我们留到下一个单元再为大家讲解。另外，如果要在Django自带的管理后台中进行表单验证，可以在admin.py的模型管理类中指定form属性为自定义的表单即可，例如：

```py
class UserForm(forms.ModelForm):
    password = forms.CharField(min_length=8, max_length=20,
                               widget=forms.PasswordInput, label='密码')

    def clean_username(self):
        username = self.cleaned_data['username']
        if not USERNAME_PATTERN.fullmatch(username):
            raise ValidationError('用户名由字母、数字和下划线构成且长度为4-20个字符')
        return username
        
    def clean_password(self):
        password = self.cleaned_data['password']
        return to_md5_hex(self.cleaned_data['password'])

    class Meta:
        model = User
        exclude = ('no', )


class UserAdmin(admin.ModelAdmin):
    list_display = ('no', 'username', 'password', 'email', 'tel')
    ordering = ('no', )
    form = UserForm
    list_per_page = 10


admin.site.register(User, UserAdmin)
```

# 身份认证&报表&日志

## Cookie和Session

### 实现用户跟踪

如今，一个网站如果不通过某种方式记住你是谁以及你之前在网站的活动情况，失去的就是网站的可用性和便利性，继而很有可能导致网站用户的流失，所以记住一个用户（更专业的说法叫**用户跟踪**）对绝大多数Web应用来说都是必需的功能。

在服务器端，我们想记住一个用户最简单的办法就是创建一个对象，通过这个对象就可以把用户相关的信息都保存起来，这个对象就是我们常说的session（用户会话对象）。那么问题来了，HTTP本身是一个无连接（每次请求和响应的过程中，服务器一旦完成对客户端请求的响应之后就断开连接）、无状态（客户端再次发起对服务器的请求时，服务器无法得知这个客户端之前的任何信息）的协议，即便服务器通过session对象保留了用户数据，还得通过某种方式来确定当前的请求与之前保存过的哪一个session是有关联的。相信很多人都能想到，我们可以给每个session对象分配一个全局唯一的标识符来识别session对象，我们姑且称之为sessionid，每次客户端发起请求时，只要携带上这个sessionid，就有办法找到与之对应的session对象，从而实现在两次请求之间记住该用户的信息，也就是我们之前说的用户跟踪。

要让客户端记住并在每次请求时带上sessionid又有以下几种做法：

1. URL重写。所谓URL重写就是在URL中携带sessionid，例如：`http://www.example.com/index.html?sessionid=123456`，服务器通过获取sessionid参数的值来取到与之对应的session对象。

2. 隐藏域（隐式表单域）。在提交表单的时候，可以通过在表单中设置隐藏域向服务器发送额外的数据。例如：`<input type="hidden" name="sessionid" value="123456">`。

3. 本地存储。现在的浏览器都支持多种本地存储方案，包括：cookie、localStorage、sessionStorage、IndexedDB等。在这些方案中，cookie是历史最为悠久也是被诟病得最多的一种方案，也是我们接下来首先为大家讲解的一种方案。简单的说，cookie是一种以键值对方式保存在浏览器临时文件中的数据，每次请求时，请求头中会携带本站点的cookie到服务器，那么只要将sessionid写入cookie，下次请求时服务器只要读取请求头中的cookie就能够获得这个sessionid，如下图所示。

![x](./Resource/sessionid_from_cookie.png)

在HTML5时代，除了cookie，还可以使用新的本地存储API来保存数据，就是刚才提到的localStorage、sessionStorage、IndexedDB等技术，如下图所示。

![x](./Resource/cookie_xstorage_indexeddb.png)

## Django框架对session的支持

在创建Django项目时，默认的配置文件 `settings.py` 文件中已经激活了一个名为 `SessionMiddleware` 的中间件（关于中间件的知识我们在下一个章节做详细的讲解，这里只需要知道它的存在即可），因为这个中间件的存在，我们可以直接通过请求对象的 `session` 属性来操作会话对象。`session` 属性是一个像字典一样可以读写数据的容器对象，因此我们可以使用“键值对”的方式来保留用户数据。与此同时，`SessionMiddleware` 中间件还封装了对 `cookie` 的操作，在 `cookie` 中保存了 `sessionid`，就如同我们之前描述的那样。

在默认情况下，Django将session的数据序列化后保存在关系型数据库中，在Django 1.6以后的版本中，默认的序列化数据的方式是JSON序列化，而在此之前一直使用Pickle序列化。JSON序列化和Pickle序列化的差别在于前者将对象序列化为字符串（字符形式），而后者将对象序列化为字节串（二进制形式），因为安全方面的原因，JSON序列化成为了目前Django框架默认序列化数据的方式，这就要求在我们保存在session中的数据必须是能够JSON序列化的，否则就会引发异常。还有一点需要说明的是，使用关系型数据库保存session中的数据在大多数时候并不是最好的选择，因为数据库可能会承受巨大的压力而成为系统性能的瓶颈，在后面的章节中我们会告诉大家如何将session的数据保存到缓存服务中。

我们继续完善之前的投票应用，前一个章节中我们实现了用户的登录和注册，下面我们首先完善登录时对验证码的检查。

```py
def get_captcha(request):
    """验证码"""
    captcha_text = random_captcha_text()
    request.session['captcha'] = captcha_text
    image_data = Captcha.instance().generate(captcha_text)
    return HttpResponse(image_data, content_type='image/png')
```

注意上面代码中的第4行，我们将随机生成的验证码字符串保存到session中，稍后用户登录时，我们要将保存在session中的验证码字符串和用户输入的验证码字符串进行比对，如果用户输入了正确的验证码才能够执行后续的登录流程，代码如下所示。

```py
def login(request: HttpRequest):
    """登录"""
    hint = ''
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            # 对验证码的正确性进行验证
            captcha_from_user = form.cleaned_data['captcha']
            captcha_from_sess = request.session.get('captcha', '')
            if captcha_from_sess.lower() != captcha_from_user.lower():
                hint = '请输入正确的验证码'
            else:
                username = form.cleaned_data['username']
                password = form.cleaned_data['password']
                user = User.objects.filter(username=username, password=password).first()
                if user:
                    # 登录成功后将用户编号和用户名保存在session中
                    request.session['userid'] = user.no
                    request.session['username'] = user.username
                    return redirect('/')
                else:
                    hint = '用户名或密码错误'
        else:
            hint = '请输入有效的登录信息'
    return render(request, 'login.html', {'hint': hint})
```

上面的代码中，我们设定了登录成功后会在session中保存用户的编号（userid）和用户名（username），页面会重定向到首页。接下来我们可以稍微对首页的代码进行调整，在页面的右上角显示出登录用户的用户名。我们将这段代码单独写成了一个名为header.html的HTML文件，首页中可以通过在<body>标签中添加{% include 'header.html' %}来包含这个页面，代码如下所示。

```html
<div class="user">
    {% if request.session.userid %}
    <span>{{ request.session.username }}</span>
    <a href="/logout">注销</a>
    {% else %}
    <a href="/login">登录</a>&nbsp;&nbsp;
    {% endif %}
    <a href="/register">注册</a>
</div>
```

如果用户没有登录，页面会显示登录和注册的超链接；而用户登录成功后，页面上会显示用户名和注销的链接，注销链接对应的视图函数如下所示，URL的映射与之前讲过的类似，不再赘述。

```py
def logout(request):
    """注销"""
    request.session.flush()
    return redirect('/')
```

上面的代码通过session对象flush方法来销毁session，一方面清除了服务器上session对象保存的用户数据，一方面将保存在浏览器cookie中的sessionid删除掉，稍后我们会对如何读写cookie的操作加以说明。

我们可以通过项目使用的数据库中名为django_session 的表来找到所有的session，该表的结构如下所示：

session_key|session_data|expire_date
-|-|-
c9g2gt5cxo0k2evykgpejhic5ae7bfpl|MmI4YzViYjJhOGMyMDJkY2M5Yzg3...|2019-05-25 23:16:13.898522

其中，第1列就是浏览器cookie中保存的sessionid；第2列是经过BASE64编码后的session中的数据，如果使用Python的base64对其进行解码，解码的过程和结果如下所示。

```py
>>> import base64
>>> base64.b64decode('MmI4YzViYjJhOGMyMDJkY2M5Yzg3ZWIyZGViZmUzYmYxNzdlNDdmZjp7ImNhcHRjaGEiOiJzS3d0Iiwibm8iOjEsInVzZXJuYW1lIjoiamFja2ZydWVkIn0=')    
'2b8c5bb2a8c202dcc9c87eb2debfe3bf177e47ff:{"captcha":"sKwt","no":1,"username":"jackfrued"}'
```

第3列是session的过期时间，session过期后浏览器保存的cookie中的sessionid就会失效，但是数据库中的这条对应的记录仍然会存在，如果想清除过期的数据，可以使用下面的命令。

```py
python manage.py clearsessions
```

Django框架默认的session过期时间为两周（1209600秒），如果想修改这个时间，可以在项目的配置文件中添加如下所示的代码。

```sh
# 配置会话的超时时间为1天（86400秒）
SESSION_COOKIE_AGE = 86400
```

有很多对安全性要求较高的应用都必须在关闭浏览器窗口时让会话过期，不再保留用户的任何信息，如果希望在关闭浏览器窗口时就让会话过期（cookie中的sessionid失效），可以加入如下所示的配置。

```sh
# 设置为True在关闭浏览器窗口时session就过期
SESSION_EXPIRE_AT_BROWSER_CLOSE = True
```

如果不希望将session的数据保存在数据库中，可以将其放入缓存中，对应的配置如下所示，缓存的配置和使用我们在后面讲解。

```py
# 配置将会话对象放到缓存中存储
SESSION_ENGINE = 'django.contrib.sessions.backends.cache'
# 配置使用哪一组缓存来保存会话
SESSION_CACHE_ALIAS = 'default'
```

如果要修改session数据默认的序列化方式，可以将默认的JSONSerializer修改为PickleSerializer。

```py
SESSION_SERIALIZER = 'django.contrib.sessions.serializers.PickleSerializer'
```

## 在视图函数中读写cookie

Django封装的HttpRequest和HttpResponse对象分别提供了读写cookie的操作。

HttpRequest封装的属性和方法：

1. COOKIES属性 - 该属性包含了HTTP请求携带的所有cookie。
2. get_signed_cookie方法 - 获取带签名的cookie，如果签名验证失败，会产生BadSignature异常。

HttpResponse封装的方法：

1. set_cookie方法 - 该方法可以设置一组键值对并将其最终将写入浏览器。
2. set_signed_cookie方法 - 跟上面的方法作用相似，但是会对cookie进行签名来达到防篡改的作用。因为如果篡改了cookie中的数据，在不知道[密钥](https://zh.wikipedia.org/wiki/%E5%AF%86%E9%92%A5)和[盐](https://zh.wikipedia.org/wiki/%E7%9B%90_(%E5%AF%86%E7%A0%81%E5%AD%A6))的情况下是无法生成有效的签名，这样服务器在读取cookie时会发现数据与签名不一致从而产生BadSignature异常。需要说明的是，这里所说的密钥就是我们在Django项目配置文件中指定的SECRET_KEY，而盐是程序中设定的一个字符串，你愿意设定为什么都可以，只要是一个有效的字符串。

上面提到的方法，如果不清楚它们的具体用法，可以自己查阅一下Django的[官方文档](https://docs.djangoproject.com/en/2.1/ref/request-response/)，没有什么资料比官方文档能够更清楚的告诉你这些方法到底如何使用。

刚才我们说过了，激活SessionMiddleware之后，每个HttpRequest对象都会绑定一个session属性，它是一个类似字典的对象，除了保存用户数据之外还提供了检测浏览器是否支持cookie的方法，包括：

1. set_test_cookie方法 - 设置用于测试的cookie。
2. test_cookie_worked方法 - 检测测试cookie是否工作。
3. delete_test_cookie方法 - 删除用于测试的cookie。
4. set_expiry方法 - 设置会话的过期时间。
5. get_expire_age/get_expire_date方法 - 获取会话的过期时间。
6. clear_expired方法 - 清理过期的会话。

下面是在执行登录之前检查浏览器是否支持cookie的代码。

```py
def login(request):
    if request.method == 'POST':
        if request.session.test_cookie_worked():
            request.session.delete_test_cookie()
            # Add your code to perform login process here
        else:
            return HttpResponse("Please enable cookies and try again.")
    request.session.set_test_cookie()
    return render_to_response('login.html')
```

## Cookie的替代品

之前我们说过了，cookie的名声一直都不怎么好，当然我们在实际开发中是不会在cookie中保存用户的敏感信息（如用户的密码、信用卡的账号等）的，而且保存在cookie中的数据一般也会做好编码和签名的工作。即便如此，HTML5中还是给出了用于替代cookie的技术方案，其中使用得最为广泛的就是localStorage和sessionStorage，相信从名字上你就能听出二者的差别，存储在localStorage的数据可以长期保留；而存储在sessionStorage的数据会在浏览器关闭时会被清除 。关于这些cookie替代品的用法，建议大家查阅[MDN](https://developer.mozilla.org/zh-CN/docs/Web)来进行了解。

## 报表和日志

### 导出Excel报表

报表就是用表格、图表等格式来动态显示数据，所以有人用这样的公式来描述报表：

```md
报表 = 多样的格式 + 动态的数据
```

有很多的三方库支持在Python程序中写Excel文件，包括[xlwt](https://xlwt.readthedocs.io/en/latest/)、[xlwings](https://docs.xlwings.org/en/latest/quickstart.html)、[openpyxl](https://openpyxl.readthedocs.io/en/latest/)、[xlswriter](https://xlsxwriter.readthedocs.io/)、[pandas](http://pandas.pydata.org/)等，其中的xlwt虽然只支持写xls格式的Excel文件，但在性能方面的表现还是不错的。下面我们就以xlwt为例，来演示如何在Django项目中导出Excel报表，例如导出一个包含所有老师信息的Excel表格。

```py
def export_teachers_excel(request):
    # 创建工作簿
    wb = xlwt.Workbook()
    # 添加工作表
    sheet = wb.add_sheet('老师信息表')
    # 查询所有老师的信息(注意：这个地方稍后需要优化)
    queryset = Teacher.objects.all()
    # 向Excel表单中写入表头
    colnames = ('姓名', '介绍', '好评数', '差评数', '学科')
    for index, name in enumerate(colnames):
        sheet.write(0, index, name)
    # 向单元格中写入老师的数据
    props = ('name', 'detail', 'good_count', 'bad_count', 'subject')
    for row, teacher in enumerate(queryset):
        for col, prop in enumerate(props):
            value = getattr(teacher, prop, '')
            if isinstance(value, Subject):
                value = value.name
            sheet.write(row + 1, col, value)
    # 保存Excel
    buffer = BytesIO()
    wb.save(buffer)
    # 将二进制数据写入响应的消息体中并设置MIME类型
    resp = HttpResponse(buffer.getvalue(), content_type='application/vnd.ms-excel')
    # 中文文件名需要处理成百分号编码
    filename = quote('老师.xls')
    # 通过响应头告知浏览器下载该文件以及对应的文件名
    resp['content-disposition'] = f'attachment; filename="{filename}"'
    return resp
```

映射URL。

```py
urlpatterns = [
    # 此处省略上面的代码
    path('excel/', views.export_teachers_excel),
    # 此处省略下面的代码
]
```

## 生成前端统计图表

如果项目中需要生成前端统计图表，可以使用百度的[ECharts](https://echarts.baidu.com/)。具体的做法是后端通过提供数据接口返回统计图表所需的数据，前端使用ECharts来渲染出柱状图、折线图、饼图、散点图等图表。例如我们要生成一个统计所有老师好评数和差评数的报表，可以按照下面的方式来做。

```py
def get_teachers_data(request):
    # 查询所有老师的信息(注意：这个地方稍后也需要优化)
    queryset = Teacher.objects.all()
    # 用生成式将老师的名字放在一个列表中
    names = [teacher.name for teacher in queryset]
    # 用生成式将老师的好评数放在一个列表中
    good = [teacher.good_count for teacher in queryset]
    # 用生成式将老师的差评数放在一个列表中
    bad = [teacher.bad_count for teacher in queryset]
    # 返回JSON格式的数据
    return JsonResponse({'names': names, 'good': good, 'bad': bad})
```

映射URL。

```py
urlpatterns = [
    # 此处省略上面的代码
    path('teachers_data/', views.export_teachers_excel),
    # 此处省略下面的代码
]
```

使用ECharts生成柱状图。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>老师评价统计</title>
</head>
<body>
    <div id="main" style="width: 600px; height: 400px"></div>
    <p>
        <a href="/">返回首页</a>
    </p>
    <script src="https://cdn.bootcss.com/echarts/4.2.1-rc1/echarts.min.js"></script>
    <script>
        var myChart = echarts.init(document.querySelector('#main'))
        fetch('/teachers_data/')
            .then(resp => resp.json())
            .then(json => {
                var option = {
                    color: ['#f00', '#00f'],
                    title: {
                        text: '老师评价统计图'
                    },
                    tooltip: {},
                    legend: {
                        data:['好评', '差评']
                    },
                    xAxis: {
                        data: json.names
                    },
                    yAxis: {},
                    series: [
                        {
                            name: '好评',
                            type: 'bar',
                            data: json.good
                        },
                        {
                            name: '差评',
                            type: 'bar',
                            data: json.bad
                        }
                    ]
                }
                myChart.setOption(option)
            })
    </script>
</body>
</html>
```

## 配置日志

项目开发阶段，显示足够的调试信息以辅助开发人员调试代码还是非常必要的；项目上线以后，将系统运行时出现的警告、错误等信息记录下来以备相关人员了解系统运行状况并维护代码也是很有必要的。要做好这两件事件，我们需要为Django项目配置日志。

Django的日志配置基本可以参照官方文档再结合项目实际需求来进行，这些内容基本上可以从官方文档上复制下来，然后进行局部的调整即可，下面给出一些参考配置。

```py
LOGGING = {
    'version': 1,
    # 是否禁用已经存在的日志器
    'disable_existing_loggers': False,
    # 日志格式化器
    'formatters': {
        'simple': {
            'format': '%(asctime)s %(module)s.%(funcName)s: %(message)s',
            'datefmt': '%Y-%m-%d %H:%M:%S',
        },
        'verbose': {
            'format': '%(asctime)s %(levelname)s [%(process)d-%(threadName)s] '
                      '%(module)s.%(funcName)s line %(lineno)d: %(message)s',
            'datefmt': '%Y-%m-%d %H:%M:%S',
        }
    },
    # 日志过滤器
    'filters': {
        # 只有在Django配置文件中DEBUG值为True时才起作用
        'require_debug_true': {
            '()': 'django.utils.log.RequireDebugTrue',
        },
    },
    # 日志处理器
    'handlers': {
        # 输出到控制台
        'console': {
            'class': 'logging.StreamHandler',
            'level': 'DEBUG',
            'filters': ['require_debug_true'],
            'formatter': 'simple',
        },
        # 输出到文件(每周切割一次)
        'file1': {
            'class': 'logging.handlers.TimedRotatingFileHandler',
            'filename': 'access.log',
            'when': 'W0',
            'backupCount': 12,
            'formatter': 'simple',
            'level': 'INFO',
        },
        # 输出到文件(每天切割一次)
        'file2': {
            'class': 'logging.handlers.TimedRotatingFileHandler',
            'filename': 'error.log',
            'when': 'D',
            'backupCount': 31,
            'formatter': 'verbose',
            'level': 'WARNING',
        },
    },
    # 日志器记录器
    'loggers': {
        'django': {
            # 需要使用的日志处理器
            'handlers': ['console', 'file1', 'file2'],
            # 是否向上传播日志信息
            'propagate': True,
            # 日志级别(不一定是最终的日志级别)
            'level': 'DEBUG',
        },
    }
}
```

大家可能已经注意到了，上面日志配置中的formatters是**日志格式化器**，它代表了如何格式化输出日志，其中格式占位符分别表示：

1. %(name)s - 记录器的名称
2. %(levelno)s - 数字形式的日志记录级别
3. %(levelname)s - 日志记录级别的文本名称
4. %(filename)s - 执行日志记录调用的源文件的文件名称
5. %(pathname)s - 执行日志记录调用的源文件的路径名称
6. %(funcName)s - 执行日志记录调用的函数名称
7. %(module)s - 执行日志记录调用的模块名称
8. %(lineno)s - 执行日志记录调用的行号%(created)s - 执行日志记录的时间
9. %(asctime)s - 日期和时间
10. %(msecs)s - 毫秒部分
11. %(thread)d - 线程ID（整数）
12. %(threadName)s - 线程名称
13. %(process)d - 进程ID （整数）

日志配置中的handlers用来指定**日志处理器**，简单的说就是指定将日志输出到控制台还是文件又或者是网络上的服务器，可用的处理器包括：

1. logging.StreamHandler(stream=None) - 可以向类似与sys.stdout或者sys.stderr的任何文件对象输出信息
2. logging.FileHandler(filename, mode='a', encoding=None, delay=False) - 将日志消息写入文件
3. logging.handlers.DatagramHandler(host, port) - 使用UDP协议，将日志信息发送到指定主机和端口的网络主机上
4. logging.handlers.HTTPHandler(host, url) - 使用HTTP的GET或POST方法将日志消息上传到一台HTTP 服务器
5. logging.handlers.RotatingFileHandler(filename, mode='a', maxBytes=0, backupCount=0, encoding=None, delay=False) - 将日志消息写入文件，如果文件的大小超出maxBytes指定的值，那么将重新生成一个文件来记录日志
6. logging.handlers.SocketHandler(host, port) - 使用TCP协议，将日志信息发送到指定主机和端口的网络主机上
7. logging.handlers.SMTPHandler(mailhost, fromaddr, toaddrs, subject, credentials=None, secure=None, timeout=1.0) - 将日志输出到指定的邮件地址
8. logging.MemoryHandler(capacity, flushLevel=ERROR, target=None, flushOnClose=True) - 将日志输出到内存指定的缓冲区中

上面每个日志处理器都指定了一个名为“level”的属性，它代表了日志的级别，不同的日志级别反映出日志中记录信息的严重性。Python中定义了六个级别的日志，按照从低到高的顺序依次是：NOTSET、DEBUG、INFO、WARNING、ERROR、CRITICAL。

最后配置的**日志记录器**是用来真正输出日志的，Django框架提供了如下所示的内置记录器：

1. django - 在Django层次结构中的所有消息记录器
2. django.request - 与请求处理相关的日志消息。5xx响应被视为错误消息；4xx响应被视为为警告消息
3. django.server - 与通过runserver调用的服务器所接收的请求相关的日志消息。5xx响应被视为错误消息；4xx响应被记录为警告消息；其他一切都被记录为INFO
4. django.template - 与模板渲染相关的日志消息
5. django.db.backends - 有与数据库交互产生的日志消息，如果希望显示ORM框架执行的SQL语句，就可以使用该日志记录器。

日志记录器中配置的日志级别有可能不是最终的日志级别，因为还要参考日志处理器中配置的日志级别，取二者中级别较高者作为最终的日志级别。

### 配置Django-Debug-Toolbar

Django-Debug-Toolbar是项目开发阶段辅助调试和优化的神器，只要配置了它，就可以很方便的查看到如下表所示的项目运行信息，这些信息对调试项目和优化Web应用性能都是至关重要的。

项目|说明
-|-
Versions|Django的版本
Time|显示视图耗费的时间
Settings|配置文件中设置的值
Headers|HTTP请求头和响应头的信息
Request|和请求相关的各种变量及其信息
StaticFiles|静态文件加载情况
Templates|模板的相关信息
Cache|缓存的使用情况
Signals|Django内置的信号信息
Logging|被记录的日志信息
SQL|向数据库发送的SQL语句及其执行时间

1. 安装Django-Debug-Toolbar。

   ```sh
   pip install django-debug-toolbar
   ```

2. 配置 - 修改 settings.py。

   ```py
   INSTALLED_APPS = [
       'debug_toolbar',
   ]

   MIDDLEWARE = [
       'debug_toolbar.middleware.DebugToolbarMiddleware',
   ]

   DEBUG_TOOLBAR_CONFIG = {
       # 引入jQuery库
       'JQUERY_URL': 'https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js',
       # 工具栏是否折叠
       'SHOW_COLLAPSED': True,
       # 是否显示工具栏
       'SHOW_TOOLBAR_CALLBACK': lambda x: True,
   }
   ```

3. 配置 - 修改 urls.py。

   ```py
   if settings.DEBUG:

       import debug_toolbar

       urlpatterns.insert(0, path('__debug__/', include(debug_toolbar.urls)))
   ```

4. 使用。在配置好Django-Debug-Toolbar之后，页面右侧会看到一个调试工具栏，上面包括了如前所述的各种调试信息，包括执行时间、项目设置、请求头、SQL、静态资源、模板、缓存、信号等，查看起来非常的方便。

## 优化ORM代码

在配置了日志或Django-Debug-Toolbar之后，我们可以查看一下之前将老师数据导出成Excel报表的视图函数执行情况，这里我们关注的是ORM框架生成的SQL查询到底是什么样子的，相信这里的结果会让你感到有一些意外。执行Teacher.objects.all()之后我们可以注意到，在控制台看到的或者通过Django-Debug-Toolbar输出的SQL是下面这样的：

```sql
SELECT `tb_teacher`.`no`, `tb_teacher`.`name`, `tb_teacher`.`detail`, `tb_teacher`.`photo`, `tb_teacher`.`good_count`, `tb_teacher`.`bad_count`, `tb_teacher`.`sno` FROM `tb_teacher`; args=()
SELECT `tb_subject`.`no`, `tb_subject`.`name`, `tb_subject`.`intro`, `tb_subject`.`create_date`, `tb_subject`.`is_hot` FROM `tb_subject` WHERE `tb_subject`.`no` = 101; args=(101,)
SELECT `tb_subject`.`no`, `tb_subject`.`name`, `tb_subject`.`intro`, `tb_subject`.`create_date`, `tb_subject`.`is_hot` FROM `tb_subject` WHERE `tb_subject`.`no` = 101; args=(101,)
SELECT `tb_subject`.`no`, `tb_subject`.`name`, `tb_subject`.`intro`, `tb_subject`.`create_date`, `tb_subject`.`is_hot` FROM `tb_subject` WHERE `tb_subject`.`no` = 101; args=(101,)
SELECT `tb_subject`.`no`, `tb_subject`.`name`, `tb_subject`.`intro`, `tb_subject`.`create_date`, `tb_subject`.`is_hot` FROM `tb_subject` WHERE `tb_subject`.`no` = 101; args=(101,)
SELECT `tb_subject`.`no`, `tb_subject`.`name`, `tb_subject`.`intro`, `tb_subject`.`create_date`, `tb_subject`.`is_hot` FROM `tb_subject` WHERE `tb_subject`.`no` = 103; args=(103,)
SELECT `tb_subject`.`no`, `tb_subject`.`name`, `tb_subject`.`intro`, `tb_subject`.`create_date`, `tb_subject`.`is_hot` FROM `tb_subject` WHERE `tb_subject`.`no` = 103; args=(103,)
```

这里的问题通常被称为“1+N查询”（或“N+1查询”），原本获取老师的数据只需要一条SQL，但是由于老师关联了学科，当我们查询到N条老师的数据时，Django的ORM框架又向数据库发出了N条SQL去查询老师所属学科的信息。每条SQL执行都会有较大的开销而且会给数据库服务器带来压力，如果能够在一条SQL中完成老师和学科的查询肯定是更好的做法，这一点也很容易做到，相信大家已经想到怎么做了。是的，我们可以使用连接查询，但是在使用Django的ORM框架时如何做到这一点呢？对于多对一关联（如投票应用中的老师和学科），我们可以使用QuerySet的用select_related()方法来加载关联对象；而对于多对多关联（如电商网站中的订单和商品），我们可以使用prefetch_related()方法来加载关联对象。

在导出老师Excel报表的视图函数中，我们可以按照下面的方式优化代码。

```py
queryset = Teacher.objects.all().select_related('subject')
```

事实上，用ECharts生成前端报表的视图函数中，查询老师好评和差评数据的操作也能够优化，因为在这个例子中，我们只需要获取老师的姓名、好评数和差评数这三项数据，但是在默认的情况生成的SQL会查询老师表的所有字段。可以用QuerySet的only()方法来指定需要查询的属性，也可以用QuerySet的defer()方法来指定暂时不需要查询的属性，这样生成的SQL会通过投影操作来指定需要查询的列，从而改善查询性能，代码如下所示：

```py
queryset = Teacher.objects.all().only('name', 'good_count', 'bad_count')
```

当然，如果要统计出每个学科的老师好评和差评的平均数，利用Django的ORM框架也能够做到，代码如下所示：

```py
queryset = Teacher.objects.values('subject').annotate(
        good=Avg('good_count'), bad=Avg('bad_count'))
```

这里获得的QuerySet中的元素是字典对象，每个字典中有三组键值对，分别是代表学科编号的subject、代表好评数的good和代表差评数的bad。如果想要获得学科的名称而不是编号，可以按照如下所示的方式调整代码：

```py
queryset = Teacher.objects.values('subject__name').annotate(
        good=Avg('good_count'), bad=Avg('bad_count'))
```

可见，Django的ORM框架允许我们用面向对象的方式完成关系数据库中的分组和聚合查询。

## 中间件的应用

### 实现登录验证

我们继续来完善投票应用。在上一个章节中，我们在用户登录成功后通过session保留了用户信息，接下来我们可以应用做一些调整，要求在为老师投票时必须要先登录，登录过的用户可以投票，否则就将用户引导到登录页面，为此我们可以这样修改视图函数。

```py
def praise_or_criticize(request: HttpRequest):
    """投票"""
    if 'username' in request.session:
        try:
            tno = int(request.GET.get('tno', '0'))
            teacher = Teacher.objects.get(no=tno)
            if request.path.startswith('/praise'):
                teacher.good_count += 1
            else:
                teacher.bad_count += 1
            teacher.save()
            data = {'code': 200, 'message': '操作成功'}
        except (ValueError, Teacher.DoesNotExist):
            data = {'code': 404, 'message': '操作失败'}
    else:
        data = {'code': 401, 'message': '请先登录'}
    return JsonResponse(data)
```

前端页面在收到 `{'code': 401, 'message': '请先登录'}` 后，可以将用户引导到登录页面，修改后的teacher.html页面的JavaScript代码部门如下所示。

```js
<script>
    $(() => {
        $('.comment > a').on('click', (evt) => {
            evt.preventDefault()
            let a = $(evt.target)
            $.getJSON(a.attr('href'), (json) => {
                if (json.code == 200) {
                    let span = a.next()
                    span.text(parseInt(span.text()) + 1)
                } else if (json.code == 401) {
                    location.href = '/login/?backurl=' + location.href
                } else {
                    alert(json.message)
                }
            })
        })
    })
</script>
```

>注意：为了在登录成功之后能够回到刚才投票的页面，我们在跳转登录时设置了一个backurl参数，把当前浏览器中的URL作为返回的页面地址。

这样我们已经实现了用户必须登录才能投票的限制，但是一个新的问题来了。如果我们的应用中有很多功能都需要用户先登录才能执行，例如将前面导出Excel报表和查看统计图表的功能都加以登录限制，那么我们是不是需要在每个视图函数中添加代码来检查session中是否包含了登录用户的信息呢？答案是否定的，如果这样做了，我们的视图函数中必然会充斥着大量的重复代码。编程大师Martin Fowler曾经说过：**代码有很多种坏味道，重复是最坏的一种**。在Django项目中，我们可以把验证用户是否登录这样的重复性代码放到中间件中。

### Django中间件概述

中间件是安插在Web应用请求和响应过程之间的组件，它在整个Web应用中扮演了拦截过滤器的角色，通过中间件可以拦截请求和响应，并对请求和响应进行过滤（简单的说就是执行额外的处理）。通常，一个中间件组件只专注于完成一件特定的事，例如：Django框架通过 `SessionMiddleware` 中间件实现了对session的支持，又通过 `AuthenticationMiddleware` 中间件实现了基于session的请求认证。通过把多个中间件组合在一起，我们可以完成更为复杂的任务，Django框架就是这么做的。

Django项目的配置文件中就包含了对中间件的配置，代码如下所示。

```py
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
```

我们稍微为大家解释一下这些中间件的作用：

1. CommonMiddleware - 基础设置中间件，可以处理以下一些配置参数。

   - DISALLOWED_USER_AGENTS - 不被允许的用户代理（浏览器）
   - APPEND_SLASH - 是否追加/
   - USE_ETAG - 浏览器缓存相关

2. SecurityMiddleware - 安全相关中间件，可以处理和安全相关的配置项。

   - SECURE_HSTS_SECONDS - 强制使用HTTPS的时间
   - SECURE_HSTS_INCLUDE_SUBDOMAINS - HTTPS是否覆盖子域名
   - SECURE_CONTENT_TYPE_NOSNIFF - 是否允许浏览器推断内容类型
   - SECURE_BROWSER_XSS_FILTER - 是否启用跨站脚本攻击过滤器
   - SECURE_SSL_REDIRECT - 是否重定向到HTTPS连接
   - SECURE_REDIRECT_EXEMPT - 免除重定向到HTTPS
3. SessionMiddleware - 会话中间件。
4. CsrfViewMiddleware - 通过生成令牌，防范跨请求份伪的造中间件。
5. XFrameOptionsMiddleware - 通过设置请求头参数，防范点击劫持攻击的中间件。

在请求的过程中，上面的中间件会按照书写的顺序从上到下执行，然后是URL解析，最后请求才会来到视图函数；在响应的过程中，上面的中间件会按照书写的顺序从下到上执行，与请求时中间件执行的顺序正好相反。

### 自定义中间件

Django中的中间件有两种实现方式：基于类的实现方式和基于函数的实现方式，后者更接近于装饰器的写法。装饰器实际上是代理模式的应用，将横切关注功能（与正常业务逻辑没有必然联系的功能，例如：身份认证、日志记录、编码转换之类的功能）置于代理中，由代理对象来完成被代理对象的行为并添加额外的功能。

中间件对用户请求和响应进行拦截过滤并增加额外的处理，在这一点上它跟装饰器是完全一致的，所以基于函数的写法来实现中间件就跟装饰器的写法几乎一模一样。下面我们用自定义的中间件来实现用户登录验证的功能。

```py
"""
middlewares.py
"""
from django.http import JsonResponse
from django.shortcuts import redirect

# 需要登录才能访问的资源路径
LOGIN_REQUIRED_URLS = {
    '/praise/', '/criticize/', '/excel/', '/teachers_data/',
}


def check_login_middleware(get_resp):

    def wrapper(request, *args, **kwargs):
        # 请求的资源路径在上面的集合中
        if request.path in LOGIN_REQUIRED_URLS:
            # 会话中包含userid则视为已经登录
            if 'userid' not in request.session:
                # 判断是不是Ajax请求
                if request.is_ajax():
                    # Ajax请求返回JSON数据提示用户登录
                    return JsonResponse({'code': 10003, 'hint': '请先登录'})
                else:
                    backurl = request.get_full_path()
                    # 非Ajax请求直接重定向到登录页
                    return redirect(f'/login/?backurl={backurl}')
        return get_resp(request, *args, **kwargs)

    return wrapper
```

修改配置文件，激活中间件使其生效。

```py
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'debug_toolbar.middleware.DebugToolbarMiddleware',
    'vote.middlewares.check_login_middleware',
]
```

注意上面这个中间件列表中元素的顺序，当收到来自用户的请求时，中间件按照从上到下的顺序依次执行，这行完这些中间件以后，请求才会最终到达视图函数。当然，在这个过程中，用户的请求可以被拦截，就像上面我们自定义的中间件那样，如果用户在没有登录的情况下访问了受保护的资源，中间件会将请求直接重定向到登录页，后面的中间件和视图函数将不再执行。在响应用户请求的过程中，上面的中间件会按照从下到上的顺序依次执行，这样的话我们还可以对响应做进一步的处理。

中间件执行的顺序是非常重要的，对于有依赖关系的中间件必须保证被依赖的中间件要置于依赖它的中间件的前面，就好比我们刚才自定义的中间件要放到SessionMiddleware的后面，因为我们要依赖这个中间件为请求绑定的session对象才能判定用户是否登录。

### 小结

至此，除了对用户投票数量加以限制的功能外，这个投票应用就算基本完成了，整个项目的完整代码请参考[https://github.com/jackfrued/django1902](https://github.com/jackfrued/django1902)，其中用户注册时使用的手机验证码功能请大家使用自己注册的短信平台替代它。如果需要投票应用完整的视频讲解，可以在首页扫码打赏后留言联系作者获取视频下载地址，谢谢大家的理解和支持。
