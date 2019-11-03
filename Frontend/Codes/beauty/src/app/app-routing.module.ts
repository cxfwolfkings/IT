import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { ErrorComponent } from './pages/layout/error.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'message', pathMatch: 'full' },
      { path: 'blog', loadChildren: './blog/blog.module#BlogModule'},
      { path: 'message', loadChildren: './message/message.module#MessageModule'},
      { path: 'menu', loadChildren: './menu/menu.module#MenuModule'},
      { path: 'card', loadChildren: './card/card.module#CardModule'},
      { path: 'group', loadChildren: '../modules/group/group.module#GroupModule'},
      { path: 'localtion', loadChildren: '../location/location.module#LocationModule'},
      { path: 'user', loadChildren: '../modules/authority/user.module#BackstageUserModule'},
      { path: 'role', loadChildren: '../modules/authority/role.module#RoleModule'},
      { path: 'content', loadChildren: '../modules/content/content.module#ContentModule'},
      { path: 'Invoice', loadChildren: '../Invoice/Invoice.module#InvoiceModule'},
      { path: 'salesreport', loadChildren: '../salesreport/salesreport.module#salesreportModule'},
      { path: 'company', loadChildren: '../company/company.module#companyModule'},
      { path: 'userall', loadChildren: '../userall/userall.module#userallModule'},
      { path: 'error', component: ErrorComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
