import BaseService from '@/handles/BaseService';
import request from '@/utils/request';
import {YSSMONITOR} from '@/pages/constant/constant'

export default class GroupService extends BaseService {
  constructor() {
    super({
      base:
        `/${YSSMONITOR}/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/indexCustomClassify/controller/ICustomClassifyServiceController`,
      query:
        `/${YSSMONITOR}/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/indexCustomClassify/controller/ICustomClassifyServiceController/getCustomClassifyA`,
      check:`/${YSSMONITOR}/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/indexCustomClassify/controller/ICustomClassifyServiceController/auditById/list?serviceId=yssmonitor-testor`,
      uncheck:`/${YSSMONITOR}/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/indexCustomClassify/controller/ICustomClassifyServiceController/unAuditById/list?serviceId=yssmonitor-testor`,
      add:`/${YSSMONITOR}/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/indexCustomClassify/controller/ICustomClassifyServiceController/insert/list?serviceId=yssmonitor-testor`,
      edit:`/${YSSMONITOR}/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/indexCustomClassify/controller/ICustomClassifyServiceController/updateById/list?serviceId=yssmonitor-testor`,
      deletes:`/${YSSMONITOR}/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/indexCustomClassify/controller/ICustomClassifyServiceController/deleteById/list?serviceId=yssmonitor-testor`
    });
  }

  query() {
    return new Promise((resolve, reject) => {
      request(this.url.query, {
        method: 'post',
        data: {},
      }).then((response) => {
        const { data } = response;
        console.log(response);
        // const list = data.dataList.map((item,index) => {
        //   return {
        //     // id: index+'',
        //     id: item.id,
        //     c_GROUP_CODE: item.c_GROUP_CODE,
        //     c_GROUP_NAME: item.c_GROUP_NAME,
        //   };
        // });

        response.data.list = data.dataList;
        resolve(response);
      });
    });
  }

  check(params){
    return request(this.url.check, {
      method: 'post',
      data: params,
    })
  }

  uncheck(params){
    return request(this.url.uncheck, {
      method: 'post',
      data: params,
    })
  }

  add(params){
    return request(this.url.add, {
      method: 'post',
      data: params,
    })
  }

  edit(params){
    return request(this.url.edit, {
      method: 'post',
      data: params,
    })
  }

  deletes(params){
    return request(this.url.deletes, {
      method: 'post',
      data: params,
    })
  }
}
