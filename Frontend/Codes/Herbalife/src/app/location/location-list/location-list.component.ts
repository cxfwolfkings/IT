import { Component,OnInit } from "@angular/core";
import {LocationService,Region, RegionName} from "../location.service"
import { Router, convertToParamMap } from '@angular/router';
import { CommonService } from '../../core/services/common.service';
import { NzMessageService } from 'ng-zorro-antd';
import { parse } from "url";
@Component({
    selector: 'app-location-list',
    templateUrl: './location-list.component.html',
    styleUrls: ['./location-list.component.css']
  })

  export class LoactionListComponent implements OnInit{

  // 表格参数
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  loading = true;
  dataSet: RegionName[] = [];
  result='';
  
  // “编辑”模态框参数
  locationId = 0;
  isVisible = false;
  isOkLoading = false;
  isDelete=false;
  AreaName='';
  SortId='';
  AreaLabel='';
  sortLabel='';
  constructor(private router: Router,
    private locationService :LocationService,
    private commonService: CommonService,
    private msg: NzMessageService) { }

  ngOnInit() {
    this.AreaLabel='';
    this.sortLabel='';
    this.getLocationList();
  }


  getLocationList(){
    this.loading = true;
    this.locationService.GetLocationList({
      offset: (this.pageIndex - 1) * this.pageSize,
      limit: this.pageSize,
      sort: 'CreationTime',
      order: 'desc',
    }).subscribe(m => {
      this.loading = false;
      this.total = m.totalCount;
      this.dataSet = m.items;
    });
  };
  addLocation(){
    this.locationId = 0;
    this.AreaName = '';
    this.SortId = '';

    this.showModal();

  }

  editlocation(Id: number, AreaName: string, SortId: number) {
    this.locationId = Id;
    this.AreaName = AreaName;
    this.SortId = SortId.toString();
    this.showModal();
  }

  showModal(): void {
    this.isVisible = true;
  }

  deletelocation(ID:number){
    this.isDelete=true;
    this.locationId=ID;
  }

  handleOk(): void {
    this.sortLabel='';
    this.AreaLabel='';
    this.isOkLoading = true;
    const loaction = new Region();
    loaction.ID = this.locationId;
    loaction.AreaName = this.AreaName;
    loaction.SortId = Number(this.SortId=='' ? '': this.SortId);
    if(this.AreaName==""){
      this.AreaLabel='区域名称不能为空';
      // this.msg.warning("区域名称不能为空", { nzDuration: 1000 });
      this.isOkLoading = false;
    }
    else if(this.SortId=="0"){
      this.sortLabel='排序为大于0的数字';

      // this.msg.warning("排序为大于0的数字",{nzDuration:1000});
      this.isOkLoading = false;
    }
    else if(this.SortId==""){
      this.sortLabel='排序不能为空';

      // this.msg.warning("排序不能为空",{nzDuration:1000});
      this.isOkLoading = false;
    }
    
    else{
      this.locationService.HEditLocation(loaction).subscribe(r => {       
        this.result=r;
        if(this.result!="保存成功！"){
          if(this.result!="排序长度不能超过500！"){
          this.AreaLabel=this.result;
          }
          else{
            this.sortLabel=this.result;

          }
          // this.msg.warning(this.result,{nzDuration:1000});
          this.isOkLoading = false;
        }else{
          this.isOkLoading = false;
          this.isVisible = false;
          this.pageIndex = 1;
          this.AreaLabel='';
          this.msg.success("保存成功",{nzDuration:1000});
          //alert('保存成功！');
          this.getLocationList();
        }
      });
    }
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  DeleteOk():void{
    this.isOkLoading=true;
    //this.isDelete=false;
    this.locationService.DeleteLocation(this.locationId).subscribe(r=>{     
      // this.isDelete=true
      if(r=="删除成功"){
        this.msg.success("删除成功",{nzDuration:1000})
        this.isOkLoading=false;
        this.isDelete=false;
        this.pageIndex=1;     
        this.getLocationList();
      }else{
        this.msg.error("此区域下有关联的公司，不能删除",{nzDuration:1000});
        this.isOkLoading=false;
        this.isDelete=false;
        this.pageIndex=1;     
        this.getLocationList();
      }      
    })
  }

  DeleteCancel():void{
    this.isDelete=false;
  }
  }