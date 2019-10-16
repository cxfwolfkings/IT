//var assert = require('assert');
/*
describe('String#split', function(){
    it('should return an array', function(){
        assert(Array.isArray('a,b,c'.split(',')));
    });
    it('should return the same array', function(){
        assert.equal(['a','b','c'].length, 'a,b,c'.split(',').length, 'arrays have equal leangth');
        for(var i=0;i<['a','b','c'].length;i++){
            assert.equal(['a','b','c'][i],'a,b,c'.split(',')[i],i+ 'element is equal');
        }
    });
});
*/
// 一些代码是重复的，所以我们可以将代码抽象成beforeEach 和before 结构的
/*
var expected, current;
before(function(){
   expected = ['a','b','c']; 
});
describe('String#split',function(){
    beforeEach(function(){
        current = 'a,b,c'.split(','); 
    });
    it('should return an array', function(){
        assert(Array.isArray(current));
    });
    it('should return the same array', function(){
        assert.equal(expected.length, current.length, 'arrays have equal leangth');
        for(var i=0;i<expected.length;i++){
            assert.equal(expected[i],current[i],i+ 'element is equal');
        }
    });
});
*/

// 改写为BDD模式
/**
 * 安装expect.js，语法：
 * ok : 检测是否为真
 * true: 检测对象是否为真
 * to.be 、to: 作为连接两个方法的链式方法
 * not: 链接一个否定的断言，比如expect(false).not.to.be(true)
 * a/an : 检测类型(也适用于数组类型)
 * include/contain: 检测数组或字符串是否包含某个元素
 * below/above: 检测是否大于或小于某个限定值
 */
var expect = require('expect.js');
var expected, current;
before(function(){
   expected = ['a','b','c']; 
});
describe('String#split',function(){
    beforeEach(function(){
        current = 'a,b,c'.split(','); 
    });
    it('should return an array', function(){
        expect(Array.isArray(current)).ok();
    });
    it('should return the same array', function(){
        expect(expected.length).to.equal(current.length);
        for(var i=0;i<expected.length;i++){
            expect(expected[i]).equal(current[i]);
        }
    });
});