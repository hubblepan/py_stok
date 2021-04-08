import request from '@/plugin/axios';
const baseUrl = process.env.VUE_APP_TOOLS_API;
/**
 *  获取默认的补丁包合升级包路径
 */
export function getDefaultPackageDir() {
  return request({
    url: baseUrl + '/monitor/version/upgrade/default/package',
    method: 'get',
    timeout: 10000,
  });
}
/**
 * 获取服务器所有zip升级包信息
 */
export function getUpgradeRemoteZipInfo(dir) {
  return request({
    url: baseUrl + '/monitor/version/upgrade/all/upgrade/package/info?dir=' + dir,
    method: 'get',
    timeout: 10000,
  });
}
/**
 * 上传多个升级包
 */
export function uploadZipFile(data) {
  return request({
    url: baseUrl + '/monitor/version/upgrade/upload/multi/package',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: data,
    timeout: 360000,
  });
}

/**
 * 获取socket连接信息
 */
export function consoleConnectInfo() {
  return request({
    url: baseUrl + '/monitor/version/upgrade/connect/info',
    method: 'get',
  });
}
