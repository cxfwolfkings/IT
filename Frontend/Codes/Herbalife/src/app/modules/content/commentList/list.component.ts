/**
 * 评论列表组件
 * add by Colin
 */
import { Component, OnInit } from '@angular/core';
import { ContentService } from '../content.service';
import { LocalStorage } from 'src/app/core/local.storage';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { CommonService } from 'src/app/core/services/common.service';
import { CommentViewModel } from 'src/app/Model/comment.model';
import { CategoryModel } from 'src/app/Model/category.model';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-comment-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class CommentListComponent implements OnInit {
  // 搜索参数
  commentForm: FormGroup;
  // 表格参数
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  loading = true;
  dataSet: CommentViewModel[] = [];
  // 内容分类下拉框参数
  isCategoryLoading: boolean;
  selectedCategory: number[];
  categoryList: CategoryModel[];
  // 回复模态框参数
  isReplyModalVisible = false;
  isOkLoading = false;
  adminReplyContent: string;
  // 当前选中评论
  selectCommentId: number;
  // 当前输入字符数
  adminReplyContentWords = '0/200';
  adminReplyContentError = '';
  /**
   * 构造器，依赖注入
   * @param contentService 内容服务
   * @param LSData 本地存储
   * @param fb 表单
   * @param commonService 通用服务
   */
  constructor(private contentService: ContentService, private LSData: LocalStorage, private fb: FormBuilder,
    private commonService: CommonService, private msg: NzMessageService, private modalService: NzModalService) { }
  /**
   * 初始化
   */
  ngOnInit() {
    this.commentForm = this.fb.group({});
    this.commentForm.addControl('commentator', new FormControl());
    this.commentForm.addControl('contentTitle', new FormControl());
    this.commentForm.addControl('CommentTimeBegin', new FormControl());
    this.commentForm.addControl('CommentTimeEnd', new FormControl());
    this.commentForm.addControl('selectedCategory', new FormControl());
    this.isCategoryLoading = true;
    this.contentService.GetCategoryList().subscribe(c => {
      this.isCategoryLoading = false;
      this.categoryList = c;
    });
    this.getList();
    // 置顶
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
  /**
   * 加载内容列表
   */
  getList() {
    this.loading = true;
    this.contentService.GetCommentList({
      offset: (this.pageIndex - 1) * this.pageSize,
      limit: this.pageSize,
      sort: 'UserCommentID',
      order: 'desc',
      data: JSON.stringify({
        commentator: this.commentForm.value.commentator ? this.commentForm.value.commentator : '',
        title: this.commentForm.value.contentTitle ? this.commentForm.value.contentTitle : '',
        createDateFrom: this.commonService.DateConvertToString(this.commentForm.value.CommentTimeBegin),
        createDateTo: this.commonService.DateConvertToString(this.commentForm.value.CommentTimeEnd),
        category: this.selectedCategory
      })
    }).subscribe(p => {
      this.loading = false;
      this.total = p.totalCount;
      this.dataSet = p.items;
    });
  }
  /**
   * 搜索
   */
  search() {
    this.pageIndex = 1;
    this.getList();
  }
  /**
   * 清空
   */
  reset() {
    this.commentForm.reset();
    this.pageIndex = 1;
    this.getList();
  }
  /**
   * 提交回复
   */
  handleOk() {
    if (!this.adminReplyContent) {
      this.adminReplyContentError = '回复内容不能为空！';
      return;
    } else {
      this.adminReplyContentError = '';
    }
    this.isOkLoading = true;
    this.contentService.ReplyAdminComment({
      id: this.selectCommentId,
      content: this.adminReplyContent
    }).subscribe(r => {
      this.isOkLoading = false;
      if (r.success) {
        this.msg.success(r.result);
        this.isReplyModalVisible = false;
        this.pageIndex = 1;
        this.getList();
      } else {
        this.msg.error(r.error);
      }
    });
  }
  /**
   * 返回
   */
  handleCancel() {
    this.isReplyModalVisible = false;
  }
  /**
   * 更改状态（是否精选）
   * @param id 评论Id
   * @param status 状态
   */
  updateState(id: number, status: number) {
    this.contentService.CommentApproval({
      cId: id,
      isApproved: status
    }).subscribe(r => {
      if (r.success) {
        this.msg.success(r.result);
        this.pageIndex = 1;
        this.getList();
      } else {
        this.msg.error(r.error);
      }
    });
  }
  /**
   * 回复
   */
  reply(CommentId: number, isAdminReply: number) {
    if (isAdminReply) { // 管理员已经回复
      return false;
    } else {
      this.adminReplyContent = undefined;
      this.adminReplyContentWords = '0/200';
      this.adminReplyContentError = '';
      this.isOkLoading = false;
      this.isReplyModalVisible = true;
      this.selectCommentId = CommentId;
    }
  }
  /**
   * 删除
   */
  del(CommentId: number) {
    this.contentService.DeleteComment({
      cId: CommentId
    }).subscribe(r => {
      if (r.success) {
        this.msg.success(r.result);
        this.pageIndex = 1;
        this.getList();
      } else {
        this.msg.error(r.error);
      }
    });
  }
  showConfirm(id) {
    this.modalService.create({
      nzTitle: '确认删除',
      nzContent: '是否确认删除？',
      nzOnOk: () => {
        this.del(id);
      }
    });
  }
  changeWords() {
    if (this.adminReplyContent && this.adminReplyContent.length) {
      this.adminReplyContentWords = this.commonService.initWords(this.adminReplyContent.length, this.adminReplyContentWords);
    } else {
      this.adminReplyContentWords = '0/200';
    }
  }
}
