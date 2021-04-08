/**
 * 结果通知mock接口
 */
import Mock from 'mockjs';
import { query, detail, save, deletes, changeState } from './MockUtil';

/**
 * 指标预警提醒
 * 生成数据列表  主表
 */

const getWarnMasterDataList = () => {
  const tempList = [
    {
      id: 1,
      indexType: '公共指标',
      isLeaf: false,
      children: [
        {
          id: 11,
          indexType: '直接点',
          isLeaf: true,
        },
        {
          key: 12,
          id: 12,
          indexType: '指标名次显示位置2',
          isLeaf: false,
          children: [
            {
              id: 121,
              indexType: '指标名次显示位置3',
              isLeaf: true,
            },
          ],
        },
      ],
    },
    {
      id: 2,
      indexType: '期货资管',
      isLeaf: false,
    },
  ];
  return tempList;
};

let dataWarnMasterList = getWarnMasterDataList();

/**
 * 指标预警提醒
 * 生成数据列表  子表
 */
const getWarnSubDataList = (size = 21) => {
  const tempList = [];
  for (let i = 0; i < size; i += 1) {
    const listItem = Mock.mock({
      id: '@id',
      isLeaf: false,
      targetName: '@ctitle(4,5)',
      riskLevel: '@string(upper,7)',
      monitorResult: '@string(upper,7)',
      noticeType: '@ctitle(4,5)',
      maker: '@cname',
      creatDate: '@date("yyyy-MM-dd HH:mm:ss")',
      checkState: Math.random() > 0.5 ? 1 : 0, // 是否已审核
      noticeContent: `提醒内容提醒内容提醒内容${Math.random(0)}`,
    });
    tempList.push(listItem);
  }
  return tempList;
};

let dataWarnSubList = getWarnSubDataList();

/**
 * 消息通知
 * 生成数据列表
 */

const getMesDataList = () => {
  const tempList = [];

  for (let i = 0; i < 21; i += 1) {
    const listItem = Mock.mock({
      id: '@id',
      addressee: '@cname',
      content: `消息通知文化方法和偶然发货${Math.random(0)}`,
      functionModule: '@string(upper,7)',
      checkState: Math.random() > 0.5 ? 1 : 0,
      indexDevScene: '@ctitle',
      endDate: '@DATETIME("yyyy-MM-dd")',
      startDate: '@DATETIME("yyyy-MM-dd")',
    });
    tempList.push(listItem);
  }
  return tempList;
};

let dataMesList = getMesDataList();

/**
 * 消息通知
 * 详情
 */
const getMesDetailList = () => {
  const tempList = [];

  for (let i = 0; i < 10; i += 1) {
    const listItem = Mock.mock({
      id: '@id',
      isLeaf: false,
      indexName: '@ctitle',
      monitorState: '@string(upper,7)',
      riskLevel: '@string(upper,7)',
      children: [
        {
          id: '@id',
          isLeaf: true,
          indexName: '@ctitle',
          monitorState: '@string(upper,7)',
          riskLevel: '@string(upper,7)',
        },
        {
          id: '@id',
          isLeaf: true,
          indexName: '@ctitle',
          monitorState: '@string(upper,7)',
          riskLevel: '@string(upper,7)',
        },
      ],
    });
    tempList.push(listItem);
  }
  return tempList;
};

let mesDetailList = getMesDetailList();

/**
 * 邮件通知
 * 生成数据列表
 */

const getMailDataList = () => {
  const tempList = [];

  for (let i = 0; i < 25; i += 1) {
    const listItem = Mock.mock({
      id: '@id',
      isLeaf: false,
      policyName: '@string(upper,7)',
      addressee: '@cname',
      CCto: '@cname',
      secretMesg: '@cname',
      autoZip: Math.random() > 0.5 ? '是' : '否',
      theme: '@ctitle(4,8)',
      emailContent: '@string(upper,7)',
      checkState: Math.random() > 0.5 ? 1 : 0,
    });
    tempList.push(listItem);
  }
  return tempList;
};

let dataMailList = getMailDataList();

/**
 * 邮件通知
 * 详情
 */
const getDetailList = () => {
  const tempList = [];

  for (let i = 0; i < 10; i += 1) {
    const listItem = Mock.mock({
      id: '@id',
      isLeaf: false,
      indexName: '@ctitle',
      monitorState: '@string(upper,7)',
      riskLevel: '@string(upper,7)',
      children: [
        {
          id: '@id',
          isLeaf: true,
          indexName: '@ctitle',
          monitorState: '@string(upper,7)',
          riskLevel: '@string(upper,7)',
        },
        {
          id: '@id',
          isLeaf: true,
          indexName: '@ctitle',
          monitorState: '@string(upper,7)',
          riskLevel: '@string(upper,7)',
        },
      ],
    });
    tempList.push(listItem);
  }
  return tempList;
};

let detailList = getDetailList();

/**
 * 删除数据
 * @param {*} ids
 */
const deleteData = (ids) => {
  console.log(ids);
  dataWarnSubList = dataWarnSubList.filter((item) => ids.indexOf(item.id) === -1);
};

const deleteDataMes = (ids) => {
  console.log(ids);
  dataMesList = dataMesList.filter((item) => ids.indexOf(item.id) === -1);
};

const deleteDataMail = (ids) => {
  console.log(ids);
  dataMailList = dataMailList.filter((item) => ids.indexOf(item.id) === -1);
};

/**
 * 审核、反审核
 * @param {*} dataList1
 * @param {*} ids
 * @param {*} state
 */
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

export default {
  // 预警提醒 主表查询
  'post /ocp/warningMaster/query': function (req, res) {
    const { data, pageNo, pageSize } = req.body;
    const result = {
      code: 'SUCCESS',
      data: {
        list: query(dataWarnMasterList, data, pageNo, pageSize),
        total: dataWarnMasterList.length,
      },
      success: true,
      msg: '查询成功！',
    };
    res.json(result);
  },

  // 预警提醒 子表查询
  'post /ocp/warningSub/query': function (req, res) {
    const { data, pageNo, pageSize } = req.body;
    const result = {
      code: 'SUCCESS',
      data: {
        list: query(dataWarnSubList, data, pageNo, pageSize),
        total: dataWarnSubList.length,
      },
      success: true,
      msg: '查询成功！',
    };
    res.json(result);
  },

  // 新增
  'POST /ocp/warningSub/save': function (req, res) {
    const item = req.body;
    res.json(save(item));
  },

  // 详情
  'GET /ocp/warningSub/detail': function (req, res) {
    const { id } = req.query;
    res.json(detail(dataWarnSubList, id));
  },

  // 删除
  'DELETE /ocp/warningSub/deletes': function (req, res) {
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

  // 审核
  'POST /ocp/warningSub/check': function (req, res) {
    const { ids } = req.body;
    console.log(ids);
    changeState(dataWarnSubList, ids, 1);
    const data = {
      code: 'SUCCESS',
      data: null,
      success: true,
      msg: '审核成功！',
    };
    return res.json(data);
  },

  // 反审核
  'POST /ocp/warningSub/uncheck': function (req, res) {
    const { ids } = req.body;
    console.log(ids);
    changeState(dataWarnSubList, ids, 0);
    const data = {
      code: 'SUCCESS',
      data: null,
      success: true,
      msg: '审核成功！',
    };
    return res.json(data);
  },

  // 消息通知 查询
  'post /ocp/mesNotice/query': function (req, res) {
    const { data, pageNo, pageSize } = req.body;
    const result = {
      code: 'SUCCESS',
      data: { list: query(dataMesList, data, pageNo, pageSize), total: dataMesList.length },
      success: true,
      msg: '查询成功！',
    };
    res.json(result);
  },

  // 详情
  'GET /ocp/mesNotice/detail': function (req, res) {
    const { id } = req.query;
    res.json(detail(dataMesList, id));
  },

  // 删除
  'DELETE /ocp/mesNotice/deletes': function (req, res) {
    const { ids } = req.body;
    deleteDataMes(ids);
    const data = {
      code: 'SUCCESS',
      data: null,
      success: true,
      msg: '删除成功！',
    };
    return res.json(data);
  },

  // 审核
  'POST /ocp/mesNotice/check': function (req, res) {
    const { ids } = req.body;
    console.log(ids);
    changeState(dataMesList, ids, 1);
    const data = {
      code: 'SUCCESS',
      data: null,
      success: true,
      msg: '审核成功！',
    };
    return res.json(data);
  },

  // 反审核
  'POST /ocp/mesNotice/uncheck': function (req, res) {
    const { ids } = req.body;
    console.log(ids);
    changeState(dataMesList, ids, 0);
    const data = {
      code: 'SUCCESS',
      data: null,
      success: true,
      msg: '审核成功！',
    };
    return res.json(data);
  },

  // 详情
  'post /ocp/mesNotice/detailTable': function (req, res) {
    const { data, pageNo, pageSize } = req.body;
    const result = {
      code: 'SUCCESS',
      data: {
        list: query(mesDetailList, data, pageNo, pageSize),
        total: mesDetailList.length,
      },
      success: true,
      msg: '查询成功！',
    };
    res.json(result);
  },

  // 邮件通知 查询
  'post /ocp/mailNotice/query': function (req, res) {
    const { data, pageNo, pageSize } = req.body;
    const result = {
      code: 'SUCCESS',
      data: { list: query(dataMailList, data, pageNo, pageSize), total: dataMailList.length },
      success: true,
      msg: '查询成功！',
    };
    res.json(result);
  },

  // 详情
  'GET /ocp/mailNotice/detail': function (req, res) {
    const { id } = req.query;
    res.json(detail(dataMailList, id));
  },

  // 删除
  'DELETE /ocp/mailNotice/deletes': function (req, res) {
    const { ids } = req.body;
    deleteDataMail(ids);
    const data = {
      code: 'SUCCESS',
      data: null,
      success: true,
      msg: '删除成功！',
    };
    return res.json(data);
  },

  // 审核
  'POST /ocp/mailNotice/check': function (req, res) {
    const { ids } = req.body;
    console.log(ids);
    changeState(dataMailList, ids, 1);
    const data = {
      code: 'SUCCESS',
      data: null,
      success: true,
      msg: '审核成功！',
    };
    return res.json(data);
  },

  // 反审核
  'POST /ocp/mailNotice/uncheck': function (req, res) {
    const { ids } = req.body;
    console.log(ids);
    changeState(dataMailList, ids, 0);
    const data = {
      code: 'SUCCESS',
      data: null,
      success: true,
      msg: '审核成功！',
    };
    return res.json(data);
  },

  // 详情
  'post /ocp/mailNotice/detailTable': function (req, res) {
    const { data, pageNo, pageSize } = req.body;
    const result = {
      code: 'SUCCESS',
      data: {
        list: query(detailList, data, pageNo, pageSize),
        total: detailList.length,
      },
      success: true,
      msg: '查询成功！',
    };
    res.json(result);
  },
};
