import request from '@/utils/request';
import { YSSMONITOR_TEST } from '@/pages/constant/constant';
import fastConvert from '@/handles/fastConvert';
import MsgBox from '@/utils/MsgBox';

/**
 * 请求关联模式下拉框---- 公共service
 * @param data
 * 群组模式：{"SearchType":"ocp_groupRela"}
 * 资产类型：{"SearchType":"ocp_assRela"}
 * 资产类别：{"SearchType":"ocp_datRela"}
 * 自定义分类：{"SearchType":"ocp_shortNumRela"}
 * 指定组合：用公共数据中的公共组合下拉框的那个请求，这里就不重复写了
 */
export function queryRelationModes(data) {
  return new Promise((resolve, reject) => {
    request(
      `/${YSSMONITOR_TEST}/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/indexRela/controller/IOcpRelaModeAreaAServiceController/getRelaModeAreaA?serviceId=yssmonitor-testor`,
      {
        method: 'post',
        data,
      },
    )
      .then((res) => {
        const { dataList, headKeyList, showConvertAssemble } = res.data;
        dataList.forEach((x) => {
          x.id = x.relaCode;
        });
        // res.data.list = res.data.dataList;
        res.data.list = fastConvert.list2Tree({
          list: dataList,
          pKey: 'relaCodeP',
          key: 'relaCode',
          isLeaf: (item) => {
            return false;
          },
        });
        if (res.success) {
          resolve(res);
        } else {
          MsgBox.error({
            message: '请求关联模式失败',
          });
        }
      })
      .catch((err) => reject(err));
  });
}
