/**
 * 内容列表组件
 * add by Colin
 */
import { Component, OnInit } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { ContentService } from '../../../modules/content/content.service';
import { LocalStorage } from '../../../core/local.storage';
import { CategoryModel } from 'src/app/Model/category.model';
import { NzMessageService } from 'ng-zorro-antd';

registerLocaleData(zh);

@Component({
  selector: 'app-category-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class CategoryListComponent implements OnInit {

  // 表格参数
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  loading = true;
  dataSet: CategoryModel[] = [];

  // 编辑模态框
  isEditModalVisible = false;
  isOkLoading = false;
  txtNameCH: string;
  txtNameEN: string;

  // 当前编辑的分类
  categoryID: number;

  txtNameCHError = '';
  txtNameENError = '';

  /**
   * 构造器，依赖注入
   * @param contentService 内容服务
   * @param LSData 本地存储
   * @param fb 表单
   * @param commonService 通用服务
   */
  constructor(private contentService: ContentService, private LSData: LocalStorage
    , private msg: NzMessageService) { }
  /**
   * 初始化
   */
  ngOnInit() {
    this.getList();
  }
  /**
   * 加载内容列表
   */
  getList() {
    this.loading = true;
    this.contentService.GetCategoryList().subscribe(c => {
      this.loading = false;
      this.total = 4; // 固定4个类型
      this.dataSet = c;
    });
  }
  /**
   * 编辑
   */
  edit(categoryID: number, nameCn: string, nameEn: string) {
    this.categoryID = categoryID;
    this.isOkLoading = false;
    this.txtNameCH = nameCn;
    this.txtNameEN = nameEn;
    this.txtNameCHError = '';
    this.txtNameENError = '';
    this.isEditModalVisible = true;
  }
  /**
   * 确认编辑
   */
  handleOk() {
    let isValid = true;
    if (!this.txtNameCH) {
      this.txtNameCHError = '请填写中文名称';
      isValid = false;
    } else {
      this.txtNameCHError = '';
    }
    if (!this.txtNameEN) {
      this.txtNameENError = '请填写英文名称';
      isValid = false;
    } else {
      this.txtNameENError = '';
    }
    if (!isValid) {
      return;
    }
    this.isOkLoading = true;
    this.contentService.EditCategory({
      cId: this.categoryID,
      nameCn: this.txtNameCH,
      nameEn: this.txtNameEN
    }).subscribe(r => {
      this.isOkLoading = false;
      if (r.success) {
        this.isEditModalVisible = false;
        this.msg.success(r.result);
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
}
