requirejs.config({
  paths: {
    "jquery": "/js/lib/jquery.min",
    "bootstrap": "/js/lib/bootstrap.min",
    "zui": "/js/lib/zui.min",
    "underscore": "/js/lib/underscore-min",
    "vue": "/js/lib/vue",
    "canvasKeyFrames": "/js/lib/canvas-keyframes",
    "viewerjs": "/js/lib/viewer",
    "jQueryViewer": "/js/lib/jquery-viewer"
  },
  shim: {
    'bootstrap': ['jquery'],
    'zui': ['jquery']
  },
  urlArgs: "bust=" + (new Date()).getTime()
});
