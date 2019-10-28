import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService, MessageItem, ImageMessage, PreUserDto, GetUserDto } from "../message.service";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import { environment } from "../../../../environments/environment"
import marked from 'marked';
import { AddresseeComponent } from '../addressee/addressee.component';
import { NgModule } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { CommonService } from 'src/app/core/services/common.service';

@Component({
  selector: 'app-text-message',
  templateUrl: './text-message.component.html',
  styleUrls: ['./text-message.component.css']
})
export class TextMessageComponent implements OnInit {
  selectedLang:string="CN,EN";

  //传递参数,获取消息id 
  messageId: number = 0;
  AppID:number=0;
  //传递参数,区分类型
  actionStr: string = "";

  validateForm: FormGroup;
  isVisible = false;
  imagemessage = new ImageMessage();
  messageItem = new MessageItem();
  preUserList: PreUserDto[] = [];
  //引用子集组件
  @ViewChild(AddresseeComponent) child: AddresseeComponent;
  isLoading = false;

  isDisabled = false;

  //控制按钮是否可用
  isCheckedButton = false;

  CNorENTitle = "";
  PreviewTitle = "预览英文效果";

  previewLanguage = "CN";

  titleCnWords = '0/150';
  textMessageContentCN='0/500';
  textMessageContentEN='0/500';

  //切换中英文预览效果
  togglePreviewLanguage() {
    debugger
    if (this.previewLanguage == "CN") {
      this.previewLanguage = "EN";
      this.PreviewTitle = "预览中文效果";
    }
    else {
      this.previewLanguage = "CN";
      this.PreviewTitle = "预览英文效果";
    }
  }

  submitForm(type: string, istest: boolean,ApprovalState:number): void {

    let issub = true;
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();

      if (this.validateForm.controls[i].invalid) {
        issub = false;
      }
    }
    debugger
    if (!issub ) {
      //alert("输入的消息内容不完整，请修改后发送");
      this.msg.error("输入的消息内容不完整，请修改后发送");
      return;
    }
    else if(this.child.selectedUser.length == 0 && this.child.selectedGroup.length == 0)
    {
      this.msg.error("请选择收件人分组或指定收件人");
      return;
    }
    else if(this.child.selectAgentId == 0)
    {
      this.msg.error("请选择应用名称");
      return;
    }
    else {
      //逻辑判断成功后按钮不可用
      this.isCheckedButton=false;
      //ApprovalState:0保存,ApprovalState:1提交,ApprovalState:2通过,ApprovalState:3拒绝
      this.imagemessage.ApprovalState=ApprovalState;
      
      //let isTest = false;
      let sendAllLang = false;
      // if(this.selectedLang=="CN,EN")
      //     sendAllLang=true;
      //   else
      //   sendAllLang=false;
      if(this.selectedLang=="CN,EN")//languageCode
      {
        this.imagemessage.languageCode="CN,EN";
        sendAllLang=true;
      }
      else if(this.selectedLang=="CN")
      {
        this.imagemessage.languageCode="CN";
        sendAllLang=false;
      }
      else if(this.selectedLang=="EN")
      {
        this.imagemessage.languageCode="EN";
        sendAllLang=false;
      }

      this.imagemessage.userReceiver = this.child.selectedUser.join(',');
      this.imagemessage.receiver = this.child.selectedGroup.join(',');
      this.imagemessage.isSendTest = istest;
      this.imagemessage.appId=this.child.selectAgentId;
      const data: string = JSON.stringify(this.imagemessage);     

      let lang: string = "CN";
      let appid: number = this.child.selectAgentId;//3
   
      if (type == 'save') {
        //alert(data);
        this.messageService.SaveMessage(data,lang,appid);
        this.isCheckedButton=true;
      }
      else if (type == 'send') {
        //alert(data);
        this.messageService.SendMessage(data,istest,sendAllLang,lang,appid);
        this.isCheckedButton=true;
      }
      else if(type =='submit')
      {
        this.messageService.SaveMessage(data,lang,appid);
        this.isCheckedButton=true;
      }
      //console.log(data);
      //this.messageService.SaveMessage(data,lang,appid);
      //this.messageService.SendMessage(data,isTest,sendAllLang,lang,appid);
    }
  }


    /**语言选择中英文***/
    isChangeLang(value: string): void {
      
      if(value=="CN,EN")
      {
        this.selectedLang="CN,EN";  
        this.validateForm.controls["textMessageContentEN"].setValidators(Validators.required);
        this.validateForm.controls["textMessageContentCN"].setValidators(Validators.required);
      }
      else if(value=="CN")
      {
        this.selectedLang="CN";
        
        this.validateForm.controls["textMessageContentEN"].clearValidators();
        this.previewLanguage = "CN";
        //this.togglePreviewLanguage();
      }
      else if(value=="EN")
      {
        this.selectedLang="EN";
        this.validateForm.controls["textMessageContentCN"].clearValidators();
        this.previewLanguage = "EN";
        //this.togglePreviewLanguage();
      }
      console.log(value);
    }
  
    /*****/

  constructor(private fb: FormBuilder,
    private http: HttpClient,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private msg: NzMessageService,
    private commonService: CommonService
  ) {
    this.imagemessage.appId = 0;
    this.imagemessage.messageId = -1;
    this.imagemessage.languageCode = "CN,EN";
    this.imagemessage.isSendMail = false;
    this.imagemessage.msgType = "1";
    this.imagemessage.status = "1";
    this.imagemessage.type = "2";
    this.imagemessage.summary = { CN: "", EN: "" };
    this.imagemessage.sendType = "";
    this.imagemessage.userReceiver = "";
    this.imagemessage.receiver = "";
    this.imagemessage.MessageIdentity = "";

    this.imagemessage.items = [];
    this.messageItem.externalLink = "";
    this.messageItem.isExternalLink = false;
    this.messageItem.img = { id: "0", url: "" };
    this.messageItem.textMessageContent = { EN: "", CN: "" };
    this.messageItem.title = { CN: "", EN: "" };//多余后期可以去掉
    this.imagemessage.items.push(this.messageItem);

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

      this.AppID= params['AppID'];
    });

    if (this.actionStr == "view") {
      this.isDisabled = true;
    }

    if (this.messageId > 0) {

      let a = this;
      this.messageService.GetMessage(this.messageId, this.AppID).subscribe(r => {
        
        //加载默认值
        //this.child.defaultUserIds = r.items["userReceiver"].join(','); //"3";//
        //this.child.defaultGroupIds = r.items["receiver"].join(',');

        const intervalId = setInterval(function() {
          
          if (a.child) {
            a.child.selectedGroup = r.items["receiver_int"];//.join(',');
            a.child.selectedUser =r.items["userReceiver_int"];           
            a.child.grouplist =  r.items["groups"];
                        a.child.optionList = r.items["users"];
            clearInterval(intervalId);
          }
        }, 60);


        this.child.selectAgentId=r.items["appId"];
        this.child.selectAgentName= r.items["appName"];

        // this.child.selectedUser = r.items["userReceiver"].map(function (data) {
        //   return +data;
        // })
        // this.child.selectedGroup = r.items["receiver"].map(function (data) {
        //   return +data;
        // })

        
       

        Object.assign(this.imagemessage, r.items);

        setTimeout(function(){  }, 500);
       
        this.messageItem = r.items['items'][0];

        if(r.items["languageCode"]=="EN")
        {
          this.selectedLang="EN";
          this.previewLanguage="EN";
          //如果是英文,清楚对英文的检查
          this.validateForm.controls["textMessageContentCN"].clearValidators();
          //当是英文时候,英文的标题赋值给中文,因为只有一个标题框,设置的title.CN
          debugger
          this.imagemessage.items[0].title.CN=r.items["items"][0].title.EN;
        }

        else if(r.items["languageCode"]=="CN")
        {

          this.selectedLang="CN";
          this.previewLanguage="CN";
          //如果是英文,清除对英文的检查
          this.validateForm.controls["textMessageContentEN"].clearValidators();
          //this.imagemessage.items[0].title.CN=r.items["items"][0].title.CN;
        }
        else if(r.items["languageCode"]=="CN,EN")
        {

          this.selectedLang="CN,EN";
          this.previewLanguage="CN";
          //this.imagemessage.items[0].title.CN=r.items["items"][0].title.CN;
        }


        // if(r.items["languageCode"]=="EN")
        // {
        //   this.imagemessage.items[0].title.CN=r.items["items"][0].title.EN;
        // }

        this.titleCnWords = this.commonService.initWords(this.imagemessage.items[0].title.CN.length, this.titleCnWords);
        this.textMessageContentCN=this.commonService.initWords(this.imagemessage.items[0].textMessageContent.CN.length, this.textMessageContentCN);
        this.textMessageContentEN=this.commonService.initWords(this.imagemessage.items[0].textMessageContent.EN.length, this.textMessageContentEN);

      })


      //赋值到收件人组件,加载信息

    }

    this.validateForm = this.fb.group({
      titleCN: new FormControl({ value: null, disabled: this.isDisabled }, Validators.required),
      textMessageContentCN: new FormControl({ value: null, disabled: this.isDisabled }, Validators.required),
      textMessageContentEN: new FormControl({ value: null, disabled: this.isDisabled }, Validators.required),
      ischeck: new FormControl({ value: null }, Validators.required),
      showtitle: new FormControl({ value: null }, Validators.required),
      //titleCN            : [ null, {disabled:null},[ Validators.required ] ],
      //textMessageContentCN: [ null, [ Validators.required ] ],
      //textMessageContentEN: [ null, [ Validators.required ] ]

    });
    //置顶
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
}
