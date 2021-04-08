import request from '@/utils/request';
import { OSGI_BASEBUSINESS, YSSMONITOR } from '@/pages/constant/constant';
import fastConvert from '@/handles/fastConvert';
import queryString from 'query-string';

/**
 * "新增"弹窗
 * 1.查询群组
 */
export function queryGroup(params) {
  return request(
    `/${YSSMONITOR}/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/indexCustomClassify/controller/ICustomClassifyServiceController/getPortGroupListData?serviceId=yssmonitor-testor`,
    {
      method: 'post',
      data: params,
    },
  );
}

/**
 * 2.查询所有组合-即公共接口组合
 */
export function queryPort() {
  const data = queryString.stringify({
    isDataRight: true,
    datClass: null,
    dvPortCode: null,
    trCode: null,
  });
  return request(
    `/${OSGI_BASEBUSINESS}/YSSUCOBRIDGE/ws/com/yss/ams/product/information/support/modules/ab/port/controller/IPortDataController/doPortFilter2?serviceId=osgi-basebusiness`,
    {
      method: 'post',
      data,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  )
  // return new Promise((resolve, reject) => {
  //   request(
  //     `/${OSGI_BASEBUSINESS}/YSSUCOBRIDGE/ws/com/yss/ams/product/information/support/modules/ab/port/controller/IPortDataController/doPortFilter2?serviceId=osgi-basebusiness`,
  //     {
  //       method: 'post',
  //       data,
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //     },
  //   )
  //     .then((response) => {
  //       // const { data } = response;
  //       // const _list = fastConvert.list2Tree({
  //       //   list: data || [],
  //       //   pKey: 'c_PORT_CODE_P',
  //       //   key: 'c_PORT_CODE',
  //       //   isLeaf: (item) => {
  //       //     return item.dATA_TYPE && item.dATA_TYPE === 'PORT_TYPE';
  //       //   },
  //       // });
  //       // // console.log('data');
  //       // // console.log(data);
  //       // console.log('_list');
  //       // console.log(_list);
  //       // response.data.list = _list;
  //       resolve(response);
  //     })
  //     .catch(() => {});
  // });
}

/**
 * 3.查询可供选择组合
 */
export function queryPortOptional(params) {
  return request(
    `/${YSSMONITOR}/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/indexCustomClassify/controller/ICustomClassifyServiceController/getAlreadyToGroupPortCode?serviceId=yssmonitor-testor`,
    {
      method: 'post',
      data: params,
    },
  );
  // return new Promise((resolve, reject) => {
  //   request(
  //     `/${YSSMONITOR}/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/indexCustomClassify/controller/ICustomClassifyServiceController/querySelectablePortList?serviceId=yssmonitor-testor`,
  //     {
  //       method: 'post',
  //       data: params,
  //     },
  //   )
  //     .then((response) => {
  //       const { data } = response;
  //       const _list = fastConvert.list2Tree({
  //         list: data || [],
  //         pKey: 'c_PORT_CODE_P',
  //         key: 'c_PORT_CODE',
  //         isLeaf: (item) => {
  //           return item.dATA_TYPE && item.dATA_TYPE === 'PORT_TYPE';
  //         },
  //       });
  //       console.log('_list');
  //       console.log(_list);
  //       response.data.list = _list;
  //       _list.forEach((item, index) => {
  //         if (item.children) {
  //           console.log(item);
  //           console.log(item.children);
  //         }
  //       });
  //       resolve(response);
  //     })
  //     .catch(() => {});
  // });
}
