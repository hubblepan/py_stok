import BeanUtil from '@/utils/BeanUtil';
import MsgBox from '@/utils/MsgBox';
import DefaultService from './defaultService'
import ButtonState from './ButtonState';

/**
 * 默认事件处理方法
 */
const defaultHandles = (handleList, rowKey) => {

  const defaultService = new DefaultService(handleList.url);
  const buttonState = new ButtonState();

  return {
    table: {},
    api: {},
    buttonState,
    getButtonState(button) {
      const method = this.buttonState[button.id];
      return method && method(this.selectedRows);
    },

    noneMethod (event, button) {
      MsgBox.error({ message: '未找到实现方法: ' + button.method });
      // throw new Error('未找到实现方法');
    },
    getPropsMethod (methodName) {
      let method = this[methodName];
      return method;
    },
    getMethod (methodName) {
      let method = this[methodName];
      return method;
    },
    /**
     * 合并按钮状态
     * @param {boolean} disable 是否禁用
     * @param {Array} buttons 按钮列表
     */
    mergeButtonStatus (disable, buttons) {
      let allButtons = this.buttons;
      if (!allButtons) {
        allButtons = [];
        Object.keys(this.toolbar).forEach((v) => {
          allButtons.push(v);
        });
        this.buttons = allButtons;
      }
      let result = {};
      allButtons.forEach((btn) => {
        if (buttons.indexOf(btn)) {
          result[btn] = { disable };
        } else {
          result[btn] = { disable: !disable };
        }
      });
      return BeanUtil.merge(this.buttons, result);
    },
    /**
     * 根据操作获取按钮状态
     * @param {string} operate 操作名称
     */
    getButtonStatus (operate) {
      let buttons = [];
      let disable = true;
      switch (operate) {
        case 'query': {
          buttons = ['save'];
          break;
        }
        case 'add':
        case 'copy':
        case 'edit': {
          buttons = ['save', 'close'];
          break;
        }
        case 'check': {
          buttons = ['uncheck'];
          break;
        }
        case 'uncheck': {
          buttons = ['check'];
          break;
        }
        default:
      }
      if (buttons.length < 1) {
        return {};
      }
      return this.mergeButtonStatus(disable, buttons);
    },

    // buttonStatus(status) {
    //   let buttons = this.buttons;
    //   return deepMerge(buttons, status);
    // },
    add (data, event, button) {
      // let buttons = { ...this.getButtons() };
      let status = { operate: button.id, show: true, selectRow: [], reload: false };
      let buttons = this.getButtonStatus('add');
      data = { operate: 'add', title: '新增', entityName: '用户', buttons };
      // this.setShowDialog(true);
      // this.setStateData(data);
      // let method = this.getMethod(button.handle);
      // console.log(method);
      // method(data);
      // console.log(data, data, event, button);
      // if (!data) {
      //   data = true;
      // }
      return status;
    },
    addBefore (data, event, button) {
      // console.log(data, event, button);
      return true;
    },
    addAfter (data, event, button) {
      console.log(data);
    },
    edit (data, event, button) {
      return data;
    },
    // 在此做编辑查询
    async editBefore (data, event, button, currentRow) {
      // 校验是否选中一行
      let buttons = this.getButtonStatus('edit');

      // 查询数据
      const params = {}
      params[rowKey] = currentRow[0][rowKey]
      const detailRes = await defaultService.detail(params)
      data = { operate: 'edit', title: '修改', entityName: '用户', buttons };

      return detailRes;
    },
    editAfter (data, event, button) {

    },
    deletes (data, event, button) {
      console.log('del(_tp, record, event, button)');

      return true;
    },
    deletesBefore (data, event, button) {
      console.log('delBefore');
      return true;
    },
    deletesAfter (data, event, button) { },
    close (data, event, button) {
      data = { operate: 'query', title: '浏览', formDisplayStatus: false };
      this.setStateData(data);

      return true;
    },
    closeBefore (data, event, button) {
      console.log('close');
      return true;
    },
    closeAfter (data, event, button) { },
  }
};

/**
 * 处理事件对象，用于扩展默认的实践处理方法，可覆盖默认方法或添加自定义的方法。
 * @author huangsq
 * @param {string: function} handleList 处理列表
 */
export default function handleHOF (handleList, rowKey) {
  let result = BeanUtil.merge({}, defaultHandles(handleList, rowKey), handleList);
  return result;
}
