import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteListComponent } from './note-list/note-list.component';
import { NoteComponent } from './note/note.component';

import { Routes, RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { BlogService } from './blog.service';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


// 嵌套的路由，最好分离成单独的路由配置文件
const routes: Routes = [
  { path: '', redirectTo: 'list' },
  { path: 'list', component: NoteListComponent },
  { path: 'note/:id', component: NoteComponent }
];

@NgModule({
  declarations: [NoteListComponent, NoteComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild(routes), // 子模块注入路由要用forChild
  ],
  providers: [BlogService]
})

export class BlogModule { }
