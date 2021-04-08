import request from '@/plugin/axios';
import base from '@d2-projects/d2-crud/src/mixin/base';
import qs from 'qs';
import en from '@/lang/en';

const baseUrl = process.env.VUE_APP_MONITOR_API;

/**
 * 上传场景
 * @returns {AxiosPromise}
 */
export function uploadScene(data) {
  return request({
    url: baseUrl + '/scene/upload/scene',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: data,
    timeout: 360000,
  });
}

/**
 * 修改场景
 */
export function updateScene(sceneVo) {
  return request({
    url: baseUrl + '/scene/update/scene',
    method: 'post',
    data: sceneVo,
    timeout: 10000,
  });
}

/**
 * 获得场景列表
 */
export function getSceneList() {
  return request({
    url: baseUrl + '/scene/get/all/scene',
    method: 'post',
    timeout: 10000,
  });
}

export function enableSceneApplication(sceneId, applicationIds) {
  return request({
    url: baseUrl + '/scene/enable/application/scene',
    method: 'post',
    timeout: 10000,
    params: {
      sceneId: sceneId,
      applicationIds: applicationIds,
    },
    paramsSerializer: params => {
      return qs.stringify(params, { indices: false });
    },
  });
}

export function getAllTomcat() {
  return request({
    url: baseUrl + '/upgrade/all/node/tomcat/config',
    method: 'get',
    timeout: 10000,
  });
}

// 获取指定时间、节点、指标的监控数据
export function getMetricsData(startTime, endDate, applicationId, metricsId, tags) {
  return request({
    url: baseUrl + '/scene/node/application/metrics/data',
    method: 'post',
    params: {
      startTime: startTime,
      endDate: endDate,
      applicationId: applicationId,
      metricsId: metricsId,
      tags: tags,
    },
    timeout: 30000,
  });
}

// 获取指定时间、节点、场景的监控数据
export function getSceneData(startTime, endDate, applicationIdList, sceneId) {
  return request({
    url: baseUrl + '/scene/node/application/scene/data',
    method: 'post',
    params: {
      startTime: startTime,
      endDate: endDate,
      applicationIdList: applicationIdList,
      sceneId: sceneId,
    },
    paramsSerializer: params => {
      return qs.stringify(params, { indices: false });
    },
    timeout: 30000,
  });
}

// 获取最近、节点、场景的监控数据
export function getLatestSceneData(applicationIdList, sceneId) {
  return request({
    url: baseUrl + '/scene/latest/node/application/scene/data',
    method: 'post',
    params: {
      applicationIdList: applicationIdList,
      sceneId: sceneId,
    },
    paramsSerializer: params => {
      return qs.stringify(params, { indices: false });
    },
    timeout: 30000,
  });
}

// 获取指定时间、节点、指标的监控数据(概览)
export function getMetricsSummaryData(startTime, endDate, applicationId, metricsId, sceneId) {
  return request({
    url: baseUrl + '/scene/node/application/top/metrics/data',
    method: 'post',
    params: {
      startTime: startTime,
      endDate: endDate,
      applicationId: applicationId,
      metricsId: metricsId,
      sceneId: sceneId,
    },
    timeout: 30000,
  });
}
