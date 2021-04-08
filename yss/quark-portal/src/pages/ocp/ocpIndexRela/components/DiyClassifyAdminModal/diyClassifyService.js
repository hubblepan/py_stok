import request from "@/utils/request";

// 查询主表
export const queryMasterTable = (params) => {
  return request.post('/ocp/indexinfo/combination/diyclassify/classify/query', { params })
}

// 新增/修改主表
export const saveMasterTable = (params) => {
  return request.post('/ocp/indexinfo/combination/diyclassify/classify/save', { params })
}

// 删除主表
export const deleteMasterTable = (params) => {
  return request.post('/ocp/indexinfo/combination/diyclassify/classify/delete', { params })
}

// 审核主表
export const checkMasterTable = (params) => {
  return request.post('/ocp/indexinfo/combination/diyclassify/classify/check', { params })
}

// 反审核主表
export const uncheckMasterTable = (params) => {
  return request.post('/ocp/indexinfo/combination/diyclassify/classify/uncheck', { params })
}

// 查询子表
export const querySubTable = (params) => {
  return request.post('/ocp/indexinfo/combination/diyclassify/query', { params });
}

// 保存子表
export const saveSubTable = (params) => {
  return request.post('/ocp/indexinfo/combination/diyclassify/save', { params });
}

// 删除子表
export const deleteSubTable = (params) => {
  return request.post('/ocp/indexinfo/combination/diyclassify/delete', { params });
}

// 审核子表
export const checkSubTable = (params) => {
  return request.post('/ocp/indexinfo/combination/diyclassify/check', { params });
}

// 反审核子表
export const uncheckSubTable = (params) => {
  return request.post('/ocp/indexinfo/combination/diyclassify/uncheck', { params });
}

