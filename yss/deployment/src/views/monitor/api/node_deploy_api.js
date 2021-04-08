import request from '@/plugin/axios';

const baseUrl = process.env.VUE_APP_MONITOR_API;

/**
 * 获取部署缓存
 * @returns {AxiosPromise}
 */
export function deployCache() {
  return request({
    url: baseUrl + '/deployment/node/latest/tomcat/config',
    method: 'get',
    timeout: 10000,
  });
}

/**
 * 创建Tomcat
 *
 */
export function addTomcat(data) {
  return request({
    url: baseUrl + '/deployment/add/tomcat',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: data,
    timeout: 360000,
  });
}

/**
 * 获取默认的Tomcat路径
 * @param nodeId
 * @returns {AxiosPromise}
 */
export function defaultTomcatDir(nodeId) {
  return request({
    url: baseUrl + '/deployment/tomcat/default/dir',
    method: 'get',
    params: {nodeId: nodeId},
    timeout: 10000,
  });
}

/**
 * 节点的Tomcat列表
 */
export function listNodeTomcat(nodeId) {
  return request({
    url: baseUrl + '/deployment/assign/node/tomcat/config',
    method: 'get',
    params: {
      nodeId: nodeId,
    },
    timeout: 10000,
  });
}

/**
 *  服务器所在节点的war包列表
 */
export function listWarOfServer() {
  return request({
    url: baseUrl + '/deployment/server/wars/info',
    method: 'get',
    timeout: 10000,
  });
}

/**
 * 部署-> 上传war包 和 lisence文件
 */
export function uploadWar(data) {
  return request({
    url: baseUrl + '/deployment/upload',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: data,
    timeout: 360000,
  });
}

/**
 * 选择或上传到指定节点上的war或license文件
 */
export function uploadNodeWar(data) {
  return request({
    url: baseUrl + '/deployment/select/node/file',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: data,
    timeout: 360000,
  });
}

/**
 * 获取Tomcat配置
 * @param tomcatIds
 * @returns {AxiosPromise}
 */
export function getTomcatConfig(tomcatIds) {
  return request({
    url: baseUrl + '/deployment/tomcat/config',
    method: 'post',
    data: tomcatIds,
    timeout: 10000,
  });
}

/**
 * 保存Tomcat配置
 * @param tomcatConfigs
 * @returns {AxiosPromise}
 */
export function saveTomcatConfig(tomcatConfigs) {
  return request({
    url: baseUrl + '/deployment/tomcat/config/save',
    method: 'post',
    data: tomcatConfigs,
    timeout: 10000,
  });
}

/**
 * 获取license配置
 * @param tomcatIds
 * @returns {AxiosPromise}
 */
export function getLicenseConfig(tomcatIds) {
  return request({
    url: baseUrl + '/deployment/license/info',
    method: 'post',
    data: tomcatIds,
    timeout: 10000,
  });
}

/**
 * 获取指定节点的lisence列表
 * @param nodeId
 * @returns {AxiosPromise}
 */
export function listLicenseOfNode(nodeId) {
  return request({
    url: baseUrl + '/deployment/assign/license/info',
    method: 'get',
    params: {
      nodeId: nodeId,
    },
    timeout: 10000,
  });
}

/**
 * 获取消息总线配置
 * @param tomcatIds
 * @returns {AxiosPromise}
 */
export function getMQConfig(tomcatIds) {
  return request({
    url: baseUrl + '/deployment/mq/config',
    method: 'post',
    data: tomcatIds,
    timeout: 10000,
  });
}

/**
 * 保存消息总线配置
 * @param mqConfigs
 * @returns {AxiosPromise}
 */
export function saveMQConfig(mqConfigs) {
  return request({
    url: baseUrl + '/deployment/mq/info/save',
    method: 'post',
    data: mqConfigs,
    timeout: 10000,
  });
}

/**
 * 获取注册中心配置
 * @param tomcatIds
 * @returns {AxiosPromise}
 */
export function getRegistryConfig(tomcatIds) {
  return request({
    url: baseUrl + '/deployment/registry/info',
    method: 'post',
    data: tomcatIds,
    timeout: 10000,
  });
}

/**
 * 保存注册中心配置
 * @param registryConfigs
 * @returns {AxiosPromise}
 */
export function saveRegistryConfig(registryConfigs) {
  return request({
    url: baseUrl + '/deployment/registry/info/save',
    method: 'post',
    data: registryConfigs,
    timeout: 10000,
  });
}

/**
 * 获取数据库配置
 * @param tomcatIds
 * @returns {AxiosPromise}
 */
export function getDBConfig(tomcatIds) {
  return request({
    url: baseUrl + '/deployment/db/config',
    method: 'post',
    data: tomcatIds,
    timeout: 10000,
  });
}

/**
 * 保存数据库配置
 * @param dbConfigs
 * @returns {AxiosPromise}
 */
export function saveDBConfig(dbConfigs) {
  return request({
    url: baseUrl + '/deployment/db/info/save',
    method: 'post',
    data: dbConfigs,
    timeout: 10000,
  });
}

/**
 * 获取日志配置
 * @param tomcatIds
 * @returns {AxiosPromise}
 */
export function getLogConfig(tomcatIds) {
  return request({
    url: baseUrl + '/deployment/log/config',
    method: 'post',
    data: tomcatIds,
    timeout: 10000,
  });
}

/**
 * 保存日志配置
 * @param logConfigs
 * @returns {AxiosPromise}
 */
export function saveLogConfig(logConfigs) {
  return request({
    url: baseUrl + '/deployment/log/info/save',
    method: 'post',
    data: logConfigs,
    timeout: 10000,
  });
}

export function previewAllConfig(tomcatIds) {
  return request({
    url: baseUrl + '/deployment/preview/all/config',
    method: 'post',
    data: tomcatIds,
    timeout: 20000,
  });
}

export function connectInfo(tomcatIds) {
  return request({
    url: baseUrl + '/deployment/connect/info',
    method: 'post',
    data: tomcatIds,
    timeout: 10000,
  });
}

export function deployAll(tomcatIds) {
  return request({
    url: baseUrl + '/deployment/execute/deploy',
    method: 'post',
    data: tomcatIds,
    timeout: 240000,
  });
}

export function deploySingle(tomcatIds) {
  return request({
    url: baseUrl + '/deployment/execute/single/deploy',
    method: 'post',
    data: tomcatIds,
    timeout: 240000,
  });
}

export function getWarListOfNode(nodeId) {
  return request({
    url: baseUrl + '/deployment/assign/wars/info',
    method: 'get',
    params: {
      nodeId: nodeId,
    },
    timeout: 10000,
  });
}

export function updateTomcatName(tomcatInfo) {
  return request({
    url: baseUrl + '/deployment/update/tomcatname',
    method: 'post',
    data: tomcatInfo,
    timeout: 10000,
  });
}

export function getAllTomcatOfDeploy() {
  return request({
    url: baseUrl + '/upgrade/all/node/tomcat/config',
    method: 'get',
    timeout: 40000,
  });
}

export function restartTomcat(tomcatId) {
  return request({
    url: baseUrl + '/deployment/boot/tomcat',
    method: 'get',
    params: {
      tomcatId: tomcatId,
    },
    timeout: 40000,
  });
}

/**
 * 获取指定节点默认部署包路径
 */
export function getDefaultWarDirOfNode(nodeId) {
  return request({
    url: baseUrl + '/deployment/default/wars/paths',
    method: 'get',
    params: {
      nodeId: nodeId,
    },
    timeout: 10000,
  });
}

/**
 * 获取服务端节点默认部署包路径
 */
export function getDefaultWarDirOfServer() {
  return request({
    url: baseUrl + '/deployment/default/wars/paths?nodeId=',
    method: 'get',
    timeout: 10000,
  });
}

/**
 * 获取服务端节点指定目录下的部署包信息
 */
export function getWarFileOfServer(dir) {
  return request({
    url: baseUrl + '/deployment/assign/wars/info',
    method: 'get',
    params: {
      dir: dir,
      nodeId: '',
    },
    timeout: 10000,
  });
}

/**
 * 获取指定节点所有部署包路径
 */
export function getWarFileOfNode(nodeId, dir) {
  return request({
    url: baseUrl + '/deployment/assign/wars/info',
    method: 'get',
    params: {
      nodeId: nodeId,
      dir: dir,
    },
    timeout: 10000,
  });
}

export function getUserConfig(nodeId) {
  return request({
    url: baseUrl + '/node/default/user/config',
    method: 'get',
    params: {
      nodeId: nodeId,
    },
    timeout: 5000,
  });
}
