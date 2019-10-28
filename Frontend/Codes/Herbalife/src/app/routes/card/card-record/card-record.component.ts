import { Component, OnInit } from '@angular/core';
import {CardService} from ".././card.service";
import {FormBuilder,FormControl,FormGroup,Validators} from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { Router } from '@angular/router';
import {CardRecordDetail} from '../card.model';
import { environment } from 'src/environments/environment';
import {NzMessageService,NzModalService} from 'ng-zorro-antd';
registerLocaleData(zh);

@Component({
  selector: 'app-card-record',
  templateUrl: './card-record.component.html',
  styleUrls: ['./card-record.component.css']
})
export class CardRecordComponent implements OnInit {

  constructor(
    private cardService: CardService,
    private fb: FormBuilder,
    private router: Router,
    private message:NzMessageService) { }

  // 搜索参数
  searchForm: FormGroup;

  ishidden=true;
  isCollapse = true;

  date = new Date();
  searchbtn_name="高级检索";

  pageIndex = 1;
  pageSize = 10;
  total = 1;
  dataSet = [];
  loading = true;
  sortValue = null;
  sortKey = null;

  Department:string=null;
  Region:string=null;
  Name:string=null;
  startTime=null;
  endTime=null;
  state='';

  IsVisible=false;
  cardRecordDetail:CardRecordDetail=new CardRecordDetail();


  // /**下拉框加载数据 **/
  // listOfFirstR=[
  //   {ID:"",Typename:"全部"},
  //   {ID:"2",Typename:"总部"},
  //   {ID:"5",Typename:"华北区"},
  //   {ID:"8",Typename:"华南区"},
  //   {ID:"13",Typename:"华中区"},
  //   {ID:"131",Typename:"华东区"},
  //   {ID:"94",Typename:"第三方"}
  // ];

  // listOfSecondR=[
  //   {ID:"",Typename:"全部"}
  // ];

  // listOfRid=[
  //   {ID:"",Typename:"全部"}
  // ];

  // listOfR=[
  //   {ID:"",Typename:"所有"}
  // ];

  listOfState=[
    {ID:"",Typename:"所有"},
    {ID:"正常",Typename:"正常打卡"},
    {ID:"异常",Typename:"异常打卡"}
  ];

  // search_frist(selectedOption){
  //   this.listOfSecondR=[
  //     {ID:"",Typename:"全部"}
  //   ];

  //   this.listOfRid=[
  //     {ID:"0",Typename:"全部"}
  //   ];

  //   if(typeof(selectedOption)=="undefined") selectedOption='';
  //   if(selectedOption)
  //   {
  //     this.cardService.search_frist(selectedOption).do(()=>{      
  //       //this.loading = true;    
  //     }).subscribe(m=> {    
  //       //this.loading = false;
  //       m.forEach((v, i) => {
  //         this.listOfSecondR.push({ID:v.ID,Typename:v.Name});
  //       });
  //     });
  //   }
  // }

  // search_second(selectedOption){
  //   this.listOfRid=[
  //     {ID:"0",Typename:"全部"}
  //   ];

  //   if(typeof(selectedOption)=="undefined") selectedOption='';
  //   if(selectedOption!="")
  //   {
  //     this.cardService.search_frist(selectedOption).do(()=>{      
  //       //this.loading = true;    
  //     }).subscribe(m=> {    
  //       //this.loading = false;
  //       m.forEach((v, i) => {
  //         this.listOfRid.push({ID:v.ID,Typename:v.Name});
  //       });
  //     });
  //   }
  // }

  // getFirstRegionList(){
  //   this.listOfR=[
  //     {ID:"0",Typename:"所有"}
  //   ];
  //   this.cardService.getFirstRegionList().do(()=>{      
  //     //this.loading = true;    
  //   }).subscribe(m=> {    
  //     //this.loading = false;
  //     m.forEach((v, i) => {
  //       this.listOfR.push({ID:v.ID,Typename:v.Name});
  //     });
  //   });
  // }

  toggleCollapse() {
     if(this.ishidden)
     {
      this.ishidden=false;
      this.isCollapse = false;
      this.searchbtn_name="快速检索";
    }
      else
      {        
        this.ishidden=true;
        this.isCollapse = true;
        this.searchbtn_name="高级检索";
      }      
  } 

  GetPageRecordList()
  {
    var valid = true;
        for (const i in this.searchForm.controls) {
            if (true) {
                this.searchForm.controls[i].markAsDirty();
                this.searchForm.controls[i].updateValueAndValidity();
                if (this.searchForm.controls[i].valid === false) {
                  valid = false;
                }
            }
        }
        if(valid)
        {
          this.loading = true;
          this.cardService.GetCardRecordList({
            offset: (this.pageIndex - 1) * this.pageSize,
            limit: this.pageSize,
            sort: 'Date',
            order: 'desc',
            data: JSON.stringify({
              Department: this.Department,
              Region: this.Region,
              Name: this.Name,
              state: this.state,
              startTime: this.startTime,
              endTime: this.endTime
            })
          }).subscribe(p => {
            console.info(p);
            this.loading = false;
            this.total = p.totalCount;
            this.dataSet = p.items;
          });
        }
  }

  //详情
  GetDetail(Id:number)
  {
    this.IsVisible=true;
    if(Id)
    {
        this.cardService.getRecordDetailById(Id).do(()=>{}).subscribe(m=>{
          if(m){
            this.cardRecordDetail=m;
          } 
        });
    }
  }
  
  closeModal()
  {
    this.IsVisible=false;
  }

  /**
   * 将日期转换为指定的格式：比如转换成"年月日时分秒"这种格式：yyyy-MM-dd hh:mm:ss 或者 yyyy-MM-dd
   * @param curDate
   * @param fmt
   */
  DateConvertToString (curDate: Date, fmt?: string) {
    if (!curDate) {
      return '';
    }
    const o = {
      'M+' : curDate.getMonth() + 1,                 // 月份
      'd+' : curDate.getDate(),                      // 日
      'h+' : curDate.getHours(),                     // 小时
      'm+' : curDate.getMinutes(),                   // 分
      's+' : curDate.getSeconds(),                   // 秒
      'q+' : Math.floor((curDate.getMonth() + 3) / 3),   // 季度
      'S'  : curDate.getMilliseconds()               // 毫秒
    };
    if (!fmt) {
      fmt = 'yyyy-MM-dd';
    }
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (curDate.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
   for (const k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
      }
   }
   return fmt;
  }

  resetForm()
  {
    this.searchForm.reset();
    var date = new Date();//获取当前时间
    date.setDate(date.getDate()-7);//七天前
    this.Department=null;
    this.Region=null;
    this.Name=null;
    this.startTime=this.DateConvertToString(date);
    this.endTime=this.DateConvertToString(new Date());
    this.state=null;
    this.pageIndex = 1;
    this.searchForm = this.fb.group({
      Department: [this.Department, [Validators.maxLength(50)] ],
      Region: [this.Region, [Validators.maxLength(50)] ],
      Name: [this.Name, [Validators.maxLength(500)] ],
      startTime:[ this.startTime, [ Validators.required ] ],
      endTime:[ this.endTime, [ Validators.required ] ],
      state:[ this.state, [] ]
    });
    this.GetPageRecordList();
  }

  /**
   * 导出
   */
  export() {
    var valid = true;
        for (const i in this.searchForm.controls) {
            if (true) {
                this.searchForm.controls[i].markAsDirty();
                this.searchForm.controls[i].updateValueAndValidity();
                if (this.searchForm.controls[i].valid === false) {
                  valid = false;
                }
            }
        }
        if(valid)
        {
          this.loading = true;
          this.cardService.ExportCardRecordList({
            data: JSON.stringify({
              Department: this.Department,
              Region: this.Region,
              Name: this.Name,
              state: this.state,
              startTime: this.startTime,
              endTime: this.endTime
            })
          }).subscribe(m => {
            console.info(m);
            this.loading = false;
            if(m.success)
            {
              window.location.href=environment.SERVER_URL + m.result;
            }else{
              this.message.warning(m.result,{nzDuration:5000});
            }
          });
        }
  }

  ngOnInit() {
    var date = new Date();//获取当前时间
    date.setDate(date.getDate()-7);//七天前
    this.startTime=this.DateConvertToString(date);
    this.endTime= this.DateConvertToString(new Date());

    this.searchForm = this.fb.group({
      Department: [this.Department, [Validators.maxLength(50)] ],
      Region: [this.Region, [Validators.maxLength(50)] ],
      Name: [this.Name, [Validators.maxLength(500)] ],
      startTime:[ this.startTime, [ Validators.required ] ],
      endTime:[ this.endTime, [ Validators.required ] ],
      state:[ this.state, [] ]
    });
    
    this.GetPageRecordList();
  }
  

}
