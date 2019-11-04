import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { HttpService } from '../../services/HttpService';
import { environment } from '../../../environments/environment';
import { NzMessageService } from 'ng-zorro-antd';

const blogApiUrl = {
  getNoteList: environment.SERVER_URL + "/UserMangement/GetMessageRecipentAppUsersDynamic",
  getNote: environment.SERVER_URL + "/home/GetJsonById",
  like: environment.SERVER_URL + "/home/GetJson"
};
// 要使该服务可以依赖注入，需要加上下面这个标签，并且在模块中声明
@Injectable()
export class BlogService extends HttpService {

  constructor(protected http: HttpClient, private Nzmessage: NzMessageService) {
    super(http, Nzmessage);
  }

  public GetNoteList(params: GetNoteDto): Observable<PagedData<PreNoteDto>> {
    const url = blogApiUrl.getNoteList;
    return this.abpGet<PagedData<PreNoteDto>>(url, params);
  }

  public GetNote(id: number): Observable<PreNoteDto> {
    const url = blogApiUrl.getNote + '?Id=' + id;
    return this.abpGet<PreNoteDto>(url);
  }

  public Like(id: number): void {
    const url = blogApiUrl.getNoteList;
    this.abpPost(url, null, { id: id });
  }
}
export class GetNoteDto {
  SkipCount = 0;
  MaxResultCount = 10;
  key = '';
}
export class PreNoteDto {
  Id: number;
  title: string;
  content: string;
}

export class User {
  userName: string;
  pass: string;
}
/*export class PreNoteDto{
  id:number;
  title:string;
  creationTime:string;
  like:number;
  collect:number;
  scan:number;
  isPublic:boolean;
  content:string;
}*/
// 分页数据类
export class PagedData<T> {
  items: T[];
  totalCount: number;
}


export class Hero {
  id: number;
  name: string;
}
