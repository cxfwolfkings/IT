import request from '../utils/https'

export default {
  getBorrowedRecords: params => request.get('/BorrowAndReturn/GetBorrowedRecords', params),
  addBorrowedRecord: params => request.post('/BorrowAndReturn/AddBorrowedRecord', params),
  updBorrowedRecord: params => request.post('/BorrowAndReturn/UpdBorrowedRecord', params),
  getReturnIssues: params => request.get('/BorrowAndReturn/GetReturnIssues', params),
  addReturnIssue: params => request.post('/BorrowAndReturn/AddReturnIssue', params),
  updReturnIssue: params => request.post('/BorrowAndReturn/UpdReturnIssue', params),
  getBorrowedParts: params => request.get('/BorrowAndReturn/GetBorrowedParts', params),
  getBorrowedPart: params => request.get('/BorrowAndReturn/GetBorrowedPart', params),
  getBorrowedPartModels: params => request.get('/BorrowAndReturn/GetBorrowedPartModels', params),
  getBorrowedRecordsToday: params => request.get('/BorrowAndReturn/GetBorrowedRecordsToday', params),
  getUserRates: params => request.get('/Account/GetUserRates', params),
  getHotParts: params => request.get('/BorrowAndReturn/GetHotParts', params),
  exportUserRate: params => request.exportFile('/BorrowAndReturn/ExportUserRate', params, '用户使用率.xlsx', 'application/vnd.ms-excel'),
  getPlanReturnDate: params => request.get('/BorrowAndReturn/GetPlanReturnDate', params),
  getOrderByUser: params => request.get('/BorrowAndReturn/GetOrderByUser', params)
}
