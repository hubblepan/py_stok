/**
 * 任务中心mock接口
 */
import Mock from 'mockjs';
import moment from 'moment';

const getTaskList = () => {
  const tempList = [];
  for (let i = 0; i < 113; i += 1) {
    const listItem = Mock.mock({
      id: '@id',
      taskDate: i % 3 ? '@date("yyyy-MM-dd")' : moment().format('YYYY-MM-DD'),
      taskType: '@ctitle(4)',
      taskState: '@ctitle(6)',
      taskResult: '@ctitle(10)',
      startDate: '@date("yyyy-MM-dd HH:mm:ss")',
      endDate: '@date("yyyy-MM-dd HH:mm:ss")',
      createName: '@cname',
    });
    tempList.push(listItem);
  }
  return tempList;
};
const getTaskcenterList = () => {
  const tempList = [];
  for (let i = 0; i < 15; i += 1) {
    const listItem = Mock.mock({
      id: '@id',
      // 0表示未完成，1表示已完成
      type: i > 3 ? 1 : 0,
      // 未完成是这2个字段
      amount: '@integer(1,10)',
      total: '@integer(11,20)',
      // 已完成是这2个字段
      success: '@integer(20,30)',
      fail: '@integer(20,30)',
      time: '@date("yyyy-MM-dd HH:mm:ss")',
    });
    tempList.push(listItem);
  }
  return tempList;
};
const getTaskdetailList = () => {
  const tempList = [];
  for (let i = 0; i < 150; i += 1) {
    const listItem = Mock.mock({
      id: '@id',
      indexName: '@ctitle(6)',
      portName: '@ctitle(10)',
      taskResult: '@ctitle(4)',
      startDate: '@date("yyyy-MM-dd HH:mm:ss")',
      endDate: '@date("yyyy-MM-dd HH:mm:ss")',
      taskTime: '@integer(1,9)',
      // 这个字段是做行合并的
      rowSpan: i % 2 ? 0 : 2,
    });
    tempList.push(listItem);
  }
  return tempList;
};
const taskList = getTaskList();
const taskcenterList = getTaskcenterList();
const taskdetailList0 = getTaskdetailList();
const taskdetailList1 = getTaskdetailList().slice(0, 100);
const taskdetailList2 = getTaskdetailList().slice(100, 150);
const query = (list, pageNo, pageSize) => {
  pageNo = Number.parseInt(pageNo);
  pageSize = Number.parseInt(pageSize);
  let tempList = [];
  const startIndex = (pageNo - 1) * pageSize;
  console.log(startIndex);
  console.log(startIndex + pageSize);
  tempList = list.slice(startIndex, startIndex + pageSize);
  console.log(tempList.length);
  return tempList;
};
export default {
  // 子表查询
  'POST /ocp/task/sub/query': function (req, res) {
    const { pageNo, pageSize } = req.body;
    console.log(req.query);
    const response = {
      code: 'SUCCESS',
      data: {
        list: query(taskList, pageNo, pageSize),
        total: taskList.length,
      },
      success: true,
      msg: '查询成功！',
    };
    res.json(response);
  },
  // 详情查询
  'POST /ocp/task/detail/query': function (req, res) {
    const {
      paraMap: { mode },
    } = req.body;
    let taskdetailList = [];
    switch (mode) {
      case 'all':
        taskdetailList = taskdetailList0;
        break;
      case 'success':
        taskdetailList = taskdetailList1;
        break;
      case 'fail':
        taskdetailList = taskdetailList2;
        break;
    }
    console.log(req.query);
    const response = {
      code: 'SUCCESS',
      data: {
        list: taskdetailList,
        // total: taskdetailList.length,
      },
      success: true,
      msg: '查询成功！',
    };
    res.json(response);
  },
  /**
   * GlobalHeader任务中心
   */
  // 子表查询
  'POST /ocp/task/center/query': function (req, res) {
    const response = {
      code: 'SUCCESS',
      data: {
        list: taskcenterList,
        total: taskcenterList.length,
      },
      success: true,
      msg: '查询成功！',
    };
    res.json(response);
  },
};
