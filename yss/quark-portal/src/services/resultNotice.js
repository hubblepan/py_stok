import request from '@/utils/request';

/**
 * 消息通知
 * 详情表格数据
 */
export async function detailTableData(params) {
  return request('/ocp/mesNotice/detailTable', {
    method: 'POST',
    data: { ...params },
  });
}

/**
 * 邮件通知
 * 详情表格数据
 */
export async function mailDetailData(params) {
  return request('/ocp/mailNotice/detailTable', {
    method: 'POST',
    data: { ...params },
  });
}
