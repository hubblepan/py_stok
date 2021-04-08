/**
 * 消息中心mock接口
 */
import Mock from 'mockjs';
import moment from 'moment';
const getMessageList = () => {
  const tempList = [];
  for (let i = 0; i < 32; i += 1) {
    const listItem = Mock.mock({
      id: '@id',
      messageTitle: '@ctitle(10)',
      messageContent: '@ctitle(500)',
      remindTime: i % 3 ? '@date("yyyy-MM-dd HH:mm:ss")' : moment().format('YYYY-MM-DD HH:mm:ss'),
      /**
       * 要注意，这个state一定是有3种，其中表示今日未读
       * 所以：
       * 1已读，1：今日未读；2：非今日未读
       * 0表示位读
       */
      readState: i % 2,
      /**
       * 跟操作列有关系
       * 0表示没有详情，操作列没有图标
       * 1表示预警
       * 2表示异常
       */
      detail: i % 3,
    });
    tempList.push(listItem);
  }
  return tempList;
};
const getMessagedetailList = () => {
  const tempList = [];
  // 这边个数做下区分
  const number = Math.random() > 0.5 ? 151 : 201;
  for (let i = 0; i < number; i += 1) {
    const listItem = Mock.mock({
      id: '@id',
      remindTitle: '@ctitle(6)',
      remindContent: '@ctitle(10)',
      remindTime: '@date("yyyy-MM-dd HH:mm:ss")',
    });
    tempList.push(listItem);
  }
  return tempList;
};
const messageList = getMessageList();
// const messagedetailList0 = getMessagedetailList();
// const messagedetailList1 = getMessagedetailList();
const changeRead = (dataList, ids, state) => {
  dataList.forEach((item) => {
    if (ids.includes(item.id)) {
      item.readState = 1;
    }
  });
};
export default {
  // 子表查询
  'POST /ocp/message/sub/query': function (req, res) {
    const response = {
      code: 'SUCCESS',
      data: {
        list: messageList,
        // total: messageList.length,
      },
      success: true,
      msg: '查询成功！',
    };
    res.json(response);
  },
  // 已读
  'post /ocp/message/sub/read': function (req, res) {
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
  // 详情查询
  'post /ocp/message/detail/query': function (req, res) {
    const {
      paraMap: { mode },
    } = req.body;
    let messagedetailList = [];
    const messagedetailList0 = getMessagedetailList();
    const messagedetailList1 = getMessagedetailList();
    switch (mode) {
      case 'warning':
        messagedetailList = messagedetailList0;
        break;
      case 'error':
        messagedetailList = messagedetailList1;
        break;
    }
    console.log(req.body);
    const response = {
      code: 'SUCCESS',
      data: {
        list: messagedetailList,
        // 不分页的情况下是没有total的
        // total: messagedetailList.length,
      },
      success: true,
      msg: '查询成功！',
    };
    res.json(response);
  },
};
