import { Component,OnInit, ViewChild } from "@angular/core";
import { registerLocaleData } from '@angular/common';
import {userallService, userall} from "../userall.service"
import { Router, convertToParamMap } from '@angular/router';
import { CommonService } from '../../core/services/common.service';
import { NzFormatEmitEvent, NzTreeComponent, NzTreeNode, NzMessageService,NzTreeNodeOptions,NzModalService  } from 'ng-zorro-antd';
import zh from '@angular/common/locales/zh';
import {LocationService,Region, RegionName} from "../../location/location.service"
import {
  FormBuilder,
  FormControl,
  FormGroup
} from '@angular/forms';
import { debug } from "util";
registerLocaleData(zh);
@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
  })

  export class userallListComponent implements OnInit{
    validateForm: FormGroup;
    @ViewChild('regionTree2') regionTree2: NzTreeComponent;
  // 表格参数
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  loading = true;
  dataSet: userall[] = [];
  locationlist:Region[]=[];
  RegionNodes2:NzTreeNode[];
  EmployeeID;
  CName;
  Department;
  selectlanguage;
  result='';
  ChrisID;
  RegionName="";
  // “编辑”模态框参数
  isVisible = true;
  isOkLoading = false;
  isDelete=false;
  SearchAll;
  isSee=false;
  constructor(private router: Router,
    private userallService :userallService,
    private commonService: CommonService,
    private LocationService: LocationService,
    private msg: NzMessageService,
    private fb: FormBuilder
    ) { }


selecttest;
    

  ngOnInit() {
    this.validateForm = this.fb.group({});
    this.validateForm.addControl('SearchUserID', new FormControl());
    this.validateForm.addControl('SearchName', new FormControl());
    this.validateForm.addControl('SearchDepartment', new FormControl());
    this.validateForm.addControl('SearchPosition', new FormControl());
    this.validateForm.addControl('SearchRegion', new FormControl());
    this.validateForm.addControl('SearchAll', new FormControl());
    this.validateForm.addControl('SearchYears', new FormControl());
    this.validateForm.addControl('CreationTimeBegin', new FormControl());
    this.validateForm.addControl('CreationTimeEnd', new FormControl());
    this.loading=false;
     this.getuserallList();
    this.InitSetRegionTree();
  }

  InitSetRegionTree()
  {
    this.LocationService.RegionTreeAll().do(()=>{}).subscribe(m=>{
      if(m){
        const RegionNodes=this.RegionNodes2=[];
          m.forEach(function(item){
          RegionNodes.push(new NzTreeNode({
            title: item.title,
            key: item.key,
            isLeaf: item.isLeaf,
            disabled: item.disabled,
            children: item.children
          }));
        });
      } 
    });
  }
  
  clickNode2(obj)
  {
    
    this.RegionName=obj.node.key.toString();
    // if(obj.node.isLeaf)
    // {
      // this.dataSet=this.dataSet.filter(function(m){return m.Region==region});
      this.validateForm.reset();
      this.pageIndex=1;
      this.getuserallList();
      //console.info(regionID);
    //}
  }


  getuserallList(){
   // debugger
    this.loading = true;
    this.userallService.GetuserList({
      offset: (this.pageIndex - 1) * this.pageSize,
      limit: this.pageSize,
      sort: 'Id',
      order: 'desc',
      EmployeeId:this.validateForm.value.SearchUserID ? this.validateForm.value.SearchUserID : '',
      CName:this.validateForm.value.SearchName ? this.validateForm.value.SearchName : '',
      Department:this.validateForm.value.SearchDepartment ? this.validateForm.value.SearchDepartment : '',
      Position:this.validateForm.value.SearchPosition ? this.validateForm.value.SearchPosition : '',
      Region:this.validateForm.value.SearchRegion ? this.validateForm.value.SearchRegion : '',
      Status:this.SearchAll ==null? '':this.SearchAll,
      Years:this.validateForm.value.SearchYears ? this.validateForm.value.SearchYears : '',
      CreationTimeBegin:this.commonService.DateConvertToString(this.validateForm.value.CreationTimeBegin),
      CreationTimeEnd:this.commonService.DateConvertToString(this.validateForm.value.CreationTimeEnd),
      RegionName:this.RegionName,
    }).subscribe(m => {
      this.loading = false;
      this.total = m.totalCount;
      this.dataSet = m.items;
    });
  };


  searchcompany(){
    this.RegionName="";
    this.pageIndex = 1;
     this.getuserallList();
  }

  searchmore(){
    if (this.isVisible) {
      this.isVisible = false;
    } else {
      this.isVisible = true;
    }
  }

  // searchless(){

  // }

  clearuser(){
    this.validateForm.reset();
    this.pageIndex = 1;
   this.getuserallList();
  }

  editUser(ChrisID:string,EmployeeID:string,CName:string,Department:string,Language:number) {

    this.showModal();
    this.EmployeeID=EmployeeID;
    this.CName=CName;
    this.Department=Department;
    this.selectlanguage=Language.toString(); 
    this.ChrisID=ChrisID;
  }
  handleCancel():void{
    this.isSee=false;
  }

  handleOk():void{
 
    this.userallService.Edituser( this.ChrisID,this.selectlanguage).subscribe(m=>{
      if(m=="保存成功"){
        // alert(m);
        this.msg.success(m,{nzDuration:1000})
        this.isSee=false;
        this.getuserallList();
      }
      else{
        this.msg.success(m,{nzDuration:1000})
        // alert(m);
      }
      // if(m.success){
      //   alert(m.result);
      //   this.isSee=false;
      // }else{
      //   alert(m.result);
      // }

    })

  }
  showModal(): void {
    this.isSee = true;
  }
}