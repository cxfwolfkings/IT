/**
 * 组用户管理
 * add by Colin 2018-10-22
 */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { ActivatedRoute } from '@angular/router';
import { GroupUserModel, VUserModel } from 'src/app/Model/user.model';
import { LocalStorage } from 'src/app/core/local.storage';
import { GroupService } from '../group.service';
import { NzMessageService } from 'ng-zorro-antd';
import { BehaviorSubject } from 'rxjs';

registerLocaleData(zh);

@Component({
  selector: 'app-user-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class UserListComponent implements OnInit {
  // 搜索参数
  validateForm: FormGroup;

  // 表格参数
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  loading = true;
  staticGroupUsers: GroupUserModel[] = [];

  // “添加成员”模态框参数
  isVisible = false;
  isOkLoading = false;
  staticUser = 0;

  // “用户信息”模态框参数
  userIsVisible = false;
  selectUser: VUserModel = new VUserModel();
  userList = [];
  isLoading = false;
  // 当前组Id
  groupId = 0;
  // 是否只读
  isReadonly = false;
  // 获取用户提示信息
  getUserMsg = '';

  constructor(private userService: GroupService, private LSData: LocalStorage, private fb: FormBuilder,
    private route: ActivatedRoute, private msg: NzMessageService) {

  }
  /**
   * 初始化
   */
  ngOnInit() {
    // 获取路由传值
    this.route.params.subscribe((params) => {
      this.groupId = params['id'];
    });
    if (location.href.indexOf('read') > 0) {
      this.isReadonly = true;
    }
    this.validateForm = this.fb.group({});
    this.validateForm.addControl('SearchChrisID', new FormControl());
    this.validateForm.addControl('SearchCName', new FormControl());
    this.validateForm.addControl('SearchDepartment', new FormControl());
    this.getGroupUserList();
  }
  /**
   * 清空
   */
  resetForm(): void {
    this.validateForm.reset();
    this.pageIndex = 1;
    this.getGroupUserList();
  }
  /**
   * 获取组用户
   */
  getGroupUserList() {
    this.loading = true;
    this.userService.GetGroupUserList({
      offset: (this.pageIndex - 1) * this.pageSize,
      limit: this.pageSize,
      sort: 'Id',
      order: 'desc',
      data: JSON.stringify({
        chrisId: this.validateForm.value.SearchChrisID ? this.validateForm.value.SearchChrisID : '',
        name: this.validateForm.value.SearchCName ? this.validateForm.value.SearchCName : '',
        department: this.validateForm.value.SearchDepartment ? this.validateForm.value.SearchDepartment : '',
      }),
      filterId: this.groupId
    }).subscribe(m => {
      this.loading = false;
      this.total = m.totalCount;
      this.staticGroupUsers = m.items;
    });
  }
  /**
   * 查询用户
   */
  searchUsers() {
    this.pageIndex = 1;
    this.getGroupUserList();
  }
  /**
   * 显示模型
   */
  showModal(): void {
    this.staticUser = 0;
    this.isOkLoading = false;
    this.isVisible = true;
  }
  /**
   * 添加静态用户
   */
  addStaticGroupUser() {
    this.showModal();
  }
  /**
   * 确认添加静态用户
   */
  handleOk(): void {
    this.isOkLoading = true;
    if (!this.groupId || !this.staticUser) {
      let msg = this.getUserMsg;
      msg = msg ? msg : '请选择用户';
      this.msg.warning(msg);
      this.isOkLoading = false;
      return;
    }
    this.userService.AddGroupUser({
      appUsers: [this.staticUser],
      groupId: this.groupId
    }).subscribe(r => {
      this.isOkLoading = false;
      if (r.success) {
        this.msg.success(r.result);
        this.isVisible = false;
        this.pageIndex = 1;
        this.getGroupUserList();
      } else {
        this.msg.error(r.error);
      }
    });
  }
  /**
   * 取消添加静态用户
   */
  handleCancel(): void {
    this.isVisible = false;
  }
  /**
   * 获取用户Id
   */
  getUserId(value) {
      this.userService.GetUserByCondition({
        condition: value
      }).subscribe(u => {
        this.isLoading = false;
        if (typeof u === 'string') {
          this.getUserMsg = u;
        } else {
          this.getUserMsg = '';
          this.userList = u;
        }
      });
  }
  onSearch(value: string): void {
    if (value) {
      this.isLoading = true;
      this.getUserId(value);
    } else {
      this.userList = [];
    }
  }
  /**
   * 返回组列表
   */
  backGroup() {
    location.href = '#/group/list';
  }
  /**
   * 查看用户信息
   * @param id
   */
  viewUser(id) {
    this.selectUser = new VUserModel();
    this.userService.GetUserById({
      id: id
    }).subscribe(u => {
      this.selectUser = u;
      this.userIsVisible = true;
    });
  }
  /**
   * 关闭用户信息
   */
  closeUserModal() {
    this.userIsVisible = false;
  }
  /**
   * 删除静态组用户
   * @param userId
   */
  deleteGroupUser(userId) {
    this.userService.DelGroupStatic({
      id: userId,
      groupId: this.groupId
    }).subscribe(r => {
      if (r.success) {
        this.msg.success(r.result);
        this.pageIndex = 1;
        this.getGroupUserList();
      } else {
        this.msg.error(r.error);
      }
    });
  }
}
