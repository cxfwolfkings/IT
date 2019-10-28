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

const InvoiceApiUrl ={
    GetInvoiceList :environment.SERVER_URL+"/HInvoice/InvoiceList",
  };

@Injectable()
export class InvoiceService extends AbpApiService{

    constructor(protected http:HttpClient,private Nzmessage: NzMessageService){
        super(http,Nzmessage)
    }

    public GetInvoiceList(params:object):Observable<PagedData<Invoice>>{
        const url=InvoiceApiUrl.GetInvoiceList;
        return this.abpGet<PagedData<Invoice>>(url,params);
    }
}

export class Invoice{
    ID:number;
    StoreName:string;
    Bank:string;
    Accounts:string;
    QRCode:string;
    Address:string;
    TaxpayerNo:string;
    Telephone:string;
    SortId:number;
    CreationById:number;
    CreationTime:Date;
}