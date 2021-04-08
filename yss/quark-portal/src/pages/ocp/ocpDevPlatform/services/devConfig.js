import request from '@/utils/request';
import { CONTENT_TYPE_JSON, CONTENT_TYPE_FORM, CONTENT_TYPE_FORM_DATA } from '@/utils/constant';


/**
 * 查询指标详情
 * @param {} params
 */
export async function queryIndexDevView(params) {
  return request('/yssmonitor-testor/YSSUCOBRIDGE/ws/com/yss/uco/monitor/indexDev/controller/IIndexDevServiceController/queryIndexDevView', {
    method: 'POST',
    data: params
  });
}


/**
 * 查询库里面保存模板信息
 * @param {} params
 */
export async function queryIndexDevTopicPlan(params) {
  return request('/yssmonitor-testor/YSSUCOBRIDGE/ws/com/yss/uco/monitor/indexDev/controller/IIndexDevTopicPlanServiceController/queryByCondition', {
    method: 'POST',
    data: params
  });
}



/**
 * 主题模板信息查询
 * @param {} params
 */
export async function queryIndexDevTopicViewPlan(params) {
  return request('/yssmonitor-testor/YSSUCOBRIDGE/ws/com/yss/uco/monitor/indexDev/controller/IIndexDevTopicPlanServiceController/queryIndexDevTopicViewPlan', {
    method: 'POST',
    data: params
  });
}


/**
 * 数据主题查询
 * @param {} params
 */
export async function queryTopicSelect(params) {
  return request('/yssmonitor-testor/YSSUCOBRIDGE/ws/com/yss/uco/monitor/indexDev/controller/IIndexDevORCABIServiceController/IndexDevGetORCAServices', {
    method: 'POST',
    'Content-Type': CONTENT_TYPE_FORM,
    data: params
  });
}


/**
 * 主题字段--查询
 */
export async function queryIndexDevORCABI(params) {
  return request('/yssmonitor-testor/YSSUCOBRIDGE/ws/com/yss/uco/monitor/indexDev/controller/IIndexDevORCABIServiceController/IndexDevGetORCAServiceInfo', {
    method: 'POST',
    'Content-Type': CONTENT_TYPE_FORM,
    data: params
  });
}


export async function queryVocDataList(params) {
  return request('/osgi-fast/YSSUCOBRIDGE/ws/com/yss/platform/support/dataservice/controller/IVocDataServiceController/getDataListByTypes', {
    method: 'POST',
    data: params
  });
}



export async function queryDevServiceDataList() {
  return request('/yssmonitor-testor/YSSUCOBRIDGE/ws/com/yss/uco/monitor/indexDev/controller/IIndexDevServiceController/queryAllDropDown', {
    method: 'POST',
  });
}


export async function queryDropDownInfos(params) {
  return request('/yssmonitor-testor/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/monitorIndex/controller/IMonitorIndexDropDownServiceController/getDropDownInfos', {
    method: 'POST',
    data: params
  });
}


/**
 * 管控主题模板
 * 主题参数--查询
 */
export async function queryMainParams(params) {
  return request('/ocp/mainParam/query', { method: 'POST', data: { ...params } });
}



/**
 * 查看详情
 * 修改、复制
 */
export async function saveDetail(params) {
  return request('/api/mainScheme/save', { method: 'POST', data: { ...params } });
}


