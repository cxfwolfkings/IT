import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import {AbpApiService} from '../../core/services/abp-api-service';
import {MenuModel} from './menu.model';
import { NzMessageService } from 'ng-zorro-antd';

@Injectable()
export class MenuService  extends AbpApiService  {

  // private headers=new Headers({'Content-type':'application/json'});
  constructor(protected http: HttpClient, private Nzmessage: NzMessageService) {
    super(http, Nzmessage);
  }
  public getMenuList(): Observable<any> {
    return this.abpGet<any>(this.SERVER_URL + '/Menu/GetPermission');
  }

  public deleteMenu(ID: number): Observable<boolean> {
    return this.abpPost<boolean>(this.SERVER_URL + '/Menu/DeleteMenu', null, { id: ID });
  }

  public deleteFirstMenu(ID: number): Observable<boolean> {
    return this.abpPost<boolean>(this.SERVER_URL + '/Menu/DeleteFirstMenu', null, { id: ID });
  }

  public getMenuById(ID: number): Observable<MenuModel> {
    return this.abpGet<MenuModel>(this.SERVER_URL + '/Menu/GetSingleMenu', { menuId: ID });
  }

  public getFirstMenuById(ID: number): Observable<MenuModel> {
    return this.abpGet<MenuModel>(this.SERVER_URL + '/Menu/GetFirstSingleMenu', { menuId: ID });
  }

  public checkRepeatMenuName(ID: number, Name: string, selectedSourceValue: string): Observable<boolean> {
    return this.abpGet<MenuModel>(this.SERVER_URL + '/Menu/CheckRepeatMenuName', { menuId: ID, menuName: Name, type: selectedSourceValue });
  }

  public checkRepeatFirstMenuName(ID: number, Name: string): Observable<boolean> {
    return this.abpGet<MenuModel>(this.SERVER_URL + '/Menu/CheckRepeatFirstMenuName', { menuId: ID, menuName: Name });
  }


  public addMenu(Menu: MenuModel): Observable<boolean> {
    return this.abpGet2<Boolean>(this.SERVER_URL + '/Menu/HOperation', Menu, null, {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Accept': '*/*'
    });
  }

  public updateMenu(Menu: MenuModel): Observable<boolean> {
    return this.abpGet2<Boolean>(this.SERVER_URL + '/Menu/HOperation', Menu, null, {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Accept': '*/*'
    });
  }
  public updateFirstMenu(Menu: MenuModel): Observable<boolean> {
    return this.abpPost<Boolean>(this.SERVER_URL + '/Menu/OperationFirstMenu', null, Menu);
  }
}


