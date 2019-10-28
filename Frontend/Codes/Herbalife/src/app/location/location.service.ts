import { Injectable } from "@angular/core";
import { AbpApiService } from "../core/services/abp-api-service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import {environment} from "../../environments/environment"
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { PagedData } from '../Model/page.model';
import { NzMessageService } from 'ng-zorro-antd';
import { TreeNodeModel } from '../../app/Model/tree.model';
const locationApiUrl ={
    GetLocationList :environment.SERVER_URL+"/BaseRegion/RegionList",
    GetLocation:environment.SERVER_URL+"/BaseRegion/Regionone",
    addLocation:environment.SERVER_URL+"/BaseRegion/AddRegion",
    DeleteLocation:environment.SERVER_URL+"/BaseRegion/DeleteRegion",
    HEditLocation:environment.SERVER_URL+"/BaseRegion/HEditLocation",
    RegionTree:environment.SERVER_URL+"/RegionUser/RegionTreeAll",
  };

@Injectable()
export class LocationService extends AbpApiService{

    constructor(protected http:HttpClient,private Nzmessage: NzMessageService){
        super(http,Nzmessage)
    }

    public GetLocationList(params:object):Observable<PagedData<RegionName>>{
        //debugger
        const url=locationApiUrl.GetLocationList;
        return this.abpGet<PagedData<RegionName>>(url,params);
    }

    public GetLocation(ID:number):Observable<Region>{
        const url=locationApiUrl.GetLocation+"?ID=" +ID;
        return this.abpGet<Region>(url);
    }

    public addLocation(areaName:string, sortId:number,creationById: number){
        const url=locationApiUrl.addLocation + "?areaName=" + areaName + "&sortId=" + sortId + "&creationById=" + creationById;
        return this.abpGet<PagedData<Region>>(url);
    }

    public DeleteLocation(ID:number):Observable<string>{
        const url=locationApiUrl.DeleteLocation+"?ID=" +ID;
        return this.abpGet<string>(url);
    }

    public HEditLocation(body: any): Observable<string> {
        const url = locationApiUrl.HEditLocation;
        return this.abpPost<string>(url, body, null, {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', // 不加这句，post提交时参数不会放进消息体，后台就只能通过二进制获取
            'Accept': '*/*'
        });
    }

    public RegionTreeAll():Observable<TreeNodeModel[]>{
        const url=locationApiUrl.RegionTree;
        return this.abpGet<TreeNodeModel[]>(url);
    }
}

export class Region{
    ID:number;
    AreaName:string;
    SortId:number;
    CreationById:number;
    CreationTime:Date;
}

export class RegionName{
    ID:number;
    AreaName:string;
    SortId:number;
    CreationById:number;
    CreationTime:Date;
    CreationName:string;
}


