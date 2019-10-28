require(["/js/main.js?t=1"], function () {
    "use strict";
    require([
        'polyfill',
        'jquery',
        "bootstrap",
        "underscore",
        'vue',
        'canvasKeyFrames',
        'jQueryViewer',
        'fastclick',
        'moment',
        'datetimepicker',
        'custom'],
        function (polyfill, $, bsp, _, Vue, CanvasKeyFrames) {
            //console.log($.fn.viewer);
            // common.say("随机数字：" + _.random(0, 100));
            $('#loading').show();
            var keyFrames;
            var fps = 10;

            function setKeyFrames(imgArr) {
                if (keyFrames) {
                    keyFrames.destroy();
                }
                keyFrames = new CanvasKeyFrames($('.container1')[0], 'array', imgArr, {
                    width: 800, //(size.w || 800) / 2,
                    height: 450, //(size.h || 400) / 2,
                    fps: fps,
                    loop: 1
                });
            }

            /**
             * 对Date的扩展，将 Date 转化为指定格式的String
             * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
             * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
             * 例子：
             * (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
             * (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
             */
            const dateFormat = function (date, fmt) {
                var o = {
                    'M+': date.getMonth() + 1, // 月份
                    'd+': date.getDate(), // 日
                    'h+': date.getHours(), // 小时
                    'm+': date.getMinutes(), // 分
                    's+': date.getSeconds(), // 秒
                    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
                    'S': date.getMilliseconds() // 毫秒
                }
                if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
                for (var k in o) {
                    if (new RegExp('(' + k + ')').test(fmt)) {
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
                    }
                }
                return fmt
            }

            const earlistDate = new Date();
            const latestDate = new Date();
            const now = new Date();
            // 设置日期为2天前
            earlistDate.setDate(earlistDate.getDate() - 1);
            // 设置日期为1天后
            latestDate.setDate(latestDate.getDate());
            // 设置默认时间为5分钟前
            now.setTime(now.getTime() - 5 * 60 * 1000);

            new Vue({
                el: "#app",
                data: {
                    sources: [],
                    workshops: [],
                    lines: [],
                    processes: [],
                    locs: [],
                    selectedWp: '',
                    selectedLine: '',
                    selectedPs: '',
                    selectedLoc: '',
                    isPlaying: false,
                    pageIndex: 1,
                    total: 0,
                    pageOptions: [],
                    isPlayShow: true,
                    isPauseShow: false,
                    fps: fps,
                    srcInfo: '',
                    processNum: 0,
                    processCanvasId: null,
                    imageType: 1,
                    isButtonDisabled: false
                },
                created: function () {
                    const _this = this;
                    this.search(this.pageIndex);
                    $.get('/Home/GetSelectSource', function (data, status) {
                        if (status === 'success') {
                            _this.workshops = data.workshops;
                            _this.lines = data.lines;
                            _this.processes = data.processes;
                            _this.locs = data.locs;
                        }
                    });
                },
                mounted: function () {
                    $('.beginDate').datetimepicker({
                        format: 'YYYY-MM-DD HH:mm:ss',
                        locale: 'zh-cn',
                        //minDate: earlistDate,
                        maxDate: latestDate,
                        defaultDate: now,
                        ignoreReadonly: true
                    });
                    $("#playDialog").modal({
                        backdrop: 'static',
                        keyboard: false,
                        show: false
                    });
                    $('#loading').hide();
                },
                watch: {
                },
                methods: {
                    wpChange: function () {
                        this.selectedLine = ''
                        this.selectedLoc = ''
                        const _this = this;
                        $.get('/Home/GetLine', {
                            workshopNo: _this.selectedWp
                        }, function (data, status) {
                            if (status === 'success') {
                                _this.lines = data;
                            }
                        });
                    },
                    psChange: function () {
                        this.selectedLoc = ''
                        const _this = this;
                        $.get('/Home/GetLoc', {
                            lineNo: _this.selectedLine,
                            processNo: _this.selectedPs
                        }, function (data, status) {
                            if (status === 'success') {
                                _this.locs = data;
                            }
                        });
                    },
                    search: function (curPageIndex) {
                        $('#loading').show();
                        if (!$('.beginDate').val()) {
                            // 设置默认时间为5分钟前
                            const defaultDate = new Date();
                            defaultDate.setTime(defaultDate.getTime() - 5 * 60 * 1000);
                            $('.beginDate').val(dateFormat(defaultDate, 'yyyy-MM-dd hh:mm:ss'));
                        }
                        curPageIndex = curPageIndex < 1 ? 1 : curPageIndex;
                        curPageIndex = curPageIndex > 1 && curPageIndex > this.total ? this.total : curPageIndex;
                        this.pageIndex = curPageIndex;
                        const _this = this;
                        $.get('/Home/GetMonitorPics', {
                            PageIndex: curPageIndex,
                            WorkshopNo: _this.selectedWp,
                            LineNo: _this.selectedLine,
                            ProcessNo: _this.selectedPs,
                            LocNo: _this.selectedLoc,
                            BeginDate: $('.beginDate').val(),
                            IsCompressed: this.imageType == 1
                        }, function (data) {
                            const pages = []
                            _this.total = data.Total;
                            _this.imageType = data.IsCompressed ? 2 : 1;
                            _this.changeSrc(true);
                            _.map(data.Data, function (m) {
                                m.cover = m.CoverFile || '';
                                return m;
                            });
                            // 更新页码
                            if (_this.total == 0) {
                                $('.btnChangeSrc').hide();
                                $('.pagination').hide();
                                $('.noDataLabel').show();
                            } else {
                                $('.btnChangeSrc').show();
                                $('.pagination').show();
                                $('.noDataLabel').hide();
                                if (curPageIndex > 2) {
                                    pages.push(curPageIndex - 2)
                                }
                                if (curPageIndex > 1) {
                                    pages.push(curPageIndex - 1)
                                }
                                pages.push(curPageIndex)
                                if (curPageIndex < _this.total) {
                                    pages.push(curPageIndex + 1)
                                }
                                if (curPageIndex + 1 < _this.total) {
                                    pages.push(curPageIndex + 2)
                                }
                            }
                            _this.pageOptions = pages
                            _this.sources = data.Data
                            $('.div-img-content').show();
                            $('#loading').hide();
                        });
                    },
                    showDialog: function (e) {
                        $('#loading').show()
                        this.isButtonDisabled = true;
                        this.processNum = 0;
                        const _this = this;
                        $.get('/Home/GetMonitorPic', {
                            Id: e.Id
                        }, function (res) {
                            _this.processCanvasId = e.Id;
                            _this.srcInfo = res.WorkshopName + '/' + res.LineName + '/' + res.ProcessName +
                                '/' + res.LocName + '/' + res.DeviceName + '/' + res.CameraName +
                                '，拍摄时间：' + e.Datetime
                            _this.setImgArr(e.FileNames, e.Id, e.FileExtendNames);
                            $('#loading').hide();
                            $('.progressDiv').show();
                            $("#playDialog").modal('show');
                        });
                    },
                    setImgArr: function (urls, curId, exts) {
                        const _this = this;
                        // 清空Canvas容器
                        $(".container1").html('');
                        // 清空图片浏览器容器
                        $('#images').html("");
                        $('#images').viewer('destroy');
                        var imgArr = [];
                        let count = 0;
                        for (var i = 0; i < urls.length; i++) {
                            (function (i) {
                                var img = new Image();
                                img.src = urls[i];
                                img.onload = function () {
                                    img.onload = null;
                                    if (_this.processCanvasId != curId) {
                                        return;
                                    }
                                    count++;
                                    // count++;
                                    // console.log(i + '-' + count);
                                    _this.processNum = Math.round(count / urls.length * 100);
                                    // 有可能图片加载有快有慢，所以用角标存
                                    imgArr[i] = img;
                                    if (count == urls.length) {
                                        $('.progressDiv').hide();
                                        _this.isButtonDisabled = false;
                                        setKeyFrames(imgArr);
                                    }
                                }
                                img.onerror = function () {
                                }
                            })(i);
                            $('#images').append('<li><img src="' + urls[i] + '"></li>');
                        }
                        //setKeyFrames(imgArr);
                        $('#images').on({
                            hide: function (e) {
                                $("#playDialog").modal('show');
                            }
                        }).viewer({
                            backdrop: 'static',
                            navbar: false,
                            toolbar: {
                                prev: true,
                                next: true
                            },
                            loop: false,
                            movable: false,
                            loading: false,
                            interval: 0,
                            addSrcLink: function (index) {
                                //console.log(index);
                                if (exts && exts.length > 0) { // 如果是压缩图片
                                    let srcUrl = urls[index].substring(0, urls[index].lastIndexOf('.') + 1) + exts[index];
                                    srcUrl = srcUrl.replace('thumbnail/', '');
                                    $('.viewer-title').append('<a href="' + srcUrl + '" target="_blank" style="margin-left:6px;color:aqua;cursor:pointer">查看原图</a>')
                                }
                            }
                        });
                    },
                    pause: function () {
                        const imgIndex = keyFrames.pause();
                        this.isPlaying = false;
                        this.isPlayShow = true;
                        this.isPauseShow = false;
                        $("#playDialog").modal('hide');
                        $('#images').viewer('view', imgIndex);
                    },
                    play: function () {
                        this.fps = fps;
                        keyFrames.play(this.reset);
                        this.isPlayShow = false;
                        this.isPauseShow = true;
                        this.isPlaying = true;
                    },
                    close: function () {
                        this.processCanvasId = 0;
                        $("#playDialog").modal('hide');
                        this.fps = fps;
                        this.isPlayShow = true;
                        this.isPauseShow = false;
                        this.isButtonDisabled = false;
                        this.processNum = 0;
                        keyFrames.destroy();
                        $('#images').viewer('destroy');
                        $('#images').html("");
                    },
                    slow: function () {
                        fps -= 5;
                        fps = fps < 1 ? 1 : fps;
                        this.fps = fps;
                        keyFrames.setSpeed(this.fps, this.reset);
                    },
                    fast: function () {
                        fps += 5;
                        fps = fps > 5 && fps < 10 ? 5 : fps;
                        fps = fps > 30 ? 30 : fps;
                        this.fps = fps;
                        keyFrames.setSpeed(this.fps, this.reset);
                    },
                    setSpeed: function () {
                        this.fps = this.fps > 30 ? 30 : this.fps;
                        this.fps = this.fps < 1 ? 1 : this.fps;
                        this.fps = Math.floor(this.fps);
                        fps = this.fps;
                        keyFrames.setSpeed(this.fps, this.reset);
                    },
                    reset: function () {
                        keyFrames.stop();
                        this.isPlayShow = true;
                        this.isPauseShow = false;
                        this.isPlaying = false;
                    },
                    changeSrc: function (doNotSearch) {
                        if (this.imageType == 1) {
                            this.imageType = 2
                            $('.btnChangeSrc').text('切换压缩图');
                        } else {
                            this.imageType = 1
                            $('.btnChangeSrc').text('切换原图');
                        }
                        if (!doNotSearch) {
                            this.search(this.pageIndex);
                        }
                    },
                    test: function () {
                        $.get('/Home/TestSavePhoto', null, function (res) {
                            console.log(res);
                        });
                    }
                }
            });
        });
});
