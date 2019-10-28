import { NzInputGroupComponent } from 'ng-zorro-antd';

/**
 * 通用服务组件
 * add by Colin
 */
export class CommonService {

  constructor() { }

  /**
   * 将日期转换为指定的格式：比如转换成"年月日时分秒"这种格式：yyyy-MM-dd hh:mm:ss 或者 yyyy-MM-dd
   * @param curDate
   * @param fmt
   */
  DateConvertToString (curDate: Date, fmt?: string) {
    if (!curDate) {
      return '';
    }
    const o = {
      'M+' : curDate.getMonth() + 1,                 // 月份
      'd+' : curDate.getDate(),                      // 日
      'h+' : curDate.getHours(),                     // 小时
      'm+' : curDate.getMinutes(),                   // 分
      's+' : curDate.getSeconds(),                   // 秒
      'q+' : Math.floor((curDate.getMonth() + 3) / 3),   // 季度
      'S'  : curDate.getMilliseconds()               // 毫秒
    };
    if (!fmt) {
      fmt = 'yyyy-MM-dd';
    }
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (curDate.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
   for (const k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
      }
   }
   return fmt;
  }
  /**
   * 改变显示字长
   * @param txt
   * @param wordNode
   */
  changeWords(txt, wordNode: NzInputGroupComponent, maxLength) {
    
    if (txt && txt.length) {
      wordNode.nzAddOnAfter = txt.length + '/' + maxLength;
    } else {
      wordNode.nzAddOnAfter = '0/' + maxLength;
    }
  }
  /**
   * 初始化字长显示
   * @param len
   * @param txt
   */
  initWords (len: number, txt: string) {
    len = len ? len : 0;
    return len + '/' + txt.split('/')[1];
  }
}
