import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageMessageComponent } from './image-message/image-message.component';
import { TextMessageComponent } from './text-message/text-message.component';
import { MultimediaMessageComponent } from './multimedia-message/multimedia-message.component';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgZorroAntdModule ,NZ_MESSAGE_CONFIG} from 'ng-zorro-antd';
import {ReactiveFormsModule} from '@angular/forms';
import {MessageService} from "./message.service";
import { CreateMessageListComponent } from './create-message-list/create-message-list.component';
import { AddresseeComponent } from './addressee/addressee.component';
import { AuditmessagelistComponent } from './auditmessagelist/auditmessagelist.component';
import { ContentService } from '../../modules/content/content.service';
import { CommonService } from '../../core/services/common.service';

// 定义的路由
const routes: Routes = [
  { path: '', redirectTo: 'createmessagelist' },
  { path: 'image', component: ImageMessageComponent },
  { path: 'text', component: TextMessageComponent },
  { path: 'multimedia', component: MultimediaMessageComponent },
  { path: 'createmessagelist', component: CreateMessageListComponent },
  { path: 'addressee', component: AddresseeComponent },
  { path: 'audit', component: AuditmessagelistComponent },
];

@NgModule({
  imports: [    
    CommonModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild(routes), // 子模块注入路由要用forChild
   
  ],
  declarations: [ImageMessageComponent, TextMessageComponent, CreateMessageListComponent, AddresseeComponent, AuditmessagelistComponent, MultimediaMessageComponent],
  providers:[CommonService,MessageService,ContentService,{ provide: NZ_MESSAGE_CONFIG, useValue: { nzMaxStack: 1 }}],
  exports: [AddresseeComponent]
})
export class MessageModule { }
