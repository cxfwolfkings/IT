import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { LocalStorage } from '../../../core/local.storage';
import { VUserModel } from '../../../Model/user.model';
import { RoleModel } from 'src/app/Model/role.model';
import { NzMessageService } from 'ng-zorro-antd';

registerLocaleData(zh);

@Component({
  selector: 'app-user-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {
  // 搜索参数
  validateForm: FormGroup;
  // 是否高级搜索
  isAdvancedSearch = false;
  // 表格参数
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  loading = true;
  users: VUserModel[] = [];
  // “添加后台用户”模态框参数
  isVisible = false;
  isOkLoading = false;
  txtAD: string;
  txtChrisID: string;
  selectedRoleModal: RoleModel;
  isRoleModalLoading = false;
  isDeptManager: string;
  isDisabled: string;
  // languangeId: string;
  // 角色选择下拉框
  selectedRole: RoleModel;
  roleList: RoleModel[] = [];
  isRoleLoading = false;
  // 当前选中用户Id
  selectUserId: number;
  isReadOnly = false;

  txtADError = '';
  txtChrisIDError = '';
  selectedRoleError = '';

  /**
   * 构造器
   * @param userService
   * @param LSData
   * @param fb
   * @param route
   */
  constructor(private userService: UserService, private LSData: LocalStorage, private fb: FormBuilder,
    private route: ActivatedRoute, private msg: NzMessageService) {

  }
  /**
   * 初始化
   */
  ngOnInit() {
    this.validateForm = this.fb.group({});
    this.validateForm.addControl('SearchAD', new FormControl('', [Validators.maxLength(30)]));
    this.validateForm.addControl('SearchName', new FormControl('', [Validators.maxLength(100)]));
    this.validateForm.addControl('SearchEmail', new FormControl('', [Validators.maxLength(255)]));
    this.validateForm.addControl('searchRole', new FormControl());
    this.validateForm.addControl('SearchDept', new FormControl('', [Validators.maxLength(100)]));
    this.getUserList();
    this.getRoles();
  }
  /**
   * 清空
   */
  resetForm(): void {
    this.validateForm.reset();
    this.pageIndex = 1;
    this.getUserList();
  }
  /**
   * 获取用户列表
   */
  getUserList() {
    let valid = true;
    for (const i in this.validateForm.controls) {
      if (true) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
        if (this.validateForm.controls[i].valid === false) {
          valid = false;
        }
      }
    }
    if (valid) {
      this.loading = true;
      this.userService.GetList({
        offset: (this.pageIndex - 1) * this.pageSize,
        limit: this.pageSize,
        sort: 'Id',
        order: 'desc',
        data: JSON.stringify({
          ad: this.validateForm.value.SearchAD ? this.validateForm.value.SearchAD : '',
          name: this.validateForm.value.SearchName ? this.validateForm.value.SearchName : '',
          roleId: this.selectedRole ? this.selectedRole.ID : 0,
          email: this.validateForm.value.SearchEmail ? this.validateForm.value.SearchEmail : '',
          department: this.validateForm.value.SearchDept ? this.validateForm.value.SearchDept : '',
        })
      }).subscribe(m => {
        this.loading = false;
        this.total = m.totalCount;
        this.users = m.items;
      });
    }
  }
  /**
   * 获取全部角色
   */
  getRoles() {
    this.userService.getAllRole().subscribe(_ => {
      this.roleList = _;
    });
  }
  /**
   * 搜索用户
   */
  searchUsers() {
    this.pageIndex = 1;
    this.getUserList();
  }
  /**
   * 模态框显示
   */
  showModal(Id?, AD?, ChrisID?, RoleId?, isDeptManager?, IsDisabled?, LanguageId?): void {
    this.isOkLoading = false;
    this.selectUserId = 0;
    this.txtAD = undefined;
    this.txtChrisID = undefined;
    this.selectedRoleModal = undefined;
    this.isDeptManager = '0';
    this.isDisabled = '0';
    // this.languangeId = undefined;
    if (Id) {
      this.selectUserId = Id;
    }
    if (AD) {
      this.txtAD = AD;
    }
    if (ChrisID) {
      this.txtChrisID = ChrisID;
    }
    if (RoleId) {
      this.selectedRoleModal = this.roleList.find(_ => _.ID === RoleId);
    }
    if (this.selectUserId) {
      if (isDeptManager) {
        this.isDeptManager = '1';
      } else {
        this.isDeptManager = '0';
      }
    }
    if (this.selectUserId) {
      if (IsDisabled) {
        this.isDisabled = '1';
      } else {
        this.isDisabled = '0';
      }
    }
    if (LanguageId) {
      // this.languangeId = LanguageId + '';
    }
    this.isVisible = true;
  }
  /**
   * 新增用户
   */
  addUser() {
    this.isReadOnly = false;
    this.showModal();
  }
  /**
   * 确认保存用户
   */
  handleOk(): void {
    this.isOkLoading = true;
    let isValid = true;
    if (!this.txtAD) {
      isValid = false;
      this.txtADError = '请输入域帐号！';
    } else {
      this.txtADError = '';
    }
    if (!this.txtChrisID) {
      isValid = false;
      this.txtChrisIDError = '请输入员工号！';
    } else {
      this.txtChrisIDError = '';
    }
    if (!this.selectedRoleModal || !this.selectedRoleModal.ID) {
      isValid = false;
      this.selectedRoleError = '请选择角色！';
    } else {
      this.selectedRoleError = '';
    }
    /*
    if (!this.languangeId) {
      msg += '请选择用户默认语言，';
    }
    */
    if (!isValid) {
      this.isOkLoading = false;
      return;
    }
    this.userService.addBackendUser({
      Id: this.selectUserId,
      ad: this.txtAD,
      chrisId: this.txtChrisID,
      roleId: this.selectedRoleModal.ID,
      isDeptManager: this.isDeptManager,
      isDisabled: this.isDisabled,
      // languange: this.languangeId
    }).subscribe(r => {
      this.isOkLoading = false;
      if (r.success) {
        this.msg.success(r.result);
        this.isVisible = false;
        this.pageIndex = 1;
        this.getUserList();
      } else {
        this.msg.error(r.error);
      }
    });
  }
  /**
   * 取消
   */
  handleCancel(): void {
    this.isVisible = false;
  }
  /**
   * 编辑用户
   * @param id
   */
  editUser(Id, AD, ChrisID, RoleId, isDeptManager, IsDisabled, LanguageId) {
    this.isReadOnly = true;
    this.showModal(Id, AD, ChrisID, RoleId, isDeptManager, IsDisabled, LanguageId);
  }
  /**
   * 删除用户
   * @param userId
   */
  deleteUser(userId) {
    this.userService.DelUser({
      id: userId
    }).subscribe(r => {
      if (r.success) {
        this.msg.success(r.result);
        this.pageIndex = 1;
        this.getUserList();
      } else {
        this.msg.error(r.error);
      }
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
}
