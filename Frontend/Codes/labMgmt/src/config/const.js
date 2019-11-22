const assetCategoryTypes = {
  LevelOne: 0,
  Brand: 1,
  LevelTwo: 2,
  ModelName: 3
}

// 弃用
const depts = [
  { label: '电气研发', value: '-1' },
  { label: '机械部门', value: '-2' }
]

const assetStatus = [
  { label: '可借', value: '1' },
  { label: '已被借出', value: '0' },
  { label: '被组合占用', value: '2' },
  { label: '维修中', value: '3' },
  { label: '已报废', value: '-1' },
  { label: '被删除', value: '4' }
]

const componentStatus = [
  { label: '维修中', value: '-1' },
  { label: '已被借出', value: '0' },
  { label: '可借', value: '1' },
  { label: '被删除', value: '2' },
  { label: '已报废', value: '3' }
]

const assetType = [
  { label: '单个设备', value: '1' },
  { label: '组合平台', value: '2' }
]

const repairStatus = [
  { label: '待维修', value: '0' },
  { label: '维修中', value: '1' },
  { label: '已修好', value: '2' },
  { label: '无法修复', value: '3' },
  { label: '待确认', value: '4' }
]

const borrowReasons = [
  { label: '方案验证', value: '1' },
  { label: '问题点解决', value: '2' },
  { label: '新产品测试', value: '3' },
  { label: '其他', value: '4' }
]

const usedTypes = [
  { label: '固定资产', value: '1' },
  { label: '限料领用', value: '2' },
  { label: '样品', value: '3' }
]

const orderAuditStatus = {
  未完成: 0,
  已完成: 1,
  已取消: 2
}
const orderAuditStatusOptions = [
  { label: '未完成', value: '0' },
  { label: '已完成', value: '1' },
  { label: '已取消', value: '2' }
]

const renewAuditStatus = {
  待审核: 0,
  已同意: 1,
  已拒绝: 2,
  已取消: 3
}
const renewAuditStatusOptions = [
  { label: '待审核', value: '0' },
  { label: '已同意', value: '1' },
  { label: '已拒绝', value: '2' }
]
const publishStatusArray = [
  { label: '草稿', value: '0' },
  { label: '已发布', value: '1' }
]
const publishStatus = {
  草稿: 0,
  已发布: 1
}

const BorrowSettingType = {
  场内: 0,
  场外: 1
}

export {
  assetCategoryTypes,
  depts,
  assetStatus,
  componentStatus,
  assetType,
  repairStatus,
  borrowReasons,
  usedTypes,
  orderAuditStatus,
  renewAuditStatus,
  renewAuditStatusOptions,
  publishStatusArray,
  publishStatus,
  BorrowSettingType,
  orderAuditStatusOptions
}
