import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import {AbpApiService,Result} from '../../core/services/abp-api-service';
import {CardConfigModel,RegionFmt,CardRecordList,CardRecordDetail,NoCardUser,JsonResult,CardDetail,InitSetCardUser,SetCardUserModel} from './card.model';
import { observableToBeFn } from 'rxjs/testing/TestScheduler';
import { PagedData } from '../../Model/page.model';
import { NzMessageService } from 'ng-zorro-antd';

@Injectable()
export class CardService  extends AbpApiService{
  //private headers=new Headers({'Content-type':'application/json'});
  constructor(protected http: HttpClient,private Nzmessage: NzMessageService) {super(http,Nzmessage); }

  public getCardConfigList(): Observable<CardConfigModel[]>{
    return this.abpGet<CardConfigModel[]>(this.SERVER_URL+"/Card/CardConfig");
  }

  public updateUrlConfig(cardConfigModel: CardConfigModel):Observable<boolean>{
    return this.abpPost<boolean>(this.SERVER_URL+"/Card/UpdateUrlConfig",encodeURIComponent(JSON.stringify(cardConfigModel)),null,{
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Accept': '*/*'
      });
  }

  public addGmPosition(cardConfigModel: CardConfigModel):Observable<boolean>{
    return this.abpPost<boolean>(this.SERVER_URL+"/Card/UpdateGmPosition",encodeURIComponent(JSON.stringify(cardConfigModel)),null,{
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Accept': '*/*'
      });
  }

  public search_frist(ParentId:number):Observable<RegionFmt[]>{
    return this.abpGet<RegionFmt[]>(this.SERVER_URL+"/Card/GetRegionByParentId",{ParentId:ParentId});
  }

  // public getFirstRegionList():Observable<RegionFmt[]>{
  //   return this.abpGet<RegionFmt[]>(this.SERVER_URL+"/Card/GetFirstRegionList");
  // }

  public getRecordDetailById(ID:number):Observable<CardRecordDetail>{
    return this.abpGet<CardRecordDetail>(this.SERVER_URL+"/Card/GetRecordDetailById",{Id:ID});
  }

  /**
   * 获取打卡记录列表
   * @param params
   */
  public GetCardRecordList(params: object): Observable<PagedData<CardRecordList>> {
    return this.abpPost<PagedData<CardRecordList>>(this.SERVER_URL+"/Card/GetPageRecordList", encodeURIComponent(JSON.stringify(params)),null,{
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Accept': '*/*'
      });
  }

  /**
   * 导出打卡记录列表
   * @param params
   */
  public ExportCardRecordList(params: object): Observable<JsonResult> {
    return this.abpPost<JsonResult>(this.SERVER_URL+"/Card/ExportCardRecordList", encodeURIComponent(JSON.stringify(params)),null,{
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Accept': '*/*'
      });
  }

  public GetPagedCards(params: object):Observable<PagedData<CardDetail>>{
    return this.abpGet<PagedData<CardDetail>>(this.SERVER_URL+"/Card/GetPagedCards",params);
  }

  /**
   * 获取未分配用户
   * @param params
   */
  public PageNoCardUserList(params: object): Observable<PagedData<NoCardUser>> {
    return this.abpGet<PagedData<NoCardUser>>(this.SERVER_URL+"/Card/PageNoCardUserList", params);
  }

  /**
   * 获取未分配用户详情
   */
  public GetNoCardUserDetail(ID:number):Observable<NoCardUser>{
    return this.abpGet<NoCardUser>(this.SERVER_URL+"/Card/GetNoCardUserDetail",{Id:ID});
  }

  // public AddCardRegion(params: object):Observable<JsonResult>{
  //   return this.abpPost<JsonResult>(this.SERVER_URL+"/Card/AddCardRegion",null,params);
  // }

  // public DeleteCardRegion(ID: number):Observable<JsonResult>{
  //   return this.abpPost<JsonResult>(this.SERVER_URL+"/Card/DeleteCardRegion",null,{ID:ID});
  // }

  public AddCard(params: object):Observable<JsonResult>{
    return this.abpPost<JsonResult>(this.SERVER_URL+"/Card/AddCard",encodeURIComponent(JSON.stringify(params)),null,{
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Accept': '*/*'
      });
  }

  public DeleteCard(ID: number):Observable<JsonResult>{
    return this.abpPost<JsonResult>(this.SERVER_URL+"/Card/DeleteCard",null,{ID:ID});
  }

  public UpdateCard(params: object):Observable<JsonResult>{
    return this.abpPost<JsonResult>(this.SERVER_URL+"/Card/UpdateCard",encodeURIComponent(JSON.stringify(params)),null,{
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Accept': '*/*'
      });
  }

  /**
   * 获取Card详情
   */
  public GetCardDetail(ID:number):Observable<CardDetail>{
    return this.abpGet<CardDetail>(this.SERVER_URL+"/Card/GetCardDetail",{Id:ID});
  }

  /**
   * 用户设置 初始化
   */
  public InitSetCardUser(ID:number):Observable<InitSetCardUser>{
    return this.abpGet<InitSetCardUser>(this.SERVER_URL+"/Card/InitSetCardUser",{Id:ID});
  }

  public GetRepeatCardUser(params: object):Observable<JsonResult>{
    return this.abpPost<JsonResult>(this.SERVER_URL+"/Card/GetRepeatCardUser",encodeURIComponent(JSON.stringify(params)),null,{
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Accept': '*/*'
      });
  }

  public SetCardUser(params: object):Observable<JsonResult>{
    return this.abpPost<JsonResult>(this.SERVER_URL+"/Card/SetCardUser",encodeURIComponent(JSON.stringify(params)),null,{
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Accept': '*/*'
      });
  }

  public AddUser(params: object): Observable<JsonResult> {
    return this.abpPost<JsonResult>(this.SERVER_URL+"/Card/AddUser", params);
  }
}

  


