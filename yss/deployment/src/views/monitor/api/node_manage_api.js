import request from '@/plugin/axios';

const baseUrl = process.env.VUE_APP_MONITOR_API;

/**
 * 创建节点
 *
 */
export function createNode({name, ip, sshAccount, sshPassword, sshPort, installingAgent, agentDir}) {
  return request({
    url: baseUrl + '/node/create',
    method: 'post',
    data: {
      name: name,
      ip: ip,
      sshAccount: sshAccount,
      sshPassword: sshPassword,
      sshPort: sshPort,
      installingAgent: installingAgent,
      agentDir: agentDir,
    },
    timeout: 300000,
  });
}

/**
 * 修改节点
 *
 */
export function updateNode({name, ip, sshAccount, sshPassword, sshPort, id}) {
  return request({
    url: baseUrl + '/node/update',
    method: 'post',
    data: {
      name: name,
      ip: ip,
      sshAccount: sshAccount,
      sshPassword: sshPassword,
      sshPort: sshPort,
      id: id,
    },
    timeout: 10000,
  });
}

/**
 * 节点列表
 * result list的 agentStatus: noDeploy:未部署、down：未启动、up：正常
 */
export function listNode() {
  return request({
    url: baseUrl + '/node/list',
    method: 'get',
    timeout: 10000,
  });
}

/**
 * 部署代理端
 *
 */
export function deployAgent(nodeId) {
  return request({
    url: baseUrl + '/node/deploy/agent',
    method: 'get',
    params: {
      nodeId: nodeId,
    },
    timeout: 120000,
  });
}

/**
 * 启动代理端
 *
 */
export function startAgent(nodeId) {
  return request({
    url: baseUrl + '/node/start/agent',
    method: 'get',
    params: {
      nodeId: nodeId,
    },
    timeout: 120000,
  });
}

/**
 * 删除代理端
 *
 */
export function deleteAgent(nodeId) {
  return request({
    url: baseUrl + '/node/delete/agent',
    method: 'get',
    params: {
      nodeId: nodeId,
    },
    timeout: 120000,
  });
}

export function terminalInfo() {
  return request({
    url: baseUrl + '/node/connect/info',
    method: 'post',
    timeout: 10000,
  });
}

/**
 * 部署代理端
 *
 */
export function reDeployAgent(nodeId) {
  return request({
    url: baseUrl + '/node/redeploy/agent',
    method: 'get',
    params: {
      nodeId: nodeId,
    },
    timeout: 120000,
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
