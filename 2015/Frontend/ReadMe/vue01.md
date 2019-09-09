# Vue

## 目录

## 第一天

### 准备开始1

![vue学习方式](./Resource/01_vue学习方式.png)

#### 学员反馈1

1. 后端代码的抽取感觉还可以，前端代码抽取懵，关于哪个需要依赖、注入，哪个不需要依赖、注入，不懂？

   输入服务 是需要使用的时候

   配置期  config -> 可以注入供应商服务对象，对于具体服务进行配置  
   运行期  非config都算是运行期  
   service/factory(通过return 返回任意类型对象)/controller/derective/filter  
   以上都可以用来注入服务对象（service/factory）  
   如何区分是否能依赖注入  
   形参名基本以$开头  
   `//根据顺序来的`  
   `link:function(scope,element,attrs)`

2. 自己建了一个服务器，数据库，可是这个项目还是不知道从哪开始敲起

   看需求有哪些页面，配置路由显示页面，根据API接口完成页面上的动态数据交互

3. webpack-dev-server 再讲一下吧，还是不太懂

   工具，在学校的时候，要掌握的东西是重点学习的东西，而不是工具  
   在企业开发中，遇上了相关问题，再去看看别的东西  
   让大家不用去关注除了主核心以外的东西  
   --inline --hot --open --port 9999

   1. 主要学习的是VUE，快速进入VUE让大家体会VUE的使用
   2. webpack前端构建构建，前期铺垫基本使用，后面看到不晕
   3. 在做完项目以后，模拟项目开发的真实打包，区分打包的意义所在(webpack)

#### 复习1

**webpack属性配置：**

```javascript
const path = require('path')
module.exports = {
  entry:{ //main是默认入口,也可以是多入口
    main:'./src/main.js'
  },
  //出口
  output:{
    filename:'./build.js', 指定js文件
    path: path.join(__dirname,'..','dist',)
    //最好是绝对路径，代表当前目录的上一级的dist
  },
  module:{
    //一样的功能rules: webpack2.x之后新加的
    loaders:[require('./a.css||./a.js') {
      test:/\.css$/,
      loader:'style-loader!css-loader', //顺序是反过来的2!1
    }, {
      test:/\.(jpg|svg)$/,
      loader:'url-loader?limit=4096&name=[name].[ext]',
      //顺序是反过来的2!1
      //[name].[ext]内置提供的，因为本身是先读这个文件
      options:{
        limit:4096,
        name:'[name].[ext]'
      }
    }]
  },
  plugins:[
    //插件的执行顺序是依次执行的
    new htmlWebpackPlugin({
      template:'./src/index.html',
    })
    //将src下的template属性描述的文件根据当前配置的output.path，将文件移动到该目录
  ]
}
```

#### 今日重点1

* 运行起来Vue
* vue常用指令
* 组件的使用

### es6

#### webpack-ES6的处理

* ES6的模块vue本身默认支持es6的模块导入导出
* babel
  * babel-loader(内部依赖babel-core)
  * 关键字(presets  es2015)
  * 函数(plugins babel-plugin-transform-runtime)

#### ES6中的模块

* 默认
  * 导入 `import [,..xxx] [,..from] './xxx.ext'`
  * 导出 `export default obj;`
* 声明式
  1. 导出 `export var obj = xxx;`
  2. 导出 `export var obj2 = {};`
  3. 单独导出 `export {stu};`
  4. 导入 `import {obj,obj2,stu} from './xxx.js';  直接使用obj`
* 全体
* 默认导出和声明式导入在使用上的区别
  * 要注意，声明式导入的时候，必须{名称} 名称要一致（按需导入)
  * 默认导入，可以随意的使用变量名

  ```javascript
  {
    default:"我是默认导出的结果"
    import xxx from './cal.js' //会获取到整个对象的default属性
    obj1:"我是声明式导出1"
    obj2:"我是声明式导出2"
    obj3:"我是声明式导出3"
    import {obj1,obj2}
    obj4:"我是声明式导出4"
  }
  import * as allObj from './cal.js';  //获取的就是一整个对象
  ```

* import 和 export 一定写在顶级，不要包含在 {} 内

#### ES6中的代码变化

* 对象属性的声明

  ```javascript
  var name = 'abc';
  var person = {name}; //简写 -> var person = {name:name};
  //声明函数
  var cal = {
    add:function(){
      return 1;
    },
    add2(){
      return 2;
    },
    add3:funtion(n1,n2){
      return n1 + n2;
    },
    add4(n1,n2){  //干掉了function
      return n1 + n2;
    }
  }
  ```

* 当属性的key和变量的名相同，而要使用变量的值做value，就可以简写{name}->{name:name}
* es6中的函数声明，就是干掉了`function`，add(){ }

![关于项目目录结构](./Resource/01_关于项目目录结构.png)

#### vue单文件方式

* 单文件就是以*.vue结尾的文件。最终通过webpack也会编译成*.js在浏览器运行
* 内容：`<template></template> + <script></script> + <style></style>`
  1. template中只能有一个根节点 2.x
  2. script中  按照 export default {配置} 来写
  3. style中 可以设置scoped属性，让其只在template中生效

#### 以单文件的方式启动

* webpack找人来理解你的单文件代码
  * vue-loader,vue-template-compiler 代码中依赖vue
  * 启动命令：`..\\node_modules\\.bin\\webpack-dev-server --inline --hot --open`

#### vue介绍

* 2014年诞生，2013年react，09年angularjs
* 作者 尤雨溪
* 核心概念：组件化，双向数据流（基于ES5中的defineProperty来实现的），IE9才支持
* angular核心：模块化，双向数据绑定（脏检测：一个数组($watch)
  * 开发一个登陆的模块，登陆需要显示的头部、底部、中部
  * 组件：组合起来的一个部件（头部、底部、中部）
  * __细分代码__
    * 头部：页面、样式、动态效果
    * 代码：template style script
* 框架对比，建议学完vue再看react
* `https://cn.vuejs.org/v2/guide/comparison.html#React`

#### 数据流

* 1向：js内存属性发生改变，影响页面的变化
* 1向：页面的改变影响js内存属性的改变

#### vue中常用的v-指令演示

* 常用指令
* v-text 是元素的innerText只能在双标签中使用
* v-html 是元素的innerHTML，不能包含`<!--{{xxx}} -->`
* v-if 元素是否移除或者插入
* v-show 元素是否显示或隐藏
* v-model 双向数据绑定，v-bind是单向数据绑定（内存js改变影响页面）

#### class结合v-bind使用

* 需要根据可变的表达式的结果来给class赋值，就需要用到`v-bind:class="xxx"`
* `v-bind:属性名="表达式"`，最终表达式运算结束的结果赋值给该属性名
  * 简化的写法是: `:属性名="表达式"`
* class:结果的分类
  * 一个样式：返回字符串（三元表达式和key和样式的清单对象）
  * 多个样式：返回对象（样式做key，true或false做值）

#### methods和v-on的使用

* 绑定事件的方法
  * `v-on:事件名="表达式||函数名"`
  * 简写: `@事件名="表达式||函数名"`
* 函数名如果没有参数，可以省略()，只给一个函数名称
* 声明组件内函数，在export default这个对象的根属性加上methods属性，其是一个对象
  * key 是函数名 值是函数体
* 在export default这个对象的根属性加上data属性，其是一个函数，返回一个对象
  * 对象的属性是我们初始化的变量的名称
* 凡是在template中使用变量或者函数，不需要加this
* 在script中使用就需要加上this

#### v-for的使用

* 可以使用操作数组 (item,index)
* 可以使用操作对象 (value,key,index)
* key 是类似trank by 的一个属性
* 为的是告诉vue，js中的元素，与页面之间的关联，当识图删除元素的时候，是单个元素的删除而不是正版替换，所以需要关联其关系，设置（必须，性能）  
* 2.2.0+ 的版本里，当在组件中使用 v-for 时，key 现在是必须的。

#### 漂亮的列表

#### 父子组件使用

* 父和子，使用的是父，被用的是子
* 父需要声明子组件，引入子组件对象，声明方式如下

  ```javascript
  import 子组件对象 from './xxx.vue';
  {
    components:{
      组件名:子组件对象
    }
  }
  ```

* 全局组件，使用更为方便，不需要声明，直接用
* 在main.js中引入一次，在main.js中使用 `vue.component('组件名',组件对象);`
* 所有的组件就可以直接通过组件名，使用

#### 父传子

* 父组件通过子组件的属性将值进行传递
  * 方式有2:
    * 常量：`prop1="常量值"`
    * 变量：`:prop2="变量名"`
* 子组件需要声明
  * 根属性props:['prop1','prop2']
  * 在页面中直接使用{{prop1}}
  * 在js中应该如何使用prop1？this.prop1获取

#### 看文档的对象分类

1. 全局的代表Vue.的
2. 实例的代表this.或者new Vue().
3. 选项代表 new Vue() 的参数 或者 export default里边的属性

#### 子向父组件通信(vuebus)（扩展）

* 通过new Vue()这样的一个对象，来`$on('事件名',fn(prop1,pro2))`
* 另一个组件引入同一个vuebus，来`$emit('事件名',prop1,pro2)`

#### 总结1

1. 已经存在node_modules包，已经存在package.json和webpack.config.js文件
2. 创建index.html，看看其所在文件和webpack.config.js文件中描述的关系
3. 在index.html div->id->app
4. 创建main.js，看看其所在文件和webpack.config.js文件中描述的关系
5. 在main.js中引入 vue 和相关组件对象
6. new Vue(选项options), 目的地el，渲染内容 render:c=>c(App) 渲染App的内容
7. 编写app.vue
   * template 在2.x以后只能有一个根节点
   * script 格式是export default { 选项options}
   * style 加上scoped（范围的）之后，样式只对当前模板有效
8. 可能使用组件或者使用函数或者接受参数
   * options（根属性）:
     * data 是一个函数,return一个对象
     * methods 是一个对象,key是函数名,value是函数体
     * components 是一个对象,key是组件名,值是组件对象
     * props 是一个数组,元素是多个接受的参数
9. 套路总结
   * 凡是在上边可以使用的东西，在下边就可以使用，通过this.
10. 启动
    * 进入到webpack.config.js 和package.json文件同在的目录中启动命令行
    * 输入: 正在编码:  npm run dev
    * 报错: 检查命令所执行的../ 上级,是否存在node_modules目录及相关文件是否存在
    * 输入: 代码编写完毕，提交到公司 :  npm run build

#### 过滤器

#### 获取元素

#### vue构建方式
