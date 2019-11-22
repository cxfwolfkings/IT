import request from '../utils/https'

export default {
  updateRenew: params => request.post('/UserCenter/UpdateAssetRenew', params),
  getBlackList: params => request.get('/WorkStation/GetBlackList', params),
  getUserDelayRecords: params => request.get('/WorkStation/GetUserDelayRecords', params),
  addBlackList: params => request.post('/WorkStation/AddBlackList', params),
  getMessageList: params => request.get('/WorkStation/GetMessageList', params),
  addMessage: params => request.post('/WorkStation/AddMessage', params),
  updMessage: params => request.post('/WorkStation/UpdMessage', params),
  SendMail: params => request.post('/WorkStation/SendMail', params),
  removeFromBlack: params => request.post('/WorkStation/RemoveFromBlack', params),
  exportDelayRecords: params => request.getFile('/WorkStation/ExportDelayRecords', params)
}
