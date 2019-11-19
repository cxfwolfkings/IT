; !function () {
    "use strict";

    function laypage(options) {
        var skin = 'laypagecss';
        laypage.dir = 'dir' in laypage ? laypage.dir : Page.getpath + '/skin/laypage.css';
        new Page(options);
        if (laypage.dir && !doc[id](skin)) {
            Page.use(laypage.dir, skin);
        }
    }

    laypage.v = '1.3';

    var doc = document, id = 'getElementById', tag = 'getElementsByTagName';
    var index = 0, Page = function (options) {
        var that = this;
        var conf = that.config = options || {};
        conf.item = index++;
        that.render(true);
    };

    Page.on = function (elem, even, fn) {
        elem.attachEvent ? elem.attachEvent('on' + even, function () {
            fn.call(elem, window.even); //for ie, this指向为当前dom元素
        }) : elem.addEventListener(even, fn, false);
        return Page;
    };

    Page.getpath = (function () {
        var js = document.scripts, jsPath = js[js.length - 1].src;
        return jsPath.substring(0, jsPath.lastIndexOf("/") + 1);
    }())

    Page.use = function (lib, id) {
        var link = doc.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = laypage.dir;
        id && (link.id = id);
        doc[tag]('head')[0].appendChild(link);
        link = null;
    };

    //判断传入的容器类型
    Page.prototype.type = function () {
        var conf = this.config;
        if (typeof conf.cont === 'object') {
            return conf.cont.length === undefined ? 2 : 3;
        }
    };

    //分页视图
    Page.prototype.view = function () {
        var that = this, conf = that.config, view = [], dict = {};
        conf.pages = conf.pages | 0;
        conf.curr = (conf.curr | 0) || 1;
        conf.groups = 'groups' in conf ? (conf.groups | 0) : 3;
        conf.first = 'first' in conf ? conf.first : '&#x9996;&#x9875;';
        conf.last = 'last' in conf ? conf.last : '&#x5C3E;&#x9875;';
        conf.prev = 'prev' in conf ? conf.prev : '&#x4E0A;&#x4E00;&#x9875;';
        conf.next = 'next' in conf ? conf.next : '&#x4E0B;&#x4E00;&#x9875;';
        conf.more = 'more' in conf ? conf.more : '&#183;&#183;&#183;';
        conf.skip = true;

        if (conf.pages <= 1) {
            return '';
        }

        if (conf.groups > conf.pages) {
            conf.groups = conf.pages;
        }

        //计算当前组
        dict.index = Math.ceil((conf.curr + ((conf.groups > 1 && conf.groups !== conf.pages) ? 1 : 0)) / (conf.groups === 0 ? 1 : conf.groups));

        

        //当前组非首组，则输出首页
        if (dict.index > 1 && conf.first && conf.groups !== 0) {
            if (conf.curr == 1) {
                view.push('<li class="disabled"><a href="#" aria-label="First" data-page="1"><span aria-hidden="true">' + conf.first + '</span></a></li>');
            } else {
                view.push('<li><a href="javascript:;" aria-label="First" data-page="1"><span aria-hidden="true">' + conf.first + '</span></a></li>');
            }
        }

        //当前页非首页，则输出上一页
        if (conf.curr > 1 && conf.prev) {
            if (conf.curr == 1) {
                view.push('<li class="disabled"><a href="#" aria-label="Previous" data-page="' + (conf.curr - 1) + '"><span aria-hidden="true">' + conf.prev + '</span></a></li>');
            } else {
                view.push('<li><a href="javascript:;" aria-label="Previous" data-page="' + (conf.curr - 1) + '"><span aria-hidden="true">' + conf.prev + '</span></a></li>');
                if (conf.groups < conf.pages) {
                    view.push('<li><a>' + conf.more + '</a></li>');
                }
            }
        }

        //输出当前页组
        dict.poor = Math.floor((conf.groups - 1) / 2);
        dict.start = dict.index > 1 ? conf.curr - dict.poor : 1;
        dict.end = dict.index > 1 ? (function () {
            var max = conf.curr + (conf.groups - dict.poor - 1);
            return max > conf.pages ? conf.pages : max;
        }()) : conf.groups;
        if (dict.end - dict.start < conf.groups - 1) { //最后一组状态
            dict.start = dict.end - conf.groups + 1;
        }
        for (; dict.start <= dict.end; dict.start++) {
            if (dict.start === conf.curr) {
                view.push('<li class="active"><a href="javascript:;">' + dict.start + '</a></li>');
            } else {
                view.push('<li><a href="javascript:;" data-page="' + dict.start + '"><span aria-hidden="true">' + dict.start + '</span></a></li>');
            }
        }

        //当前页不为尾页时，输出下一页
        dict.flow = !conf.prev && conf.groups === 0;
        if (conf.curr !== conf.pages && conf.next || dict.flow) {
            if (conf.groups < conf.pages) {
                view.push('<li><a>' + conf.more + '</a></li>');
            }
            view.push((function () {
                return (dict.flow && conf.curr === conf.pages)
                ? '<span class="page_nomore" title="&#x5DF2;&#x6CA1;&#x6709;&#x66F4;&#x591A;">' + conf.next + '</span>'
                : '<li><a href="javascript:;" aria-label="next" data-page="' + (conf.curr + 1) + '"><span aria-hidden="true">' + conf.next + '</span></a></li>';
            }()));
        }

        //总页数大于连续分页数，且当前组最大页小于总页，输出尾页
        if (conf.pages > conf.groups && dict.end < conf.pages && conf.last && conf.groups !== 0) {
            if (conf.curr === conf.pages) {
                view.push('<li class="disabled"><a href="#" aria-label="Last" data-page="' + conf.pages + '"><span aria-hidden="true">' + conf.last + '</span></a></li>');
            } else {
                
                view.push('<li><a href="javascript:;" aria-label="Last" data-page="' + conf.pages + '"><span aria-hidden="true">' + conf.last + '</span></a></li>');
            }
        }

        return '<ul class="pagination pagination-sm" id="pagination_' + that.config.item + '">' + view.join('') + function () {
            return conf.skip
            ? '<li><span class="page_total" style="padding: 0 10px;"><label>&#x7B2C;&#32;</label><input type="text" value="'+conf.curr+'"  class="page_skip"><label>&#32;&#x9875;&#32;&#47;&#32;' + conf.pages + '&#32;&#39029;</label></li>'
            + '<li><a id="goPage" href="javascript:;" aria-label="next">\&#x786e;&#x5b9a;</a></li>'
            : '';
        }() + '</ul>';
    };

    //跳页
    Page.prototype.jump = function (elem) {
        
        if (!elem) return;
        
        var that = this, conf = that.config, childs = elem.children;
        var btn = elem[tag]('a')[elem[tag]('a').length - 1];
        var input = elem[tag]('input')[0];
        for (var i = 0, len = childs.length; i < len; i++) {
            if (childs[i].className.indexOf('disabled') < 0 && childs[i].firstChild.nodeName.toLowerCase() === 'a') {
                Page.on(childs[i].firstChild, 'click', function () {
                    var curr = this.getAttribute('data-page') || -1;
                    if (curr != -1) {
                        conf.curr = curr;
                        that.render();
                    }
                });
            }
        }
        if (input) {
            Page.on(input, 'keyup', function () {
                input.value = input.value.replace(/\s|\D/g, '');

                if (input.value) {
                    if (input.value < 1 || input.value > conf.pages) {
                        input.value = '';
                    }
                }

            });
             
        }
        if (btn) {
            Page.on(btn, 'click', function () {

                var curr = input.value.replace(/\s|\D/g, '') | 0;
                if (curr && curr <= conf.pages) {
                    conf.curr = curr;
                    that.render();
                }
            });
        }
    };

    //渲染分页
    Page.prototype.render = function (load) {
        var that = this, conf = that.config, type = that.type();
        var view = that.view();
        if (type === 2) {
            conf.cont.innerHTML = view;
        } else if (type === 3) {
            conf.cont.html(view);
        } else {
            doc[id](conf.cont).innerHTML = view;
        }
        conf.jump && conf.jump(conf, load);
        that.jump(doc[id]('pagination_' + conf.item));
        if (conf.hash && !load) {
            location.hash = '!' + conf.hash + '=' + conf.curr;
        }
    };

    //for 页面模块加载、Node.js运用、页面普通应用
    "function" === typeof define ? define(function () {
        return laypage;
    }) : "undefined" != typeof exports ? module.exports = laypage : window.laypage = laypage;

}();