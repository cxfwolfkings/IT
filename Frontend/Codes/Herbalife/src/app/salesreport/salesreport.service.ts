import { Injectable } from "@angular/core";
import { AbpApiService } from "../core/services/abp-api-service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import {environment} from "../../environments/environment"
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { PagedData } from '../Model/page.model';
import { NzMessageService } from 'ng-zorro-antd';
import { debug } from "util";
import { DecimalPipe } from "@angular/common";

const salesreportApiUrl ={
    GetsalesreportList :environment.SERVER_URL+"/HSales/HsalesreportList",
  };

@Injectable()
export class salesreportService extends AbpApiService{

    constructor(protected http:HttpClient,private Nzmessage: NzMessageService){
        super(http,Nzmessage)
    }

    public GetSalesdailyList(params:object):Observable<PagedData<SalesReport>>{
        const url=salesreportApiUrl.GetsalesreportList;
        return this.abpGet<PagedData<SalesReport>>(url,params);
    }
}

export class SalesReport{
    ID:number;
    ReportType:string;
    ReportRegion:string;
    ThisSalesVP:number |2;
    LastSalesVP:string;
    LastYearSalesVP:string;
    ReportDate:Date;
    SalesRate:string;
    LastSalesRate:string;
    SortId:number;
    CreateTime:Date;
    ReportDateStr:string;
}