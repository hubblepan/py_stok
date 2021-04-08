import request from '@/plugin/axios';

const baseUrl = process.env.VUE_APP_TOOLS_API;

/**
 * 获取tomcat服务器列表
 *
 */
export function getTomcatInfo() {
  return request({
    url: baseUrl + '/monitor/all/tomcat/config',
    method: 'get',
    params: {},
    timeout: 60000,
  });
}

/**
 * 获取所有war目录
 */
export function getWarsInfo() {
  return request({
    url: baseUrl + '/monitor/all/wars/info',
    method: 'get',
    params: {},
  });
}

/**
 * 获取tomcat默认目录
 */
export function getTomcatDefaultDir() {
  return request({
    url: baseUrl + '/monitor/tomcat/default/dir',
    method: 'get',
    params: {},
  });
}

/**
 * 获取服务器上所有license 路径
 *
 */
export function getAllLicense(tomcatDir) {
  return request({
    url: baseUrl + '/monitor/all/license/path',
    method: 'get',
    params: {
      tomcatDir,
    },
  });
}

/**
 * 获取当前license 路径
 *
 */
export function getCurrentLicense(tomcatDir) {
  return request({
    url: baseUrl + '/monitor/license/info',
    method: 'get',
    params: {
      tomcatDir,
    },
  });
}

/**
 * 获取注册中心配置
 *
 */
export function getRegistryInfo(tomcatDir) {
  return request({
    url: baseUrl + '/monitor/registry/info',
    method: 'get',
    params: {
      tomcatDir,
    },
  });
}

/**
 * 保存注册中心配置
 *
 */
export function saveRegistryInfo(tomcatDir, tomcatConfig) {
  tomcatConfig.tomcatDir = tomcatDir;
  return request({
    url: baseUrl + '/monitor/registry/info/save',
    method: 'post',
    data: tomcatConfig,
  });
}

/**
 * 获取当前tomcat配置
 *
 */
export function getTomcatConfig(tomcatDir) {
  return request({
    url: baseUrl + '/monitor/tomcat/config?tomcatDir=' + tomcatDir,
    method: 'get',
  });
}

/**
 * 上传tomcat的zip包
 */
export function addTomcat(data) {
  return request({
    url: baseUrl + '/monitor/add/tomcat',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: data,
  });
}

/**
 * 上传文件
 */
export function uploadFile(data) {
  return request({
    url: baseUrl + '/monitor/upload',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: data,
    timeout: 60000,
  });
}

/**
 * 保存当前tomcat配置
 *
 */
export function saveTomcatConfig(tomcatDir, tomcatConfig) {
  tomcatConfig.tomcatDir = tomcatDir;
  return request({
    url: baseUrl + '/monitor/tomcat/config/save',
    method: 'post',
    data: tomcatConfig,
  });
}

/**
 * 获取数据库配置
 */
export function getDataBaseSet(tomcatDir) {
  return request({
    url: baseUrl + '/monitor/db/config?tomcatDir=' + tomcatDir,
    method: 'get',
  });
}

/**
 * 保存数据库配置
 */
export function saveDataBaseSet(tomcatDir, dbConfig) {
  dbConfig.tomcatDir = tomcatDir;
  return request({
    url: baseUrl + '/monitor/db/info/save',
    method: 'post',
    data: dbConfig,
  });
}

/**
 * 获取消息总线
 */
export function getMsgSet(tomcatDir) {
  return request({
    url: baseUrl + '/monitor/mq/config?tomcatDir=' + tomcatDir,
    method: 'get',
  });
}

/**
 * 保存消息总线配置
 */
export function saveMsgSet(tomcatDir, dbConfig) {
  dbConfig.tomcatDir = tomcatDir;
  return request({
    url: baseUrl + '/monitor/mq/info/save',
    method: 'post',
    data: dbConfig,
  });
}

/**
 * 预览所有配置
 */
export function previewAll(tomcatDir) {
  return request({
    url: baseUrl + '/monitor/preview/all/config?tomcatDir=' + tomcatDir,
    method: 'get',
    params: {},
  });
}

/**
 * 进行部署
 */
export function executeDeploy(tomcatDir) {
  return request({
    url: baseUrl + '/monitor/execute/deploy?tomcatDir=' + tomcatDir,
    method: 'get',
    params: {},
    timeout: 360000,
  });
}

/**
 * 下载
 */
export function download() {
  return request({
    url: baseUrl + '/monitor/download/monitoringdata',
    method: 'get',
    // responseType: 'blob',
    params: {},
  });
}

/**
 * 获取日志配置
 *
 */
export function getLogConfig(tomcatDir) {
  console.log('aaaaa');
  return request({
    url: baseUrl + '/monitor/log/config',
    method: 'get',
    params: {
      tomcatDir,
    },
  });
}

/**
 * 保存日志配置
 *
 */
export function saveLogConfig(tomcatDir, path) {
  return request({
    url: baseUrl + '/monitor/log/config/path/save',
    method: 'post',
    data: {path: path, tomcatDir: tomcatDir},
  });
}
