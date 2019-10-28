import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';

import { environment } from "../../../../environments/environment"
import { MessageService, MessageItem, ImageMessage, SearchContentListModel, PreContentListDto, GetContentListDto } from "../message.service";
import { AddresseeComponent } from '../addressee/addressee.component';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ContentService } from '../../../modules/content/content.service';
import { CategoryModel } from 'src/app/Model/category.model';
import { CommonService } from 'src/app/core/services/common.service';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-image-message',
  templateUrl: './image-message.component.html',
  styleUrls: ['./image-message.component.css']
})
export class ImageMessageComponent implements OnInit {
  //传递参数,获取消息id 
  messageId: number = 0;
  AppID:number=0;
  //传递参数,区分类型
  actionStr: string = "";
  //记录子集个数和区分哪个是哪个,并动态控制切换子集
  SelectIndex: number = 0;

  //记录创建图文个数,最多8个图文
  newnumber:number=0;

  selectedLang:string="CN,EN";
  //声明主数据类
  imagemessage = new ImageMessage();
  messageItem = new MessageItem();

  //messageItem:MessageItem[]=[];
  @ViewChild(AddresseeComponent) child: AddresseeComponent;
  //{{imagemessage.Items.length==1}}
  validateForm: FormGroup;

  //uploadUrl = environment.SERVER_URL + "/File/HMultiMediaUploadFile?isMaterialSave=false&fileType=3";
  uploadUrl = environment.SERVER_URL + "/File/UploadContent";
  loading = false;
  firstTitle: string = "";
  radioValue: boolean = false;
  avatarUrl: string;
  UploadFileName: string;

    //控制按钮是否可用
    isCheckedButton = true;

  isVisible = false;
  pageIndex = 0;
  pageSize = 10;
  total = 1;
  dataSet = [];
  sortValue = null;
  sortKey = null;
  Typename = "";
  ishidden = true;
  isCollapse = true;

  isDisabled = false;

  allvalidate=true;

  searchbtn_name = "高级检索";
  PreviewTitle = "预览英文效果";
  previewLanguage = "CN";
  
  categoryList: CategoryModel[];

  titleCNWords="0/40";
  titleENWords="0/40";
  summaryCNWords="0/160";
  summaryENWords="0/160";
  mainexternalLinkWords="0/200";
  // CtitleCNWords="0/40";
  // CtitleENWords="0/40"
  // CexternalLinkWords="0/200";


  /*----弹出层变量-------*/
  selectContentId="";
  selectContentTitle="";
  /*----弹出层变量-------*/

  searchListModel = new SearchContentListModel();
  preContentList: PreContentListDto[] = [];


  listOfcontentStatus = [
    {ID:1,name:"未发布"},
    {ID:2,name:"已发布"}
  ];

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
    //return isJPG && isLt2M;
    return (isJPG || isPNG) && isLt2M;
  }

  fdelete = (file: UploadFile) => {
    return !this.isDisabled;
  }


  
  // fdelete=(file: UploadFile) => {
   
  //   // debugger
  //   // if(this.actionStr=="view")
  //   // {
  //   //   return false;
  //   // }
  //   // else{
  //   //   return true;
  //   // }
  //   this.imagemessage.items[this.SelectIndex].fileList[0].uid = "";
  //   this.imagemessage.items[this.SelectIndex].fileList[0].name = "";
  //   this.imagemessage.items[this.SelectIndex].fileList[0].status = "";
  //   this.imagemessage.items[this.SelectIndex].fileList[0].url = "";
  //   return false;
  // };
  handleChange(info: { file: UploadFile }): void {
    
    if (info.file.status === 'uploading') {
      this.loading = true;
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, (img: string) => {

        
        this.loading = false;
        this.avatarUrl = img;
        this.UploadFileName = info.file.name;
        //this.imagemessage.items=[];        
        this.messageItem.img = { id: "", url: "" };

        //这里需要后期需要做修改
        //this.messageItem.contentId = "1";
        //上传后给img.id赋值
        this.messageItem.img.id = info.file.response;
        //this.messageItem.img.url=img;
        //debugger
        //this.messageItem.fileList = [{ uid: "", name: "", status: "", url: "" }];
        //this.messageItem.fileList[0].uid = info.file.response;
        //this.messageItem.fileList[0].name = info.file.name;
        //this.messageItem.fileList[0].status = "done";
        //this.messageItem.fileList[0].url = img;
        
        
        console.log(this.imagemessage);
        this.imagemessage.items[this.SelectIndex].fileList = [{ uid: "", name: "", status: "", url: "" }];
        this.imagemessage.items[this.SelectIndex].fileList[0].uid = info.file.response;
        this.imagemessage.items[this.SelectIndex].fileList[0].name = info.file.name;
        this.imagemessage.items[this.SelectIndex].fileList[0].status = "done";
        this.imagemessage.items[this.SelectIndex].fileList[0].url =environment.SERVER_URL+"/File/download?id="+info.file.response;// img;


        //this.imagemessage.items[this.SelectIndex].fileList

        //上传完整之后将id添加到类中
        //this.imagemessage.Items=[];
        //this.messageItem.img.id=info.file.response;
        //this.imagemessage.items.push(this.messageItem);    
        //debugger
        console.log(this.imagemessage);
      });
    }
    if (info.file.status === 'removed') {
      //this.messageService.RemoveFile(info.file.response);
     
      
      //点删除后清空值
      this.imagemessage.items[this.SelectIndex].img.id="";

      this.imagemessage.items[this.SelectIndex].fileList=null;
      // this.imagemessage.items[this.SelectIndex].fileList[0].uid = "";
      // this.imagemessage.items[this.SelectIndex].fileList[0].name = "";
      // this.imagemessage.items[this.SelectIndex].fileList[0].status = "";
      // this.imagemessage.items[this.SelectIndex].fileList[0].url = null;
      console.log(this.imagemessage);
    
    }
  }


  isRemove= (file: UploadFile) => {
    return !this.isDisabled;
  }


  private getBase64(img: File, callback: (img: {}) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  //是否是有一个图文
  isSingleMessage(): boolean {
    if (this.imagemessage.items.length > 1)
      return true;
    else
      return false;
  }

  showPreviewTitle(item): void {
    this.firstTitle = item.titleCN;
  }
  //添加子图文
  appendNewItem(): void {
   
   // this.commonService.changeWords('','#titleENNode' , 40);


    if(this.newnumber>6)
    {
      this.msg.error("一个图文消息支持1到8条图文");
      return;
    }
    
    //当添加子图文时候默认给主图文的摘要添加空值
    //his.imagemessage.summary.CN="";
    //this.imagemessage.summary.EN="";
    //添加子图文清空图片url
    this.avatarUrl = "";
    //alert(this.imagemessage.Items[0].titleCN);
    this.messageItem = new MessageItem();
    this.messageItem.contentId="0";
    this.messageItem.content="";
    this.messageItem.isExternalLink = false;
    this.messageItem.externalLink = "";
    this.messageItem.textMessageContent = { EN: "", CN: "" };
    this.messageItem.title = { CN: "", EN: "" }
    this.messageItem.img = { id: "", url: "" }
    //this.messageItem.fileList = [{ uid: "", name: "", status: "", url: "" }];

    //this.imagemessage.summary={CN:"",EN:""};  

    this.imagemessage.items.push(this.messageItem);
    //debugger
    //添加子集后,增加个数,总是最大数
    this.SelectIndex = this.imagemessage.items.length - 1;
    ++this.newnumber;
    //this.radioValue="false";
    console.log(this.SelectIndex);

    this.titleCNWords=this.commonService.initWords(this.imagemessage.items[this.SelectIndex].title.CN.length, this.titleCNWords);
    this.titleENWords=this.commonService.initWords(this.imagemessage.items[this.SelectIndex].title.EN.length, this.titleENWords);
    this.mainexternalLinkWords=this.commonService.initWords(this.imagemessage.items[this.SelectIndex].externalLink.length, this.mainexternalLinkWords);
    console.log(this.imagemessage);
    //默认给2个图文加选中样式
    for (let index = 0; index <this.imagemessage.items.length; index++) {
      if(index== this.SelectIndex){
        this.imagemessage.items[index].isSelect=true;
      }else{
        this.imagemessage.items[index].isSelect=false;
      }
    } 
    
    
    //当添加了第二个图文后,第一个主图文的中英文摘要不需要验证
    
    if(this.imagemessage.items.length>1 )
    {
      this.validateForm.controls["summaryCN"].clearValidators();
      this.validateForm.controls["summaryEN"].clearValidators();
    }

  }

  
  //选择切换右侧子图文
  selectItem(item, i): void {
    this.messageItem = item;
    // console.log(item);
    //存放当前子集序号,从0开始
    this.SelectIndex = i;
    console.log(i);
    console.log(item);
    if(i==0)
    {
      this.radioValue = item.isExternalLink ? true : false;
    }

    this.selectContentTitle=item.content;

    this.titleCNWords=this.commonService.initWords(item.title.CN.length, this.titleCNWords);
    this.titleENWords=this.commonService.initWords(item.title.EN.length, this.titleENWords);
    this.mainexternalLinkWords=this.commonService.initWords(item.externalLink.length, this.mainexternalLinkWords);
    //this.rightimgurl=item.fileList[i].url;
    for (let index = 0; index <this.imagemessage.items.length; index++) {
      if(index==i){
        this.imagemessage.items[index].isSelect=true;
      }else{
        this.imagemessage.items[index].isSelect=false;
      }
    }  
  }

  //清除选项
  removeItem(item, i): void {

    this.imagemessage.items.splice(i, 1);
    this.selectItem(this.imagemessage.items[0], i);

    --this.newnumber;

    //当删除多个图文,只剩一个主图文后,加上中英文摘要验证
    if(this.imagemessage.items.length<=2 )
    {
      this.validateForm.controls["summaryCN"].setValidators(Validators.required);
      this.validateForm.controls["summaryEN"].setValidators(Validators.required);
    }

  }

  loadType(): void {
    //this.isTypeLoading = true;
    this.contentService.GetCategoryList().subscribe(c => {
      //this.isTypeLoading = false;
      this.categoryList = c;
    });
  }

  //创建跳转文章页面
  CreateContent():void
  {
    this.router.navigate(["/content/0?from=message"]);
  }

  submitForm(type: string, istest: boolean,ApprovalState:number): void {
 
   

    let issub = true;
    for (const i in this.validateForm.controls) {    
      
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();    

      if (this.validateForm.controls[i].invalid) {
        console.log(i)
        issub = false;
      }
    }
    //验证每个子消息是否选择文章或者外部链接
    
     for(const i in this.imagemessage.items)
     {
      
        if(!this.imagemessage.items[i].isExternalLink)
        {
          if(this.imagemessage.items[i].contentId=="0")
            {
              issub=false;
              this.allvalidate=false;
            }  
        }
        else
        {
          if(this.imagemessage.items[i].externalLink=="")
          {
            issub=false;
            this.allvalidate=false;
          }  
        }
        
       
        //验证图片是否上传
        if(this.imagemessage.items[i].img)
        {
          if(this.imagemessage.items[i].img.id==""){
            issub=false;
            this.allvalidate=false;
          }
          else
          this.allvalidate=true;
        }
        
       
     }
    
    // debugger
    //if (!this.allvalidate || !issub || (this.child.selectedUser.length == 0 && this.child.selectedGroup.length == 0) || this.child.selectAgentId == 0) {
      if (!this.allvalidate || !issub ) {
      //alert("输入的消息内容不完整，请修改后发送");
      this.msg.error("输入的消息内容不完整，请修改后发送");
      return;
    }
    else if(this.child.selectedUser.length == 0 && this.child.selectedGroup.length == 0){
      this.msg.error("请选择收件人分组或指定收件人");
    }
    else if( this.child.selectAgentId == 0)
    {
      this.msg.error("请选择应用名称");
        return;
    }
    else {

      this.isCheckedButton=false;
      this.imagemessage.userReceiver = this.child.selectedUser.join(',');
      this.imagemessage.receiver = this.child.selectedGroup.join(',');

      //提交之前去除多余字段,这个字段值用于前台展示,和后台没关系
      // this.imagemessage.items.forEach(i => {
      //   i.fileList = [{ uid: "", name: "", status: "", url: "" }];
      // }
      // )

      //ApprovalState:0保存,ApprovalState:1提交,ApprovalState:2通过,ApprovalState:3拒绝
      let lang: string = "CN";
      let appid: number = this.child.selectAgentId; //3
      this.imagemessage.appId=this.child.selectAgentId;
      let isTest = false;
      let sendAllLang = false;
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

      this.imagemessage.ApprovalState=ApprovalState;
      console.log(this.imagemessage);
      const data: string = JSON.stringify(this.imagemessage)
      console.log(data);

        
      if (type == 'save') {
        this.messageService.SaveMessage(data,lang,appid);
        this.isCheckedButton=true;
      }
      else if (type == 'send') {
        this.messageService.SendMessage(data,isTest,sendAllLang,lang,appid);
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
    debugger
    if(value=="CN,EN")
    {
      this.selectedLang="CN,EN";
      this.previewLanguage="CN";

      this.validateForm.controls["titleCN"].setValidators(Validators.required);
      this.validateForm.controls["titleEN"].setValidators(Validators.required);

      if(this.imagemessage.items.length>=2 )
      {
          this.validateForm.controls["summaryCN"].clearValidators();
          this.validateForm.controls["summaryEN"].clearValidators();
      }
      else
      {
        this.validateForm.controls["summaryCN"].setValidators(Validators.required);
        this.validateForm.controls["summaryEN"].setValidators(Validators.required);
      }
    }
    else if(value=="CN")
    {
      this.selectedLang="CN";
      this.previewLanguage="CN";
      
      this.validateForm.controls["summaryEN"].clearValidators();
      this.validateForm.controls["titleEN"].clearValidators();

    }
    else if(value=="EN")
    {
      this.selectedLang="EN";
      this.previewLanguage="EN";
      this.validateForm.controls["summaryCN"].clearValidators();
      this.validateForm.controls["titleCN"].clearValidators();
    }
    console.log(value);
  }

  /*****/

  constructor(private fb: FormBuilder, private msg: NzMessageService, private messageService: MessageService,
    private activatedRoute: ActivatedRoute,private router:Router,private contentService: ContentService,
    private commonService: CommonService) {

    this.imagemessage.appId = 0;
    this.imagemessage.messageId = -1;
    this.imagemessage.languageCode = "CN,EN";
    this.imagemessage.isSendMail = false;
    this.imagemessage.msgType = "1";
    this.imagemessage.status = "1";
    this.imagemessage.type = "1"; //图文type:1,文本type:2
    this.imagemessage.summary = { CN: "", EN: "" };
    this.imagemessage.sendType = "";
    this.imagemessage.userReceiver = "";
    this.imagemessage.receiver = "";
    this.imagemessage.MessageIdentity = "";

    this.imagemessage.items = [];
    this.messageItem.contentId = "0";
    this.messageItem.content="";
    this.messageItem.externalLink = "";
    this.messageItem.isExternalLink = false;
    this.messageItem.img = { id: "", url: "" };
    this.messageItem.textMessageContent = { EN: "", CN: "" };
    //this.messageItem.fileList=[{uid:"",name:"",status:"",url:""}];
    this.messageItem.title = { CN: "", EN: "" };//多余后期可以去掉


    this.imagemessage.items.push(this.messageItem);

    // this.searchListModel.Id = "";
    // this.searchListModel.cnContentTitle = "";
    // this.searchListModel.enContentTitle = "";
    // this.searchListModel.contentStatus = "";
    // this.searchListModel.contentCategory = "";
    // this.searchListModel.creator = "";
    // this.searchListModel.createDateFrom = "";
    // this.searchListModel.createDateTo = "";

    /*this.messageItem.title={CN:"",EN:""}
    this.imagemessage.summary={CN:"",EN:""};  
    
    this.imagemessage.appId=0;
    //数组需要初始化
    this.imagemessage.items=[];
    this.imagemessage.items.push(this.messageItem);*/
  }

  /*弹出层方法*/
  getContentList(reset: boolean = false) {
    if (reset) {
      this.pageIndex = 0;
    }
    if (reset) this.preContentList = [];
    const param = new GetContentListDto();
    param.offset = this.pageIndex == 0 ? 0 : (this.pageIndex - 1) * 10;
    param.limit = this.pageSize;
    param.order = "desc";
    param.sort = "CreationTime";
    param.lang = "CN";
    param.appId = 3;
    //创建图文选择已发布的文章
    this.searchListModel.contentStatus=[2];
    param.data = JSON.stringify(this.searchListModel).replace('/','\/');;
    //console.log(param);     
    this.messageService.GetContentList(param).do(() => {
      this.loading = true;
    }).subscribe(m => {
      this.loading = false;
      this.total = m.totalCount;
      this.dataSet = m.items;
    });
  }
  resetForm(): void {
    this.validateForm.controls["Id"].reset();
    this.validateForm.controls["cnContentTitle"].reset();
    this.validateForm.controls["contentCategory"].reset();
    this.validateForm.controls["createDateFrom"].reset();
    this.validateForm.controls["createDateTo"].reset();
    this.validateForm.controls["creator"].reset();
    this.pageIndex = 1;
    this.getContentList();
  }
  selectContentID(id,ContentTitle) {
    this.selectContentId=id;
    this.selectContentTitle=ContentTitle;  
    //this.imagemessage.items[this.SelectIndex].contentId = id;
    //this.imagemessage.items[this.SelectIndex].content=ContentTitle;
    console.log(this.imagemessage)
    //this.selectContentTitle=ContentTitle;
  }
  chooseApp(appid, name, index): void {
    // 
  }

  showModal(): void {
    this.isVisible = true;
    this.resetForm();
    this.ishidden = true;
    this.isCollapse = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');

    this.imagemessage.items[this.SelectIndex].contentId = this.selectContentId;
    this.imagemessage.items[this.SelectIndex].content=this.selectContentTitle;
    this.isVisible = false;
  
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  deleteContent(): void{
    this.imagemessage.items[this.SelectIndex].contentId ="0";
    this.imagemessage.items[this.SelectIndex].content="";
  }

  toggleCollapse(): void {
    if (this.ishidden) {
      this.ishidden = false;
      this.isCollapse = false;
      this.searchbtn_name = "快速检索";
    }
    else {
      this.ishidden = true;
      this.isCollapse = true;
      this.searchbtn_name = "高级检索";
    }
  }

    //切换中英文预览效果
  togglePreviewLanguage():void{
      if (this.previewLanguage == "CN") {
        this.previewLanguage = "EN";
        this.PreviewTitle = "预览中文效果";
      }
      else {
        this.previewLanguage = "CN";
        this.PreviewTitle = "预览英文效果";
      }
    }

  /*弹出层方法__End*/

  //返回列表
  returnBack():void {
    history.go(-1);
    //this.router.navigate(['message/createmessagelist']);
  }
  ngOnInit() {
    this.getContentList();
    this.loadType();

    this.activatedRoute.params.subscribe((params: Params) => {
      this.messageId = params['messageId'];
      this.actionStr = params['actionStr'];
      this.child.actionStr = params['actionStr'];
      this.AppID=params['AppID'];
    });

    if (this.actionStr == "view") {
      this.isDisabled = true;
    }

    if (this.messageId > 0) {
      let a = this;
      this.messageService.GetMessage(this.messageId, this.AppID).subscribe(r => {
        //console.log(r.items);      
       
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

        this.child.selectAgentId=r.items["appId"];
        this.child.selectAgentName= r.items["appName"];

        // this.child.selectedUser = r.items["userReceiver"].map(function (data) {
        //   return +data;
        // })
        // this.child.selectedGroup = r.items["receiver"].map(function (data) {
        //   return +data;
        // })
        
        if(r.items["languageCode"]=="EN")
        {
          this.selectedLang="EN";
          this.previewLanguage="EN";
          //如果是英文,清楚对英文的检查
          this.validateForm.controls["summaryCN"].clearValidators();
          this.validateForm.controls["titleCN"].clearValidators();
        }
        else if(r.items["languageCode"]=="CN")
        {

          this.selectedLang="CN";
          this.previewLanguage="CN";
          //如果是英文,清除对英文的检查
          this.validateForm.controls["summaryEN"].clearValidators();
          this.validateForm.controls["titleEN"].clearValidators();
        }
        else if(r.items["languageCode"]=="CN,EN")
        {

          this.selectedLang="CN,EN";
          this.previewLanguage="CN";
        }

        Object.assign(this.imagemessage, r.items)

        //暂时通过这个控制同步
        setTimeout(function(){  }, 500);
      
        this.messageItem = r.items['items'][0];
        
        for (let index = 0; index <this.imagemessage.items.length; index++) {

          // this.imagemessage.items[index]= r.items['items'][index];
          this.imagemessage.items[index].content=r.items["items"][index]["content"]["CN"]["title"];
          this.imagemessage.items[index].fileList=[{ uid: "", name: "", status: "", url: "" }];
          this.imagemessage.items[index].fileList[0].url=environment.SERVER_URL+r.items["items"][index]["img"]["url"];
          
        }

        
        
        if(this.imagemessage.items.length>1 )
        {
          this.validateForm.controls["summaryCN"].clearValidators();
          this.validateForm.controls["summaryEN"].clearValidators();
        }
        
        
        //this.messageItem.content=r.items["items"][0]["content"]["CN"]["title"];
        //this.messageItem.fileList=[{ uid: "", name: "", status: "", url: "" }];
        //this.messageItem.fileList[0].url=environment.SERVER_URL+r.items["items"][0]["img"]["url"];


        // this.titleCNWords="0/40";
        // this.titleENWords="0/40";
        // this.summaryCNWords="0/160";
        // this.summaryENWords="0/160";
        // this.mainexternalLinkWords="0/200";
        // this.CtitleCNWords="0/40";
        // this.CtitleENWords="0/40"
        // this.CexternalLinkWords="0/200";
        //fileList
      })
    }

    


    this.validateForm = this.fb.group({
      titleCN: [{ value: null, disabled: this.isDisabled }, [Validators.required ]],
      titleEN: [{ value: null, disabled: this.isDisabled }, [Validators.required]],
      summaryCN: [{ value: null, disabled: this.isDisabled }, [Validators.required ]],
      summaryEN: [{ value: null, disabled: this.isDisabled }, [Validators.required ]],
      //externalLink: [{ value: null, disabled: this.isDisabled }, [Validators.required]],
      externalLink: [{ value: null, disabled: this.isDisabled }],
      //radioValue  : [ null, [ Validators.required ] ],
      isExternalLink: [{ radioValue: false, disabled: this.isDisabled }, [Validators.required]],
      Id: [true],
      cnContentTitle:[true],
      enContentTitle:[true],
      contentStatus:[true],
      contentCategory:[true],
      creator:[true],
      createDateFrom:[true],
      createDateTo:[true],
      ChooseContentIds:[true],
      // cnContentTitle: [{ value: null, disabled: this.isDisabled }, [Validators.required]],
      // enContentTitle: [{ value: null, disabled: this.isDisabled }, [Validators.required]],
      // contentStatus: [{ value: null, disabled: this.isDisabled }, [Validators.required]],
      // contentCategory: [{ value: null, disabled: this.isDisabled }, [Validators.required]],
      // creator: [{ value: null, disabled: this.isDisabled }, [Validators.required]],
      // createDateFrom: [{ value: null, disabled: this.isDisabled }, [Validators.required]],
      // createDateTo: [{ value: null, disabled: this.isDisabled }, [Validators.required]],
      // ChooseContentIds:[{ value: null, disabled: this.isDisabled }, [Validators.required]]
    });

    //置顶
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

}
