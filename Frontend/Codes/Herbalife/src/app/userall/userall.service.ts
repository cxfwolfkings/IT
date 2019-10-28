import { Injectable } from "@angular/core";
import { AbpApiService,Result } from "../core/services/abp-api-service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import {environment} from "../../environments/environment"
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { PagedData } from '../Model/page.model';
import { NzMessageService } from 'ng-zorro-antd';

import { List } from "lodash";
const userallApiUrl ={
    GetuserallList :environment.SERVER_URL+"/UserMangement/GetUsersAdmin",
    // GetLcompany:environment.SERVER_URL+"/RegionUser/Regionone",
    // addcompany:environment.SERVER_URL+"/RegionUser/AddRegion",
    HEdituser:environment.SERVER_URL+"/UserMangement/EditUserLanguage",
    
  };

@Injectable()
export class userallService extends AbpApiService{

    constructor(protected http:HttpClient,private Nzmessage: NzMessageService){
        super(http,Nzmessage)
    }
//params:object
    public GetuserList(body: any):Observable<PagedData<userall>>{
        const url=userallApiUrl.GetuserallList;
        // return this.abpGet<PagedData<userall>>(url,params);
        return this.abpPost<PagedData<userall>>(url, body, null, {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', // 不加这句，post提交时参数不会放进消息体，后台就只能通过二进制获取
            'Accept': '*/*'
        });
    }

    public Edituser(ChrisID:string,Language:string):Observable<string>{
        const url=userallApiUrl.HEdituser+"?ChrisID=" +ChrisID +"&language=" +Language;
        return this.abpGet<string>(url);
    }

    // public addLocation(areaName:string, sortId:number,creationById: number){
    //     const url=companyApiUrl.addLocation + "?areaName=" + areaName + "&sortId=" + sortId + "&creationById=" + creationById;
    //     return this.abpGet<PagedData<Region>>(url);
    // }

}

// export class Region{
//     ID:number;
//     AreaName:string;
//     SortId:number;
//     CreationById:number;
//     CreationTime:Date;
// }

export class userall{
    Id:number;
    Language:number;
    EmployeeID:string;
    EmploymentDate:Date;
    EmploymentDateStr:string;
    // EmployeeStatus:string;
    CName:string;
    EName:string;
    Sex:string;
    Birthday:Date;
    BirthdayStr:string;
    Department:string;
    Region:string;
    Position:string;
    MobilePhone:string;
    Email:string;
    LanguageStr:string;
    ChrisID:string;
    City:string;
    Status:number;
    StatusStr:string;
    ParentPerson:string;
    EmployeeYears:string;
    ParentCName:string;
}
