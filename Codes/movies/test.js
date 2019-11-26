const sqlite3 = require('sqlite3').verbose();
// 创建内存数据库
let db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('已经成功连接SQLite数据库');
});

/**
 * Node.js 和 Electron 使用的都是 Google 的 V8 JavaScript 引擎，
 * 但却不是同一个版本，此外 sqlite 3 模块虽然接口是 JavaScript 的，
 * 但内核其实是使用 C 实现的，而且编译生成了 Node.js 的本地模块，
 * 也就是 node_sqlite3.node 文件。这是一个二进制文件，对 V8 引擎版本敏感。
 * 由于 sqlite 3 模块在发布时使用的是 Node.js 中的 V8 引擎，
 * 因而放在 Electron 中自然就不好使，要想在 Electron 中使用 sqlite 3 模块，
 * 就必须利用 Electron V8 引擎重新编译 sqlite 3 模块。
 */