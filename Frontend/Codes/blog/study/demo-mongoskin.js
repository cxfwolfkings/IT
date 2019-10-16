/**
 * mongoskin示例
 * 注意package.json文件中mongodb、mongoskin组件的版本！
 * "mongodb": "^2.2.36",
 * "mongoskin": "^2.1.0"
 */
var mongoskin = require('mongoskin');
var db = mongoskin.db("mongodb://localhost:27017/test", {
  native_parser: true,
});
db.bind('user');
db.user.find().toArray(function (err, items) {
  console.log(items);
  db.close();
});