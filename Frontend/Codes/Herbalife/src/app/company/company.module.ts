import { Routes, RouterModule } from '@angular/router';
import { companyListComponent } from './company-list/company-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import {companyService} from "./company.service";
import {HttpClientModule} from '@angular/common/http';
import { CommonService } from '../core/services/common.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {LocationService} from "../location/location.service";
// 定义的路由
const routes: Routes = [
    { path: '', redirectTo: 'list' },
    {path:'list',component:companyListComponent}
  ];

  @NgModule({
    declarations: [companyListComponent],
    imports: [
      CommonModule,
      NgZorroAntdModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule.forChild(routes), // 子模块注入路由要用forChild
    ],  
    providers:[companyService,CommonService,LocationService]
  })
  export class companyModule { }