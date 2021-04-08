import OsgiService from '@/handles/OsgiService';
import request from '@/utils/request';

export default class TargetSettingSubService extends OsgiService {
  constructor() {
    super({
      base: '/yssmonitor-testor/YSSUCOBRIDGE/ws/com/yss/uco/monitor/indexDev/controller/IIndexDevServiceController/',
      query: '/yssmonitor-testor/YSSUCOBRIDGE/ws/com/yss/uco/monitor/indexDev/controller/IIndexDevServiceController/queryByCondition',
      getTopicSelect: '/yssmonitor-testor/YSSUCOBRIDGE/ws/com/yss/uco/monitor/indexDev/controller/IIndexDevORCABIServiceController/IndexDevGetORCAServices',
      getMoniterTypeSelect: '/yssmonitor-testor/YSSUCOBRIDGE/ws/com/yss/uco/monitor/indexDev/controller/IIndexDevORCABIServiceController/IndexDevGetORCAServices',

      // ...
    });
  }

  // query (params) {
  //   return new Promise((resolve, reject) => {
  //     request(this.url.query, {
  //       method: 'post',
  //       data: {
  //         ...params,
  //         "dataClass": "IndexDevPojo",	//数据Pojo，写死
  //         "C_INDEX_CODE": "contrast_test_public,contrast_test_jc",	//指标代码，多个逗号分隔
  //         // "C_MONITOR_TYPE": "reminder|threshold|contrast",	//监控类型，多个|分隔
  //         // "C_TOPIC_CODE": "BI_V_N_GZ_OD_CH_HL|BI_V_N_GZ_TRADE_DS",	//主题代码，多个|分隔
  //         // "C_TOPIC_VER": "20201212|20201127",	//主题版本，多个|分隔
  //         "N_CHECK_STATE": "SearchAll"	//审核状态，SearchAll：所有，SearchAudit：已审核，SearchUnAudit：未审核
  //       }
  //     }).then(res => {
  //       // 处理
  //       res = {
  //         "code": "success",
  //         "data": {
  //           "dataList": [
  //             {
  //               "id": "421",
  //               "modifier": "ht",
  //               "modifyDate": "20201214 14:10:31",
  //               "startUseDate": "2021-01-18 20:26:42",
  //               "endUseDate": "2021-01-18 20:26:42",
  //               "auditState": 1,
  //               "operator": "ht",
  //               "auditDate": "20201214 14:13:04",
  //               "contrastBase": "T1",	//核对基准
  //               "deployTime": "20201217 13:39:47",	//部署时间
  //               "detailLogAbnormalDesc": "异常，核对不一致",	//明细日志-异常/预警描述
  //               "fileName": "com.yss.ocp.dev.contrast_test_public_1.300.7-20201217",	//文件名
  //               "indexCode": "contrast_test_public",	//指标代码
  //               "indexDesc": "核对类指标",	//指标描述
  //               "indexName": "核对类指标",	//指标名称
  //               "ispublic": "1",	//是否公共指标
  //               "logAbnormalDesc": "有$(FAILCOUNT)笔人民银行汇率数据核对不一致",	//总览日志-异常/预警描述
  //               "logNormalDesc": "正常，核对一致",	//总览日志-正常描述
  //               "monitorType": "contrast",	//监控类型
  //               "promptingType": "fail",	//提醒类型
  //               "dataTopicDisplayText": "BI_V_N_GZ_OD_CH_HL_人民银行汇率_20201212,BI_V_N_GZ_OD_CH_HL_人民银行汇率_20201212"	//数据主题
  //             }
  //           ],
  //           "headKeyList": [
  //             {
  //               "key": "IndexCode",
  //               "text": "指标代码",
  //               "align": "L",
  //               "serviceId": "",
  //               "showName": "",
  //               "isShow": "",
  //               "width": "",
  //               "sortable": "",
  //               "order": "",
  //               "isExport": "",
  //               "isFrozen": "",
  //               "typeCode": "",
  //               "defaultDictTypeValue": "",
  //               "dictType": ""
  //             },
  //             {
  //               "key": "IndexName",
  //               "text": "指标名称",
  //               "align": "L",
  //               "serviceId": "",
  //               "showName": "",
  //               "isShow": "",
  //               "width": "",
  //               "sortable": "",
  //               "order": "",
  //               "isExport": "",
  //               "isFrozen": "",
  //               "typeCode": "",
  //               "defaultDictTypeValue": "",
  //               "dictType": ""
  //             },
  //             {
  //               "key": "Ispublic",
  //               "text": "指标类型",
  //               "align": "L",
  //               "serviceId": "IIndexDevDataService",
  //               "showName": "",
  //               "isShow": "",
  //               "width": "",
  //               "sortable": "",
  //               "order": "",
  //               "isExport": "",
  //               "isFrozen": "",
  //               "typeCode": "",
  //               "defaultDictTypeValue": "",
  //               "dictType": ""
  //             },
  //             {
  //               "key": "MonitorType",
  //               "text": "监控类型",
  //               "align": "L",
  //               "serviceId": "IIndexDevDataService",
  //               "showName": "",
  //               "isShow": "",
  //               "width": "",
  //               "sortable": "",
  //               "order": "",
  //               "isExport": "",
  //               "isFrozen": "",
  //               "typeCode": "",
  //               "defaultDictTypeValue": "",
  //               "dictType": ""
  //             },
  //             {
  //               "key": "PromptingType",
  //               "text": "提醒类型",
  //               "align": "L",
  //               "serviceId": "IIndexDevDataService",
  //               "showName": "",
  //               "isShow": "",
  //               "width": "",
  //               "sortable": "",
  //               "order": "",
  //               "isExport": "",
  //               "isFrozen": "",
  //               "typeCode": "",
  //               "defaultDictTypeValue": "",
  //               "dictType": ""
  //             },
  //             {
  //               "key": "DataTopicDisplayText",
  //               "text": "数据主题",
  //               "align": "L",
  //               "serviceId": "",
  //               "showName": "",
  //               "isShow": "",
  //               "width": "",
  //               "sortable": "",
  //               "order": "",
  //               "isExport": "",
  //               "isFrozen": "",
  //               "typeCode": "",
  //               "defaultDictTypeValue": "",
  //               "dictType": ""
  //             },
  //             {
  //               "key": "DeployTime",
  //               "text": "最近部署时间",
  //               "align": "L",
  //               "format": "yyyy-MM-dd hh:mm:ss",
  //               "serviceId": "",
  //               "showName": "",
  //               "isShow": "",
  //               "width": "",
  //               "sortable": "",
  //               "order": "",
  //               "isExport": "",
  //               "isFrozen": "",
  //               "typeCode": "",
  //               "defaultDictTypeValue": "",
  //               "dictType": ""
  //             },
  //             {
  //               "key": "Modifier",
  //               "text": "制作人",
  //               "align": "L",
  //               "format": "",
  //               "serviceId": "IUserDataService",
  //               "showName": "",
  //               "isShow": "",
  //               "width": "",
  //               "sortable": "",
  //               "order": "",
  //               "isExport": "",
  //               "isFrozen": "",
  //               "typeCode": "",
  //               "defaultDictTypeValue": "",
  //               "dictType": ""
  //             },
  //             {
  //               "key": "ModifyDate",
  //               "text": "制作时间",
  //               "align": "L",
  //               "format": "yyyy-MM-dd hh:mm:ss",
  //               "serviceId": "",
  //               "showName": "",
  //               "isShow": "",
  //               "width": "",
  //               "sortable": "",
  //               "order": "",
  //               "isExport": "",
  //               "isFrozen": "",
  //               "typeCode": "",
  //               "defaultDictTypeValue": "",
  //               "dictType": ""
  //             },
  //             {
  //               "key": "AuditState",
  //               "text": "审核状态",
  //               "align": "L",
  //               "format": "",
  //               "serviceId": "ICheckStateDataService",
  //               "showName": "",
  //               "isShow": "",
  //               "width": "",
  //               "sortable": "",
  //               "order": "",
  //               "isExport": "",
  //               "isFrozen": "",
  //               "typeCode": "",
  //               "defaultDictTypeValue": "",
  //               "dictType": ""
  //             },
  //             {
  //               "key": "C_CHECK_BY",
  //               "text": "审核人",
  //               "align": "L",
  //               "format": "",
  //               "serviceId": "IUserDataService",
  //               "showName": "",
  //               "isShow": "",
  //               "width": "",
  //               "sortable": "",
  //               "order": "",
  //               "isExport": "",
  //               "isFrozen": "",
  //               "typeCode": "",
  //               "defaultDictTypeValue": "",
  //               "dictType": ""
  //             },
  //             {
  //               "key": "AuditDate",
  //               "text": "审核时间",
  //               "align": "L",
  //               "format": "yyyy-MM-dd hh:mm:ss",
  //               "serviceId": "",
  //               "showName": "",
  //               "isShow": "",
  //               "width": "",
  //               "sortable": "",
  //               "order": "",
  //               "isExport": "",
  //               "isFrozen": "",
  //               "typeCode": "",
  //               "defaultDictTypeValue": "",
  //               "dictType": ""
  //             }
  //           ],
  //           "showConvertAssemble": {
  //             "IIndexDevDataService": {
  //               "1": "公共指标",
  //               "fail": "异常",
  //               "contrast": "数据核对类"
  //             },
  //             "IUserDataService": {
  //               "zxf": "赵雪峰",
  //               "ht": "核算会计"
  //             },
  //             "ICheckStateDataService": {
  //               "0": "未审核",
  //               "1": "已审核"
  //             }
  //           },
  //           "page": {
  //             "pageCount": 0,
  //             "currPage": 1,
  //             "pageSize": 100,
  //             "totalNum": 0,
  //             "usePage": true
  //           },
  //           "operRes": "Success",
  //           "listDataClass": "IndexDevPojo",
  //           "menuId": "ocpDevPlatform",
  //           "retValue": ""
  //         },
  //         "message": "",
  //         "success": true
  //       }
  //       const { data: { dataList, headKeyList, showConvertAssemble } } = res;
  //       // ！！！提取
  //       const list = dataList.map(data => {
  //         Object.keys(data).forEach(prop => {
  //           headKeyList.forEach(head => {
  //             if (head.serviceId && head.key.toUpperCase() === prop.toUpperCase()) {
  //               const _showConvertAssemble = showConvertAssemble[head.serviceId];
  //               console.log('转换', `${data[prop]}----->${_showConvertAssemble[data[prop]]}`)
  //               data[prop] = _showConvertAssemble[data[prop]]
  //             }
  //           })
  //         })
  //         return data;
  //       })

  //       res.data.list = list;
  //       resolve(res);
  //     })
  //   })
  // }
  // 数据主题下拉框请求
  getTopicSelect () {
    return new Promise((resolve, reject) => {
      request(this.url.getTopicSelect, {
        method: 'post',
        data: {
          pageSize: 1,
          pageNum: 2000,
          checkState: 1
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }).then(res => {
        // res = {
        //   "code": "success",
        //   "data": [
        //     {
        //       "id": "21011214033362019494",
        //       "creatorId": "20050416193610000016",
        //       "createTime": "2021-01-12 14:03:37",
        //       "lastEditorId": "20050416193610000016",
        //       "lastEditTime": "2021-01-12 14:04:03",
        //       "checkState": "1",
        //       "checkerId": "20050416193610000016",
        //       "checkTime": "2021-01-12 14:04:08",
        //       "permissions": [
        //         "view",
        //         "edit",
        //         "remove"
        //       ],
        //       "code": "test2021011101",	//主题代码
        //       "version": "1_0",			//主题版本
        //       "name": "test2021011101",	//主题名称
        //       "type": "0",
        //       "relId": "21011214031862013071",
        //       "userName": "运营管控平台",
        //       "sourceName": "数据主题/test2021011101",
        //       "url": "http://192.168.2.104:18083/api/v1/public/data-services/test2021011101",
        //       "checked": "true",
        //       "orderBy": ""
        //     }
        //   ],
        //   "message": "",
        //   "success": true
        // }

        // 处理
        if(res?.success){
          resolve(res)
        }
      })
    })

  }

  // 监控类型下拉框请求 ,接口尚未定义
  getMoniterTypeSelect () {
    return new Promise((resolve, reject) => {
      request(this.url.getTopicSelect, {
        method: 'post',
        data: {
          pageSize: 1,
          pageNum: 2000,
          checkState: 1
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }).then(res => {
        res = {
          "code": "success",
          "data": [
            {
              "id": "21011214033362019494",
              "creatorId": "20050416193610000016",
              "createTime": "2021-01-12 14:03:37",
              "lastEditorId": "20050416193610000016",
              "lastEditTime": "2021-01-12 14:04:03",
              "checkState": "1",
              "checkerId": "20050416193610000016",
              "checkTime": "2021-01-12 14:04:08",
              "permissions": [
                "view",
                "edit",
                "remove"
              ],
              "code": "test2021011101",	//主题代码
              "version": "1_0",			//主题版本
              "name": "test2021011101",	//主题名称
              "type": "0",
              "relId": "21011214031862013071",
              "userName": "运营管控平台",
              "sourceName": "数据主题/test2021011101",
              "url": "http://192.168.2.104:18083/api/v1/public/data-services/test2021011101",
              "checked": "true",
              "orderBy": ""
            }
          ],
          "message": "",
          "success": true
        }

        // 处理
        resolve(res)
      })
    })
  }
}

