import axios from 'axios';
import AppContext from './AppContext';
import MsgBox from './MsgBox';

const BASE_URL = ''; // process.env.BASE_API ? process.env.BASE_API : '';

// content-type
const ContentType = {
  JSON: 'application/json; charset=UTF-8',
  FORM: 'application/x-www-form-urlencoded; charset=UTF-8',
  FORM_DATA: 'multipart/form-data; charset=UTF-8',
};

// Http method
const HttpMethod = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
};

const codeMessage = {
  200: '服务器成功返回请求的数据',
  201: '新建或修改数据成功',
  202: '一个请求已经进入后台排队（异步任务）',
  204: '删除数据成功',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作',
  401: '用户没有权限（令牌、用户名、密码错误）',
  403: '用户得到授权，但是访问是被禁止的',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作',
  406: '请求的格式不可得',
  408: '请求超时',
  410: '请求的资源被永久删除，且不会再得到的',
  422: '当创建一个对象时，发生一个验证错误',
  500: '服务器发生错误，请检查服务器',
  501: '服务未实现',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时',
  505: 'HTTP版本不受支持',
};

/**
 * 异常处理程序
 */
const errorHandler = (error) => {
  const { response } = error;

  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    console.log(`请求错误${url}`);
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
 * 处理返回结果
 * @param response: response
 */
const handleResult = (response) => {
  const { data } = response;

  if (data.code === '201') {
    MsgBox.success({ title: '信息', content: data.message || '操作成功' });
  } else if (!data.success) {
    // MsgBox.error({ title: '错误', content: msg || '操作失败' });
  }

  return data;
};

const handleDefault = (promise) => {
  return promise
    .then((response) => {
      return handleResult(response);
    })
    .catch((error) => {
      return errorHandler(error);
    });
  // return (promise);
};

const getURL = (url) => {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  return `${BASE_URL}${url}`;
};

// const getOptions = method => {
//   let contentType = ContentType.JSON;
//   if (method == 'POST') {
//     contentType = ContentType.FORM;
//   }

//   return {
//     method,
//     cache: 'no-cache',
//     /*允许携带cookies*/
//     credentials: 'include',
//     /*允许跨域**/
//     mode: 'cors',
//     headers: {
//       Accept: ContentType.JSON,
//       'Content-Type': contentType,
//       token: getToken(),
//     },
//   };
// };

// 创建一个 axios 实例
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000, // 请求超时时间
});

// 请求拦截器
axiosInstance.interceptors.request.use((options) => {
  // 在请求发送之前添加Token
  const config = { ...options };
  config.headers.token = AppContext.getToken();
  config.headers.CLIENT = 'WEB';
  return config;
}, errorHandler);

// 响应拦截器
axiosInstance.interceptors.response.use((response) => {
  return handleResult(response);
}, errorHandler);

export default axiosInstance;
// export default {
//   /** request请求
//    * @param options: 请求参数，params为请求条件
//    * @returns Promise<any>
//    */
//   request(url, options = {}) {
//     if (!url) {
//       return Error('请求参数不正确');
//     }

//     if (!options.method) {
//       options.method = HttpMethod.GET;
//     }
//     let defaultOptions = getOptions(options.method);
//     options = Object.assign({}, defaultOptions, options);

//     options.url = getURL(url);

//     return axiosInstance(options);
//   },
//   defaultRequest(url, options = {}) {
//     return handleDefault(this.request(url, options));
//   },

//   /** GET请求
//    * @param url: string
//    * @param options: 请求参数，params为请求条件
//    * @returns Promise<any>
//    */
//   get(url, options) {
//     if (options) {
//       options.method = HttpMethod.GET;
//     } else {
//       options = { method: HttpMethod.GET };
//     }
//     return this.defaultRequest(url, options);
//   },
//   /** DELETE请求
//    * @param url: string
//    * @param options: 请求参数，params为请求条件
//    * @returns Promise<any>
//    */
//   delete(url, options) {
//     if (options) {
//       options.method = HttpMethod.DELETE;
//     } else {
//       options = { method: HttpMethod.DELETE };
//     }
//     return this.defaultRequest(url, options);
//   },

//   /** POST请求
//    * @param url: string
//    * @param options: 请求配置，data为请求数据
//    * @returns Promise<any>
//    */
//   post(url, options) {
//     if (options) {
//       options.method = HttpMethod.POST;
//     } else {
//       options = { method: HttpMethod.POST };
//     }
//     return this.defaultRequest(url, options);
//   },

//   /** PUT请求
//    * @param url: string
//    * @param options: 请求配置，data为请求数据
//    * @returns Promise<any>
//    */
//   put(url, options) {
//     if (options) {
//       options.method = HttpMethod.PUT;
//     } else {
//       options = { method: HttpMethod.PUT };
//     }
//     return this.defaultRequest(url, options);
//   },
//   /** PATCH请求
//    * @param url: string
//    * @param options: 请求配置，data为请求数据
//    * @returns Promise<any>
//    */
//   patch(url, options) {
//     if (options) {
//       options.method = HttpMethod.PATCH;
//     } else {
//       options = { method: HttpMethod.PATCH };
//     }
//     return this.defaultRequest(url, options);
//   },
// };
