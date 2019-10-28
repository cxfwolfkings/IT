/**
 * 内容服务组件
 * add by Colin
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbpApiService, Result } from '../../core/services/abp-api-service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { ContentModel, ContentItemModel } from '../../Model/content.model';
import { PagedData } from '../../Model/page.model';
import { environment } from '../../../environments/environment';
import { CategoryModel } from '../../Model/category.model';
import { TagModel } from '../../Model/tag.model';
import { CommentViewModel } from 'src/app/Model/comment.model';
import { NzMessageService } from 'ng-zorro-antd';

// 后端webapi路由
const apiUrl = {
  contentlist: environment.SERVER_URL + '/ContentManagement/HGetContents',
  categoryList: environment.SERVER_URL + '/ContentManagement/HGetCategoryList',
  tagList: environment.SERVER_URL + '/ContentManagement/HGetTagList',
  tagListPerPage: environment.SERVER_URL + '/ContentManagement/HGetTagListPerPage',
  deleteTag: environment.SERVER_URL + '/ContentManagement/HDeleteTag',
  editTag: environment.SERVER_URL + '/ContentManagement/HEditTag',
  saveContent: environment.SERVER_URL + '/ContentManagement/HSaveContent',
  content: environment.SERVER_URL + '/ContentManagement/HGetContent',
  commentList: environment.SERVER_URL + '/CommentManagement/HGetComments',
  ReplyAdminComment: environment.SERVER_URL + '/CommentManagement/HReplyAdminComment',
  DeleteComment: environment.SERVER_URL + '/CommentManagement/HDeleteAdminComment',
  CommentApproval: environment.SERVER_URL + '/CommentManagement/HCommentApproval',
  DeleteContent: environment.SERVER_URL + '/ContentManagement/HDeleteContent',
  ExportContent: environment.SERVER_URL + '/ContentManagement/HExportContent',
  editCategory: environment.SERVER_URL + '/ContentManagement/HEditCategory',
};
@Injectable()
export class ContentService extends AbpApiService {
  constructor(protected http: HttpClient, private msg: NzMessageService) {
    super(http, msg);
  }
  /**
   * 获取内容列表
   * @param params
   */
  public GetContentList(params: any): Observable<PagedData<ContentItemModel>> {
    const url = apiUrl.contentlist;
    return this.abpGet2<PagedData<ContentItemModel>>(url, params, null, {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Accept': '*/*'
    });
  }
  /**
   * 根据Id获取内容
   * @param params
   */
  public GetContent(params: object): Observable<ContentModel> {
    const url = apiUrl.content;
    return this.abpGet<PagedData<ContentModel>>(url, params);
  }
  /**
   * 获取内容分类列表
   * @param params
   */
  public GetCategoryList(): Observable<CategoryModel[]> {
    const url = apiUrl.categoryList;
    return this.abpGet<CategoryModel[]>(url);
  }
  /**
   * 保存分类
   * @param body
   */
  public EditCategory(body: any): Observable<Result> {
    const url = apiUrl.editCategory;
    return this.abpPost2<Result>(url, body, null, {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Accept': '*/*'
    });
  }
  /**
   * 获取内容标签列表
   * @param params
   */
  public GetTagList(params: object): Observable<TagModel[]> {
    const url = apiUrl.tagList;
    return this.abpGet<TagModel[]>(url, params);
  }
  /**
   * 获取内容标签列表（分页）
   * @param params
   */
  public GetTagListPerPage(params: object): Observable<PagedData<TagModel>> {
    const url = apiUrl.tagListPerPage;
    return this.abpGet<PagedData<TagModel>>(url, params);
  }
  /**
   * 删除内容标签
   * @param body
   */
  public DeleteTag(body: any): Observable<Result> {
    const url = apiUrl.deleteTag;
    return this.abpPost2<Result>(url, body, null, {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Accept': '*/*'
    });
  }
  /**
   * 编辑内容标签
   * @param body
   */
  public EditTag(body: any): Observable<Result> {
    const url = apiUrl.editTag;
    return this.abpPost2<Result>(url, body, null, {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Accept': '*/*'
    });
  }
  /**
   * 保存内容
   */
  public SaveContent(body: any): Observable<Result> {
    const url = apiUrl.saveContent;
    return this.abpPost2<Result>(url, body, null, {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Accept': '*/*'
    });
  }
  /**
   * 获取评论列表
   * @param body
   */
  public GetCommentList(params: object): Observable<PagedData<CommentViewModel>> {
    const url = apiUrl.commentList;
    return this.abpGet2<PagedData<CommentViewModel>>(url, params, null, {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Accept': '*/*'
    });
  }
  /**
   * 管理员回复评论
   * @param body
   */
  public ReplyAdminComment(body: any): Observable<Result> {
    const url = apiUrl.ReplyAdminComment;
    return this.abpPost2<Result>(url, body, null, {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Accept': '*/*'
    });
  }
  /**
   * 删除评论
   * @param body
   */
  public DeleteComment(body: any): Observable<Result> {
    const url = apiUrl.DeleteComment;
    return this.abpPost2<Result>(url, body, null, {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Accept': '*/*'
    });
  }
  /**
   * 评论移入精选、移出精选
   * @param body
   */
  public CommentApproval(body: any): Observable<Result> {
    const url = apiUrl.CommentApproval;
    return this.abpPost2<Result>(url, body, null, {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Accept': '*/*'
    });
  }
  /**
   * 删除内容
   * @param body
   */
  public DeleteContent(body: any): Observable<Result> {
    const url = apiUrl.DeleteContent;
    return this.abpPost2<Result>(url, body, null, {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Accept': '*/*'
    });
  }
  /**
   * 导出内容
   */
  public ExportContent(params: object): Observable<string> {
    const url = apiUrl.ExportContent;
    return this.abpGet<PagedData<ContentModel>>(url, params);
  }
}
