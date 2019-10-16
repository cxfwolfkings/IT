var express = require('express'),
    mongoskin = require('mongoskin'),
    bodyParser = require('body-parser'),
    logger = require('morgan');

var app = express();

// 使用bodyParser.urlencoded() 和bodyParser.json() 两个中间件从响应体中提取参数和数据。
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
// express.logger() 中间件并不是必需的，它的作用是方便我们监控请求。
app.use(logger());

var db = mongoskin.db('mongodb://@localhost:27017/test', {
    safe: true
});
// 下面的语句是一个辅助函数，用来把普通的十六进制字符串转化成MongoDB ObjectID数据类型
var id = mongoskin.helper.toObjectID;

// app.param()方法是Express.js中间件的另一种形式。它的作用是当URL中出现对应的参数时进行一些操作。
app.param('collectionName', function (req, res, next, collectionName) {
    req.collection = db.collection(collectionName);
    return next();
});

// 为了达到更好的用户体验，这里添加一个根路由，用来提示用户在他们访问的URL中包含要查找的集合名字
app.get('/', function (req, res, next) {
    res.send('Select a collection, e.g., /collections/messages');
});

// 下面是非常重要的逻辑，它实现了对列表按id属性进行排序，并限制最多只返回10个元素
app.get('/collections/:collectionName', function (req, res, next) {
    req.collection.find({}, {
            limit: 10,
            sort: [
                ['_id', -1]
            ]
        })
        .toArray(function (e, results) {
            if (e) return next(e);
            res.send(results);
        });
        // 这种方法，或者叫架构，通常被称作"自由JSON 格式的REST API"，因为客户端可以抛出任意格式的数据，而服务器总能进行正常的响应
});

// 创建对象的接口比较容易，因为我们只需要把整个请求传给MongoDB就行了
app.post('/collections/:collectionName', function (req, res, next) {
    req.collection.insert(req.body, {}, function (e, results) {
        if (e) return next(e);
        res.send(results);
    });
});

// 检索单一对象的方法比find()方法速度更快，但是它们使用的是不同的接口（请注意，前者会直接返回结果对象，而不是句柄）。
app.get('/collections/:collectionName/:id', function (req, res, next) {
    req.collection.findOne({
        _id: id(req.params.id)
    }, function (e, result) {
        if (e) return next(e);
        res.send(result);
    });
});

// PUT请求的有趣之处在于，update()方法返回的不是变更的对象，而是变更对象的计数。
// 同时，{ $set: req.body }是一种特殊的MongoDB操作（操作名以$符开头），它用来设置值。
// 第二个参数{ safe: true, multi: false }是一个保存配置的对象，它用来告诉MongoDB，等到执行结束后才运行回调，并且只处理一条（第一条）请求。
app.put('/collections/:collectionName/:id', function (req, res, next) {
    req.collection.update({
        _id: id(req.params.id)
    }, {
        $set: req.body
    }, {
        safe: true,
        multi: false
    }, function (e, result) {
        if (e) return next(e);
        res.send((result === 1) ? {
            msg: 'success'
        } : {
            msg: 'error'
        });
    });
});

/**
 * 最后一个，DELETE请求，它同样会返回定义好的JS0N格式的信息
 * app.del()方法是app.delete()方法的一个别名
 */
app.del('/collections/:collectionName/:id', function (req, res, next) {
    req.collection.remove({
        _id: id(req.params.id)
    }, function (e, result) {
        if (e) return next(e);
        res.send((result === 1) ? {
            msg: 'success'
        } : {
            msg: 'error'
        });
    });
});

app.listen(3000, function () {
    console.log('Server is running');
});

/**
 * 现在在命令行中执行 $ node demo1 启动API服务
 * 然后新开一个命令行，运行测试程序 $ mocha testDemo1
 * 如果你确实不喜欢Mocha或者BDD（和TDD），CURL是另一种可选方案
 * get：$ curl http://loca1host:3000/collections/curl-test
 * post: $ curl -d "name=peter&email=peter337@rpjs.co" http://localhost:3000/collections/curl-test
 * delete/put：$ curl --request DELETE http://localhost:3000/collections/curl-test/52f6828a23985a6565000008
 * 我们写的测试代码比应用本身的代码还要多，所以很多人可能懒得使用TDD。
 * 但是所谓磨刀不误砍柴工，养成使用TDD的好习惯能帮你节省大量的时间，而且在越复杂的项目中表现越明显。
 * REST API本身并没有一个可以展示的界面，它是提供给程序（客户端或其他终端）来访问的。
 * 所以当需要测试API时，我们没有太多选择，要么写一个客户端程序，要么手动使用CURL命令（也可以在浏览器的控制台中使用jQuery的$.ajax()方法）。
 * 但其实最好的方法还是使用测试用例，如果我们把逻辑梳理清楚，那么每个用例都像一个小的客户端程序一样。当然，还不止这些，TDD在重构时也是非常有用的。
 */