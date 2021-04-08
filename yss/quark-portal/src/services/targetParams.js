import request from '@/utils/request';

/**
 * 组合模式-主表查询
 */
export async function queryMasterTable(params) {
  return request('/ocp/indexParams/colmaster/query', { method: 'POST', data: { ...params } });
}

/**
 * 指标变更记录
 */
export async function changeParams(params) {
  return request('/ocp/indexinfo/changerecord/query', { method: 'POST', data: { ...params } });
}

/**
 * 指标详情
 */
export async function indexDetail() {
  return request('/ocp/monitor/index/detail');
}

/**
 * 扩展参数
 */
export async function extendParams(params) {
  return request('/ocp/exParams/query', { method: 'POST', data: { ...params } });
}

/**
 * 子表编辑功能数据
 */
export async function editQuary(params) {
  return request('/ocp/indexparam/update', { params });
}
