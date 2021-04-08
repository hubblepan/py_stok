import request from '@/utils/request';

/**
 * 查询关联模式
 * @param params
 */
export function queryRelationalMode(params: any) {
  const data = {
    ...[['OCP_RELATYPE']],
    ...params,
  };

  return request.post(
    '/YSSUCOBRIDGE/ws/com/yss/platform/support/dataservice/controller/IVocDataServiceController/getDataListByTypes?serviceId=osgi-fast',
    data,
  );
}
