// 接口数据转换
/**
 *
 * @param {*} param0
 */
const list2Tree = ({
  list,
  pKey,
  key,
  isLeaf
}) => {
  const tree = []
  for (var i = 0; i < list.length; i++) {
    if (typeof isLeaf === 'function' && typeof list[i].isLeaf === 'undefined') {
      list[i].isLeaf = isLeaf(list[i])
    }
    for (var j = 0; j < list.length; j++) {
      // 如果有父节点
      if (list[i][pKey] === list[j][key]) {
        // 放进它父节点的children数组中；如果children不存在，初始化为空数组
        list[j].children = list[j].children || []
        list[j].children.push(list[i])
        /** 应该在这里加，当某个节点有children的时候，一定是父结点 */
        list[j].isLeaf=false
        // if (!isLeaf) {
        //   list[j].isLeaf = false
        // }
        // 因为每个节点至多有一个父节点，所以这里可以退出本次循环，避免无意义的运算
        break
      } else {
        // if (!isLeaf) {
        //   list[j].isLeaf = true
        // }
      }
    }
    // 如果j的值等于list的长度，说明在内层循环中没有触发break，也就是说这个节点是根节点
    if (j === list.length) {
      tree.push(list[i])
    }
  }

  return tree
}

const convertDict = ({
  list,
  heads,
  dicts
}) => {

  // 第一层循环列表
  const subData = list.map(data => {
    // 第二层循环每个字段
    Object.keys(data).forEach(prop => {
      heads.forEach(head => {
        if (head.serviceId && head.key.toUpperCase() === prop.toUpperCase()) {
          const _dicts = dicts[head.serviceId];
          // console.log(`${prop}转义 ${data[prop]}----->${_dicts[data[prop]]}`)
          data[prop + '_Name'] = _dicts[data[prop]]
        }
      })
    })
    return data;
  })

  return subData;
}


const fastConvert = {
  list2Tree,
  convertDict
}

export default fastConvert;

// // ==============测试用例===============：

// console.log('------------测试用例--------------')

// // 1.数组转树
// const originListData = [
//   { id: 1, name: 'child1', parentId: 0 },
//   { id: 2, name: 'child2', parentId: 0 },
//   { id: 6, name: 'child2_1', parentId: 2 },
//   { id: 0, name: 'root' },
//   { id: 5, name: 'child1_2', parentId: 1 },
//   { id: 4, name: 'child1_1', parentId: 1 },
//   { id: 3, name: 'child3', parentId: 0 },
//   { id: 7, name: 'child3_1', parentId: 3 },
//   { id: 8, name: 'child3_1_1', parentId: 7 },
//   { id: 9, name: '根结点下第二个', parentId: 0 },
//   { id: 10, name: 'child2_1', parentId: 9 },
//   { id: 11, name: 'child2_2', parentId: 9 },
//   { id: 12, name: 'child2_2_1', parentId: 11 },
//   { id: 13, name: 'child2_2_2', parentId: 11 },
// ]

// console.log('list--->tree', JSON.stringify(list2Tree({
//   list: originListData,
//   key: 'id',
//   pKey: 'parentId'
// })))

// console.log('--------------------------')

// // 2.数组根据字典转子表
// const originSubData = {
//   "code": "success",
//   "data": {
//     "dataList": [
//       {
//         "id": "421",
//         "modifier": "ht",
//         "modifyDate": "20201214 14:10:31",
//         "startUseDate": "2021-01-18 20:26:42",
//         "endUseDate": "2021-01-18 20:26:42",
//         "auditState": 1,
//         "operator": "ht",
//         "auditDate": "20201214 14:13:04",
//         "contrastBase": "T1",	//核对基准
//         "deployTime": "20201217 13:39:47",	//部署时间
//         "detailLogAbnormalDesc": "异常，核对不一致",	//明细日志-异常/预警描述
//         "fileName": "com.yss.ocp.dev.contrast_test_public_1.300.7-20201217",	//文件名
//         "indexCode": "contrast_test_public",	//指标代码
//         "indexDesc": "核对类指标",	//指标描述
//         "indexName": "核对类指标",	//指标名称
//         "ispublic": "1",	//是否公共指标
//         "logAbnormalDesc": "有$(FAILCOUNT)笔人民银行汇率数据核对不一致",	//总览日志-异常/预警描述
//         "logNormalDesc": "正常，核对一致",	//总览日志-正常描述
//         "monitorType": "contrast",	//监控类型
//         "promptingType": "fail",	//提醒类型
//         "dataTopicDisplayText": "BI_V_N_GZ_OD_CH_HL_人民银行汇率_20201212,BI_V_N_GZ_OD_CH_HL_人民银行汇率_20201212"	//数据主题
//       }
//     ],
//     "headKeyList": [
//       {
//         "key": "IndexCode",
//         "text": "指标代码",
//         "align": "L",
//         "serviceId": "",
//         "showName": "",
//         "isShow": "",
//         "width": "",
//         "sortable": "",
//         "order": "",
//         "isExport": "",
//         "isFrozen": "",
//         "typeCode": "",
//         "defaultDictTypeValue": "",
//         "dictType": ""
//       },
//       {
//         "key": "IndexName",
//         "text": "指标名称",
//         "align": "L",
//         "serviceId": "",
//         "showName": "",
//         "isShow": "",
//         "width": "",
//         "sortable": "",
//         "order": "",
//         "isExport": "",
//         "isFrozen": "",
//         "typeCode": "",
//         "defaultDictTypeValue": "",
//         "dictType": ""
//       },
//       {
//         "key": "Ispublic",
//         "text": "指标类型",
//         "align": "L",
//         "serviceId": "IIndexDevDataService",
//         "showName": "",
//         "isShow": "",
//         "width": "",
//         "sortable": "",
//         "order": "",
//         "isExport": "",
//         "isFrozen": "",
//         "typeCode": "",
//         "defaultDictTypeValue": "",
//         "dictType": ""
//       },
//       {
//         "key": "MonitorType",
//         "text": "监控类型",
//         "align": "L",
//         "serviceId": "IIndexDevDataService",
//         "showName": "",
//         "isShow": "",
//         "width": "",
//         "sortable": "",
//         "order": "",
//         "isExport": "",
//         "isFrozen": "",
//         "typeCode": "",
//         "defaultDictTypeValue": "",
//         "dictType": ""
//       },
//       {
//         "key": "PromptingType",
//         "text": "提醒类型",
//         "align": "L",
//         "serviceId": "IIndexDevDataService",
//         "showName": "",
//         "isShow": "",
//         "width": "",
//         "sortable": "",
//         "order": "",
//         "isExport": "",
//         "isFrozen": "",
//         "typeCode": "",
//         "defaultDictTypeValue": "",
//         "dictType": ""
//       },
//       {
//         "key": "DataTopicDisplayText",
//         "text": "数据主题",
//         "align": "L",
//         "serviceId": "",
//         "showName": "",
//         "isShow": "",
//         "width": "",
//         "sortable": "",
//         "order": "",
//         "isExport": "",
//         "isFrozen": "",
//         "typeCode": "",
//         "defaultDictTypeValue": "",
//         "dictType": ""
//       },
//       {
//         "key": "DeployTime",
//         "text": "最近部署时间",
//         "align": "L",
//         "format": "yyyy-MM-dd hh:mm:ss",
//         "serviceId": "",
//         "showName": "",
//         "isShow": "",
//         "width": "",
//         "sortable": "",
//         "order": "",
//         "isExport": "",
//         "isFrozen": "",
//         "typeCode": "",
//         "defaultDictTypeValue": "",
//         "dictType": ""
//       },
//       {
//         "key": "Modifier",
//         "text": "制作人",
//         "align": "L",
//         "format": "",
//         "serviceId": "IUserDataService",
//         "showName": "",
//         "isShow": "",
//         "width": "",
//         "sortable": "",
//         "order": "",
//         "isExport": "",
//         "isFrozen": "",
//         "typeCode": "",
//         "defaultDictTypeValue": "",
//         "dictType": ""
//       },
//       {
//         "key": "ModifyDate",
//         "text": "制作时间",
//         "align": "L",
//         "format": "yyyy-MM-dd hh:mm:ss",
//         "serviceId": "",
//         "showName": "",
//         "isShow": "",
//         "width": "",
//         "sortable": "",
//         "order": "",
//         "isExport": "",
//         "isFrozen": "",
//         "typeCode": "",
//         "defaultDictTypeValue": "",
//         "dictType": ""
//       },
//       {
//         "key": "AuditState",
//         "text": "审核状态",
//         "align": "L",
//         "format": "",
//         "serviceId": "ICheckStateDataService",
//         "showName": "",
//         "isShow": "",
//         "width": "",
//         "sortable": "",
//         "order": "",
//         "isExport": "",
//         "isFrozen": "",
//         "typeCode": "",
//         "defaultDictTypeValue": "",
//         "dictType": ""
//       },
//       {
//         "key": "C_CHECK_BY",
//         "text": "审核人",
//         "align": "L",
//         "format": "",
//         "serviceId": "IUserDataService",
//         "showName": "",
//         "isShow": "",
//         "width": "",
//         "sortable": "",
//         "order": "",
//         "isExport": "",
//         "isFrozen": "",
//         "typeCode": "",
//         "defaultDictTypeValue": "",
//         "dictType": ""
//       },
//       {
//         "key": "AuditDate",
//         "text": "审核时间",
//         "align": "L",
//         "format": "yyyy-MM-dd hh:mm:ss",
//         "serviceId": "",
//         "showName": "",
//         "isShow": "",
//         "width": "",
//         "sortable": "",
//         "order": "",
//         "isExport": "",
//         "isFrozen": "",
//         "typeCode": "",
//         "defaultDictTypeValue": "",
//         "dictType": ""
//       }
//     ],
//     "showConvertAssemble": {
//       "IIndexDevDataService": {
//         "1": "公共指标",
//         "fail": "异常",
//         "contrast": "数据核对类"
//       },
//       "IUserDataService": {
//         "zxf": "赵雪峰",
//         "ht": "核算会计"
//       },
//       "ICheckStateDataService": {
//         "0": "未审核",
//         "1": "已审核"
//       }
//     },
//     "page": {
//       "pageCount": 0,
//       "currPage": 1,
//       "pageSize": 100,
//       "totalNum": 0,
//       "usePage": true
//     },
//     "operRes": "Success",
//     "listDataClass": "IndexDevPojo",
//     "menuId": "ocpDevPlatform",
//     "retValue": ""
//   },
//   "message": "",
//   "success": true
// }
// const { data: { dataList, headKeyList, showConvertAssemble } } = originSubData;
// console.log('list--->subData', JSON.stringify(list2SubData({ list: dataList, heads: headKeyList, dicts: showConvertAssemble })))
