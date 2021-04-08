import request from '@/utils/request';

/**
 * 权限配置主表查询
 */
export async function query() {
  return request('/ocp/masterPermission/query');
}

/**
 * 权限配置从表查询
 */
export async function queryTree() {
  return request('/ocp/treePermission/query');
}

/**
 * 权限配置从表保存
 */
export async function saveTree() {
  return request('/ocp/treePermission/save');
}

/**
 * 权限配置从表复制
 */
export async function copyTree() {
  return request('/ocp/treePermission/copy');
}

/**
 * 权限配置用户维度表格查询
 */
export async function queryUserData() {
  return request('/ocp/userPermission/query');
}

/**
 * 权限配置用户维度表格查询
 */
export async function queryUserTreeData() {
  return request('/ocp/userTreePermission/query');
}
