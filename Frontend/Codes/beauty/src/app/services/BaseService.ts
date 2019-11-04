import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
// 原生没有monent模块 npm install moment --save
import * as moment from 'moment';
import { environment } from '../../environments/environment';

/**
 * 封装HttpClient，主要解决：
 *   1. 优化HttpClient在参数上便利性
 *   2. 统一实现 loading
 *   3. 统一处理时间格式问题
 */
export abstract class BaseService {
  constructor(protected http: HttpClient) { }

  /** 是否正在加载中 */
  private _loading = false;

  get loading(): boolean {
    return this._loading;
  }

  parseParams(params: any): HttpParams {
    let ret = new HttpParams();
    if (params) {
      // tslint:disable-next-line:forin
      for (const key in params) {
        let _data = params[key];
        // 将时间转化为：时间戳 (秒)
        if (moment.isDate(_data)) {
          _data = moment(_data).unix();
        }
        ret = ret.set(key, _data);
      }
    }
    return ret;
  }

  private begin() {
    // console.time('http');
    this._loading = true;
  }

  private end() {
    // console.timeEnd();
    this._loading = false;
  }

  /** 服务端URL地址 */
  get SERVER_URL(): string {
    return environment.SERVER_URL;
  }

  /**
   * GET请求
   *
   * @param {string} url URL地址
   * @param {*} [params] 请求参数
   */
  get(url: string, params?: any): Observable<any> {
    this.begin();
    return this.http
      .get(url, {
        params: this.parseParams(params)
      })
      .do(() => this.end())
      .catch((res) => {
        this.end();
        return res;
      });
  }

  /**
   * POST请求
   *
   * @param {string} url URL地址
   * @param {*} [body] body内容
   * @param {*} [params] 请求参数
   * @param {*} [headers] 请求头
   */
  post(url: string, body?: any, params?: any, headers?: any): Observable<any> {
    this.begin();
    return this.http
      .post(url, body || null, {
        params: this.parseParams(params),
        headers: headers
      })
      .do(() => this.end())
      .catch((res) => {
        this.end();
        return res;
      });
  }
}
