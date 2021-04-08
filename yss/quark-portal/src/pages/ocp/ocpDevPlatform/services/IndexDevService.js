import BaseService from '@/handles/BaseService';
import request from '@/utils/request';

export default class IndexDevService extends BaseService {
  constructor() {
    super({
      base: '/yssmonitor-testor/YSSUCOBRIDGE/ws/com/yss/uco/monitor/indexDev/controller/IIndexDevServiceController/',
      query: '/yssmonitor-testor/YSSUCOBRIDGE/ws/com/yss/uco/monitor/indexDev/controller/IIndexDevServiceController/queryAllIndexDev',
      // ...
    });
  }

  query () {
    return new Promise((resolve, reject) => {
      request(this.url.query, {
        method: 'post',
      }).then(res => {
        // 处理
        // res = {
        //   "code": "success",
        //   "data": {
        //     "0": {	//组合指标
        //       "contrastIndex_zxf": "核对指标配置-zxf",	//K=指标代码，V=指标名称
        //       "MONITOR_BONDS_BS": "债券买卖监控",
        //       "MONITOR_BONDS_BS_XSHG": "债券买卖监控2",
        //       "TEST_INDEX": "测试指标",
        //       "contrast_test_jc": "比对指标测试",
        //       "MONITOR_BONDS_BS4": "债券买卖监控4",
        //       "MONITOR_BONDS_BS_XSHG1": "债券买卖监控1"
        //     },
        //     "1": {	//公共指标
        //       "MONITOR_BONDS_AMOUNT": "证券数量监控提醒",
        //       "contrast_test_public_copy": "核对类指标_copy",
        //       "contrast_test_public": "核对类指标",
        //       "MONITOR_BONDS_CHECK": "证券信息检查"
        //     }
        //   },
        //   "message": "",
        //   "success": true
        // }
        if(res){
          const { data } = res;

          if(data){
            const ret = Object.keys(data).map(prop => {
            // prop -> 指标代码 data[prop]->指标名称
            const name = prop === '0' ? '组合指标' : (prop === '1' ? '公共指标' : '未可分类者');
            const childrenData = data[prop];
            const children = Object.keys(childrenData).map(key => {
              return {
                isLeaf: true,
                id: key,
                'C_INDEX_NAME': key,
                'C_INDEX_CODE': childrenData[key]
              }
            })
            return {
              id: prop,
              'C_INDEX_CODE': prop,
              'C_INDEX_NAME': name,
              children
            }

          })

          res.data.list = ret;
          resolve(res)
        }
        }
      })
    })
  }
}

