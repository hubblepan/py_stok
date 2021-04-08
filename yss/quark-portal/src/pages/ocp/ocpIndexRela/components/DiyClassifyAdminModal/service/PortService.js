import BaseService from '@/handles/BaseService';
import request from '@/utils/request';
import {OSGI_BASEBUSINESS, YSSMONITOR} from '@/pages/constant/constant';
import queryString from "query-string";
import fastConvert from "@/handles/fastConvert";

export default class PortService extends BaseService {
  constructor() {
    super({
      base: `/${YSSMONITOR}/YSSUCOBRIDGE/ws`,
      query: `/${YSSMONITOR}/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/indexCustomClassify/controller/ICustomGroupRelaDataServiceController/queryByCondition/page`,
      check: `/${YSSMONITOR}/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/indexCustomClassify/controller/ICustomGroupRelaDataServiceController/auditById/list?serviceId=yssmonitor-testor`,
      uncheck: `/${YSSMONITOR}/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/indexCustomClassify/controller/ICustomGroupRelaDataServiceController/unAuditById/list?serviceId=yssmonitor-testor`,
      deletes: `/${YSSMONITOR}/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/indexCustomClassify/controller/ICustomGroupRelaDataServiceController/deleteById/list?serviceId=yssmonitor-testor`,
      add: `/${YSSMONITOR}/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/indexCustomClassify/controller/ICustomClassifyRelaServiceController/insert/list?serviceId=yssmonitor-testor`,
      group:`/${OSGI_BASEBUSINESS}/YSSUCOBRIDGE/ws/com/yss/ams/product/information/support/modules/ab/port/controller/IPortDataController/doPortFilter2?serviceId=osgi-basebusiness`,
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
          console.log(response);
          // const list = data.dataList.map((item,index) => {
          //   return {
          //     // id: index+'',
          //     id: item.id,
          //     c_GROUP_CODE: item.c_GROUP_CODE,
          //     c_GROUP_NAME: item.c_GROUP_NAME,
          //   };
          // });

          // response.data.list = [
          //   {
          //     id: '1',
          //     C_GROUP_NAME: 'a',
          //     C_PORT_CODE: 'a',
          //     C_PORT_NAME: 'a',
          //     C_DV_PORT_CODE: 'a',
          //     N_CHECK_TYPE: 'a',
          //     C_UPDATE_BY: 'a',
          //     C_UPDATE_TIME: 'a',
          //     C_CHECK_BY: 'a',
          //     C_CHECK_TIME: 'a',
          //     auditState: 0,
          //   },
          //   {
          //     id: '2',
          //     C_GROUP_NAME: 'a',
          //     C_PORT_CODE: 'a',
          //     C_PORT_NAME: 'a',
          //     C_DV_PORT_CODE: 'a',
          //     N_CHECK_TYPE: 'a',
          //     C_UPDATE_BY: 'a',
          //     C_UPDATE_TIME: 'a',
          //     C_CHECK_BY: 'a',
          //     C_CHECK_TIME: 'a',
          //     auditState: 1,
          //   },
          //   {
          //     id: '3',
          //     C_GROUP_NAME: 'a',
          //     C_PORT_CODE: 'a',
          //     C_PORT_NAME: 'a',
          //     C_DV_PORT_CODE: 'a',
          //     N_CHECK_TYPE: 'a',
          //     C_UPDATE_BY: 'a',
          //     C_UPDATE_TIME: 'a',
          //     C_CHECK_BY: 'a',
          //     C_CHECK_TIME: 'a',
          //     auditState: 0,
          //   },
          //   {
          //     id: '4',
          //     C_GROUP_NAME: 'a',
          //     C_PORT_CODE: 'a',
          //     C_PORT_NAME: 'a',
          //     C_DV_PORT_CODE: 'a',
          //     N_CHECK_TYPE: 'a',
          //     C_UPDATE_BY: 'a',
          //     C_UPDATE_TIME: 'a',
          //     C_CHECK_BY: 'a',
          //     C_CHECK_TIME: 'a',
          //     auditState: 0,
          //   },
          //   {
          //     id: '5',
          //     C_GROUP_NAME: 'a',
          //     C_PORT_CODE: 'a',
          //     C_PORT_NAME: 'a',
          //     C_DV_PORT_CODE: 'a',
          //     N_CHECK_TYPE: 'a',
          //     C_UPDATE_BY: 'a',
          //     C_UPDATE_TIME: 'a',
          //     C_CHECK_BY: 'a',
          //     C_CHECK_TIME: 'a',
          //     auditState: 1,
          //   },
          //   {
          //     id: '6',
          //     C_GROUP_NAME: 'a',
          //     C_PORT_CODE: 'a',
          //     C_PORT_NAME: 'a',
          //     C_DV_PORT_CODE: 'a',
          //     N_CHECK_TYPE: 'a',
          //     C_UPDATE_BY: 'a',
          //     C_UPDATE_TIME: 'a',
          //     C_CHECK_BY: 'a',
          //     C_CHECK_TIME: 'a',
          //     auditState: 1,
          //   },
          // ];
          response.data.list = data.dataList;
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

  add(params) {
    return request(this.url.add, {
      method: 'post',
      data: params,
    });
  }
  group(){
    const data = queryString.stringify({
      isDataRight: true,
      datClass: null,
      dvPortCode: null,
      trCode: null,
    });
    return new Promise((resolve, reject) => {
      request(this.url.group, {
        method: 'post',
        data,
        'Content-Type': 'application/x-www-form-urlencoded',
      })
        .then((response) => {
          const { data } = response;
          const _list = fastConvert.list2Tree({
            list: data || [],
            pKey: 'c_PORT_CODE_P',
            key: 'c_PORT_CODE',
            isLeaf: (item) => {
              return item.dATA_TYPE && item.dATA_TYPE === 'PORT_TYPE';
            },
          });
          // console.log('data');
          // console.log(data);
          console.log('_list');
          console.log(_list);
          response.data.list = _list;
          resolve(response);
        })
        .catch(() => {});
    });
  }
}
