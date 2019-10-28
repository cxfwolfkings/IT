
import { Injectable } from '@angular/core';
import {HttpClient,HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { Router } from '@angular/router';
import {AbpApiService} from "../../core/services/abp-api-service"
import {environment} from "../../../environments/environment"
import { NzMessageService } from 'ng-zorro-antd';

import { RequestOptions } from '@angular/http';
const messageApiUrl ={
  refreshUserReceiver :environment.SERVER_URL+"/UserMangement/GetMessageRecipentAppUsersDynamic",
  GetMessages :environment.SERVER_URL+"/MessageManagement/HGetMessages",
  removeFile:environment.SERVER_URL+"/File/HDeleteData",
  SendMessage:environment.SERVER_URL+"/MessageManagement/HSendMessageForpost",
  SaveMessage:environment.SERVER_URL+"/MessageManagement/HSaveMessageForPost",
  SendMultiMediaMessage:environment.SERVER_URL+"/MessageManagement/HSendMultiMediaMessageForpost",
  SaveMultiMediaMessage:environment.SERVER_URL+"/MessageManagement/HSaveMultiMediaMessageForpost",
  GetAppList:environment.SERVER_URL+"/App/HGetAppList",
  GetMessage:environment.SERVER_URL+"/MessageManagement/HGetMessage",
  GetContents:environment.SERVER_URL+"/ContentManagement/HGetContentsWithMessage",
  SendApprovalMessage:environment.SERVER_URL+"/MessageManagement/HApprovalMessage",
  GetCategory:environment.SERVER_URL+"/MessageManagement/HGetCategory",
  CopyMessage:environment.SERVER_URL+"/MessageManagement/CopyMessage",
};

  // 要使该服务可以依赖注入，需要加上下面这个标签，并且在模块中声明
  @Injectable()
  export class MessageService extends AbpApiService{

    constructor(protected http: HttpClient,private router: Router,private Nzmessage: NzMessageService) {
      super(http,Nzmessage)
    }
  
    //获取收件人方法
    public refreshUserReceiver(params:GetUserDto):Observable<PagedData<PreUserDto>> {
      const url = messageApiUrl.refreshUserReceiver;
      return this.abpGet<PagedData<PreUserDto>>(url,params);
    }   
    
    public GetMessageList(params:GetListDto):Observable<PagedData<PreListDto>> {
      const url = messageApiUrl.GetMessages;
      //return this.abpPost(url,null,{ offset:0,limit:10,order:"desc",sort:"CreateDate",lang:"CN",msgType:1,isDraft:false,appId:1,data:""})
      //return this.abpPost<PagedData<PreListDto>>(url,null,params);
      //return this.abpPost<PagedData<PreListDto>>(url,params);
      //return this.abpGet<PagedData<PreListDto>>(url,params);

      return this.abpGet2<PagedData<PreListDto>>(url, params, null, {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Accept': '*/*'
      });

    }

    public SendMessage(data:string,isTest:boolean,sendAllLang:boolean,lang:string,appId:number):void{
      const url = messageApiUrl.SendMessage;
      //this.abpGet(url,{id:id})
     this.abpPost(url,{data:data,isTest:isTest,sendAllLang:sendAllLang,lang:lang,appId:appId},null,{
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Accept': '*/*'
    }).subscribe(r=>{ 
      debugger   
      console.log(r);
      this.Nzmessage.success('消息发送成功');
      this.router.navigate(['message/createmessagelist']);
      })
    }

    public SaveMessage(data:string,lang:string,appId:number):void{
      const url = messageApiUrl.SaveMessage;
      //this.abpGet(url,{id:id})
     //this.abpPost(url,null,{data:data,lang:lang,appId:appId}).subscribe(r=>{ 
      // var headers = new Headers();
      // headers.append('Content-Type', 'application/x-www-form-urlencoded');
      this.abpPost(url,{data:data,lang:lang,appId:appId},null,{
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Accept': '*/*'
      }).subscribe(r=>{ 
       debugger   
      console.log(r);
      this.Nzmessage.success('消息保存成功');
      this.router.navigate(['message/createmessagelist']);
      })
    }    

    public SendMultiMediaMessage(data:string,isTest:boolean,sendAllLang:boolean,lang:string,appId:number,istype:number,uploadname:string):void{
      const url = messageApiUrl.SendMultiMediaMessage;
      //this.abpGet(url,{id:id})
     //this.abpPost(url,null,{data:data,isTest:isTest,sendAllLang:sendAllLang,lang:lang,appId:appId,istype:istype,uploadname:uploadname}).subscribe(r=>{  
      this.abpPost(url,{data:data,isTest:isTest,sendAllLang:sendAllLang,lang:lang,appId:appId,istype:istype,uploadname:uploadname},null,{
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Accept': '*/*'
      }).subscribe(r=>{    
      console.log(r); 
      this.Nzmessage.success('消息发送成功');
        this.router.navigate(['message/createmessagelist']);
      })
    }

    
    public SaveMultiMediaMessage(data:string,lang:string,appId:number,istype:number):void{
      const url = messageApiUrl.SaveMultiMediaMessage;
      //this.abpGet(url,{id:id})
     //this.abpPost(url,null,{data:data,lang:lang,appId:appId,istype:istype}).subscribe(r=>{    
      this.abpPost(url,{data:data,lang:lang,appId:appId,istype:istype},null,{
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Accept': '*/*'
      }).subscribe(r=>{    
      console.log(r);
      this.Nzmessage.success('消息保存成功');
      this.router.navigate(['message/createmessagelist']);
      })
    }   


    
    public CopyMessage(id:number,msgType:number,isUse:boolean,appId:number):void{
      const url = messageApiUrl.CopyMessage;
      //this.abpGet(url,{id:id})
     //this.abpPost(url,null,{data:data,lang:lang,appId:appId,istype:istype}).subscribe(r=>{    
      this.abpPost(url,null,{id:id,msgType:msgType,isUse:isUse,appId:appId}).subscribe(r=>{    
        if(msgType==4||msgType==5||msgType==6||msgType==9)
        {
          this.router.navigate(['message/multimedia', {messageId:r.messageId,AppID:appId}]);
        }else if(msgType==1){
          this.router.navigate(['message/image',  {messageId:r.messageId,AppID:appId}]);
        }
        else if(msgType==2){
          this.router.navigate(['message/text',  {messageId:r.messageId,AppID:appId}]);
        }
      })
    }   

    public GetMessage(messageId:number,appId:number):Observable<ImageMessage> {
      const url = messageApiUrl.GetMessage+'?messageId='+messageId+"&appId="+appId;
      return this.abpGet<ImageMessage>(url);
    }   

    public RemoveFile(id:number):void{
      const url = messageApiUrl.removeFile;
      //this.abpGet(url,{id:id})
     //this.abpPost(url,null,{id:id}).subscribe(r=>{   
      this.abpPost(url,null,{id:id}).subscribe(r=>{    
        //console.log(r);
      })
    }

    public GetAppList(params):Observable<PagedData<PreAppDto>> {
      const url = messageApiUrl.GetAppList;
      return this.abpGet<PagedData<PreAppDto>>(url,params);
    }


    public GetContentList(params:GetContentListDto):Observable<PagedData<PreContentListDto>> {
      const url = messageApiUrl.GetContents;
      return this.abpPost<PagedData<PreContentListDto>>(url,null,params);
    }

    public GetselectUser(params:GetUserDto):Observable<PagedData<PreUserDto>> {
      const url = messageApiUrl.refreshUserReceiver;
      return this.abpGet<PagedData<PreUserDto>>(url,params);
    }   

    public SendApprovalMessage(id:number,ApprovalState:number,explain:string,userId:number,appId:number,isTest:boolean,approvalmsg:string)
    {
      const url=messageApiUrl.SendApprovalMessage
       return this.abpPost(url,null,{messageId:id,ApprovalState:ApprovalState,explain:explain,userId:userId,appId:appId,isTest:isTest})
      // .subscribe(r=>{   
        
      //   this.Nzmessage.success(approvalmsg); 
      //     //console.log(r); 
      //     //alert("发送成功");
      //     //this.router.navigate(['message/audit']);
      //   })
    }


    public GetCategory()
    {
      const url=messageApiUrl.GetCategory;
      return this.abpGet<PagedData<CategoryMolde>>(url);
    }

  }

  //文章分类
  export class CategoryMolde
  {
    id:string;
    name:string
  }

  //文章类
  
  export class GetContentListDto{
    offset:number;
    limit:number;
    order:string;
    sort:string;
    lang:string;
    msgType:number;
    isDraft:boolean;
    appId:number;
    data:string;
  }

  export class PreContentListDto{
    AccessLevel:string;
    AppId:string;
    CategoryId:string;
    CategoryName:string;
    CnContentTitle:string;
    ContentStatus:string;
    CreationTime:string;
    Creator:string;
    CreatorName:string;
    EnContentTitle:string;
    ExpireDate:string;
    ExpireYearSet:string;
    Id:string;
    IsApproval:string;
    IsDeleted:string;
    IsEnabled:string;
    IsLike:string;
    IsVerification:string;
    LocationId:string;
    StatusName:string;
    TemplateType:string;
    TopOrder:string;
  }

  export class SearchContentListModel{
    
    Id: string;
    cnContentTitle: string;
    enContentTitle: string;
    contentStatus:  Array<number>;
    contentCategory:  string;
    creator:  string;
    createDateFrom:  string;
    createDateTo:  string;
  }


  //已创建消息列表实体
  export class SearchListModel{
    Title:string;
    Status: Array<number>;
    MsgTag: string;
    BasicType: string;
    CreatorIds: string;
    CreateDateFrom: string;
    CreateDateTo: string;
    SenderIds: string;
    SendDateFrom: string;
    SendDateTo: string;
    currentStartItem: string;
    ApprovaDateFrom: string;
    ApprovaDateTo: string;
    ApprovalState:Array<number>;//消息审批状态
    SendStatus:string;
  }

  export class GetListDto{
    offset:number;
    limit:number;
    order:string;
    sort:string;
    lang:string;
    msgType:number;
    isDraft:boolean;
    appId:number;
    IsCreate:boolean;
    data:string;    
    PageTypeName:string;
  }

  export class PreListDto{
    CreateDate:string;
    CreatorName:string;
    ID:number;
    MessageTag:string;
    SendDate:string;
    SendDateOrder:number;
    SenderName:string;
    Status:string;
    StatusType:number;
    Title:string;
    TypeId:number;
    TypeName:string;
  }
  export class GetUserDto{
    appid:number;
    name:string;
    userIds:string;
    selectedUserIds:string;
  }
  export class PreUserDto{
    Id:number;
    name:string;
  }
  export class PagedData<T>{
    items:T[];
    totalCount:number;
  }
  /*主题图文信息*/
  export class ImageMessage
  {
    appId:number;
    isSendTest:boolean;
    items:Array<MessageItem>;
    MessageIdentity:string;
    languageCode: string;
    isSendMail:boolean;
    msgType:string;
    status:string;
    type:string;
    sendType:string;
    summary:{EN:string,CN:string};
    //Items:MessageItem[];
    messageId:-1;    
    //summary:{EN:string,CN:string};
    //summaryEN:string;
    //summaryCN:string;
    receiver:string;
    userReceiver:string;
    ApprovalState:number;
  }

/*子类图文信息*/
export class MessageItem{
    content:string;
    contentId:string;
    externalLink:string;
    isExternalLink: boolean;
    img:{id:string,url:string};
    fileList:[{uid:string,name:string,status:string,url:string}];
    itemId:number;
    title:{CN:string,EN:string};
    textMessageContent: { EN: string ,CN: string };
    //titleCN:string;
    //titleEN:string;
    //textMessageContentCN:string;
    //textMessageContentEN:string;
    isSelect:boolean;
  }
    /*多媒体信息*/
    export class MultiMediaMessage
    {
      appId:number;
      isSendTest:false;
      items:Array<MultiMediaMessageItem>;
      //Items:MessageItem[];
      messageId:-1;    
      languageCode: "CN,EN";
      MessageIdentity:string;
      isSendMail:boolean;
      msgType:string;
      status:string;
      type:string;
      sendType:string;
      summary:{EN:string,CN:string};
      //summaryEN:string;
      //summaryCN:string;
      receiver:string;
      userReceiver:string;
      ApprovalState:number;
    }
  
  /*多媒体子类图文信息*/
  export class MultiMediaMessageItem{
      content:string;
      contentId:string;
      externalLink:string;
      isExternalLink: false;
      Uploadimg:{id:string,url:string};
      title:{CN:string,EN:string};
      fileId:string;//视频id
      AudioFileId:string;//视频id
      FileFileId:string;//附件id
      itemId:number;
      tptitleCN:string;
      tptitleEN:string;
      yptitleCN:string;
      yptitleEN:string;
      sptitleCN:string;
      sptitleEN:string;
      fjtitleCN:string;
      fjtitleEN:string;
      textMessageContent: { EN: string ,CN: string };
    }

    export class PreAppDto{
      AgentID:number;
      name:string;
    }