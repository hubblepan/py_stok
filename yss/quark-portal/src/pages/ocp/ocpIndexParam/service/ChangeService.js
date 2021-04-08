import BaseService from '@/handles/BaseService';
import request from '@/utils/request';
import fastConvert from '@/handles/fastConvert';

export default class CombinMaster extends BaseService {
  constructor() {
    super({
      base: '/yssmonitor-testor/YSSUCOBRIDGE/ws',
      query:
        '/yssmonitor-testor/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/indexDesc/controller/IOcpIndexModifyRecordServiceController/queryByCondition?serviceId=yssmonitor-testor',
    });
  }

  query(params) {
    console.log('变更记录传参', params);
    return new Promise((resolve, reject) => {
      request(this.url.query, {
        method: 'post',
        data: {
          indexCode: params,
          dataClass: 'OcpIndexModifyRecord',
          N_CHECK_STATE: 'SearchAll',
        },
      })
        .then((res) => {
          console.log('res', res);
          const { headKeyList, dataList, showConvertAssemble } = res.data;
          res.data.list = fastConvert.convertDict({
            heads: headKeyList,
            list: dataList,
            dicts: showConvertAssemble,
          });
          resolve(res);
        })
        .catch(() => {});
    });
  }
}
