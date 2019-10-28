import { Component, OnInit ,Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {MessageService,GetListDto,PreListDto,SearchListModel,CategoryMolde} from ".././message.service";
import {FormBuilder,FormControl,FormGroup,Validators} from '@angular/forms';
import zh from '@angular/common/locales/zh';
import { registerLocaleData } from '@angular/common';
import { Router } from '@angular/router';
import { NzFormatEmitEvent, NzTreeNode,NzModalService } from 'ng-zorro-antd';


registerLocaleData(zh);

@Component({
  selector: 'app-create-message-list',
  templateUrl: './create-message-list.component.html',
  styleUrls: ['./create-message-list.component.css']
})
export class CreateMessageListComponent implements OnInit {

  preMessageList:PreListDto[]=[];
  searchListModel=new  SearchListModel();
  CategoryList:CategoryMolde[]=[];

  validateForm: FormGroup;

  ishidden=true;
  isCollapse = true;

  date = new Date();
  searchbtn_name="高级检索";

  pageIndex = 0;
  pageSize = 10;
  total = 1;
  dataSet = [];
  loading = true;
  sortValue = null;
  sortKey = null;
  Typename="";  


  /**下拉框加载数据*/
  listOfBasicType = [
    {ID:1,Typename:"图文"},
    {ID:2,Typename:"文本"},
    {ID:4,Typename:"图片"},
    {ID:5,Typename:"音频"},
    {ID:6,Typename:"视频"},
    {ID:9,Typename:"附件"}
  ];
  /***/

  StatusList= [
    {id:0,name:"待提交"},
    {id:1,name:"待审批"},
    {id:2,name:"审批通过"},
    {id:3,name:"审批拒绝"},
  
  ];

  SendStatusList= [
    {id:1,name:"发送成功"},
    {id:2,name:"发送失败"},
  
  ];

  resetForm(): void {
    this.validateForm.reset();
    this.validateForm.controls["Status"].reset([]);
    this.getMessageList();
  }
  fswitchTypename(typeid:number){
   const Typename="";
    switch(typeid)
    {
      case 1:this.Typename= "图文";break
      case 2:this.Typename= "文本";break
      case 4:this.Typename= "图片";break
      case 5:this.Typename= "音频";break
      case 6:this.Typename= "视频";break
      case 9:this.Typename= "附件";break
      default :this.Typename= "其他";
    }
    return this.Typename;
  }

  ViewMessage(ID:number,TypeId:number,AppID:number)
  {
    if(TypeId==1)
    {
      this.router.navigate(['message/image',  {messageId:ID,AppID:AppID,actionStr:"view"}]);
    }
    else if(TypeId==2)
    {
      this.router.navigate(['message/text',  {messageId:ID,AppID:AppID,actionStr:"view"}]);
    }
    else if(TypeId==4||TypeId==5||TypeId==6||TypeId==9)
    {
      this.router.navigate(['message/multimedia', {messageId:ID,AppID:AppID,actionStr:"view"}]);
    }
  }


  copyMessage(ID:number,TypeId:number,AppID:number)
  {
    
    this.modalService.create({
      nzTitle:'是否复制',
      nzContent:'确认复制该消息吗？',
      nzOnOk:()=>{
        
        this.messageService.CopyMessage(ID,TypeId,false,AppID);
      }
    });
   // this.messageService.CopyMessage(ID,TypeId);
  }


  editMessage(ID:number,TypeId:number,AppID:number)
  {
    if(TypeId==1)
    {
      this.router.navigate(['message/image',  {messageId:ID,AppID:AppID,actionStr:"edit"}]);
    }
    else if(TypeId==2)
    {
      this.router.navigate(['message/text',  {messageId:ID,AppID:AppID,actionStr:"edit"}]);
    }
    else if(TypeId==4||TypeId==5||TypeId==6||TypeId==9)
    {
      this.router.navigate(['message/multimedia', {messageId:ID,AppID:AppID,actionStr:"edit"}]);
    }
  } 

  //返回列表
  returnBack() {
    history.go(-1);
    //this.router.navigate(['message/createmessagelist']);
  }

  getMessageList(reset: boolean = false){    
  
    if (reset) {
      this.pageIndex = 0;
    }
    
    if(reset)this.preMessageList =[];
    const param = new GetListDto();
    
    param.offset=this.pageIndex==0?0:(this.pageIndex-1)*10;
    param.limit=this.pageSize;
    param.order="desc";
    param.sort="CreateDate";
    param.lang="CN";
    param.msgType=1;
    param.isDraft=true;
    param.appId=0;
    param.IsCreate=true;
    param.PageTypeName="create";
    
    if(this.searchListModel.Status.length==0)
        this.searchListModel.ApprovalState=[0,1,2,3];
        else
      this.searchListModel.ApprovalState=this.searchListModel.Status;
    //this.searchListModel.Title=this.searchListModel.Title.replace('/','//');
    
    //param.data=JSON.stringify(this.searchListModel).replace('/','\/');

    param.data=encodeURIComponent(JSON.stringify(this.searchListModel));

    //console.log(param);     
    this.messageService.GetMessageList(param).do(()=>{      
      this.loading = true;    
    }).subscribe(m=> {    
      this.loading = false;
      this.total = m.totalCount;
      this.dataSet = m.items;
    });
  } 

  toggleCollapse(): void {
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


  GetCategory()
  {
    this.messageService.GetCategory().subscribe(m=> {
      this.CategoryList=m.items;
    });
  }

  ngOnInit() {
    this.getMessageList();
    this.GetCategory();

    // [ Validators.required ] 必填项在IE里会自动加上红框
    this.validateForm = this.fb.group({
      Title            : [ null],
      BasicType         : [ null, [ Validators.required ] ],
      MsgTag         : [ null, [ Validators.required ] ],      
     CreatorIds    : [ null ],
      nickname         : [ null, [ Validators.required ] ],
      SenderIds      : [ null, [ Validators.required ] ],
      CreationTimeBegin          : [ null, [ Validators.required ] ],
      CreationTimeEnd          : [ null, [ Validators.required ] ],
      SendTimeBegin            : [ null, [ Validators.required ] ],
      SendTimeEnd            : [ null, [ Validators.required ] ],
      //Status            : [ [null], [ Validators.required ] ],
      Status            : [ [''], [ Validators.required ] ],
      ApprovalTimeBegin            : [ null, [ Validators.required ] ],
      ApprovaTimeEnd            : [ null, [ Validators.required ] ],
      SendStatus            : [ null, [ Validators.required ] ],
      //ApprovalState            : [ null, [ Validators.required ] ],

      
    });
    //置顶
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  constructor(private messageService: MessageService,private fb: FormBuilder,private router: Router,
    private modalService :NzModalService) { 
    this.searchListModel.Title="";
    this.searchListModel.Status=[];
    this.searchListModel.MsgTag=null;
    this.searchListModel.BasicType=null;
    this.searchListModel.CreatorIds="";
    this.searchListModel.CreateDateFrom="";
    this.searchListModel.CreateDateTo="";
    this.searchListModel.SenderIds="";
    this.searchListModel.SendDateFrom="";
    this.searchListModel.SendDateTo="";
    this.searchListModel.currentStartItem="";
    this.searchListModel.ApprovaDateFrom="";
    this.searchListModel.ApprovaDateTo="";
    this.searchListModel.SendStatus=null;
    this.searchListModel.ApprovalState=[];
  }

}
