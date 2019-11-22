import axios from 'axios'
import qs from 'qs'
import router from '@/router'

let app = null
const getAppId = setInterval(() => {
  if (window.app.$notify) {
    clearInterval(getAppId)
    app = window.app
  }
}, 60)

axios.defaults.timeout = 60000 // 响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8' // 配置请求头
axios.defaults.headers['x-requested-with'] = 'XMLHttpRequest' // 让后台判断是否ajax请求
axios.defaults.baseURL = window.config.backUrl // 配置接口地址

// status < 500 不会抛错误
axios.defaults.validateStatus = status => {
  return status < 500
}

// 设置请求token
axios.interceptors.request.use(config => {
  if (sessionStorage.getItem('token')) {
    var token = sessionStorage.getItem('token')
    config.headers['Authorization'] = 'Bearer ' + token
  }
  // 在发送请求之前做某件事
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  } else if (config.method === 'get') {
    // 加上时间戳，不使用缓存
    if (!config.params) {
      config.params = {}
    }
    config.params.time = new Date().getTime()
  }
  // console.log(config)
  return config
}, (error) => {
  console.log('错误的传参')
  return Promise.reject(error)
})

const authrotyExpired = function () {
  if (document.getElementsByClassName('el-message').length === 0) {
    app.$message({
      type: 'warning',
      message: '登录身份过期，请重新登录。'
    })
  }
  sessionStorage.removeItem('token')
  sessionStorage.removeItem('user')
  router.push({ name: 'login' })
  return Promise.reject(new Error('身份过期'))
}

// 接口错误拦截
axios.interceptors.response.use(res => {
  if (res.status === 401) {
    return authrotyExpired()
  } else if (res.status === 200) {
    const statusCode = res['data']['Code'] // 错误码
    const message = res['data']['Msg'] // 错误信息
    const data = res['data']['Data'] // 返回数据
    if (message) { // 后台返回错误信息
      if (statusCode === 401) {
        return authrotyExpired()
      } else {
        app.$message({ type: 'error', message: message, duration: 3000 })
      }
      return Promise.reject(message)
    } else if (res.config.responseType === 'blob') {
      return Promise.resolve(res.data)
    } else {
      return Promise.resolve(data)
    }
  } else {
    app.$notify.error({
      title: '接口异常!',
      message: `异常原因: [ ${res.config.url} ] ${res.status} ${res.statusText}`
    })
    return Promise.reject(new Error(res.statusText))
  }
}, err => {
  app.$notify.error({
    title: '服务错误',
    message: '服务器响应错误 ' + err.message
  })
  return Promise.reject(err)
})

// 返回一个Promise（发送post请求）
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params).then(response => {
      resolve(response)
    }, err => {
      reject(err)
    }).catch((error) => {
      reject(error)
    })
  })
}

// 返回一个Promise（发送get请求）
export function get(url, param) {
  return new Promise((resolve, reject) => {
    axios.get(url, { params: param }).then(response => {
      resolve(response)
    }, err => {
      reject(err)
    }).catch((error) => {
      reject(error)
    })
  })
}

export function getFile(url, param) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      responseType: 'blob',
      url: url,
      params: param
    })// axios.get(url, { params: param }, { responseType: 'blob' })
      .then(response => {
        resolve(response)
        if (response != null) {
          let url = window.URL.createObjectURL(new Blob([response], { type: 'application/vnd.ms-excel' }))
          let link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', param.DownloadName || 'download.xlsx') // 自定义下载文件名（如exemple.txt）
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          window.URL.revokeObjectURL(link.href)
        }
      }, err => {
        reject(err)
      }).catch((error) => {
        reject(error)
      })
  })
}

export function exportFile(url, param, fileName, typeName) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      responseType: 'blob',
      url: url,
      params: param
    })
      .then(response => {
        resolve(response)
        if (response != null) {
          let url = window.URL.createObjectURL(new Blob([response], typeName && { type: typeName }))
          let link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', fileName)
          document.body.appendChild(link)
          link.click()
        }
      }, err => {
        reject(err)
      }).catch((error) => {
        reject(error)
      })
  })
}

export default {
  post,
  get,
  getFile,
  exportFile
}
