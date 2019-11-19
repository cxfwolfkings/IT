var assert = function (value, msg) {
    if (!value)
        throw (msg || (value + " does not equal true"));
};

var assertEqual = function (val1, val2, msg) {
    if (val1 !== val2)
        throw (msg || (val1 + " does not equal " + val2));
};

/*
    默认情况下，如果你的构造函数中没有返回任何内容，就会返回this——当前的上下文。
    要不然就返回任意非原始类型的值。比如，我们可以返回一个用以新建一个新类的函数，
    第一步要做的是创建自己的类模拟库
*/
var Class = function (parent) {
    var klass = function () {
        this.init.apply(this, arguments);
    };

    // add by Colin start 2014-01-02 给"类"库添加继承
    if (parent) {
        var subclass = function () { };
        subclass.prototype = parent.prototype;
        klass.prototype = new subclass;
    }
    // add by Colin stop

    klass.prototype.init = function () { };

    // add by Colin start 2014-01-01 增强类库 
    // 定义 prototype 的别名
    klass.fn = klass.prototype;
    // 定义类的别名
    klass.fn.parent = klass;
    // 设置对象的__proto__；属性并不是所有浏览器都支持，类似Super.js（http://github.com/maccman/super.js）的类库则通过属性复制的方式来解决这个问题，而非通过固有的动态继承的方式来实现。
    klass._super = klass.__proto__;
    // 给类添加属性
    klass.extend = function (obj) {
        var extended = obj.extended;
        for (var i in obj) {
            klass[i] = obj[i];
        }
        if (extended) extended(klass)
    };
    // 给实例添加属性
    klass.include = function (obj) {
        var included = obj.included;
        for (var i in obj) {
            klass.fn[i] = obj[i];
        }
        if (included) included(klass)
    };
    // add by Colin stop

    // add by Colin start 2014-01-02 控制"类"库的作用域
    // 添加一个proxy函数
    klass.proxy = function (func) {
        var self = this;
        return (function () {
            return func.apply(self, arguments);
        });
    }
    // 在实例中也添加这个函数
    klass.fn.proxy = klass.proxy;
    // add by Colin stop

    return klass;
};
