/**
 * 指标参数mock接口
 */
import Mock from 'mockjs';
import { query, detail, save, deletes, changeState } from './MockUtil';

/**
 * 生成从表数据
 */
const getDataList = (size = 11) => {
  const tempList = [];
  for (let i = 0; i < size; i += 1) {
    const listItem = Mock.mock({
      id: '@id',
      indexName: '@ctitle(4,5)',
      effectiveParams: '',
      indexCode: '',
      associationPattern: '',
      founder: '',
      creatDate: '',
      // checkState: Math.random() > 0.5 ? 1 : 0, // 是否已审核
      description: '',
      children: [
        {
          id: '@id',
          isLeaf: true,
          indexName: '@ctitle(4,5)',
          effectiveParams: '@string(upper,7)',
          indexCode: '@string(upper,7)',
          associationPattern: '@ctitle(4,5)',
          founder: '@cname',
          creatDate: '@date("yyyy-MM-dd HH:mm:ss")',
          checkState: Math.random() > 0.5 ? 1 : 0, // 是否已审核
          description: `指标描述指标描述指标描述指标描述${Math.random(0)}`,
        },
        {
          id: '@id',
          isLeaf: true,
          indexName: '@ctitle(4,5)',
          effectiveParams: '@string(upper,7)',
          indexCode: '@string(upper,7)',
          associationPattern: '@ctitle(4,5)',
          founder: '@cname',
          creatDate: '@date("yyyy-MM-dd HH:mm:ss")',
          checkState: Math.random() > 0.5 ? 1 : 0, // 是否已审核
          description: `指标描述指标描述指标描述指标描述${Math.random(0)}`,
        },
        {
          id: '@id',
          isLeaf: true,
          indexName: '@ctitle(4,5)',
          effectiveParams: '@string(upper,7)',
          indexCode: '@string(upper,7)',
          associationPattern: '@ctitle(4,5)',
          founder: '@cname',
          creatDate: '@date("yyyy-MM-dd HH:mm:ss")',
          checkState: Math.random() > 0.5 ? 1 : 0, // 是否已审核
          description: `指标描述指标描述指标描述指标描述${Math.random(0)}`,
        },
        {
          id: '@id',
          isLeaf: true,
          indexName: '@ctitle(4,5)',
          effectiveParams: '@string(upper,7)',
          indexCode: '@string(upper,7)',
          associationPattern: '@ctitle(4,5)',
          founder: '@cname',
          creatDate: '@date("yyyy-MM-dd HH:mm:ss")',
          checkState: Math.random() > 0.5 ? 1 : 0, // 是否已审核
          description: `指标描述指标描述指标描述指标描述${Math.random(0)}`,
        },
        {
          id: '@id',
          isLeaf: true,
          indexName: '@ctitle(4,5)',
          effectiveParams: '@string(upper,7)',
          indexCode: '@string(upper,7)',
          associationPattern: '@ctitle(4,5)',
          founder: '@cname',
          creatDate: '@date("yyyy-MM-dd HH:mm:ss")',
          checkState: Math.random() > 0.5 ? 1 : 0, // 是否已审核
          description: `指标描述指标描述指标描述指标描述${Math.random(0)}`,
        },
        {
          id: '@id',
          isLeaf: true,
          indexName: '@ctitle(4,5)',
          effectiveParams: '@string(upper,7)',
          indexCode: '@string(upper,7)',
          associationPattern: '@ctitle(4,5)',
          founder: '@cname',
          creatDate: '@date("yyyy-MM-dd HH:mm:ss")',
          checkState: Math.random() > 0.5 ? 1 : 0, // 是否已审核
          description: `指标描述指标描述指标描述指标描述${Math.random(0)}`,
        },
        {
          id: '@id',
          isLeaf: true,
          indexName: '@ctitle(4,5)',
          effectiveParams: '@string(upper,7)',
          indexCode: '@string(upper,7)',
          associationPattern: '@ctitle(4,5)',
          founder: '@cname',
          creatDate: '@date("yyyy-MM-dd HH:mm:ss")',
          checkState: Math.random() > 0.5 ? 1 : 0, // 是否已审核
          description: `指标描述指标描述指标描述指标描述${Math.random(0)}`,
        },
        {
          id: '@id',
          isLeaf: true,
          indexName: '@ctitle(4,5)',
          effectiveParams: '@string(upper,7)',
          indexCode: '@string(upper,7)',
          associationPattern: '@ctitle(4,5)',
          founder: '@cname',
          creatDate: '@date("yyyy-MM-dd HH:mm:ss")',
          checkState: Math.random() > 0.5 ? 1 : 0, // 是否已审核
          description: `指标描述指标描述指标描述指标描述${Math.random(0)}`,
        },
        {
          id: '@id',
          isLeaf: true,
          indexName: '@ctitle(4,5)',
          effectiveParams: '@string(upper,7)',
          indexCode: '@string(upper,7)',
          associationPattern: '@ctitle(4,5)',
          founder: '@cname',
          creatDate: '@date("yyyy-MM-dd HH:mm:ss")',
          checkState: Math.random() > 0.5 ? 1 : 0, // 是否已审核
          description: `指标描述指标描述指标描述指标描述${Math.random(0)}`,
        },
        {
          id: '@id',
          isLeaf: true,
          indexName: '@ctitle(4,5)',
          effectiveParams: '@string(upper,7)',
          indexCode: '@string(upper,7)',
          associationPattern: '@ctitle(4,5)',
          founder: '@cname',
          creatDate: '@date("yyyy-MM-dd HH:mm:ss")',
          checkState: Math.random() > 0.5 ? 1 : 0, // 是否已审核
          description: `指标描述指标描述指标描述指标描述${Math.random(0)}`,
        },
      ],
    });
    tempList.push(listItem);
  }
  return tempList;
};

// 审核反审核
const changeCheck = (dataList1, ids, state) => {
  dataList1.forEach((item) => {
    console.log(item.children);
    item.children.forEach((x) => {
      if (ids.includes(x.id)) {
        x.checkState = state;
      }
    });
  });
};

/**
 * 扩展参数
 */
const exParamsData = (size = 31) => {
  const tempList = [];
  for (let i = 0; i < size; i += 1) {
    const listItem = Mock.mock({
      id: '@id',
      applyCombinate: '@ctitle(3,4)',
      securyType: '@string(upper,7)',
      tradMarket: '@string(upper,7)',
      securyName: '@ctitle(3,4)',
      tradSecury: '@cname',
      monitorConditions: '@ctitle(3,4)',
      threshold: '@ctitle(3,4)',
      startDate: `@date("yyyy-MM-dd HH:mm:ss")`,
      checkState: Math.random() > 0.5 ? 1 : 0,
    });
    tempList.push(listItem);
  }
  return tempList;
};

let exParamsList = exParamsData();

/**
 *扩展参数-修改
 * @param {*} data
 */
const saveParamsData = (data) => {
  if (!data.id) {
    const id = Mock.mock({
      id: '@id',
    });
    const obj = data;
    obj.id = id.id;
    obj.key = id.id;

    exParamsList.push(data);
  } else {
    const {
      id,
      applyCombinate,
      securyType,
      tradMarket,
      securyName,
      tradSecury,
      monitorConditions,
      threshold,
      startDate,
      checkState,
    } = data;

    exParamsList.some((item) => {
      const obj = item;
      if (item.id === id) {
        obj.id = id;
        obj.applyCombinate = applyCombinate;
        obj.securyType = securyType;
        obj.tradMarket = tradMarket;
        obj.securyName = securyName;
        obj.tradSecury = tradSecury;
        obj.monitorConditions = monitorConditions;
        obj.checkState = checkState;
        obj.threshold = threshold;
        obj.startDate = startDate;
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
 * 组合模式-主表查询
 */

const getTreeList = () => {
  const tempList = [];

  for (let i = 0; i < 20; i += 1) {
    const listItem = Mock.mock({
      id: '@id',
      key: '@id',
      typeName: '@ctitle',
      typeCode: '@string(upper,7)',
      typeP: '',
      isLeaf: false,
      children: [
        {
          id: '@id',
          key: '@id',
          typeName: '@ctitle',
          typeCode: '@string(upper,7)',
          typeP: '',
          isLeaf: true,
          children: [
            {
              id: '@id',
              key: '@id',
              typeName: '@ctitle',
              typeCode: '@string(upper,7)',
              typeP: '',
              isLeaf: true,
              children: [
                {
                  id: '@id',
                  key: '@id',
                  typeName: '@ctitle',
                  typeCode: '@string(upper,7)',
                  typeP: '',
                  isLeaf: false,
                },
                {
                  id: '@id',
                  key: '@id',
                  typeName: '@ctitle',
                  typeCode: '@string(upper,7)',
                  typeP: '',
                  isLeaf: false,
                },
              ],
            },
            {
              id: '@id',
              key: '@id',
              typeName: '@ctitle',
              typeCode: '@string(upper,7)',
              typeP: '',
              isLeaf: false,
            },
          ],
        },
        {
          id: '@id',
          key: '@id',
          typeName: '@ctitle',
          typeCode: '@string(upper,7)',
          typeP: '',
          isLeaf: false,
        },
      ],
    });
    tempList.push(listItem);
  }
  return tempList;
};

let masterTableList = getTreeList();

/**
 * 组合模式-从表查询
 */

let subTableData = getDataList();

/**
 * 指标模式-主表查询
 */
const getClassList = () => {
  const list = [
    {
      key: 1,
      id: 1,
      typeName: '指标分类一',
      typeCode: 'type1',
      typeP: '',
      isLeaf: false,
      children: [
        {
          key: 11,
          id: 11,
          typeName: '公共',
          typeCode: 'type11',
          typeP: 'type1',
          isLeaf: true,
        },
        {
          key: 12,
          id: 12,
          typeName: '行情',
          typeCode: 'type12',
          typeP: 'type1',
          isLeaf: false,
          children: [
            {
              key: 121,
              id: 121,
              typeName: '基金行情核对',
              typeCode: 'type121',
              typeP: 'type12',
              isLeaf: false,
            },
          ],
        },
        {
          key: 13,
          id: 13,
          typeName: '资产管理',
          typeCode: 'type13',
          typeP: 'type1',
          isLeaf: false,
        },
      ],
    },
    {
      key: 2,
      id: 2,
      typeName: '指标分类二',
      typeCode: 'type2',
      typeP: '',
      isLeaf: false,
    },
    {
      key: 3,
      id: 3,
      typeName: '指标分类三',
      typeCode: 'type3',
      typeP: '',
      isLeaf: false,
    },
    {
      key: 4,
      id: 4,
      typeName: '指标分类四',
      typeCode: 'type4',
      typeP: '',
      isLeaf: false,
    },
    {
      key: 5,
      id: 5,
      typeName: '指标分类五',
      typeCode: 'type5',
      typeP: '',
      isLeaf: false,
    },
  ];
  return list;
};

let masterIndexList = getClassList();

/**
 * 指标变更记录
 */
const getChangeRecordList = (size = 10) => {
  const tempList = [];
  for (let i = 0; i < size; i += 1) {
    const listItem = Mock.mock({
      id: '@id',
      submitDate: '@DATETIME("yyyy-MM-dd")',
      changeDate: '@DATETIME("yyyy-MM-dd")',
      submitBy: '@cname',
      background: '@ctitle(4,5)',
      description: `变更记录描述${Math.random(0)}`,
      remark: '@integer(100000,999999)',
      checkState: Math.random() > 0.5 ? 1 : 0,
      checkBy: '@cname',
    });
    tempList.push(listItem);
  }
  return tempList;
};

/**
 * 删除数据
 * @param {*} ids
 */

const deleteData = (ids) => {
  console.log(ids);
  exParamsList = exParamsList.filter((item) => ids.indexOf(item.id) === -1);
};

export default {
  // 组合模式-主表查询
  'POST /ocp/colmaster/query': function (req, res) {
    const data = {
      code: 'SUCCESS',
      data: {
        list: masterTableList,
        total: 12,
      },

      success: true,
      msg: '查询成功！',
    };
    res.json(data);
  },

  // 组合模式-从表查询
  'POST /ocp/indexparam/query': function (req, res) {
    const { data, pageNo, pageSize } = req.body;
    const response = {
      code: 'SUCCESS',
      data: {
        list: query(subTableData, pageNo, pageSize),
        total: subTableData.length,
      },
      success: true,
      msg: '查询成功！',
    };
    res.json(response);
    // const data = {
    //   code: 'SUCCESS',
    //   data: {
    //     list: subTableData,
    //     total: subTableData.length,
    //   },

    //   success: true,
    //   msg: '查询成功！',
    // };
    // res.json(data);
  },

  // 指标模式-主表查询
  'POST /ocp/indexmaster/query': function (req, res) {
    const data = {
      code: 'SUCCESS',
      data: {
        list: masterIndexList,
        total: 12,
      },

      success: true,
      msg: '查询成功！',
    };
    res.json(data);
  },

  // 指标模式-从表查询
  'POST /ocp/indexsub/query': function (req, res) {
    const { data, pageNo, pageSize } = req.body;
    const response = {
      code: 'SUCCESS',
      data: {
        list: query(subTableData, data, pageNo, pageSize),
        total: subTableData.length,
      },
      success: true,
      msg: '查询成功！',
    };
    res.json(response);

    // const data = {
    //   code: 'SUCCESS',
    //   data: {
    //     list: subTableData,
    //     total: 12,
    //   },
    //   success: true,
    //   msg: '查询成功！',
    // };
    // res.json(data);
  },

  // 指标详情
  'GET /ocp/monitor/index/detail': (req, res) => {
    const { check } = req.query;
    res.json({
      code: 'success',
      data: {
        indexCode: '指标代码',
        indexName: '指标名称',
        indexAlias: '指标别名',
        indexClassify: '指标分类',
        triggerPosition: '触发位置',
        indexType: '指标类型',
        dataSource: '来源界面',
        indexLevel: '指标级别',
        indexParent: '父级指标',
        riskLevel: '风险级别',
        description: '功能简介',
        applyPort: '适用组合',
        busiScope: '业务范围',
        fetchLogic: '取数逻辑',
        monitorRule: '监控规则',
        comment: '备注',
        check,
      },
      msg: '查询成功',
      success: true,
    });
  },

  // 扩展参数
  'POST /ocp/exParams/query': function (req, res) {
    const { data, pageNo, pageSize } = req.body;
    const result = {
      code: 'SUCCESS',
      data: { list: query(exParamsList, data, pageNo, pageSize), total: exParamsList.length },
      success: true,
      msg: '查询成功！',
    };
    res.json(result);
    // const data = {
    //   code: 'SUCCESS',
    //   data: {
    //     list: exParamsList,
    //     total: 12,
    //   },

    //   success: true,
    //   msg: '查询成功！',
    // };
    // res.json(data);
  },

  // 扩展参数-新增，编辑
  'POST /ocp/exParams/save': function (req, res) {
    const item = req.body;
    res.json(saveParamsData(item));
  },

  //  扩展参数-删除
  'DELETE /ocp/exParams/deletes': function (req, res) {
    const { ids } = req.body;
    deleteData(ids);
    const data = {
      code: 'SUCCESS',
      data: null,
      success: true,
      msg: '删除成功！',
    };
    return res.json(data);
  },

  // 组合模式-子表审核
  'POST /ocp/indexparam/check': function (req, res) {
    const { ids } = req.body;
    console.log(ids);
    changeCheck(subTableData, ids, 1);
    const data = {
      code: 'SUCCESS',
      data: null,
      success: true,
      msg: '审核成功！',
    };
    return res.json(data);
  },

  // 组合模式-子表反审核
  'POST /ocp/indexparam/uncheck': function (req, res) {
    const { ids } = req.body;
    console.log(ids);
    changeCheck(subTableData, ids, 0);
    const data = {
      code: 'SUCCESS',
      data: null,
      success: true,
      msg: '审核成功！',
    };
    return res.json(data);
  },

  // 指标模式-子表审核
  'POST /ocp/indexsub/check': function (req, res) {
    const { ids } = req.body;
    console.log(ids);
    changeCheck(subTableData, ids, 1);
    const data = {
      code: 'SUCCESS',
      data: null,
      success: true,
      msg: '审核成功！',
    };
    return res.json(data);
  },

  // 指标模式-子表反审核
  'POST /ocp/indexsub/uncheck': function (req, res) {
    const { ids } = req.body;
    console.log(ids);
    changeCheck(subTableData, ids, 0);
    const data = {
      code: 'SUCCESS',
      data: null,
      success: true,
      msg: '审核成功！',
    };
    return res.json(data);
  },

  // 子表编辑功能数据
  'GET /ocp/indexparam/update': (req, res) => {
    const data = {
      msg: 'mocK:文字说明',
      list: [
        {
          portCode: null,
          indexCode: '70049_TEST',
          planCode: null,
          paramID: 'P1',
          paramType: null,
          nameCode: 'name',
          nameVal: '检查包含全价报价债券',
          conditionCode: 'condition',
          conditionVal: '等于',
          valueCode: 'value',
          valueVal: '0',
          descCode: 'desc',
          descVal: '用于控制在取估值表债券持仓时,是否要排除债券的报价方式为全价的债品',
          relaType: '-',
          relaCode: '-',
          newRelaType: '-',
          newRelaCode: '-',
          id: '1',
        },
        {
          portCode: null,
          indexCode: '70049_TEST',
          planCode: null,
          paramID: 'P2',
          paramType: null,
          nameCode: 'name',
          nameVal: '检查包含全价报价债券',
          conditionCode: 'condition',
          conditionVal: '等于',
          valueCode: 'value',
          valueVal: '0',
          descCode: 'desc',
          descVal: '用于控制在取估值表债券持仓时,是否要排除债券的报价方式为全价的债品',
          relaType: '-',
          relaCode: '-',
          newRelaType: '-',
          newRelaCode: '-',
          id: '2',
        },
      ],
    };

    res.json({
      code: 'success',
      data,
      msg: '请求成功！',
      success: true,
    });
  },
};
