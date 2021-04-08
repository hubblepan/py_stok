/**
 * 任务中心mock接口
 */
import Mock from 'mockjs';
import moment from 'moment';

const getMessageList = () => {
  const tempList = [];
  for (let i = 0; i < 20; i += 1) {
    const listItem = Mock.mock({
      id: '@id',
      type: i % 3,
      typeText: '@ctitle(2)' + '消息',
      // type: i % 5 ? '@ctitle(4)' : '',
      time: '@date("yyyy-MM-dd HH:mm:ss")',
      title: '@ctitle(4)',
      description: i % 2 ? '@ctitle(30)' : '@ctitle(80)',
      read: i > 16 ? 1 : 0,
    });
    tempList.push(listItem);
  }
  return tempList;
};

const messageList = getMessageList();

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
const changeRead = (dataList, ids, state) => {
  dataList.forEach(item => {
    if (ids.includes(item.id)) {
      item.read = 1;
    }
  });
};
export default {
  // 消息列表查询
  'POST /ocp/message/list/query': function(req, res) {
    const { pageNo, pageSize } = req.query;
    console.log(req.query);
    const response = {
      code: 'SUCCESS',
      data: {
        list: messageList,
        total: messageList.length,
      },
      success: true,
      msg: '查询成功！',
    };
    res.json(response);
  },
  // 已读
  'post /ocp/message/list/read': function(req, res) {
    const { ids } = req.body;
    console.log(ids);
    changeRead(messageList, ids, 1);
    const response = {
      code: 'SUCCESS',
      data: null,
      success: true,
      msg: '设置已读成功！',
    };
    return res.json(response);
  },
};
