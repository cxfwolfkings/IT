const config = {
  code: 'qr', // bar: 条形码；qr：二维码
  depts: [
    { label: '电气研发', value: '-1', prefix: 'A' },
    { label: '机械部门', value: '-2', prefix: 'B' }
  ],
  backUrl: 'http://10.30.100.105:9001/api'
  // backUrl: 'http://localhost:51742/api'
}

window.config = config
