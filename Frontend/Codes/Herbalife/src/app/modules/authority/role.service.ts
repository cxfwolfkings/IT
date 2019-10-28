/**
 * 权限服务组件
 * add by Colin
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { AbpApiService, Result } from '../../core/services/abp-api-service';
import { PagedData } from '../../Model/page.model';
import { environment } from '../../../environments/environment';
import { RoleModel } from '../../Model/role.model';
import { TreeModel } from '../../Model/tree.model';
import { NzMessageService } from 'ng-zorro-antd';

const apiUrl = {
    list: environment.SERVER_URL + '/Permission/HGetRoleList',
    save: environment.SERVER_URL + '/Permission/HSavePermissions',
    del: environment.SERVER_URL + '/Permission/HDelRole',
    GetPermissionNodes: environment.SERVER_URL + '/Permission/HGetPermissionsByRoleId'
};

@Injectable()
export class RoleService extends AbpApiService {

    constructor(protected http: HttpClient, private msg: NzMessageService) {
        super(http, msg);
    }
    /**
     * 获取角色列表
     * @param params
     */
    public GetList(params: object): Observable<PagedData<RoleModel>> {
        const url = apiUrl.list;
        return this.abpGet<PagedData<RoleModel>>(url, params);
    }
    /**
     * 保存角色
     * @param body
     */
    public SaveRole(body: any): Observable<Result> {
        const url = apiUrl.save;
        return this.abpPost2<Result>(url, body, null, {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', // 不加这句，post提交时参数不会放进消息体，后台就只能通过二进制获取
            'Accept': '*/*'
        });
    }
    /**
     * 删除角色
     * @param body
     */
    public DelRole(body: any): Observable<Result> {
        const url = apiUrl.del;
        return this.abpPost2<Result>(url, body, null, {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', // 不加这句，post提交时参数不会放进消息体，后台就只能通过二进制获取
            'Accept': '*/*'
        });
    }
    /**
     * 获取角色权限
     * @param params
     */
    public GetPermissionNodes(params: object): Observable<TreeModel> {
        const url = apiUrl.GetPermissionNodes;
        return this.abpGet<TreeModel>(url, params);
    }
}
