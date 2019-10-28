import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolelistComponent } from './rolelist/rolelist.component';



import { Routes, RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';
//import {BlogService} from "./blog.service";

import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TestComponent } from './test/test.component';


// 定义的路由
const routes: Routes = [
  { path: '', redirectTo: 'list' },
  { path: 'list', component: RolelistComponent },
  { path: 'abc', component: TestComponent }
];



@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild(routes), // 子模块注入路由要用forChild
  ],  
  declarations: [RolelistComponent,TestComponent]
})
export class RoleModule { }
