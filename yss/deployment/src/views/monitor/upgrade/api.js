import request from '@/plugin/axios';

const baseUrl = process.env.VUE_APP_TOOLS_API;

/**
 * 获取文件修改对照表
 */
export function getCompareTree(tomcatDir) {
  return request({
    url: baseUrl + '/monitor/version/upgrade/files/modify/compare/tree?tomcatDir=' + tomcatDir,
    method: 'get',
    timeout: 360000,
  });
}

/**
 * 获取所有的可升级tomcat信息
 */
export function getUpgradeTomcat() {
  return request({
    url: baseUrl + '/monitor/version/upgrade/all/tomcat',
    method: 'get',
    timeout: 10000,
  });
}

/**
 * 执行版本回退
 */
export function upgradeRollback(tomcatDir, dateTime) {
  return request({
    url: baseUrl + '/monitor/version/upgrade/roll/back?tomcatDir=' + tomcatDir + '&dateTime=' + dateTime,
    method: 'get',
    timeout: 360000,
  });
}

/**
 * 获取服务器所有zip升级包
 */
export function getUpgradeRemoteZip() {
  return request({
    url: baseUrl + '/monitor/version/upgrade/all/upgrade/package',
    method: 'get',
    timeout: 10000,
  });
}

/**
 * 获取tomcat运行状态
 */
export function getTomcatStatus(tomcatDir) {
  return request({
    url: baseUrl + '/monitor/tomcat/status?tomcatDir=' + tomcatDir,
    method: 'get',

  });
}

/**
 * 执行升级
 */
export function execute(tomcatDir, force) {
  return request({
    url: baseUrl + '/monitor/version/upgrade/upgrade/execute?tomcatDir=' + tomcatDir + '&force=' + force,
    method: 'get',
    data: tomcatDir,
    timeout: 360000,
  });
}

/**
 * 获取socket连接信息
 */
export function upgradeConnectInfo(tomcatDir) {
  return request({
    url: baseUrl + '/monitor/version/upgrade/connect/info?tomcatDir=' + tomcatDir,
    method: 'get',
  });
}

/**
 * 上传zip文件
 */
export function uploadZipFile(data) {
  return request({
    url: baseUrl + '/monitor/version/upgrade/upload',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: data,
    timeout: 360000,
  });
}

/**
 * 获取备份包信息
 * @param tomcatDir
 * @returns {AxiosPromise}
 */
export function backupPackage(tomcatDir) {
  return request({
    url: baseUrl + '/monitor/version/upgrade/backup/package?tomcatDir=' + tomcatDir,
    method: 'get',
  });
}

/**
 * 获取升级历史信息
 */
export function upgradeHistoryInfo(tomcatDir) {
  return request({
    url: baseUrl + '/monitor/version/upgrade/history/info?tomcatDir=' + tomcatDir,
    method: 'get',
  });
}

/**
 * 根据指定目录获取zip升级包
 */
export function getUpgradePackageByDir(dir) {
  return request({
    url: baseUrl + '/monitor/version/upgrade/dir/upgrade/package?dir=' + dir,
    method: 'get',
    timeout: 10000,
  });
}

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
