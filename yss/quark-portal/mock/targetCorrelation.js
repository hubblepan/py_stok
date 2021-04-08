/**
 * 管控指标关联mock接口
 */
import Mock from 'mockjs';

const getRelaTreeList0 = () => {
  const tempList = [];
  for (let i = 0; i < 20; i += 1) {
    const listItem = Mock.mock({
      id: '@id',
      c_PORT_NAME_ST: '@ctitle(4)',
      isLeaf: i % 2,
      children:
        i % 2
          ? null
          : [
            {
              id: '@id',
              c_PORT_NAME_ST: '@ctitle(4)',
              isLeaf: false,
              children: [
                {
                  id: '@id',
                  c_PORT_NAME_ST: '@ctitle(8)',
                  isLeaf: false,
                  children: [
                    {
                      id: '@id',
                      c_PORT_NAME_ST: '@ctitle(8)',
                      isLeaf: true,
                    },
                  ],
                },
              ],
            },
            {
              id: '@id',
              c_PORT_NAME_ST: '@ctitle(8)',
              isLeaf: true,
            },
          ],
    });
    tempList.push(listItem);
  }
  return tempList;
};
const getRelaTreeList1 = () => {
  const tempList = [];
  for (let i = 0; i < 20; i += 1) {
    const listItem = Mock.mock({
      id: '@id',
      indexName: '@ctitle(4)',
      isLeaf: i % 2,
      children:
        i % 2
          ? null
          : [
            {
              id: '@id',
              indexName: '@ctitle(4)',
              isLeaf: false,
              children: [
                {
                  id: '@id',
                  indexName: '@ctitle(8)',
                  isLeaf: true,
                },
              ],
            },
            {
              id: '@id',
              indexName: '@ctitle(8)',
              isLeaf: true,
            },
          ],
    });
    tempList.push(listItem);
  }
  return tempList;
};
const getRelaTreeList2 = () => {
  const tempList = [];
  for (let i = 0; i < 20; i += 1) {
    const listItem = Mock.mock({
      id: '@id',
      relaName: '@ctitle(4)',
      isLeaf: i % 2,
      children:
        i % 2
          ? null
          : [
            {
              id: '@id',
              relaName: '@ctitle(4)',
              isLeaf: false,
              children: [
                {
                  id: '@id',
                  relaName: '@ctitle(8)',
                  isLeaf: false,
                  children: [
                    {
                      id: '@id',
                      relaName: '@ctitle(8)',
                      isLeaf: false,
                      children: [
                        {
                          id: '@id',
                          relaName: '@ctitle(8)',
                          isLeaf: true,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              id: '@id',
              relaName: '@ctitle(8)',
              isLeaf: true,
            },
          ],
    });
    tempList.push(listItem);
  }
  return tempList;
};
const getPortmodeList = () => {
  const tempList = [];
  for (let i = 0; i < 113; i += 1) {
    const listItem = Mock.mock({
      // id: '@id',
      // indexName: '@ctitle(4)', // 中文名称
      // indexCode: 'child',
      // isLeaf: true,
      // portCode: '@integer(1000000,9999999)',
      // relaType: '@ctitle(4,5)',
      // bindState: i % 3 ? 1 : 0,
      // remark: '',
      // modifier: '@cname',
      // modifyDate: '@date("yyyy-MM-dd HH:mm:ss")',
      // checkState: i % 2,
      // operator: '@cname',
      // auditDate: '@date("yyyy-MM-dd HH:mm:ss")',

      id: '@id',
      indexName: '', // 中文名称
      indexCode: null, // 为空表示为父结点
      isLeaf: false,
      portCode: '',
      relaType: '',
      bindState: '',
      remark: '@ctitle(30)',
      modifier: '',
      modifyDate: '',
      checkState: '',
      auditState: '',
      operator: '',
      auditDate: '',
      children: [
        {
          id: '@id',
          indexName: '@ctitle(4)', // 中文名称
          indexCode: 'child',
          isLeaf: true,
          portCode: '@integer(1000000,9999999)',
          relaType: '@ctitle(4,5)',
          bindState: i % 3 ? 1 : 0,
          remark: '@ctitle(4)',
          modifier: '@cname',
          modifyDate: '@date("yyyy-MM-dd HH:mm:ss")',
          checkState: i % 2,
          operator: '@cname',
          auditDate: '@date("yyyy-MM-dd HH:mm:ss")',
        },
        {
          id: '@id',
          indexName: '@ctitle(4)', // 中文名称
          indexCode: 'child',
          isLeaf: true,
          portCode: '@integer(1000000,9999999)',
          relaType: '@ctitle(4,5)',
          bindState: i % 3 ? 1 : 0,
          remark: '@ctitle(4)',
          modifier: '@cname',
          modifyDate: '@date("yyyy-MM-dd HH:mm:ss")',
          checkState: i % 2,
          operator: '@cname',
          auditDate: '@date("yyyy-MM-dd HH:mm:ss")',
        },
        {
          id: '@id',
          indexName: '@ctitle(4)', // 中文名称
          indexCode: 'child',
          isLeaf: true,
          portCode: '@integer(1000000,9999999)',
          relaType: '@ctitle(4,5)',
          bindState: i % 3 ? 1 : 0,
          remark: '@ctitle(4)',
          modifier: '@cname',
          modifyDate: '@date("yyyy-MM-dd HH:mm:ss")',
          checkState: i % 2,
          operator: '@cname',
          auditDate: '@date("yyyy-MM-dd HH:mm:ss")',
        },
        {
          id: '@id',
          indexName: '@ctitle(4)', // 中文名称
          indexCode: 'child',
          isLeaf: true,
          portCode: '@integer(1000000,9999999)',
          relaType: '@ctitle(4,5)',
          bindState: i % 3 ? 1 : 0,
          remark: '@ctitle(4)',
          modifier: '@cname',
          modifyDate: '@date("yyyy-MM-dd HH:mm:ss")',
          checkState: i % 2,
          operator: '@cname',
          auditDate: '@date("yyyy-MM-dd HH:mm:ss")',
        },
        {
          id: '@id',
          indexName: '@ctitle(4)', // 中文名称
          indexCode: 'child',
          isLeaf: true,
          portCode: '@integer(1000000,9999999)',
          relaType: '@ctitle(4,5)',
          bindState: i % 3 ? 1 : 0,
          remark: '@ctitle(4)',
          modifier: '@cname',
          modifyDate: '@date("yyyy-MM-dd HH:mm:ss")',
          checkState: i % 2,
          operator: '@cname',
          auditDate: '@date("yyyy-MM-dd HH:mm:ss")',
        },
      ],

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
const getIndexmodeList = () => {
  const tempList = [];
  for (let i = 0; i < 109; i += 1) {
    const listItem = Mock.mock({
      // id: '@id',
      // indexName: '@ctitle(4)', // 中文名称
      // indexCode: 'child',
      // isLeaf: true,
      // portCode: '@integer(1000000,9999999)',
      // relaType: '@ctitle(4,5)',
      // bindState: i % 3 ? 1 : 0,
      // remark: '',
      // modifier: '@cname',
      // modifyDate: '@date("yyyy-MM-dd HH:mm:ss")',
      // checkState: i % 2,
      // operator: '@cname',
      // auditDate: '@date("yyyy-MM-dd HH:mm:ss")',
      id: '@id',
      indexName: '', // 中文名称
      indexCode: null, // 为空表示为父结点
      isLeaf: false,
      portCode: '',
      relaType: '',
      bindState: '',
      remark: '@ctitle(30)',
      modifier: '',
      modifyDate: '',
      checkState: '',
      auditState: '',
      operator: '',
      auditDate: '',
      children: [
        {
          id: '@id',
          indexName: '@ctitle(4)', // 中文名称
          indexCode: 'child',
          isLeaf: true,
          portCode: '@integer(1000000,9999999)',
          relaType: '@ctitle(4,5)',
          bindState: i % 3 ? 1 : 0,
          remark: '',
          modifier: '@cname',
          modifyDate: '@date("yyyy-MM-dd HH:mm:ss")',
          checkState: i % 2,
          operator: '@cname',
          auditDate: '@date("yyyy-MM-dd HH:mm:ss")',
        },
        {
          id: '@id',
          indexName: '@ctitle(4)', // 中文名称
          indexCode: 'child',
          isLeaf: true,
          portCode: '@integer(1000000,9999999)',
          relaType: '@ctitle(4,5)',
          bindState: i % 3 ? 1 : 0,
          remark: '',
          modifier: '@cname',
          modifyDate: '@date("yyyy-MM-dd HH:mm:ss")',
          checkState: i % 2,
          operator: '@cname',
          auditDate: '@date("yyyy-MM-dd HH:mm:ss")',
        },
        {
          id: '@id',
          indexName: '@ctitle(4)', // 中文名称
          indexCode: 'child',
          isLeaf: true,
          portCode: '@integer(1000000,9999999)',
          relaType: '@ctitle(4,5)',
          bindState: i % 3 ? 1 : 0,
          remark: '',
          modifier: '@cname',
          modifyDate: '@date("yyyy-MM-dd HH:mm:ss")',
          checkState: i % 2,
          operator: '@cname',
          auditDate: '@date("yyyy-MM-dd HH:mm:ss")',
        },
        {
          id: '@id',
          indexName: '@ctitle(4)', // 中文名称
          indexCode: 'child',
          isLeaf: true,
          portCode: '@integer(1000000,9999999)',
          relaType: '@ctitle(4,5)',
          bindState: i % 3 ? 1 : 0,
          remark: '',
          modifier: '@cname',
          modifyDate: '@date("yyyy-MM-dd HH:mm:ss")',
          checkState: i % 2,
          operator: '@cname',
          auditDate: '@date("yyyy-MM-dd HH:mm:ss")',
        },
        {
          id: '@id',
          indexName: '@ctitle(4)', // 中文名称
          indexCode: 'child',
          isLeaf: true,
          portCode: '@integer(1000000,9999999)',
          relaType: '@ctitle(4,5)',
          bindState: i % 3 ? 1 : 0,
          remark: '',
          modifier: '@cname',
          modifyDate: '@date("yyyy-MM-dd HH:mm:ss")',
          checkState: i % 2,
          operator: '@cname',
          auditDate: '@date("yyyy-MM-dd HH:mm:ss")',
        },
      ],

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
  for (let i = 0; i < 109; i += 1) {
    const listItem = Mock.mock({
      // id: '@id',
      // indexName: '@ctitle(4)', // 中文名称
      // indexCode: 'child',
      // isLeaf: true,
      // portCode: '@integer(1000000,9999999)',
      // relaType: '@ctitle(4,5)',
      // bindState: i % 3 ? 1 : 0,
      // remark: '',
      // modifier: '@cname',
      // modifyDate: '@date("yyyy-MM-dd HH:mm:ss")',
      // checkState: i % 2,
      // operator: '@cname',
      // auditDate: '@date("yyyy-MM-dd HH:mm:ss")',
      id: '@id',
      indexName: '', // 中文名称
      indexCode: null, // 为空表示为父结点
      isLeaf: false,
      portCode: '',
      relaType: '',
      bindState: '',
      remark: '@ctitle(30)',
      modifier: '',
      modifyDate: '',
      checkState: '',
      auditState: '',
      operator: '',
      auditDate: '',
      children: [
        {
          id: '@id',
          indexName: '@ctitle(4)', // 中文名称
          indexCode: 'child',
          isLeaf: true,
          portCode: '@integer(1000000,9999999)',
          relaType: '@ctitle(4,5)',
          bindState: i % 3 ? 1 : 0,
          remark: '',
          modifier: '@cname',
          modifyDate: '@date("yyyy-MM-dd HH:mm:ss")',
          checkState: i % 2,
          operator: '@cname',
          auditDate: '@date("yyyy-MM-dd HH:mm:ss")',
        },
        {
          id: '@id',
          indexName: '@ctitle(4)', // 中文名称
          indexCode: 'child',
          isLeaf: true,
          portCode: '@integer(1000000,9999999)',
          relaType: '@ctitle(4,5)',
          bindState: i % 3 ? 1 : 0,
          remark: '',
          modifier: '@cname',
          modifyDate: '@date("yyyy-MM-dd HH:mm:ss")',
          checkState: i % 2,
          operator: '@cname',
          auditDate: '@date("yyyy-MM-dd HH:mm:ss")',
        },
        {
          id: '@id',
          indexName: '@ctitle(4)', // 中文名称
          indexCode: 'child',
          isLeaf: true,
          portCode: '@integer(1000000,9999999)',
          relaType: '@ctitle(4,5)',
          bindState: i % 3 ? 1 : 0,
          remark: '',
          modifier: '@cname',
          modifyDate: '@date("yyyy-MM-dd HH:mm:ss")',
          checkState: i % 2,
          operator: '@cname',
          auditDate: '@date("yyyy-MM-dd HH:mm:ss")',
        },
        {
          id: '@id',
          indexName: '@ctitle(4)', // 中文名称
          indexCode: 'child',
          isLeaf: true,
          portCode: '@integer(1000000,9999999)',
          relaType: '@ctitle(4,5)',
          bindState: i % 3 ? 1 : 0,
          remark: '',
          modifier: '@cname',
          modifyDate: '@date("yyyy-MM-dd HH:mm:ss")',
          checkState: i % 2,
          operator: '@cname',
          auditDate: '@date("yyyy-MM-dd HH:mm:ss")',
        },
        {
          id: '@id',
          indexName: '@ctitle(4)', // 中文名称
          indexCode: 'child',
          isLeaf: true,
          portCode: '@integer(1000000,9999999)',
          relaType: '@ctitle(4,5)',
          bindState: i % 3 ? 1 : 0,
          remark: '',
          modifier: '@cname',
          modifyDate: '@date("yyyy-MM-dd HH:mm:ss")',
          checkState: i % 2,
          operator: '@cname',
          auditDate: '@date("yyyy-MM-dd HH:mm:ss")',
        },
      ],

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
const getCombinationList = (id) => {
  let odd = 0;
  console.log(Number.parseInt(id));
  console.log(Number.parseInt(id) % 2);
  if (id && Number.parseInt(id.slice(0, 1)) % 2) {
    odd = 1;
  }
  const tempList = [];
  for (let i = 0; i < 20; i += 1) {
    const listItem = Mock.mock({
      id: '@id',
      combinationName: '@ctitle(8)',
      combinationCode: '@integer(100000,999999)',
      isLeaf: i % 2,
      children:
        i % 2
          ? null
          : [
            {
              id: '@id',
              combinationName: '@ctitle(8)',
              combinationCode: '@integer(100000,999999)',
              isLeaf: false,
              children: [
                {
                  id: '@id',
                  combinationName: '@ctitle(8)',
                  combinationCode: '@integer(100000,999999)',
                  isLeaf: true,
                },
              ],
            },
            {
              id: '@id',
              combinationName: '@ctitle(8)',
              combinationCode: '@integer(100000,999999)',
              isLeaf: true,
            },
          ],
    });
    tempList.push(listItem);
  }
  console.log('odd');
  console.log(odd);
  const columns = odd
    ? [
      { dataIndex: 'combinationName', title: '组合名称' },
      { dataIndex: 'combinationCode', title: '组合代码' },
    ]
    : [{ dataIndex: 'combinationName', title: '组合名称' }];
  return {
    list: tempList,
    columns,
  };
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
const relaTreeList0 = getRelaTreeList0();
const relaTreeList1 = getRelaTreeList1();
const relaTreeList2 = getRelaTreeList2();
const portmodeList = getPortmodeList();
const indexmodeList = getIndexmodeList();
const relamodeList = getRelamodeList();
const options = getOptions();
const dataSource = getDataSource();
const classifyList = getClassifyList();
const combinationList = getCombinationList();
const changeCheck = (dataList, ids, state) => {
  dataList.forEach((item) => {
    if (ids.includes(item.id)) {
      item.checkState = state;
    }
  });
};
const changeBind = (dataList, ids, state) => {
  // 因为这是一棵树
  console.log('changeBind dataList');
  console.log(dataList && dataList.length);
  for (let i = 0; i < dataList.length; i++) {
    if (ids.includes(dataList[i].id)) {
      dataList[i].bindState = state;
      break;
    } else if (dataList[i].children) {
      changeBind(dataList[i].children, ids, state);
    }
  }
};
const deletesUncheck = (dataList, ids) => {
  ids.forEach((id) => {
    const index = dataList.findIndex((item) => item.id === id);
    dataList.splice(index, 1);
  });
};

const query = (modeList, pageNo, pageSize) => {
  let tempList = [];
  const startIndex = (pageNo - 1) * pageSize;
  tempList = modeList.slice(startIndex, startIndex + pageSize);
  return tempList;
};
export default {
  // 主表查询
  'POST /ocp/portinfo/query': function (req, res) {
    const response = {
      code: 'SUCCESS',
      data: {
        list: relaTreeList0,
        total: relaTreeList0.length,
      },

      success: true,
      msg: '查询成功！',
    };
    res.json(response);
  },
  // 主表查询
  'POST /ocp/indexinfo/query': function (req, res) {
    const response = {
      code: 'SUCCESS',
      data: {
        list: relaTreeList1,
        total: relaTreeList1.length,
      },

      success: true,
      msg: '查询成功！',
    };
    res.json(response);
  },
  // 主表查询
  'POST /ocp/relainfo/query': function (req, res) {
    const response = {
      code: 'SUCCESS',
      data: {
        list: relaTreeList2,
        total: relaTreeList2.length,
      },

      success: true,
      msg: '查询成功！',
    };
    res.json(response);
  },
  // 子表查询
  'POST /ocp/indexrela/portmode/query': function (req, res) {
    const { data, pageNo, pageSize } = req.body;
    const response = {
      code: 'SUCCESS',
      data: {
        list: query(portmodeList, pageNo, pageSize),
        total: portmodeList.length,
      },
      success: true,
      msg: '查询成功！',
    };
    res.json(response);
  },
  // 子表查询
  'POST /ocp/indexrela/indexmode/query': function (req, res) {
    const { pageNo, pageSize } = req.body;
    const response = {
      code: 'SUCCESS',
      data: {
        list: query(indexmodeList, pageNo, pageSize),
        total: indexmodeList.length,
      },
      success: true,
      msg: '查询成功！',
    };
    res.json(response);
  },
  // 子表查询
  'POST /ocp/indexrela/relamode/query': function (req, res) {
    const { pageNo, pageSize } = req.body;
    const response = {
      code: 'SUCCESS',
      data: {
        list: query(relamodeList, pageNo, pageSize),
        total: relamodeList.length,
      },
      success: true,
      msg: '查询成功！',
    };
    res.json(response);
  },

  // 审核
  'post /ocp/indexrela/portmode/check': function (req, res) {
    const { ids } = req.body;
    console.log(ids);
    changeCheck(portmodeList, ids, 1);
    const data = {
      code: 'SUCCESS',
      data: null,
      success: true,
      msg: '审核成功！',
    };
    return res.json(data);
  },
  // 审核
  'post /ocp/indexrela/indexmode/check': function (req, res) {
    const { ids } = req.body;
    console.log(ids);
    changeCheck(indexmodeList, ids, 1);
    const data = {
      code: 'SUCCESS',
      data: null,
      success: true,
      msg: '审核成功！',
    };
    return res.json(data);
  },
  // 审核
  'post /ocp/indexrela/relamode/check': function (req, res) {
    const { ids } = req.body;
    console.log(ids);
    changeCheck(relamodeList, ids, 1);
    const data = {
      code: 'SUCCESS',
      data: null,
      success: true,
      msg: '审核成功！',
    };
    return res.json(data);
  },
  // 反审核
  'post /ocp/indexrela/portmode/uncheck': function (req, res) {
    const { ids } = req.body;
    console.log(ids);
    changeCheck(portmodeList, ids, 0);
    const data = {
      code: 'SUCCESS',
      data: null,
      success: true,
      msg: '审核成功！',
    };
    return res.json(data);
  },
  // 反审核
  'post /ocp/indexrela/indexmode/uncheck': function (req, res) {
    const { ids } = req.body;
    console.log(ids);
    changeCheck(indexmodeList, ids, 0);
    const data = {
      code: 'SUCCESS',
      data: null,
      success: true,
      msg: '审核成功！',
    };
    return res.json(data);
  },
  // 反审核
  'post /ocp/indexrela/relamode/uncheck': function (req, res) {
    const { ids } = req.body;
    console.log(ids);
    changeCheck(relamodeList, ids, 0);
    const data = {
      code: 'SUCCESS',
      data: null,
      success: true,
      msg: '审核成功！',
    };
    return res.json(data);
  },
  // 1.绑定
  'post /ocp/indexrela/portmode/bind': function (req, res) {
    const { ids } = req.body;
    console.log('绑定');
    console.log(req.body);
    console.log(ids);
    changeBind(portmodeList, ids, 1);
    const data = {
      code: 'SUCCESS',
      data: null,
      success: true,
      msg: '绑定成功！',
    };
    return res.json(data);
  },
  // 2.绑定
  'post /ocp/indexrela/indexmode/bind': function (req, res) {
    const { ids } = req.body;
    console.log('绑定');
    console.log(ids);
    changeBind(indexmodeList, ids, 1);
    const data = {
      code: 'SUCCESS',
      data: null,
      success: true,
      msg: '绑定成功！',
    };
    return res.json(data);
  },
  // 解绑
  'post /ocp/indexrela/portmode/unbind': function (req, res) {
    const { ids } = req.body;
    changeBind(portmodeList, ids, 0);
    const data = {
      code: 'SUCCESS',
      data: null,
      success: true,
      msg: '解绑成功！',
    };
    return res.json(data);
  },
  // 解绑
  'post /ocp/indexrela/indexmode/unbind': function (req, res) {
    const { ids } = req.body;
    console.log('解绑');
    console.log(ids);
    changeBind(indexmodeList, ids, 0);
    const data = {
      code: 'SUCCESS',
      data: null,
      success: true,
      msg: '解绑成功！',
    };
    return res.json(data);
  },
  // 删除
  'delete /ocp/indexrela/relamode/deletes': function (req, res) {
    const { ids } = req.body;
    console.log('删除');
    console.log(ids);
    deletesUncheck(relamodeList, ids);
    const response = {
      code: 'SUCCESS',
      data: null,
      success: true,
      msg: '删除成功！',
    };
    return res.json(response);
  },
  // 新增弹窗
  // 1.群组下拉选项
  'POST /ocp/indexinfo/relagroup/query': function (req, res) {
    const response = {
      code: 'SUCCESS',
      data: { list: options },
      success: true,
      msg: '查询成功！',
    };
    return res.json(response);
  },
  // 2.穿梭框
  'POST /ocp/indexinfo/relatarget/query': function (req, res) {
    const response = {
      code: 'SUCCESS',
      data: { list: dataSource },
      success: true,
      msg: '查询成功！',
    };
    return res.json(response);
  },
  // 3.保存接口
  'post /ocp/indexinfo/relation/save': function (req, res) {
    addRelamodeList(relamodeList);
    const response = {
      code: 'SUCCESS',
      data: null,
      success: true,
      msg: '保存成功！',
    };
    return res.json(response);
  },
  // 产品结构配置弹窗
  // 1.查询
  'POST /ocp/indexinfo/classify/query': function (req, res) {
    const response = {
      code: 'SUCCESS',
      data: { list: classifyList },
      success: true,
      msg: '查询成功！',
    };
    return res.json(response);
  },
  // 2.子表查询
  'POST /ocp/indexinfo/combination/query': function (req, res) {
    console.log('产品结构配置子表查询');
    console.log(req.query);
    const { id } = req.query;
    const response = {
      code: 'SUCCESS',
      data: getCombinationList(id),
      success: true,
      msg: '查询成功！',
    };
    return res.json(response);
  },
  // 3.保存接口
  'post /ocp/indexinfo/structure/save': function (req, res) {
    const response = {
      code: 'SUCCESS',
      data: null,
      success: true,
      msg: '保存成功！',
    };
    return res.json(response);
  },

  // 自定义分类：主表查询
  'POST /ocp/indexinfo/combination/diyclassify/classify/query': function (req, res) {
    const getDataSource = () => {
      const tempList = [
        {
          id: '133',
          modifier: '',
          modifyDate: null,
          startUseDate: '2020-12-07 15:12:09',
          endUseDate: '2020-12-07 15:12:09',
          auditState: 1,
          operator: '',
          auditDate: null,
          c_GROUP_CODE: '123123',
          c_GROUP_NAME: '1231312',
        },
        {
          id: '146',
          modifier: '',
          modifyDate: null,
          startUseDate: '2020-12-07 15:12:09',
          endUseDate: '2020-12-07 15:12:09',
          auditState: 1,
          operator: '',
          auditDate: null,
          c_GROUP_CODE: '2342342424',
          c_GROUP_NAME: '234234',
        },
      ];

      for (let i = 0; i < 21; i += 1) {
        const listItem = Mock.mock({
          id: i,
          modifier: 'sda',
          modifyDate: null,
          startUseDate: '2020-12-07 15:12:09',
          endUseDate: '2020-12-07 15:12:09',
          auditState: Math.random() > 0.5 ? 1 : 0,
          operator: 'aaa',
          auditDate: null,
          c_GROUP_CODE: '@integer(100000,999999)',
          c_GROUP_NAME: '@ctitle(3)',

          // key: i,
          // id: i,
          // classifyName: '@ctitle(3)', // 中文名称
          // classifyCode: '@integer(100000,999999)',
          // check: Math.random() > 0.5 ? 1 : 0
        });
        tempList.push(listItem);
      }
      return tempList;
    };

    const response = {
      code: 'SUCCESS',
      data: { list: getDataSource() },
      success: true,
      message: '查询成功！',
    };
    return res.json(response);
  },

  // 自定义分类：主表新增/修改
  'POST /ocp/indexinfo/combination/diyclassify/classify/save': function (req, res) {
    const response = {
      code: 'SUCCESS',
      data: null,
      success: true,
      message: '保存成功！',
    };
    return res.json(response);
  },

  // 自定义分类：主表删除
  'POST /ocp/indexinfo/combination/diyclassify/classify/delete': function (req, res) {
    const response = {
      code: 'SUCCESS',
      data: null,
      success: true,
      message: '操作成功！',
    };
    return res.json(response);
  },

  // 自定义分类：主表审核
  'POST /ocp/indexinfo/combination/diyclassify/classify/check': function (req, res) {
    const response = {
      code: 'SUCCESS',
      data: null,
      success: true,
      message: '操作成功！',
    };
    return res.json(response);
  },

  // 自定义分类：主表审核
  'POST /ocp/indexinfo/combination/diyclassify/classify/uncheck': function (req, res) {
    const response = {
      code: 'SUCCESS',
      data: null,
      success: true,
      message: '操作成功！',
    };
    return res.json(response);
  },

  // 自定义分类：子表查询
  'POST /ocp/indexinfo/combination/diyclassify/query': function (req, res) {
    const getDataSource = () => {
      const tempList = [
      ];

      for (let i = 0; i < 21; i += 1) {
        const auditState = Math.random() > 0.5 ? 1 : 0;
        const listItem = Mock.mock({
          id: i,
          modifier: 'Test',
          modifyDate: '20201130 13:29:45',
          startUseDate: '2020-11-30 16:07:57',
          endUseDate: '2020-11-30 16:07:57',
          auditState,
          operator: '@cname(3)',
          auditDate: '@date("yyyy-MM-dd HH:mm:ss")',
          c_GROUP_NAME: '@ctitle(3)',
          c_PORT_NAME: '@ctitle(3)',
          c_PORT_CODE: '@integer(100000,999999)',
          c_DV_PORT_CODE: `组合级别${i}`,
          n_CHECK_TYPE: auditState ? '已审核' : '未审核 ',
          c_GROUP_CODE: '@integer(100000,999999)',
        });
        tempList.push(listItem);
      }

      return tempList;
    };

    const response = {
      code: 'SUCCESS',
      data: {
        list: getDataSource(),
        total: 21
      },
      success: true,
      message: '操作成功！',
    };
    return res.json(response);
  },

  // 自定义分类：子表删除
  'POST /ocp/indexinfo/combination/diyclassify/delete': function (req, res) {
    const response = {
      code: 'SUCCESS',
      data: null,
      success: true,
      message: '操作成功！',
    };
    return res.json(response);
  },

  // 自定义分类：子表审核
  'POST /ocp/indexinfo/combination/diyclassify/check': function (req, res) {
    const response = {
      code: 'SUCCESS',
      data: null,
      success: true,
      message: '操作成功！',
    };
    return res.json(response);
  },

  // 自定义分类：子表反审
  'POST /ocp/indexinfo/combination/diyclassify/uncheck': function (req, res) {
    const response = {
      code: 'SUCCESS',
      data: null,
      success: true,
      message: '操作成功！',
    };
    return res.json(response);
  },
};
