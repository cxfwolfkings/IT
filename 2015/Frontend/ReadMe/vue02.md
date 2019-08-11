# Vue

## 第二天

### 准备开始2

#### 学员反馈2

该拓展的一定要拓展，即使有部分同学跟起来吃力，以后工作很可能在项目中遇到相似问题，至少知道老师讲过，有对照也好解决。可以说清楚有哪些必须掌握，有哪些让有余力的同学掌握。

#### 复习2

1. vue单文件方式 xxx.vue
2. 准备好配置文件 package.json(包描述文件&& 封装命令npm run dev) + webpack.config.js文件（打包的配置文件）
3. 创建index.html（单页应用的页）
4. 创建main.js(入口文件)
5. 引入vue和相关的文件xxx.vue
6. new Vue(options)
7. options（选项）:
   * data
   * methods
   * components（组件内声明子组件)
   * props
8. 实例:
   * 在组件内（xxx.vue）中的this
   * new Vue()
   * 事件
      * this.$on(事件名,回调函数(参数))
      * this.$emit(事件名,数据)
      * this.$once(事件名,回调函数(参数)) 就触发一次
      * this.$off(事件名); 取消事件
9. 全局
   * Vue.component('组件名',组件对象)  在哪里都可以使用
10. 组件传值
    * 父传子: 属性作为参数
    * 常量 title="xxx"   子组件声明接收参数 props:['xxx']
    * 变量 :title="num"  子组件声明接收参数 props:['xxx']
    * 子传父: vuebus（只能是同一辆车）
    * 先停车到父组件，On一下
    * 再开车到子组件，如果需要的话，emit一下，触发上述时间的回调函数

#### 今日重点2

* vue组件的使用
* 组件间通信
* vue-router使用
* vue-resource发起http请求
* axios

#### 过滤器2

* content | 过滤器，vue中没有提供相关的内置过滤器，可以自定义过滤器
* 组件内的过滤器 + 全局过滤器
* 组件内过滤器就是options中的一个filters的属性（一个对象）
  * 多个key就是不同过滤器名，多个value就是与key对应的过滤方式函数体
  * `Vue.filter(名,fn)`
* 输入的内容帮我做一个反转
* 例子：父已托我帮你办点事
* 总结
  * 全局 ：范围大，如果出现同名时，权利小
  * 组件内: 如果出现同名时，权利大，范围小

#### 获取DOM元素

* 救命稻草, 前端框架就是为了减少DOM操作，但是特定情况下，也给你留了后门
* 在指定的元素上，添加ref="名称A"
* 在获取的地方加入 this.$refs.名称A  
  * 如果ref放在了原生DOM元素上，获取的数据就是原生DOM对象，可以直接操作
  * 如果ref放在了组件对象上，获取的就是组件对象
    * 获取到DOM对象，通过`this.$refs.sub.$el`，进行操作
  * 对应的事件
    * created 完成了数据的初始化，此时还未生成DOM，无法操作DOM
    * mounted 数据已经装载到了DOM之上，可以操作DOM

#### mint-ui

* 组件库
* 饿了么出品，element-ui 在PC端使用的
* 移动端版本 mint-ui
* `https://mint-ui.github.io/#!/zh-cn`
* 注意：如果是全部安装的方式
  1. 在template中可以直接使用组件标签
  2. 在script中必须要声明，也就是引入组件对象（按需加载）

#### wappalyzer

* 获取到当前网站的使用的技术
* `https://wappalyzer.com/download`

#### vue-router

* 前端路由：核心就是锚点值的改变，根据不同的值，渲染指定DOM位置的不同数据
* ui-router：锚点值改变，如何获取模板？ajax
* vue中，模板数据不是通过ajax请求来，而是调用函数获取到模板内容
* 核心：锚点值改变
* 以后看到vue开头，就知道必须Vue.use
* vue的核心插件：
  * vue-router 路由
  * vuex 管理全局共享数据
* 使用方式
  1. 下载 `npm i vue-router -S`
  2. 在main.js中引入 `import VueRouter from 'vue-router';`
  3. 安装插件 `Vue.use(VueRouter);`
  4. 创建路由对象并配置路由规则  
     `let router = new VueRouter({ routes:[ {path:'/home',component:Home}  ]   });`
  5. 将其路由对象传递给Vue的实例，options中  
     options中加入 `router:router`
  6. 在app.vue中留坑 `<router-view></router-view>`

#### 命名路由

* 需求，通过a标签点击，做页面数据的跳转
* 使用router-link标签
  1. 去哪里 `<router-link to="/beijing">去北京</router-link>`
  2. 去哪里 `<router-link :to="{name:'bj'}">去北京</router-link>`  
     更利于维护，如果修改了path，只修改路由配置中的path，该a标签会根据修改后的值生成href属性

#### 参数router-link

* 在vue-router中，有两大对象被挂载到了实例this
* $route（只读、具备信息的对象）、$router（具备功能函数）
* 查询字符串
  1. 去哪里 `<router-link :to="{name:'detail',query:{id:1}} ">xxx</router-link>`
  2. 导航（查询字符串path不用改）`{name:'detail',path:'/detail',组件}`
  3. 去了干嘛，获取路由参数（要注意是query还是params和对应id名）  
     `this.$route.query.id`
* path方式
  1. 去哪里 `<router-link :to="{name:'detail',params:{name:1}} ">xxx</router-link>`
  2. 导航（path方式需要在路由规则上加上/:xxx）  
     `{name:'detail',path:'/detail/:name',组件}`
  3. 去了干嘛，获取路由参数（要注意是query还是params和对应name名）  
     `this.$route.params.name`

#### 编程导航

* 不能保证用户一定会点击某些按钮
* 并且当前操作，除了路由跳转以外，还有一些别的附加操作
* this.$router.go 根据浏览器记录 前进1 后退-1
* this.$router.push（直接跳转到某个页面显示）
  * push参数：字符串 /xxx
  * 对象：`{name:'xxx',query:{id:1},params:{name:2}}`

#### 复习2.1

* 过滤器，全局，组件内
* 获取DOM元素，在元素上ref="xxx"
* 在代码中通过`this.$refs.xxx`获取其元素
  * 原生DOM标签获取就是原生DOM对象
  * 如果是组件标签，获取的就是组件对象，$el继续再获取DOM元素
* 声明周期事件（钩子）回调函数
  * created: 数据的初始化、DOM没有生成
  * mounted: 将数据装载到DOM元素上，此时有DOM
* 路由
  * `window.addEventListener('hashchange',fn);`
  * 根据你放`<router-view></router-view><div id="xxx"></div>`作为一个DOM上的标识
  * 最终当锚点值改变触发hashchange的回调函数，我们将指定的模板数据插入到DOM标识上

#### 重定向和404

* 进入后，默认就是/
* 重定向 `{path:'/',redirect:'/home'}`
* 重定向 `{path:'/',redirect:{name:'home'}}`
* 404: 在路由规则的最后的一个规则
  * 写一个很强大的匹配
  * `{path:'*',component:notFoundVue}`

#### 多视图

* 以前可以一次放一个坑对应一个路由和显示一个组件
  * 一次行为 = 一个坑 + 一个路由 + 一个组件
  * 一次行为 = 多个坑 + 一个路由 + 多个组件
* components 多视图 是一个对象 对象内多个key和value
  * key对应视图的name属性
  * value 就是要显示的组件对象
* 多个视图`<router-view></router-view>` -> name就是default
* `<router-view name='xxx'></router-view>` -> name就是xxx

#### 嵌套路由

* 用单页去实现多页应用，复杂的嵌套路由
* 开发中一般会需要使用
* 视图包含视图
* 路由父子级关系路由

```javascript
//期组件内包含着第一层router-view
{
  name:'music',path:'/music',component:Music,
  children:[//子路由的path，/就是绝对路径，不/就是相对父级路径
    {name:'music.oumei',path:'oumei',component:Oumei},
    {name:'music.guochan',path:'guochan',component:Guochan}
  ]
}  
```

#### vue-resource（了解）

* 可以安装插件，早期vue团队开发的插件
* 停止维护了，作者推荐使用axios
* options预检请求，是当浏览器发现跨域 + application/json的请求，就会自动发起
* 并且发起的时候携带了一个content-type的头

#### axios

* `https://segmentfault.com/a/1190000008470355?utm_source=tuicool&utm_medium=referral`
* post请求的时候，如果数据是字符串 默认头就是键值对，否则是对象就是application/json
* this.$axios.get(url,options)
* this.$axios.post(url,data,options)
* `options:{params:{id:1} //查询字符串, headers:{ 'content-type':'xxxxx' }, baseURL:''}`
* 全局默认设置：Axios.defaults.baseURL = 'xxxxx';
* 针对当前这一次请求的相关设置

#### 如何练习

1. 路由核心
   * 路由基本使用
   * 任选一种路由参数的方式（查询字符串）
     * 404（路由匹配规则）
     * 嵌套路由
     * 编程导航
2. http请求
   * axios 发起get、post请求（300）
   * 获取 `http://182.254.146.100:8899/api/getcomments/300?pageindex=1`
   * 发起 `http://182.254.146.100:8899/api/postcomment/300`
   * axios挂载属性方式

vue的环境好难弄  
render: c => c(App)这是啥，babel->语法转换器，转换ES6/7、react  
options: {presets: ['es2015'], plugins: ['transform-runtime'] }  
这是啥，车速有点快啊，之前上自习的人表示追不上车了，你们下坡下的太快了

父子组件之间通信规则不太清楚  
父向子 -> 自定义指令给属性传值  <my-div xxx="{{name}}"
子向父 -> 通过事件触发 -> 只能是同一个对象的事件监听和触发 $emit
vue bus 同一辆车在不同的地方使用($on/$emit)

vue步骤

* index.html 单页应用程序的显示部分 127.0.0.1
  * 由于我们使用了html-webpack-plugin插件， 引入的script都不需要些了
  * `<div id="app"></div>`
  * 入口js main.js
  * 引入 Vue、VueRouter，配置路由规则（创建对象），创建Vue实例对象，给其进行options配置
* vue文件注意事项
  * template 1根 script data是函数返回对象 style scoped范围生效
* options:
  * template:html片段，可以包含{{text}}
  * data:(在new Vue的时候是对象，在组件内是函数)
  * 构建Vue实例 router: 配置路由
  * el: 指定元素('#app')
    1. 判断是字符串还是DOM元素
    2. 也可以获取到该dom元素直接作为el的值，性能能提升一点
* 组件options
  * data是一个函数，返回一个对象
  * methods是一个对象，其key是函数名，value是函数体
    * 在模板中直接使用函数名，在js部分使用this.函数名
  * props:是一个数组，`['xxx','abc']`
    * 在模板中直接使用，在js部分通过this.$props.xxx使用
  * components:是一个对，声明组件内引用的子组件
    * 引入、声明、使用
  * filters:是一个对象，其过滤器名称对应的函数，接受一个value，最终返回一个value
  * 生命周期：
    * created模板还未生成、发起请求获取数据，不能操作DOM
    * mounted: 数据已经装载到模板上，操作DOM
    * mounted 元素上有ref="name"，在钩子函数中this.$refs.name操作DOM元素
* 实例(vm/this(VueComponent对象))事件
  * $emit/$on/$once/$off()
* 实例属性
  * $props,$parent,$children,$refs
* 全局函数
  * Vue.use(param) 安装插件 param需要实现install函数 接受一个Vue，可以在Vue的原型上挂载属性，后期组件内通过this.就可以拿到该数据，在所有组件中使用
  * 单文件 Vue.component(名称,组件对象)
  * 引包 Vue.component(名称,options)
  * Vue.filter(过滤器名,function(value){ return value; } )
* 生僻指令
  * :key 当DOM列表中删除某一个元素 ，更优化的方案是直接删除这一个DOM元素
  * Vue就需要辨识你删除的数组中的元素与DOM中那个元素的对应关系
    * 如果不指定key，vue也会去计算，把对象计算出一个唯一标识，相对损耗性能
    * 我们来通过key告知vue，这个元素的标识就是 obj.id index，可以很好的提升性能
  * v-on:事件  @事件=
  * v-bind:属性 :属性=
* 路由使用
  * 使用步骤
    1. 下载
    2. 引入对象
    3. 安装插件
    4. 创建路由对象配置路由规则
    5. 配置进vue实例对象的options中
    6. 留坑 `<router-view></router-view>`
       1. 去哪里 `<router-link :to="{name:'xxx'}"></router-link>`
       2. 导航 `{name:'xxx' ,path:'/xxx',component:Home}`
       3. 去了以后干什么
    * 在created函数中，发请求
    * 获取路由参数`this.$route.params|query.xxx;`

#### 今日重点

* 项目相关插件
* webpack开发必备
* 项目起步

#### 独立构建 vs 运行时构建

* 独立构建：引包的方式
* 运行时构建: 单文件方式

#### 计算属性

* 案例：
  * 计算器
  * options:

    ```javascript
    computed:{ getResult:function(){ return obj||str } }`
    // 利用相关参数的属性发生改变触发函数，逻辑入口点太多，不方便  
    // 如果当属性没有发生改变也会触发（性能不太好）  
    // 计算属性可以根据当前值如果没有发生改变，取缓存中的值，不触发计算函数  
    // 凡是与this相关的属性在计算属性中出现，任意一个发生改变，就会触发
    ```

#### 嵌套路由2

* 案例：我的主页显示：好友、歌曲
* 由于路由的跳转会导致整个router-view重新渲染，其中如果有些部分从未发生改变，就没有必要重新渲染，由此嵌套路由就能解决该问题。**在变化中去保持不变**

#### 编程式导航

* 模拟类似用户点击的行为，通过程序来发生锚点值改变，从而触发后续的行为
* 借助浏览器history历史功能向前和向后的功能
* 在vue-router安装插件以后，就多了两个属性
  * this.$route 具备路由信息只读的   req
  * this.$router 具备相关功能        res

```javascript
//跳转会home页面
this.$router.push({
  name: 'home',
  path: '/'
});  
//参数可以是字符串代表path，也可以给对象（命名路由）
//后退
this.$router.go(-1);
//就是用程序操作历史记录及导航栏url
```

#### day2 vue-resource（了解）

发起http请求

1. 下载
2. 安装插件
3. this.$http.get|post发起请求

#### day2 axios

* 可以发起http请求，运行在浏览器和Nodejs
* 合并请求，如果有多个请求，保证每一个请求都成功才算ok，否则异常
* `http://www.cnblogs.com/Upton/p/6180512.html`

```javascript
axios.all([get1(), get2()])
  .then(axios.spread(function (res1, res2) {
    // 只有两个请求都完成才会成功，否则会被catch捕获
  }));
```

作者不支持跨域

1. 下载
2. 引入、挂载Vue原型上，this.xxxx 使用

#### day2 mint-ui

* 移动端组件库
* `https://mint-ui.github.io/#!/zh-cn`

#### mui

* 前端UI框架 -> user interface
* 栅格系统
* `http://www.dcloud.io/hellomui/examples/grid-default.html`
* 代码: mui-master\examples\hello-mui\examples

#### i18n

* internationalization
* 国际化
* index.html -> 中国人
* index.html -> 美国人
* vue-i18n

#### 单文件方式引入bootstrap

```javascript
new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery',
  'window.jQuery': 'jquery',
  'window.$': 'jquery',
}),
```

以上方式是将jquery声明成全局变量。供bootstrap使用

#### 使用代理跨域

```javascript
devServer: {
  proxy: {
    '/v2/*': {
      target: 'https://api.douban.com/',
      changeOrigin: true,
    }
  }
}
```

#### 视口

```html
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
```

#### 相关环境总结

* webpack.config.js -> 入口和出口，解决文件的解析loader
* index.html -> SPA
* main 程序入口
* app.vue 主体组件文件
* components -> 各种功能页面的组件
* static
  * 全局css
  * img图片
  * vender -> mui

#### npm命令

* npm i(install) 包名 -S(--save)-D(--save-dev) 安装包
* 全部或者生产恢复包: npm i(install) --production(只恢复生产依赖dependencies)

#### yarn命令

* yarn add||remove 包名 -S(--save)-D(--save-dev) 安装包
* 全部或者生产恢复包: yarn i(install) --production(只恢复生产依赖dependencies)

#### 资源

* `https://mint-ui.github.io/#!/zh-cn`
