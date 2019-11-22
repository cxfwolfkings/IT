import request from '../utils/https'

export default {
  login: params => request.post('/Account/Login', params),
  getLabs: params => request.get('/Account/Labs', params),
  getLabAdmins: params => request.get('/Account/LabAdmins', params),
  getUsers: params => request.get('/Account/Users', params),
  addLabAdmins: params => request.post('/Account/AddLabAdmins', params),
  updLabAdmins: params => request.post('/Account/UpdLabAdmins', params),
  delLabAdmins: params => request.post('/Account/DelLabAdmins', params),
  addAccount: params => request.post('/Account/AddAccount', params),
  updAccount: params => request.post('/Account/UpdAccount', params),
  getPublicAccounts: params => request.get('/Account/GetPublicAccounts', params),
  delPublicAccounts: params => request.post('/Account/DelPublicAccounts', params),
  changePassword: params => request.post('/Account/ChangePassword', params),
  addUser: params => request.post('/Account/AddUser', params),
  updUser: params => request.post('/Account/UpdUser', params),
  delUser: params => request.post('/Account/DelUser', params),
  downloadTmp: params => request.exportFile('/Account/DownloadTmp', params, '系统用户上传模板.xlsx', 'application/vnd.ms-excel'),
  importUsers: params => request.post('/Account/ImportUsers', params)
}
