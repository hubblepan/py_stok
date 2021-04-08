import request from '@/utils/request';

// 参数设置（通用下拉框数据）
export function getConditionSelects({ methodName, params, serviceId }) {
  return new Promise((resolve, reject) => {
    const getUrls = {
      IVocDataService: (methodName) => {
        return (
          '/osgi-fast/YSSUCOBRIDGE/ws/com/yss/platform/support/dataservice/controller/IVocDataServiceController/' +
          methodName +
          '?serviceId=osgi-fast'
        );
      },
      IMonitorIndexDropDownService: (methodName) => {
        return (
          '/yssmonitor-testor/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/monitorIndex/controller/IMonitorIndexDropDownServiceController/' +
          methodName +
          '?serviceId=yssmonitor-testor'
        );
      },
      IOcpIndexDropDownService: (methodName) => {
        return (
          '/yssmonitor-testor/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/indexParam/controller/IOcpIndexDropDownServiceController/' +
          methodName +
          '?serviceId=yssmonitor-testor'
        );
      },
    };

    const getParams = {
      IVocDataService: (params) => {
        return [params];
      },
      IMonitorIndexDropDownService: (params) => params,
      IOcpIndexDropDownService: (params) => {
        return { methodName: params, paraMap: { C_SEC_VAR_CODE: 'FZ' } }; // 此处有联动，暂时不写
      },
    };

    const url = getUrls[serviceId](methodName);
    params = getParams[serviceId](params);

    request(url, {
      method: 'post',
      data: params,
    })
      .then((res) => {
        // console.log('请求条件下拉框', res);
        resolve(res);
      })
      .catch((err) => reject(err));
  });
}
