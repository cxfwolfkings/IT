入口文件(app.js)编码：

```js
var express = require('express')
var app = express()

app.set('view engine', 'jade')
app.set('port', 3000)

app.get('/', function(req, res){
  res.render('index', {title: 'imooc'})
})
```

调试
  调试Node.js项目：
  1、核心调试：console.log()语句
  2、debugger语句，使用 $node debug xxx.js 命令运行，程序会停顿在debugger处，主要的node调试命令如下：
	  （1）next, n: 单步执行
	  （2）cont, c: 继续执行， 直到遇到下一个断点
	  （3）step, s: 单步执行并进入函数
	  （4）out, o: 从函数中跳出
	  （5）watch(expression): 把表达式expression加入监视列表
	3、Node Inspector：Google Chrome开发者工具的接口
	  Node.js 的内置调试工具使用广泛，但是由于没有GUl，导致它使用起来并不友好。因此，开发者迫切需要一种比Node.js调试器更加友好的工具，所以node-inspector应运而生！
	  全局安装：$npm install -g node-inspector
	  启动：$node-inspector，会打开一个新窗口。
    现在，在新窗口中使用--debug 或者--debug-brk参数来打开程序。例如：
	  $node --debug-brk hello-debug.js
	  或者
	  $node --debug hello-debug.js
	  在Chrome（必须是Chrome）中打开url即可进行调试
	  使用Node.js的最大好处在于，你不需要编译代码，因为它被加载到内存中，并且由平台来解释执行。因此，非常推荐你使用轻量级的文本编辅器，例如：Sublime Text、VS Code

自动化
	Node.js应用是存储在内存中的，所以当我们修改源代码内容的时候，必须重启进程（也就是node）才能看到变化，显然，如果这种频繁的程序化重启工作能够自动化，那将极大提高开发效率。下面是一些实现了这种自动化的工具：
  • forever
  • node-dev
  • nodemon
  • supervisor
  • up
	使用方法类似如下：
	安装：$node install -g node-dev
	运行：$node-dev program.js
	提示：我们都知道Express.js在默认情况下每次都会为新请求重新加载模板文件。因此，一定不要重启服务。不过，我们可以通过设置view cache来缓存模板。

Express
Why
	如果仅仅使用核心的Node.js模块来写重要的Web应用，你会发现自己的代码有很多冗余，例如：解析HTTP请求信息、解析cookie、管理session、路由解析、确定请求中响应头的数据类型等。Express很好的解决了这个问题，该框架提供了一个类似MVC的架构，为你的Web应用提供了一个良好的结构（视图、路由、模型）。
  在Express的模型中引入了Mongoose、Sequelize库等作为扩展。基于这个框架，Express应用可以是很简单的，可以是基于REST API的复杂逻辑，可以高度可扩展。可以是基于jade-browser与Socket.IO的全栈业务，也可以是实时的Web应用。
What
	基于Node.js中http模块和Connect组件的Web框架。这些组件叫作中间件，它们是以约定大于配置原则作为开发的基础理念的。换句话说，Express系统具有很高的可配置性。
  虽然Express一度成为NPM中最优秀的Node框架，但是每月依然会有新的框架产生，比如尝试整合前后端代码的Meteor和DerbyJS。
How
	Express是单入口的主文件启动。
  1、像引入我们自己的模块一样引入第三方模块，比如控制器、公共模块、辅助模块和模型
  2、配置Express.js，例如模板引擎和它自身文件的扩展组件
  3、连接到数据库，例如MongoDB 、Redis 或者MySQL
  4、定义中间件，例如错误处理、静态文件路径、cookies 和其他一些解析组件
  5、定义路由
  6、启动应用
  7、以模块形式输出应用
  当Express.js的应用运行起来后，它便开始监昕请求。每一个刚进来的请求都会根据定义好的中间件和路由链自上而下进行处理。所以控制好执行流是非常重要的一件事情。例如：在文件中上游中的路由或中间件有着比下游更高的优先级。
  因为可以在每个HTTP请求的过程中间添加多个函数进行请求处理，所以我们称这些函数为中间件。
install
	（Linux权限不够时，可以在命令前加 sudo 命令）
  两种包的形式：
  1、express-geηerator：一个提供在命令行中快速搭建应用的全局NPM包
  2、express：一个在Node.js应用中的node_modules文件夹里的本地模块包
  检查版本：$express --version
  卸载旧版：$sudo npm uninstall -g express-generator
           $sudo npm uninstall -g express
  生成新版：全局  $npm install -g express-generator@4.0.0
           本地  $npm install express （$ npm install express @4.1.2 --save）
Cmd
	我们可以在命令行中生成一个新的Express应用。例如，创建一个依赖于Stylus的应用，执行下面的操作：
  $express -c stylus H5Game
  $cd H5Game && cnpm install
  $npm run start
  如你所见，使用Express.js可以很容易地搭建一个Web应用。

Mocha
Why
	测试驱动开发(TDD)是一种主要的敏捷开发技术。它最强大之处是可以提升代码的质量，改进错误的检测方式，以及增强程序员的信心，使其获得更有效率的开发手段。
	纵观历史，Web应用已经越来越难以自动测试，开发者们严重依赖于手动测试。但其实，一些特定的项目，比如独立的服务和REST API可以且必须用TDD来测试。同时，富用户界面（或富用户体验）应用也可以用PhantomJS这种无界面浏览器来进行测试。
  行为驱动开发(BDD)的概念是基于TDD的。它鼓励产品负责人与开发者合作，这一点在语言上不同于TDD。
	多数时候，软件工程师需要使用测试框架，这和构建应用程序本身同等重要。
  TDD主要思想：
  1、定义一个单元测试
  2、执行这个单元测试
  3、验证这个测试是否通过。
  BDD是TDD的一个专业版本，它指定了从业务需求的角度出发需要哪些单元测试。
	虽然，使用Node.js核心模块assert来写测试也是可行的，但是，在多数情况下，用一个框架会更好。我们将使用Mocha这个测试框架来实现TDD和BDD。因为我们在Mocha模块中获得了许多免费的东西：
  1、获取测试报告
  2、支持异步模式
  3、丰富的可配置项
What
	Mocha是Node.js的一个成熟且强大的测试框架。其它值得考虑的测试框架：NodeUnit、Jasmine、Vows
How
install
  安装命令：$ npm install -g mocha@1.16.2
cmd
  下面的清单是$ mocha [options] 命令包含的一系列可选的参数。
  • -h 或-help: 输出Mocha的帮助信息
  • -v 或-version: 输出当前Mocha的版本号
  • -r 或--require<name>: 引用一个具名模块
  • -R 或--reporter<name>: 指定要使用的测试报告的样式方案
  • -u 或--ui<name>: 指定要使用的测试模式（例如，bdd、tdd）
  • -g 或--grep <pattern>: 只用匹配模式来运行匹配到的测试
  • -i 或-invert: 颠倒--grep的匹配结果
  • -t 或--timeout<ms>: 用毫秒设置测试用例的超时时间（例如，5000）
  • -s 或--slow<ms>: 用毫秒设置测试的极限时间（例如，100）
  • -w 或-watch: 在终端监测测试文件的更改
  • -c 或-colors: 启用颜色高亮
  • -C 或--no-colors: 禁用颜色高亮
  • -G 或--growl: 启用Mac OS X的通知
  • -d 或--debug: 启用Node.js调试 $node --debug
  • --debug-brk: 启用Node.js调试在第一行中断 $node --debug-brk
  • -b 或--bail: 在第一次测试失败后退出
  • -A 或--async-only: 设置所有测试为异步模式
  • --recurSive: 对子文件夹应用测试
  • --globals <names>: 提供以逗号分隔的全局名称
  • --check-leaks: 检查全局变量的泄漏
  • --interfaces: 输出可用的接口
  • --reporters: 输出可用的测试报告的样式方案
  • --compilers <ext> : <module>, ...: 使用给定的模块来编译文件
hook
	hook可以理解为是一些逻辑，通常表现为一个函数或者一些声明，当特定的事件触发时hook才执行。
  Mocha拥有一些内置的hook，在测试流程的不同时段触发，如在整个测试流程之前，或在每个独立测试之前等。
  除了前置的hook，before()和beforeEach()以外，还有after()和afterEach()。它们可以用来清除测试的设置信息，比如数据库数据之类的。
  所有的hook都支持异步模式。测试也同样支持。但是，一旦给测试函数加上done参数，我们的测试用例就需要等HTTP请求返回响应
  测试用例可以嵌套在其他测试用例中，在大型的测试文件中嵌套的结构是一个好主意。
  开发者可以使用describe.skip()或it.skip()来跳过一个测试用例/进程，也可以使用describe.only()只执行某个特定的测试用例。
  作为BDD的接口describe、it、before以及其他一些的替代，Mocha支持更传统的TDD接口：
  • suite: 类似describe
  • test: 类似it
  • setup: 类似before
  • teardown: 类似after
  • suiteSetup: 类似beforeEach
  • suiteTeardown: 类似afterEach
assert
	assert库是Node.js核心的一部分，这使得它易于访问。虽然它的功能很少，但对于某些情况，例如单元测试己经足够用了。
Chai
	Chai（断言库）是assert模块的子集。Chai assert模块API（应用程序接口），可参考官方文档http://chaijs.com/api/assert/。
Expect.js
  Expect.js是一种BDD语言。它的语法是链式风格的，比起核心assert模块更加贴近自然语言。使用方式：
	1、安装为本地模块；
		$ npm install expect.js@0.2.0
	2、作为chai库的一个接口安装
		var expect = require('chai').expect;

Template
Why
	在Web应用中，使用模板是有好处的，因为我们只需要一个模板就可以动态生成无限多个页面。另一个好处是，当我们要改某些东西时，只需要在一处修改就可以了。
What
	模板引擎是一个库，或者是一个使用一定规则/语言来解释数据并渲染视图的框架。
	Jade绝对是一个令人惊奇的模板引擎，它能使开发者少写很多代码并且几乎支持所有JavaScript函数。它同样支持自顶向下(include)及自底向上(extend)方式来引入模块。
How
jade
	Jade是Node.js的一个模板引擎，它借鉴了Haml的很多地方，所以语法上和Haml比较相近。
	Jade的主要优势是为HTML元素同时渲染闭合和开始标签。因此，当开发者写Jade时会省掉不少键盘输入。
  安装Jade模块：$npm install jade --save
Handlebars
	Handlebars库是另一个模板引擎。它继承自Mustache，所以大部分语法是兼容Mustance的。然而，Handlebars也新增了很多特性，比如superset
	安装：$npm install handlebars --save
	Jade和Handlebars的一个主要区别是：Jade允许在代码里写几乎所有的JavaScript；而Handlebars则限制开发人员只能使用少量的内置和自定义的helpers。
	Handlebars不允许在模板里写很多JavaScript逻辑。这有助于保持模板的简洁和严格相关的数据表示。Handlebars 要求书写完整的HTML代码。正是由于这个原因，它可以不那么关心空格和缩进。

MongoDB
Why
  NoSQL数据库，也叫非关系数据库，其开源、水平扩展容易，适合用于分布式系统。
  NoSQL数据库比起传统数据库更适合处理大数据。实现的关键是数据库实体之间的关系并不储存在数据库本身（没有更多的查询）；它们转移到了应用层或者对象关系映射(ORM)层，在这里，就是Node代码处理的部分。
  选用NoSQL的另一个理由是，它是无模式数据库，对于原型开发和敏捷迭代是近似完美的（更加推荐！）。
What
  MongoDB是文档储存NoSQL数据库，而不是键值对和列存储NoSQL数据库，是目前最成熟可靠的NoSQL数据库。
  除了高效率、易扩展性和快速之外，MongoDB使用类似JavaScript的语言开发接口。这是很神奇的，因为现在不需要在前端(JavaScript)、后端(Node.js)、数据库(MongoDB)之间切换语言环境。
  MongoDB公司处于行业领先地位，他们通过线上MongoDB University来提供培训和认证。
How
  如果使用程序操作数据库，就要使用MongoDB驱动。MongoDB驱动实际上就是为应用程序提供的一个接口，不同的语言对应不同的驱动，NodeJS驱动不能应用在其他后端语言中
install
	安装mongodb数据库，官网：http://www.mongodb.org/downloads
  $npm install mongodb
	启动服务：$mongod
Cmd
	MongoDB shell 最常用的命令列表如下所示。
	> help: 输出可用的命令列表
	> show dbs: 输出数据库服务器上数据库的名称到连接的控制台上（默认是localhost:27017; 但是如果传递参数给mongo，可以连接任意远程实例）
	> use db_name: 切换到db_name
	> show collections: 输出选择出的数据库集合的列表
	> db.collection_name.find(query);: 查找所有匹配条件的数据
	> db.collection_name.findOne(query);: 查找一条匹配条件的数据
	> db.collection_name.insert(document): 在collection_name 集合中插入一条数据
	> db.collection_name.save(document);: 保存一条数据到collection_name集合中——简写为upsert(no_id) 或者insert (with_id)
	> db.collection_name.update(query, {$set: data});: 用data 对象的值更新匹配条件的collection_name集合的数据
	> db.collection_name.remove(query);: 删除collection_name集合中所有匹配条件的数据
	> printjson(document);: 输出参数文档
Mongoskin
	原生驱动：$npm install mongodb@1.3.23 --save
	Mongoskin比MongoDB的原生驱动提供更好的API
	$npm install mongoskin@0.6.1 --save
	Mongoskin是MongoDB的Node.js版原生驱动的子集，下面是Mongoskin主要方法的列表一一只有方法：
  • findltems(..., callback): 查找元素并返回一个数组替代指针
  • findEach(..., callback ): 遍历每个查找到的元素
  • findByld(id, ..., callback): 通过id 格式化字符串查找
  • updateById(_id, ..., callback): 更新匹配_id 的元素
  • removeById(_id, ..., callback): 删除匹配_id 的元素
	可供选择的MongoDB原生驱动和Mongoskin包括如下内容。
  • mongoose: 支持建模的可配置的异步JavaScript驱动
  • mongolia: 轻量级的MongoDB ORM/驱动
  • monk: 一个提供方便的极小的层，可用来使用Node.js编码改善MongoDB
	以下这些模块常用来进行数据验证。
  • node-validator: 验证数据
  • express-validator: 在Express.js 3/4 中验证数据
Reference
	https://github.com/mongodb/node-mongodb-native

权限认证
why
	近年来，Web应用逐渐不再相互孤立，安全性也日益重要。作为开发者，我们不仅被鼓励使用市面上众多的第三方服务（如Twitter、Github等），也被希望作为服务商向外界提供服务（如提供API接口）。在这种情况下，我们需要使用某些手段来确保我们的应用以及应用间通信的安全，例如：基于token的用户认证、OAuth授权协议等。
What
	一般来讲，最常见的方案是基于cookie或session授权管理，但某些场景下这种方案并不适用，比如对要求使用REST架构的应用，或客户端对cookie\session支持不佳（如移动端）等。更有效的方案是在每次请求中都携带token（比较常见的OAuth2.0协议），并在服务端通过token进行独立的认证。
How
token认证
	既可以把token字段加载到请求参数中，也可以添加到HTTP请求头中。每个请求都会提交token字段，并在接收时把token（通过req.query.token获取）和应用中储存的token（通常使用数据库储存）进行比对。如果比对通过则调用next()方法继续后续处理，如果不通过则调用next(error)触发Express.js的错误响应。
cookie/session认证
	另外一种常见模式是使用cookie进行用户认证，这种模式在含有用户界面的应用中经常使用。我们使用cookie储存session ID。并在请求时自动提交。从某种意义上讲，cookie有些类似于token。但是cookie使用较为方便，并不需要开发者做太多的工作。基于session的认证就是使用这种模式。基于session的认证在Web应用中十分常见，也更受推崇，因为浏览器可以自动处理带有session的请求头而且大多数的后端平台或框架也能原生支持session。
	基于session的用户认证借助于请求体对象req中的session对象完成。简单地说，session可以鉴别客户端，并对应地储存信息，供同一客户端所有的后续请求读取。
Node.js OAuth
  $npm install oauth@0.9.11 --save
  从本质上讲，OAuth 2.0有些类似于我们之前讨论过的基于token的用户认证，之前提到的token在这里被叫作bearer，在每一次请求中都会携带它。我们通过提供app token和secret来获取bearer。
  使用Everyauth模块只需要短短几行代码，就可以在任何基于Express.js的应用中实现OAuth。它自带了市面上大部分第三方服务商的OAuth配置，包括接口地址、参数名称等，省去了我们查资料的麻烦。同时，Everyauth会默认用户信息储存在session中，不过可以通过修改findOrCreate的回调函数，实现把用户信息存在数据库中。
  $npm install everyauth@0.4.5 --save
  示例：Twitter
  我们需要在app.js中配置Everyauth的Twitter模块，但是对于一个大型应用来说，更好的做法是，用常量来记录这些配置，并保存在一个单独的文件中。需要注意的是，这些配置代码必须放在app.route方法调用之前。为了能更好地保护consumer key和secret，可以把它们存在环境变量process.env中。
  var TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY;
  var TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET;
  1、一种方案是在Makefile时把这些参数传入。
  REPORTER = list
  MOCHA_OPTS = --ui bdd -c
  db:
    echo Seeding blog-test *****************************************************
    ./db/seed.sh
  test:
    clear
    echo Starting test *********************************************************
    ./node_modules/mocha/bin/mocha \
    --reporter $(REPORTER) \
    $(MOCHA_OPTS) \
    tests/*.js
    echo Ending test
  start:
    TWITTER_CONSUMER_KEY=AAAAAAAAAAAAAAAAAAAAA \
    TWITTER_CONSUMER_SECRET=BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB \
    node app
  .PHONY: test db start
  2、还有一种传值方案，创建一个脚本文件start.sh
  TWITTER_CONSUMER_KEY=ABCABC \
  TWITTER_CONSUMER_SECRET=XYZXYZXYZ \
  node -e "console.log(process.env.TWITTER_CONSUMER_KEY)"
  node app
  执行 $make start 就可以运行了

Mongoose
why
  使用ORM有很多优势，不只是利于组织代码或易于开发这么简单。典型的ORM是现代软件工程至关重要的一部分。
  ORM允许指定不同类型对象之间的关系，也允许将业务逻辑（与这些对象相关的）放入类中。
What
  Mongoose是一个基于Node.js和MongoDB的高级ORM类库。
  Mongoose能从数据库中提取出任何信息，且应用程序代码只通过对象以及它们的方法进行交互。
  另外，Mongoose拥有内置的验证和类型转换功能，而且可以根据需要进行扩展和定制。当与Express.js共用的时候，Mongoose使栈真正附着在MVC概念中。
  Mongoose有两个特点：
  1、通过关系型数据库的思想来设计非关系型数据库
  2、基于mongodb驱动，简化操作
  Mongooose中，有三个比较重要的概念，分别是Schema、Model、Entity。它们的关系是：Schema生成Model，Model创造Document，Model和Document都可对数据库操作造成影响，但Model比Document更具操作性
  Schema用于定义数据库的结构。类似创建表时的数据定义（不仅可以定义文档的结构和属性，还可以定义文档的实例方法、静态模型方法、复合索引等），每个Schema会映射到mongodb中的一个collection，Schema不具备操作数据库的能力
  Model是由Schema编译而成的构造器，具有抽象属性和行为，可以对数据库进行增删查改。Model的每一个实例(instance)就是一个文档document
  Document是由Model创建的实体，它的操作也会影响数据库
How
  安装nodejs和mongodb之后，使用npm来安装mongoose
  $npm install mongoose@3.8.4 --save
  示例：demo/demo-mongoose.js
  连接数据库
  如果需要传递用户名、密码，则可以使用如下方式
  mongoose.connect('mongodb://username:password@host:port/database?options...');
  connect()方法还接受一个选项对象options，该对象将传递给底层驱动程序。这里所包含的所有选项优先于连接字符串中传递的选项
  可用选项如下所示：
  db            -数据库设置
  server        -服务器设置
  replset       -副本集设置
  user          -用户名
  pass          -密码
  auth          -鉴权选项
  mongos        -连接多个数据库
  promiseLibrary
  示例：
  var options = {
    db: { native_parser: true },
    server: { poolSize: 5 },
    replset: { rs_name: 'myReplicaSetName' },
    user: 'myUserName',
    pass: 'myPassword'
  }
  mongoose.connect(uri, options);
  如果要连接多个数据库，只需要设置多个url以,隔开，同时设置mongos为true
  mongoose.connect('urlA,urlB,...', {
    mongos : true 
  })
  connect()函数还接受一个回调参数，示例：
  var mongoose = require('mongoose');
  mongoose.connect("mongodb://u1:123456@localhost/db1", function(err) {
    if(err){
      console.log('连接失败');
    }else{
      console.log('连接成功');
    }
  });
  setTimeout(function(){
    mongoose.disconnect(function(){
      console.log("断开连接");
    })
  }, 2000);
  使用disconnect()方法可以断开连接。
  Schema
  Schema主要用于定义MongoDB中集合Collection里文档document的结构。定义Schema非常简单，指定字段名和类型即可，支持的类型包括以下8种
  String      字符串
  Number      数字    
  Date        日期
  Buffer      二进制
  Boolean     布尔值
  Mixed       混合类型
  ObjectId    对象ID    
  Array       数组
  通过mongoose.Schema来调用Schema，然后使用new方法来创建schema对象
  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;
  var mySchema = new Schema({
    title:  String,
    author: String,
    body:   String,
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    meta: {
      votes: Number,
      favs:  Number
    }
  });
  注意：创建Schema对象时，声明字段类型有两种方法，一种是首字母大写的字段类型，另一种是引号包含的小写字段类型
  var mySchema = new Schema({title:String, author:String});
  //或者 
  var mySchema = new Schema({title:'string', author:'string'});
  如果需要在Schema定义后添加其他字段，可以使用add()方法
  var MySchema = new Schema;
  MySchema.add({ name: 'string', color: 'string', price: 'number' });
  timestamps
  在schema中设置timestamps为true，schema映射的文档document会自动添加createdAt和updatedAt这两个字段，代表创建时间和更新时间
  var UserSchema = new Schema(
    {...},
    { timestamps: true }
  );
  _id
  每一个文档document都会被mongoose添加一个不重复的_id，_id的数据类型不是字符串，而是ObjectID类型。如果在查询语句中要使用_id，则需要使用findById语句，而不能使用find或findOne语句

  钩子和方法
  在复杂的、拥有很多相互关联对象的应用中，我们可能会在保存一个对象之前想执行某些特定的逻辑。钩子(Hooks) 正是存储这些逻辑的好地方。示例：
  // 我们可能想在保存book这个文档之前上传一个PDF
  bookSchema.pre('save', function(next) {
    // 准备保存
    // 上传PDF
    return next();
  });
  // 又或者，在删除book文档之前，我们需要确定对于该文档没有其他待处理的请求
  bookSchema.pre('remove', function(next) {
    // 准备删除
    return next(e);
  });
  除了数十个内建的Mongoose模型方法，我们还可以增加一些自定义的方法。示例：
  // 当我们实现自定义实例方法buy()后，就可以调用practicalNodeBook文档的buy()方法。
  bookSchema.method({
    buy: function(quantity, customer, callback) {
      var bookToPurchase = this;
      // 创建一个购买订单和顾客发货单
      return callback(results);
    },
    refund: function(customer, callback) {
      // 退款处理
      return callback(results);
    }
  });
  // 当我们没有或不需要一个特定的文档对象的时候，静态方法就很有用
  bookSchema.static({
    getZeroInventoryReport: function(callback) {
      // 查找所有零库存的书籍
      return callback(books);
    },
    getCountOfBooksById: function(bookId, callback) {
      // 通过书籍ID查找读书的剩余数量
      return callback(count);
    }
  });
  注意：钩子和方法必须在原型编译成模型之前加进来一一换句话说，就是在调用mongoose.model()方法之前。
  就像在很多其他ORM中一样，在Mongoose中，模型都是最基础的对象。
  Mongoose模型的静态方法和含义如下所示：
  • Model.create(data,[callback(error,doc)]): 创建一个新的Mongoose文档并且保存到数据库
  • Model.remove(query,[callback(error)]): 删除集合中与查询条件匹配的文档。当完成时，调用带error参数的回调函数
  • Model.find(query,[fields],[options],[callback(error,docs)]): 查找与查询条件（JSON对象）匹配的文档
  • Model.update(query,update,[options],[callback(error,affectedCount,raw)]): 更新文挡，与本地更新类似
  • Model.populate(docs,options,[callback(error,doc)]): 使用其他集合的引用来填充文档：这是替换的另一种说法
  • Model.findOne(query,[fields],[options],[callback(error,doc)]): 查找第一个与查询条件匹配的文档
  • Model.findById(id,[fields],[options],[callback(error,doc)]): 查找第一个id值与id参数相同的元素（id根据原型进行类型转换）
  • Model.findOneAndUpdate([query],[update],[options],[callback(error,doc)]): 查找第一个和查询条件匹配的文档然后更新它，并且返回这个文档对象：同类型的方法是findAndModify
  • Model.findOneAndRemove(query,[options],[callback(error,doc)]): 查找第一个和查询条件匹配的文档然后删除它，并且返回这个文档对象
  • Model.findByIdAndUpdate(id,[update],[options],[callback(error,doc)]): 和findOneAndUpdate类似，但是只用ID来匹配
  • Model.findByIdAndRemove(id,[options],[callback(error,doc)]): 和findOneAndRemove类似，但是只用ID来匹配
  注意：并不是所有的Mongoose模型方法都会触发钩子。其中一些方法是直接执行。例如，调用Model.remove()方法并不会触发remove这个钩子，因为没有Mongoose文档被涉及。（Model的实例名一般用首字母小写的字符串表示，例如：practicalNodeBook）。
  模型最常用的一些方法列举如下：
  • doc.model(name): 返回另一个Mongoose模型
  • doc.remove([callback(error,doc}]}: 删除这个文档
  • doc.save([callback(error,doc,affectedCount)]): 保存这个文档
  • doc.update(doc,[options],[callback(error,affectedCount,raw)]): 使用doc属性以及options参数更新文档，直到完成更新时触发一个带有error、affectedCount的数量以及输出的数据库参数的回调函数
  • doc.toJSON([option]): 将一个Mongoose文档转为JSON对象（可配置参数稍后列出）
  • doc.toObject([option]): 将一个Mongoose文档转为纯的JavaScript对象（可配置参数稍后列出）
  • isModified([path]): 用来判断文档的某些部分（或者具体的字段）是否修改过，分别返回true或false
  • markModified(path): 手动标记一个字段为修改过，这对于混合数据类型(Schema.Types.Mixed)很有用，因为混合类型不会自动触发标记修改
  • doc.isNew: 判断一个文档是否为新建的，分别返回true或false
  • doc.id: 返回文档的ID
  • doc.set(path,value,[type],[options]): 设置一个path的value
  • doc.validate(callback(error)): 手动进行验证（在save()之前自动触发）
  toObject()和toJSON()的可配置的参数清单如下所示。
  • getters: 是否对所有字段进行转换（包括虚拟字段），分别返回true或false
  • virtuals: 是否对虚拟字段进行转换，重写该字段的配置选项
  • minimize: 删除空属性和空对象（默认值是true），分别返回true或false
  • transform: 在返回对象之前执行这个转换函数

  使用population建立关系和连接
  虽然，在NoSQL类的数据库，例如MongoDB中是不存储关系数据的，但是我们可以在应用层进行存储。Mongoose提供了这一特性，名为population。它允许我们使用不同的集合来填充文档的特定部分。示例：
  // 假设我们有posts和users两个集合。我们可以在user的原型中引用posts
  var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
  var userSchema = Schema({
    _id: Number,
    name: String,
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
  });
  var postSchema = Schema({
    _creator: { type: Number, ref: 'User' },
    title: String,
    text: String
  });
  var Post = mongoose.model('Post', postSchema);
  var User = mongoose.model('User', userSchema);
  // 在查询中，我们使用了正则表达式(RegExp)，虽然Mongoose并不包含这一特性，
  // 但实际上，原生的驱动以及其他封装库，就连mongo控制台都是支持正则表达式的。
  // 用这种方法，我们完成了对Post和User的联合查询。
  User.findOne({ name: /azat/i })
    .populate('posts')
    .exec(function (err, user) {
    if (err) return handleError(err);
    console.log('The user has % post(s)', user.posts.length);
  });
  // 当然也可以只返回复杂结果的一部分，例如，我们可以限制posts只取前10个
  /**
   * .populate({
   *   path: 'posts',
   *   options: { limit: 10, sort: 'title' }
   * })
   */
  // 有时候，只返回文档的特定部分比返回整个文档更实用。
  // 因为这可以避免潜在的安全信息泄露以及减少服务器负担。
  /**
   * .populate({
   *   path: 'posts',
   *   select: 'title',
   *   options: { limit: 10, sort: 'title' }
   * })
   */
  // 此外，Mongoose可以使用查询语句对复杂的返回结果进行过滤!
  // 例如，我们可以对text（其中一个查询匹配的属性）使用正则表达式匹配出"node.js"
  /**
   * .populate({
   *   path: 'posts',
   *   select: 'title',
   *   match: { text: /node\.js/i }
   *   options: { limit: 10, sort: 'title' }
   * })
   */
  // 对于自定义排序，我们可以使用形如name: -1 或者name: 1 这样的参数，并将它传给sort字段即可。
  // 同之前提到的一样，这是一个MongoDB的标准接口，不适用于Mongoose。
  /**
   * User.find({}, { limit: 10, sort: { _id: 1 } })
   *   .populate('posts')
   *   .exec(function(err, user){
   *     if(err) return handleError(err);
   *     console.log('The user has % post(s)', user.posts.length);
   *   });
   */

  嵌套文档
  往NoSQL数据库中存储模型很适合使用嵌套的文档。例如，我们可以使用一个单独的集合(users)代替两个集合(posts和users)，这个单独集合中的每一项都包含posts。
  决定是使用分开的集合还是嵌套的文档不止是一个代码结构的问题，这个问题的答案取决于用途。例如，如果posts 只是在users的上下文中用到，那么最好用嵌套的文档。然而，如果博客里多个posts需要独立于它们的users上下文被查询，那么将集合分离会比较合适。
  要使用嵌套文档，方法如下所示：
  1、使用Schema.Types.Mixed这个类型
  var userSchema = new mongoose.Schema({
    name: String,
    posts: [mongoose.Schema.Types.Mixed]
  });
  // 绑定方法、钩子等
  var User = mongoose.model('User', userSchema);
  2、为嵌套的文档创建一个新的原型（更加灵活和强大）。
  var postSchema = new mongoose.Schema({
    title: String,
    text: String
  });
  // post原型的其他方法、钩子等写在这里
  var userSchema = new mongoose.Schema({
    name: String,
    posts: [postSchema]
  });
  // user原型的其他方法、钩子等写在这里
  var User = mongoose.model('User', userSchema);
  如果想把post嵌套进一个新建或己经存在的user文档中，可以将posts这个属性当作一个数组对象，然后使用JavaScript/Node.js API中的push方法，或者用MongoDB的$push操作符
  User.update({ 
    _id: userId 
  },{ 
    $push: { 
      posts: newPost 
    } 
  },
  function(error, results) {
    // 处理错误，检查结果
  });

  虚拟字段
  虚拟字段并不真实存在于数据库中，但是在Mongoose文档中和普通字段中扮演着同样的角色。简单来讲，虚拟字段除了不会存入数据库外，其他方面和普通宇段没有区别。
  用虚拟字段创建聚合字段是很不错的选择。例如，如果我们的系统需要有姓、名以及全名等字段（全名不过是姓和名连接起来），所以除了姓、名的值不需要再存储全名的值。我们需要做的只是在虚拟字段里将姓和名连接起来。
  其他用例是使数据库向下兼容。例如，我们可能在一个MongoDB集合中有成千上万的用户条目，然后我们想收集它们的位置信息。这时有两个选择：一种是运行一个迁移脚本向成千上万个老的用户文档中增加默认的位置信息(none)，另一种是运行时使用一个默认配置的虚拟字段。
  定义一个虚拟字段我们需要：
  1、调用virtual(name)方法来创建一个虚拟类型
  2、使用get(fn)方法来应用getter函数
  示例：
  Identity.virtual('gravatarUrl').get(function(){
    if(!this.email) return null;
    var crypto = require('crypto'),
      email = 'Hi@azat.co ';
    email = email.trim()
    email = email.toLowerCase()
    var hash = crypto.createHash('md5').update(email).digest('hex');
    // console.log(hash);
    var gravatarBaseUrl = 'https://secure.gravatar.com/avatar';
    return gravatarBaseUrl + hash;
  });
  // 通过姓、名得到全名
  userSchema.virtual('fullName').get(function() {
    return this.firstName + ' ' + this.lastName;
  });
  // 其他场景是隐藏敏感信息。如下所示，如果用户模型有令牌和密码，
  // 我们使用白名单忽略这些敏感的宇段，只返回那些我们需要暴露的字段
  userSchema.virtual('info').get(function() {
    return {
      service: this.service,
      username: this.username,
      name: this.name,
      date: this.date,
      url: this.url,
      avatar: this.avatar
    };
  });

  Mongoose的原型
  原型是一个JSON格式的类，这个类包含一些关于文档的类型、属性等的信息。如果需要，它也可以存储一些验证信息和默认值。它还可以包含一些业务逻辑以及其他重要的信息。换句话说，原型可以作为文档的蓝图。模型创建的时候需要原型（即：原型被发布为模型）。所以在我们使用模型的属性前，需要先定义它们的原型。
  Mongoose原型支持下面这些数据类型。
  • String: 标准的JavaScript/Node.js的字符串类型（一个字符的序列）
  • Number: 标准的JavaScript/Node.js的数字类型，大至253(64位)；更大的数字用mongoose-long(Git)
  • Boolean: 标准的JavaScript/Node.js的布尔类型一一真或假
  • Buffer: Node.js的二进制类型（图像、PDF、档案等）
  • Date: ISO的标准格式化日期类型，例如2014-12-31T12:56:26.009Z
  • Array: 标准的JavaScript/Node.js数组类型
  • Schema.Types.ObjectId: MongoD中一个典型的24个字符，12字节的十六进制的数字字符串（例如， 52dafa354bd71b30fa12c441）
  • Schema.Types.Mixed: 任何类型的数据（即，灵活的类型）
  Mongoose并不理会混合型对象的更改，所以在保存对象之前调用markModified()方法来确保混合部分的更改是连续的。
  // 我们可以非常灵活地定义文档原型
  var ObjectId = mongoose.Schema.Types.Objectld,
    Mixed = mongoose.Schema.Types.Mixed;
  var bookSchema = mongoose.Schema({
    name: String,
    created_at: Date,
    updated_at: { type: Date, default: Date.now },
    published: Boolean,
    authorld: { type: Objectld, required: true },
    description: { type: String, default: null },
    active: { type: Boolean, default: false },
    keywords: { type: [ String ], default: [] },
    desc: { body: String, image: Buffer },
    version: { type: Number, default: function() { return 1; } },
    notes: Mixed,
    contributors: [ObjectId]
  });
  /**
   * 也可以创建和使用自定义的类型，如mongoose-types，其中涵盖了使用广泛的e-mail类型和URL类型的规则。
   * Mongoose的原型是可以自定义插件的，这意味着，通过创建插件，可以将某些功能扩展至当前应用的所有原型中。
   * 为了更好地组织和复用代码，在原型中，我们可以创建静态方法和实例方法，开发插件，以及定义钩子等。
   */
  在Node.js中进行验证，可以考虑使用validator.js和express-validator模块。

  修改原型的行为
  Mongoose允许我们在原型中自定义一些方法，如：取值器(get)、赋值器(set) 以及默认方法(default)！其他一些验证和一些有用的方法也都可以自定义。
  /**
   * 下面定义了一个
   * set方法（当赋值时将它转为小写格式）、
   * get方法（当数字过千时，在千位后增加逗号）、
   * default方法（生成全新的ObjectId对象），
   * 以及validate方法（当调用save()时触发此方法，检查是否为email），
   * 以上方法都定义在原型中类JSON结构中
   */
  postSchema = new mongoose.Schema({
    slug: {
      type: String,
      set: function(slug) {
        return slug.toLowerCase();
      }
    },
    numberOfLikes: {
      type: Number,
      get: function(value) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    },
    posted_at: {
      type: String,
      get: function(value) {
        if(!value) return null;
        return value.toUTCString();
      }
    },
    authorId: {
      type: ObjectId,
      default: function(){
        return new mongoose.Types.ObjectId();
      }
    },
    email: {
      type: String,
      unique: true,
      validate: [
        function(email) {
          // 正则匹配
        }
      ]
    }
  });
  如果由于某些原因，在原型中自定义方法不是一个好的选择（比如，系统可能需要动态地定义这些方法），还有另外一种方法来改变原型的行为一一使用链式方法。
  // 1、使用Schema.path(name)得到SchemaType
  // 2、使用SchemaType.get(fn)来设置getter方法
  userSchema.path('numberOfPosts').get(function(value){
    if(value) return value;
    return this.posts.length;
  });
  /**
   * path的含义仅仅是被嵌套的方法和它的父对象的连接名，例如，像user.contact.address.zip这样，
   * 我们在contact.address中有一个子方法zip，那么contact.address.zip就是path。
   */

  Errors
  1、Failed to load c++ bson extension, using pure JS version
  When you installed the mongoose module by npm, it hasn't build bson module within it's folder. see the file 'node_modules/mongoose/node_modules/mongodb/node_modules/bson/ext/index.js'
  bson = require('…/build/Release/bson');
  So just change it to bson = require('bson');
  and install bson module by npm.

Hapi
Why
  用Express.js和Hapi构建REST API。这是很重要的技术，因为越来越多的网络应用都转变为重前端轻后台的模式。一些系统甚至使用了free-JSON API或back-as-a-service这样的服务。这种趋势允许团队更加专注于对终端用户最重要的问题：用户接口、特性，以及对业务至关重要的：减少迭代周期、降低维护和开发成本等问题。
  另一个比较难的问题是测试驱动的实践。为了探讨这个问题，将会使用Mocha，它是一个针对REST API和TDD广泛使用的Node.js测试框架。
  在当下的Web开发中，瘦客户端和瘦服务端的架构变得越来越流行，瘦客户端一般基于Backbone.js、Angular JS、Ember.js等框架构建，而瘦服务端通常代表着REST风格的WebAPI服务。这种模式现在越来越流行，已经有Parse.com等不少网站选择尝试把后端建成服务的形式。它有如下一些优点：
  • 只需要一套REST API接口，便可以同时为多种客户端提供服务，其中也包括Web应用（还有移动端以及第三方应用等）。
  • 把客户端和服务分离开还有一点好处，以后更换客户端时不会影响到核心的业务逻辑，同样，更换服务端也不会。
  • 由于用户界面(UI/UX)本身是难以进行自动化测试的，尤其是使用了事件驱动的用户界面以及单页面应用等，同时跨浏览器情形更加大了测试的难度。但是，当我们把业务逻辑分开成不同的后端API之后，对逻辑部分的测试（无论是功能测试还是单元测试）就变得十分容易了。
  因此，现在许多新项目都选择使用REST API加客户端的方式进行开发。虽然有些项目开发初期只需要Web端，但是开发者应该会预见到，当项目需要再开发新的客户端时，他们可以省去不少重复性的工作。
What
  在分布式系统中，每次请求都需要携带关于客户端的足够的信息。从某种意义上讲，RESTful是无状态的，因为没有任何关于客户端状态的信息被存储在服务器上，这样也就保证了每次请求都能够被任意服务器处理，而得到相同的结果。
  RESTful的独立特性包括以下几种（换句话说，如果API 是RESTful的，它通常会遵循这些原则）：
  • RESTful API具有更好的可扩展性的支持，因为不同的组件可以独立部署到不同的服务器上。
  • 它使用简单的动作和内容替换SOAP(Simple Object Access Protocol)协议。
  • 它使用不同的HTTP请求方式，如GET、POST、DELETE、PUT、OPTIONS等。
  • JSON并不是唯一可选的内容格式（不过它是最流行的），可选的格式还有可扩展标记语言(XML)、逗号分隔值(CSV)等。这一点不同于SOAP，后者是一种协议，而RESTful作为一种设计风格，在内容格式的选择上更加灵活。
  REST并不是一种协议，它是一种架构，相比我们熟悉的SOAP等协议，它更加灵活。REST API的地址可以类似这种/messages/list.html或者这种/messages/list.xml，它取决于我们期望使用的内容格式。
  PUT和DELETE请求是幂等的，换句话说，当服务器收到多条相同的请求时，均能得到相同的结果。
  GET请求同样是幂等的。但是POST请求是非幂等的，所以重复请求可能会引发状态改变或其他未知异常。
  Hapi是一个企业级的框架。它比Express.js复杂，但功能更加丰富，更适合大团队开发使用。
How
  $npm install hapi@2.1.2 good@2.0.0 --save

Make
  网站开发正变得越来越专业，涉及到各种各样的工具和流程，迫切需要构建自动化。
  所谓“构建自动化”，就是指使用构建工具，自动实现“从源码到网页”的开发流程。这有利于提高开发效率、改善代码质量。
Why
  目前，网站项目（尤其是Node.js项目）有三种构建方案。
  方案一：基于Node.js的专用构建工具（Grunt、Gulp、Brunch、Broccoli、Mimosa）
  方案二：npm run命令
  方案三：make命令
  make是大型项目的首选方案。npm run可以认为是make的简化形式，只适用于简单项目，而Grunt、Gulp那样的工具，有很多问题。
  （1）插件问题
  Grunt和Gulp的操作，都由插件完成。即使是文件改名这样简单的任务，都要写插件，相当麻烦。而Make是直接调用命令行，根本不用担心找不到插件。
  （2）兼容性问题
  插件的版本，必须与Grunt和Gulp的版本匹配，还必须与对应的命令行程序匹配。比如，grunt-contrib-jshint插件现在是0.11.0版，对应Grunt 0.4.5版和JSHint 2.6.0版。万一Grunt和JSHint升级，而插件没有升级，就有可能出现兼容性问题。Make是直接调用JSHint，不存在这个问题。
  （3）语法问题
  Grunt和Gulp都有自己的语法，并不容易学，尤其是Grunt，语法很罗嗦，很难一眼看出来代码的意图。当然，make也不容易学，但它有复用性，学会了还可以用在其他场合。
  （4）功能问题
  make已经使用了几十年，全世界无数的大项目都用它构建，早就证明非常可靠，各种情况都有办法解决，前人累积的经验和资料也非常丰富。相比之下，Grunt和Gulp的历史都不长，使用范围有限，目前还没有出现它们能做、而make做不到的任务。
  基于以上理由，（阮一峰）看好make。
How
  下面是一些常见的网站构建任务。
  • 检查语法
  • 编译模板
  • 转码
  • 合并
  • 压缩
  • 测试
  • 删除
  这些任务用到JSHint、handlebars、CoffeeScript、uglifyjs、mocha等工具。对应的package.json文件如下。
  "devDependencies": {
    "coffee-script": "~1.9.1",
    "handlebars": "~3.0.0",
    "jshint": "^2.6.3",
    "mocha": "~2.2.1",
    "uglify-js": "~2.4.17"
  }

  Makefile的通用配置
  来看看，Make命令怎么完成这些构建任务。开始构建之前，要编写Makefile文件。它是make命令的配置文件。
	首先，写入两行通用配置。
  PATH  := node_modules/.bin:$(PATH)
  SHELL := /bin/bash
  上面代码的PATH和SHELL都是BASH变量。它们被重新赋值。
  PATH变量重新赋值为：优先在nodemodules/.bin目录寻找命令。这是因为（当前项目的）node模块，会在 nodemodules/.bin目录设置一个符号链接。PATH变量指向这个目录以后，调用各种命令就不用写路径了。比如，调用JSHint，就不用写~/node_modules/.bin/jshint，只写jshint就行了。
  SHELL变量指定构建环境使用BASH。

  检查语法错误
	第一个任务是，检查源码有没有语法错误。
  js_files = $(shell find ./lib -name '*.js')
  lint: $(js_files)
  jshint $?
  上面代码中，shell函数调用find命令，找出lib目录下所有js文件，保存在变量js_files。然后，就可以用jshint检查这些文件。
  使用时调用命令：$make lint

  模板编译
  第二个任务是编译模板。假定模板都在templates目录，需要编译为build目录下的templates.js文件。
  build/templates.js: templates/*.handlebars
  mkdir -p $(dir $@)
  handlebars templates/*.handlebars > $@
  template: build/templates.js
  上面代码查看build目录是否存在，如果不存在就新建一个。dir函数用于取出构建目标的路径名(build)，内置变量$@代表构建目标(build/templates.js)。
  使用时调用命令：$make template

  Coffee脚本转码
  第三个任务是，将CofferScript脚本转为JavaScript脚本。
  source_files := $(wildcard lib/*.coffee)
  build_files  := $(source_files:lib/%.coffee=build/%.js)
  build/%.js: lib/%.coffee
  coffee -co $(dir $@) $<
  coffee: $(build_files)
  上面代码中，首先获取所有的Coffee脚本文件，存放在变量sourcefiles，函数wildcard用来扩展通配符。然后，将变量sourcefiles中的coffee文件名，替换成js文件名，即lib/x.coffee替换成build/x.js。
  使用时调用命令：$make coffee

  合并文件
  使用cat命令，合并多个文件。
  JS_FILES := $(wildcard build/*.js)
  OUTPUT := build/bundle.js
  concat: $(JS_FILES)
  cat $^ > $(OUTPUT)
  使用时调用命令：$make concat

  压缩JavaScript脚本
  将所有JavaScript脚本，压缩为build目录下的app.js。
  app_bundle := build/app.js
  $(app_bundle): $(build_files) $(template_js)
  uglifyjs -cmo $@ $^
  min: $(app_bundle)
  使用时调用命令：$make min
  还有另一种写法，可以另行指定压缩工具。
  UGLIFY ?= uglify
  $(app_bundle): $(build_files) $(template_js)
  $(UGLIFY) -cmo $@ $^
  上面代码将压缩工具uglify放在变量UGLIFY。注意，变量的赋值符是?=，表示这个变量可以被命令行参数覆盖。
调用时这样写：$make UGLIFY=node_modules/.bin/jsmin min
  上面代码，将jsmin命令给变量UGLIFY，压缩时就会使用jsmin命令。

  删除临时文件
  构建结束前，删除所有临时文件。
  clean:
    rm -rf build
	使用时调用命令：$make clean

  测试
  假定测试工具是mocha，所有测试用例放在test目录下。
  test: $(app_bundle) $(test_js)
  mocha
  当脚本和测试用例都存在，上面代码就会执行mocha。
  使用时调用命令：$make test

  多任务执行
  构建过程需要一次性执行多个任务，可以指定一个多任务目标。
  build: template concat min clean
  上面代码将build指定为执行模板编译、文件合并、脚本压缩、删除临时文件四个任务。
  使用时调用命令：$make build
  如果这行规则在Makefile的最前面，执行时可以省略目标名。
  $make
  通常情况下，make一次执行一个任务。如果任务都是独立的，互相没有依赖关系，可以用参数-j指定同时执行多个任务。
  $make -j build

  声明伪文件
  最后，为了防止目标名与现有文件冲突，显式声明哪些目标是伪文件。
  .PHONY: lint template coffee concat min test clean build

  Examples
  Makefile文件示例
  下面是两个简单的Makefile文件，用来补充make命令的其他构建任务。
  实例一
  PROJECT = "My Fancy Node.js project"
  all: install test server
  test: ;@echo "Testing ${PROJECT}....."; \
    export NODE_PATH=.; \
    ./node_modules/mocha/bin/mocha;
  install: ;@echo "Installing ${PROJECT}....."; \
    npm install
  update: ;@echo "Updating ${PROJECT}....."; \
    git pull --rebase; \
    npm install
  clean : ;
    rm -rf node_modules
  .PHONY: test server install clean update
    
  实例二
  all: build-js build-css
  build-js: 
    browserify -t brfs src/app.js > site/app.js
  build-css:
    stylus src/style.styl > site/style.css
  .PHONY build-js build-css

  Reference
  http://www.gnu.org/software/make/
  http://gnuwin32.sourceforge.net/packages/make.htm

WebSocket
  实时应用程序现在越来越广泛地应用在游戏、社交媒体、各种工具、服务和新闻等领域。
  三大软件原则：
  1、DRY：Don't Repeat Yourself 不做重复的事
  2、KISS：Keep it Simple Stupid 保持简单直接
  3、YAGNI：You Ain't Gonna Need It 你不需要它
什么是WebSocket？
  WebSocket是浏览器（客户端）和服务器之间的一种特殊的通信通道，它是一个HTML5协议。传统的HTTP请求通常需要在客户端初始化，因此，如果服务器有更新的话，是没有办法通知客户端的。不同于传统的HTTP请求，WebSocket的连接是持久的，它通过在客户端和服务器之间保持双工连接，服务器的更新可以被及时推送给客户端，而不需要在客户端以一定的时间间隔去轮询。让WebSocket的思想运用到实时应用程序中的主要因素是客户端需要立即拿到服务器更新的数据。
  本地HTML5 WebSocket是一个了不起的技术。但是，WebSocket是一个协议，一个不断发展的标准。这就意味着每个浏览器的实现可能会有所不同。当然，如果要支持旧版本的浏览器，那你就应该再研究研究，并进行相应的测试。此外，连接可能会经常丢失，需要重新建立。为了处理跨浏览器兼容和向后兼容等问题，很多开发者都会依赖Socket.IO库
  在某种程度上，可以认为Socket.IO是另一个服务器，因为它处理的是socket连接，而不是标准的HTTP请求。
  通常情况下，WebSockets的数据是存储在高性能数据库中的，如Redis等。

DerbyJS
  Derby是一个新的、成熟的MVC框架，作为Express的中间件使用。Express.js是使用中间件概念增强应用程序功能的一个流行的node框架。Racer也支持Derby，它是一个数据同步引擎，类似Handlebars的模板引擎，拥有很多其他特性。
  Meteor和Sails.js是另一个实时全栈Node.js的MVC框架，可与DerbyJS相媲美。不过Meteor更保守些，它往往需要依赖于其他专有的解决方案和软件包。
  DerbyJS应用程序(app.js)巧妙地在浏览器和服务器问共享代码，所以你可以在一个地方（Node.js文件）写函数和方法。然而，依赖DerbyJS规则可以把app.js中的部分代码变成浏览器JavaScript代码。这种行为可以更好地复用和组织代码，因为你不需要复制路由、helper函数和实体方法。

上线准备

  环境变量
	实践：敏感信息最好保存在环境变量中，而不是放在源代码里！
	示例：
  代码中取值：process.env.NODE_ENV
             process.env.API_KEY
  启动应用前设值：$NODE_ENV=test API_KEY=XYZ node xxx.js
  注意：名称和值之间不能添加任何空格

  Express
  根据上面的环境变量区分不同环境
  if(process.env.NODE_ENV === 'development'){
		...
	}else{
		...
	}
  以上方法通用，Express.js 3.x中还有下面一种方法
  app.configure('development', function(){
		...
	});
  当使用内存中的session来存储（默认选项）的时候，这些数据是不能在不同的进程/服务器（运行在生产模式下）间共享的。但是，通过使用可共享的Redis实例可以轻易地解决这个问题。

  Socket.IO
  Socket.IO库也有configure()方法，它可以用来为不同的环境制定不同的规则。

  错误处理
  一般而言，我们会对http.Server和https.Server（它们通常都会有针对error事件的监听器来做一些相关处理）监听所有的错误事件；同时，针对异常情况，这里还有一个综合性的事件监听器(uncaughtException)。
  在Node.js中，开发人员可以编写异步代码，其中状态的改变可能会发生在不同的异步代码中，因此，有些时候，跟踪错误或是想知道程序在异常状况下所处的具体状态和上下文是非常困难的。为了缓解这样的状况，我们需要使用Node.js的domains，它用来帮助开发人员完成跟踪和定位错误的任务。

  使用Cluster处理多线程
  外界有人对Node.js有很大质疑，他们虚构了这样一个事实，认为基于Node.js的系统只能是单线程的。尽管一个Node.js进程确实是单线程的，但是我们必须要明白系统内部的真实情况。通过使用核心模块cluster，我们可以轻松生产出更多的Node.js进程来处理系统的加载。这些特殊的进程都使用相同的源代码，监听相同的端口。一般情况下，每个进程使用机器的一个CPU来工作。在这些进程中，有一个主进程。主进程可以生产出其他进程，同时在某种程度上控制这些进程（可以杀死、重启等）。

  使用Cluster2处理多线程
	如果你更青睐成熟的解决方案，而不是简单的库（如，cluster等），那可以考虑eBay在实际生产环境中使用的库：cluster2。它对cluster的核心模块进行了封装，提供了一些方便使用的工具函数，同时，它在大范围的实际生产环境中也久经考验。

  事件日志和监控
  当发生“灾难”的时候，例如系统超载和应用崩溃什么的，作为软件工程师有两件事情需要处理：
  1.监控系统各种状态信息（在监控窗口观察、使用REPL等）。
  2.事故发生后对各种统计信息进行分析（使用Winston和Papertrail）。
  在生产环境中，相关软件开发人员需要通过一种方法快速获取系统的当前状态。在监控窗口观察或者直接在中断的地方打出JSON格式的属性值都是不错的办法。如果是后者，那么需要包含的属性具有以下几项。
  • memoryUsage: 内存使用信息
  • uptime: Node.js进程的执行时间
  • pid: 进程ID
  • connections: 当前连接总数
  • loadavg: 平均负载
  • sha: Git提交发布的安全散列算法(SHA)标识，也可以顺带记录当前代码的发布版本号

  使用Grunt处理任务
  Grunt是一个基于Node.js的任务运行器。它可以自动化编译、压缩、检查代码、单元测试等重要任务。

事件循环
  进程：CPU执行任务的模块。线程：模块中的最小单元。
  例举：cpu比作我们每个人，到饭点吃饭了。可以点很多菜(cpu中的进程)：宫保鸡丁，鱼香肉丝，酸辣土豆丝。每样菜具体包含了哪些内容(cpu每个进程中的线程)：宫保鸡丁(详情：黄瓜、胡萝卜、鸡肉、花生米)。而详情构成了宫保鸡丁这道菜，吃了以后不饿。就可以干活了，cpu中的进程里的线程也是同理。当线程完成自己的内容将结果返回给进程，进程返回给cpu的时候。cpu就能处理日常需求。
  • 单进程单线程：一盘炒苦瓜，里面只有苦瓜。
  • 单进程多线程：一盘宫保鸡丁，里面有黄瓜、胡萝卜、鸡肉、花生米
  Node.js是单进程单线程应用程序，但是通过事件和回调支持并发，所以性能非常高。
  Node.js的每一个API都是异步的，并作为一个独立线程运行，使用异步函数调用，并处理并发。
  Node.js基本上所有的事件机制都是用设计模式中观察者模式实现。
  Node.js单线程类似进入一个while(true)的事件循环，直到没有事件观察者退出，每个异步事件都生成一个事件观察者，如果有事件发生就调用该回调函数.
  Node.js使用事件驱动模型，当web server接收到请求，就把它关闭然后进行处理，然后去服务下一个web请求。当这个请求完成，它被放回处理队列，当到达队列开头，这个结果被返回给用户。
  这个模型非常高效可扩展性非常强，因为webserver一直接受请求而不等待任何读写操作。（这也被称之为非阻塞式IO或者事件驱动IO）
  在事件驱动模型中，会生成一个主循环来监听事件，当检测到事件时触发回调函数。
  整个事件驱动的流程就是这么实现的，非常简洁。有点类似于观察者模式，事件相当于一个主题(Subject)，而所有注册到这个事件上的处理函数相当于观察者(Observer)。
  Node.js有多个内置的事件，我们可以通过引入events模块，并通过实例化EventEmitter类来绑定和监听事件，如下实例：
  // 引入events模块
  var events = require('events');
  // 创建eventEmitter对象
  var eventEmitter = new events.EventEmitter();
  以下程序绑定事件处理程序：
  // 绑定事件及事件的处理程序
  eventEmitter.on('eventName', eventHandler);
  我们可以通过程序触发事件：
  // 触发事件
  eventEmitter.emit('eventName');
  实例
  创建main.js文件，代码如下所示：
  // 引入events模块
  var events = require('events');
  // 创建eventEmitter对象
  var eventEmitter = new events.EventEmitter();
  // 创建事件处理程序
  var connectHandler = function connected() {
    console.log('连接成功。');
    // 触发data_received事件 
    eventEmitter.emit('data_received');
  }
  // 绑定connection事件处理程序
  eventEmitter.on('connection', connectHandler);
  // 使用匿名函数绑定data_received事件
  eventEmitter.on('data_received', function(){
    console.log('数据接收成功。');
  });
  // 触发connection事件 
  eventEmitter.emit('connection');
  console.log("程序执行完毕。");
  接下来让我们执行以上代码：$node main.js
  连接成功。
  数据接收成功。
  程序执行完毕。

Node应用程序是如何工作的？
  在Node应用程序中，执行异步操作的函数将回调函数作为最后一个参数，回调函数接收错误对象作为第一个参数。
  接下来让我们来重新看下前面的实例，创建一个input.txt，文件内容如下：
  菜鸟教程官网地址：www.runoob.com
  创建main.js文件，代码如下：
  var fs = require("fs");
  fs.readFile('input.txt', function (err, data) {
    if (err){
      console.log(err.stack);
      return;
    }
    console.log(data.toString());
  });
  console.log("程序执行完毕");
  以上程序中fs.readFile()是异步函数用于读取文件。如果在读取文件过程中发生错误，错误err对象就会输出错误信息。
  如果没发生错误，readFile跳过err对象的输出，文件内容就通过回调函数输出。
  执行以上代码，执行结果如下：
  程序执行完毕
  Error: ENOENT, open 'input.txt'
  因为文件input.txt不存在，所以输出了错误信息。

EventEmitter
  Node.js所有的异步I/O操作在完成时都会发送一个事件到事件队列。
  Node.js里面的许多对象都会分发事件：一个net.Server对象会在每次有新连接时分发一个事件，一个fs.readStream对象会在文件被打开的时候发出一个事件。所有这些产生事件的对象都是events.EventEmitter的实例。
  
  EventEmitter类
  events模块只提供了一个对象：events.EventEmitter。EventEmitter的核心就是事件触发与事件监听器功能的封装。
  你可以通过require("events");来访问该模块。
  // 引入events模块
  var events = require('events');
  // 创建eventEmitter对象
  var eventEmitter = new events.EventEmitter();
  EventEmitter对象如果在实例化时发生错误，会触发error事件。当添加新的监听器时，newListener事件会触发，当监听器被移除时，removeListener事件被触发。
  下面我们用一个简单的例子说明EventEmitter的用法：
  //event.js文件
  var EventEmitter = require('events').EventEmitter; 
  var event = new EventEmitter(); 
  event.on('some_event', function() { 
    console.log('some_event事件触发'); 
  }); 
  setTimeout(function() { 
    event.emit('some_event'); 
  }, 1000); 
  执行结果如下：
  运行这段代码，1秒后控制台输出了'some_event事件触发'。其原理是event对象注册了事件 some_event的一个监听器，然后我们通过setTimeout在1000毫秒以后向event对象发送事件some_event，此时会调用some_event的监听器。
  $node event.js 
  some_event事件触发
  EventEmitter的每个事件由一个事件名和若干个参数组成，事件名是一个字符串，通常表达一定的语义。对于每个事件，EventEmitter支持若干个事件监听器。
  当事件触发时，注册到这个事件的事件监听器被依次调用，事件参数作为回调函数参数传递。让我们以下面的例子解释这个过程：
  //event.js文件
  var events = require('events'); 
  var emitter = new events.EventEmitter(); 
  emitter.on('someEvent', function(arg1, arg2) { 
    console.log('listener1', arg1, arg2); 
  }); 
  emitter.on('someEvent', function(arg1, arg2) { 
    console.log('listener2', arg1, arg2); 
  }); 
  emitter.emit('someEvent', 'arg1 参数', 'arg2 参数'); 
  执行以上代码，运行的结果如下：
  $node event.js 
  listener1 arg1 参数 arg2 参数
  listener2 arg1 参数 arg2 参数
  以上例子中，emitter为事件someEvent注册了两个事件监听器，然后触发了someEvent事件。
  运行结果中可以看到两个事件监听器回调函数被先后调用。这就是EventEmitter最简单的用法。
  EventEmitter提供了多个属性，如on和emit。on函数用于绑定事件函数，emit属性用于触发一个事件。接下来我们来具体看下EventEmitter的属性介绍。

  方法
  序号	方法 & 描述
  1、addListener(event, listener) 为指定事件添加一个监听器到监听器数组的尾部。
  2、on(event, listener) 为指定事件注册一个监听器，接受一个字符串event和一个回调函数。
    server.on('connection', function (stream) {
      console.log('someone connected!');
    });
  3、once(event, listener) 为指定事件注册一个单次监听器，即监听器最多只会触发一次，触发后立刻解除该监听器。
    server.once('connection', function (stream) {
      console.log('Ah, we have our first user!');
    });
  4、removeListener(event, listener) 移除指定事件的某个监听器，监听器必须是该事件已经注册过的监听器。
    它接受两个参数，第一个是事件名称，第二个是回调函数名称。
    var callback = function(stream) {
      console.log('someone connected!');
    };
    server.on('connection', callback);
    // ...
    server.removeListener('connection', callback);
  5、removeAllListeners([event]) 移除所有事件的所有监听器，如果指定事件，则移除指定事件的所有监听器。
  6、setMaxListeners(n) 默认情况下，如果你添加的监听器超过10个就会输出警告信息。setMaxListeners函数用于提高监听器的默认限制的数量。
  7、listeners(event) 返回指定事件的监听器数组。
  8、emit(event, [arg1], [arg2], [...]) 按参数的顺序执行每个监听器，如果事件有注册监听返回true，否则返回false。

  类方法
  序号	方法 & 描述
  1、listenerCount(emitter, event) 返回指定事件的监听器数量。
  事件
  序号	事件 & 描述
  1、newListener
  event - 字符串，事件名称
  listener - 处理事件函数
  该事件在添加新监听器时被触发。
  2、removeListener
  event - 字符串，事件名称
  listener - 处理事件函数
  从指定监听器数组中删除一个监听器。需要注意的是，此操作将会改变处于被删监听器之后的那些监听器的索引。

  实例
  以下实例通过connection（连接）事件演示了EventEmitter类的应用。
  创建main.js文件，代码如下：
  var events = require('events');
  var eventEmitter = new events.EventEmitter();
  // 监听器 #1
  var listener1 = function listener1() {
    console.log('监听器listener1执行。');
  }
  // 监听器 #2
  var listener2 = function listener2() {
    console.log('监听器listener2执行。');
  }
  // 绑定connection事件，处理函数为listener1 
  eventEmitter.addListener('connection', listener1);
  // 绑定connection事件，处理函数为listener2
  eventEmitter.on('connection', listener2);
  var eventListeners = require('events').EventEmitter.listenerCount(eventEmitter,'connection');
  console.log(eventListeners + " 个监听器监听连接事件。");
  // 处理connection事件 
  eventEmitter.emit('connection');
  // 移除监绑定的listener1函数
  eventEmitter.removeListener('connection', listener1);
  console.log("listener1不再受监听。");
  // 触发连接事件
  eventEmitter.emit('connection');
  eventListeners = require('events').EventEmitter.listenerCount(eventEmitter,'connection');
  console.log(eventListeners + " 个监听器监听连接事件。");
  console.log("程序执行完毕。");
  以上代码，执行结果如下所示：
  $node main.js
  2个监听器监听连接事件。
  监听器listener1执行。
  监听器listener2执行。
  listener1不再受监听。
  监听器listener2执行。
  1个监听器监听连接事件。
  程序执行完毕。

  error事件
  EventEmitter定义了一个特殊的事件error，它包含了错误的语义，我们在遇到异常的时候通常会触发error事件。
  当error被触发时，EventEmitter规定如果没有响应的监听器，Node.js会把它当作异常，退出程序并输出错误信息。
  我们一般要为会触发error事件的对象设置监听器，避免遇到错误后整个程序崩溃。例如：
  var events = require('events'); 
  var emitter = new events.EventEmitter(); 
  emitter.emit('error'); 
  运行时会显示以下错误：
  node.js:201 
  throw e; // process.nextTick error, or 'error' event on first tick 
  ^ 
  Error: Uncaught, unspecified 'error' event. 
  at EventEmitter.emit (events.js:50:15) 
  at Object.<anonymous> (/home/byvoid/error.js:5:9) 
  at Module._compile (module.js:441:26) 
  at Object..js (module.js:459:10) 
  at Module.load (module.js:348:31) 
  at Function._load (module.js:308:12) 
  at Array.0 (module.js:479:10) 
  at EventEmitter._tickCallback (node.js:192:40) 

  继承EventEmitter
  大多数时候我们不会直接使用EventEmitter，而是在对象中继承它。包括fs、net、http在内的，只要是支持事件响应的核心模块都是EventEmitter的子类。
  为什么要这样做呢？原因有两点：
  首先，具有某个实体功能的对象实现事件符合语义，事件的监听和发生应该是一个对象的方法。
  其次JavaScript的对象机制是基于原型的，支持部分多重继承，继承EventEmitter不会打乱对象原有的继承关系。












手动创建项目结构
  创建文件夹
    node_modules：Express.js和第三方模块的依赖都这个目录下
    views：Jade或者其他模板引擎文件
    routes：包含请求处理程序的Node.js模块
    db：MongoDB的种子数据和脚本
    public：所有前端的静态文件，包括HTML、CSS、浏览器端的JavaScript和Stylus或者其他CSS框架文件
    一条命令搞定：mkdir {public, public/css, public/img, public/js, db, views , views/includes, routes}
  NPM初始化和配置package.json
    npm init
    npm install xxx --save
  依赖声明
    手动写入package.json，然后 npm install
  app.js文件
    通常都是入口文件：
    1、引入依赖
    2、设置相关配置
    3、连接数据库
    4、定义中间件，有些中间件也可能在路由后面，比如错误处理
    5、定义路由
    6、开启服务
    7、在多核系统上启动cluster多核处理模块

2、引入模板
  结合jade
    Jade绝对是一个令人惊奇的模板引擎，它能使开发者少写很多代码并且几乎支持所有JavaScript函数。
    它同样支持自顶向下(include) 及自底向上(extend)方式来引入模块。
    Jade也会将空格和缩进作为它语言的一部分，通常会用两个空格缩进。
  运行应用
    node app / node app.js ，如果入口文件为index.js，可以用 node.

3、单元测试
  BDD测试
    $npm install mocha@1.16.2 --save-dev
    $npm install expect.js@0.2.0 --save-dev
    $npm install superagent@0.15.7 --save-dev
    mocha 模块接受很多自定义参数。将这些参数集中写入Makefile (生成文件)是个不错的主意。例如，我们可以用test 和test-w 命令来测试test 文件夹下的所有文件，同时使用不同模式，分别测试module-a.js 和module-b.js 文件
------------------------------------------------------------------------------------------------------------------------------
REPORTER = list
MOCHA_OPTS = --ui bdd -c

test:
	clear
	echo Starting test *********************************************************
	./node_modules/mocha/bin/mocha \
	--reporter $(REPORTER) \
	$(MOCHA_OPTS) \
	tests/*.js
	echo Ending test
test-w:
	./node modules/mocha/bin/mocha \
	--reporter $(REPORTER) \
	--growl \
	--watch \
	$(MOCHA OPTS) \
	tests / *.js
test-module-a:
	mocha tests/module-a.js --ui tdd --reporter list --ignore-leaks
test-module-b:
	clear
	echo Starting test *********************************************************
	./node modules / mocha /bin/mocha \
	--reporter $(REPORTER) \
	$(MOCHA_OPTS) \
	tests/module-b.js
	echo Ending test
.PHONY: test test-w test-module-a test-module-b
------------------------------------------------------------------------------------------------------------------------------
    使用$ make <mode>来运行Makefile，本例中使用$ make test 即可。更多关于Makefile的信息，请参考http://www.cprogramming.com/tutorial/makefiles.html 中的Understanding Make部分，以及http://www.cs.swarthmore.edu/~newhall/unixhelp/howto_makefiles.html 中的Using Make and Writing Makefiles部分。

4、MongoDB
  首先，每次测试或者运行app都手动添加数据并不是那么有趣的事情。因此，与敏捷准则保持一致，可以通过创建Bash种子数据脚本db/seed.sh使这步自动化
  这个脚本利用了MongoDB的mongoimport特性，可以通过JSON文件直接将数据便捷地插入到数据库。

