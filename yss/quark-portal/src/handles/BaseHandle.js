import BeanUtil from '@/utils/BeanUtil';
import MsgBox from '@/utils/MsgBox';
import BaseService from './BaseService';

class BaseHandle {
  constructor(params) {
    this.init(params);
  }

  init (params) {
    let { url, service, rowKey, paramKey, ...rest } = params;
    this.rowKey = rowKey || 'id';
    this.paramKey = paramKey || 'ids';
    if (!service && url) {
      service = new BaseService(url);
    }
    this.service = service;
    Object.keys(rest).forEach((key) => {
      this[key] = rest[key];
    });
  }

  getButtonState (button) {
    const method = this.buttonState[button.id];
    return method && method.call(this.buttonState, this.selectedRows);
  }

  getMasterParams () {
    const masterParams = {};
    if (this.masterSelectedRows) {
      if (this.masterSelectedRows.length === 0) {
        MsgBox.warning({ message: '请至少选择一条主表数据' });
        return false;
      }
      masterParams[this.paramKey] = this.masterSelectedRows
        .map((item) => item[this.rowKey])
        .join('|');
    }
    return masterParams;
  }

  getSearchFormParams () {
    return this.searchForm && this.searchForm.getFieldsValue();
  }

  /**
   * 根据参数和默认参数构建查询条件
   * @param {*} params
   */
  async queryBefore (params) {
    const masterParams = this.getMasterParams();
    if (!masterParams) {
      return false;
    }
    const queryParams = BeanUtil.merge(
      masterParams,
      this.params,
      this.getSearchFormParams(),
      params,
    );
    return queryParams;
  }

  /**
   * 查询表格数据
   * @param {*} props
   */
  async query (options = {}) {
    let { params, pageInfo, orderBy } = options;
    params = await this.queryBefore(params);
    if (!params) {
      return false;
    }

    let page = null;
    if (this.pageInfo) {
      pageInfo = {
        pageNo: pageInfo?.pageNo || 1,
        pageSize: pageInfo?.pageSize || this.pageInfo.pageSize,
        pageTotal: pageInfo?.pageTotal || 0,
      };
      page = { currPage: pageInfo.pageNo, pageSize: pageInfo.pageSize };
    }
    orderBy = orderBy || this.orderBy;

    params = BeanUtil.merge({ orderBy, paraMap: params, page }, pageInfo);

    console.log('查询参数: ', params);
    this.setLoading(true);
    const result = await this.service.query(params);
    return this.queryAfter({ pageInfo, orderBy, result });
  }

  /**
   * 查询查询表格数据
   * @param {*} props
   */
  async requery (options = {}) {
    return this.query(options);
  }

  /**
   * 查询结果处理
   * @param {*} result
   */
  async queryAfter (options) {
    const { pageInfo, orderBy, result, ...rest } = options;
    console.log('查询结果: ', result);
    if (this.pageInfo) {
      pageInfo.pageTotal = result?.data?.total;
    }
    this.changeResult({
      pageInfo,
      orderBy,
      dataSource: result?.data?.list,
      expandedRowKeys: this.getExpandAll(result?.data?.list),
      ...rest,
    });
    return result;
  }

  /**
   * 变更页码或页大小
   * @param {*} pageNo
   * @param {*} pageSize
   */
  async changePage (pageNo, pageSize) {
    return this.requery({
      pageInfo: { pageNo, pageSize, pageTotal: this.pageInfo.pageTotal },
    });
  }

  /**
   * 后端排序
   * @param {*} orderBy
   */
  async orderBy (orderBy) {
    return this.requery({ orderBy });
  }

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
    const result = {};
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
  getButtonStatus (operate) {
    let buttons = [];
    const disable = true;
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
  add ({ event, button }) {
    // 设置标题， let buttons = { ...this.getButtons() };
    this.setOperate && this.setOperate('add');
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

  addBefore ({ data, event, button }) {
    // console.log(data, event, button);
    return true;
  }

  addAfter ({ event, button }) {
    console.log(data);
  }

  edit ({ event, button, currentRow }) {
    const selectedRowKeys = currentRow || this.selectedRowKeys;
    this.setOperate && this.setOperate('edit');
    this.setFormVisible && this.setFormVisible(true);
    this.service.detail(selectedRowKeys[0]).then((result) => {
      this.setFormData && this.setFormData(result?.data);
    });
  }

  // 在此做编辑查询
  async editBefore ({ event, button, currentRow }) {
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

  editAfter ({ event, button }) { }

  deletes ({ event, button, currentRow }) {
    const selectedRows = currentRow || this.selectedRows;
    const ids = [];
    selectedRows.forEach((item) => {
      if (item.checkState === 0 || item.auditState === 0) {
        ids.push(item.id);
      }
    });
    MsgBox.confirmModal({
      title: '删除',
      content: '是否确定删除未审核的记录，删除后不可恢复',
      okText: '确定删除',
      type: 'danger',
      onOk: () => {
        try {
          this.service.deletes(ids);
          this.requery({ event });
        } catch (e) {
          MsgBox.error({ message: '删除数据失败' });
        }
      },
    });
    return true;
  }

  save (data, event, button) {
    this.service.save(data);
    this.requery({ event });
  }

  check ({ event, button }) {
    const ids = [];
    this.selectedRows.forEach((item) => {
      if (item.checkState === 0) {
        ids.push(item.id);
      }
    });
    MsgBox.confirmModal({
      title: '审核',
      content: '是否确定审核未审核的记录?',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        try {
          this.service.check(ids);
          this.requery({ event });
        } catch (e) {
          MsgBox.error({ message: '审核数据失败' });
        }
      },
    });
    return true;
  }

  uncheck ({ event, button }) {
    const ids = [];
    console.log(1111, this);
    this.selectedRows.forEach((item) => {
      if (item.checkState === 1) {
        ids.push(item.id);
      }
    });
    MsgBox.confirmModal({
      title: '反审核',
      content: '是否确定反审核已审核的记录?',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        try {
          this.service.uncheck(ids);
          this.requery({ event });
        } catch (e) {
          MsgBox.error({ message: '反审核数据失败' });
        }
      },
    });
    return true;
  }

  close ({ data, event, button }) {
    data = { operate: 'query', title: '浏览', formDisplayStatus: false };
    this.setStateData(data);

    return true;
  }

  closeBefore ({ data, event, button }) {
    console.log('close');
    return true;
  }

  closeAfter (data, event, button) { }

  async listHead () {
    // console.log(this.service);
    /**
    const columns = [];
    let listHeads = await this.service.listHead();
    if(listHeads){
      listHeads = listHeads.data;
      for (let i = 0; i < listHeads.length; i++) {
        const column = {};
        column.title = listHeads[i].text;
        const columnKey = listHeads[i].key[0].toLowerCase() + listHeads[i].key.substring(1, listHeads[i].key.length);
        column.dataIndex = columnKey;
        column.key = columnKey;
        column.width = listHeads[i].width;
        column.hidden = listHeads[i].isShow===0?1:0;
        column.export = listHeads[i].isExport;
        columns.push(column);
      }
    }
    * */
    // console.log(`columns=  ${JSON.stringify(columns)}`);
    // this.setColumns(columns);
    // return columns;
  }

  /** 主表相关搜索方法 */
  searchMethod ({ dataSource, rowKey, searchWord, searchName }) {
    if (searchWord == '') {
      return this.getTreeKey(dataSource, rowKey);
    }

    const selectNode = [];
    const search = (nodes, parentSate) => {
      if (!nodes) {
        return;
      }
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const nodeState = {};
        node.isShow = false;
        if (node[searchName].indexOf(searchWord) !== -1) {
          parentSate.extend = true;
          node.isShow = true;
          selectNode.push(node[rowKey]);
        } else if (node.children) {
          search(node.children, nodeState);
        }
        if (nodeState.extend) {
          parentSate.extend = true;
        }
        if (nodeState.extend) {
          selectNode.push(node[rowKey]);
          node.isShow = true;
        }
      }
    };

    search(dataSource, {});
    return selectNode;
  }

  // 获取树全部主键
  getTreeKey (tree, key) {
    const ret = [];
    const _getTree = (_tree) => {
      for (let i = 0; i < _tree.length; i++) {
        _tree[i].isShow = true;
        ret.push(_tree[i][key]);
        if (_tree[i].children) {
          _getTree(_tree[i].children);
        }
      }
    };
    _getTree(tree);
    return ret;
  }

  // 防抖
  debounce (fn, interval) {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      fn();
    }, interval);
  }

  // 生成主表展示数据
  getShowDataSource (dataSource) {
    // return dataSource.filter((x) => x.isShow);
    const ret = JSON.parse(JSON.stringify(dataSource));
    const genData = (data) => {
      const newData = data.filter((item) => item.isShow);
      return newData.map((item) => {
        if (item.children) {
          item.children = genData(item.children);
        }
        return item;
      });
    };

    return genData(ret);
  }

  // 生成展开数据
  getExpandAll (data, keys = []) {
    for (let i = 0; i < data.length; i++) {
      keys.push(data[i].id);
      if (data[i].children && data[i].children.length) {
        this.getExpandAll(data[i].children, keys);
      }
    }

    return keys;
  }

  // 生成展开数据
  expandAll () {
    const data = this.dataSource;
    const openKeys = [];
    for (let i = 0; i < data.length; i++) {
      openKeys.push(data[i].id);
      if (data[i].children && data[i].children.length) {
        this.getExpandAll(data[i].children, openKeys);
      }
    }
    this.setExpandedRowKeys(openKeys);
  }

  /**
   * 分级菜单相关API
   */
  /** 1.按指定层级展开 */
  expandLevel (expandedLevel = 0, dataSource) {
    // 首先需要判断是否配置了setExpandedRowKeys属性
    if (!this.setExpandedRowKeys) return null;
    /**
     * 尤其注意：
     * 使用expandedRowKeys属性控制table的展开时，一定要和onExpand配合使用
     */
    let depth = 0;
    const newExpandedKeys = [];
    const expand = (treeData, currentLevel) => {
      // 根据expandedLevel来控制最大"展开层级"。为0代表"全部展开"
      if (currentLevel >= expandedLevel && expandedLevel) {
        return newExpandedKeys;
      }
      if (expandedLevel === 0) {
        // 初始"全部展开"时计算"最大层级"
        // console.log('计算最大层级');
        // console.log(currentLevel);
        // console.log(depth);
        depth = Math.max(depth, currentLevel);
      }
      // 递归遍历
      treeData.map((item) => {
        const key = this.rowKey || 'id';
        newExpandedKeys.push(item[key]);
        // 但是要考虑到空分类的情况
        if (item.children || (!item.children && !item.isLeaf)) {
          expand(item.children || [], currentLevel + 1);
        }
      });
      return newExpandedKeys;
    };
    // console.log('递归前dataSource');
    // console.log(dataSource);
    this.setExpandedRowKeys(expand(dataSource, 1));
    // console.log('递归完成');
    // console.log(newExpandedKeys);
    // console.log('递归完成depth');
    // console.log(depth);
    if (expandedLevel === 0) {
      return depth;
    }
  }
  /** 2.根据数据源获取最大层级生成分级菜单 */
  getMasterMenus (dataSource) {
    const depth = this.expandLevel(0, dataSource);
    const menus = {};
    for (let i = 1; i <= depth; i++) {
      menus[i] = {};
      menus[i].text = `${i}级菜单`;
      menus[i].visible = 1;
      menus[i].method = 'expand';
      menus[i].level = i;
    }
    return menus;
  }
  /** 3."分级菜单"按钮点击方法 */
  expand ({ button, ...rest }) {
    const { dataSource } = this;
    this.expandLevel(button.level, dataSource);
  }
}

export default BaseHandle;
