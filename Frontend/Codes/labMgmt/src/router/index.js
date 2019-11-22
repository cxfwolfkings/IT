import Vue from 'vue'
import Router from 'vue-router'

import AppView from '@/components/app-view'
import Home from '@/pages/home'

Vue.use(Router)

const page = name => () => import('@/pages/' + name)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      component: AppView,
      children: [
        { path: '/', name: 'home', component: Home },
        { path: '/profile', name: 'profile', component: page('profile') },
        { path: '/search', name: 'search', component: page('search') },
        { path: '/setting/useplace', name: 'setting_usepalce', component: page('setting/useplace') },
        { path: '/setting/borrow', name: 'setting_borrow', component: page('setting/borrow') },
        { path: '/setting/assettype', name: 'setting_assettype', component: page('setting/assettype') },
        { path: '/setting/lab', name: 'setting_lab', component: page('setting/lab') },
        { path: '/setting/address', name: 'setting_address', component: page('setting/address') },
        { path: '/setting/shelf', name: 'setting_shelf', component: page('setting/shelf') },
        { path: '/auth/adminUsers', name: 'auth_adminUsers', component: page('auth/adminUsers') },
        { path: '/auth/publicAccounts', name: 'auth_publicAccounts', component: page('auth/publicAccounts') },
        { path: '/auth/users', name: 'auth_users', component: page('auth/users') },
        { path: '/asset/model', name: 'asset_model', component: page('asset/model') },
        { path: '/asset/regist', name: 'asset_regist', component: page('asset/regist') },
        { path: '/asset/assetEdit', name: 'asset_edit', component: page('asset/assetEdit') },
        { path: '/asset/collect', name: 'asset_collect', component: page('asset/collect') },
        { path: '/asset/repair', name: 'asset_repair', component: page('asset/repair') },
        { path: '/asset/discard', name: 'asset_discard', component: page('asset/discard') },
        { path: '/asset/discardEdit', name: 'discard_edit', component: page('asset/discardEdit') },
        { path: '/asset/compose', name: 'asset_compose', component: page('asset/compose') },
        { path: '/asset/compEdit', name: 'asset_compEdit', component: page('asset/compEdit') },
        { path: '/borrow/regist', name: 'borrow_regist', component: page('borrow/regist') },
        { path: '/return/regist', name: 'return_regist', component: page('return/regist') },
        { path: '/borrow/search', name: 'borrow_search', component: page('borrow/search') },
        { path: '/return/search', name: 'return_search', component: page('return/search') },
        { path: '/late/search', name: 'late_search', component: page('late/search') },
        { path: '/ucenter/userinfo', name: 'ucenter_userinfo', component: page('ucenter/userinfo') },
        { path: '/ucenter/borrowHistory', name: 'ucenter_borrowHistory', component: page('ucenter/borrowHistory') },
        { path: '/ucenter/order', name: 'ucenter_order', component: page('ucenter/order') },
        { path: '/ucenter/renew', name: 'ucenter_renew', component: page('ucenter/renew') },
        { path: '/ucenter/credit', name: 'ucenter_credit', component: page('ucenter/credit') },
        { path: '/ucenter/suggest', name: 'ucenter_suggest', component: page('ucenter/suggest') },
        { path: '/workstation/ordermanager', name: 'work_order', component: page('workstation/ordermanager') },
        { path: '/workstation/renewmanager', name: 'work_renew', component: page('workstation/renewmanager') },
        { path: '/workstation/creditmanager', name: 'work_credit', component: page('workstation/creditmanager') },
        { path: '/workstation/publish', name: 'work_publish', component: page('workstation/publish') },
        { path: '/report/search', name: 'report_search', component: page('report/search') },
        { path: '/empty', name: 'empty', component: page('empty') }
      ]
    },
    { path: '/login', name: 'login', component: page('login') },
    { path: '/error', name: '404', component: page('404') },
    { path: '*', redirect: { name: '404' } }
  ]
})
