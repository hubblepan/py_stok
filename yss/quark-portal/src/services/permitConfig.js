import request from '@/utils/request';

/**
 * 权限配置
 * 指标维度-左侧主表
 */
export async function indexMasterQuery(params) {
  return request('/ocp/monitorindex/query', { params });
}

/**
 * 保存
 */
export async function saveData(params) {
  return request('/ocp/dataright/save', { params });
}
