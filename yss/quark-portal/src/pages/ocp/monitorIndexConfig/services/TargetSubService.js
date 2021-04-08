// 指标管理子表查询
import BaseService from '@/handles/BaseService';
import request from '@/utils/request';
import fastConvert from '@/handles/fastConvert';
import { YSSMONITOR } from '@/pages/constant/constant';
import MsgBox from '@/utils/MsgBox';
import { reject } from 'lodash';
export default class SubService extends BaseService {
  constructor(props) {
    super({
      base:
        '/yssmonitor-testor/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/monitorIndex/controller/IMonitorIndexConfigServiceController/',
      query:
        '/yssmonitor-testor/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/monitorIndex/controller/IMonitorIndexConfigServiceController/queryByCondition/page',
      check: `/${YSSMONITOR}/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/monitorIndex/controller/IMonitorIndexConfigServiceController/auditById/list?serviceId=yssmonitor-testor`,
      uncheck: `/${YSSMONITOR}/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/monitorIndex/controller/IMonitorIndexConfigServiceController/unAuditById/list?serviceId=yssmonitor-testor`,
      unload: `/${YSSMONITOR}/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/indexDeploy/controller/IMonitorIndexDeployServiceController/unInstall?serviceId=yssmonitor-testor`,
      edit: `/${YSSMONITOR}/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/monitorIndex/controller/IMonitorIndexConfigServiceController/updateIndexData?serviceId=yssmonitor-testor`,
      triggerPosition:
        '/osgi-fast/YSSUCOBRIDGE/ws/com/yss/platform/support/dataservice/controller/IVocDataServiceController/getDataListByTypes?serviceId=osgi-fast',
      getIndexType:
        '/osgi-fast/YSSUCOBRIDGE/ws/com/yss/platform/support/dataservice/controller/IVocDataServiceController/getDataListByTypes?serviceId=osgi-fast',
      getIndexTypeFlag: '/yssmonitor-testor/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/paramConfig/controller/IMonitorSysParamServiceController/isIndexRelaPortLevel?serviceId=yssmonitor-testor',
      // unload: '/yssmonitor-testor/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/indexDeploy/controller/IMonitorIndexDeployServiceController/unInstall?serviceId=yssmonitor-testor',
      download: '/yssmonitor-testor/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/indexDeploy/controller/IMonitorIndexDeployServiceController/downLoad?serviceId=yssmonitor-testor',

      // add: '/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/monitorIndex/controller/IMonitorIndexConfigServiceController/insert/list',
      // getTreeSelect: '/yssmonitor-testor/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/monitorIndex/controller/IMonitorIndexConfigServiceController/getAllIndexType',
      // update: '/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/monitorIndex/controller/IMonitorIndexConfigServiceController/updateById/list',
      // deletes: '/yssmonitor-testor/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/monitorIndex/controller/IMonitorIndexConfigServiceController/deleteById/list',
      ...props,
    });
  }

  query (params) {
    return new Promise((resolve, reject) => {
      const { ids } = params.paraMap;
      const IndexCode = ids.split('|').join(',');
      request(this.url.query, {
        method: 'post',
        data: {
          paraMap: {
            TypeQuery: 'TypeQuery', // 写死
            searchMenu: 'monitorIndexConfig', // 写死
            dataClass: 'MonitorIndex', // 写死
            IndexCode,
            ...params.paraMap,
          },
          page: {
            ...params.page,
          },
        },
      }).then(
        (res) => {
          // console.log('子表查询', res)

          //
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

  check (params) {
    return request(this.url.check, {
      method: 'post',
      data: params,
    });
  }

  uncheck (params) {
    return request(this.url.uncheck, {
      method: 'post',
      data: params,
    });
  }

  // 修改保存指标
  edit (params) {
    return new Promise((resolve, reject) => {
      request(this.url.edit, {
        method: 'post',
        data: params,
      }).then(res => {
        console.log('保存指标', res);
        if (res.success) {
          res.success && resolve(res);
          MsgBox.success({
            message: '保存成功！'
          })
        } else {
          MsgBox.error({
            message: '失败'
          })
        }
      }).catch(err => reject(err));
    })
  }

  // 指标详情-触发位置
  triggerPosition (params) {
    return new Promise((resolve, reject) => {
      request(this.url.triggerPosition, {
        method: 'post',
        data: params,
      }).then(
        (res) => {
          res.data = res.data.map(x => {
            x.id = x['c_DV_NAME'] + x['c_DV_CODE'];
            return x;
          })
          resolve(res);
        },
        (err) => {
          console.log(err);
          reject(err);
        },
      );
    });
  }


  // 指标详情-指标类型等前置判断：是否关联到组合层级
  getIndexTypeFlag () {
    return new Promise((resolve, reject) => {
      request(this.url.getIndexTypeFlag, {
        method: 'post',
        data: null
      }).then(res => {
        resolve(res)
      }).then(err => reject(err))
    })
  }

  // 指标详情-指标类型
  async getIndexType () {
    return new Promise((resolve, reject) => {
      request(this.url.getIndexType, {
        method: 'post',
        data: ["PORT_LEVEL"],
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

  // 卸载
  download (params) {
    return new Promise((resolve, reject) => {
      request(this.url.download, {
        method: 'post',
        data: params
      }).then(res => {
        resolve(res)
      }).catch(err => reject(err))
    })
  }

}
