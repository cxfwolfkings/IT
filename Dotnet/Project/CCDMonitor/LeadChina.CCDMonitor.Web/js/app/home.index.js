require(["/js/config.js?t=1"], function () {
    "use strict";
    require(['jquery', "bootstrap", "common", "underscore", 'vue', 'canvasKeyFrames', 'jQueryViewer'], function ($, bsp, common, _, Vue, CanvasKeyFrames) {
        //console.log($.fn.viewer);
        // common.say("随机数字：" + _.random(0, 100));
        var keyFrames;
        //var size = {};

        function setKeyFrames(imgArr) {
            keyFrames = new CanvasKeyFrames($('.container1')[0], 'array', imgArr, {
                width: 1600, //(size.w || 800) / 2,
                height: 900, //(size.h || 400) / 2,
                fps: 10
            });
            // keyFrames.play();
        }

        var setImgArr = function (urls) {
            $(".container1").html("");
            $('#images').html("");
            $('#images').viewer('destroy');
            // var count = 0;
            var imgArr = [];
            for (var i in urls) {
                var img = new Image();
                img.src = urls[i];
                imgArr[i] = img;
                $('#images').append('<li><img src="' + urls[i] +'"></li>');
                //(function (i) {
                //    var img = new Image();
                //    img.onload = function () {
                //        img.onload = null;
                //        count++;
                //        // 有可能图片加载有快有慢，所以用角标存
                //        imgArr[i] = img;
                //        if (count === urls.length) {
                //            setKeyFrames(imgArr);
                //        }
                //    };
                //    img.onerror = function () {
                //    };
                //    img.src = urls[i];
                //})(i);
            }
            setKeyFrames(imgArr);
            $('#images').on({
                hide: function (e) {
                    $("#playDialog").modal('show');
                }
            }).viewer({
                backdrop: 'static',
                navbar: false,
                toolbar: {
                    prev: true,
                    play: true,
                    next: true
                },
                loop: false,
                movable: false,
                loading: false,
                interval: 0
            });
        };

        //function computeSize() {
        //    var baseScale = 1.333;
        //    var sw = document.body.offsetWidth;
        //    var sh = document.body.offsetHeight;

        //    var w, h;

        //    var _scale = sw / sh;
        //    if (_scale > baseScale) {
        //        w = sw - 40;
        //        h = w / 1.33;
        //    } else {
        //        h = sh - 50;
        //        w = (1.33 * h) - 40;
        //    }
        //    size = { w: w, h: h };
        //}

        new Vue({
            el: "#app",
            data: {
                sources: [],
                demoVideo: "../../tmp/v1.mp4",
                dialogShow: false,
                isPlaying: false
            },
            created: function () {
                // var coverImages = "../../cameral_shara_1/pic11.bmp";
                // var img2 = "../../cameral_shara_1/pic22.bmp";
                // for (var i = 0; i < 50; i++) {
                //     this.sources.push(coverImages);
                //     this.sources.push(img2);
                // }
                var _this = this;
                $.get('/home/GetMonitorPics', function (data) {
                    _.map(data, function (m) {
                        m.cover = m.FileNames[0] || '';
                        return m;
                    });
                    _this.sources = data;
                    // debugger;
                });
            },
            mounted: function () {
                //computeSize();
            },
            methods: {
                showDialog(e) {
                    //$("#playDialog").show();
                    setImgArr(e.FileNames);
                    this.dialogShow = true;
                    $("#playDialog").modal('show');
                }
            }
        });

        new Vue({
            el: "#playDialog",
            data: {
                dialogShow: false,
                isPlaying: false
            },
            methods: {
                pause() {
                    const imgIndex = keyFrames.pause();
                    this.isPlaying = false;
                    $("#playDialog").modal('hide');
                    $('#images').viewer('view', imgIndex);
                },
                play() {
                    keyFrames.play();
                    this.isPlaying = true;
                },
                close: function () {
                    $("#playDialog").modal('hide');
                    //$("#playDialog").hide();
                    this.dialogShow = false;
                    this.pause();
                }
            }
        });
    });
});
