import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { ErrorComponent } from './pages/layout/error.component';

/**
 * 路由配置规则
 * 
 * 如果全部用 component 配置项，这种方式叫“同步路由”。
 * 也就是说，@angular/cli 在编译的时候不会把组件切分到独立的 module 文件里面去，
 * 当然也不会异步加载，所有的组件都会被打包到一份 JS 文件里面
 * 
 * 把原来的 component 配置项改成 loadChildren 就变成了异步加载
 * 
 * 观察浏览器地址栏里面URL的变化，这里体现的是Router模块最重要的作用，
 * 就是对 URL 和对应界面状态的管理
 */
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'message', pathMatch: 'full' },
      { path: 'blog', loadChildren: './blog/blog.module#BlogModule' },
      { path: 'message', loadChildren: './message/message.module#MessageModule' },
      { path: 'menu', loadChildren: './menu/menu.module#MenuModule' },
      { path: 'card', loadChildren: './card/card.module#CardModule' },
      { path: 'group', loadChildren: '../modules/group/group.module#GroupModule' },
      { path: 'localtion', loadChildren: '../location/location.module#LocationModule' },
      { path: 'user', loadChildren: '../modules/authority/user.module#BackstageUserModule' },
      { path: 'role', loadChildren: '../modules/authority/role.module#RoleModule' },
      { path: 'content', loadChildren: '../modules/content/content.module#ContentModule' },
      { path: 'Invoice', loadChildren: '../Invoice/Invoice.module#InvoiceModule' },
      { path: 'salesreport', loadChildren: '../salesreport/salesreport.module#salesreportModule' },
      { path: 'company', loadChildren: '../company/company.module#companyModule' },
      // 8.0以后建议用下面的路由配置方式
      { path: 'userall', loadChildren: () => import("../userall/userall.module").then(m => m.userallModule) },
      { path: 'error', component: ErrorComponent }
    ]
  },
  { // 通配符配置必须写在最后一项，否则会导致路由无效。
    path: '**',
    component: LayoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
