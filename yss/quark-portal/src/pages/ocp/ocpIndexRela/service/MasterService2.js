import BaseService from '@/handles/BaseService';
import request from '@/utils/request';
import { YSSMONITOR } from '@/pages/constant/constant';
import fastConvert from '@/handles/fastConvert';

export default class MasterService2 extends BaseService {
  constructor() {
    super({
      base: `/${YSSMONITOR}/YSSUCOBRIDGE/ws`,
      query: `/${YSSMONITOR}/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/indexRela/controller/IOcpRelaModeAreaAServiceController/getRelaModeAreaA?serviceId=yssmonitor-testor`,
    });
  }

  query() {
    return new Promise((resolve, reject) => {
      request(this.url.query, {
        method: 'post',
        data: {
          dataClass: 'OcpRelaModeAreaA',
          SearchType: 'ALL',
        },
      })
        .then((response) => {
          const { data } = response;
          const _list = fastConvert.list2Tree({
            list: data.dataList || [],
            pKey: 'relaCodeP',
            key: 'relaCode',
            isLeaf: (item) => {
              return item.relaCodeP !== '[root]';
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
