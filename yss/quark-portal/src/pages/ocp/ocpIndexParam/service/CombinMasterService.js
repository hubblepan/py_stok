import BaseService from '@/handles/BaseService';
import request from '@/utils/request';
import { YSSMONITOR, OSGI_BASEBUSINESS } from '@/pages/constant/constant';
import fastConvert from '@/handles/fastConvert';
import queryString from 'query-string';

export default class CombinMaster extends BaseService {
  constructor() {
    super({
      base: `/${OSGI_BASEBUSINESS}/YSSUCOBRIDGE/ws`,
      query: `/${OSGI_BASEBUSINESS}/YSSUCOBRIDGE/ws/com/yss/ams/product/information/support/modules/ab/port/controller/IPortDataController/doPortFilter2?serviceId=osgi-basebusiness`,

      // 进入页面首先获取-组合缓存
      cache:
        '/yssmonitor-testor/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/indexRela/controller/IMonitorIndexRelaServiceController/cacheAllPort?serviceId=yssmonitor-testor',

      // 排除已关账的组合
      filter:
        '/yssmonitor-testor/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/paramConfig/controller/IMonitorSysParamServiceController/getAutoMonitorParam?serviceId=yssmonitor-testor',
    });
  }

  query() {
    const data = queryString.stringify({
      isDataRight: true,
      datClass: null,
      dvPortCode: null,
      trCode: null,
    });
    return new Promise((resolve, reject) => {
      request(this.url.query, {
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

  cacheDatas(params) {
    return new Promise((resolve, reject) => {
      request(this.url.cache, {
        method: 'post',
        data: params,
      }).then(
        (res) => {
          resolve(res);
        },
        (err) => {
          console.log(err);
          reject(err);
        },
      );
    });
  }

  filterDatas(params) {
    return new Promise((resolve, reject) => {
      request(this.url.filter, {
        method: 'post',
        data: params,
      }).then(
        (res) => {
          resolve(res);
        },
        (err) => {
          console.log(err);
          reject(err);
        },
      );
    });
  }
}
