import { Injectable } from "@angular/core";
import { AbpApiService } from "../core/services/abp-api-service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import {environment} from "../../environments/environment"
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { PagedData } from '../Model/page.model';
import { NzMessageService } from 'ng-zorro-antd';

const companyApiUrl ={
    GetcompanyList :environment.SERVER_URL+"/HCompany/HCompanyList",
    // GetLcompany:environment.SERVER_URL+"/RegionUser/Regionone",
    // addcompany:environment.SERVER_URL+"/RegionUser/AddRegion",
    Deletecompany:environment.SERVER_URL+"/HCompany/Deletecompany",
    HEditcompany:environment.SERVER_URL+"/HCompany/HEditCompany",
  };

@Injectable()
export class companyService extends AbpApiService{

    constructor(protected http:HttpClient,private Nzmessage: NzMessageService){
        super(http,Nzmessage)
    }

    public GetcompanyList(params:object):Observable<PagedData<companyName>>{
        const url=companyApiUrl.GetcompanyList;
        return this.abpGet<PagedData<companyName>>(url,params);
    }

    // public GetcompanyList(body: any): Observable<PagedData<companyName>> {
    //     const url = companyApiUrl.GetcompanyList;
    //     return this.abpPost<PagedData<companyName>>(url, body, null, {
    //         'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', // 不加这句，post提交时参数不会放进消息体，后台就只能通过二进制获取
    //         'Accept': '*/*'
    //     });
    // }

    // public GetLocation(ID:number):Observable<Region>{
    //     const url=companyApiUrl.GetLocation+"?ID=" +ID;
    //     return this.abpGet<Region>(url);
    // }

    // public addLocation(areaName:string, sortId:number,creationById: number){
    //     const url=companyApiUrl.addLocation + "?areaName=" + areaName + "&sortId=" + sortId + "&creationById=" + creationById;
    //     return this.abpGet<PagedData<Region>>(url);
    // }

    public Deletecompany(ID:number):Observable<string>{
        const url=companyApiUrl.Deletecompany+"?ID=" +ID;
        return this.abpGet<string>(url);
    }

    public HEditcompany(body: any): Observable<string> {
        const url = companyApiUrl.HEditcompany;
        return this.abpPost<string>(url, body, null, {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', // 不加这句，post提交时参数不会放进消息体，后台就只能通过二进制获取
            'Accept': '*/*'
        });
    }

}

// export class Region{
//     ID:number;
//     AreaName:string;
//     SortId:number;
//     CreationById:number;
//     CreationTime:Date;
// }

export class companyName{
    Id:number;
    RegionName:string;
    Name:string;
    Address:string;
    Zipcode:string;
    Fax:string;
    Phone:string;
    BaseRegionId:number;
}