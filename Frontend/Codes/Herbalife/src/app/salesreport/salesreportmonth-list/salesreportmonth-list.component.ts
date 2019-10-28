import { Component,OnInit } from "@angular/core";
import {salesreportService,SalesReport} from "../salesreport.service"
import { Router, convertToParamMap } from '@angular/router';
import { CommonService } from '../../core/services/common.service';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import {LocationService,Region, RegionName} from "../../location/location.service"
import { NzMessageService } from 'ng-zorro-antd';
import {
  FormBuilder,
  FormControl,
  FormGroup
} from '@angular/forms';
registerLocaleData(zh);
@Component({
    selector: 'app-salesreportmonth-list',
    templateUrl: './salesreportmonth-list.component.html',
    styleUrls: ['./salesreportmonth-list.component.css'],
  })

  export class salesrepormonthtListComponent implements OnInit{
    validateForm: FormGroup;
  // 表格参数
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  loading = true;
  dataSet: SalesReport[] = [];
  result='';
  locationlist1:Region[]=[];
  selecttest1;
  // “编辑”模态框参数
  locationId = 0;
  isVisible = false;
  isOkLoading = false;
  isDelete=false;
  AreaName='';
  SortId='';
  constructor(private router: Router,
    private salesreportService :salesreportService,
    private commonService: CommonService,
    private LocationService: LocationService,
    private fb: FormBuilder,
    private msg: NzMessageService ){ }

  ngOnInit() {
    this.validateForm = this.fb.group({});
    this.validateForm.addControl('selecttest1', new FormControl());
    this.validateForm.addControl('CreationTimeBegin', new FormControl());
    this.validateForm.addControl('CreationTimeEnd', new FormControl());
    this.getSalesList('月报');
    this.LocationService.GetLocationList({
      offset: (this.pageIndex - 1) * this.pageSize,
      limit: this.pageSize,
      sort: 'CreationTime',
      order: 'desc',
    }).subscribe(m => {
      this.loading = false;
      this.locationlist1=m.items;
      //this.locationlisttest =[{'ID':1},{'ID':2}];

    });
  }
  getSalesList(types:string){
    // let msg = '';
    // if (this.validateForm.value.SearchArea && this.validateForm.value.SearchArea.indexOf('</') >= 0) {
    //   msg += '区域搜索栏中不能有特殊字符，';
    // }

    // if (msg) {
    //   msg += '（特殊字符：&lt;/）';
    //   this.msg.warning(msg);
    //   return false;
    // }
    this.loading = true;
    this.salesreportService.GetSalesdailyList({
      offset: (this.pageIndex - 1) * this.pageSize,
      limit: this.pageSize,
      type:types,
      Area:this.selecttest1==null?"":this.selecttest1,
      // Area: this.validateForm.value.SearchArea ? this.validateForm.value.SearchArea : '',
      createTimeBegin: this.commonService.DateConvertToString(this.validateForm.value.CreationTimeBegin),
      createTimeEnd: this.commonService.DateConvertToString(this.validateForm.value.CreationTimeEnd)
    }).subscribe(m => {
      this.loading = false;
      this.total = m.totalCount;
      this.dataSet = m.items;
    });
  };
  searchSales() {
    this.pageIndex = 1;
    this.getSalesList("月报");
  }
  clearcompany(){
    this.validateForm.reset();
    this.pageIndex = 1;
    this.getSalesList("月报");
  }
  }