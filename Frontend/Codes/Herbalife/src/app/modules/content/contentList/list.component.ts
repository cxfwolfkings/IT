/**
 * 内容列表组件
 * add by Colin
 */
import { Component, OnInit, ViewChild, Inject, forwardRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { ContentItemModel, StatusModel } from '../../../Model/content.model';
import { ContentService } from '../../../modules/content/content.service';
import { LocalStorage } from '../../../core/local.storage';
import { CommonService } from '../../../core/services/common.service';
import { environment } from 'src/environments/environment';
import { CategoryModel } from 'src/app/Model/category.model';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { MiddleComponent } from 'src/app/layout/middle/middle.component';

registerLocaleData(zh);

@Component({
  selector: 'app-content-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ContentListComponent implements OnInit {

  // 搜索参数
  searchForm: FormGroup;
  isAdvancedSearch: boolean;

  // 表格参数
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  loading = true;
  dataSet: ContentItemModel[] = [];

  // 内容分类下拉框参数
  isCategoryLoading: boolean;
  selectedCategory: number[];
  categoryList: CategoryModel[];

  // 内容状态下拉框参数
  isStatusLoading: boolean;
  selectedStatus: number[];
  statusList: StatusModel[] = [];

  isWait = false;

  /**
   * 构造器，依赖注入
   * @param contentService 内容服务
   * @param LSData 本地存储
   * @param fb 表单
   * @param commonService 通用服务
   */
  constructor(private contentService: ContentService, private LSData: LocalStorage, private fb: FormBuilder,
      private commonService: CommonService, private msg: NzMessageService, private modalService: NzModalService) {
    /*
    if (sessionStorage.getItem('reload')) {
      sessionStorage.removeItem('reload');
      location.reload(true);
    }
    */
  }
  /**
   * 初始化
   */
  ngOnInit() {
    this.isAdvancedSearch = false;
    this.searchForm = this.fb.group({});
    this.searchForm.addControl('SearchID', new FormControl());
    this.searchForm.addControl('SearchName', new FormControl());
    this.searchForm.addControl('selectedCategory', new FormControl());
    this.searchForm.addControl('SearchCreationTimeBegin', new FormControl());
    this.searchForm.addControl('SearchCreationTimeEnd', new FormControl());
    this.searchForm.addControl('SearchCreatorName', new FormControl());
    this.searchForm.addControl('SearchStatus', new FormControl());
    // this.searchForm.addControl('SearchTopOrder', new FormControl());
    this.isCategoryLoading = true;
    this.contentService.GetCategoryList().subscribe(c => {
      this.isCategoryLoading = false;
      this.categoryList = c;
    });
    const unSendStatus = new StatusModel();
    unSendStatus.ID = 1;
    unSendStatus.StatusNameCn = '未发布';
    const sendStatus = new StatusModel();
    sendStatus.ID = 2;
    sendStatus.StatusNameCn = '已发布';
    this.statusList.push(unSendStatus);
    this.statusList.push(sendStatus);
    this.getList();
    //置顶
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
  /**
   * 加载内容列表
   */
  getList() {
    this.loading = true;
    this.contentService.GetContentList({
      offset: (this.pageIndex - 1) * this.pageSize,
      limit: this.pageSize,
      sort: 'Id',
      order: 'desc',
      data: JSON.stringify({
        Id: this.searchForm.value.SearchID ? this.searchForm.value.SearchID : '',
        cnContentTitle: this.searchForm.value.SearchName ? this.searchForm.value.SearchName : '',
        contentCategory: this.selectedCategory,
        createDateFrom: this.commonService.DateConvertToString(this.searchForm.value.SearchCreationTimeBegin),
        createDateTo: this.commonService.DateConvertToString(this.searchForm.value.SearchCreationTimeEnd),
        creator: this.searchForm.value.SearchCreatorName ? this.searchForm.value.SearchCreatorName : '',
        contentStatus: this.selectedStatus,
        // TopOrder: this.searchForm.value.SearchTopOrder ? this.searchForm.value.SearchTopOrder : true
      })
    }).subscribe(p => {
      this.loading = false;
      this.total = p.totalCount;
      this.dataSet = p.items;
    });
  }
  /**
   * 高级搜索
   */
  showSearch() {
    if (this.isAdvancedSearch) {
      this.isAdvancedSearch = false;
    } else {
      this.isAdvancedSearch = true;
    }
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
    this.searchForm.reset();
    this.pageIndex = 1;
    this.getList();
  }
  /**
   * 查看
   */
  view(contentId: number) {
    location.href = '#/content/' + contentId + '?read=true';
  }
  /**
   * 编辑
   */
  edit(contentId: number) {
    location.href = '#/content/' + contentId;
  }
  /**
   * 删除
   */
  del(contentId: number) {
    this.loading = true;
    this.contentService.DeleteContent({
      id: contentId
    }).subscribe(r => {
      this.loading = false;
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
   * 导出
   */
  export(contentId: number) {
    this.isWait = true;
    const exportDom: HTMLFormElement = <HTMLFormElement>document.getElementById('exportForm');
    exportDom.action = environment.SERVER_URL + '/ContentManagement/HExportContent?id=' + contentId;
    const contentIdElement: HTMLInputElement = document.createElement('input');
    contentIdElement.type = 'hidden';
    contentIdElement.name = 'id';
    contentIdElement.value = contentId + '';
    exportDom.appendChild(contentIdElement);
    exportDom.submit();
    exportDom.removeChild(contentIdElement);
    setTimeout(_ => {
      this.isWait = false;
    }, 1000);
    /*
    this.contentService.ExportContent({
      id: contentId
    }).subscribe(p => {

    });
    */
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
}
