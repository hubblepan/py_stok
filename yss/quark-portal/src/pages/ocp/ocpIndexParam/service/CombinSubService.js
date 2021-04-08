// 指标参数子表
import BaseService from '@/handles/BaseService';
import request from '@/utils/request';
import fastConvert from '@/handles/fastConvert';
import { YSSMONITOR } from '@/pages/constant/constant';

export default class SubService extends BaseService {
  constructor(props) {
    super({
      base: '/yssmonitor-testor/YSSUCOBRIDGE/ws/',
      query:
        '/yssmonitor-testor/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/indexParam/controller/IOcpIndexParamServiceController/queryIndexParamList?serviceId=yssmonitor-testor',
      check:
        '/yssmonitor-testor/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/indexParam/controller/IOcpIndexParamServiceController/auditIndexParam?serviceId=yssmonitor-testor',
      uncheck:
        '/yssmonitor-testor/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/indexParam/controller/IOcpIndexParamServiceController/unAuditIndexParam?serviceId=yssmonitor-testor',
      /** 生效参数 */
      effectParam:
        '/osgi-fast/YSSUCOBRIDGE/ws/com/yss/platform/support/dataservice/controller/IVocDataServiceController/getDataListByTypes?serviceId=osgi-fast',
      /** 查询参数详细信息-Config */
      paramConfig:
        '/yssmonitor-testor/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/monitorIndex/controller/IMonitorIndexConfigServiceController/getParamConfigByIndex?serviceId=yssmonitor-testor',
      /** 查询参数详细信息-Val */
      paramVal:
        '/yssmonitor-testor/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/indexParam/controller/IOcpIndexParamServiceController/queryIndexParamVal?serviceId=yssmonitor-testor',
      /** 更新保存参数 */
      save:
        '/yssmonitor-testor/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/indexParam/controller/IOcpIndexParamServiceController/updateIndexParamVal?serviceId=yssmonitor-testor',

      /** 查看/调整-查询指标详情 */
      detail:
        '/yssmonitor-testor/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/indexParam/controller/IOcpIndexParamServiceController/queryIndexBaseInfo?serviceId=yssmonitor-testor',
      /** 触发位置 */
      triggerPosition:
        '/osgi-fast/YSSUCOBRIDGE/ws/com/yss/platform/support/dataservice/controller/IVocDataServiceController/getDataListByTypes?serviceId=osgi-fast',
      /** 指标类型 */
      portLevel:
        '/osgi-fast/YSSUCOBRIDGE/ws/com/yss/platform/support/dataservice/controller/IVocDataServiceController/getDataListByTypes?serviceId=osgi-fast',

      refresh:
        '/yssmonitor-testor/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/indexParam/controller/IOcpIndexParamServiceController/queryIndexParamListByRefresh?serviceId=yssmonitor-testor',
      ...props,
    });
  }

  query(params) {
    return new Promise((resolve, reject) => {
      console.log('传过去的参数', params);

      request(this.url.query, {
        method: 'post',
        data: params,
      })
        .then((res) => {
          const { data } = res;

          // console.log('data.dataList');
          // console.log(data.dataList);

          let tree = [];
          let parentList = [];
          let treeList = [];
          let remark = 0;
          if (data.dataList && data.dataList.length > 1) {
            data.dataList.forEach((item) => {
              if (!parentList.includes(item.parentCode)) {
                parentList.push(item.parentCode);
                const parent = {};
                parent.name = item.parentCode;
                parent.code = item.code;
                parent.codeKey = item.parentCode;
                parent.children = [];
                /** 拼接codeKey字段作为主键 */
                parent.children.push({
                  ...item,
                  isLeaf: true,
                  codeKey: item.parentCode + (item.indexCode || ''),
                });
                tree.push(parent);
              } else {
                const index = parentList.findIndex((code) => code === item.parentCode);
                tree[index].children.push({
                  ...item,
                  isLeaf: true,
                  codeKey: item.parentCode + (item.indexCode || ''),
                });
              }
            });
            tree.forEach((item) => {
              treeList.push({ ...item, remark: item.children.length });
            });
          }

          console.log('parentList');
          console.log(parentList);

          console.log('tree');
          console.log(tree);

          console.log('treeList');
          console.log(treeList);

          res.data.list = treeList;

          resolve(res);
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

  /** 生效参数-下拉框 */
  effectParam(params) {
    return new Promise((resolve, reject) => {
      request(this.url.effectParam, {
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

  /** 查询参数详细信息-Config */
  paramConfig(params) {
    return new Promise((resolve, reject) => {
      request(this.url.paramConfig, {
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

  /** 查询参数详细信息-Val */
  paramVal(params) {
    return new Promise((resolve, reject) => {
      request(this.url.paramVal, {
        method: 'post',
        data: params,
        'Content-Type': 'application/x-www-form-urlencoded',
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

  /** 更新保存参数 */
  save(params) {
    return new Promise((resolve, reject) => {
      request(this.url.save, {
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

  /** 查看/调整-查询指标详情 */
  detail(params) {
    return new Promise((resolve, reject) => {
      request(this.url.detail, {
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

  /** 触发位置 */
  triggerPosition(params) {
    return new Promise((resolve, reject) => {
      request(this.url.triggerPosition, {
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

  /** 指标类型 */
  portLevel(params) {
    return new Promise((resolve, reject) => {
      request(this.url.portLevel, {
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

  /** 局部刷新 */
  refresh(params) {
    return new Promise((resolve, reject) => {
      request(this.url.refresh, {
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
