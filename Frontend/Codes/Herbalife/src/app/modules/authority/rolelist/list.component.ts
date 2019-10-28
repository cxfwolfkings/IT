import { Component, OnInit } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { LocalStorage } from '../../../core/local.storage';
import { RoleModel } from '../../../Model/role.model';
import { RoleService } from '../role.service';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';

registerLocaleData(zh);

@Component({
  selector: 'app-role-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {

  // 表格参数
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  loading = true;
  roleList: RoleModel[] = [];

  constructor(private roleService: RoleService, private LSData: LocalStorage
    , private msg: NzMessageService, private modalService: NzModalService) {

  }

  ngOnInit() {
    this.getRoleList();
    //置顶
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
  /**
   * 获取角色列表
   */
  getRoleList() {
    this.loading = true;
    this.roleService.GetList({
      offset: (this.pageIndex - 1) * this.pageSize,
      limit: this.pageSize,
      sort: 'ID',
      order: 'desc'
    }).subscribe(m => {
      this.loading = false;
      this.total = m.totalCount;
      this.roleList = m.items;
    });
  }
  /**
   * 添加角色
   */
  addRole() {
    location.href = '#/role/0';
  }
  /**
   * 编辑角色
   * @param id 角色Id
   * @param name 角色名称
   */
  editRole(id, name) {
    location.href = '#/role/' + id + '?RoleName=' + encodeURIComponent(name);
  }
  /**
   * 删除角色
   * @param id 角色Id
   */
  delRole(id) {
    this.roleService.DelRole({
      roleId: id
    }).subscribe(r => {
      if (r.success) {
        this.msg.success(r.result);
        this.getRoleList();
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
        this.delRole(id);
      }
    });
  }
}
