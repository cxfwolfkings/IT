import request from '../utils/https'

export default {
  getShelfData: params => request.get('/SysSettings/GetShelfData', params),
  addShelf: params => request.post('/SysSettings/AddShelf', params),
  updShelf: params => request.post('/SysSettings/UpdShelf', params),
  delShelf: params => request.post('/SysSettings/DelShelf', params),
  getLabCascade: params => request.get('/SysSettings/GetLabCascade', params),
  getLaboratories: params => request.get('/SysSettings/GetLaboratories', params),
  getLabs: params => request.get('/SysSettings/GetLabs', params),
  addLab: params => request.post('/SysSettings/AddLab', params),
  updLab: params => request.post('/SysSettings/UpdLab', params),
  delLab: params => request.post('/SysSettings/DelLab', params),
  addSite: params => request.post('/SysSettings/AddCollecionSite', params),
  updSite: params => request.post('/SysSettings/UpdCollecionSite', params),
  delSite: params => request.post('/SysSettings/DelCollecionSite', params),
  getShelves: params => request.get('/SysSettings/GetShelves', params),
  setBorrowSetting: params => request.post('/SysSettings/SetBorrowSetting', params),
  getBorrowSetting: params => request.get('/SysSettings/GetBorrowSetting', params),
  getBorrowSettingIn: params => request.get('/SysSettings/GetBorrowSettingIn', params),
  getBorrowSettingByPlace: params => request.get('/SysSettings/GetBorrowSettingByPlace', params),
  getAssetsLevel1: params => request.get('/SysSettings/GetAssetsLevel1', params),
  getUseplace: params => request.get('SysSettings/GetUseplace', params),
  addPlace: params => request.post('/SysSettings/AddPlace', params),
  updPlace: params => request.post('/SysSettings/UpdPlace', params),
  delPlace: params => request.post('/SysSettings/DelPlace', params)
}
