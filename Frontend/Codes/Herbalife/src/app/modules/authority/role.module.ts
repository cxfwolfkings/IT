/**
 * 角色管理模块
 * add by Colin
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule, NZ_MESSAGE_CONFIG } from 'ng-zorro-antd';
import { RoleService } from './role.service';
import { ListComponent } from './rolelist/list.component';
import { CommonService } from '../../core/services/common.service';
import { EditComponent } from './roleEdit/edit.component';

// 定义路由
const routes: Routes = [
  { path: 'list', component: ListComponent },
  { path: ':id', component: EditComponent }
];

@NgModule({
  declarations: [ListComponent, EditComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes), // 子模块注入路由要用forChild
  ],
  providers: [RoleService, CommonService, { provide: NZ_MESSAGE_CONFIG, useValue: { nzMaxStack: 1 }}]
})
export class RoleModule { }
