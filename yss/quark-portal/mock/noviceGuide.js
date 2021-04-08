/**
 * 收藏mock接口
 */
import Mock from 'mockjs';

const getDataList = () => {
  const tempList = [
    {
      id: '111',
      name: 'henry',
      isHasLogin: 0,
    },
    {
      id: '222',
      name: 'brain',
      isHasLogin: 0,
    },
    {
      id: '333',
      name: 'whitney',
      isHasLogin: 0,
    },
    {
      id: '444',
      name: 'wsiahf',
      isHasLogin: 0,
    },
    {
      id: '555',
      name: 'alorh',
      isHasLogin: 0,
    },
  ];

  return tempList;
};

let dataList = getDataList();

const changeCheck = (dataList1, id, state) => {
  console.log(id);
  dataList1.forEach((item) => {
    if (id.includes(item.id)) {
      item.isHasLogin = state;
    }
  });
};

export default {
  // 查询
  'POST /ocp/noviceGuide/query': function (req, res) {
    const result = {
      code: 'SUCCESS',
      data: dataList,
      success: true,
      msg: '查询成功！',
    };
    res.json(result);
  },

  // 校验是否是第一次登录
  'POST /ocp/noviceGuide/change': function (req, res) {
    const { id } = req.body;
    console.log(id);
    changeCheck(dataList, id, 1);
    const data = {
      code: 'SUCCESS',
      data: null,
      success: true,
      msg: '成功！',
    };
    return res.json(data);
  },
};
