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
      refresh:
        '/yssmonitor-testor/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/indexParam/controller/IOcpIndexParamServiceController/queryIndexParamListByRefresh?serviceId=yssmonitor-testor',

      ...props,
    });
  }

  query(params) {
    return new Promise((resolve, reject) => {
      // console.log('传过去的参数+params');
      // console.log(params.paraMap.ARRAY_PORT_CODE);
      request(this.url.query, {
        method: 'post',
        data: params,
      })
        .then((res) => {
          const { data } = res;

          console.log('data.dataList');
          console.log(data.dataList);

          let tree = [];
          let parentList = [];
          let treeList = [];
          let remark = 0;
          if (data.dataList && data.dataList.length > 1) {
            data.dataList.forEach((item) => {
              if (!parentList.includes(item.indexCode)) {
                parentList.push(item.indexCode);
                const parent = {};
                parent.name = item.name;
                parent.code = item.code;
                parent.codeKey = item.indexCode;
                parent.children = [];
                /** 拼接codeKey字段作为主键 */
                parent.children.push({
                  ...item,
                  isLeaf: true,
                  codeKey: item.indexCode + (item.code || ''),
                });
                tree.push(parent);
              } else {
                const index = parentList.findIndex((code) => code === item.indexCode);
                tree[index].children.push({
                  ...item,
                  isLeaf: true,
                  codeKey: item.indexCode + (item.code || ''),
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
