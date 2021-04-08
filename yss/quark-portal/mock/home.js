/**
 * 首页管理岗mock接口
 */
import Mock from 'mockjs';
import moment from 'moment';
const getLayouts = () => {
  const layouts = {};
  layouts.layoutlg = [
    { i: 'a', x: 0, y: 0, w: 24, h: 8.54 },
    { i: 'b', x: 0, y: 3, w: 24, h: 17 },
    { i: 'c', x: 0, y: 9, w: 18, h: 16 },
    { i: 'd', x: 18, y: 15, w: 6, h: 16 },
    // rowHeight={10} 但是高度改变有问题
  ];
  layouts.layoutsm = [
    { i: 'a', x: 0, y: 0, w: 24, h: 8.54 },
    { i: 'b', x: 0, y: 3, w: 24, h: 17 },
    { i: 'c', x: 0, y: 9, w: 24, h: 16 },
    { i: 'd', x: 18, y: 15, w: 24, h: 16 },
  ];

  return layouts;
};

const layouts = getLayouts();
const setLayouts = ({ layoutlg, layoutsm }) => {
  console.log(layoutlg);
  console.log(layoutsm);
  layouts.layoutlg = layoutlg;
  layouts.layoutsm = layoutsm;
};
export default {
  // 从表查询
  'POST /ocp/home/layouts/query': (req, res) => {
    const response = {
      code: 'SUCCESS',
      data: layouts,
      success: true,
      msg: '查询成功！',
    };
    res.json(response);
  },
  'post /ocp/home/layouts/save': (req, res) => {
    const { layoutlg, layoutsm } = req.body;
    setLayouts(req.body);
    const response = {
      code: 'SUCCESS',
      data: null,
      success: true,
      msg: '保存成功！',
    };
    res.json(response);
  },
  'post /ocp/home/layouts/reset': (req, res) => {
    const layoutsinit = {};
    layoutsinit.layoutlg = [
      { i: 'a', x: 0, y: 0, w: 24, h: 8.54 },
      { i: 'b', x: 0, y: 3, w: 24, h: 17 },
      { i: 'c', x: 0, y: 9, w: 18, h: 16 },
      { i: 'd', x: 18, y: 15, w: 6, h: 16 },
      // rowHeight={10} 但是高度改变有问题
    ];
    layoutsinit.layoutsm = [
      { i: 'a', x: 0, y: 0, w: 24, h: 8.54 },
      { i: 'b', x: 0, y: 3, w: 24, h: 17 },
      { i: 'c', x: 0, y: 9, w: 24, h: 16 },
      { i: 'd', x: 18, y: 15, w: 24, h: 16 },
    ];

    setLayouts(layoutsinit);
    const response = {
      code: 'SUCCESS',
      data: null,
      success: true,
      msg: '保存成功！',
    };
    res.json(response);
  },
};
