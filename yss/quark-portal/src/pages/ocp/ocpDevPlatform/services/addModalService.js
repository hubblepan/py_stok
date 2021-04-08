// 新增页面
import request from "@/utils/request";
import AppContext from '@/utils/AppContext';


// 保存指标配置化信息
export async function saveIndexDev(params) {
  return request('/yssmonitor-testor/YSSUCOBRIDGE/ws/com/yss/uco/monitor/indexDev/controller/IIndexDevServiceController/addIndexDev', {
    method: 'POST',
    data: params,
  });
}

// 修改指标配置化信息
export async function updateIndexDev(params) {
  return request('/yssmonitor-testor/YSSUCOBRIDGE/ws/com/yss/uco/monitor/indexDev/controller/IIndexDevServiceController/updateIndexDev', {
    method: 'POST',
    data: params,
  });
}

export async function queryIndexDictData() {
  return request('/yssmonitor-testor/YSSUCOBRIDGE/ws/com/yss/uco/monitor/indexDev/controller/IIndexDevServiceController/queryAllIndexDevSysVar', {
    method: 'POST',
  });
}


// 查询明细字段字典数据
export const queryDictData = (params) => {
  return new Promise((resolve, reject) => {
    request.post('/YSSUCOBRIDGE/ws/com/yss/uco/monitor/indexDev/controller/IIndexDevServiceController/queryAllDropDown', {}).then(res => {
      resolve(res);
    }).catch(err => {
      reject(err)
    })
  })
}



// 新增界面-总览描述和明细描述中的系统变量列表
/**
export const querySysVar = (params) => {
  return new Promise((resolve, reject) => {
    request.post('/YSSUCOBRIDGE/ws/com/yss/uco/monitor/indexDev/controller/IIndexDevServiceController/queryAllIndexDevSysVar', {}).then(res => {
      res = {
        "code": "success",
        "data": [
          {
            "id": "181",
            "varCode": "SUCCESSCOUNT",	//变量代码
            "varName": "正常记录数",	//变量名称
            "varDataType": "INT",	//变量数据类型
            "varType": "0",	//变量分类
            "varDesc": "用于统计配置化指标监控日志总览的正常记录数"	//变量描述
          },
          {
            "id": "182",
            "varCode": "FAILCOUNT",
            "varName": "异常记录数",
            "varDataType": "INT",
            "varType": "0",
            "varDesc": "用于统计配置化指标监控日志总览的异常记录数"
          },
          {
            "id": "183",
            "varCode": "WARNINGCOUNT",
            "varName": "预警记录数",
            "varDataType": "INT",
            "varType": "0",
            "varDesc": "用于统计配置化指标监控日志总览的预警记录数"
          }
        ],
        "message": "",
        "success": true
      }
      resolve(res);
    }).catch(err => {
      reject(err)
    })
  })
}
* */

// 新增页面-基本信息-主题模板下拉框 只需要使用dataList的数据
/**
export const queryThemeData = (params) => {
  return new Promise((resolve, reject) => {
    request.post('/YSSUCOBRIDGE/ws/com/yss/uco/monitor/indexDev/controller/IIndexDevTopicPlanServiceController/queryByCondition', {
      data: {
        "dataClass": "IndexDevTopicPlanPojo",	//数据Pojo，写死
        "N_CHECK_STATE": "SearchAudit",	//已审核
        "C_TOPIC_CODE": "ceshizhuti_shujuzidian_zxf",	//主题代码
        "C_TOPIC_VER": "V1",//主题版本
        ...params
      }
    }).then(res => {
      res.data.dataList = [
        {
          "id": "82",
          "modifier": "zxf",
          "modifyDate": "20200815 14:48:17",
          "startUseDate": "2021-01-19 09:40:19",
          "endUseDate": "2021-01-19 09:40:19",
          "auditState": 1,
          "operator": "zxf",
          "auditDate": "20200815 14:48:23",
          "topicCode": "ceshizhuti_shujuzidian_zxf",	//主题代码
          "topicName": "测试主题-数据字典-赵",	//主题名称
          "topicPlanCode": "ceshifangan1_z",	//主题方案代码
          "topicPlanName": "测试指标1_赵",		//主题方案名称
          "topicVer": "V1"
        }
      ]

      resolve(res);
    }).catch(err => {
      reject(err)
    })
  })
}
* */

// 新增界面-条件运算、条件参数、参数条件等下拉框
// 主题参数函数：["DEV_INDEX_TOPIC_FUN"]
// 条件运算：["DEV_INDEX_SQLCOND"]
// 条件参数：["DEV_INDEX_RLA_TYPE"]
// 参数条件：["DEV_INDEX_NR"]
// 这里是4个接口
export const queryCondictionFunc = (params) => {
  return new Promise((resolve, reject) => {
    request.post('/osgi-fast/YSSUCOBRIDGE/ws/com/yss/platform/support/dataservice/controller/IVocDataServiceController/getDataListByTypes?serviceId=osgi-fast', {
      data: ["DEV_INDEX_TOPIC_FUN"],
    }).then(res => {

      /**
      res = {
        "code": "success",
        "data": [
          {
            "id": "",
            "c_DV_CODE": "SQL_COND_DYE",	//字典代码
            "c_DV_NAME": "=",	//字典名称
            "c_DV_TYPE": "DEV_INDEX_SQLCOND",	//字典类型
            "n_ORDER": "1",
            "c_DESC": "配置化指标SQL参数条件",	//字典描述
            "c_AUTH_ORG_CODE": "[root]"
          },
          {
            "id": "",
            "c_DV_CODE": "SQL_COND_BDY",
            "c_DV_NAME": "<>",
            "c_DV_TYPE": "DEV_INDEX_SQLCOND",
            "n_ORDER": "2",
            "c_DESC": "配置化指标SQL参数条件",
            "c_AUTH_ORG_CODE": "[root]"
          },
          {
            "id": "",
            "c_DV_CODE": "SQL_COND_LIKE",
            "c_DV_NAME": "like",
            "c_DV_TYPE": "DEV_INDEX_SQLCOND",
            "n_ORDER": "3",
            "c_DESC": "配置化指标SQL参数条件",
            "c_AUTH_ORG_CODE": "[root]"
          },
          {
            "id": "",
            "c_DV_CODE": "SQL_COND_IN",
            "c_DV_NAME": "in",
            "c_DV_TYPE": "DEV_INDEX_SQLCOND",
            "n_ORDER": "4",
            "c_DESC": "配置化指标SQL参数条件",
            "c_AUTH_ORG_CODE": "[root]"
          }
        ],
        "message": "",
        "success": true
      }
      * */
     console.log('主题参数函数', res)
      resolve(res);
    }).catch(err => {
      reject(err)
    })
  })
}

// 条件运算  =,<>,like in
export const queryCondictionCalc = (params) => {
  return new Promise((resolve, reject) => {
    request.post('/osgi-fast/YSSUCOBRIDGE/ws/com/yss/platform/support/dataservice/controller/IVocDataServiceController/getDataListByTypes', {
      data: ["DEV_INDEX_SQLCOND"],
    }).then(res => {
      console.log('条件运算', res)
      resolve(res);
    }).catch(err => {
      reject(err)
    })
  })
}

// 条件关系   或者,并且
export const queryCondictionParam = (params) => {
  return new Promise((resolve, reject) => {
    request.post('/osgi-fast/YSSUCOBRIDGE/ws/com/yss/platform/support/dataservice/controller/IVocDataServiceController/getDataListByTypes', {
      data: ["DEV_INDEX_RLA_TYPE"],
    }).then(res => {
      console.log('条件关系', res)
      resolve(res);
    }).catch(err => {
      reject(err)
    })
  })
}

// 参数条件  大于, 大于等于, 等于, 小于, 小于等于, 范围内, 范围外, 包含
export const queryParamCondictions = (params) => {
  return new Promise((resolve, reject) => {
    request.post('/osgi-fast/YSSUCOBRIDGE/ws/com/yss/platform/support/dataservice/controller/IVocDataServiceController/getDataListByTypes', {
      data: ["DEV_INDEX_NR"],
    }).then(res => {
      console.log('参数条件', res)
      resolve(res);
    }).catch(err => {
      reject(err)
    })
  })
}


