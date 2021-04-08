import BaseService from '@/handles/BaseService';
import request from '@/utils/request';
import fastConvert from '@/handles/fastConvert';


export default class MasterService extends BaseService {
  constructor(props) {
    super({
      base: '/yssmonitor-testor/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/monitorIndex/controller/IMonitorIndexConfigServiceController/',
      query: '/yssmonitor-testor/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/monitorIndex/controller/IMonitorIndexConfigServiceController/queryByCondition',
      add: '/yssmonitor-testor/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/monitorIndex/controller/IMonitorIndexConfigServiceController/insert/list',
      getTreeSelect: '/yssmonitor-testor/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/monitorIndex/controller/IMonitorIndexConfigServiceController/getAllIndexType',
      update: '/yssmonitor-testor/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/monitorIndex/controller/IMonitorIndexConfigServiceController/updateById/list',
      deletes: '/yssmonitor-testor/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/monitorIndex/controller/IMonitorIndexConfigServiceController/deleteById/list',
      ...props
    })
  }

  query (params) {
    return new Promise((resolve, reject) => {
      request(this.url.query, {
        method: 'post',
        data: {
          ...params,
          "dataClass": "MonitorIndex",
          "searchType": "INDEX_TYPE",
          "searchMenu": "monitorIndexConfig",

        }
      }).then(res => {
        const { headKeyList, dataList, showConvertAssemble } = res.data;

        let _list = fastConvert.list2Tree({
          list: fastConvert.convertDict({
            list: dataList,
            heads: headKeyList,
            dicts: showConvertAssemble
          }),
          pKey: 'typeCode',
          key: 'indexCode',
          isLeaf: (item) => {
            return !!item['indexType']
          }
        })
        res.data.list = _list
        resolve(res)
      }, (err) => {
        reject(err)
      })
    })
  }

  add (params) {
    return new Promise((resolve, reject) => {
      request(this.url.add, {
        method: 'post',
        data: params,
      }).then(res => {
        resolve(res);
      }, (err) => {
        console.log(err)
        reject(err)
      })
    })
  }

  // 树形结构下拉框
  getTreeSelect () {
    return new Promise((resolve, reject) => {
      request(this.url.getTreeSelect, {
        method: 'post',
      }).then(res => {
        // 得先转化为下拉框适用的数据。
        res.data.forEach(x => {
          x.title = x.typeName
          x.value = x.typeCode
        })
        // 再转为树
        res.data = fastConvert.list2Tree({
          list: res.data,
          pKey: 'typeP',
          key: 'typeCode',
          isLeaf: () => false //因为全部都是文件夹，所以不需要再判断。
        })
        // console.log('下拉框', res)
        resolve(res)
      }, err => {
        reject(err)
      })
    })
  }

  // 修改指标分类
  update (params) {
    return new Promise((resolve, reject) => {
      request(this.url.update, {
        method: 'post',
        data: params
      }).then(res => {
        console.log(res)
        resolve(res)
      }, err => {
        reject(err)
      })
    })
  }

  // 删除
  deletes (params) {
    return new Promise((resolve, reject) => {
      request(this.url.deletes, {
        method: 'post',
        data: params
      }).then(res => {
        console.log(res)
        resolve(res)
      }, err => {
        reject(err)
      })
    })
  }




}

//'/ocp/indexinfo/indextype'