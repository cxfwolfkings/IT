/**
 * 分组组件
 * add by Colin
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule, NZ_MESSAGE_CONFIG } from 'ng-zorro-antd';
import { GroupService } from './group.service';
import { GroupListComponent } from './list/list.component';
import { CommonService } from '../../core/services/common.service';
import { UserListComponent } from './user/list.component';

// 定义的路由
const routes: Routes = [
  { path: 'list', component: GroupListComponent },
  { path: 'user/:id', component: UserListComponent }
];

@NgModule({
  declarations: [GroupListComponent, UserListComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes), // 子模块注入路由要用forChild
  ],
  providers: [GroupService, CommonService, { provide: NZ_MESSAGE_CONFIG, useValue: { nzMaxStack: 1 }}]
})
export class GroupModule { }
