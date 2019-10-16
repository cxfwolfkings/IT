var superagent = require('superagent');
var expect = require('expect.js');

describe('express rest api server', function () {
    var id;
    // SuperAgent的链式函数使发送HTTP请求变成一件很容易的事
    // 1、创建一个新对象
    it('post object', function (done) {
        superagent.post('http://localhost:3000/collections/test')
            .send({
                name: 'John',
                email: 'john@rpjs.co'
            })
            .end(function (e, res) {
                // console.log(res.body)
                expect(e).to.eql(null);
                expect(res.body.length).to.eql(1);
                expect(res.body[0]._id.length).to.eql(24);
                id = res.body[0]._id;
                // 在测试异步代码中，不要漏掉这里的done() 函数，否则Mocha的测试程序会在收到服务器响应之前结束。
                done();
            });
    });
    
    // 2、通过对象ID检索对象
    it('retrieves an object', function (done) {
        superagent.get('http://localhost:3000/collections/test/' + id)
            .end(function (e, res) {
                // console.log(res.body)
                expect(e).to.eql(null);
                expect(typeof res.body).to.eql('object');
                expect(res.body._id.length).to.eql(24);
                expect(res.body._id).to.eql(id);
                done();
            });
    });
    
    // 3、检索整个集合
    it('retrieves a collection', function (done) {
        superagent.get('http://localhost:3000/collections/test')
            .end(function (e, res) {
                // console.log(res.body)
                expect(e).to.eql(null);
                expect(res.body.length).to.be.above(0);
                expect(res.body.map(function (item) {
                    return item._id;
                })).to.contain(id);
                done();
            });
    });
    
    // 4、通过对象ID更新对象
    it('updates an object', function (done) {
        superagent.put('http://localhost:3000/collections/test/' + id)
            .send({
                name: 'Peter',
                email: 'peter@yahoo.com'
            })
            .end(function (e, res) {
                // console.log(res.body)
                expect(e).to.eql(null);
                expect(typeof res.body).to.eql('object');
                expect(res.body.msg).to.eql('success');
                done();
            });
    });
    
    // 5、通过对象ID检查对象是否更新
    it('checks an updated object', function (done) {
        superagent.get('http://localhost:3000/collections/test/' + id)
            .end(function (e, res) {
                // console.log(res.body)
                expect(e).to.eql(null);
                expect(typeof res.body).to.eql('object');
                expect(res.body._id.length).to.eql(24);
                expect(res.body._id).to.eql(id);
                expect(res.body.name).to.eql('Peter');
                done();
            });
    });

    // 6、通过对象ID删除对象
    it('removes an object', function (done) {
        superagent.del('http://localhost:3000/collections/test/' + id)
            .end(function (e, res) {
                // console.log(res.body)
                expect(e).to.eql(null);
                expect(typeof res.body).to.eql('object');
                expect(res.body.msg).to.eql('success');
                done();
            });
    });
});

/**
 * 现在我们来运行这个测试，在命令行中运行$ mocha test/testDemo1.js 或者 npm test1。
 * 不过得到的结果一定是失败，因为服务器还没有启动。
 * 如果你有多个项目，需要使用多个版本的Mocha，那么你可以把Mocha安装到项目目录的node modules文件夹下，
 * 然后执行: ./node modules/mocha/bin/mocha ./test。
 * 默认情况下，Mocha只返回少量的信息。如果需要得到更详细的结果，可以使用-R <name>参数（即: $ mocha test -R spec 或者$ mocha test -R list）。
 */