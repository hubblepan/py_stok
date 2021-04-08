import BaseService from '@/handles/BaseService';
import request from '@/utils/request';
import { YSSMONITOR } from '@/pages/constant/constant';
import fastConvert from '@/handles/fastConvert';

export default class MasterService0 extends BaseService {
  constructor() {
    super({
      base: `/${YSSMONITOR}/YSSUCOBRIDGE/ws`,
      query: `/${YSSMONITOR}/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/indexRela/controller/IMonitorIndexRelaServiceController/queryRelaModeData?serviceId=yssmonitor-testor`,
      check: `/${YSSMONITOR}/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/indexRela/controller/IMonitorIndexRelaServiceController/auditRelaModeData?serviceId=yssmonitor-testor`,
      uncheck: `/${YSSMONITOR}/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/indexRela/controller/IMonitorIndexRelaServiceController/unAuditRelaModeData?serviceId=yssmonitor-testor`,
      deletes: `/${YSSMONITOR}/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/indexRela/controller/IMonitorIndexRelaServiceController/deleteRelaModeData?serviceId=yssmonitor-testor`,
      refresh: `/${YSSMONITOR}/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/indexRela/controller/IMonitorIndexRelaServiceController/queryByIds/map?serviceId=yssmonitor-testor`,
    });
  }

  query(params) {
    return new Promise((resolve, reject) => {
      request(this.url.query, {
        method: 'post',
        data: params,
      })
        .then((response) => {
          const { data } = response;

          data.dataList.forEach((item) => {
            /** 1.拼接code字段作为主键 */
            item.code = item.relaCode + (item.indexCode || '');
            /** 2.子节点添加pKey字段。注意，pKey和key不能是一个字段 */
            if (item.indexCode) {
              item.relaCodeP = item.relaCode;
            }
          });
          const _list = fastConvert.list2Tree({
            list: data.dataList || [],
            pKey: 'relaCodeP',
            key: 'relaCode',
            isLeaf: (item) => {
              return item.indexCode;
            },
          });
          console.log('_list');
          console.log(_list);
          response.data.list = _list;
          resolve(response);
        })
        .catch(() => {});
    });
  }

  check(params) {
    return request(this.url.check, {
      method: 'post',
      data: params,
    });
  }

  uncheck(params) {
    return request(this.url.uncheck, {
      method: 'post',
      data: params,
    });
  }

  deletes(params) {
    return request(this.url.deletes, {
      method: 'post',
      data: params,
    });
  }

  refresh(params) {
    return request(this.url.refresh, {
      method: 'post',
      data: params,
    });
  }
}
