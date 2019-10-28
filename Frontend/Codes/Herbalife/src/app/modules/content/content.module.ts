/**
 * 内容组件
 * add by Colin
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router'; // 路由组件
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_MESSAGE_CONFIG } from 'ng-zorro-antd'; // 前端UI组件
import { ENgxEditorModule } from 'e-ngx-editor'; // 富文本组件
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContentListComponent } from './contentList/list.component';
import { ContentEditComponent } from './contentEdit/edit.component';
import { ContentService } from './content.service';
import { CommonService } from '../../core/services/common.service';
import { MessageModule } from 'src/app/routes/message/message.module';
import { CommentListComponent } from './commentList/list.component';
import { CategoryListComponent } from './categoryList/list.component';
import { TagListComponent } from './tagList/list.component';
import { WaitComponent } from './wait.component';

// 定义路由
const routes: Routes = [
  { path: 'list', component: ContentListComponent }, // 内容列表
  { path: 'comment', component: CommentListComponent }, // 评论列表
  { path: 'category', component: CategoryListComponent }, // 内容分类列表
  { path: 'tag', component: TagListComponent }, // 内容标签列表
  { path: ':id', component: ContentEditComponent } // 内容编辑
];
@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    ENgxEditorModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes), // 子模块注入路由要用forChild
    MessageModule
  ],
  declarations: [
    ContentListComponent,
    ContentEditComponent,
    CommentListComponent,
    CategoryListComponent,
    TagListComponent,
    WaitComponent
  ],
  providers: [
    ContentService,
    CommonService,
    { provide: NZ_MESSAGE_CONFIG, useValue: { nzMaxStack: 1 }}
  ]
})
export class ContentModule { }
