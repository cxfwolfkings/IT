// 1、引入依赖
var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var models = require('./models');
var everyauth = require('everyauth');
// 声明Express.js 4中间件
var session = require('express-session');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// 2、设置相关配置
// 打开调试模式，在开发初期使用调试模式是一种好习惯
everyauth.debug = true;
var app = express();
app.locals.appTitle = 'blog';
// 服务器应该监听请求的端口号
app.set('port', process.env.PORT || 3000);
// 视图模板的绝对路径
app.set('views', path.join(__dirname, 'views'));
// 模板文件的扩展，例如jade、html
app.set('view engine', 'jade');

// 3、连接数据库
var dbUrl = 'mongodb://@localhost:27017/blog';
mongoose.connect(dbUrl, { useNewUrlParser: true });

/**
 * 4、定义中间件
 * 中间件是Express.js框架中的骨干部分，它有两种生成方式：
 * (1)由外部第三方的模块定义，例如来自ConnectlExpress.js的body-parser.json: app.use(bodyParser.json());
 * (2)由应用本身或它的模块所定义，比如app.use(function(req, res, next) (...});
 * 中间件是用来组织和复用代码的一种方式，函数中只有三个参数: request、response 和 next。
 */
app.use(function (req, res, next) {
    if (!models.Article || !models.User) return next(new Error("No models."));
    req.models = models;
    return next();
});
// 这个配置包括了很多Connect/Express中间件，大部分的含义是日志请求、解析JSON输入，使用Stylus和服务器静态内容
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// cookieParser()需要在session()之前执行，因为session需要依赖cookie才能正常工作。
app.use(cookieParser('3CCC4ACD-6ED1-4844-9217-82131BDCB239'));
app.use(session({ secret: '2C44774A-D649-4D44-9535-46E296EF984F' }));
// 最后，需要添加下面一行代码来启用Everyauth路由规则，它必须添加在处理cookie和session的中间件之后，并且在其他的普通路由之前
app.use(everyauth.middleware());
app.use(methodOverride());
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));
// Authentication middleware
app.use(function (req, res, next) {
  if (req.session && req.session.admin) res.locals.admin = true;
  next();
});
// Authorization Middleware
var authorize = function (req, res, next) {
  if (req.session && req.session.admin) return next();
  else return res.send(401);
};
/**
 * development only
 * 在开发中，我们使用标准的Express.js 4错误处理器，已经在前面用require方式引入了
 */
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

/**
 * 5、定义路由。
 * 一般来说，路由会放在中间件的后面，但是有些中间件也可能放在路由后面。例如，错误处理。
 * all: 捕获每一个请求（所有方式的）
 * get: 捕获GET请求
 * post: 捕获POST请求
 * put: 捕获PUT请求
 * del: 捕获DELETE请求
 * Pages and routes
 */
app.get('/', routes.index);
app.get('/login', routes.user.login);
app.post('/login', routes.user.authenticate);
app.get('/logout', routes.user.logout);
app.get('/admin', authorize, routes.article.admin);
app.get('/post', authorize, routes.article.post);
app.post('/post', authorize, routes.article.postArticle);
app.get('/articles/:slug', routes.article.show);
/**
 * REST API routes
 * REST API路由主要用于管理页面。那是JavaScript执行AJAX所需要的。包括GET、POST、PUT和DELETE方法，不会把Jade模板渲染成HTML，但是会输出JSON代替
 */
app.all('/api', authorize);
app.get('/api/articles', routes.article.list);
app.post('/api/articles', routes.article.add);
app.put('/api/articles/:id', routes.article.edit);
app.del('/api/articles/:id', routes.article.del);
/**
 * 最后，还有一个404 catch-all路由。对用户输入错误URL的解释，这是一个很好的实践。
 * res.render(viewName, data, callback(error, html)) 中的参数意义如下：
 *   viewName: 带有文件名扩展的模板名或者未设置扩展的模板引擎
 *   data: 一个由locals传递的可选对象
 *   callback: 一个可选函数，由错误或者HTML绘制完成后调用
 * res.render()不在Node.js的核心函数中，而是纯粹的Express.js函数，如果被调用，它会调用res.end()，从而结束响应。
 * 换句话说，在res.render()函数后面，中间件中的链不会再进行任何处理。
 */
app.all('*', function (req, res) {
  res.send(404);
});

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
