import request from "@/utils/request";

/**
 * 查询指标树
 */
export function queryTarget(params) {
  return request.get('/ocp/indexinfo/indextype/query', {params});
}

/**
 * 查询组合树
 */
export function queryCombination(params) {
  return request.get('/ocp/porttree', {params});
}

/**
 * 检测
 */
export function detect(params) {
  return request('/ocp/indexinfo/detection', {
    method: 'POST',
    data: params,
  });
}
