import request from '@/plugin/axios';

const baseUrl = process.env.VUE_APP_MONITOR_API;

/**
 * 巡检报告
 * @returns {AxiosPromise}
 */
export function inspectReport(tomcatId) {
  return request({
    url: baseUrl + '/inspection/report/detail',
    method: 'get',
    params: {
      tomcatId: tomcatId,
    },
    timeout: 10000,
  });
}

/**
 * 获取监控数据库的用户名和密码
 * @returns {AxiosPromise}
 */
export function getOracleConfig(tomcatId) {
  return request({
    url: baseUrl + '/upgrade/query/oracle/config',
    method: 'get',
    params: {
      tomcatId: tomcatId,
    },
    timeout: 10000,
  });
}

/**
 * 保存监控数据库的用户名和密码
 * @returns {AxiosPromise}
 */
export function saveOracleConfig(tomcatId, user, password) {
  return request({
    url: baseUrl + '/upgrade/save/oracle/config',
    method: 'post',
    data: {
      tomcatId: tomcatId,
      user: user,
      password: password,
    },
    timeout: 10000,
  });
}

/**
 * 锁表查询
 * @returns {AxiosPromise}
 */
export function queryLockTable(tomcatId) {
  return request({
    url: baseUrl + '/info/query/locktable/info',
    method: 'get',
    params: {
      tomcatId: tomcatId,
    },
    timeout: 10000,
  });
}

/**
 * 解锁
 * @returns {AxiosPromise}
 */
export function deleteLock(tomcatId, lockTableVos) {
  return request({
    url: baseUrl + '/info/delete/lock',
    method: 'post',
    data: {
      tomcatId: tomcatId,
      lockTableVos: lockTableVos,
    },
    timeout: 10000,
  });
}
