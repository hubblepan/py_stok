import createSimpleModel from '@/handles/createSimpleModel';
import bigInt from 'big-integer';

export default () => {
  return createSimpleModel({ state: {
    dataSourceMap: {},
    detailVisible: false,
    subTableColumns: [], //子表列
    hasRightFuncodes:[], //有权限的模块
    funOperValue:bigInt("2097152"), //功能模块的权限值
    footActiveKey:"", //底部选项卡的当前选项key
    viewMode:"View",//显示模式 默认视图模式
    formVisible: false,//编辑页面展示
    formData: [],//编辑数据
    operate:"",//编辑操作
    disableEdit: false,//编辑按钮是否可用
    disableDel: false,//删除按钮是否可用
    operState:"browse",//操作的状态： browse 浏览状态， edit 编辑状态 ， add 新增状态， copy 复制状态
    expandedRowKeys: [],//默认展开的节点
    auditState:{audit:0,unAudit:0},//audit已审核数量 unAudit 未审核数量
  }});
};
