/**
 * 分组列表组件
 * add by Colin
 */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { GroupModel } from '../../../Model/group.model';
import { GroupService } from '../../../modules/group/group.service';
import { LocalStorage } from '../../../core/local.storage';
import { CommonService } from '../../../core/services/common.service';
import { RuleModel } from '../../../Model/rule.model';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
registerLocaleData(zh);
@Component({
  selector: 'app-group-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class GroupListComponent implements OnInit {
  // 搜索参数
  validateForm: FormGroup;
  // 表格参数
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  loading = true;
  dataSet: GroupModel[] = [];
  // “编辑分组”模态框参数
  groupId = 0;
  isVisible = false;
  isOkLoading = false;
  GroupName = '';
  GroupDetail = '';
  GroupType = '';
  // “规则管理”模态框参数
  ruleIsVisible = false;
  ruleIsOkLoading = false;
  ruleList: RuleModel[] = [];
  // 初始数据
  filedResult = [];
  // 每个规则的数据
  fieldList = [];
  valueList = [];

  GroupTypeError = '';
  GroupNameError = '';

  /**
   * 构造器，依赖注入
   * @param contentService 内容服务
   * @param LSData 本地存储
   * @param fb 表单
   * @param commonService 通用服务
   */
  constructor(private groupService: GroupService, private LSData: LocalStorage, private fb: FormBuilder,
    private commonService: CommonService, private msg: NzMessageService, private modalService: NzModalService) {

  }
  /**
   * 初始化
   */
  ngOnInit() {
    this.validateForm = this.fb.group({});
    this.validateForm.addControl('SearchGroupName', new FormControl());
    this.validateForm.addControl('CreationTimeBegin', new FormControl());
    this.validateForm.addControl('CreationTimeEnd', new FormControl());
    this.getList();
    this.groupService.GetColumnAndVaule().subscribe(p => {
      this.fieldList = p['columns'];
      this.filedResult = p['values'];
    });
  }
  /**
   * 清空
   */
  resetForm(): void {
    this.validateForm.reset();
    this.pageIndex = 1;
    this.getList();
  }
  /**
   * 获取分组列表
   */
  getList() {
    this.loading = true;
    this.groupService.GetGroupList({
      offset: (this.pageIndex - 1) * this.pageSize,
      limit: this.pageSize,
      sort: 'Id',
      order: 'desc',
      groupName: this.validateForm.value.SearchGroupName ? this.validateForm.value.SearchGroupName : '',
      createTimeBegin: this.commonService.DateConvertToString(this.validateForm.value.CreationTimeBegin),
      createTimeEnd: this.commonService.DateConvertToString(this.validateForm.value.CreationTimeEnd)
    }).subscribe(m => {
      this.loading = false;
      this.total = m.totalCount;
      this.dataSet = m.items;
    });
  }
  /**
   * 查询分组
   */
  searchGroup() {
    this.pageIndex = 1;
    this.getList();
  }
  /**
   * 显示模型
   */
  showModal(): void {
    this.isOkLoading = false;
    this.isVisible = true;
  }
  /**
   * 添加组
   */
  addGroup() {
    this.groupId = 0;
    this.GroupName = '';
    this.GroupType = '';
    this.GroupDetail = '';
    this.GroupNameError = '';
    this.GroupTypeError = '';
    this.showModal();
  }
  /**
   * 编辑组
   * @param Id
   * @param GroupName
   * @param GroupType
   * @param GroupDetail
   */
  editGroup(Id: number, GroupName: string, GroupType: string, GroupDetail: string) {
    this.groupId = Id;
    this.GroupName = GroupName;
    this.GroupType = GroupType + '';
    this.GroupDetail = GroupDetail;
    this.GroupNameError = '';
    this.GroupTypeError = '';
    this.showModal();
  }
  /**
   * 确认编辑组
   */
  handleOk(): void {
    let isValid = true;
    if (!this.GroupName) {
      this.GroupNameError = '请输入分组名称！';
      isValid = false;
    } else {
      this.GroupNameError = '';
    }
    if (!this.GroupType) {
      this.GroupTypeError = '请选择分组类型！';
      isValid = false;
    } else {
      this.GroupTypeError = '';
    }
    if (!isValid) {
      return;
    }
    this.isOkLoading = true;
    const group = new GroupModel();
    group.Id = this.groupId;
    group.GroupName = this.GroupName;
    group.GroupType = parseInt(this.GroupType, null);
    group.GroupDetail = this.GroupDetail;
    this.groupService.EditGroup(group).subscribe(r => {
      this.isOkLoading = false;
      if (r.success) {
        this.msg.success(r.result);
        this.isVisible = false;
        this.pageIndex = 1;
        this.getList();
      } else {
        this.msg.error(r.error);
      }
    });
  }
  /**
   * 取消编辑组
   */
  handleCancel(): void {
    this.isVisible = false;
  }
  /**
   * 编辑规则
   * @param Id
   */
  editRules(Id: number) {
    this.groupId = Id;
    this.ruleIsVisible = true;
    this.ruleIsOkLoading = true;
    this.groupService.GetRulesByGroupId({
      groupId: this.groupId
    }).subscribe(m => {
      this.ruleList = m.items;
      this.ruleList.forEach(_ => {
        this.fieldChange(_);
      });
      this.ruleIsOkLoading = false;
    });
  }
  /**
   * 成员管理
   * @param Id
   */
  managerUser(Id: number): void {
    location.href = '#/group/user/' + Id;
  }
  viewUser(Id: number): void {
    location.href = '#/group/user/' + Id + '?read=true';
  }
  /**
   * 取消分组规则修改
   */
  ruleHandleCancel() {
    this.ruleIsVisible = false;
  }
  /**
   * 提交分组规则修改
   */
  ruleHandleOk() {
    this.ruleIsOkLoading = true;
    let msg = '';
    const selectColumns = [];
    this.ruleList.forEach((_, i) => {
      if (!_.Column || !_.Condition || (!_.Value || !_.Value.length)) {
        msg += '第' + (i + 1) + '行的规则不完整，';
      } else {
        if (selectColumns.findIndex(c => c === _.Column) >= 0) {
          msg += '第' + (i + 1) + '行的规则重复，';
        } else {
          selectColumns.push(_.Column);
          _.Value = _.Value && _.Value.length ? _.Value.filter(v => v) : _.Value;
        }
      }
    });
    if (msg) {
      this.msg.error(msg);
      this.ruleIsOkLoading = false;
      return false;
    }
    this.groupService.saveGroupRules({
      groupId: this.groupId,
      optionRules: this.ruleList
    }).subscribe(m => {
      this.ruleIsOkLoading = false;
      if (m.success) {
        this.msg.success(m.result);
        this.ruleIsVisible = false;
        this.pageIndex = 1;
        this.getList();
      } else {
        this.msg.error(m.error);
      }
    });
  }
  /**
   * 添加规则
   */
  addRule(): void {
    let maxSort = 0;
    if (this.ruleList.length) {
      maxSort = this.ruleList[this.ruleList.length - 1].Sort;
    }
    maxSort++;
    this.ruleList = [...this.ruleList, {
      ID: 0,
      Column: '',
      Condition: '',
      Value: [],
      Sort: maxSort
    }];
  }
  /**
   * 删除规则
   * @param i
   */
  deleteRuleRow(i) {
    const ruleList = this.ruleList.filter((d) => d.Sort !== i);
    this.ruleList = ruleList;
  }
  /**
   * 规则切换
   */
  fieldChange(data, isChange?) {
    const i = data.Sort;
    this.valueList[i] = [];
    if (isChange) {
      data.Condition = undefined;
      data.Value = undefined;
    }
    for (const key in this.filedResult[data.Column]) {
      if (true) {
        this.valueList[i].push({
          key: this.filedResult[data.Column][key],
          text: key
        });
      }
    }
  }
  /**
   * 删除组
   * @param Id
   */
  delGroup(Id: number) {
    this.groupService.DelGroup({
      id: Id,
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
    this.groupService.GetGroupUserList({
      offset: 0,
      limit: 100,
      sort: 'Id',
      order: 'desc',
      data: JSON.stringify({
        chrisId: '',
        name: '',
        department: '',
      }),
      filterId: id
    }).subscribe(m => {
      if (m.totalCount === 0) {
        this.modalService.create({
          nzTitle: '确认删除',
          nzContent: '是否确认删除？',
          nzOnOk: () => {
            this.delGroup(id);
          }
        });
      } else {
        this.modalService.create({
          nzTitle: '确认删除',
          nzContent: '当前分组存在成员，是否确认删除？',
          nzOnOk: () => {
            this.delGroup(id);
          }
        });
      }
    });
  }
}
