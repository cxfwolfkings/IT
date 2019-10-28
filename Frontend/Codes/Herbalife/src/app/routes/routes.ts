
import {LayoutComponent} from '../layout/layout.component';
import { ErrorComponent } from '../layout/error.component';

export const routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'message', pathMatch: 'full' },
      { path: 'blog', loadChildren: './blog/blog.module#BlogModule'},
      { path: 'message', loadChildren: './message/message.module#MessageModule'},
      // { path: 'addressee', loadChildren: './message/message.module#addresseeModule'},
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
  },
  {
    path: 'card',
    component: LayoutComponent,
    loadChildren: './card/card.module#CardModule'
  },
  {
    path: 'card/:id',
    component: LayoutComponent,
    loadChildren: './card/card.module#CardModule'
  }
];
