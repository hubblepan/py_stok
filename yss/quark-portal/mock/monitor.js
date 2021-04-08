/**
 * 监控日志总览mock接口
 */
import Mock from 'mockjs';

const getTreeList = () => {
  const tempList = [];
  for (let i = 0; i < 20; i += 1) {
    const listItem = Mock.mock({
      id: '@id',
      classifyName: '@ctitle(4)',
      isLeaf: i % 2,
      children:
        i % 2
          ? null
          : [
              {
                id: '@id',
                classifyName: '@ctitle(4)',
                isLeaf: false,
                children: [
                  {
                    id: '@id',
                    classifyName: '@ctitle(8)',
                    isLeaf: true,
                  },
                ],
              },
              {
                id: '@id',
                classifyName: '@ctitle(8)',
                isLeaf: true,
              },
            ],
    });
    tempList.push(listItem);
  }
  return tempList;
};
const getmonitorlogList = () => {
  const tempList = [];
  for (let i = 0; i < 113; i += 1) {
    const listItem = Mock.mock({
      id: '@id',
      c_INDEX_NAME: '@ctitle(4)', // 中文名称
      c_MONITOR_STATE: i % 3,
      c_EXECUTE_STATE: i % 2,
      c_EXE_RESULT: '@ctitle(10)',
      confirmStatus: i % 2,
    });
    tempList.push(listItem);
  }
  return tempList;
};
const getIndexmodeList = () => {
  const tempList = [];
  for (let i = 0; i < 29; i += 1) {
    const listItem = Mock.mock({
      id: '@id',
      indexName: '@ctitle(4)', // 中文名称
      portCode: '@integer(1000000,9999999)',
      relaMode: '@ctitle(4,5)',
      bindState: i % 3 ? 1 : 0,
      remark: '@ctitle(10)',
      createName: '@cname',
      createDate: '@date("yyyy-MM-dd HH:mm:ss")',
      checkState: i % 2,
      checkName: '@cname',
      checkDate: '@date("yyyy-MM-dd HH:mm:ss")',

      // mainCode: '@string(upper,7)',
      // mainName: '@first',
      // mainNum: '@natural(18,40)',
      // tags: '@id',
      // mainType: '@ctitle(2,4)',
      // oraCode: '@integer(1000000,9999999)',
      // creditCode: '@integer(100000,999999)',
      // oraStyle: '@ctitle(2,4)',
      // selectable: i % 5 !== 0,
      // selected: i % 3 === 0,
    });
    tempList.push(listItem);
  }
  return tempList;
};
const getRelamodeList = () => {
  const tempList = [];
  for (let i = 0; i < 29; i += 1) {
    const listItem = Mock.mock({
      id: '@id',
      indexName: '@ctitle(4)', // 中文名称
      portCode: '@integer(1000000,9999999)',
      relaMode: '@ctitle(4,5)',
      bindState: i % 3 ? 1 : 0,
      remark: '@ctitle(10)',
      createName: '@cname',
      createDate: '@date("yyyy-MM-dd HH:mm:ss")',
      checkState: i % 2,
      checkName: '@cname',
      checkDate: '@date("yyyy-MM-dd HH:mm:ss")',

      // mainCode: '@string(upper,7)',
      // mainName: '@first',
      // mainNum: '@natural(18,40)',
      // tags: '@id',
      // mainType: '@ctitle(2,4)',
      // oraCode: '@integer(1000000,9999999)',
      // creditCode: '@integer(100000,999999)',
      // oraStyle: '@ctitle(2,4)',
      // selectable: i % 5 !== 0,
      // selected: i % 3 === 0,
    });
    tempList.push(listItem);
  }
  return tempList;
};
const getOptions = () => {
  const tempList = [];
  for (let i = 0; i < 4; i += 1) {
    const listItem = Mock.mock({
      label: '@ctitle(4)', // 中文名称
      value: '@string(lower,1)',
    });
    tempList.push(listItem);
  }
  return tempList;
};
const getDataSource = () => {
  const tempList = [];
  for (let i = 0; i < 21; i += 1) {
    const listItem = Mock.mock({
      id: '@id',
      key: i,
      title: '@ctitle(3)', // 中文名称
      related: i % 2,
    });
    tempList.push(listItem);
  }
  return tempList;
};
const getClassifyList = () => {
  const tempList = [];
  for (let i = 0; i < 20; i += 1) {
    const listItem = Mock.mock({
      id: '@id',
      classifyName: '@ctitle(4)',
    });
    tempList.push(listItem);
  }
  return tempList;
};
const getCombinationList = () => {
  const tempList = [];
  for (let i = 0; i < 20; i += 1) {
    const listItem = Mock.mock({
      id: '@id',
      combinationName: '@ctitle(8)',
      isLeaf: i % 2,
      children:
        i % 2
          ? null
          : [
              {
                id: '@id',
                combinationName: '@ctitle(8)',
                isLeaf: false,
                children: [
                  {
                    id: '@id',
                    combinationName: '@ctitle(8)',
                    isLeaf: true,
                  },
                ],
              },
              {
                id: '@id',
                combinationName: '@ctitle(8)',
                isLeaf: true,
              },
            ],
    });
    tempList.push(listItem);
  }
  return tempList;
};
const getMonitorDetailList = () => {
  const tempList = [];
  for (let i = 0; i < 20; i += 1) {
    const listItem = Mock.mock({
      id: '@id',
      businessDate: '@date("yyyy-MM-dd")',
      combinationCode: '@integer(10000000,99999999)',
      combinationName: '@ctitle(6)',
      stockCode: '@integer(100000,999999)',
      stockName: '@ctitle(4)',
      stockType: '@ctitle(2)',
      confirmStatus: i % 2,
    });
    tempList.push(listItem);
  }
  return tempList;
};
const getMonitorDetailList1 = () => {
  const tempList = [];
  for (let i = 0; i < 20; i += 1) {
    const listItem = Mock.mock({
      id: '@id',
      businessDate: '@date("yyyy-MM-dd")',
      combinationCode: '@integer(10000000,99999999)',
      combinationName: '@ctitle(6)',
      stockCode: '@integer(100000,999999)',
      stockName: '@ctitle(4)',
      stockType: '@ctitle(2)',
      confirmStatus: i % 2,
      children: [
        {
          id: '@id',
          businessDate: '@date("yyyy-MM-dd")',
          combinationCode: '@integer(10000000,99999999)',
          combinationName: '@ctitle(6)',
          stockCode: '@integer(100000,999999)',
          stockName: '@ctitle(4)',
          stockType: '@ctitle(2)',
          confirmStatus: i % 2,
          isLeaf: true,
        },
        {
          id: '@id',
          businessDate: '@date("yyyy-MM-dd")',
          combinationCode: '@integer(10000000,99999999)',
          combinationName: '@ctitle(6)',
          stockCode: '@integer(100000,999999)',
          stockName: '@ctitle(4)',
          stockType: '@ctitle(2)',
          confirmStatus: i % 2,
          isLeaf: true,
        },
      ],
    });
    tempList.push(listItem);
  }
  return tempList;
};
const getMonitorDetailList2 = () => {
  const tempList = [];
  for (let i = 0; i < 20; i += 1) {
    const listItem = Mock.mock({
      id: '@id',
      businessDate: '@date("yyyy-MM-dd")',
      combinationCode: '@integer(10000000,99999999)',
      combinationName: '@ctitle(6)',
      // 估值和
      estimation: '@float(000,999,2,2)',
      // O32
      O32: '@float(000,999,2,2)',
      stockType: '@ctitle(2)',
      confirmStatus: i % 2,
    });
    tempList.push(listItem);
  }
  return tempList;
};
const getMonitorVoucherList = () => {
  const tempList = [];
  for (let i = 0; i < 20; i += 1) {
    const listItem = Mock.mock({
      id: '@id',
      voucherNumber: '@integer(00,99)',
      subjectCode: '@string(upper,6)',
      subjectName: '@ctitle(4)',
      loan: i % 2 ? '借' : '贷',
      amount: '@integer(000,999)',
      money: '@float(000,999,2,2)',
    });
    tempList.push(listItem);
  }
  return tempList;
};
const getMonitorVoucherList1 = () => {
  const tempList = [];
  for (let i = 0; i < 20; i += 1) {
    const listItem = Mock.mock({
      id: '@id',
      stockCode: '@string(upper,6)',
      stockName: '@ctitle(6)',
      trade: '@ctitle(4)',
      amount: '@integer(000,999)',
      money: '@float(000,999,2,2)',
      date: '@date("yyyy-MM-dd")',
    });
    tempList.push(listItem);
  }
  return tempList;
};
const getMonitorTargetDetail = () => {
  const listItem = Mock.mock({
    id: '@id',
    indexName: '@ctitle(4)',
    indexAlias: '@ctitle(4)',
    indexClassify: '@ctitle(4)',
    triggerPosition: '@ctitle(4)',
    indexType: '@ctitle(4)',
    dataSource: '@ctitle(4)',
    indexLevel: '@ctitle(4)',
    indexParent: '@ctitle(4)',
    riskLevel: '@ctitle(4)',
    description: '@ctitle(4)',
    applyPort: '@ctitle(4)',
    busiScope: '@ctitle(4)',
    fetchLogic: '@ctitle(4)',
    monitorRule: '@ctitle(4)',
    comment: '@ctitle(4)',
    requirement: '@ctitle(4)',
    requirementDate: '@date("yyyy-MM-dd")',
  });
  return listItem;
};
const getPlanList = () => {
  const tempList = [];
  for (let i = 0; i < 5; i += 1) {
    const listItem = Mock.mock({
      id: '@id',
      code: '@string(upper,4)',
      label: '@ctitle(4)',
    });
    tempList.push(listItem);
  }
  return tempList;
};
const getTreemonitorList = () => {
  const tempList = [];
  for (let i = 0; i < 20; i += 1) {
    const listItem = Mock.mock({
      id: '@id',
      indexName: '@ctitle(4)',
      indexCode: '@string(lower,3)',
      commonIndex: i % 2,
      isLeaf: i % 2,
      children:
        i % 2
          ? null
          : [
              {
                id: '@id',
                indexName: '@ctitle(4)',
                indexCode: '@string(lower,3)',
                commonIndex: i % 2,
                isLeaf: false,
                children: [
                  {
                    id: '@id',
                    indexName: '@ctitle(8)',
                    indexCode: '@string(lower,3)',
                    commonIndex: i % 2,
                    isLeaf: true,
                  },
                ],
              },
              {
                id: '@id',
                indexName: '@ctitle(8)',
                indexCode: '@string(lower,3)',
                commonIndex: i % 2,
                isLeaf: true,
              },
            ],
    });
    tempList.push(listItem);
  }
  return tempList;
};
const addRelamodeList = (relamodeList) => {
  const listItem = Mock.mock({
    id: '@id',
    indexName: '@ctitle(4)', // 中文名称
    portCode: '@integer(1000000,9999999)',
    relaMode: '@ctitle(4,5)',
    bindState: 1,
    remark: '@ctitle(10)',
    createName: '@cname',
    createDate: '@date("yyyy-MM-dd HH:mm:ss")',
    checkState: 0,
    checkName: '@cname',
    checkDate: '@date("yyyy-MM-dd HH:mm:ss")',
  });
  relamodeList.unshift(listItem);
};
const treeList = getTreeList();
const treeList1 = getTreeList();
const monitorlogList = getmonitorlogList();
const monitorlogList1 = getmonitorlogList();
const indexmodeList = getIndexmodeList();
const relamodeList = getRelamodeList();
const options = getOptions();
const dataSource = getDataSource();
const classifyList = getClassifyList();
const combinationList = getCombinationList();
const monitorDetailList = getMonitorDetailList();
const monitorDetailList1 = getMonitorDetailList1();
const monitorDetailList2 = getMonitorDetailList2();
const monitorVoucherList = getMonitorVoucherList();
const monitorVoucherList1 = getMonitorVoucherList1();
const targetDetail = getMonitorTargetDetail();
const planList = getPlanList();
const treemonitorList = getTreemonitorList();
const changeConfirm = (dataList, ids, status) => {
  dataList.forEach((item) => {
    if (ids.includes(item.id)) {
      item.confirmStatus = status;
    }
  });
};
const changeBind = (dataList, ids, state) => {
  dataList.forEach((item) => {
    if (ids.includes(item.id)) {
      item.bindState = state;
    }
  });
};
const query = (modeList, pageNo, pageSize) => {
  pageNo = Number.parseInt(pageNo);
  pageSize = Number.parseInt(pageSize);
  let tempList = [];
  const startIndex = (pageNo - 1) * pageSize;
  console.log(startIndex);
  console.log(startIndex + pageSize);
  tempList = modeList.slice(startIndex, startIndex + pageSize);
  console.log(tempList.length);
  return tempList;
};
export default {
  // 主表查询
  'POST /ocp/monitor/master/query': function (req, res) {
    const data = {
      code: 'SUCCESS',
      data: {
        list: treeList,
        total: 12,
      },

      success: true,
      msg: '查询成功！',
    };
    res.json(data);
  },
  'POST /ocp/monitor/master1/query': function (req, res) {
    const data = {
      code: 'SUCCESS',
      data: {
        list: treeList1,
        total: 12,
      },

      success: true,
      msg: '查询成功！',
    };
    res.json(data);
  },
  // 子表查询
  'POST /ocp/monitor/sub/query': function (req, res) {
    const { pageNo, pageSize } = req.body;
    console.log(req.query);
    const response = {
      code: 'SUCCESS',
      data: {
        list: query(monitorlogList, pageNo, pageSize),
        total: monitorlogList.length,
      },
      success: true,
      msg: '查询成功！',
    };
    res.json(response);
  },
  'POST /ocp/monitor/sub1/query': function (req, res) {
    const { pageNo, pageSize } = req.body;
    console.log(req.query);
    const response = {
      code: 'SUCCESS',
      data: {
        list: query(monitorlogList1, pageNo, pageSize),
        total: monitorlogList1.length,
      },
      success: true,
      msg: '查询成功！',
    };
    res.json(response);
  },

  // 执行
  'post /ocp/monitor/sub/execute': function (req, res) {
    const { ids } = req.body;
    console.log(ids);
    const response = {
      code: 'SUCCESS',
      data: null,
      success: true,
      msg: '执行成功！',
    };
    return res.json(response);
  },
  'post /ocp/monitor/sub1/execute': function (req, res) {
    const { ids } = req.body;
    console.log(ids);
    const response = {
      code: 'SUCCESS',
      data: null,
      success: true,
      msg: '执行成功！',
    };
    return res.json(response);
  },
  // 确认
  'post /ocp/monitor/sub/confirm': function (req, res) {
    const { ids } = req.body;
    console.log(ids);
    changeConfirm(monitorlogList, ids, 1);
    const data = {
      code: 'SUCCESS',
      data: null,
      success: true,
      msg: '确认成功！',
    };
    return res.json(data);
  },
  'post /ocp/monitor/sub1/confirm': function (req, res) {
    const { ids } = req.body;
    console.log(ids);
    changeConfirm(monitorlogList1, ids, 1);
    const data = {
      code: 'SUCCESS',
      data: null,
      success: true,
      msg: '确认成功！',
    };
    return res.json(data);
  },
  // 反确认
  'post /ocp/monitor/sub/unconfirm': function (req, res) {
    const { ids } = req.body;
    console.log(ids);
    changeConfirm(monitorlogList, ids, 0);
    const data = {
      code: 'SUCCESS',
      data: null,
      success: true,
      msg: '确认成功！',
    };
    return res.json(data);
  },
  'post /ocp/monitor/sub1/unconfirm': function (req, res) {
    const { ids } = req.body;
    console.log(ids);
    changeConfirm(monitorlogList1, ids, 0);
    const data = {
      code: 'SUCCESS',
      data: null,
      success: true,
      msg: '确认成功！',
    };
    return res.json(data);
  },
  /**
   * 查询条件
   * 1.查询方案
   */
  'post /ocp/monitor/sub/queryplans': function (req, res) {
    const response = {
      code: 'SUCCESS',
      data: { list: planList },
      success: true,
      msg: '查询成功！',
    };
    return res.json(response);
  },
  // 2.监控指标
  'get /ocp/monitor/sub/treetarget': function (req, res) {
    const response = {
      code: 'SUCCESS',
      data: { list: treemonitorList },
      success: true,
      msg: '查询成功！',
    };
    return res.json(response);
  },
  /**
   * 监控详情
   */
  // 1.查询
  'post /ocp/monitor/detail/query': function (req, res) {
    const response = {
      code: 'SUCCESS',
      data: { list: monitorDetailList },
      success: true,
      msg: '查询成功！',
    };
    return res.json(response);
  },
  // 2.确认
  'post /ocp/monitor/detail/confirm': function (req, res) {
    const { ids } = req.body;
    changeConfirm(monitorDetailList, ids, 1);
    const response = {
      code: 'SUCCESS',
      data: null,
      success: true,
      msg: '查询成功！',
    };
    return res.json(response);
  },
  // 3.反确认
  'post /ocp/monitor/detail/unconfirm': function (req, res) {
    const { ids } = req.body;
    changeConfirm(monitorDetailList, ids, 0);
    const response = {
      code: 'SUCCESS',
      data: null,
      success: true,
      msg: '查询成功！',
    };
    return res.json(response);
  },
  // 1.查询
  'post /ocp/monitor/detail1/query': function (req, res) {
    const response = {
      code: 'SUCCESS',
      data: { list: monitorDetailList1 },
      success: true,
      msg: '查询成功！',
    };
    return res.json(response);
  },
  // 2.确认
  'post /ocp/monitor/detail1/confirm': function (req, res) {
    const { ids } = req.body;
    changeConfirm(monitorDetailList1, ids, 1);
    const response = {
      code: 'SUCCESS',
      data: null,
      success: true,
      msg: '查询成功！',
    };
    return res.json(response);
  },
  // 3.反确认
  'post /ocp/monitor/detail1/unconfirm': function (req, res) {
    const { ids } = req.body;
    changeConfirm(monitorDetailList1, ids, 0);
    const response = {
      code: 'SUCCESS',
      data: null,
      success: true,
      msg: '查询成功！',
    };
    return res.json(response);
  },
  // 1.查询
  'post /ocp/monitor/detail2/query': function (req, res) {
    const response = {
      code: 'SUCCESS',
      data: { list: monitorDetailList2 },
      success: true,
      msg: '查询成功！',
    };
    return res.json(response);
  },
  // 2.确认
  'post /ocp/monitor/detail2/confirm': function (req, res) {
    const { ids } = req.body;
    changeConfirm(monitorDetailList2, ids, 1);
    const response = {
      code: 'SUCCESS',
      data: null,
      success: true,
      msg: '查询成功！',
    };
    return res.json(response);
  },
  // 3.反确认
  'post /ocp/monitor/detail2/unconfirm': function (req, res) {
    const { ids } = req.body;
    changeConfirm(monitorDetailList2, ids, 0);
    const response = {
      code: 'SUCCESS',
      data: null,
      success: true,
      msg: '查询成功！',
    };
    return res.json(response);
  },
  // 1.查询凭证
  'POST /ocp/monitor/voucher/query': function (req, res) {
    const response = {
      code: 'SUCCESS',
      data: { list: getMonitorVoucherList() },
      success: true,
      msg: '查询成功！',
    };
    return res.json(response);
  },
  // 2.查询流水信息
  'POST /ocp/monitor/voucher1/query': function (req, res) {
    const response = {
      code: 'SUCCESS',
      data: { list: getMonitorVoucherList1() },
      success: true,
      msg: '查询成功！',
    };
    return res.json(response);
  },
  /**
   * 指标详情
   */
  'get /ocp/monitor/sub/detail': function (req, res) {
    const response = {
      code: 'SUCCESS',
      data: { list: getMonitorTargetDetail() },
      success: true,
      msg: '查询成功！',
    };
    return res.json(response);
  },
  'get /ocp/monitor/sub1/detail': function (req, res) {
    const response = {
      code: 'SUCCESS',
      data: { list: getMonitorTargetDetail() },
      success: true,
      msg: '查询成功！',
    };
    return res.json(response);
  },
};
