import { Component, OnInit,ViewChild } from '@angular/core';
import { AbstractControl,FormBuilder,FormControl,FormGroup,Validators} from '@angular/forms';
import {MessageService,MultiMediaMessageItem,MultiMediaMessage,PreUserDto,GetUserDto} from "../message.service";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import {environment} from "../../../../environments/environment"
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import { AddresseeComponent } from '../addressee/addressee.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer  } from "@angular/platform-browser";
import { CommonService } from 'src/app/core/services/common.service';

@Component({
  selector: 'app-multimedia-message',
  templateUrl: './multimedia-message.component.html',
  styleUrls: ['./multimedia-message.component.css']
})
export class MultimediaMessageComponent implements OnInit {
  @ViewChild(AddresseeComponent) child: AddresseeComponent;

  //传递参数,获取消息id 
  messageId: number = 0;
  AppID:number=0;
  //传递参数,区分类型
  actionStr: string = "";

  //控制按钮是否可用
  isCheckedButton = true;

  isDisabled = false;
  //默认显示第一个tab
  SelectedIndex=0;

  validateForm: FormGroup;
  isVisible = false;
  imagemessage= new MultiMediaMessage();
  messageItem= new MultiMediaMessageItem();

  preUserList:PreUserDto[]=[];
  
  //uploadUrl=environment.SERVER_URL+"/File/HMultiMediaUploadFile?isMaterialSave=false&fileType=3";
  uploadUrl=environment.SERVER_URL+"/File/UploadContent?isMaterialSave=false&fileType=3";
  uploadFileUrl=environment.SERVER_URL+"/File/HMultiMediaUploadFile?isMaterialSave=false&fileType=3";
  searchChange$ = new BehaviorSubject('');
  optionList = [];
  grouplist=[];
  selectedUser;
  isLoading = false;
  isShowButton=true;

  loading = false;
  avatarUrl: string;
  UploadFileName:string;

  tabtype:number=4;
  tpFileid:string="";
  tpFileUrl= [];//[{ uid: "", name: "", status: "", url: "" }];
  ypFileid:string="";
  ypFileUrl=[];//[{ uid: "", name: "", status: "", url: "" }];
  spFileid:string="";
  spFileUrl=[];// [{ uid: "", name: "", status: "", url: "" }];
  fjFileid:string="";
  fjFileUrl=[];//[{ uid: "192", name: "QQ图片20161116133427.jpg", status: "done", url: "http://localhost:56876/File/GetData?id=192" }];
  isupload:boolean=true;

  tpDisabled=false;
  ypDisabled=false;
  spDisabled=false;
  fjDisabled=false;

  Currenttype:number=4; //默认是4,发送图片

  tptitleCNWords ='0/150';
  tptitleENWords ='0/150';
  yptitleCNWords ='0/150';
  yptitleENWords ='0/150';
  sptitleCNWords ='0/150';
  sptitleENWords ='0/150';
  fjtitleCNWords ='0/150';
  fjtitleENWords ='0/150';


  changeTab(istype:number):void{
    this.tabtype=istype;

    this.Currenttype=istype;
    this.messageItem.Uploadimg={id:"",url:""};
    
    if(this.tabtype==4)
    {
      this.messageItem.Uploadimg.id=this.tpFileid;

      this.validateForm.controls["tptitleCN"].setValidators(Validators.required);
      this.validateForm.controls["tptitleEN"].setValidators(Validators.required);

      this.validateForm.controls["yptitleCN"].clearValidators();
      this.validateForm.controls["yptitleEN"].clearValidators();
      this.validateForm.controls["sptitleCN"].clearValidators();
      this.validateForm.controls["sptitleEN"].clearValidators();
      this.validateForm.controls["fjtitleCN"].clearValidators();
      this.validateForm.controls["fjtitleEN"].clearValidators();
    }
    else if(this.tabtype==5)
    {
      this.messageItem.AudioFileId=this.ypFileid;

      this.validateForm.controls["yptitleCN"].setValidators(Validators.required);
      this.validateForm.controls["yptitleEN"].setValidators(Validators.required);

      this.validateForm.controls["tptitleCN"].clearValidators();
      this.validateForm.controls["tptitleEN"].clearValidators();
      this.validateForm.controls["sptitleCN"].clearValidators();
      this.validateForm.controls["sptitleEN"].clearValidators();
      this.validateForm.controls["fjtitleCN"].clearValidators();
      this.validateForm.controls["fjtitleEN"].clearValidators();
    }
    else if(this.tabtype==6)
    {
      this.messageItem.fileId=this.spFileid;

      this.validateForm.controls["sptitleCN"].setValidators(Validators.required);
      this.validateForm.controls["sptitleEN"].setValidators(Validators.required);

      this.validateForm.controls["tptitleCN"].clearValidators();
      this.validateForm.controls["tptitleEN"].clearValidators();
      this.validateForm.controls["yptitleCN"].clearValidators();
      this.validateForm.controls["yptitleEN"].clearValidators();
      this.validateForm.controls["fjtitleCN"].clearValidators();
      this.validateForm.controls["fjtitleEN"].clearValidators();
    }
    else if(this.tabtype==9)
    {
      //this.messageItem.Uploadimg.id=this.fjFileid;
      this.messageItem.FileFileId=this.fjFileid;

      this.validateForm.controls["fjtitleCN"].setValidators(Validators.required);
      this.validateForm.controls["fjtitleEN"].setValidators(Validators.required);

      this.validateForm.controls["tptitleCN"].clearValidators();
      this.validateForm.controls["tptitleEN"].clearValidators();
      this.validateForm.controls["yptitleCN"].clearValidators();
      this.validateForm.controls["yptitleEN"].clearValidators();
      this.validateForm.controls["tptitleCN"].clearValidators();
      this.validateForm.controls["tptitleEN"].clearValidators();
    }
  }

  private getBase64(img: File, callback: (img: {}) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  //handleChange(info: { file: UploadFile }): void {
handleChange(info: any): void { 
  const fileList = info.fileList;

  if (info.file.response) {
    info.file.url = info.file.response.url;
  }

    if (info.file.status === 'uploading') {
      this.loading = true;
      return;
    }
    if (info.file.status === 'done') {
      
      // Get this url from response in real world.
      //this.getBase64(info.file.originFileObj, (img: string) => {

        this.loading = false;
        this.avatarUrl = info.file.response.url;;
        this.UploadFileName=info.file.name;

        this.imagemessage.items=[];
        this.messageItem.Uploadimg={id:"",url:""};
        debugger
        if(this.tabtype==4)
        {
          this.tpFileid=info.file.response
          this.messageItem.Uploadimg.id=this.tpFileid;
          this.tpFileUrl = [{ uid: "", name: "", status: "", url: "" }];
          this.tpFileUrl[0].uid = info.file.response;
          this.tpFileUrl[0].name = info.file.name;
          this.tpFileUrl[0].status = "done";
          this.tpFileUrl[0].url = environment.SERVER_URL+"/File/download?id="+ this.tpFileid ;//info.file.thumbUrl;//response.url;;
        }
        else if(this.tabtype==5)
        {
          this.ypFileid=info.file.response;
          this.messageItem.AudioFileId=this.ypFileid;
          this.ypFileUrl = [{ uid: "", name: "", status: "", url: "" }];
          this.ypFileUrl[0].uid = info.file.response;
          this.ypFileUrl[0].name = info.file.name;
          this.ypFileUrl[0].status = "done";
          this.ypFileUrl[0].url =  environment.SERVER_URL+"/File/download?id="+ this.ypFileid;//info.file.thumbUrl;//.response.url;;
        }
        else if(this.tabtype==6)
        {
          this.spFileid=info.file.response;
          this.messageItem.fileId=this.spFileid;
          this.spFileUrl = [{ uid: "", name: "", status: "", url: "" }];
          this.spFileUrl[0].uid = info.file.response;
          this.spFileUrl[0].name = info.file.name;
          this.spFileUrl[0].status = "done";
          this.spFileUrl[0].url =  environment.SERVER_URL+"/File/download?id="+ this.spFileid ;//info.file.thumbUrl;//.response.url;
        }
        else if(this.tabtype==9)
        {
          this.fjFileid=info.file.response;
          
          this.fjFileUrl = [{ uid: "", name: "", status: "", url: "" }];
          this.messageItem.FileFileId=this.fjFileid;
          this.fjFileUrl[0].uid = info.file.response;
          this.fjFileUrl[0].name =info.file.name;
          this.fjFileUrl[0].status = "success";
          //const a=window.URL.createObjectURL(info.file);download
          this.fjFileUrl[0].url = environment.SERVER_URL+"/File/download?id="+this.fjFileid ;// info.file.thumbUrl;//"https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo_top_86d58ae1.png" //this.sanitizer.bypassSecurityTrustUrl(info.file.thumbUrl);
        }
        //上传完整之后将id添加到类中
        //this.imagemessage.Items=[];
        //this.messageItem.img.id=info.file.response;
        this.imagemessage.items.push(this.messageItem);       

      //});
    }
    if (info.file.status === 'removed') {  
      debugger   
        this.messageService.RemoveFile(info.file.uid); 



    }
  }
  
  isRemove= (file: UploadFile) => {
    return !this.isDisabled;
  }


  fdelete=(file: UploadFile) => {
    if(this.actionStr=="view")
    {
      return false;
    }
    else{
      return true;
    }
      
  };

  beforeUpload = (file: File) => {
    
    const isJPG = file.type === 'image/jpeg';
    const isPNG = file.type === 'image/png';
    
    const isLt2M = file.size / 1024 / 1024 < 2;

    if ((!isJPG && !isPNG)||!isLt2M) {
      this.msg.error('上传图片格式为jpg,png且图片必须小于2MB');
    }
   
    
    // if (!isJPG && !isPNG) {
    //   this.msg.error('上传图片格式为jpg,png!');
    // }
    // const isLt2M = file.size / 1024 / 1024 < 2;
    // if (!isLt2M) {
    //   this.msg.error('图片必须小于2MB!');
    // }
    //alert((isJPG || isPNG) && isLt2M);
    return (isJPG || isPNG) && isLt2M;
  }  

  beforeUploadaudio = (file: File) => {
    
    //const isaudio = file.type === 'audio/mp3';
    //const isamr = file.type === 'audio/amr';

    const isamr= file.name.substring(file.name.lastIndexOf('.')) ==".amr";

    const isLt2M = file.size / 1024 / 1024 < 2;
    //if ((!isaudio&&!isamr)||!isLt2M) {
    if (!isamr||!isLt2M) {
      //只支持amr格式
      this.msg.error('上传音频格式为amr且音频必须小于2MB!');
      //this.msg.error('上传音频格式为mp3,amr且音频必须小于2MB!');
    }
    

    // if (!isaudio&&!isamr) {
    //   this.msg.error('上传音频格式为mp3,amr!');
    // }
    // const isLt2M = file.size / 1024 / 1024 < 2;
    // if (!isLt2M) {
    //   this.msg.error('音频必须小于2MB!');
    // }
    //return (isaudio ||isamr) && isLt2M;
    return (isamr) && isLt2M;
  }  

  beforeUploadvideo = (file: File) => {
    
    const isvideo = file.type === 'video/mp4';

    
    const isLt2M = file.size / 1024 / 1024 < 10;
    if ((!isvideo)||!isLt2M) {
      this.msg.error('上传视频格式为mp4且视频必须小于10MB!');
    }
    // if (!isvideo) {
    //   this.msg.error('上传视频格式为mp4!');
    // }
    // const isLt2M = file.size / 1024 / 1024 < 10;
    // if (!isLt2M) {
    //   this.msg.error('视频必须小于10MB!');
    // }
    return isvideo && isLt2M;
  }  

  beforeUploadtext = (file: File) => {

    // nzFileType="text/plain,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,
    //                   application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,
    //                   application/pdf"
    const istext = file.type === 'text/plain';    
    const isdoc = file.type === 'application/msword';
    const isdocx = file.type ===  'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    const isxls = file.type === 'application/vnd.ms-excel';
    const isxlsx = file.type ==='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    // const isppt = file.type === 'application/vnd.ms-powerpoint';
    // const ispptx = file.type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
    const ispdf = file.type === 'application/pdf';

    const isLt2M = file.size / 1024 / 1024 < 20;
    //if ((!istext&&!isdoc&&!isdocx&&!isxls&&!isxlsx&&!isppt&&!ispptx&&!ispdf)||!isLt2M) {
      if ((!istext&&!isdoc&&!isdocx&&!isxls&&!isxlsx&&!ispdf)||!isLt2M) {
      this.msg.error('上传附件格式为txt,doc,docx,xls,xlsx,ppt,pptx,pdf且附件必须小于20MB!');
    }    

    // if (!istext&&!isdoc&&!isdocx&&!isxls&&!isxlsx&&!isppt&&!ispptx&&!ispdf) {
    //   this.msg.error('上传附件格式为txt,doc,docx,xls,xlsx,ppt,pptx,pdf!');
    // }
    // const isLt2M = file.size / 1024 / 1024 < 20;
    // if (!isLt2M) {
    //   this.msg.error('附件必须小于20MB!');
    // }
    return (istext||isdoc||isdocx||isxls||isxlsx||ispdf)  && isLt2M;
    //return (istext||isdoc||isdocx||isxls||isxlsx||isppt||ispptx||ispdf)  && isLt2M;
  }  
  //
  //

  showModal():void{
  }

  testswitch () {
    switch(this.Currenttype)
      {
        case 4:if(this.tpFileid=="") {this.isupload=false}else{this.isupload=true};break;
        case 5:if(this.ypFileid=="") {this.isupload=false}else{this.isupload=true};break;
        case 6:if(this.spFileid=="") {this.isupload=false}else{this.isupload=true};break;
        case 9:if(this.fjFileid=="") {this.isupload=false}else{this.isupload=true};break;
      }
      return this.isupload;
  }

  

  submitForm(type: string, istest: boolean,ApprovalState:number): void {
    
    let issub=true;
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();

      if(this.validateForm.controls[ i ].invalid)
      {
        issub=false;
      }
    }
    
    debugger
    if(!this.testswitch())
    {
      //alert("输入的消息内容不完整，请修改后发送");
      this.msg.error("输入的消息内容不完整，请修改后发送");
      return;
    }
    else
    {
      this.imagemessage.ApprovalState=ApprovalState;
      //this.imagemessage.appId=3;
      /*if(this.imagemessage.appid==0)
      {
        alert("请选择指定应用");return;
      }*/
      //if(this.imagemessage.receiver.length==0&&this.imagemessage.userReceiver.length==0)

      
      //if ((this.child.selectedUser.length == 0 && this.child.selectedGroup.length == 0) || this.child.selectAgentId == 0) 
      if ((this.child.selectedUser.length == 0 && this.child.selectedGroup.length == 0)) 
      {
        //alert("请选择收件人分组或指定收件人");
        this.msg.error("请选择收件人分组或指定收件人");
        return;
      }

      if(this.child.selectAgentId == 0)
      {
        this.msg.error("请选择应用名称");
        return;
      }

      this.isCheckedButton=false;
      this.imagemessage.userReceiver = this.child.selectedUser.join(',');
      this.imagemessage.receiver = this.child.selectedGroup.join(',');
      this.imagemessage.appId=this.child.selectAgentId;
      const data:string=JSON.stringify(this.imagemessage)
      const lang:string="CN";
      const appid:number=this.child.selectAgentId; //3
      
      //const isTest:boolean=false;
      const sendAllLang:boolean=false;
     
      //为了对应后台转换编号
      // switch(this.tabtype)
      // {
      //   case 1:this.Currenttype=4;break;
      //   case 2:this.Currenttype=5;break;
      //   case 3:this.Currenttype=6;break;
      //   case 4:this.Currenttype=9;break;
      // }
      const uploadname:string=this.UploadFileName;
      console.log(data);

      if (type == 'save') {
        this.messageService.SaveMultiMediaMessage(data,lang,appid,this.Currenttype);
        this.isCheckedButton=true;
      }
      else if (type == 'send') {
        //this.messageService.SendMessage(data,isTest,sendAllLang,lang,appid);
        this.messageService.SendMultiMediaMessage(data,istest,sendAllLang,lang,appid,this.Currenttype,'');
        this.isCheckedButton=true;
      }
      else if(type =='submit')
      {
        this.messageService.SaveMultiMediaMessage(data,lang,appid,this.Currenttype);
        this.isCheckedButton=true;
      }

    }
  }
  
  controlTabDisabled(type:string,items:any[])
  {
    this.messageItem.Uploadimg={id:"",url:""};
    if(type=="4")
    {
      this.ypDisabled=true;
      this.spDisabled=true;
      this.fjDisabled=true;
      this.SelectedIndex=0;
      this.messageItem.Uploadimg.id=this.tpFileid;;
      this.messageItem.tptitleCN=items[0]["title"]["CN"];
      this.messageItem.tptitleEN=items[0]["title"]["EN"];

      this.tptitleCNWords=this.commonService.initWords(this.messageItem.tptitleCN.length, this.tptitleCNWords);
      this.tptitleENWords=this.commonService.initWords(this.messageItem.tptitleEN.length, this.tptitleENWords);

      // this.imagemessage.items[0].tptitleCN=this.messageItem.tptitleCN;
      // this.imagemessage.items[0].tptitleEN=this.messageItem.tptitleEN;
      this.tpFileUrl=[{'uid':items[0]["FileFileId"],'name':items[0]["UploadFileName"],'status':"done",'url':environment.SERVER_URL+items[0]["UploadFilesrc"]}]
    }
    else if(type=="5")
    {
      this.tpDisabled=true;
      this.spDisabled=true;
      this.fjDisabled=true;
      this.SelectedIndex=1;
      //this.messageItem.fileId=this.ypFileid;
      this.messageItem.AudioFileId=this.ypFileid;
      this.messageItem.yptitleCN=items[0]["title"]["CN"];
      this.messageItem.yptitleEN=items[0]["title"]["EN"];

      this.yptitleCNWords=this.commonService.initWords(this.messageItem.yptitleCN.length, this.yptitleCNWords);
      this.yptitleENWords=this.commonService.initWords(this.messageItem.yptitleEN.length, this.yptitleENWords);
      // this.imagemessage.items[0].yptitleCN=this.messageItem.yptitleCN;
      // this.imagemessage.items[0].yptitleEN=this.messageItem.yptitleEN;

      this.ypFileUrl=[{'uid':items[0]["FileFileId"],'name':items[0]["UploadFileName"],'status':"done",'url':environment.SERVER_URL+items[0]["UploadFilesrc"]}]
    }
    else if(type=="6")
    {
      this.tpDisabled=true;
      this.ypDisabled=true;
      this.fjDisabled=true;
      this.SelectedIndex=2;
      //this.messageItem.AudioFileId=this.spFileid;
      this.messageItem.fileId=this.spFileid;
      this.messageItem.sptitleCN=items[0]["title"]["CN"];
      this.messageItem.sptitleEN=items[0]["title"]["EN"];

      this.sptitleCNWords=this.commonService.initWords(this.messageItem.sptitleCN.length, this.sptitleCNWords);
      this.sptitleENWords=this.commonService.initWords(this.messageItem.sptitleEN.length, this.sptitleENWords);

      // this.imagemessage.items[0].sptitleCN=this.messageItem.sptitleCN;
      // this.imagemessage.items[0].sptitleEN=this.messageItem.sptitleEN;

      this.spFileUrl=[{'uid':items[0]["FileFileId"],'name':items[0]["UploadFileName"],'status':"done",'url':environment.SERVER_URL+items[0]["UploadFilesrc"]}]
    }
    else if(type=="9")
    {
      this.tpDisabled=true;
      this.ypDisabled=true;
      this.spDisabled=true;
      this.SelectedIndex=3;
      this.messageItem.FileFileId=this.fjFileid;
      this.messageItem.fjtitleCN=items[0]["title"]["CN"];
      this.messageItem.fjtitleEN=items[0]["title"]["EN"];

      this.fjtitleCNWords=this.commonService.initWords(this.messageItem.fjtitleCN.length, this.fjtitleCNWords);
      this.fjtitleENWords=this.commonService.initWords(this.messageItem.fjtitleEN.length, this.fjtitleENWords);

      // this.imagemessage.items[0].fjtitleCN=this.messageItem.fjtitleCN;
      // this.imagemessage.items[0].fjtitleEN=this.messageItem.fjtitleEN;
      
      this.fjFileUrl=[{'uid':items[0]["FileFileId"],'name':items[0]["UploadFileName"],'status':"done",'url':environment.SERVER_URL+items[0]["UploadFilesrc"]}]
    }

    this.messageItem.Uploadimg={id:"",url:""};
    this.messageItem.Uploadimg.id=items[0]["Uploadimg"]["id"];
    this.messageItem.Uploadimg.url=items[0]["Uploadimg"]["url"];
    this.imagemessage.items[0]=this.messageItem;
    
  }
  //返回列表
  returnBack() {
    history.go(-1);
    //this.router.navigate(['message/createmessagelist']);
  }

  ngOnInit() {

    this.activatedRoute.params.subscribe((params: Params) => {
      this.messageId = params['messageId'];
      this.actionStr = params['actionStr'];
      this.child.actionStr = params['actionStr'];
      this.AppID=params['AppID'];
    });

    if (this.actionStr == "view") {
      this.isDisabled = true;
      this.isShowButton=false;
    }

    
    if (this.messageId > 0) {
      let a = this;
      this.messageService.GetMessage(this.messageId, this.AppID).subscribe(r => {
        //console.log(r.items);   
        
        switch(r.items["type"])
        {
          case 4:this.tpFileid=r.items["items"][0]["Uploadimg"]["id"];break;
          case 5:this.ypFileid=r.items["items"][0]["Uploadimg"]["id"];break;
          case 6:this.spFileid=r.items["items"][0]["Uploadimg"]["id"];break;
          case 9:this.fjFileid=r.items["items"][0]["Uploadimg"]["id"];break;
        }
        this.Currenttype=r.items["type"];
        this.tabtype=r.items["type"];


        this.child.selectAgentId= r.items["appId"];
        this.child.selectAgentName=r.items["appName"];   
        
        // this.child.defaultUserIds = r.items["userReceiver"].join(','); //"3";//
        // this.child.defaultGroupIds = r.items["receiver"].join(',');

        const intervalId = setInterval(function() {
          
          if (a.child) {
            a.child.selectedGroup = r.items["receiver_int"];//.join(',');
            a.child.selectedUser =r.items["userReceiver_int"];           
            a.child.grouplist =  r.items["groups"];
                        a.child.optionList = r.items["users"];
            clearInterval(intervalId);
          }
        }, 60);

        
        // this.child.selectedUser = r.items["userReceiver"].map(function (data) {
        //   return +data;
        // })
        // this.child.selectedGroup = r.items["receiver"].map(function (data) {
        //   return +data;
        // })

        

        this.imagemessage.messageId= r.items["messageId"];
        this.imagemessage.type= r.items["type"];
        

        Object.assign(this.imagemessage, r.items)
        setTimeout(function(){  }, 500);
        this.controlTabDisabled(r.items["type"],r.items["items"]);
        
       

        //setTimeout(() => {
        //  r.items['items'].forEach(function (value, index) {
        //    a.messageItem[index] = value;
        //  })
        //}, 0);
        //this.messageItem = r.items['items'][0];
      })
    }
   

    this.validateForm = this.fb.group({
      tptitleCN            : [ { value: null, disabled: this.isDisabled}, [ Validators.required ] ],
      tptitleEN: [ { value: null, disabled: this.isDisabled}, [ Validators.required ] ],
      yptitleCN: [ { value: null, disabled: this.isDisabled}, [ Validators.required ] ],
      yptitleEN: [ { value: null, disabled: this.isDisabled}, [ Validators.required ] ],
      sptitleCN: [ { value: null, disabled: this.isDisabled}, [ Validators.required ] ],
      sptitleEN: [ {  value: null,disabled: this.isDisabled}, [ Validators.required ] ],
      fjtitleCN: [ { value: null, disabled: this.isDisabled}, [ Validators.required ] ],
      fjtitleEN: [ { value: null, disabled: this.isDisabled}, [ Validators.required ] ],
      imgupload: [ null, [ Validators.required ] ],

      
    }); 

    //置顶
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }


  
  constructor(private fb: FormBuilder,private http: HttpClient,private msg: NzMessageService,
    private messageService: MessageService,private activatedRoute: ActivatedRoute,private sanitizer: DomSanitizer,
    private commonService: CommonService) { 

    //this.imagemessage.Items=[];
    //this.imagemessage.Items.push(this.messageItem);
  
    //this.messageItem.titleCN=="1";
    //this.messageItem.titleEN=="";
    this.imagemessage.messageId=-1;
    this.imagemessage.languageCode="CN,EN";
    this.imagemessage.MessageIdentity="";
    this.imagemessage.isSendMail=false;
    this.imagemessage.msgType="1";
    this.imagemessage.status="1";
    this.imagemessage.type="1";
    this.imagemessage.summary={CN:"",EN:""};
    this.imagemessage.sendType="";
    this.imagemessage.appId=0;
    this.imagemessage.receiver="";
    this.imagemessage.userReceiver="";
    this.imagemessage.items=[];
    this.messageItem.title={CN:"",EN:""};//多余后期可以去掉
    
    this.messageItem.fileId="0";
    this.messageItem.AudioFileId="0";//视频id
    this.messageItem.FileFileId="0";//附件id
    this.messageItem.externalLink="";
    this.messageItem.isExternalLink=false;
    this.messageItem.textMessageContent= { EN: "" ,CN: "" };
    this.messageItem.tptitleCN="";
    this.messageItem.tptitleEN="";
    this.messageItem.yptitleCN="";
    this.messageItem.yptitleEN="";
    this.messageItem.sptitleCN="";
    this.messageItem.sptitleEN="";
    this.messageItem.fjtitleCN="";
    this.messageItem.fjtitleEN="";
    this.imagemessage.items.push(this.messageItem);

    }


}
