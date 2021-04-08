import BaseService from '@/handles/BaseService';
import ButtonState from './ButtonState';
import BeanUtil from '@/utils/BeanUtil';
import MsgBox from '@/utils/MsgBox';

// const getSyncValue = async function (promis) {
//   return await promis;
// };

export default class BaseHandle {
  constructor(params) {
    this.init(params);
  }

  init(params) {
    let { url, service, buttonState, ...rest } = params;

    if (!service && url) {
      service = new BaseService(url);
    }
    if (!buttonState) {
      buttonState = new ButtonState();
    }
    this.service = service;
    this.buttonState = buttonState;

    Object.keys(rest).forEach((key) => {
      this[key] = rest[key];
    });
  }
  extend(params) {
    let { ...rest } = params;

    Object.keys(rest).forEach((key) => {
      this[key] = rest[key];
    });
  }
  // async getSyncValue(promis) {
  //   return await promis;
  // }
  // noneMethod(event, button) {
  //   MsgBox.error({ message: '未找到实现方法: ' + button.method });
  //   // throw new Error('未找到实现方法');
  // }
  // getPropsMethod(methodName) {
  //   let method = this[methodName];
  //   return method;
  // }
  // getMethod(methodName) {
  //   let method = this[methodName];
  //   return method;
  // }
  getButtonState(button) {
    const method = this.buttonState[button.id];
    return method && method.call(this.buttonState, this.selectedRows);
  }
  rowClassName(record) {
    return record.checkState === 0 ? 'text-warning' : '';
  }
  onHeaderRowClick(event, column, index) {}

  onRowDoubleClick(event, record, index) {}
  onRowClick(event, record, index) {}
  onRowContextMenu(event, record, index) {}
  onRowMouseEnter(event, record, index) {}
  onRowMouseLeave(event, record, index) {}

  queryBefore() {
    // 1. 获取左边查询条件 默认return true 需要则复写
    return true;
  }

  async query({ event } = {}) {
    const isValid = this.queryBefore();
    if (isValid) {
      // 2.获取searchBar查询条件
      this.setLoading(true);
      let params = BeanUtil.merge(
        this.searchForm ? await this.searchForm.getFieldsValue() : {}, //此处有异步
        this.pageInfo
          ? {
              pageSize: this.pageInfo.pageSize,
              pageNo: this.pageInfo.pageNo,
            }
          : {},
      );

      // 这里param为必选字段
      const extraParams = this.params;
      console.log('额外参数', extraParams);
      // 如果有传递额外参数:比如主表选中
      if (extraParams) {
        params = BeanUtil.merge(params, extraParams);
      }

      return this.queryAfter(params, event);
    }
  }

  async queryAfter(param, event) {
    console.log('列表查询参数', param);
    const result = await this.service.query(param);
    this.setDataSource(result.data.list);
    this.setSelectedRowKeys([]);
    this.setSelectedRows([]);
    this.setLoading(false);

    if (this.pageInfo) {
      this.setPageInfo({
        ...this.pageInfo,
        pageTotal: result.data.total,
      });
    }

    return result;
  }

  /**
   * 合并按钮状态
   * @param {boolean} disable 是否禁用
   * @param {Array} buttons 按钮列表
   */
  mergeButtonStatus(disable, buttons) {
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
  }
  /**
   * 根据操作获取按钮状态
   * @param {string} operate 操作名称
   */
  getButtonStatus(operate) {
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
  }

  // buttonStatus(status) {
  //   let buttons = this.buttons;
  //   return deepMerge(buttons, status);
  // }
  add({ event, button }) {
    // 设置标题， let buttons = { ...this.getButtons() };
    this.setFormVisible && this.setFormVisible(true);
    // let status = { operate: button.id, show: true, selectRow: [], reload: false };
    // let buttons = this.getButtonStatus('add');
    // data = { operate: 'add', title: '新增', entityName: '用户', buttons };
    // // this.setShowDialog(true);
    // // this.setStateData(data);
    // // let method = this.getMethod(button.handle);
    // // console.log(method);
    // // method(data);
    // // console.log(data, data, event, button);
    // // if (!data) {
    // //   data = true;
    // // }
    // return status;
  }
  addBefore({ data, event, button }) {
    // console.log(data, event, button);
    return true;
  }
  addAfter({ event, button }) {
    console.log(data);
  }
  edit({ event, button }) {
    this.setFormVisible && this.setFormVisible(true);
    this.service.detail(this.selectedKeys[0]).then((result) => {
      this.setFormData && this.setFormData(result.data);
    });
  }
  // 在此做编辑查询
  async editBefore({ event, button, currentRow }) {
    // console.log('before')
    // // 校验是否选中一行
    // let buttons = this.getButtonStatus('edit');
    // // 查询数据
    // const params = {};
    // params[rowKey] = currentRow[0][rowKey];
    // const detailRes = await defaultService.detail(params);
    // data = { operate: 'edit', title: '修改', entityName: '用户', buttons };
    // return detailRes;
  }
  editAfter({ event, button }) {}
  deletes({ event, button }) {
    const ids = [];
    this.selectedRows.forEach((item) => {
      if (item.checkState === 0) {
        ids.push(item.id);
      }
    });
    MsgBox.confirm({
      title: '删除',
      content: '是否确定删除未审核的记录，删除后不可恢复',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        try {
          this.service.deletes(ids);
          this.query(event);
        } catch (e) {
          MsgBox.error({ message: '删除数据失败' });
        }
      },
    });
    return true;
  }
  save(data, event, button) {
    this.service.save(data);
    this.query();
  }
  check({ event, button }) {
    const ids = [];
    this.selectedRows.forEach((item) => {
      if (item.checkState === 0) {
        ids.push(item.id);
      }
    });
    MsgBox.confirm({
      title: '审核',
      content: '是否确定审核未审核的记录',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        try {
          this.service.check(ids);
          this.query(event);
        } catch (e) {
          MsgBox.error({ message: '审核数据失败' });
        }
      },
    });
    return true;
  }
  uncheck({ event, button }) {
    const ids = [];
    this.selectedRows.forEach((item) => {
      if (item.checkState === 1) {
        ids.push(item.id);
      }
    });
    MsgBox.confirm({
      title: '反审核',
      content: '是否确定反审核已审核的记录',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        try {
          this.service.uncheck(ids);
          this.query(event);
        } catch (e) {
          MsgBox.error({ message: '反审核数据失败' });
        }
      },
    });
    return true;
  }

  close({ data, event, button }) {
    data = { operate: 'query', title: '浏览', formDisplayStatus: false };
    this.setStateData(data);

    return true;
  }
  closeBefore({ data, event, button }) {
    console.log('close');
    return true;
  }
  closeAfter({ data, event, button }) {}
}
