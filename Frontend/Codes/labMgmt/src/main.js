// import Vue from 'vue'
// import App from './App.vue'
// import VueRouter from 'vue-router'
// import routeConfig from './router-config' // 引入router-config.js文件
// import './plugins/element.js'
// import './assets/css/site.css'

// // import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';

import Vue from 'vue'
import 'babel-polyfill'
import ElementUI from 'element-ui'
import Axios from 'axios'
import NProgress from 'nprogress'

import App from './App'
import store from './store'
import router from './router'
import MLoading from '@/m/loading'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/font-awesome-4.7.0/css/font-awesome.min.css'
import './assets/css/main.css'
import './assets/css/scrollbar.css'
import '@/assets/css/reset.css'
import 'nprogress/nprogress.css'
import 'animate.css'
import './assets/icon/iconfont.css'

import Print from '@/utils/print' // 引入打印插件
import Router from 'vue-router'

// import VueQuillEditor from 'vue-quill-editor'
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'

// 注册
Vue.use(ElementUI)
Vue.use(MLoading)
Vue.use(Print)

// Vue.use(VueQuillEditor)
// 路由白名单
var whiteList = ['demo', 'login', '404', 'empty']

// 钩子函数，每次路由跳转前执行
router.beforeEach((to, from, next) => {
  NProgress.start()
  var token = sessionStorage.getItem('token')
  if (whiteList.indexOf(to.name) === -1) {
    if (!token) {
      app && app.$message.warning('未授权，请登陆授权后继续')
      NProgress.done()
      return next({ name: 'login' })
    } else {
      // 判断一级菜单的权限
      let menuLevel1 = to.path
      menuLevel1 = menuLevel1.split('/')[1]
      var loginUser = sessionStorage.getItem('user')
      // 将sessionStorage中取出的JSON字串转化为JS对象
      loginUser = JSON.parse(loginUser)
      // 如果用户没有权限，跳转到404，404页面不需要判断权限，否则会循环
      if (!loginUser || !loginUser.Permissions ||
        !loginUser.Permissions.find(_ => _.PermissionUrl && _.PermissionUrl.indexOf(menuLevel1) >= 0)) {
        return next({ name: '404' })
      }
    }
  }
  to.query.t = Date.now()
  return next()
})

router.afterEach(transition => {
  setTimeout(() => {
    NProgress.done()
  })
})

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

window.APP_INFO = process.env.APP_INFO

Vue.prototype.$http = Axios
Vue.http = Axios

Vue.config.productionTip = false

/* eslint-disable no-new */
var app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

window.app = app
