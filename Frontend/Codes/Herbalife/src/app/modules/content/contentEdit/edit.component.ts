/**
 * 内容编辑组件
 * add by Colin
 */
import { Component, OnInit, ViewChild } from '@angular/core';
import { ContentService } from '../content.service';
import { LocalStorage } from '../../../core/local.storage';
import { CategoryModel } from '../../../Model/category.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService, UploadFile, NzInputGroupComponent } from 'ng-zorro-antd';
import { environment } from '../../../../environments/environment';
import { ENgxEditorComponent } from 'e-ngx-editor'; // 富文本组件
import { AddresseeComponent } from 'src/app/routes/message/addressee/addressee.component';
import { CommonService } from 'src/app/core/services/common.service';

import { MiddleComponent} from 'src/app/layout/middle/middle.component';


@Component({
  selector: 'app-content-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class ContentEditComponent implements OnInit {
  // 类别选择模态框是否显示
  isVisible = true;
  // 页面是否显示
  isShow = false;
  // 内容分类是否加载中
  isTypeLoading = false;
  // 内容类别
  categoryList: CategoryModel[];
  // 选中类型
  selectedType;
  // 内容标签是否加载中
  isTagLoading = false;
  // 内容标签
  tagList = [];
  // 选中标签
  selectedTag = [];
  // 富文本框内容（中文）
  contentCh: string;
  // 摘要（中文）
  summaryCn: string;
  // 标题（中文）
  titleCn: string;
  // 富文本框内容（英文）
  contentEn: string;
  // 摘要（英文）
  summaryEn: string;
  // 标题（英文）
  titleEn: string;
  // 消息封面
  avatarUrl: string;
  // 内容消息封面上传路径
  uploadPath: string;
  // 内容类型
  contentType: string;
  // 模板
  templateType: number;
  // 内容主键
  contentId: number;
  // 上传加载
  loading = false;
  // 是否直接发送消息
  isSendMsg = false;
  // 是否允许点赞
  isPraise = false;
  // 是否允许评论
  isEnableComment = false;
  // 消息缩略图Id
  messageCoverImageId = 0;
  // 内容缩略图Id
  contentCoverImageId = 0;
  // 用户语言
  language = 1;
  // 页面是否只读
  isReadonly = false;
  isSaving = false;

  // 错误提示
  titleEnError = '';
  titleCnError = '';
  summaryEnError = '';
  summaryCnError = '';
  contentCoverError = '';
  messageCoverError = '';
  contentChError = '';
  contentEnError = '';

  // 初始英文摘要字长描述
  summaryEnWords = '0/160';
  summaryCnWords = '0/160';
  titleEnWords = '0/40';
  titleCnWords = '0/40';

  selectedIndex = 0;
  editorCH: ENgxEditorComponent;
  editorEN: ENgxEditorComponent;

  @ViewChild(AddresseeComponent) address: AddresseeComponent;

  //@ViewChild(MiddleComponent) middle: MiddleComponent;

  /**
   * 构造器，依赖注入
   * @param contentService 内容服务
   * @param LSData 本地存储
   * @param fb 表单
   * @param commonService 通用服务
   */
  constructor(private contentService: ContentService, private commonService: CommonService,
      private route: ActivatedRoute, private router: Router, private msg: NzMessageService,private middle:MiddleComponent) {

  }
  /**
   * 初始化
   */
  ngOnInit() {
    this.language = 2; // this.LSData.getObject('loginUser')[0].language;
    this.uploadPath = environment.SERVER_URL + '/File/UploadContent';
    if (location.href.indexOf('read') > 0) {
      this.isReadonly = true;
    }
    // 获取路由传值
    this.route.params.subscribe((params) => {
      this.contentId = params['id'];
      if (this.contentId > 0) {
        this.isVisible = false;
        this.contentService.GetContent({
          id: this.contentId
        }).subscribe(c => {
          this.contentId = c.contentId;
          this.selectedType = c.contentCategory.CategoryID;
          this.selectedTag = c.tag && c.tag.length ? c.tag.map(_ => _.Id) : [];
          this.contentCh = c.CN.text;
          this.contentEn = c.EN.text;
          this.titleCn = c.CN.title;
          this.titleCnWords = this.commonService.initWords(c.CN.title.length, this.titleCnWords);
          this.titleEn = c.EN.title;
          this.titleEnWords = this.commonService.initWords(c.EN.title.length, this.titleEnWords);
          this.summaryCn = c.CN.summary;
          this.summaryCnWords = this.commonService.initWords(c.CN.summary.length, this.summaryCnWords);
          this.summaryEn = c.EN.summary;
          this.summaryEnWords = this.commonService.initWords(c.EN.summary.length, this.summaryEnWords);
          this.contentType = c.contentCategory.NameCn;
          this.templateType = c.contentCategory.TemplateType;
          this.isSendMsg = c.isSendMessage;
          if (this.isSendMsg) {
            const base = this;
            const intervalId = setInterval(function() {
              if (base.address) {
                base.address.selectedGroup = c.groupIds;
                base.address.selectedUser = c.userIds;
                base.address.grouplist = c.groups;
                base.address.optionList = c.users;
                clearInterval(intervalId);
              }
            }, 60);
          }
          this.isPraise = c.isPraise;
          this.isEnableComment = c.isEnableComment;
          this.messageCoverImageId = c.messageCoverImageId;
          this.contentCoverImageId = c.contentCoverImageId;
          if (c.imageUrl) {
            this.avatarUrl = environment.SERVER_URL + '/upload/image/' + c.imageUrl;
          }
          this.loadTag(this.selectedType);
          this.isShow = true;
        });
      } else {
        this.loadType();
      }
    });
    // 置顶
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
  /**
   * 加载内容类别
   */
  loadType(): void {
    this.isTypeLoading = true;
    this.contentService.GetCategoryList().subscribe(c => {
      this.isTypeLoading = false;
      this.categoryList = c;
    });
  }
  /**
   * 加载内容标签
   */
  loadTag(categoryId: number): void {
    this.isTagLoading = true;
    this.contentService.GetTagList({
      categoryId: categoryId
    }).subscribe(t => {
      this.isTagLoading = false;
      this.tagList = t;
    });
  }
  /**
   * 选择类别确认
   */
  handleOk(): void {
    if (this.selectedType) {
      this.isShow = true;
      this.isVisible = false;
      this.loadTag(this.selectedType);
      this.contentType = this.categoryList.find(_ => _.CategoryID === this.selectedType).NameCn;
      this.templateType = this.categoryList.find(_ => _.CategoryID === this.selectedType).TemplateType;
    } else {
      this.msg.warning('请选择内容类型！');
    }
  }
  /**
   * 选择类别取消
   */
  handleCancel(isReload: any): void {
    /*
    if (isReload) {
      sessionStorage.setItem('reload', 'yes');
    }
    */
    if (location.href.indexOf('message') > 0) {
      location.href = '#/message/image';
      this.middle.Remark="创建图文消息";
    } else {
      location.href = '#/content/list';      
      this.middle.Remark="内容列表";
      // this.router.navigateByUrl('').then(() => {
      //   this.router.navigate(['/content/list']);
      // });
    }
  }
  /**
   * 预览
   */
  watch() {
    if (this.contentId + '' === '0') {
      this.msg.warning(this.language === 2 ? '请保存后再预览' : 'Please save it and then preview');
      return;
    }
    // 打开前台（微信）页面
    const url = environment.FRONTEND_URL + '/Content/preview?contentId=' + this.contentId;
    window.open(url);
  }
  /**
   * 保存
   */
  save(isSend: boolean) {
    this.isSaving = true;
    let loginUser = sessionStorage.getItem('AppAccountInfo');
    loginUser = JSON.parse(loginUser);
    const inParameters = {
      contentId: this.contentId, // 主键
      categoryId: this.selectedType, // 内容类型主键
      tagId: this.selectedTag, // 选中标签
      isPraise: this.isPraise, // 是否允许点赞
      isEnableComment: this.isEnableComment, // 是否允许评论
      isSendMessage: this.isSendMsg,
      status: isSend ? 2 : 1,
      languageCode: '',
      messageCoverImageId: this.messageCoverImageId,
      contentCoverImageId: this.contentCoverImageId,
      groupIds: this.address ? this.address.selectedGroup : [],
      userIds: this.address ? this.address.selectedUser : [],
      creator: '',
      CN: {
        title: this.titleCn ? this.titleCn : '', // 中文标题
        text: this.contentCh ? this.contentCh : '', // 中文内容
        summary: this.summaryCn ? this.summaryCn : '' // 中文摘要
      },
      EN: {
        title: this.titleEn ? this.titleEn : '', // 英文标题
        text: this.contentEn ? this.contentEn : '', // 英文内容
        summary: this.summaryEn ? this.summaryEn : '' // 英文摘要
      }
    };
    if (this.titleCn || this.contentCh || this.summaryCn) {
      inParameters.languageCode += ',cn';
    }
    if (this.titleEn || this.contentEn || this.summaryEn) {
      inParameters.languageCode += ',en';
    }
    if (!inParameters.languageCode) {
      this.msg.warning(this.language === 2 ? '请输入数据！' : 'Please Input Data!');
      this.isSaving = false;
      return;
    }
    let msg = '';
    let hasError = false;
    // if (inParameters.languageCode.indexOf('cn') >= 0) {
      if (!this.titleCn) {
        this.titleCnError = '请填写中文标题！';
        hasError = true;
      } else {
        this.titleCnError = '';
      }
      if (!this.editorCH.getContent()) {
        this.contentChError = '请填写中文内容！';
        hasError = true;
      } else {
        this.contentChError = '';
      }
      if (this.isSendMsg && !this.summaryCn) {
        this.summaryCnError = '请填写中文摘要！';
        hasError = true;
      } else {
        this.summaryCnError = '';
      }
    // }
    // if (inParameters.languageCode.indexOf('en') >= 0) {
      if (!this.titleEn) {
        this.titleEnError = '请填写英文标题！';
        hasError = true;
      } else {
        this.titleEnError = '';
      }
      if (!this.editorEN.getContent()) {
        this.contentEnError = '请填写英文内容！';
        hasError = true;
      } else {
        this.contentEnError = '';
      }
      if (this.isSendMsg && !this.summaryEn) {
        this.summaryEnError = '请填写英文摘要！';
        hasError = true;
      } else {
        this.summaryEnError = '';
      }
    // }
    if (this.isSendMsg && !this.avatarUrl) {
      this.messageCoverError = '请上传消息封面！';
      hasError = true;
    } else {
      this.messageCoverError = '';
    }
    if ([2].includes(this.templateType) && !this.contentCoverImageId) {
      this.contentCoverError = '请上传内容封面！';
      hasError = true;
    } else {
      this.contentCoverError = '';
    }
    if (this.isSendMsg
      && (!this.address
        || ((!this.address.selectedGroup || !this.address.selectedGroup.length)
          && (!this.address.selectedUser || !this.address.selectedUser.length)))) {
      msg += this.language === 2 ? '请选择收件人，' : 'Please select receiver,';
    }
    if (msg) {
      this.msg.warning(msg.substr(0, msg.length - 1));
      this.isSaving = false;
      return;
    }
    if (hasError) {
      this.selectedIndex = 0;
      this.isSaving = false;
      return;
    }
    this.contentService.SaveContent(inParameters).subscribe(_ => { // 没有subscribe，不会发送请求
      if (_.success) {
        this.msg.success(_.result);
        location.href = '#/content/list';
      } else {
        this.isSaving = false;
        this.msg.error(_.error);
      }
    });
  }
  /**
   * 发布
   */
  send() {
    this.save(true);
  }
  /**
   * 上传文件验证
   */
  beforeUpload = (file: File) => {
    /*
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
      this.msg.error('You can only upload JPG file!');
    }
    */
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      this.msg.error('上传图片不能大于2M！');
    }
    return /* isJPG && */ isLt2M;
  }
  /**
   * 将图片转为base64字符串
   * @param img 图片
   * @param callback 回调函数
   */
  private getBase64(img: File, callback: (img: {}) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  /**
   * 上传图片处理
   * @param info 参数
   */
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
      });
    }
    if (info.file.response) {
      if ([2].includes(this.templateType)) { // 产品手册
        this.contentCoverImageId = info.file.response;
      } else {
        this.messageCoverImageId = info.file.response;
      }
    }
  }
  /**
   * 富文本框就绪
   * @param editor 富文本框对象
   */
  editorReady(editor: ENgxEditorComponent, event: any, index: number) {
    if (index === 1) {
      this.editorCH = editor;
    } else {
      this.editorEN = editor;
    }
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `.edui-editor-wordcount,.edui-editor-breadcrumb {
      visibility: hidden;
    }
    .edui-editor-iframeholder {
      width: 100%!important;
      min-height: 600px;
    }
    .edui-editor {
      z-index: 900!important;
    }`;
    document.getElementsByTagName('HEAD').item(0).appendChild(styleElement);
    if (this.isReadonly) {
      editor.setDisabled();
    }
  }
}
