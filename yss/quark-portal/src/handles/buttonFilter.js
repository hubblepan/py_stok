import BeanUtil from '@/utils/BeanUtil';
import AppContext from '@/utils//AppContext';

const isDisable = (data, fields) => {
  let flag = false;
  Object.keys(fields).forEach((key) => {
    const value = fields[key];
    if (data && data[key] === value) {
      flag = true;
    }
  });
  return flag;
};

/**
 * 默认按钮配置
 */
const defaultButtons = {
  refresh:{
    id: 'refresh',
    operCode: 'RENOVATE',
    type: 'text',
    text: '刷新',
    icon: '',
    method:'query'
  },
  menu: {
    id: 'menu',
    type: 'text',
    text: '分级菜单',
    icon: '',
    children:null
  },
  query: {
    id: 'query',
    operCode: 'BRW',
    type: 'text',
    text: '查询',
    method: 'query',
    icon: 'query',
  },
  preview: {
    id: 'preview',
    type: 'text',
    text: '预览',
    icon: 'preview',
  },
  detail: {
    id: 'detail',
    type: 'text',
    text: '明细',
    icon: 'detail',
  },
  add: {
    id: 'add',
    operCode: 'ADD',
    type: 'text',
    text: '新增',
    icon: 'add',
    disable: false,
  },
  edit: {
    id: 'edit',
    operCode: 'UPD',
    type: 'text',
    text: '编辑',
    icon: 'edit',
    hotkey: 'ctrl+alt+n',
    disable: (data) => {
      if (data && data.length === 1) {
        return isDisable(data[0], { checkState: 1, auditState: 1 });
      }
      return true;
    },
  },
  copy: {
    id: 'copy',
    operCode: 'CPY',
    type: 'text',
    text: '复制',
    icon: 'copy',
    disable: (data) => {
      return !(data && data.length === 1);
    },
  },
  deletes: {
    id: 'deletes',
    operCode: 'DEL',
    type: 'text',
    text: '删除',
    icon: 'close',
    disable: (data) => {
      if (data && data.length > 0) {
        return !data.some((row) => {
          return isDisable(row, { checkState: 0, auditState: 0 });
        });
      }
      return true;
    },
  },
  remove: {
    id: 'remove',
    operCode: 'DEL',
    type: 'text',
    text: '回收',
    icon: 'solution',
  },
  restore: {
    id: 'restore',
    operCode: 'RETURN',
    type: 'text',
    text: '还原',
    icon: 'solution',
  },
  check: {
    id: 'check',
    operCode: 'CHK',
    type: 'text',
    text: '审核',
    icon: 'audit',
    disable: (data) => {
      if (data && data.length > 0) {
        return !data.some((row) => {
          return isDisable(row, { checkState: 0, auditState: 0 });
        });
      }
      return true;
    },
  },
  uncheck: {
    id: 'uncheck',
    operCode: 'UCHK',
    type: 'text',
    text: '反审核',
    icon: 'uncheck',
    disable: (data) => {
      if (data && data.length > 0) {
        return !data.some((row) => {
          return isDisable(row, { checkState: 1, auditState: 1 });
        });
      }
      return true;
    },
  },
  upload: {
    id: 'upload',
    operCode: 'UPLOAD',
    type: 'text',
    text: '上传',
    icon: 'upload',
  },
  download: {
    id: 'download',
    operCode: 'DOWN',
    type: 'text',
    text: '下载',
    icon: 'solution',
  },
  dashed: {
    id: 'dashed',
    type: 'text',
    text: '',
    icon: 'more',
    dropdownItem: false,
  },
  start: {
    id: 'start',
    operCode: 'StartU',
    type: 'text',
    text: '启动',
    icon: 'solution',
  },
  stop: {
    id: 'stop',
    operCode: 'StopU',
    type: 'text',
    text: '停止',
    icon: 'solution',
  },
  sync: {
    id: 'sync',
    type: 'text',
    text: '同步',
    icon: 'solution',
  },
  save: {
    id: 'save',
    operCode: 'SAVE',
    type: 'text',
    text: '保存',
    icon: 'solution',
  },
  undo: {
    id: 'undo',
    type: 'text',
    text: '撤销',
    icon: 'undo',
  },
  redo: {
    id: 'redo',
    type: 'text',
    text: '重做',
    icon: 'redo',
  },
  help: {
    id: 'help',
    type: 'text',
    text: '帮助',
    icon: 'solution',
  },
  fullscreen: {
    id: 'fullscreen',
    type: 'text',
    text: '全屏',
    icon: 'solution',
  },
  close: {
    id: 'close',
    type: 'text',
    text: '关闭',
    icon: 'close',
  },
  more: {
    id: 'more',
    type: 'text',
    text: '更多',
    icon: 'more',
    order: 100000,
    dropdownItem: false,
    children: {
      setting: {
        id: 'setting',
        type: 'text',
        text: '设置',
        icon: 'setting',
        visible: 1,
      },
      imports: {
        id: 'imports',
        operCode: 'IMP',
        type: 'text',
        text: '导入',
        icon: 'solution',
      },
      exports: {
        id: 'exports',
        operCode: 'EPT',
        type: 'text',
        text: '导出',
        icon: 'solution',
      },
      print: {
        id: 'print',
        operCode: 'PNT',
        type: 'text',
        text: '打印',
        icon: 'solution',
        visible: 1,
        children: {
          printAll: {
            id: 'printAll',
            type: 'menu',
            text: '打印所有页',
            icon: 'solution',
            visible: 1,
          },
          printCurrent: {
            id: 'printCurrent',
            type: 'text',
            text: '打印当前页',
            icon: 'solution',
            visible: 1,
          },
        },
      },
    },
  },
};

/**
 * 获取可显示按钮，根据参数设置按钮是否显示，返回可显示的按钮数组列表
 * @author huangsq
 * @param {{string: Object}} buttonList 按钮列表
 * @param string  funCode 功能代码
 */
export function buttonFilter(buttonList, funCode) {
  const functionsList = AppContext.getRights();
  let operList = [];
  if(funCode){
    operList = functionsList[funCode];
  }

  const buttons = BeanUtil.merge({}, defaultButtons, buttonList);
  const buttonResult = [];
  let order = 100;
  Object.keys(buttons).forEach((key) => {
    const item = buttons[key];
    // 添加权限判断
    /**
    if(item.operCode){
      if(operList.indexOf(item.operCode) === -1 ) {
        return false;
      }
    }
    * */
    if (!item.visible) {
      return false;
    }
    if (!item.order) {
      item.order = order;
    }
    if (!item.type) {
      item.type = 'text';
    }
    order += 100;
    buttonResult.push(item);

    if (item.children) {
      item.children = buttonFilter(item.children);
    }
    return true;
  });

  buttonResult.sort((a, b) => {
    return a.order - b.order;
  });
  return buttonResult;
}
