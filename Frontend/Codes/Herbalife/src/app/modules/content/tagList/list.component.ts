/**
 * 内容列表组件
 * add by Colin
 */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { ContentService } from '../../../modules/content/content.service';
import { LocalStorage } from '../../../core/local.storage';
import { CategoryModel } from 'src/app/Model/category.model';
import { TagModel } from 'src/app/Model/tag.model';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';

registerLocaleData(zh);

@Component({
  selector: 'app-tag-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class TagListComponent implements OnInit {

  // 搜索参数
  searchForm: FormGroup;

  // 表格参数
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  loading = true;
  dataSet: TagModel[] = [];

  // 内容分类下拉框参数
  isCategoryLoading: boolean;
  selectedCategory: number[];
  categoryList: CategoryModel[];

  // 编辑模态框
  isEditModalVisible = false;
  isOkLoading = false;
  txtName: string;
  txtCategory: number;

  // 当前编辑的Tag
  selectedTag: number;

  txtNameError = '';
  txtCategoryError = '';

  /**
   * 构造器，依赖注入
   * @param contentService 内容服务
   * @param LSData 本地存储
   * @param fb 表单
   * @param commonService 通用服务
   */
  constructor(private contentService: ContentService, private LSData: LocalStorage, private fb: FormBuilder
    , private msg: NzMessageService, private modalService: NzModalService) { }
  /**
   * 初始化
   */
  ngOnInit() {
    this.searchForm = this.fb.group({});
    this.searchForm.addControl('SearchName', new FormControl());
    this.searchForm.addControl('selectedCategory', new FormControl());
    this.searchForm.addControl('SearchCreator', new FormControl());
    this.isCategoryLoading = true;
    this.contentService.GetCategoryList().subscribe(c => {
      this.isCategoryLoading = false;
      this.categoryList = c.filter(_ => _.TemplateType !== 3);
    });
    this.getList();
  }
  /**
   * 加载内容列表
   */
  getList() {
    this.loading = true;
    this.contentService.GetTagListPerPage({
      offset: (this.pageIndex - 1) * this.pageSize,
      limit: this.pageSize,
      sort: 'Id',
      order: 'desc',
      data: JSON.stringify({
        name: this.searchForm.value.SearchName ? this.searchForm.value.SearchName : '',
        category: this.selectedCategory,
        creator: this.searchForm.value.SearchCreator ? this.searchForm.value.SearchCreator : '',
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
    this.searchForm.reset();
    this.pageIndex = 1;
    this.getList();
  }
  /**
   * 添加
   */
  add() {
    this.isOkLoading = false;
    this.txtName = undefined;
    this.txtCategory = undefined;
    this.selectedTag = 0;
    this.txtNameError = '';
    this.txtCategoryError = '';
    this.isEditModalVisible = true;
  }
  /**
   * 编辑
   */
  edit(Id: number, name: string, categoryId: number) {
    this.isOkLoading = false;
    this.txtName = name;
    this.txtCategory = categoryId;
    this.selectedTag = Id;
    this.txtNameError = '';
    this.txtCategoryError = '';
    this.isEditModalVisible = true;
  }
  /**
   * 删除
   */
  del(Id: number) {
    this.loading = true;
    this.contentService.DeleteTag({
      id: Id
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
   * 确认编辑
   */
  handleOk() {
    let isValid = true;
    if (!this.txtName) {
      this.txtNameError = '请输入标签名称';
      isValid = false;
    } else {
      this.txtNameError = '';
    }
    if (!this.txtCategory) {
      this.txtCategoryError = '请选择内容分类';
      isValid = false;
    } else {
      this.txtCategoryError = '';
    }
    if (!isValid) {
      return false;
    }
    this.isOkLoading = true;
    this.contentService.EditTag({
      id: this.selectedTag,
      name: this.txtName,
      category: this.txtCategory
    }).subscribe(r => {
      this.isOkLoading = false;
      if (r.success) {
        this.msg.success(r.result);
        this.isEditModalVisible = false;
        this.pageIndex = 1;
        this.getList();
      } else {
        this.msg.error(r.error);
      }
    });
  }
  /**
   * 取消编辑
   */
  handleCancel() {
    this.isEditModalVisible = false;
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
