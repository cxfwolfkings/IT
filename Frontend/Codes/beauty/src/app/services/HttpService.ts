import { BaseService } from './BaseService';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd';

declare var $: any;

/**
 * 进一步封装HttpClient，主要解决：
 * 后台apb框架返回数据的解析
 */
export abstract class HttpService extends BaseService {

  constructor(protected http: HttpClient, private message: NzMessageService) {
    super(http);
  }

  abpGet<T>(url: string, params?: any): Observable<any> {
    this.encodeParams(params);
    return this.get(url, params).map(r => {
      return this.process<T>(r);
    });
  }

  abpPost<T>(url: string, body?: any, params?: any, headers?: any): Observable<any> {
    return this.post(url, body, params, headers).map(r => {
      return this.process<T>(r);
    });
  }

  /**
   * 由各个子模块处理回传数据
   * @param url
   * @param body
   * @param params
   * @param headers
   */
  abpPost2<T>(url: string, body?: any, params?: any, headers?: any): Observable<any> {
    return this.post(url, body, params, headers).map((r: T) => {
      return r;
    });
  }

  /**
   * 参数超长，用post获取数据
   * @param url
   * @param body
   * @param params
   * @param headers
   */
  abpGet2<T>(url: string, body?: any, params?: any, headers?: any): Observable<any> {
    body = JSON.parse(JSON.stringify(body)); // 克隆对象
    this.encodeParams(body);
    return this.post(url, $.param(body), params, headers).map((r: T) => {
      return this.process<T>(r);
    });
  }

  private process<T>(r: any): any {
    const data = r as Result;
    if (data.success) {
      return data.result as T;
    } else {
      if (data['code'] === '401') {
        location.href = '#/error';
      } else {
        this.message.error(data.error);
      }
      throw data.error;
    }
  }

  /**
   * encode传递的参数
   * @param inParameters
   */
  private encodeParams(inParameters: any): void {
    if (inParameters) {
      for (const key in inParameters) {
        if (inParameters[key] && typeof inParameters[key] === 'string') {
          inParameters[key] = encodeURIComponent(inParameters[key]);
        }
      }
    }
  }
}

// 后台返回的结构体
export class Result {
  success: boolean;
  error: any;
  result: any;
}
