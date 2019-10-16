// 1、引入mongoose模块
var mongoose = require('mongoose');
// 2、只用一行代码就能连接到数据库服务器 mongoose.connect(uri(s), [options], [callback])
// Mongoose的请求是异步的，所以我们无须等待连接建立完成（而原生驱动则通常需要回调来实现）。
mongoose.connect('mongodb://localhost/test', { 
  useNewUrlParser: true
});
// 在Node.js和Mongoose应用中的常见做法是，当程序开始执行时就打开一个数据库连接，并且保持连接直到程序终止。对于网络应用程序以及服务器同样如此。

// 3、相比Mongoskin以及其他轻量级的MongoDB类库，Mongoose有一个明显的区别，就是使用model()函数并传入一个字符串和一个原型来创建一个模型。
// 第一个参数就是一个字符串，我们可以使用它来调用这个实例。通常，这个字符串和模型的变量名一致，这个模型变量名的首字母一般大写
var Book = mongoose.model('Book', { name: String });
// 4、配置阶段的工作结束，可以实例化Book文档对象。我们可以使用new ModeName(data)这样的代码来创建文档
// 相比使用document.set()方法来说，最好通过构造器来指定初始值，因为这样Mongoose可以少处理一些函数调用，同时我们的代码也会更紧凑、更有层次。
// 当然，前提是当我们创建实例时知道这些属性的值。
var practicalNodeBook = new Book({ name: 'Practical Node.js' });

/**
 * 不要混淆静态方法和实例方法。当我们调用practicalNodeBook的一个方法，这是实例方法；
 * 当我们调用Book对象的方法，则是静态类方法。
 * 
 * Mongoose文档对象拥有非常方便的内置方法，比如: validate、isNew、update等。
 * 但要记住，这些方法只适用于这个文档对象本身，并不适用于整个集合或模型。
 * 文档对象和模型的区别是，文档对象是模型的一个实例：
 * 模型通常是抽象的，就像真正的MongoDB集合，它由原型、额外的方法和属性组成，并呈现为一个Node.js的类。
 * Mongoose中的集合很像Mongoskin或者原生驱动中的集合，严格来讲，模型、集合以及文档是不同的Mongoose类。
 *
 * 通常我们不会直接使用Mongoose 的集合，只会使用模型对数据进行操作。其中一些主要的方法看起来非常像Mongoskin 或原生驱动中的方法，比如find、insert()、save等。
 */
// 5、使用文档的方法：document.save()，来完成脚本，将刚刚的Book文档写入数据库
practicalNodeBook.save(function (err, results) {
  if (err) {
    console.error(e);
    process.exit(1);
  } else {
    console.log('Saved: ', results);
    process.exit(0);
  }
});
