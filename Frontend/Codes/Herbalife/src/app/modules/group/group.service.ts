/**
 * 分组服务组件
 * add by Colin
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { AbpApiService, Result } from '../../core/services/abp-api-service';
import { GroupModel } from '../../Model/group.model';
import { PagedData } from '../../Model/page.model';
import { environment } from '../../../environments/environment';
import { RuleModel } from '../../Model/rule.model';
import { VUserModel, GroupUserModel } from 'src/app/Model/user.model';
import { NzMessageService } from 'ng-zorro-antd';

// 后端webapi路由
const apiUrl = {
    groupList: environment.SERVER_URL + '/GroupManagement/HList',
    addGroup: environment.SERVER_URL + '/GroupManagement/HEditGroup',
    delGroup: environment.SERVER_URL + '/GroupManagement/HDelGroup',
    getRulesByGroupId: environment.SERVER_URL + '/GroupManagement/HInitDynamicGroupByGroupID',
    getColumnAndValue: environment.SERVER_URL + '/GroupManagement/HGetColumnAndVaule',
    saveGroupRules: environment.SERVER_URL + '/GroupManagement/HSaveDynamicGroupOptionAdvanced',
    groupUserList: environment.SERVER_URL + '/GroupManagement/HGetGroupUsers',
    addGroupStatic: environment.SERVER_URL + '/GroupManagement/HSaveGroupStatic',
    GetUserByCondition: environment.SERVER_URL + '/UserMangement/HGetUser',
    GetUserById: environment.SERVER_URL + '/UserMangement/HGetUserById',
    DelGroupStatic: environment.SERVER_URL + '/GroupManagement/HDeleteGroupStatic'
};

@Injectable()
export class GroupService extends AbpApiService {
    /**
     * 构造器
     * @param http 客户端工具
     */
    constructor(protected http: HttpClient, private msg: NzMessageService) {
        super(http, msg);
    }
    /**
     * 获取分组列表
     * @param params
     */
    public GetGroupList(params: object): Observable<PagedData<GroupModel>> {
        const url = apiUrl.groupList;
        return this.abpGet<PagedData<GroupModel>>(url, params);
    }
    /**
     * 编辑分组
     * @param body
     */
    public EditGroup(body: any): Observable<Result> {
        const url = apiUrl.addGroup;
        return this.abpPost2<Result>(url, body, null, {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', // 不加这句，post提交时参数不会放进消息体，后台就只能通过二进制获取
            'Accept': '*/*'
        });
    }
    /**
     * 删除分组
     * @param body
     */
    public DelGroup(body: any): Observable<Result> {
        const url = apiUrl.delGroup;
        return this.abpPost2<Result>(url, body, null, {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', // 不加这句，post提交时参数不会放进消息体，后台就只能通过二进制获取
            'Accept': '*/*'
        });
    }
    /**
     * 根据组ID获取规则
     * @param params
     */
    public GetRulesByGroupId(params: object): Observable<PagedData<RuleModel>> {
        const url = apiUrl.getRulesByGroupId;
        return this.abpGet<PagedData<RuleModel>>(url, params);
    }
    /**
     * 获取初始化规则
     */
    public GetColumnAndVaule(): Observable<Object> {
        const url = apiUrl.getColumnAndValue;
        return this.abpGet<Object>(url);
    }
    /**
     * 保存规则
     * @param body
     */
    public saveGroupRules(body: any): Observable<Result> {
        const url = apiUrl.saveGroupRules;
        return this.abpPost2<Result>(url, body, null, {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', // 不加这句，post提交时参数不会放进消息体，后台就只能通过二进制获取
            'Accept': '*/*'
        });
    }
    /**
     * 获取组用户
     * @param params
     */
    public GetGroupUserList(params: object): Observable<PagedData<GroupUserModel>> {
        const url = apiUrl.groupUserList;
        return this.abpGet<PagedData<GroupUserModel>>(url, params);
    }
    /**
     * 添加静态用户
     * @param body
     */
    public AddGroupUser(body: any): Observable<Result> {
        const url = apiUrl.addGroupStatic;
        return this.abpPost2<Result>(url, body, null, {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', // 不加这句，post提交时参数不会放进消息体，后台就只能通过二进制获取
            'Accept': '*/*'
        });
    }
    /**
     * 根据条件获取用户
     * @param params
     */
    public GetUserByCondition(params: object): Observable<any> {
        const url = apiUrl.GetUserByCondition;
        return this.abpGet<any>(url, params);
    }

    public GetUserById(params: object): Observable<VUserModel> {
        const url = apiUrl.GetUserById;
        return this.abpGet<VUserModel>(url, params);
    }

    public DelGroupStatic(body: any): Observable<Result> {
        const url = apiUrl.DelGroupStatic;
        return this.abpPost2<Result>(url, body, null, {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', // 不加这句，post提交时参数不会放进消息体，后台就只能通过二进制获取
            'Accept': '*/*'
        });
    }
}
