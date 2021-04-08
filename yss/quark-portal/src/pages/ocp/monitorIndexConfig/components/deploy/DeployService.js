import request from "@/utils/request";
import fastConvert from '@/handles/fastConvert';
import MsgBox from '@/utils/MsgBox';

// 公共接口数据字典:转换生效参数
export function queryEffectParamDicts () {
  return new Promise((resolve, reject) => {
    request('/osgi-fast/YSSUCOBRIDGE/ws/com/yss/platform/support/dataservice/controller/IVocDataServiceController/getDataListByTypes?serviceId=osgi-fast', {
      method: 'post',
      data: ["OCP_PARAMTYPE"]
    }).then(res => {
      // console.log('转换生效参数', res)
      resolve(res)
    }).catch(err => reject(err))
  })
}


// 自动化安装指标 --- 开发配置专用,因接口没好，指标管理先用这个替代
export function genTargets (indexCodes) {
  return new Promise((resolve, reject) => {
    request('/yssmonitor-testor/YSSUCOBRIDGE/ws/com/yss/uco/monitor/indexDev/controller/IIndexDevServiceController/autoProduceIndex?serviceId=yssmonitor-testor', {
      method: 'post',
      data: ['TEST_INDEX'],
    }).then(res => {
      resolve(res)
    }).catch(err => reject(err))
  })
}




// 载入配置化指标 --- 开发配置专用,因接口没好，指标管理先用这个替代
export function loadingSettingTarget (jarFiles) {
  return new Promise((resolve, reject) => {
    request('/yssmonitor-testor/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/indexDeploy/controller/IMonitorIndexDeployServiceController/loadJarFileFromServer?serviceId=yssmonitor-testor', {
      method: 'post',
      data:
        // jarFiles
        [
          "com.yss.ocp.dev.TEST_INDEX_1.300.7-20210224.jar"
        ]
    }).then(res => {
      // res.data.forEach((x, i) => {
      //   x.fileName = jarFiles[i]
      // });

      // console.log('载入配置化指标', res)
      resolve(res)
    }).catch(err => reject(err));
  })
}

// 安装指标
export function installTarget (params) {
  return new Promise((resolve, reject) => {
    request('/yssmonitor-testor/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/indexDeploy/controller/IMonitorIndexDeployServiceController/install?serviceId=yssmonitor-testor', {
      method: 'post',
      data: params,
    }).then(res => {
      // console.log(res);
      resolve(res)
    }).catch(err => reject(err))
  })
}

// 查询触发位置下拉框
export function getTriggerPositions () {
  return new Promise((resolve, reject) => {
    request('/osgi-fast/YSSUCOBRIDGE/ws/com/yss/platform/support/dataservice/controller/IVocDataServiceController/getDataListByTypes?serviceId=osgi-fast', {
      method: 'post',
      data: [
        "MONITOR_EXEC_FUNCODE",
        ""
      ],
    }).then(res => {
      // console.log('触发位置', res)
      res.data = res.data.map(x => {
        x.id = x['c_DV_NAME'] + x['c_DV_CODE'];
        return x;
      })
      resolve(res)
    }).catch(err => {
      reject(err)
    });
  })
}

// 保存指标
export function saveTargets (targets) {
  return new Promise((resolve, reject) => {
    request('/yssmonitor-testor/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/indexDeploy/controller/IMonitorIndexDeployServiceController/saveIndex', {
      method: 'post',
      data: targets
    }).then(res => {
      const data = (`{${res.data}}`)
      console.log('保存指标', data)
      MsgBox.success({ message: '保存成功！' });
      resolve(data)
    })
  }).catch(err => {
    console.log(err);
    reject(err)
  })
}

// 关联模式下拉框-单选框
export function queryRelationType () {
  return new Promise((resolve, recject) => {
    request('/osgi-fast/YSSUCOBRIDGE/ws/com/yss/platform/support/dataservice/controller/IVocDataServiceController/getDataListByTypes?serviceId=osgi-fast', {
      method: 'post',
      data: [
        "OCP_RELATYPE"	//固定值
      ]
    }).then(res => {
      const data = [];
      res.data.forEach(x => {
        // 过滤未关联
        if (x['c_DV_CODE'] !== 'ocp_unRela') {
          x.name = x['c_DV_NAME'];
          x.key = x["c_DV_CODE"];
          data.push(x)
        }
      })
      res.data = data;
      resolve(res)
    }).catch(err => reject(err))
  })
}


//  请求关联模式下拉框
export function queryRelationModes (data) {
  return new Promise((resolve, reject) => {
    request('/yssmonitor-testor/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/indexRela/controller/IOcpRelaModeAreaAServiceController/getRelaModeAreaA?serviceId=yssmonitor-testor', {
      method: 'post',
      data,
    }).then(res => {
      console.log('请求关联模式下拉框内容', res)
      const { dataList, headKeyList, showConvertAssemble } = res.data
      dataList.forEach(x => { x.id = x.relaCode })
      // res.data.list = res.data.dataList;
      res.data.list = fastConvert.list2Tree({
        list: dataList,
        pKey: 'relaCodeP',
        key: 'relaCode',
        isLeaf: (item) => {
          return false
        }
      })

      console.log(222, res.data)
      resolve(res)
    })
  }).catch(err => reject(err))
}

// 查询基础信息
export function queryBasicInfo (params) {
  return request.post('/ocp/indexinfo/deploy/baseinfo', { params });
}


// 保存关联模式
export function saveRelationMode (params) {
  return new Promise((resolve, reject) => {
    request('/yssmonitor-testor/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/indexDeploy/controller/IMonitorIndexDeployServiceController/setRelaMode?serviceId=yssmonitor-testor', {
      method: 'post',
      data: params
    }).then(res => {
      // console.log('保存公共指标/关联模式', res)
      resolve(res)
    }).catch(err => reject(err))
  })
}

// 查询生效参数
export function queryEffectParams (params) {
  return new Promise((resolve, reject) => {
    request('/yssmonitor-testor/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/indexDeploy/controller/IMonitorIndexDeployServiceController/getEffectParam?serviceId=yssmonitor-testor', {
      method: 'post',
      data: params
    }).then(res => {

      // 这里给生效参数做id
      res.data.forEach(x => {
        x.key = x.indexCode + x.relaType + x.relaCode
      })

      console.log('查询生效参数', res.data);

      resolve(res.data)
    }).catch(err => reject(err))
  })
}

// 点击查看参数设置详情-获取模板
export function getParamsDetail (params) {
  return new Promise((resolve, reject) => {
    request('/yssmonitor-testor/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/indexDeploy/controller/IMonitorIndexDeployServiceController/loadParamConfig?serviceId=yssmonitor-testor', {
      method: 'post',
      data: params,
    }).then(res => {
      // console.log('点击查看参数设置详情模板', res);
      resolve(res)
    }).catch(err => reject(err))
  })
}


// 参数设置 - 点击调整或查看（加载参数Val）
export function getParamsDetailVals (params) {
  return new Promise((resolve, reject) => {
    request('/yssmonitor-testor/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/indexDeploy/controller/IMonitorIndexDeployServiceController/loadParamVal?serviceId=yssmonitor-testor', {
      method: 'post',
      data: params,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then(res => {
      // console.log('点击查看参数设置详情值', res);
      resolve(res)
    }).catch(err => reject(err))
  })
}


// 参数设置（通用下拉框数据）
export function getConditionSelects ({ methodName, params, serviceId }) {
  return new Promise((resolve, reject) => {
    const getUrls = {
      "IVocDataService": (methodName) => {
        return "/osgi-fast/YSSUCOBRIDGE/ws/com/yss/platform/support/dataservice/controller/IVocDataServiceController/" + methodName + '?serviceId=osgi-fast'
      },
      "IMonitorIndexDropDownService": (methodName) => {
        return "/yssmonitor-testor/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/monitorIndex/controller/IMonitorIndexDropDownServiceController/" + methodName + '?serviceId=yssmonitor-testor'
      },
      "IOcpIndexDropDownService": (methodName) => {
        return "/yssmonitor-testor/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/indexParam/controller/IOcpIndexDropDownServiceController/" + methodName + '?serviceId=yssmonitor-testor'
      }
    }

    const getParams = {
      "IVocDataService": (params) => {
        return [params]
      },
      "IMonitorIndexDropDownService": (params) => (params),
      "IOcpIndexDropDownService": (params) => {
        return { "methodName": params, "paraMap": { "C_SEC_VAR_CODE": "FZ" } } // 此处有联动，暂时不写
      }
    }

    const url = getUrls[serviceId](methodName);
    params = getParams[serviceId](params);

    request(url, {
      method: 'post',
      data: params
    }).then(res => {
      console.log('请求条件下拉框', res);

      resolve(res)
    }).catch(err => reject(err))
  })
}


// 保存参数
export function saveParams (records) {
  return new Promise((resolve, reject) => {
    request('/yssmonitor-testor/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/indexDeploy/controller/IMonitorIndexDeployServiceController/setParamVal?serviceId=yssmonitor-testor', {
      method: 'post',
      data: records
    }).then(res => {
      console.log('保存参数配置', res);
      MsgBox.success({ message: '保存指标参数成功！' });
      resolve(res);
    }).catch(rerr => reject(err))
  })
}

// 删除参数 ,注意指标参数不可删除
export function deleteParams (records) {
  return new Promise((resolve, reject) => {
    request('/yssmonitor-testor/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/indexDeploy/controller/IMonitorIndexDeployServiceController/delParamVal?serviceId=yssmonitor-testor', {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: records
    }).then(res => {
      MsgBox.success({ message: '删除指标参数成功！' });
      resolve(res);
    }).catch(err => reject(err))
  })
}


// 指标检测
export function testIndex (data) {
  return new Promise((resolve, reject) => {
    request('/yssmonitor-testor/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/indexDeploy/controller/IMonitorIndexDeployServiceController/checkIn?serviceId=yssmonitor-testor', {
      method: 'post',
      data
    }).then(res => {
      const ret = []
      Object.keys(res.data).forEach(key => {
        const info = Object.keys(res.data[key]).map(_p => {
          return res.data[key][_p]
        })
        ret.push({
          index: key,
          info
        })
      })
      console.log('检测指标', ret)
      resolve(ret)
    }).catch(err => reject(err))
  })
}




// 查询关联组合
export function queryCombination (params) {
  return request.post('/ocp/indexinfo/deploy/portlist', { params });
}

// 查询关联模式下拉框
export function queryCombinationMode (params) {
  return request.post('/ocp/indexinfo/deploy/relatedcombination/combinationmode', { params });
}

// 参数设置
export function queryParam (params) {
  return request.post('/ocp/indexinfo/deploy/param', { params });
}

// 查询指标检测
export function queryTest (params) {
  return request.post('/ocp/indexinfo/detection', { params })
}

// 部署完成
export function queryComplete (params) {
  return request.post('/ocp/indexinfo/deploy/finish', { params })
}


