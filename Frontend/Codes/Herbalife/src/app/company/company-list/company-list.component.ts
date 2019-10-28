import { Component,OnInit, COMPILER_OPTIONS } from "@angular/core";
import {companyService, companyName} from "../company.service"
import { Router, convertToParamMap } from '@angular/router';
import { CommonService } from '../../core/services/common.service';
import { NzMessageService } from 'ng-zorro-antd';
import {LocationService,Region, RegionName} from "../../location/location.service"
import {
  FormBuilder,
  FormControl,
  FormGroup
} from '@angular/forms';
import { debug } from "util";
@Component({
    selector: 'app-company-list',
    templateUrl: './company-list.component.html',
    styleUrls: ['./company-list.component.css']
  })

  export class companyListComponent implements OnInit{
    validateForm: FormGroup;
  // 表格参数
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  loading = true;
  dataSet: companyName[] = [];
  locationlist:Region[]=[];
  locationlist1:Region[]=[];
totals=1;
  result='';

  // “编辑”模态框参数
  companyId = 0;
  isVisible = true;
  isOkLoading = false;
  isDelete=false;
  Name='';
  Address='';
  Zipcode='';
  Fax='';
  Phone='';
  selectedType= '1' ;
  selecttest1='';
  companyLabel='';
  // selectedType='全部';
  isSee=false;
  constructor(private router: Router,
    private companyService :companyService,
    private commonService: CommonService,
    private LocationService: LocationService,
    private msg: NzMessageService,
    private fb: FormBuilder
    ) { }


selecttest;
    

  ngOnInit() {
    this.companyLabel='';
    this.validateForm = this.fb.group({});
    this.validateForm.addControl('SearchName', new FormControl());
    this.validateForm.addControl('selecttest1', new FormControl());
    this.validateForm.addControl('SearchAddress', new FormControl());
    this.validateForm.addControl('SearchZipcode', new FormControl());
    this.validateForm.addControl('SearchFax', new FormControl());
    this.validateForm.addControl('SearchPhone', new FormControl());
    this.getcompanyList();
    this.getlocationlist();
  }

getlocationlist(){
  this.LocationService.GetLocationList({
    offset: (this.pageIndex - 1) * this.pageSize,
    limit: this.pageSize,
    sort: 'CreationTime',
    order: 'desc',
  }).subscribe(m => {
    this.loading = false;
    this.locationlist = m.items;
    this.locationlist1=m.items;
    //this.locationlisttest =[{'ID':1},{'ID':2}];

  });

}
  getcompanyList(){
    this.loading = true;
    this.companyService.GetcompanyList({
      offset: (this.pageIndex - 1) * this.pageSize,
      limit: this.pageSize,
      // RegionName:this.validateForm.value.SearchRegionName ? this.validateForm.value.SearchRegionName : '',
      RegionName:this.selecttest1==null?"":this.selecttest1,
      Name:this.validateForm.value.SearchName ? this.validateForm.value.SearchName : '',
      Address:this.validateForm.value.SearchAddress ? this.validateForm.value.SearchAddress : '',
      Zipcode:this.validateForm.value.SearchZipcode ? this.validateForm.value.SearchZipcode : '',
      Fax:this.validateForm.value.SearchFax ? this.validateForm.value.SearchFax : '',
      Phone:this.validateForm.value.SearchPhone ? this.validateForm.value.SearchPhone : '',
    }).subscribe(m => {
      this.loading = false;
      this.total = m.totalCount;
      this.dataSet = m.items;
    });

  };


  searchcompany(){
    this.pageIndex = 1;
    this.getcompanyList();
  }

  searchmore(){
    if (this.isVisible) {
      this.isVisible = false;
    } else {
      this.isVisible = true;
    }
  }

  searchless(){
    this.isVisible=true;
  }

  clearcompany(){
    this.validateForm.reset();
    this.pageIndex = 1;
    this.getcompanyList();
  }
  Addcompany(){
    this.companyLabel='';
    this.companyId = 0;
    this.Name = '';
    this.Address = '';
    this.Zipcode='';
    this.Fax='';
    this.Phone='';
    this.selecttest=undefined;
    // this.selectedType='全部';
    this.showModal();

  }

  editcompany(ID: number,Name:string,RegionName:string,Address:string,Zipcode:string,Fax:string,Phone:string,RegionId:number) {
    this.companyLabel='';
    this.showModal();
    this.companyId = ID;
    this.Name= Name;


    
    //this.selectedType ='193';
    this.LocationService.GetLocation(RegionId).subscribe(m => {
      
    this.selecttest =m.ID //{ID:m.ID,AreaName:m.AreaName,SortId:m.SortId,CreationTime:m.CreationTime,CreationById:m.CreationById};
    });;
    this.Address=Address;
    this.Zipcode=Zipcode;
    this.Fax=Fax;
    this.Phone=Phone;
    
  }

  showModal(): void {
    this.isSee = true;
  }

  deletecompany(ID:number){
    debugger
    this.isDelete=true;
    this.companyId=ID;
  }

  handleOk(): void {
    this.isOkLoading = true;
    this.companyLabel='';
    if(this.Name==""){
      this.companyLabel='名称不能为空！';
      // alert("名称不能为空！");
    }
    else if(this.selecttest==undefined){
      this.companyLabel='区域名称不能为空！';
      // alert("区域名称不能为空！");
    }
    else if(this.Address==""){
      this.companyLabel='地址不能为空！';
      // alert("地址不能为空！");
    }
    else if(this.Zipcode==""){
      this.companyLabel='邮编不能为空！';
      // alert("邮编不能为空！");
    }
    else{
      const company = new companyName();
      company.Id = this.companyId;
      company.Name = this.Name;
      company.Address = this.Address;
      company.Zipcode=this.Zipcode;
      company.Fax=this.Fax;
      company.Phone=this.Phone;
      // company.RegionName=this.selecttest.AreaName;
      company.BaseRegionId=this.selecttest;
      this.companyService.HEditcompany(company).subscribe(r=>{
        this.result=r;
        if(this.result!="保存成功！"){
      this.companyLabel=this.result;

                // alert(this.result);
                this.isOkLoading = false;
              }
              else{
                this.isOkLoading = false;
          this.msg.success("保存成功",{nzDuration:1000})

                // alert('保存成功！');
                this.pageIndex = 1;
                this.isSee = false;
                this.getcompanyList();
              }

      })
    }
    this.isOkLoading = false;
    // if(this.AreaName=""){
    //   alert("区域名称不能为空！");
    // }
    // else if(this.SortId==""){
    //   alert("排序不能为空！");
    // }
    // else{
    //   this.locationService.HEditLocation(loaction).subscribe(r => {
    //     this.result=r;
    //     if(this.result!="保存成功！"){
    //       alert(this.result);
    //       this.isOkLoading = false;
    //     }else{
    //       this.isOkLoading = false;
    //       this.isVisible = false;
    //       this.pageIndex = 1;
    //       alert('保存成功！');
    //       this.getLocationList();
    //     }
    //   });
    // }
  }

  handleCancel(): void {
    this.isSee = false;
  }

  DeleteOk():void{
    this.isOkLoading=true;
    this.companyService.Deletecompany(this.companyId).subscribe(r=>{
      this.isOkLoading=false;
      this.isDelete=false;
      this.pageIndex=1;
      this.msg.success(r,{nzDuration:1000})
      this.getcompanyList();
    })
  }

  DeleteCancel():void{
    this.isDelete=false;
  }
  }