import request from '@/utils/request';

/**
 * 数据
 */
export async function queryGuide(params) {
  return request('/ocp/noviceGuide/query', {
    method: 'post',
    data: { ...params },
  });
}

/**
 * 审核数据
 */
export async function checkParams(params) {
  return request('/ocp/noviceGuide/change', {
    method: 'POST',
    data: { ...params },
  });
}
