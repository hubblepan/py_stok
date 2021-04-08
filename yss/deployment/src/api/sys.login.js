import request from '@/plugin/axios';
// import Qs from 'qs'

const baseUrl = process.env.VUE_APP_MONITOR_API;

export function AccountLogin (data) {
  return request({
    url: baseUrl + '/user/login',
    method: 'get',
    params: data,
    timeout: 10000,
  });
}

export function updatePassword (data) {
  return request({
    url: baseUrl + '/user/password/update',
    method: 'post',
    params: {
      username: data.username,
      password: data.password,
      newPassword: data.newPassword,
    },
  });
}
