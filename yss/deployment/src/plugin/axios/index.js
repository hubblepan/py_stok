import axios from 'axios';
import { message } from '@/utils/resetMessage';
import store from '@/store';
import util from '@/libs/util';
import { getToken } from '@/libs/auth';

// 创建一个错误
function errorCreate(msg) {
  const error = new Error(msg);
  errorLog(error);
  throw error;
}

// 记录和显示错误
function errorLog(error) {
  // 添加到日志
  store.dispatch('d2admin/log/push', {
    message: '数据请求异常',
    type: 'danger',
    meta: {
      error,
    },
  });
  // 打印到控制台
  if (process.env.NODE_ENV === 'development') {
    util.log.danger('>>>>>> Error >>>>>>');
    console.log(error);
  }
  // 显示提示
  message({
    message: error.message,
    type: 'error',
    duration: 5 * 1000,
  });
}

// 创建一个 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000, // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在请求发送之前做一些处理
    const token = getToken();
    // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    config.headers['X-Token'] = token;
    console.log(config);
    return config;
  },
  error => {
    // 发送失败
    console.log(error);
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  response => {
    // dataAxios 是 axios 返回数据中的 data
    if (response.headers['content-type'] === 'application/octet-stream') { // 下载文件
      return response;
    }
    const dataAxios = response.data;
    // 这个状态码是和后端约定的
    const { code, success } = dataAxios;

    if (success === true) {
      return dataAxios;
    } else {
      // 根据 code 进行判断
      // 有 code 代表这是一个后端接口 可以进行进一步的判断
      switch (code) {
        case 'SUCCESS':
          // [ 示例 ] code === 0 代表没有错误
          return dataAxios;
        case '200':
          // [ 示例 ] code === 0 代表没有错误
          return dataAxios;
        case 'UPLOAD_ERROR': // 文件上传出错
          return dataAxios;
        case 'UNKOWN-ERROR':
          // [ 示例 ] 其它和后台约定的 code
          errorCreate(`${dataAxios.msg}`);
          console.log(code + ' : ' + response.config.url);
          break;
        default:
          // 不是正确的 code
          errorCreate(`${dataAxios.msg}`);
          console.log(code + ' : ' + response.config.url);
          break;
      }
    }
  },
  error => {
    if (error && error.response) {
      if (error.response.data && error.response.data.msg) {
        error.message = `${error.response.data.msg}`;
      } else {
        switch (error.response.status) {
          case 400:
            error.message = '请求错误。';
            break;
          case 401:
            error.message = '未授权，请登录。';
            break;
          case 403:
            error.message = '拒绝访问。';
            break;
          case 404:
            error.message = `请求地址出错: ${error.response.config.url}`;
            break;
          case 408:
            error.message = '请求超时。';
            break;
          case 500:
            error.message = '服务器内部错误。';
            break;
          case 501:
            error.message = '服务未实现。';
            break;
          case 502:
            error.message = '网关错误。';
            break;
          case 503:
            error.message = '服务不可用。';
            break;
          case 504:
            error.message = '网关超时。';
            break;
          case 505:
            error.message = 'HTTP版本不受支持。';
            break;
          default:
            break;
        }
      }
    }
    errorLog(error);
    return Promise.reject(error);
  }
);

export default service;
