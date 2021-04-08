import request from '@/utils/request';

export function queryMessage(params) {
  // return request.get('/ocp/message/list/query', {params});
  return request('/ocp/message/list/query', {
    method: 'post',
    data: params,
  });
}

export function readMsg(ids) {
  return request('/ocp/message/list/read', {
    method: 'post',
    data: { ids },
  });
}
