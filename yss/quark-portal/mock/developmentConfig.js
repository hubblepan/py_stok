/**
 * 指标开发配置
 */

import Mock from 'mockjs';
import { query, detail, save, deletes, changeState } from './MockUtil';

/**
 * 管控主题方案
 */
const getMainScheme = () => {
  const tempList = [];
  for (let i = 0; i < 25; i += 1) {
    const listItem = Mock.mock({
      id: '@id',
      schemeName: '@string(upper,7)',
      schemeCode: '@first',
      dataTopic: '@natural(18,40)',
      schemeDesc: '@id',
      operator: '@ctitle(2,4)',
      operationTime: '@integer(1000000,9999999)',
      auditBy: '@integer(100000,999999)',
      checkState: i % 2,
    });
    tempList.push(listItem);
  }
  return tempList;
};

let dataList = getMainScheme();

/**
 *编辑数据
 * @param {*} data
 */
const saveData = (data) => {
  if (!data.id) {
    const id = Mock.mock({
      id: '@id',
    });
    const obj = data;
    obj.id = id.id;

    dataList.push(data);
  } else {
    const {
      id,
      schemeName,
      schemeCode,
      dataTopic,
      schemeDesc,
      operator,
      operationTime,
      auditBy,
      checkState,
    } = data;

    dataList.some((item) => {
      const obj = item;
      if (item.id === id) {
        obj.id = id;
        obj.schemeName = schemeName;
        obj.schemeCode = schemeCode;
        obj.dataTopic = dataTopic;
        obj.schemeDesc = schemeDesc;
        obj.operator = operator;
        obj.operationTime = operationTime;
        obj.auditBy = auditBy;
        obj.checkState = checkState;
      }
      return true;
    });
  }
  const result = {
    code: 'SUCCESS',
    data: null,
    msg: '新增|修改成功！',
    success: true,
  };
  return result;
};

/**
 * 主题字段--表格查询
 */
const getMainFiled = () => {
  const tempList = [];
  for (let i = 0; i < 25; i += 1) {
    const listItem = Mock.mock({
      id: '@id',
      filed: '@string(upper,7)',
      type: '@first',
      alias: '@natural(18,40)',
      checkState: i % 2,
    });
    tempList.push(listItem);
  }
  return tempList;
};

let mainFiledList = getMainFiled();

/**
 * 主题参数--表格查询
 */
const getMainParams = () => {
  const tempList = [];
  for (let i = 0; i < 25; i += 1) {
    const listItem = Mock.mock({
      id: '@id',
      paramsName: '@string(upper,7)',
      condition: '@first',
      paramsValue: '@natural(18,40)',
      checkState: i % 2,
    });
    tempList.push(listItem);
  }
  return tempList;
};

let mainParamsList = getMainParams();

// 审核反审核
const changeCheck = (dataList1, ids, state) => {
  dataList1.forEach((item) => {
    if (ids.includes(item.id)) {
      item.checkState = state;
    }
  });
};

/**
 * 删除数据
 * @param {*} ids
 */

const deleteData = (ids) => {
  console.log(ids);
  dataList = dataList.filter((item) => ids.indexOf(item.id) === -1);
};

export default {
  // 主表查询
  'POST /api/mainScheme/query': function (req, res) {
    const { data, pageNo, pageSize } = req.body;
    const result = {
      code: 'SUCCESS',
      data: { list: query(dataList, data, pageNo, pageSize), total: dataList.length },
      success: true,
      msg: '查询成功！',
    };
    res.json(result);
  },

  // 主表新增、修改
  'POST /api/mainScheme/save': function (req, res) {
    const item = req.body;
    res.json(saveData(item));
  },
  // 主表复制
  'POST /api/mainScheme/copy': function (req, res) {
    const item = req.body;
    res.json(saveData(item));
  },

  // 主表删除
  'DELETE /api/mainScheme/deletes': function (req, res) {
    const { ids } = req.body;
    deleteData(ids);
    const data = {
      code: 'SUCCESS',
      data: null,
      success: true,
      message: '删除成功！',
    };
    return res.json(data);
  },

  // 主表审核
  'POST /api/mainScheme/check': function (req, res) {
    const { ids } = req.body;
    console.log(ids);
    changeCheck(dataList, ids, 1);
    const data = {
      code: 'SUCCESS',
      data: null,
      success: true,
      msg: '审核成功！',
    };
    return res.json(data);
  },

  // 主表反审核
  'POST /api/mainScheme/uncheck': function (req, res) {
    const { ids } = req.body;
    console.log(ids);
    changeCheck(dataList, ids, 0);
    const data = {
      code: 'SUCCESS',
      data: null,
      success: true,
      msg: '审核成功！',
    };
    return res.json(data);
  },

  // 主题参数表格--查询
  'POST /ocp/mainParam/query': function (req, res) {
    const data = {
      code: 'SUCCESS',
      data: {
        list: mainParamsList,
      },
      total: 100,
      success: true,
      msg: '查询成功！',
    };
    res.json(data);
  },

  // 主题字段表格--查询
  'POST /ocp/mainFiled/query': function (req, res) {
    const data = {
      code: 'SUCCESS',
      data: {
        list: mainFiledList,
      },
      total: 100,
      success: true,
      msg: '查询成功！',
    };
    res.json(data);
  },

  // 管控配置化指标--主表查询
  'POST /ocp/targetSetting/targetTree/query': function (req, res) {
    const list = [
      {
        id: 1,
        name: '公共指标',
        isLeaf: false,
        children: [
          {
            id: 11,
            name: '直接点',
            isLeaf: true,
          },
          {
            key: 12,
            id: 12,
            name: '指标名次显示位置2',
            isLeaf: false,
            children: [
              {
                id: 121,
                name: '指标名次显示位置3',
                isLeaf: true,
              },
            ],
          },
        ],
      },
      {
        id: 2,
        name: '期货资管',
        isLeaf: false,
      },
    ];
    const data = {
      code: 'SUCCESS',
      data: {
        list,
      },
      // total: 100,
      success: true,
      msg: '查询成功！',
    };
    res.json(data);
  },

  // 管控配置化指标--子表查询
  'POST /ocp/targetSetting/query': (req, res) => {
    const { pageNo, pageSize } = req.query;

    const total = 45;
    const getList = (lines) => {
      const ret = [];
      let _lines = Math.ceil(lines / pageSize);
      if (_lines == pageNo) {
        lines = total % pageSize;
      }
      for (let i = 0; i < lines; i++) {
        ret.push(
          Mock.mock({
            id: '@id',
            targetCode: '@string(upper,7)',
            targetName: '@ctitle(2,4)',
            alias: '@natural(18,40)',
            monitorType: '@ctitle(2,4)',
            noticeType: '@ctitle(2,4)',
            dataTheme: Math.random() > 0.5 ? '已部署' : '未部署',
            checkState: Math.random() > 0.5 ? 1 : 0,
            deployTime: '@date("yyyy-MM-dd HH:mm:ss")',
            makeTime: '@date("yyyy-MM-dd HH:mm:ss")',
            maker: '@cname',
            auditTime: '@date("yyyy-MM-dd HH:mm:ss")',
            auditor: '@cname'
          }),
        );
      }
      return ret;
    };
    const data = {
      code: 'SUCCESS',
      data: {
        list: getList(total),
        total,
      },
      success: true,
      msg: '查询成功！',
    };
    res.json(data);
  },

  // 管控配置化指标--子表删除
  'DELETE /ocp/targetSetting/deletes': (req, res) => {
    // const { ids } = req.body;
    // console.log(ids);
    // changeCheck(dataList, ids, 0);
    const data = {
      code: 'SUCCESS',
      data: null,
      success: true,
      msg: '删除成功！',
    };
    return res.json(data);
  },

  // 管控配置化指标--子表审核
  'POST /ocp/targetSetting/check': (req, res) => {
    // const { ids } = req.body;
    // console.log(ids);
    // changeCheck(dataList, ids, 0);
    const data = {
      code: 'SUCCESS',
      data: null,
      success: true,
      msg: '审核成功！',
    };
    return res.json(data);
  },

  // 管控配置化指标--子表反审核
  'POST /ocp/targetSetting/uncheck': (req, res) => {
    // const { ids } = req.body;
    // console.log(ids);
    // changeCheck(dataList, ids, 0);
    const data = {
      code: 'SUCCESS',
      data: null,
      success: true,
      msg: '反审核成功！',
    };
    return res.json(data);
  }
};
