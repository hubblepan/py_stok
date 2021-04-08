// 指标管理子表查询
import BaseService from '@/handles/BaseService';
import request from '@/utils/request';
import fastConvert from '@/handles/fastConvert';
import { YSSMONITOR } from '@/pages/constant/constant';
import MsgBox from '@/utils/MsgBox';

export default class ThemeProgrammeService extends BaseService {
  constructor(props) {
    super({
      base:
        '/yssmonitor-testor/YSSUCOBRIDGE/ws/com/yss/uco/monitor/indexDev/controller/IIndexDevTopicPlanServiceController/',
      query:
        '/yssmonitor-testor/YSSUCOBRIDGE/ws/com/yss/uco/monitor/indexDev/controller/IIndexDevTopicPlanServiceController/queryByCondition/page',
      save:
        `/yssmonitor-testor/YSSUCOBRIDGE/ws/com/yss/uco/monitor/indexDev/controller/IIndexDevTopicPlanServiceController/addIndexDevTopicPlan`,
      check:
        `/yssmonitor-testor/YSSUCOBRIDGE/ws/com/yss/uco/monitor/indexDev/controller/IIndexDevTopicPlanServiceController/auditById/list`,
      uncheck:
        `/yssmonitor-testor/YSSUCOBRIDGE/ws/com/yss/uco/monitor/indexDev/controller/IIndexDevTopicPlanServiceController/unAuditById/list`,
      // add: '/yssmonitor-testor/YSSUCOBRIDGE/ws/com/yss/uco/monitor/indexDev/controller/IIndexDevTopicPlanServiceController//insert/list',
      update:
        '/yssmonitor-testor/YSSUCOBRIDGE/ws/com/yss/uco/monitor/indexDev/controller/IIndexDevTopicPlanServiceController/updateIndexDevTopicPlan',
      deletes:
        '/yssmonitor-testor/YSSUCOBRIDGE/ws/com/yss/uco/monitor/indexDev/controller/IIndexDevTopicPlanServiceController/deleteIndexDevTopicPlan',
      ...props,
    });
  }


  /**
  deletes(ids) {
    if(ids.length > 1){
      MsgBox.warning({ message: '只能选择一条数据进行删除' });
      return false;
    }
    return request(this.url.deletes, {
      method: 'DELETE',
      data: ids[0],
    });
  }
  * */

  query(params) {
    return new Promise((resolve, reject) => {
      // const { ids } = params.paraMap;
      // const IndexCode = ids.split('|').join(',');
      request(this.url.query, {
        method: 'post',
        data: {
          paraMap: {
            // TypeQuery: 'TypeQuery', //
            // searchMenu: 'monitorIndexConfig', //
            dataClass: 'IndexDevTopicPlanPojo', //
            // IndexCode,
            ...params.paraMap,
          },
          page: {
            ...params.page,
          },
        },
      }).then(
        (res) => {
          const { headKeyList, dataList, showConvertAssemble } = res.data;
          res.data.list = fastConvert.convertDict({
            heads: headKeyList,
            list: dataList,
            dicts: showConvertAssemble,
          });
          resolve(res);
        },
        (err) => {
          reject(err);
        },
      );
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
}
