const trimForm = form => {
  for (const key in form) {
    if (typeof form[key] === 'string') {
      form[key] = trim(form[key])
    }
  }
}

const trim = str => {
  if (typeof str === 'string') {
    str = str.replace(/^\s+|\s+$/g, '')
  }
  return str
}

const arrSort = function (item1, item2) {
  return item1.value - item2.value
}

const setContent = function () {
  // const intervalId = setInterval(function () {
  const tableCells = document.querySelectorAll('.el-table .cell')
  if (tableCells.length > 0) {
    // clearInterval(intervalId)
    for (let i = 0; i < tableCells.length; i++) {
      // console.log(tableCells[i].scrollHeight + ' => ' + tableCells[i].clientHeight)
      if (tableCells[i].scrollHeight > tableCells[i].clientHeight) {
        tableCells[i].setAttribute('title', tableCells[i].innerHTML)
        tableCells[i].classList.add('tableCell')
      } else {
        tableCells[i].removeAttribute('title')
        tableCells[i].classList.remove('tableCell')
      }
    }
  }
  // }, 250)
}

/**
 *对Date的扩展，将 Date 转化为指定格式的String
 *月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 *年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 *例子：
 *(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 *(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
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
// d->今日格式化日期  n->后多少天
const getAftertime = function (d, n) {
  d = d.replace(/-/g, '/') // 解决低版本解释new Date('yyyy-mm-dd')这个对象出现NaN
  var date = new Date()
  var nd = date.getDate()
  var nm = date.getMonth() + 1
  var ny = date.getFullYear()
  d = new Date(d) // 获得当前时间戳
  var timearray = []
  for (var i = 0; i < n; i++) {
    var dd = d
    dd = +dd + 1000 * 60 * 60 * 24 * i
    dd = new Date(dd)
    var year = dd.getFullYear()
    var mon = dd.getMonth() + 1
    var day = dd.getDate()
    let s
    if (year > ny || (year === ny && mon > nm) || (year === ny && mon === nm && day > nd - 1)) { // 后加n天大于当前日期,结束日期为当前日期
      s = ny + '-' + (nm < 10 ? ('0' + nm) : nm) + '-' + (nd - 1 < 10 ? ('0' + (nd - 1)) : nd - 1)
      break
    } else {
      s = year + '-' + (mon < 10 ? ('0' + mon) : mon) + '-' + (day < 10 ? ('0' + day) : day)
    }
    timearray.push(s)
  }
  return timearray
}

const printSection = function (domId) {
  var printBox = document.getElementById(domId)
  // 拿到打印的区域的html内容
  var newContent = printBox.innerHTML
  // 将旧的页面储存起来，当打印完成后返给给页面。
  var oldContent = document.body.innerHTML
  // 赋值给body
  document.body.innerHTML = newContent
  // 执行window.print打印功能
  window.print()
  // 重新加载页面，以刷新数据。以防打印完之后，页面不能操作的问题
  // window.location.reload()
  document.body.innerHTML = oldContent
  return false
}

// 写cookies
const setCookie = function (name, value) {
  var Days = 30
  var exp = new Date()
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000)
  document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString()
}

// 读取cookies
const getCookie = function (name) {
  var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  var arr = document.cookie.match(reg)
  if (arr) {
    return unescape(arr[2])
  } else {
    return null
  }
}

// 删除cookies
const delCookie = function (name) {
  var exp = new Date()
  exp.setTime(exp.getTime() - 1)
  var cval = getCookie(name)
  if (cval != null) {
    document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
  }
}

// 弹出消息
const showMessage = function (app, msgType, msg) {
  if (document.getElementsByClassName('el-message').length === 0) {
    app.$message({
      type: msgType,
      message: msg
    })
  }
}

let firstTime = null
let lastTime = null
let nextTime = null
let code = ''
let that = null

// 扫码处理
const scanCode = function (it, type) {
  scanCodeBefore(it)
  document.removeEventListener('keyup', scanCodeForRepair)
  document.removeEventListener('keyup', scanCodeForBorrow)
  document.removeEventListener('keyup', scanCodeForReturn)
  switch (type) {
    case 'repair':
      document.addEventListener('keyup', scanCodeForRepair)
      break
    case 'borrow':
      document.addEventListener('keyup', scanCodeForBorrow)
      break
    case 'return':
      document.addEventListener('keyup', scanCodeForReturn)
      break
  }
}

const scanCodeBefore = function (it) {
  firstTime = null
  lastTime = null
  nextTime = null
  code = ''
  that = it
}

const scanCodeCommon = function (e, attrName, actionName) {
  let keycode = e.keyCode || e.which || e.charCode
  nextTime = new Date()
  if (keycode === 13) {
    // 回车键，一次扫码结束
    // if (lastTime && nextTime - lastTime < 30) {
    if (firstTime && nextTime - firstTime < 1500 && code.length >= 10) {
      // 扫码枪
      // do something
      console.log(code)
      if (code.startsWith('P')) {
        // 组合平台
        const components = that.info.filterAssetIds.find(_ => _.label === '组合平台')
        let component = null
        if (components && components.options) {
          component = components.options.find(_ => _.label.toUpperCase() === code)
        }
        if (component) {
          that.form[attrName] = component.value
        } else {
          that.$message({
            message: '该平台不在可' + actionName + '列表内！',
            type: 'warning'
          })
        }
      } else {
        // 单个部件
        const assets = that.info.filterAssetIds.find(_ => _.label === '单个部件')
        let asset = null
        if (assets && assets.options) {
          asset = assets.options.find(_ => _.label.toUpperCase() === code)
        }
        if (asset) {
          that.form[attrName] = asset.value
        } else {
          that.$message({
            message: '该部件不在可' + actionName + '列表内！',
            type: 'warning'
          })
        }
      }
      if (that.form[attrName]) {
        that.numChange(that.form[attrName])
      }
    } else {
      // 键盘
      // do something
    }
    code = ''
    lastTime = null
    firstTime = null
    e.preventDefault()
  } else if (keycode === 16) {
    // 什么都不处理
  } else {
    // if (!lastTime) {
    if (!firstTime) {
      code = String.fromCharCode(keycode)
      firstTime = nextTime
    } else {
      if (nextTime - lastTime > 300) {
        // 大于30ms时重新开始
        // code += String.fromCharCode(keycode)
        // 重新开始
        code = String.fromCharCode(keycode)
        firstTime = nextTime
      } else {
        code += String.fromCharCode(keycode)
      }
    }
    lastTime = nextTime
  }
}

const scanCodeForRepair = function (e) {
  scanCodeCommon(e, 'AssetId', '返修')
}

const scanCodeForBorrow = function (e) {
  scanCodeCommon(e, 'AssetId', '借')
}

const scanCodeForReturn = function (e) {
  scanCodeCommon(e, 'BorrowId', '归还')
}

export {
  trim,
  trimForm,
  dateFormat,
  arrSort,
  setContent,
  printSection,
  getAftertime,
  setCookie,
  getCookie,
  delCookie,
  showMessage,
  scanCode
}
