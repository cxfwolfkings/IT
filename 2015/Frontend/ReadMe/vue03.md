# Vue

## 第三天

### 准备开始

#### 学员反馈

#### 复习

路由操作的基本步骤

```javascript
// 引入对象
import VueRouter from 'vue-router';
// 安装插件
Vue.use(VueRouter); // 挂载属性的行为
// 创建路由对象
let router = new VueRouter({
  routes:[
    { name:'xxx', path:'/xxx', 组件 }
  ]
});
// 将路由对象放入到options中new Vue()
new Vue({
  router
})
```

套路

1. 去哪里 `<router-link :to="{name:'bj'}"></router-link>`
2. 导航（配置路由规则）`{name:'bj',path:'/beijing',组件A}`
3. 去了干嘛（在组件A内干什么）
   * 在created事件函数中，获取路由参数
   * 发起请求，把数据挂载上去
4. 参数
   * 查询字符串（#/beijing?id=1&age=2）
     1. 去哪里 `<router-link :to="{name:'bj',query:{id:1,age:2}}"></router-link>`
     2. 导航（配置路由规则） `{name:'bj',path:'/beijing',组件A}`
     3. 去了干嘛（在组件A内干什么）  
       `this.$route.query.id||age`
   * path(#/beijing/1/2)
     1. 去哪里 `<router-link :to="{name:'bj',params:{id:1,age:2}}"></router-link>`
     2. 导航（配置路由规则） `{name:'bj',path:'/beijing/:id/:age',组件A}`
     3. 去了干嘛（在组件A内干什么）`this.$route.params.id||age`
5. 编程导航
   * 一个获取信息的只读对象($route)
   * 一个具备功能函数的对象($router)
   * 根据浏览器历史记录前进和后台 `this.$router.go(1|-1);`
   * 跳转到指定路由 `this.$router.push({name:'bj'});`
6. 嵌套路由
   * 让变化的视图(router-view)产生包含关系(router-view)
   * 让路由与router-view关联，并且也产生父子关系
7. 多视图
   * 让视图更为灵活，以前一个一放，现在可以放多个，通过配置可以去修改

8. axios:
   * 开始:
      * 跨域 + 默认的头是因为你的数据是对象，所以content-type:application/json
      * 有OPTIONS预检请求（浏览器自动发起）
   * 最终:
      * 当我们调整为字符串数据，引起content-type变为了www键值对
      * 没有那个OPTIONS预检请求
   * 总结：跨域 + application/json 会引起OPTIONS预检请求，并且自定义一个头（提示服务器，这次的content-type较为特殊），content-type的值
   * 服务器认为这个是一次请求，而没有允许content-type的头，
   * 浏览器就认为服务器不一定能处理掉这个特殊的头的数据
   * 抛出异常
   * 在node服务器`response.setHeader("Access-Control-Allow-Headers","content-type,多个");`
   * formdata的样子: key=value&key=value
9. axios属性关系
   * options: headers、baseURL、params
   * 默认全局设置（大家都是这么用）`Axios.defaults-> options对象`
   * 针对个别请求来附加options
   * axios.get(url,options)
   * axios.post(url,data,options)

#### 今日重点

* axios
* watch
* 计算属性
* 项目

#### axios

* 合并请求
* axios.all([请求1,请求2])
* 分发响应  axios.spread(fn)
* fn:对应参数(res)和请求的顺序一致
* 应用场景：必须保证两次请求都成功，比如，分头获取省、市的数据
* 执行特点：只要有一次失败就算失败，否则成功

#### 拦截器

* 过滤，在每一次请求与响应中、添油加醋
* axios.interceptors.request.use(fn)  在请求之前
* function(config){ config.headers = { xxx }}   config 相当于options对象
* 默认设置 defaults 范围广、权利小
* 单个请求的设置options get(url,options)  范围小、权利中
* 拦截器 范围广、权利大

#### token（扩展）

* cookie 和session的机制，cookie自动带一个字符串
* cookie只在浏览器
* 移动端原生应用，也可以使用http协议，1:可以加自定义的头、原生应用没有cookie
* 对于三端来讲，token可以作为类似cookie的使用，并且可以通用
* 拦截器可以用在添加token上

#### 拦截器操作loadding

* 在请求发起前open，在响应回来后close

#### 监视

* watch 可以对（单个）变量进行监视，也可以深度监视
* 如果需求是对于10个变量进行监视？
* 计算属性computed 可以监视多个值，并且指定返回数据，并且可以显示在页面
* 都是options中的根属性
  * watch监视单个
  * computed可以监视多个this相关属性值的改变，如果和原值一样
  * 不会触发函数的调用，并且可以返回对象

#### 相关命令

```bat
npm i mint-ui vue-preview axios vue-router monent vue - S;
npm i webpack html - webpack - plugin css - loader style - loader less less - loader autoprefixer - loader babel - loader babel - core babel - preset - es2015 babel - plugin - transform - runtime url - loader file - loader vue - loader vue - template - compiler webpack-dev-server - D
```
