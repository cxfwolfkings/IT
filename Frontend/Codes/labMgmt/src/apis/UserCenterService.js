import request from '../utils/https'

export default {
  addOrder: params => request.post('/UserCenter/AddAssetOrder', params),
  cancelOrder: params => request.post('/UserCenter/CancelAssetOrder', params),
  addRenew: params => request.post('/UserCenter/AddAssetRenew', params),
  getAssetOoderRecords: params => request.get('/UserCenter/GetAssetOoderRecords', params),
  getAssetRenewRecords: params => request.get('/UserCenter/GetAssetRenewRecords', params),
  getBorrowedOptions: params => request.get('/BorrowAndReturn/GetBorrowedOptions', params),
  addReport: params => request.post('/UserCenter/AddReport', params),
  getUserInfo: params => request.get('/UserCenter/GetUserInfo', params),
  setUserInfo: params => request.post('/UserCenter/SetUserInfo', params),
  addSuggestion: params => request.post('/UserCenter/AddSuggestion', params),
  getLatestReturnDate: params => request.get('/UserCenter/getLatestReturnDate', params),
  DownloadFile: params => request.get('/UserCenter/DownloadFile', params),
  DownloadFilePost: params => request.getFile('/UserCenter/DownloadFilePost', params),
  getReportList: params => request.get('/UserCenter/GetReportList', params),
  addRepairIssue: params => request.post('/UserCenter/AddRepairIssue', params),
  getDisabledDays: params => request.get('/UserCenter/GetDisabledDays', params),
  getCreditList: params => request.get('/UserCenter/GetCreditList', params),
  getRecentTwoWeeks: params => request.get('/UserCenter/GetRecentTwoWeeks', params),
  checkIsBack: params => request.get('/UserCenter/CheckIsBack', params),
  getFile: params => request.getFile('/UserCenter/GetFile', params),
  checkReportTitle: params => request.get('/UserCenter/CheckReportTitle', params)
}
