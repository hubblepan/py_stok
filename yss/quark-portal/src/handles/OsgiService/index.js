// 历史留存的Service,继承于Base
import BaseService from '@/handles/BaseService';
import fastConvert from '@/handles/fastConvert';
import request from '@/utils/request';


export default class OsgiService extends BaseService {
  constructor(props) {
    super(props)
  }

  query (data) {
    return new Promise((resovle, reject) => {
      request(this.url.query, {
        method: 'POST',
        data,
      }).then((res) => {
        // 转换数据
        const { headKeyList, dataList, showConvertAssemble } = res.data
        res.data.list = fastConvert.convertDict({
          heads: headKeyList,
          list: dataList,
          dicts: showConvertAssemble
        })
        resovle(res)
      }).catch(err => reject(err));
    })
  }
}

