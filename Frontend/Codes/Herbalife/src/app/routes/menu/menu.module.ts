import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';


import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { MenuListComponent } from './menu-list/menu-list.component';
import { MenuService} from './menu.service';
import { MenuOperationComponent } from './menu-operation/menu-operation.component';


// 定义的路由
const routes: Routes = [
  { path: '', redirectTo: 'list' },
  { path: 'list', component: MenuListComponent },
  { path:'operation/:id',component: MenuOperationComponent},
  { path:'operation',component: MenuOperationComponent}
]

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes) // 子模块注入路由要用forChild
  ],  
  declarations: [MenuListComponent,MenuOperationComponent],
  providers:[MenuService]
})
export class MenuModule { }

