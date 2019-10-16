var hapi = require('hapi'),
  server = hapi.createServer('localhost', 3000), // 创建一个hapi服务器对象
  mongoskin = require('mongoskin');

// 连接数据库
var db = mongoskin.db('mongodb://@localhost:27017/test', {
  safe: true
});
var id = mongoskin.helper.toObjectID();

// 定义一个loadCollection方法，它接收数据库名做参数，然后去异步加载数据库。接收的参数是URL，返回值是数据库集合
var loadCollection = function (name, callback) {
  callback(db.collection(name));
};

// 路由处理
server.route([{
    method: 'GET',
    path: '/',
    handler: function (req, reply) {
      reply('Select a collection, e.g., /collections/messages');
    }
  },
  {
    method: 'GET',
    path: '/collections/{collectionName}',
    handler: function (req, reply) {
      loadCollection(req.params.collectionName, function (collection) {
        collection.find({}, {
          limit: 10,
          sort: [
            ['_id', -1]
          ]
        }).toArray(function (e, results) {
          if (e) return reply(e);
          reply(results);
        });
      });
    }
  },
  {
    method: 'POST',
    path: '/collections/{collectionName}',
    handler: function (req, reply) {
      loadCollection(req.params.collectionName, function (collection) {
        collection.insert(req.payload, {}, function (e, results) {
          if (e) return reply(e);
          reply(results);
        });
      });
    }
  },
  {
    method: 'GET',
    path: '/collections/{collectionName}/{id}',
    handler: function (req, reply) {
      loadCollection(req.params.collectionName, function (collection) {
        collection.findOne({
          _id: id(req.params.id)
        }, function (e, result) {
          if (e) return reply(e);
          reply(result);
        });
      });
    }
  },
  {
    method: 'PUT',
    path: '/collections/{collectionName}/{id}',
    handler: function (req, reply) {
      loadCollection(req.params.collectionName, function (collection) {
        collection.update({
          _id: id(req.params.id)
        }, {
          $set: req.payload
        }, {
          safe: true,
          multi: false
        }, function (e, result) {
          if (e) return reply(e);
          reply((result === 1) ? {
            msg: 'success'
          } : {
            msg: 'error'
          });
        });
      });
    }
  },
  {
    method: 'DELETE',
    path: '/collections/{collectionName}/{id}',
    handler: function (req, reply) {
      loadCollection(req.params.collectionName, function (collection) {
        collection.remove({
          _id: id(req.params.id)
        }, function (e, result) {
          if (e) return reply(e);
          reply((result === 1) ? {
            msg: 'success'
          } : {
            msg: 'error'
          });
        });
      });
    }
  }
]);

// 下面的配置是控制日志的
var options = {
  subscribers: {
    'console': ['ops', 'request', 'log', 'error']
  }
};

server.pack.require('good', options, function (err) {
  if (!err) {
    // Plugin loaded successfully
  }
});

// 启动服务器
server.start();