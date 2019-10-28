if (!Array.prototype.forEach) {
  Array.prototype.forEach = function (fn, context) {
    var context = arguments[1];
    if (typeof fn !== "function") {
      throw new TypeError(fn + "is not a function");
    }

    for (var i = 0; i < this.length; i++) {
      fn.call(context, this[i], i, this);
    }
  };
}

/**
 * Resize function without multiple trigger
 * 
 * Usage:
 * $(window).smartresize(function(){  
 *     // code here
 * });
 */
(function ($, sr) {
  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function (func, threshold, execAsap) {
    var timeout;

    return function debounced () {
      var obj = this, args = arguments;
      function delayed () {
        if (!execAsap)
          func.apply(obj, args);
        timeout = null;
      }

      if (timeout)
        clearTimeout(timeout);
      else if (execAsap)
        func.apply(obj, args);

      timeout = setTimeout(delayed, threshold || 100);
    };
  };

  // smartresize 
  jQuery.fn[sr] = function (fn) { return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery, 'smartresize');

/**
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var CURRENT_URL = window.location.href.split('#')[0].split('?')[0],
  $BODY = $('body'),
  $MENU_TOGGLE = $('#menu_toggle'),
  $SIDEBAR_MENU = $('#sidebar-menu'),
  $SIDEBAR_FOOTER = $('.sidebar-footer'),
  $LEFT_COL = $('.left_col'),
  $RIGHT_COL = $('.right_col'),
  $NAV_MENU = $('.nav_menu'),
  $FOOTER = $('footer');

$(document).ready(function () {
  init_sidebar();
  init_content();
});

// Sidebar
function init_sidebar () {
  // TODO: This is some kind of easy fix, maybe we can improve this
  var setContentHeight = function () {
    // reset height
    $RIGHT_COL.css('min-height', $(window).height());

    var bodyHeight = $BODY.outerHeight(),
      footerHeight = $BODY.hasClass('footer_fixed') ? -10 : $FOOTER.height(),
      leftColHeight = $LEFT_COL.eq(1).height() + $SIDEBAR_FOOTER.height(),
      contentHeight = bodyHeight < leftColHeight ? leftColHeight : bodyHeight;

    // normalize content
    contentHeight -= $NAV_MENU.height() + footerHeight;

    $RIGHT_COL.css('min-height', contentHeight);
  };

  $SIDEBAR_MENU.find('a').on('click', function (ev) {
    console.log('clicked - sidebar_menu');
    var $li = $(this).parent();

    if ($li.is('.active')) {
      $li.removeClass('active active-sm');
      $('ul:first', $li).slideUp(function () {
        setContentHeight();
      });
    } else {
      // prevent closing menu if we are on child menu
      if (!$li.parent().is('.child_menu')) {
        $SIDEBAR_MENU.find('li').removeClass('active active-sm');
        $SIDEBAR_MENU.find('li ul').slideUp();
      } else {
        if ($BODY.is(".nav-sm")) {
          $li.parent().find("li").removeClass("active active-sm");
          $li.parent().find("li ul").slideUp();
        }
      }
      $li.addClass('active');

      $('ul:first', $li).slideDown(function () {
        setContentHeight();
      });
    }
  });

  // toggle small or large menu 
  $MENU_TOGGLE.on('click', function () {
    console.log('clicked - menu toggle');

    if ($BODY.hasClass('nav-md')) {
      $SIDEBAR_MENU.find('li.active ul').hide();
      $SIDEBAR_MENU.find('li.active').addClass('active-sm').removeClass('active');
    } else {
      $SIDEBAR_MENU.find('li.active-sm ul').show();
      $SIDEBAR_MENU.find('li.active-sm').addClass('active').removeClass('active-sm');
    }

    $BODY.toggleClass('nav-md nav-sm');

    setContentHeight();

    $('.dataTable').each(function () { $(this).dataTable().fnDraw(); });
  });

  // check active menu
  $SIDEBAR_MENU.find('a[href="' + CURRENT_URL + '"]').parent('li').addClass('current-page');

  $SIDEBAR_MENU.find('a').filter(function () {
    return this.href == CURRENT_URL;
  }).parent('li').addClass('current-page').parents('ul').slideDown(function () {
    setContentHeight();
  }).parent().addClass('active');

  // recompute content when resizing
  $(window).smartresize(function () {
    setContentHeight();
  });

  setContentHeight();

  // fixed sidebar
  if ($.fn.mCustomScrollbar) {
    $('.menu_fixed').mCustomScrollbar({
      autoHideScrollbar: true,
      theme: 'minimal',
      mouseWheel: { preventDefault: true }
    });
  }
};
// /Sidebar

function init_content () {
  if (location.href.indexOf('Survey/Edit') > 0) {
    $('.date').datetimepicker({
      format: 'YYYY-MM-DD HH:mm:ss',
      locale: 'zh-cn',
      ignoreReadonly: true
    });
    $('.image-remove').click(function (event) {
      $(this).parent().parent().remove();
      event.stopPropagation(); // 阻止事件冒泡

      // 更新隐藏图片字段
      const rmImg = $(this).data('image');
      let imgStr = $('#hidden_imgs').val();
      imgStr = imgStr.replace(rmImg, '').replace(';;', ';');
      $('#hidden_imgs').val(imgStr);

      return false;
    });
  } else if (location.href.indexOf('Survey') > 0) {
    if ($.fn.daterangepicker) {
      $('#reservation-time').daterangepicker({
        autoUpdateInput: false,
        timePicker: true,
        timePickerSeconds: true,
        timePicker24Hour: true, // 设置小时为24小时制，默认false
        locale: {
          format: 'YYYY-MM-DD HH:mm:ss',
          applyLabel: '确定',
          cancelLabel: '取消',
          fromLabel: '起始时间',
          toLabel: '结束时间',
          customRangeLabel: '手动选择',
          daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
          monthNames: ['一月', '二月', '三月', '四月', '五月', '六月',
            '七月', '八月', '九月', '十月', '十一月', '十二月'
          ],
          firstDay: 1
        }
      });
    }
    delSurveyDate();
    if (sessionStorage.SurveyNo && sessionStorage.SurveyNo != 'undefined') {
      $('#input-number').val(sessionStorage.SurveyNo);
    }
    if (sessionStorage.SurveyDate && sessionStorage.SurveyDate != 'undefined') {
      $('#reservation-time').val(sessionStorage.SurveyDate);
    }
    goToPage(sessionStorage.PageIndex);
    $('.btn-search-qs').click(function () {
      searchQs(1);
    });
    $('.btn-add-qs').click(function () {
      location.href = "/Survey/Edit";
    });
  } else {
    sessionStorage.clear();
  }
}

function delSurveyDate () {
  $('#reservation-time').val('');
}

function goToPage (pageIndex) {
  $('#loading').show();
  pageIndex = pageIndex ? pageIndex : 1;
  if (pageIndex != 1) {
    const total = sessionStorage.TotalPage;
    if (pageIndex < 1) {
      pageIndex = 1;
    } else if (pageIndex > total) {
      pageIndex = total;
    }
  }
  pageIndex = parseInt(pageIndex);
  sessionStorage.PageIndex = pageIndex;

  $.get('/Survey/Questions', {
    SurveyNo: sessionStorage.SurveyNo,
    SurveyDate: sessionStorage.SurveyDate,
    PageIndex: pageIndex
  }, function (res, status, xhr) {
    $('.tb-qs tbody').html('');
    var data = Array.prototype.slice.call(res.data);
    data.forEach(function (qs, index) {
      const tr = '<tr class="' + (index % 2 === 0 ? 'even' : 'odd') + ' pointer">\
                    <td>' + ((pageIndex - 1) * 15 + (index + 1)) + '</a></td>\
                    <td><a href="/Survey/Edit?Id='+ qs.SurveyId + '&type=read">' + qs.SurveyNo + '</td>\
                    <td>'+ qs.SurveyDate + '</td>\
                    <td>'+ qs.SurveyDesc + '</td>\
                    <td class="last">\
                        <a href="/Survey/Edit?Id='+ qs.SurveyId + '">编辑</a>\
                    </td>\
                </tr>';
      $('.tb-qs tbody').append(tr);
    })
    const totalPage = Math.ceil(res.total / 15);
    if (!res.data.length) {
      $('.tb-qs tbody').append('<tr><td colspan="5" style="text-align:center">暂无数据！</td></tr>');
      $('.pagination').hide();
    } else {
      // 更新页码
      $('.li-page-route-prev-2').remove();
      $('.li-page-route-prev-1').remove();
      $('.li-page-route-next-1').remove();
      $('.li-page-route-next-2').remove();

      $('.li-page-route a').text(pageIndex);

      if (pageIndex > 2) {
        $('.li-page-route').before('<li class="li-page-route-prev-2">\
                                      <a href="javascript:;" onclick="goToPage('+ (pageIndex - 2) + ')">' + (pageIndex - 2) + '</a>\
                                    </li>');
      }
      if (pageIndex > 1) {
        $('.li-page-route').before('<li class="li-page-route-prev-1">\
                                      <a href="javascript:;" onclick="goToPage('+ (pageIndex - 1) + ')">' + (pageIndex - 1) + '</a>\
                                    </li>');
      }
      if (pageIndex < totalPage) {
        $('.li-page-route').after('<li class="li-page-route-next-1">\
                                      <a href="javascript:;" onclick="goToPage('+ (pageIndex + 1) + ')">' + (pageIndex + 1) + '</a>\
                                    </li>');
      }
      if (pageIndex + 1 < totalPage) {
        $('.li-page-route-next-1').after('<li class="li-page-route-next-2">\
                                      <a href="javascript:;" onclick="goToPage('+ (pageIndex + 2) + ')">' + (pageIndex + 2) + '</a>\
                                    </li>');
      }

      $('#span-page-index').text(pageIndex);
      $('#span-page-total').text(totalPage);
      sessionStorage.TotalPage = totalPage;
      $('.pagination').show();
    }
    $('#loading').hide();
  });
}

function searchQs (pageIndex) {
  pageIndex = pageIndex ? pageIndex : 1;
  sessionStorage.SurveyNo = $.trim($('#input-number').val());
  sessionStorage.SurveyDate = $.trim($('#reservation-time').val());

  goToPage(pageIndex);
}
