import request from '@/plugin/axios';

const baseUrl = process.env.VUE_APP_MONITOR_API;

/**
 * 方案模板列表
 * @returns {AxiosPromise}
 */
export function templateList() {
  return request({
    url: baseUrl + '/microservice/template/list',
    method: 'get',
    timeout: 10000,
  });
}

/**
 * 方案名称是否存在
 * @returns {AxiosPromise}
 */
export function schemeExits(schemeName) {
  return request({
    url: baseUrl + '/microservice/scheme/exist',
    method: 'get',
    timeout: 10000,
    params: {
      schemeName: schemeName,
    },
  });
}

/**
 * 删除方案
 * @param schemeId
 * @param username
 * @param reason
 * @returns {AxiosPromise}
 */
export function deleteScheme(schemeId, username, reason) {
  return request({
    url: baseUrl + '/microservice/scheme/delete',
    method: 'post',
    timeout: 40 * 1000,
    params: {
      schemeId: schemeId,
      username: username,
      reason: reason,
    },
  });
}

export function renameScheme(schemeId, schemeName) {
  return request({
    url: baseUrl + '/microservice/scheme/rename',
    method: 'post',
    timeout: 40 * 1000,
    params: {
      schemeId: schemeId,
      schemeName: schemeName,
    },
  });
}
//
// export function renameScheme() {
//
// }

/**
 * 添加方案
 */
export function addScheme(data) {
  return request({
    url: baseUrl + '/microservice/scheme/add/scheme',
    method: 'post',
    timeout: 100 * 1000,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: data,
    // data: {
    //   name: name,
    //   templateId: templateId,
    //   nodeIds: nodeIds,
    //   enableCluster: enableCluster,
    // },
  });
}

/**
 * 方案列表
 */
export function schemeList() {
  return request({
    url: baseUrl + '/microservice/scheme/list',
    method: 'get',
    timeout: 40 * 1000,
  });
}

/**
 * 方案详情
 */
export function schemeDetail(schemeId) {
  return request({
    url: baseUrl + '/microservice/scheme/detail',
    method: 'post',
    params: {
      schemeId: schemeId,
    },
    timeout: 40 * 1000,
  });
}

/**
 * 上传微服务程序包
 */
export function programUpload(fildData) {
  return request({
    url: baseUrl + '/microservice/program/upload',
    method: 'post',
    timeout: 180 * 1000,
    data: fildData,
  });
}

/**
 * 指定maven 目录来上传
 */
export function programSelectMaven({mvnAddr, account, password}) {
  return request({
    url: baseUrl + '/microservice/program/mvn/sync',
    method: 'post',
    params: {
      mvnAddr: mvnAddr,
      account: account,
      password: password,
    },
    timeout: 400 * 1000,
  });
}

/**
 * 微服务列表
 */
export function programList() {
  return request({
    url: baseUrl + '/microservice/program/list',
    method: 'get',
    timeout: 20 * 1000,
  });
}

/**
 * 微服务详情
 */
export function programDetail(serviceName) {
  return request({
    url: baseUrl + '/microservice/program/detail',
    method: 'get',
    params: {
      serviceName: serviceName,
    },
    timeout: 20 * 1000,
  });
}

/**
 * 配置微服务
 */
export function configInstance(instanceConfigVos) {
  return request({
    url: baseUrl + '/microservice/instance/config',
    method: 'post',
    data: instanceConfigVos,
    timeout: 400 * 1000,
  });
}

export function getInstanceConfig(schemeId, serviceCode, instanceId) {
  return request({
    url: baseUrl + '/microservice/instance/config/list',
    method: 'post',
    params: {
      schemeId: schemeId,
      serviceCode: serviceCode,
      instanceId: instanceId,
    },
    timeout: 10 * 1000,
  });
}

export function getInstanceConfigSingle(schemeId, serviceCode, instanceId) {
  return request({
    url: baseUrl + '/microservice/instance/config/single',
    method: 'post',
    params: {
      schemeId: schemeId,
      serviceCode: serviceCode,
      instanceId: instanceId,
    },
    timeout: 10 * 1000,
  });
}

// 得到消息总线实例列表
export function getMqList(schemeId) {
  return request({
    url: baseUrl + '/microservice/instance/mq/cluster',
    method: 'get',
    params: {
      schemeId: schemeId,
    },
    timeout: 10 * 1000,
  });
}

// 得到redis实例列表
export function getRedisList(schemeId) {
  return request({
    url: baseUrl + '/microservice/instance/redis/cluster',
    method: 'get',
    params: {
      schemeId: schemeId,
    },
    timeout: 10 * 1000,
  });
}

// 得到注册中心实例列表
export function getZkList(schemeId) {
  return request({
    url: baseUrl + '/microservice/instance/zk/cluster',
    method: 'get',
    params: {
      schemeId: schemeId,
    },
    timeout: 10 * 1000,
  });
}

// 得到注册中心实例列表
export function getRegList(schemeId) {
  return request({
    url: baseUrl + '/microservice/instance/eureka/cluster',
    method: 'get',
    params: {
      schemeId: schemeId,
    },
    timeout: 10 * 1000,
  });
}

export function stopInstance(instanceId) {
  return request({
    url: baseUrl + '/microservice/instance/stop/service/instance',
    method: 'post',
    params: {
      instanceId: instanceId,
    },
    timeout: 40 * 1000,
  });
}

export function startService(schemeId, serviceCode) {
  return request({
    url: baseUrl + '/microservice/instance/start/service',
    method: 'post',
    params: {
      schemeId: schemeId,
      serviceCode: serviceCode,
    },
    timeout: 400 * 1000,
  });
}

export function startInstance(schemeId, serviceCode, instanceId) {
  return request({
    url: baseUrl + '/microservice/instance/start/service/instance',
    method: 'post',
    params: {
      schemeId: schemeId,
      serviceCode: serviceCode,
      instanceId: instanceId,
    },
    timeout: 300 * 1000,
  });
}

// 获取高级配置文件列表
export function listAdvanceConfig(serviceCode) {
  return request({
    url: baseUrl + '/microservice/instance/advance/config/list',
    method: 'post',
    params: {
      serviceCode: serviceCode,
    },
    timeout: 20 * 1000,
  });
}

export function getAdvanceConfigContent(instanceId, versionId, filePath) {
  return request({
    url: baseUrl + '/microservice/instance/advance/config/content',
    method: 'post',
    params: {
      instanceId: instanceId,
      versionId: versionId,
      filePath: filePath,
    },
    timeout: 20 * 1000,
  });
}

export function saveAdvanceConfig(instanceId, versionId, filePath, fileContent) {
  return request({
    url: baseUrl + '/microservice/instance/save/advance/config',
    method: 'post',
    data: {
      instanceId: instanceId,
      versionId: versionId,
      filePath: filePath,
      fileContent: fileContent,
    },
    timeout: 20 * 1000,
  });
}

// 获取注册中心类型列表
export function listRegCenterType(serviceCode) {
  return request({
    url: baseUrl + '/microservice/instance/reg/type/list',
    method: 'post',
    params: {
      serviceCode: serviceCode,
    },
    timeout: 20 * 1000,
  });
}

// 获取数据库类型
export function listDbType(serviceCode) {
  return request({
    url: baseUrl + '/microservice/instance/db/type/list',
    method: 'post',
    params: {
      serviceCode: serviceCode,
    },
    timeout: 20 * 1000,
  });
}

// 端口是否可用
export function checkPortUsed(port, serverId, instanceId) {
  return request({
    url: baseUrl + '/microservice/instance/check/port',
    method: 'post',
    params: {
      port: port,
      serverId: serverId,
      instanceId: instanceId,
    },
    timeout: 20 * 1000,
  });
}

export function checkDirPermission(serverId, dir) {
  return request({
    url: baseUrl + '/microservice/instance/check/dir/permission',
    method: 'post',
    params: {
      serverId: serverId,
      dir: dir,
    },
  });
}

export function getTomcatConnectInfo(instanceId) {
  return request({
    url: baseUrl + '/microservice/instance/tomcat/connect/info',
    method: 'post',
    params: {
      instanceId: instanceId,
    },
    timeout: 10 * 1000,
  });
}

// 获取mvn 配置信息
export function getDefaultMavenDir() {
  return request({
    url: baseUrl + '/microservice/program/mvn/config',
    method: 'post',
    timeout: 10 * 1000,
  });
}

export function listLog(startTime, endTime, schemeId) {
  return request({
    url: baseUrl + '/microservice/instance/schemeId/service/log/list',
    method: 'post',
    params: {
      startTime: startTime,
      endTime: endTime,
      schemeId: schemeId,
    },
    timeout: 40 * 1000,
  });
}

export function downloadLog(data) {
  return request({
    url: baseUrl + '/microservice/instance/log/file/download',
    method: 'post',
    data: data,
    responseType: 'blob',
    timeout: 400 * 1000,
  });
}

export function downloadProgram(serviceCode, version) {
  return request({
    url: baseUrl + '/microservice/program/download/install/package',
    method: 'post',
    params: {
      serviceCode: serviceCode,
      version: version,
    },
    responseType: 'blob',
    timeout: 400 * 1000,
  });
}

export function serverInfo() {
  return request({
    url: baseUrl + '/node/connect/info',
    method: 'post',
    timeout: 10000,
  });
}

export function adjustScheme(data) {
  return request({
    url: baseUrl + '/microservice/scheme/adjust/scheme',
    method: 'post',
    timeout: 40 * 1000,
    data: data,
  });
}

export function repairScheme(schemeId, serviceCode) {
  return request({
    url: baseUrl + '/microservice/scheme/add/service/instances',
    method: 'post',
    params: {
      schemeId: schemeId,
      serviceCode: serviceCode,
    },
    timeout: 40 * 1000,
  });
}
export function getMachineCode(ipList) {
  return request({
    url: baseUrl + '/microservice/scheme/get/node/code',
    method: 'post',
    params: {
      nodeIds: ipList.join(',')
    },
    timeout: 40 * 1000,
  });
}
// 外部数据库相关接口
// 保存或更新数据库配置
export function updateExtDbConfig(data) {
  return request({
    url: baseUrl + '/microservice/db/source/config/saveOrUpdate',
    method: 'post',
    data: data,
    timeout: 20 * 1000,
  });
}

// 删除数据库配置
export function deleteExtDbConfig(id) {
  return request({
    url: baseUrl + '/microservice/db/source/config/deleteById',
    method: 'get',
    params: {
      id: id,
    },
    timeout: 20 * 1000,
  });
}

// 根据方案id和 数据库类型 获取列表
export function getExtDbConfigBySchemeIdAndType(schemeId, type) {
  return request({
    url: baseUrl + '/microservice/db/source/config/get/by/schemeId/type',
    method: 'get',
    params: {
      schemeId: schemeId,
      type: type,
    },
    timeout: 20 * 1000,
  });
}

// 根据方案id获取列表
export function getExtDbConfigBySchemeId(schemeId) {
  return request({
    url: baseUrl + '/microservice/db/source/config/get/by/schemeId',
    method: 'get',
    params: {
      schemeId: schemeId,
    },
    timeout: 20 * 1000,
  });
}

// 根据实例id获取列表
export function getExtDbConfigById(id) {
  return request({
    url: baseUrl + '/microservice/db/source/config/get/by/id',
    method: 'get',
    params: {
      id: id,
    },
    timeout: 20 * 1000,
  });
}

// 外部服务相关api
// 根据方案id获取列表
export function getExtServiceBySchemeId(schemeId) {
  return request({
    url: baseUrl + '/microservice/instance/get/outside/service/addr/by/schemeId',
    method: 'post',
    params: {
      schemeId: schemeId,
    },
    timeout: 20 * 1000,
  });
}

export function saveExtService(data) {
  return request({
    url: baseUrl + '/microservice/instance/save/outside/service/addr',
    method: 'post',
    data: data,
    timeout: 100 * 1000,
  });
}

// 扩容节点
export function expandSchemeNode(data) {
  return request({
    url: baseUrl + '/microservice/scheme/scheme/node/expansion',
    method: 'post',
    data: data,
    timeout: 100 * 1000,
  });
}

// 扩容实例
export function expandServiceNode(instanceNum, schemeId, serviceCode) {
  return request({
    url: baseUrl + '/microservice/scheme/scheme/service/expansion',
    method: 'post',
    params: {
      instanceNum: instanceNum,
      schemeId: schemeId,
      serviceCode: serviceCode,
    },
    timeout: 100 * 1000,
  });
}

export function listScalableService() {
  return request({
    url: baseUrl + '/microservice/scheme/fetch/scalable/service/list',
    method: 'get',
    timeout: 40 * 1000,
  });
}

export function geNodeIps(nodeId) {
  return request({
    url: baseUrl + '/node/get/node/all/ips',
    method: 'post',
    params: {
      nodeId: nodeId,
    },
    timeout: 40 * 1000,
  });
}

export function adjustNodeIp(node) {
  return request({
    url: baseUrl + '/node/update/node/ip',
    method: 'post',
    data: node,
    timeout: 40 * 1000,
  });
}

export function changeExtServiceStatus(data) {
  return request({
    url: baseUrl + '/microservice/instance/adjust/outside/service/status',
    method: 'post',
    data: data,
    timeout: 20 * 1000,
  });
}

export function listInstanceVersionConfig(instanceId) {
  return request({
    url: baseUrl + '/instance/config/version/list',
    method: 'post',
    params: {
      instanceId: instanceId,
    },
    timeout: 40 * 1000,
  });
}

export function saveInstanceVersionConfig(data) {
  return request({
    url: baseUrl + '/instance/config/version/save',
    method: 'post',
    data: data,
    timeout: 40 * 1000,
  });
}

export function compareInstanceVersionConfig(oldConfigVersionId, data) {
  return request({
    url: baseUrl + '/instance/config/version/compare',
    method: 'post',
    data: data,
    params: {
      oldConfigVersionId: oldConfigVersionId,
    },
    timeout: 100 * 1000,
  });
}

export function deleteInstanceVersionConfig(id) {
  return request({
    url: baseUrl + '/instance/config/version/deleteById',
    method: 'get',
    params: {
      id: id,
    },
    timeout: 40 * 1000,
  });
}

export function switchInstanceVersionConfig(configVersionId, instanceId) {
  return request({
    url: baseUrl + '/instance/config/version/switch/config/version',
    method: 'post',
    params: {
      configVersionId: configVersionId,
      instanceId: instanceId,
    },
    timeout: 40 * 1000,
  });
}

export function switchInstanceDbVersionConfig(configVersionId, instanceId) {
  return request({
    url: baseUrl + '/instance/config/version/switch/db/config/version',
    method: 'post',
    params: {
      configVersionId: configVersionId,
      instanceId: instanceId,
    },
    timeout: 40 * 1000,
  });
}

export function switchInstanceCommonServiceVersionConfig(configVersionId, instanceId) {
  return request({
    url: baseUrl + '/instance/config/version/switch/common/service/config/version',
    method: 'post',
    params: {
      configVersionId: configVersionId,
      instanceId: instanceId,
    },
    timeout: 40 * 1000,
  });
}
