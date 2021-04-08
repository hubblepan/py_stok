import request from "@/utils/request";


// 查询基础信息
export function queryBasicInfo (params) {
  return request.post('/ocp/indexinfo/deploy/baseinfo', { params });
}

// 查询触发位置下拉框
export function getTriggerPositions () {
  return request.post('/ocp/indexinfo/deploy/baseinfo/triggerPositions');
}

// 查询关联组合
export function queryCombination (params) {
  return request.post('/ocp/indexinfo/deploy/portlist', { params });
}

// 查询关联模式下拉框
export function queryCombinationMode (params) {
  return request.post('/ocp/indexinfo/deploy/relatedcombination/combinationmode', { params });
}

// 参数设置
export function queryParam (params) {
  return request.post('/ocp/indexinfo/deploy/param', { params });
}

// 查询指标检测
export function queryTest (params) {
  return request.post('/ocp/indexinfo/detection', { params })
}

// 部署完成
export function queryComplete (params) {
  return request.post('/ocp/indexinfo/deploy/finish', { params })
}
