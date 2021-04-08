/**
 * 收藏mock接口
 */
import Mock from 'mockjs';

const getDataList = () => {
  const tempList = [];
  for (let i = 0; i < 11; i += 1) {
    const listItem = Mock.mock({
      id: '@id',
      name: '@first',
      'index|+1': i,
    });
    tempList.push(listItem);
  }

  return tempList;
};

let dataList = getDataList();

const deleteData = (id) => {
  console.log(id);
  dataList = dataList.filter((item) => id.indexOf(item.id) === -1);
};

export default {
  // 查询
  'POST /ocp/collection/query': function (req, res) {
    const result = {
      code: 'SUCCESS',
      data: {
        list: dataList,
      },
      success: true,
      msg: '查询成功！',
    };
    res.json(result);
  },

  // 删除
  'DELETE /ocp/collection/deletes': function (req, res) {
    const { id } = req.body;
    deleteData(id);
    const data = {
      code: 'SUCCESS',
      data: null,
      success: true,
      msg: '删除成功！',
    };
    return res.json(data);
  },

  // 清空
  'get /ocp/collection/deleteAll': function (req, res) {
    const data = {
      code: 'SUCCESS',
      data: null,
      success: true,
      msg: '清空成功！',
    };
    return res.json(data);
  },
};
