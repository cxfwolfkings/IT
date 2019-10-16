// 包含article的原型、方法和模型

var mongoose = require('mongoose');

var articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    validate: [function(value) {return value.length<=120;}, 'Title is too long (120 max)'],
    default: 'New Post'
  },
  text: String,
  published: {
    type: Boolean,
    default: false
  },
  slug: {
    type: String,
    set: function(value){return value.toLowerCase().replace(' ', '-');}
  }
});

// 为了代码的重用，我们从routes/article.js路由中提取出find方法到models/article.js模型中。
articleSchema.static({
  list: function(callback){
    this.find({}, null, {sort: {_id:-1}}, callback);
  }
});
// 我们将原型和方法编译为一个模块
module.exports = mongoose.model('Article', articleSchema);