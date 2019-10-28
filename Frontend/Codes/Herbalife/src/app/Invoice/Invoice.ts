import { Routes, RouterModule } from '@angular/router';
import { InvoiceListComponent } from './Invoice-list/Invoice-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import {InvoiceService} from "./Invoice.service";
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonService } from '../core/services/common.service';

// 定义的路由
const routes: Routes = [
    { path: '', redirectTo: 'list' },
    {path:'list',component:InvoiceListComponent}
  ];

  @NgModule({
    declarations: [InvoiceListComponent],
    imports: [
      CommonModule,
      NgZorroAntdModule,
      HttpClientModule,
      FormsModule,
      RouterModule.forChild(routes), // 子模块注入路由要用forChild
    ],  
    providers:[InvoiceService,CommonService]
  })
  export class InvoiceModule { }