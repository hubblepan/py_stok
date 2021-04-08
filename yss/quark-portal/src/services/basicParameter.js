import request from '@/utils/request';

/**
 * 基础参数表格查询
 */
export async function queryBasicParams(params) {
  return request('/ocp/sysparam/query', {
    method: 'POST',
    data: { ...params },
  });
}

/**
 * 根据某条Id查询数据
 */
export async function queryIdData(params) {
  return request('/ocp/sysparam/queryId', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}

/**
 * 新增数据
 */
export async function saveBasicParams(params) {
  return request('/ocp/sysparam/save', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}

/**
 * 修改数据
 */
export async function modifyBasicParams() {
  return request('/ocp/sysparam/save');
}

/**
 * 删除数据
 */
export async function deleteBasicParams(params) {
  return request('/ocp/sysparam/delete', {
    method: 'DELETE',
    data: { ...params },
  });
}

/**
 * 审核数据
 */
export async function checkBasicParams() {
  return request('/ocp/sysparam/check');
}

/**
 * 审核数据
 */
export async function checkParams(params) {
  return request('/ocp/sysparam/checkStatus', {
    method: 'POST',
    data: { ...params },
  });
}

/**
 * 反审核数据
 */
export async function uncheckParams(params) {
  return request('/ocp/sysparam/uncheckStatus', {
    method: 'POST',
    data: { ...params },
  });
}

/**
 * 反审核数据
 */
export async function uncheckBasicParams() {
  return request('/ocp/sysparam/uncheck');
}

/**
 * 查询
 */
export async function queryData() {
  return request('/ocp/sysparam/datasource');
}

/**
 * 数据库链接
 */
export async function queryDbLink() {
  return request('/ocp/sysparam/dblink/query');
}

/**
 * 服务链接
 */
export async function queryServerLink() {
  return request('/ocp/sysparam/servicelink/query');
}

/**
 * 参数关联值
 * @param {*} params
 */
export async function paramLink(params) {
  return request('/ocp/sysparam/index/query', {
    method: 'GET',
    data: { ...params },
  });
}
