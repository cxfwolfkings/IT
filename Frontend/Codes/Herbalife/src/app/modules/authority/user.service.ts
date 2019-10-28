/**
 * 用户管理服务类
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
import { VUserModel } from '../../Model/user.model';
import { RoleModel } from 'src/app/Model/role.model';
import { NzMessageService } from 'ng-zorro-antd';

const apiUrl = {
    list: environment.SERVER_URL + '/Permission/HGetBackendUsers',
    allRole: environment.SERVER_URL + '/Permission/HGetAllRole',
    addBackendUser: environment.SERVER_URL + '/Permission/HAddBackendUser',
    delBackendUser: environment.SERVER_URL + '/Permission/HDelBackendUser'
};

@Injectable()
export class UserService extends AbpApiService {

    constructor(protected http: HttpClient, private msg: NzMessageService) {
        super(http, msg);
    }
    /**
     * 获取用户列表
     * @param params
     */
    public GetList(params: object): Observable<PagedData<VUserModel>> {
        const url = apiUrl.list;
        return this.abpGet<PagedData<VUserModel>>(url, params);
    }
    /**
     * 获取全部角色
     * @param params
     */
    public getAllRole(): Observable<RoleModel[]> {
        const url = apiUrl.allRole;
        return this.abpGet<RoleModel[]>(url, null);
    }
    /**
     * 添加后台用户
     * @param body
     */
    public addBackendUser(body: any): Observable<Result> {
        const url = apiUrl.addBackendUser;
        return this.abpPost2<Result>(url, body, null, {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', // 不加这句，post提交时参数不会放进消息体，后台就只能通过二进制获取
            'Accept': '*/*'
        });
    }
    /**
     * 删除后台用户
     * @param body
     */
    public DelUser(body: any): Observable<Result> {
        const url = apiUrl.delBackendUser;
        return this.abpPost2<Result>(url, body, null, {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', // 不加这句，post提交时参数不会放进消息体，后台就只能通过二进制获取
            'Accept': '*/*'
        });
    }
}
