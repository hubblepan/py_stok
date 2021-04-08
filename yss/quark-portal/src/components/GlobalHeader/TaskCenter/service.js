import request from '@/utils/request';

export function queryTask(params) {
  return request('/ocp/task/center/query', {
    method: 'post',
    data: params,
  });
}
