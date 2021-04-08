import BaseService from '@/handles/BaseService';
import request from '@/utils/request';
import { YSSMONITOR } from '@/pages/constant/constant';
import fastConvert from '@/handles/fastConvert';

export default class IndexMasterService extends BaseService {
  constructor() {
    super({
      base: `/${YSSMONITOR}/YSSUCOBRIDGE/ws`,
      query: `/${YSSMONITOR}/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/monitorIndex/controller/IMonitorIndexConfigServiceController/queryByCondition?serviceId=yssmonitor-testor`,
    });
  }

  query() {
    return new Promise((resolve, reject) => {
      request(this.url.query, {
        method: 'post',
        data: {
          dataClass: 'MonitorIndex',
          searchType: 'INDEX_TYPE',
        },
      })
        .then((response) => {
          const { data } = response;
          const _list = fastConvert.list2Tree({
            list: data.dataList || [],
            pKey: 'typeCode',
            key: 'indexCode',
            isLeaf: (item) => {
              return item.indexType;
            },
          });
          // 把空的父节点删除掉
          const deleteEmpty = (treeData) => {
            const tree = treeData.filter((item) => {
              // 判断是否是空的父节点
              const isEmpty =
                !item.isLeaf && (!item.children || (item.children && !item.children.length));
              if (item.children && item.children.length) {
                item.children = deleteEmpty(item.children);
              }
              return !isEmpty;
            });
            return tree;
          };
          const newlist = deleteEmpty(_list);
          console.log('_list');
          console.log(_list);
          response.data.list = newlist;
          resolve(response);
        })
        .catch(() => {});
    });
  }
}
