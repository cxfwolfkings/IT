import {log, logWarm, logErr} from './log';

/**
 * 默认的头信息
 */
let headers = {};

/**
 * 设置headers头
 */
exports.setHeader = function(name, value) {
  if (!name) return;
  headers[name] = value;
};

exports.getHeader = function(name, value) {
  if (!name) return '';
  return headers[name] || '';
};

/**
 * 请求库
 */
class Request {
  /**
   * 检测返回状态码
   * @param {*} status
   * @param {*} res
   */
  async _checkStatus(status, res, url) {
    if (status !== 200) {
      logWarm('请求失败参数', await res.text(), url, headers);
      throw new Error('网络连接失败，请检查网络');
    }
  }
  /**
   * 检查后端返回的状态码
   * @param {*} status
   */
  _checkAppStatus(json, url) {
    if (json.status != 0) {
      logWarm('返回状态报错', json, url);
      throw new Error(`${json.errorMsg}`);
    }
  }
  /**
   * 内部实现网络请求
   * @param {*} url
   * @param {*} options
   */
  async _request(url, options, type) {
    url =
      url.indexOf('http') == 0
        ? url
        : url.indexOf('/api') == 0
        ? domain + url
        : baseUrl + url;
    let res = await fetch(url, options);
    this._checkStatus(res.status, res, url);
    if (type === 'json') return await this._jsonFactory(res, url, options);
    return await this._jsonFactory(res, url, options);
  }
  /**
   * 处理json数据
   * @param {*} res
   * @param {*} url
   */
  async _jsonFactory(res, url, options) {
    let json;
    let txt = '';
    try {
      txt = await res.text();
    } catch (e) {
      log('未拿到返回字符串', {
        url: url,
        txt: txt,
      });
      throw new Error('数据格式错误');
    }
    try {
      json = JSON.parse(txt);
    } catch (e) {
      logErr('返回数据格式错误', {
        url: url,
        txt: txt,
      });
      throw new Error('数据格式错误');
    }
    this._checkAppStatus(json, url);
    log('请求返回', json, url, options);
    return json.data;
  }
  /**
   * get请求
   * @param {*} url
   */
  async get(url, data) {
    if (data) data = urlEncoded(data);
    if (url.indexOf('?') < 0 && data) url += '?' + data;
    return this._request(
      url,
      {
        method: 'GET',
        headers: headers,
        timeout: 10000,
      },
      'json',
    );
  }
  /**
   * post请求
   * @param {*} url
   * @param {*} data
   */
  async post(url, data) {
    return this._request(
      url,
      {
        method: 'POST',
        headers: Object.assign(headers, {
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
        timeout: 10000,
        body: urlEncoded(data),
      },
      'json',
    );
  }
}

export default new Request();
