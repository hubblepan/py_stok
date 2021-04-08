import BaseService from '@/handles/BaseService';
import request from '@/utils/request';
import { YSSMONITOR, OSGI_BASEBUSINESS } from '@/pages/constant/constant';
import fastConvert from '@/handles/fastConvert';
import queryString from 'query-string';

export default class IndexMaster extends BaseService {
  constructor() {
    super({
      base: `/${OSGI_BASEBUSINESS}/YSSUCOBRIDGE/ws`,
      query: `/${YSSMONITOR}/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/monitorIndex/controller/IMonitorIndexConfigServiceController/queryByCondition?serviceId=yssmonitor-testor`,
    });
  }

  query() {
    return new Promise((resolve, reject) => {
      request(this.url.query, {
        method: 'post',
        data: {
          dataClass: 'MonitorIndex',
          searchType: 'INDEX_TYPE',
        },
      })
        .then((response) => {
          const { data } = response;
          const _list = fastConvert.list2Tree({
            list: data.dataList || [],
            pKey: 'typeCode',
            key: 'indexCode',
            isLeaf: (item) => {
              return item.indexType;
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
}
