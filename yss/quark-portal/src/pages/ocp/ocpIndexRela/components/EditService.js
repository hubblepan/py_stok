import request from '@/utils/request';

/**
 * "新增"弹窗
 * 1.查询群组
 */
export function queryGroup(params) {
  return request.post('/ocp/indexinfo/relagroup/query', params);
}

/**
 * 2.查询组合树
 */
export function queryTarget(params) {
  return request.post('/ocp/indexinfo/relatarget/query', params);
}

/**
 * 3.保存关联
 */
export function saveRelation(params) {
  return request('/ocp/indexinfo/relation/save', {
    method: 'post',
    data: params,
  });
}
/**
 * "产品结构配置"弹窗
 * 1.查询主表
 */
export function queryClassify(params) {
  return request.post('/ocp/indexinfo/classify/query', params);
}
/**
 * 2.查询子表
 */
export function queryCombination(params) {
  return request.post('/ocp/indexinfo/combination/query', params);
}
/**
 * 3.保存结构配置
 */
export function saveStructure(params) {
  return request('/ocp/indexinfo/structure/save', {
    method: 'post',
    data: params,
  });
}
