import request from '@/utils/request';

/**
 * 查询
 */
export async function query() {
  return request('/api/menuDrawer/query');
}
