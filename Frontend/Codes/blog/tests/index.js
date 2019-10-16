var boot = require('../app').boot,
  shutdown = require('../app').shutdown,
  port = require('../app').port,
  superagent = require('superagent'), // 一个基于superagent的断言模块
  expect = require('expect.js');

describe('server', function () {
  before(function () {
    boot();
  });
  describe('homepage', function(){
    // 给测试函数加上done 参数，我们的测试用例就需要等HTTP请求返回响应
    it('should respond to GET', function(done){
      superagent.get('http://localhost:' + port)
        .end(function(res){
          expect(res.status).to.equal(200);
          done();
        });
    });
  });
  after(function () {
    shutdown();
  });
});