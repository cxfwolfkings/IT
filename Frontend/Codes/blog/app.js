var TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY;
var TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET;

// 1、引入依赖
var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

// 添加持久链接
//var mongoskin = require('mongoskin');
var dbUrl = process.env.MONGOHQ_URL || 'mongodb://@localhost:27017/blog';
/*
var db = mongoskin.db(dbUrl, {
  safe: true
});
var collections = {
  articles: db.collection('articles'),
  users: db.collection('users')
};
*/
// 增加一个新的Mongoose 引用
var mongoose = require('mongoose');
// 创建一个models 文件夹(命令: $ mkdir models)，然后引用它
var models = require('./models');
// 连接
var db = mongoose.connect(dbUrl, {
  safe: true
});

var everyauth = require('everyauth');

var mongoose = require('mongoose');

// 这个声明需要Express.js 4 中间件:
var session = require('express-session'),
  logger = require('morgan'),
  errorHandler = require('errorhandler'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override');

// 打开调试模式，在开发初期使用调试模式是一种好习惯
everyauth.debug = true;
everyauth.twitter
  .consumerKey(TWITTER_CONSUMER_KEY)
  .consumerSecret(TWITTER_CONSUMER_SECRET) // 传入之前定义的key 和secret
  .findOrCreateUser(function (session, accessToken, accessTokenSecret, twitterUserMetadata) { // 接下来，添加Twitter 返回响应时的回调函数
    // 我们本可以在这里直接返回用户对象，不过为了更真实地模拟写入数据库是异步过程，我们在这里创建了一个promise 对象
    var promise = this.Promise();
    // 然后使用process.nextTick 函数（与setTimeout(callback, 0);作用相似）来模拟一次异步请求。
    // 在真实的应用中，这里应该是读写数据库相关的语句
    process.nextTick(function () {
      if (twitterUserMetadata.screen_name === 'azat_co') {
        session.user = twitterUserMetadata;
        session.admin = true;
      }
      promise.fulfill(twitterUserMetadata);
    });
    // 按Everyauth的规范， 需要在最后返回promise对象
    return promise;
    // return twitterUserMetadata
  })
  .redirectPath('/admin');

// we need it because otherwise the session will be kept alive
// the Express.js request is intercepted by Everyauth automatically added /logout
// and never makes it to our /logout
// Everyauth 会自动添加一条/logout 路由，这样原本的登出路由就可以省略了。
// 但是我们需要修改Everyauth的默认登出逻辑，在handleLogout 这一步中调用user.js 中提供的登出方法，否则admin 标志会恒为true
everyauth.everymodule.handleLogout(routes.user.logout);
// 下面几行代码的作用是告诉Everyauth如何根据用户参数查找到用户对象。
// 不过由于我们已经把用户对象储存到session中了，所以在这里可以直接返回
everyauth.everymodule.findUserById(function (user, callback) {
  callback(user);
});

// 2、设置相关配置
var app = express();
app.locals.appTitle = 'blog';

// 服务器应该监听请求的端口号
app.set('port', process.env.PORT || 3000);
// 视图模板的绝对路径
app.set('views', path.join(__dirname, 'views'));
// 模板文件的扩展，例如jade、html
app.set('view engine', 'jade');

// 3、连接数据库

// 4、定义中间件
// 中间件是 Express.js 框架中的骨干部分，它有两种生成方式：
// (1)由外部第三方的模块定义，例如来自ConnectlExpress.js body-parser: app.use(bodyParser.json()); 的bodyParser.json
// (2)由应用本身或它的模块所定义，比如app.use(function(req, res, next) (...});
// 中间件是用来组织和复用代码的一种方式，函数中只有三个参数: request、response 和 next。
// 现在，我们添加一个中间件来暴露Mongoskin/MongoDB集合在每个Express.js的路径
/*
app.use(function (req, res, next) {
  if (!collections.articles || !collections.users)
    return next(new Error("No collections."));
  req.collections = collections;
  // 不要忘了调用next()，否则， 每个请求都要延迟。
  return next();
});
*/
app.use(function (req, res, next) {
  if (!models.Article || !models.User) return next(new Error("No models."));
  req.models = models;
  return next();
});

// 这个配置包括了很多Connect/Express 中间件，大部分的含义是日志请求、解析JSON输入，使用Stylus 和服务器静态内容:
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// cookieParser()需要在session()之前执行，因为session需要依赖cookie才能正常工作。
app.use(cookieParser('3CCC4ACD-6ED1-4844-9217-82131BDCB239'));
app.use(session({
  secret: '2C44774A-D649-4D44-9535-46E296EF984F'
}));
// 最后，需要添加下面一行代码来启用Everyauth路由规则，它必须添加在处理cookie和session的中间件之后，并且在其他的普通路由之前
app.use(everyauth.middleware());
app.use(methodOverride());
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// Authentication middleware
app.use(function (req, res, next) {
  if (req.session && req.session.admin)
    res.locals.admin = true;
  next();
});

// Authorization Middleware
var authorize = function (req, res, next) {
  if (req.session && req.session.admin)
    return next();
  else
    return res.send(401);
};

// development only
// 在开发中，我们使用标准的Express.js 4错误处理器，已经在前面用require 方式引入了:
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

// 5、定义路由。一般来说，路由会放在中间件的后面，但是有些中间件也可能放在路由后面。例如，错误处理。
// all : 捕获每一个请求(所有方式的)
// get: 捕获GET 请求
// post : 捕获POST 请求
// put : 捕获PUT 请求
// del: 捕获DELETE 请求
// Pages and routes
app.get('/', routes.index);
app.get('/login', routes.user.login);
app.post('/login', routes.user.authenticate);
app.get('/logout', routes.user.logout);
app.get('/admin', authorize, routes.article.admin);
app.get('/post', authorize, routes.article.post);
app.post('/post', authorize, routes.article.postArticle);
app.get('/articles/:slug', routes.article.show);

// REST API routes
// REST API 路由主要用于管理页面。那是JavaScript 执行AJAX 所需要的。包括GET、POST、PUT和DELETE方法，不会把Jade模板渲染成HTML，但是会输出JSON代替
app.all('/api', authorize);
app.get('/api/articles', routes.article.list);
app.post('/api/articles', routes.article.add);
app.put('/api/articles/:id', routes.article.edit);
app.del('/api/articles/:id', routes.article.del);
// 最后，还有一个404 catch-all 路由。对用户输入错误URL 的解释，这是一个很好的实践。
app.all('*', function (req, res) {
  // res.render(viewName, data, callback(error, html)) 中的参数意义如下：
  // viewName : 带有文件名扩展的模板名或者未设置扩展的模板引擎
  // data: 一个由locals 传递的可选对象
  // callback : 一个可选函数，由错误或者HTML 绘制完成后调用
  /**
   * res.render()不在Node.js 的核心函数中，而是纯粹的Express.js 函数，如果被调用，它会调用res.end()，从而结束响应。
   * 换句话说，在res.render()函数后面，中间件中的链不会进行任何处理。
   */
  res.send(404);
});

// http.createServer(app).listen(app.get('port'), function(){
// console.log('Express server listening on port ' + app.get('port'));
// });

// 6、开启服务
var server = http.createServer(app);
var boot = function () {
  server.listen(app.get('port'), function () {
    console.info('Express server listening on port ' + app.get('port'));
  });
};
var shutdown = function () {
  server.close();
};
if (require.main === module) {
  boot();
} else {
  console.info('Running app as a module');
  exports.boot = boot;
  exports.shutdown = shutdown;
  exports.port = app.get('port');
}

// 7、在多核系统上启动 cluster 多核处理模块（可选）
// 这个顺序很重要，因为请求会沿着中间件的处理链自上而下进行。
