import { Component,OnInit } from "@angular/core";
import {InvoiceService,Invoice} from "../Invoice.service"
import { Router, convertToParamMap } from '@angular/router';
import { CommonService } from '../../core/services/common.service';
import { NzMessageService } from 'ng-zorro-antd';
import {
  FormBuilder,
  FormControl,
  FormGroup
} from '@angular/forms';
@Component({
    selector: 'app-Invoice-list',
    templateUrl: './Invoice-list.component.html',
    styleUrls: ['./Invoice-list.component.css'],
  })

  export class InvoiceListComponent implements OnInit{
    validateForm: FormGroup;
  // 表格参数
  pageIndex = 1;
  pageSize = 20;
  total = 1;
  loading = true;
  dataSet: Invoice[] = [];
  result='';
  
  // “编辑”模态框参数
  locationId = 0;
  isVisible = false;
  isOkLoading = false;
  isDelete=false;
  AreaName='';
  SortId='';
  constructor(private router: Router,
    private InvoiceService :InvoiceService,
    private commonService: CommonService,
    private fb: FormBuilder,
    private msg: NzMessageService ){ }

  ngOnInit() {
    this.validateForm = this.fb.group({});
    this.validateForm.addControl('SearchStoreName', new FormControl());
    this.validateForm.addControl('SearchBank', new FormControl());
    this.validateForm.addControl('SearchAddress', new FormControl());
    this.getInvoiceList();
  }
  getInvoiceList(){
    // let msg = '';
    // if (this.validateForm.value.SearchStoreName && this.validateForm.value.SearchStoreName.indexOf('</') >= 0) {
    //   msg += '公司名称搜索栏中不能有特殊字符，';
    // }
    // if (this.validateForm.value.SearchBank && this.validateForm.value.SearchBank.indexOf('</') >= 0) {
    //   msg += '开户行搜索栏中不能有特殊字符，';
    // }
    // if (this.validateForm.value.SearchAddress && this.validateForm.value.SearchAddress.indexOf('</') >= 0) {
    //   msg += '地址搜索栏中不能有特殊字符，';
    // }
    // if (this.validateForm.value.SearchStoreName && this.validateForm.value.SearchStoreName.indexOf('</') >= 0) {
    //   msg += '公司名称搜索栏中不能有特殊字符，';
    // }
    // if (this.validateForm.value.SearchBank && this.validateForm.value.SearchBank.indexOf('</') >= 0) {
    //   msg += '开户行搜索栏中不能有特殊字符，';
    // }
    // if (this.validateForm.value.SearchAddress && this.validateForm.value.SearchAddress.indexOf('</') >= 0) {
    //   msg += '地址搜索栏中不能有特殊字符，';
    // }

    // if (msg) {
    //   msg += '（特殊字符：&lt;/）';
    //   this.msg.warning(msg);
    //   return false;
    // }

    this.loading = true;
    this.InvoiceService.GetInvoiceList({
      offset: (this.pageIndex - 1) * this.pageSize,
      limit: this.pageSize,
      searchKeywords:this.validateForm.value.SearchStoreName ? this.validateForm.value.SearchStoreName : '',
      Bank:this.validateForm.value.SearchBank ? this.validateForm.value.SearchBank : '',
      Address:this.validateForm.value.SearchAddress ? this.validateForm.value.SearchAddress : '',
    }).subscribe(m => {
      this.loading = false;
      this.total = m.totalCount;
      this.dataSet = m.items;
    });
  };
  searchInvoice() {
    this.pageIndex = 1;
    this.getInvoiceList();
  }

  clearcompany(){
    this.validateForm.reset();
    this.pageIndex = 1;
    this.getInvoiceList();
  }
  }