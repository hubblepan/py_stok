/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { history } from 'umi';
import AppContext from '@/utils/AppContext';
import MsgBox from './MsgBox';
import queryString from 'query-string';


/** content-type */
export const ContentType = {
  JSON: 'application/json; charset=UTF-8',
  FORM: 'application/x-www-form-urlencoded; charset=UTF-8',
  FORM_DATA: 'multipart/form-data; charset=UTF-8',
};

const codeMessage = {
  200: '请求成功',
  201: '新建或修改数据成功',
  202: '服务器已接受请求，但尚未处理',
  204: '删除数据成功',
  400: '请求参数有误',
  401: '用户没有权限（令牌、用户名、密码错误）',
  403: '用户得到授权，但是访问是被禁止的',
  404: '请求资源不存在',
  406: '请求的资源的内容特性无法满足请求头中的条件',
  408: '请求超时',
  410: '请求的资源被永久删除，且不会再得到的',
  422: '当创建一个对象时，发生一个验证错误',
  500: '服务器发生错误，请检查服务器',
  501: '服务未实现',
  502: '网络连接错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网络连接超时',
  505: 'HTTP版本不受支持',
};

/**
 * 异常处理程序
 */
const errorHandler = (error) => {
  const { response, type } = error;

  if (type === 'Timeout') {
    MsgBox.error({
      title: '网络连接超时',
      content: '网络连接超时',
    });
    return error;
  }

  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    MsgBox.error({
      title: `请求错误 ${status}: `,
      content: errorText,
    });
  } else if (!response) {
    MsgBox.error({
      title: '网络异常',
      content: '您的网络发生异常，无法连接服务器',
    });
  }

  return response;
};

/**
 * 配置request请求时的默认参数
 */
const fetchInstance = extend({
  // 默认错误处理
  errorHandler,
  // charset: 'utf-8',
  /** 允许携带cookies */
  credentials: 'include',
  /** 允许跨域 */
  mode: 'cors',
  timeout: 60000,
  cache: 'no-cache',
  headers: {
    Accept: ContentType.JSON,
    'Content-Type': ContentType.JSON,
    CLIENT: 'WEB',
    Authentication: '',
    USER: '',
    POST: '',
  },
});

/**
 * 请求拦截器
 */
fetchInstance.interceptors.request.use((url, options) => {
  const config = { ...options };
  config.headers.Authentication = AppContext.getToken() ? AppContext.getToken() : '';
  config.headers.USER = AppContext.getUserCode();
  config.headers.POST = AppContext.getPost();
  if (AppContext.getUser()) {
    config.headers.AUTHORG = AppContext.getUser().authOrgCode;
  }
  // console.log(`config.headers.Authentication=${ config.headers.Authentication }`);
  // console.log(`getToken=${ AppContext.getToken() }`);

  // options = merge(defaultOptions, options);

  // 参数带上用户和岗位信息
  /**
  const userInfo = {};
  userInfo.userCode = AppContext.session.get('userCode');
  userInfo.postCodes = AppContext.session.get('postCodes');
  if (userInfo.userCode && userInfo.userCode !== '') {
    if (options.method === 'get') {
      config.params = Object.assign(options.params, userInfo);
    }
    if (options.method === 'post') {
      config.params = Object.assign(options.params, userInfo);
    }
  }
  * */

  if (options['Content-Type']) {
    // console.log(`config1=${ JSON.stringify(config) }`);
    config.headers['Content-Type'] = options['Content-Type'];
    // console.log(`config2=${ JSON.stringify(config) }`);
    //options.data = queryString(options.data);
  }

  return { url, options };
});

/**
 * 响应拦截器
 */
fetchInstance.interceptors.response.use(async (response, options) => {
  const contentType = response.headers.get('Content-Type');
  if (contentType.indexOf('application/json') > -1) {
    response
      .clone()
      .json()
      .then((data) => {
        // token无效，则跳转到登录页面
        if (data.code === '2100') {
          AppContext.removeUser()
          AppContext.removeUserCode();
          AppContext.removeToken();
          AppContext.removePost();
          AppContext.removeRights();
          // data.data = {};
          history.push('/login');
          return;
        }else if (data.code === '201') {
          MsgBox.success({ title: '信息', content: data.msg });
        } else if (!data.success) {
          // MsgBox.error({ title: '错误', content: data.msg || '操作失败' });
        }
      });
  }
  return response;
});
export default fetchInstance;
