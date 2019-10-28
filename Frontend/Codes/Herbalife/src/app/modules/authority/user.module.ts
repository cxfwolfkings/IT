/**
 * 后台用户管理模块
 * add by Colin
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule, NZ_MESSAGE_CONFIG } from 'ng-zorro-antd';
import { UserService } from './user.service';
import { ListComponent } from './userlist/list.component';
import { CommonService } from '../../core/services/common.service';

// 定义的路由
const routes: Routes = [
  { path: 'list', component: ListComponent }
];

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes), // 子模块注入路由要用forChild
  ],
  providers: [UserService, CommonService, { provide: NZ_MESSAGE_CONFIG, useValue: { nzMaxStack: 1 }}]
})
export class BackstageUserModule { }
