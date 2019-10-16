// 我们可以非常灵活地定义文档原型
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var Mixed = Schema.Types.Mixed;
var bookSchema = Schema({
  name: String,
  created_at: Date,
  updated_at: { type: Date, default: Date.now },
  published: Boolean,
  authorld: { type: Objectld, required: true },
  description: { type: String, default: null },
  active: { type: Boolean, default: false },
  keywords: { type: [ String ], default: [] },
  desc: {
    body: String,
    image: Buffer
  },
  version: { type: Number, default: function() { return 1; } },
  notes: Mixed,
  contributors: [ObjectId]
});

/**
 * 也可以创建和使用自定义的类型，如mongoose-types，其中涵盖了使用广泛的e-mail类型和URL类型的规则。
 * Mongoose的原型是可以自定义插件的，这意味着，通过创建插件，可以将某些功能扩展至当前应用的所有原型中。
 * 为了更好地组织和复用代码，在原型中，我们可以创建静态方法和实例方法，开发插件，以及定义钩子等。
 */
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
// 假设我们有posts和users两个集合。我们可以在user的原型中引用posts
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
// 在查询中，我们使用了正则表达式(RegExp)，虽然Mongoose并不包含这一特性，但实际上，原生的驱动以及其他封装库，就连mongo控制台都是支持正则表达式的。
// 用这种方法，我们完成了对Post和User的联合查询。
User.findOne({ name: /azat/i })
  .populate('posts')
  .exec(function (err, user) {
    if (err) return handleError(err);
    console.log('The user has % post(s)', user.posts.length);
});
/**
 * 当然也可以只返回复杂结果的一部分，例如，我们可以限制posts只取前10个
 * .populate({
 *   path: 'posts',
 *   options: { limit: 10, sort: 'title' }
 * })
 * 有时候，只返回文档的特定部分比返回整个文档更实用，因为这可以避免潜在的安全信息泄露以及减少服务器负担。
 * .populate({
 *   path: 'posts',
 *   select: 'title',
 *   options: { limit: 10, sort: 'title' }
 * })
 * 此外，Mongoose可以使用查询语句对复杂的返回结果进行过滤!
 * 例如，我们可以对text（其中一个查询匹配的属性）使用正则表达式匹配出"node.js"
 * .populate({
 *   path: 'posts',
 *   select: 'title',
 *   match: { text: /node\.js/i }
 *   options: { limit: 10, sort: 'title' }
 * })
 * 对于自定义排序，我们可以使用形如name: -1 或者name: 1这样的参数，并将它传给sort字段即可。
 * 同之前提到的一样，这是一个MongoDB的标准接口，不适用于Mongoose。
 * User.find({}, { limit: 10, sort: { _id: 1 } })
 *   .populate('posts')
 *   .exec(function(err, user){
 *     if(err) return handleError(err);
 *     console.log('The user has % post(s)', user.posts.length);
 *   });
 */

var postSchema = new mongoose.Schema({
  title: String,
  text: String
});
// post原型的其他方法、钩子等写在这里
// ...
var userSchema = new mongoose.Schema({
  name: String,
  posts: [postSchema]
});
// user原型的其他方法、钩子等写在这里
// ...
var User = mongoose.model('User', userSchema);

/**
 * 如果想把post嵌套进一个新建或己经存在的user文档中，可以将posts这个属性当作一个数组对象，然后使用JavaScript/Node.js API中的push方法，或者用MongoDB的$push操作符
 */
User.update(
  { _id: userId },
  { $push: { posts: newPost } },
  function(error, results) {
    // 处理错误，检查结果
  });

// 通过姓、名得到全名
userSchema.virtual('fullName').get(function() {
  return this.firstName + ' ' + this.lastName;
});
// 如何隐藏敏感信息？如下所示，如果用户模型有令牌和密码，我们使用白名单忽略这些敏感的宇段，只返回那些我们需要暴露的字段
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

/**
 * 初始化之后怎么设置Schema？
 * 1、使用Schema.path(name)得到SchemaType
 * 2、使用SchemaType.get(fn)来设置getter方法
 * path的含义仅仅是被嵌套的方法和它的父对象的连接名，例如，像user.contact.address.zip这样，我们在contact.address中有一个子方法zip，那么contact.address.zip就是path。
 */ 
userSchema.path('numberOfPosts').get(function(value){
  if(value) return value;
  return this.posts.length;
});
