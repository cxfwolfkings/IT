import { Component, OnInit, ViewChild  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzTreeComponent, NzTreeNode, NzMessageService } from 'ng-zorro-antd';
import { LocalStorage } from '../../../core/local.storage';
import { RoleService } from '../role.service';

@Component({
  selector: 'app-role-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})

export class EditComponent implements OnInit {

  @ViewChild('nzTree') nzTree: NzTreeComponent;
  // form表单，用来验证各个字段
  validateForm: FormGroup;
  // 角色Id
  roleId: number;
  // 权限树全部节点
  nodes: NzTreeNode[];
  // 权限树选中节点
  checkedKeys = [];
  // 角色名称
  RoleName: string;
  // 角色权限
  Permissions: string;
  // 是否需要验证
  valid: boolean;
  // 选中的节点Id
  checkedNodeIds = [];
  isSaving = false;

  constructor(private roleService: RoleService, private LSData: LocalStorage, private fb: FormBuilder,
    private route: ActivatedRoute, private msg: NzMessageService) {

  }
  /**
   * 保存角色
   */
  submitForm(): void {
    this.isSaving = true;
    if (this.valid) {
      let isValid = true;
      for (const i in this.validateForm.controls) {
        if (true) {
          this.validateForm.controls[i].markAsDirty();
          this.validateForm.controls[i].updateValueAndValidity();
          if (this.validateForm.controls[i].valid === false) {
            isValid = false;
          }
        }
      }
      if (isValid) {
        this.roleService.SaveRole({
          roleId: this.roleId,
          roleName: this.validateForm.value.RoleName,
          permissions: this.checkedNodeIds
        }).subscribe(_ => {
          if (_.success) {
            this.msg.success(_.result);
            location.href = '#/role/list';
          } else {
            this.isSaving = false;
            this.msg.error(_.error);
          }
        });
      } else {
        this.isSaving = false;
      }
    }
  }
  /**
   * 将子节点加入
   */
  addCheckNode(item: NzTreeNode, checkedNodeIds: any[]) {
    const base = this;
    if (!item.isLeaf && item.children && item.children.length) {
      item.children.forEach(function(permission) {
        base.addCheckNode(permission, checkedNodeIds);
      });
    } else if (item.isLeaf) {
      checkedNodeIds.push(item.key.substring(item.key.indexOf('_') + 1));
    }
  }
  /**
   * 保存权限
   */
  savePemissions() {
    // 获取选中节点（子节点和父节点不在此列）
    const checkedNodes = this.nzTree.getCheckedNodeList();
    const checkedNodeIds = this.checkedNodeIds = [];
    const base = this;
    checkedNodes.forEach(function(item) {
      base.addCheckNode(item, checkedNodeIds);
    });
    if (this.checkedNodeIds.length) {
      this.Permissions = 'Go';
    } else {
      this.Permissions = '';
    }
    this.valid = true;
  }
  /**
   * 获取角色权限
   */
  getPermissionNodes() {
    this.roleService.GetPermissionNodes({
      roleId: this.roleId
    }).subscribe(_ => {
      const nodes = this.nodes = [];
      _.nodes.forEach(function(item) {
        nodes.push(new NzTreeNode({
          title: item.title,
          key: item.key,
          isLeaf: item.isLeaf,
          disabled: item.disabled,
          children: item.children
        }));
      });
      if (_.checkedKeys && _.checkedKeys.length) {
        this.checkedKeys = _.checkedKeys;
      }
    });
  }
  /**
   * 初始化
   */
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.roleId = params['id'];
      if (+this.roleId) {
        this.route.queryParams.subscribe(p => {
          this.RoleName = p['RoleName'];
        });
      }
      this.getPermissionNodes();
    });
    this.validateForm = this.fb.group({
      RoleName: [null, [Validators.required]],
      Permissions: [null, [Validators.required]]
    });
    //置顶
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
  /**
   * 返回
   */
  backList () {
    this.valid = false;
    location.href = '#/role/list';
  }
}
