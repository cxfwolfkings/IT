import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { CardConfigComponent } from './card-config/card-config.component';
import {CardService} from './card.service';
import { CardRecordComponent } from './card-record/card-record.component';
import { CardSetUpdateComponent } from './card-set-update/card-set-update.component';
import { CardSetComponent } from './card-set/card-set.component';
import { CardSetUserComponent } from './card-set-user/card-set-user.component';

// 定义的路由
const routes: Routes = [
  { path: '', redirectTo: 'record' },
  { path: 'config', component: CardConfigComponent },
  { path: 'record', component: CardRecordComponent },
  { path: 'set', component: CardSetComponent },
  { path: 'setUpdate/:id', component: CardSetUpdateComponent },
  { path: 'setUser/:id', component: CardSetUserComponent }
]
@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes) // 子模块注入路由要用forCardConfigComponentChild
  ],
  declarations:[
    CardRecordComponent,  
    CardSetUpdateComponent, 
    CardSetComponent,
    CardSetUserComponent,
    CardConfigComponent
  ],
  providers:[CardService]
})
export class CardModule { }
