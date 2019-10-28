requirejs.config({
  paths: {
    "polyfill": "/js/lib/polyfill",
    "jquery": "/js/lib/jquery",
    "bootstrap": "/js/lib/bootstrap",
    "fastclick": "/js/lib/fastclick",
    "moment": "/js/lib/moment-with-locales",
    "datetimepicker": "/js/lib/bootstrap-datetimepicker",
    "underscore": "/js/lib/underscore-min",
    "vue": "/js/lib/vue",
    "canvasKeyFrames": "/js/lib/canvas-keyframes",
    "viewerjs": "/js/lib/viewer",
    "jQueryViewer": "/js/lib/jquery-viewer",
    "custom": "/js/app/custom"
  },
  shim: {
    'bootstrap': ['jquery'],
    'moment': ['jquery'],
    'datetimepicker': ['bootstrap', 'moment'],
    'vue': ['polyfill'],
    'custom': ['jquery', 'bootstrap', 'fastclick', 'moment', 'datetimepicker']
  },
  urlArgs: "bust=" + (new Date()).getTime()
});
