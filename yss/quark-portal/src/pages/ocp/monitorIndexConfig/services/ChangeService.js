// 变更记录

import BaseService from '@/handles/BaseService';
import request from '@/utils/request';
import fastConvert from '@/handles/fastConvert';
import { YSSMONITOR } from '@/pages/constant/constant';
import MsgBox from '@/utils/MsgBox';

export default class SubService extends BaseService {
  constructor(props) {
    super({

      // save: '/yssmonitor-testor/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/indexDesc/controller/IOcpIndexDescServiceController/updateById/list?serviceId=yssmonitor-testor',
      query: '/yssmonitor-testor/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/indexDesc/controller/IOcpIndexModifyRecordServiceController/queryByCondition?serviceId=yssmonitor-testor',
      update: '/yssmonitor-testor/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/indexDesc/controller/IOcpIndexModifyRecordServiceController/updateById/list?serviceId=yssmonitor-testor',
      add: '/yssmonitor-testor/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/indexDesc/controller/IOcpIndexModifyRecordServiceController/insert/list?serviceId=yssmonitor-testor',
      getUsers: '/osgi-fast/YSSUCOBRIDGE/ws/com/yss/framework/api/dataservice/controller/IUserDataServiceController/getAllEnableUser?serviceId=osgi-fast',

      deletes: '/yssmonitor-testor/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/indexDesc/controller/IOcpIndexModifyRecordServiceController/deleteById/list?serviceId=yssmonitor-testor',
      check: '/yssmonitor-testor/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/indexDesc/controller/IOcpIndexModifyRecordServiceController/auditById/list?serviceId=yssmonitor-testor',
      uncheck: '/yssmonitor-testor/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/indexDesc/controller/IOcpIndexModifyRecordServiceController/unAuditById/list?serviceId=yssmonitor-testor',
      ...props,
    });
  }

  // 查询 变更记录
  query (params) {
    return new Promise((resolve, reject) => {
      params = {
        // ...params.paraMap,
        // "indexCode": "ACT_ETFTZGLQSXXWZXJC",	//指标代码
        "dataClass": "OcpIndexModifyRecord",	//数据pojo，写死
        "N_CHECK_STATE": "SearchAll"	//如果是单击B区上半部分的记录，固定传SearchAll，如果是点下方的查询按钮后的审核和未审核，则传对应的，见上面
      }
      console.log('变更查询条件', params)
      request(this.url.query, {
        method: 'post',
        data: params
      }).then(res => {
        const { headKeyList, dataList, showConvertAssemble } = res.data;
        res.data.list = fastConvert.convertDict({
          heads: headKeyList,
          list: dataList,
          dicts: showConvertAssemble,
        });

        resolve(res)
      }).catch(err => reject(err))
    })
  }

  // 保存（修改） 变更记录
  update (params) {
    return new Promise((resolve, reject) => {
      request(this.url.update, {
        method: 'post',
        data: params
      }).then(res => {
        console.log('保存接口', res)
        resolve(res)
      }).catch(err => reject(err))
    })
  }

  // 新增接口
  add (params) {
    return new Promise((resolve, reject) => {
      request(this.url.add, {
        method: 'post',
        data: params
      }).then(res => {
        console.log('新增接口', res)
        resolve(res)
      }).catch(err => reject(err))
    })
  }

  // 操作人下拉框
  getUsers () {
    return new Promise((resolve, reject) => {
      request(this.url.getUsers, {
        method: 'post',
        data: null
      }).then(res => {
        console.log('操作人列表', res)
        resolve(res)
      }).catch(err => reject(err))
    })
  }
  // curd
  deletes (params) {
    return new Promise((resolve, reject) => {
      //勾选的行，批量勾选后需要过滤，只需要传可以删除的数据

      request(this.url.deletes, {
        method: 'post',
        data: params
      }).then(res => {
        console.log('删除接口', res)
        resolve(res)
      }).catch(err => reject(err))
    })
  }


  check (params) {
    return new Promise((resolve, reject) => {
      //勾选的行，批量勾选后需要过滤，只需要传可以删除的数据

      request(this.url.check, {
        method: 'post',
        data: params
      }).then(res => {
        console.log('审核接口', res)
        resolve(res)
      }).catch(err => reject(err))
    })
  }

  uncheck (params) {
    return new Promise((resolve, reject) => {
      //勾选的行，批量勾选后需要过滤，只需要传可以删除的数据

      request(this.url.uncheck, {
        method: 'post',
        data: params
      }).then(res => {
        console.log('反审核接口', res)
        resolve(res)
      }).catch(err => reject(err))
    })
  }

}