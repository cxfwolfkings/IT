function f1 () {
  var dfd = $.Deferred();
  setTimeout(function () {
    // f1的任务代码
    dfd.resolve();
  }, 500);
  return dfd.promise;
}
f1().then(f2);
f1().then(f2).then(f3);//指定多个回调函数
f1().then(f2).fail(f3);//指定发生错误时的回调函数
