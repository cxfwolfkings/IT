import { Routes, RouterModule } from '@angular/router';
import { salesreportListComponent } from './salesreportdaily-list/salesreportdaily-list.component';
import { salesrepormonthtListComponent } from './salesreportmonth-list/salesreportmonth-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import {salesreportService} from "./salesreport.service";
import {HttpClientModule} from '@angular/common/http';
import { CommonService } from '../core/services/common.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {LocationService} from "../location/location.service";
// 定义的路由
const routes: Routes = [
    { path: '', redirectTo: 'daily' },
    {path:'daily',component:salesreportListComponent},
    {path:'month',component:salesrepormonthtListComponent}
  ];

  @NgModule({
    declarations: [salesreportListComponent,salesrepormonthtListComponent],
    imports: [
      CommonModule,
      NgZorroAntdModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule.forChild(routes), // 子模块注入路由要用forChild
    ],  
    providers:[salesreportService,CommonService,LocationService]
  })
  export class salesreportModule { }