import request from '@/plugin/axios';

const baseUrl = process.env.VUE_APP_DEVOPS_API;

export function fetchTree () {
  return request({
    url: baseUrl + '/menu/tree',
    method: 'get',
    withCredentials: false,
  });
}
/**
 * 菜单请求
 */
export function fetchMenu () {
  return request({
    url: baseUrl + '/menu/tree',
    method: 'get',
    withCredentials: false,
  });
}

export function addMenu (obj) {
  return request({
    url: baseUrl + '/menu/add',
    method: 'post',
    data: obj,
  });
}

export function getMenu (id) {
  return request({
    url: baseUrl + '/menu/by/id',
    method: 'get',
    params: {
      id,
    },
  });
}

export function delMenu (id) {
  return request({
    url: baseUrl + '/menu/delete',
    method: 'get',
    params: {
      id,
    },
  });
}

export function updateMenu (obj) {
  return request({
    url: baseUrl + '/menu/update',
    method: 'post',
    data: obj,
  });
}
