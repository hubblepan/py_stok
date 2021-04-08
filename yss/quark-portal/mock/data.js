import Mock from 'mockjs';
import { query, detail, save, deletes, changeState } from './MockUtil';
/**
 * 生成数据列表
 */
const getDataList = () => {
  const tempList = [];
  for (let i = 0; i < 50; i += 1) {
    const children = [];
    for (let j = 0; j < 20; j += 1) {
      const child = Mock.mock({
        mainCode: `${i}-${j}`,
        id: `${i}-${j}`,
        mainName: `${i}-${j}-sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss ssssssssssssssssssssssssss`,
        mainNum: j,
        tags: j,
        mainType: `${i}-${j}-sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss ssssssssssssssssssssssssss`,
        oraCode: j,
        creditCode: j,
        oraStyle: j,
        // children: [
        //   {
        //     mainCode: j,
        //     id: j,
        //     mainName: j,
        //     mainNum: j,
        //     tags: j,
        //     mainType: j,
        //     oraCode: j,
        //     creditCode: j,
        //     oraStyle: j,
        //   },
        // ]
      });
      children.push(child);
    }
    const listItem = Mock.mock({
      mainCode: i,
      id: i,
      mainName: i,
      mainNum: i,
      tags: i,
      mainType: i,
      oraCode: i,
      creditCode: i,
      oraStyle: i,
      checkState: i % 2,
      // selectable: i % 5 !== 0,
      // selected: i % 3 === 0,
      children,
    });
    tempList.push(listItem);
  }
  return tempList;
};

let dataList = getDataList();

export default {
  'POST /api/server/query': function (req, res) {
    const { data, pageNo, pageSize } = req.body;
    const result = {
      code: 'SUCCESS',
      data: { list: query(dataList, data, pageNo, pageSize), total: dataList.length },
      success: true,
      msg: '查询成功！',
    };
    res.json(result);
  },
  'get /api/server/detail': function (req, res) {
    const { id } = req.query;
    res.json(detail(dataList, id));
  },
  'post /api/server/save': function (req, res) {
    const item = req.body;
    res.json(save(dataList, item));
  },
  'delete /api/server/deletes': function (req, res) {
    const { ids } = req.body;
    console.log(ids);
    dataList = deletes(dataList, ids);
    res.json({
      code: '201',
      data: null,
      success: true,
      msg: '删除成功！',
    });
  },
  'post /api/server/check': function (req, res) {
    const { ids } = req.body;
    console.log(ids);
    return res.json(changeState(dataList, ids, 1));
  },
  'post /api/server/uncheck': function (req, res) {
    const { ids } = req.body;
    console.log(ids);
    return res.json(changeState(dataList, ids, 0));
  },
};
