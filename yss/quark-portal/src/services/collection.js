import request from '@/utils/request';

/**
 * 表格查询
 */
export async function queryCollection(params) {
  return request('/ocp/collection/query', {
    method: 'post',
    data: { ...params },
  });
}

/**
 * 删除数据
 */
export async function deleteCollection(params) {
  return request('/ocp/collection/deletes', {
    method: 'DELETE',
    data: { ...params },
  });
}
/**
 * 清空数据
 */
export async function deleteAll(params) {
  return request('/ocp/collection/deleteAll', {
    method: 'get',
    data: { ...params },
  });
}
