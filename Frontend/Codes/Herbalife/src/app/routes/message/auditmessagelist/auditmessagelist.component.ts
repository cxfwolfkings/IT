import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {MessageService,GetListDto,PreListDto,SearchListModel,CategoryMolde} from ".././message.service";
import {FormBuilder,FormControl,FormGroup,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-auditmessagelist',
  templateUrl: './auditmessagelist.component.html',
  styleUrls: ['./auditmessagelist.component.css']
})
export class AuditmessagelistComponent implements OnInit {

  messageId=0;
  ExplainInputValue="";
  ApprovalradioValue="A";

  validateForm: FormGroup;
  searchListModel=new  SearchListModel();
  searchbtn_name="高级检索";
  ishidden=true;
  isCollapse = true;

  wassearchbtn_name="高级检索";
  wasishidden=true;
  wasisCollapse = true;

  preMessageList:PreListDto[]=[];
  CategoryList:CategoryMolde[]=[];

  pageIndex = 0;
  pageSize = 10;
  total = 1;
  Ontotal=1; 
  dataSet = []; //未审批
  OndataSet=[]; //已审批
  loading = true;
  sortValue = null;
  sortKey = null;
  Typename="";  

  isVisible=false; //控制审核弹出框
  isOkLoading = false;

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


 wastoggleCollapse(): void {
  if(this.wasishidden)
  {
   this.wasishidden=false;
   this.wasisCollapse = false;
   this.wassearchbtn_name="快速检索";
 }
   else
   {        
     this.wasishidden=true;
     this.wasisCollapse = true;
     this.wassearchbtn_name="高级检索";
   }      
} 

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
    param.isDraft=true;//未发送
    param.appId=0;
    param.IsCreate=false;
    param.PageTypeName="approval";
    this.searchListModel.ApprovalState=[1];
    //param.data=JSON.stringify(this.searchListModel).replace('/','\/');;

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
  resetForm(): void {
    
    this.validateForm.reset();
    this.getMessageList();
  }
  resetFormApprover() :void {
    
    this.validateForm.reset();
    this.getMessageListIsApprover();
  }

  getMessageListIsApprover(reset: boolean = false){    
    if (reset) {
      this.pageIndex = 0;
    }
    if(reset)this.preMessageList =[];
    const param = new GetListDto();
    param.offset=this.pageIndex==0?0:(this.pageIndex-1)*10;
    param.limit=this.pageSize;
    param.order="desc";
    param.sort="ApprovalTime";
    param.lang="CN";
    param.msgType=1;
    param.isDraft=false; //已经发送
    param.appId=3;
    param.IsCreate=false;
    param.PageTypeName="approval";
    this.searchListModel.ApprovalState=[2,3];
    //this.searchListModel.Status=[2];//已经发送
    //param.data=JSON.stringify(this.searchListModel).replace('/','\/');;
    param.data=encodeURIComponent(JSON.stringify(this.searchListModel));
    
    //console.log(param);     
    this.messageService.GetMessageList(param).do(()=>{      
      this.loading = true;    
    }).subscribe(m=> {    
      this.loading = false;
      this.Ontotal = m.totalCount;
      this.OndataSet = m.items;
    });
  } 

  GetCategory()
  {
    this.messageService.GetCategory().subscribe(m=> {
      this.CategoryList=m.items;
    });
  }
/*弹出层方法start*/
  ApprovalMessage(id)
  {
    this.isVisible = true;
    this.messageId=id;

    //点第二次的时候默认设置A
    this.ApprovalradioValue="A";
    this.ExplainInputValue="";
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  handleOk(): void {
   // this.isOkLoading = true;
    
    //alert(this.ApprovalradioValue+"___"+this.ExplainInputValue);

    let ApprovalState=this.ApprovalradioValue=="A"?2:3;
    let Approvalmsg=this.ApprovalradioValue=="A"?"您已审批成功":"您已成功拒绝";
    var a=this;
    debugger
    this.messageService.SendApprovalMessage(this.messageId,ApprovalState,this.ExplainInputValue,8,3,false,Approvalmsg).subscribe(r=>{   
        
  
      });
      this.msg.success(Approvalmsg); 
      this.isVisible = false;
      this.isOkLoading = false;
      this.getMessageList();
      this.getMessageListIsApprover();
    //this.validateForm.reset();
   
    
    // window.setTimeout(() => {
    //   this.isVisible = false;
    //   this.isOkLoading = false;
    //   this.getMessageList();
    //   this.getMessageListIsApprover();
    // }, 500);
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

  /*弹出层方法end*/

  changeTab(t:number)
  {
    this.validateForm.reset();
    if(t==1)
    {
      this.getMessageList();
    }
    else
    {
      this.getMessageListIsApprover();
    }

  }

  ngOnInit() {
    this.getMessageList();
    //this.getMessageListIsApprover();
    this.GetCategory();
    
    this.searchListModel.MsgTag=null;
    
    this.validateForm = this.fb.group({
      Title            : [ null ],
      BasicType         : [ null ],
      MsgTag         : [ null  ],      
      CreatorIds    : [ null ],
      nickname         : [ null ],
      SenderIds      : [ null ],
      CreationTimeBegin          : [ null ],
      CreationTimeEnd          : [ null],     
      Status            : [ null ],
      ApprovalTimeBegin            : [ null ],
      ApprovaTimeEnd            : [ null ]
      
    });
    //置顶
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
  constructor(private messageService: MessageService,
    private fb: FormBuilder,
    private router: Router,
    private msg: NzMessageService) {
    
   }


}
