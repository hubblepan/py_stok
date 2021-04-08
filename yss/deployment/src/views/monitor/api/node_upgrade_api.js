import request from '@/plugin/axios';

const baseUrl = process.env.VUE_APP_MONITOR_API;

/**
 * 获取指定节点可升级tomcat信息
 */
export function getTomcatInfoOfNode(nodeId) {
  return request({
    url: baseUrl + '/upgrade/assign/node/tomcat',
    method: 'get',
    params: {
      nodeId: nodeId,
    },
    timeout: 10000,
  });
}

/**
 * 上传升级包
 */
export function uploadZip(data) {
  return request({
    url: baseUrl + '/upgrade/upload',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: data,
    timeout: 360000,
  });
}

/**
 * 单机上传升级包
 */
export function uploadZipForSingle(data) {
  return request({
    url: baseUrl + '/upgrade/select/node/file',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: data,
    timeout: 360000,
  });
}

/**
 * 节点上传升级包
 */
export function uploadZipForNode(data) {
  return request({
    url: baseUrl + '/upgrade/select/node/file',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: data,
    timeout: 360000,
  });
}

/**
 * 获取指定节点所有zip升级包路径
 */
export function getUpgradeFileOfNode(nodeId, dir) {
  return request({
    url: baseUrl + '/upgrade/assign/node/all/upgrade/package',
    method: 'get',
    params: {
      nodeId: nodeId,
      dir: dir,
    },
    timeout: 10000,
  });
}

/**
 * 获取服务端节点指定目录下的zip升级包信息
 */
export function getUpgradeFileOfServer(dir) {
  return request({
    url: baseUrl + '/upgrade/dir/upgrade/package',
    method: 'get',
    params: {
      dir: dir,
    },
    timeout: 10000,
  });
}

/**
 * 获取指定节点默认升级包路径
 */
export function getDefaultDirOfNode(nodeId) {
  return request({
    url: baseUrl + '/upgrade/default/package',
    method: 'get',
    params: {
      nodeId: nodeId,
    },
    timeout: 10000,
  });
}

/**
 * 获取服务端节点默认升级包路径
 */
export function getDefaultDirOfServer() {
  return request({
    url: baseUrl + '/upgrade/server/default/package',
    method: 'get',
    timeout: 10000,
  });
}

/**
 * 获取服务器所有zip升级包信息
 */
export function getUpgradeRemoteZipInfo(dir) {
  return request({
    url: baseUrl + '/upgrade/all/upgrade/package/info?dir=' + dir,
    method: 'get',
    timeout: 10000,
  });
}

/**
 * 上传多个升级包
 */
export function uploadZipFile(data) {
  return request({
    url: baseUrl + '/upgrade/upload/multi/package',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: data,
    timeout: 360000,
  });
}

/**
 * 文件对比
 */
export function getCompareTree(tomcatIds) {
  return request({
    url: baseUrl + '/upgrade/files/modify/compare/tree',
    method: 'post',
    data: tomcatIds,
    timeout: 120000,
  });
}

/**
 * 执行升级
 */
export function upgrade(tomcatIds, force) {
  return request({
    url: baseUrl + '/upgrade/upgrade/execute',
    method: 'post',
    data: tomcatIds,
    params: {
      force: force,
    },
    timeout: 120000,
  });
}

/**
 * 获取备份包信息
 */
export function getBackupOfAll(tomcatIds) {
  return request({
    url: baseUrl + '/upgrade/backup/package',
    method: 'post',
    data: tomcatIds,
    timeout: 120000,
  });
}

/**
 * 执行回退
 */
export function rollBack(backupPackageVos) {
  return request({
    url: baseUrl + '/upgrade/roll/back',
    method: 'post',
    data: backupPackageVos,
    timeout: 120000,
  });
}

/**
 * 获取升级历史信息
 */
export function upgradeHistoryInfo(tomcatId) {
  return request({
    url: baseUrl + '/upgrade/history/info?tomcatId=' + tomcatId,
    method: 'get',
  });
}

/**
 * 默认的socket连接信息
 */
export function defaultConnectInfo() {
  return request({
    url: baseUrl + '/upgrade/connect/info',
    method: 'get',
  });
}

/**
 * 获取版本目录树
 */
export function getVersionTree(tomcatId, assignDir) {
  return request({
    url: baseUrl + '/upgrade/version/dir/tree',
    method: 'get',
    params: {
      tomcatId: tomcatId,
      assignDir: assignDir,
    },
    timeout: 10000,
  });
}

/**
 * 获取服务端的版本目录树
 */
export function getServerVersionTree(assignDir) {
  return request({
    url: baseUrl + '/upgrade/server/version/dir/tree',
    method: 'get',
    params: {
      assignDir: assignDir,
    },
    timeout: 10000,
  });
}

export function getAllTomcatOfUpgrade() {
  return request({
    url: baseUrl + '/upgrade/all/node/tomcat/config',
    method: 'get',
    timeout: 40000,
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
