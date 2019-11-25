// 日志存放处
let logs = {};

// 如果日志超过200条就去掉最早的那条日志
function add(log) {
  logs.push(log);
  if (logs.length > 200) {
    logs.shift();
  }
}

// 返回
exports.getLogs = function () {
  return logs;
};

// 获取单个日志内容
exports.getLog = function (index) {
  return logs[index];
};

// 输出信息
exports.log = function (...args) {
  add(args);
  if (__DEV__) {
    let info = args.concat();
    info[0] = '%c' + info[0];
    info.splice(1, 0, 'color: #2d8cf0');
    console.log(...info);
  }
};

// 输出警告
exports.logWarm = function (...args) {

}

// 输出错误
exports.logErr = function (...args) {

}
