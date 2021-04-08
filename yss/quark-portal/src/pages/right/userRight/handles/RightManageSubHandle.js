import React from 'react';
import BaseHandle from '@/handles/BaseHandle';
import BaseService from '@/handles/BaseService';
// import ButtonState from '@/components/TableView/ButtonState';
import { Checkbox } from 'antd';
import request from '@/utils/request';
// import {
//   ExclamationCircleOutlined,
// } from '@ant-design/icons';
import MsgBox from "@/utils/MsgBox";
import {LockOutlined} from "@ant-design/icons";

const commParams = {serviceId: 'osgi-fast'};
let newInstance = null;

export default class RightManageSubHandle extends BaseHandle {
  constructor(props) {
    const service = new BaseService({ base: '/ocp/monitor/index' });
    // const subButtonState = new SubButtonState();
    super({ ...props, service });
    newInstance = this;
    // const {selectedRows, selectedRowKeys} = props;
    // this.selectedRows = selectedRows;
    // this.selectedRowKeys = selectedRowKeys;
  }

  async queryPostData(orgCode, needUpdate) {
    const url = '/YSSUCOBRIDGE/ws/com/yss/fast/right/support/post/controller/IPostNewServiceController/queryPosts';
    const data = {SearchAudit: '', pageFunCode: 'UserPostData'};
    if (orgCode) {
      data.selectedOrgCode = orgCode;
    }
    const res = await request.post(url, {
      params: commParams,
      data,
    });
    if (needUpdate) {
      this.changeState({postList: res.data});
    }
    return res;
  }

  async queryDataByType(needUpdate) {
    function convertListToTree(listData) {
      const treeList = [];
      const dataMap = {};
      if (listData && listData.length > 0) {
        // 得到map
        listData.forEach(item => {
          dataMap[item.c_DATA_CODE] = item;
        });
        // 将根节点塞进列表
        listData.forEach(item => {
          if (!dataMap[item.c_DATA_CODE_P]) {
            treeList.push(item);
          }
        });
        // 将各个节点放到其父节点下面
        listData.forEach(item => {
          if (dataMap[item.c_DATA_CODE_P]) {
            const parent = dataMap[item.c_DATA_CODE_P];
            if (!parent.children) {
              parent.children = [];
            }
            parent.children.push(item);
          }
        });
      }
      return treeList;
    }
    const url = '/YSSUCOBRIDGE/ws/com/yss/right/controller/IFastDataRightServiceController/queryDataByType';
    const data = this.currentDataType.c_DATA_TYPE;
    const res = await request.post(url, {
      params: commParams,
      data,
    });
    const dataTree = convertListToTree(res.data.map(item => {
      return {...item, title: item.c_DATA_NAME, value: item.c_DATA_CODE,}
    }));
    if (needUpdate) {
      this.changeState({dataTree});
    }
    return dataTree;

  }

  // 子表被创建时，需要获取 权限数据类型列表
  async initSubHandle() {
    // 获取SysDataType
    async function querySysDataType() {
      const url = '/YSSUCOBRIDGE/ws/com/yss/fast/right/support/right/controller/ISysDataTypeServiceController/queryAll';
      const params = {
        serviceId: 'osgi-fast',
      };
      const res = await request.post(url, {
        params,
      });
      return res;
    }

    async function getAuthOrgTree() {
      function convertListToTree(listData) {
        const treeList = [];
        const dataMap = {};
        if (listData && listData.length > 0) {
          // 将根节点塞进列表
          listData.forEach(item => {
            if (item.c_AUTH_ORG_CODE_P === '0') {
              treeList.push(item);
            }
            dataMap[item.c_AUTH_ORG_CODE] = item;
          });

          // 将各个节点放到其父节点下面
          listData.forEach(item => {
            if (item.c_AUTH_ORG_CODE_P !== '0') {
              const parent = dataMap[item.c_AUTH_ORG_CODE_P];
              if (!parent) {
                console.log('xxxxxx-error', item);
              }
              if (!parent.children) {
                parent.children = [];
              }
              parent.children.push(item);
            }
          });
        }
        return treeList;
      }
      const url = '/YSSUCOBRIDGE/ws/com/yss/platform/support/dataservice/controller/IAuthOrgDataTreeServiceController/getAuthOrgTree';
      const res = await request.post(url, {params: commParams});
      return convertListToTree(res.data.map(item => {
        return {...item, title: item.c_AUTH_ORG_NAME, value: item.c_AUTH_ORG_CODE,}
      }));
    };

    const postList = await this.queryPostData();
    const sysDataTypeList = await querySysDataType();
    const authOrgTree = await getAuthOrgTree();

    // 将 sysDataTypeList 的 组合放入第一条
    const [dataType1] =  sysDataTypeList.data.filter(item => item.c_DATA_TYPE === '1');
    sysDataTypeList.data.splice(sysDataTypeList.data.indexOf(dataType1), 1);
    sysDataTypeList.data.unshift(dataType1);

    const newColumns = [
      {
        title: '数据代码',
        dataIndex: 'c_DATA_CODE',
        key: 'c_DATA_CODE',
        width: 100,
        fixed: 'left',
        // sorter: true,
        search: true,
        resizable: true,
        hidden: false,
        export: true,
        // widget: 'input',
        // onFilter: (value, record) => record.mainCode.includes(value),
      },
      {
        title: '数据名称',
        dataIndex: 'c_DATA_NAME',
        key: 'c_DATA_NAME',
        width: 100,
        search: true,
        // sortable: true,
        resizable: true,
        // index: 1,
        show: true,
        export: true,
        // widget: 'input',
        // sorter: (a, b) => a.indexName.length - b.indexName.length,
      }];
    // 生成新列
    postList.data.forEach(postItem => {
      // eslint-disable-next-line no-param-reassign
      newColumns.push({
        title: postItem.c_POST_NAME,
        dataIndex: postItem.c_POST_CODE + postItem.c_POST_NAME,
        key: postItem.c_POST_CODE,
        width: 100,
        // fixed: 'left',
        // sorter: true,
        // search: true,
        // resizable: true,
        hidden: false,
        export: true,
        // widget: 'input',
        // onFilter: (value, record) => record.mainCode.includes(value),
      });
    });
    this.changeResult({dataSource: [], currentUser: null, postList: postList.data, dataTypeList: sysDataTypeList.data, currentDataType:sysDataTypeList?.data[0], authOrgTree});
  }



  onRightChanged(text, record, index, postItem) {
    // 判断某一个Checkbox 是否可以响应 check变化
    const couldCheck = (item) => {
      if (newInstance.selectedRowKeys.indexOf(item.c_DATA_CODE) !== -1) {
        return true;
      }
      if (item?.children) {
        for (let i = 0; i < item.children.length; i++) {
          if (couldCheck(item.children[i])) {
            return true;
          }
        }
      }
      return false;
    };
    // 修改节点的 check状态
    const checkNodeRight = (node, checked) => {
      const itemIndex = node.postList?.indexOf(postItem.c_POST_CODE);
      // 被选中的行才有资格修改权限 (或者child 存在被选中的情况)
      if (couldCheck(node)) {
        if (checked) {
          if (itemIndex === undefined || itemIndex === -1) {
            node.postList?.push(postItem.c_POST_CODE);
          }
        } else {
          if (itemIndex >= 0) {
            node.postList.splice(itemIndex, 1);
          }
        }
        node?.children?.forEach(item => checkNodeRight(item, checked));
      }

    };
    if (record.postList?.indexOf(postItem.c_POST_CODE) >= 0) {
      checkNodeRight(record, false);
    } else {
      checkNodeRight(record, true);
    }
    this.changeState({dataSource: [...this.dataSource]});
  }

  // 清除列表模式的table 状态数据 并切换到 视图模式
  switchToViewMode() {
    // columns, dataSource, selectedKeys, selectedRows, pageInfo
    this.changeState({
      viewMode: 'View',
      subColumns: [
        {
        title: '数据代码',
        dataIndex: 'c_DATA_CODE',
        key: 'c_DATA_CODE',
        width: 100,
        fixed: 'left',
        // sorter: true,
        search: true,
        // resizable: true,
        hidden: false,
        export: true,
        // widget: 'input',
        // onFilter: (value, record) => record.mainCode.includes(value),
      },
        {
          title: '数据名称',
          dataIndex: 'c_DATA_NAME',
          key: 'c_DATA_NAME',
          width: 100,
          search: true,
          // sortable: true,
          // resizable: true,
          // index: 1,
          show: true,
          export: true,
          // widget: 'input',
          // sorter: (a, b) => a.indexName.length - b.indexName.length,
        }],
      dataSource: [], selectedRows: [], selectedRowKeys: [], expandedRowKeys: [],
      pageInfo: {
        pageNo: 1,
        pageTotal: 0,
        pageSize: 20,
      },
    });
  }

  // 清除视图模式的 table 状态数据 并切换到 列表模式
  switchToListMode() {
    // columns, dataSource, dataSourceMap, selectedKeys, selectedRows, viewMode
    // 列数据
    const columns = [
    //   "id":"1303376",
    //   "modifier":"yss",
    //   "modifyDate":"20210202 16:54:02",
    //   "startUseDate":"2021-02-03 10:48:04",
    //   "endUseDate":"2021-02-03 10:48:04",
    //   "auditState":1,
    //   "operator":"yss",
    //   "auditDate":"20210202 16:54:40",
    //   "c_DATA_CODE":"0009",
    //   "c_DATA_NAME":"0009",
    //   "c_DATA_TYPE":"1",
    //   "c_USER_CODE":"lds556",
    //   "n_SOURCE":0,
    //   "c_POST_CODE":"jk",
    //   "c_POST_NAME":"顶岗管理权限迁移",
    //   "postList":[
    //
    // ],
    //   "auditedPostList":[
    //
    // ],
    //   "oldPostList":[
    //
    // ]
      {
        title: '数据代码',
        name: '数据代码', // 兼容 ali-react-table
        dataIndex: 'c_DATA_CODE',
        code: 'c_DATA_CODE', // 兼容 ali-react-table
        key: 'c_DATA_CODE',
        width: 100,
        fixed: 'left',
        search: true,
        resizable: true,
        hidden: false,
        lock: true,
        export: true,
      },
      {
        title: '数据名称',
        dataIndex: 'c_DATA_NAME',
        key: 'c_DATA_NAME',
        name: '数据名称', // 兼容 ali-react-table
        code: 'c_DATA_NAME', // 兼容 ali-Sreact-table
        width: 150,
        search: true,
        resizable: true,
        show: true,
        export: true,
      },
      {
        title: '岗位名称',
        dataIndex: 'c_POST_NAME',
        key: 'c_POST_NAME',
        name: '岗位名称', // 兼容 ali-react-table
        code: 'c_POST_NAME', // 兼容 ali-Sreact-table
        width: 150,
        search: true,
        resizable: true,
        show: true,
        export: true,
      },
      {
        title: '审核人',
        dataIndex: 'operator',
        key: 'operator',
        name: '审核人', // 兼容 ali-react-table
        code: 'operator', // 兼容 ali-Sreact-table
        width: 100,
        search: true,
        resizable: true,
        show: true,
        export: true,
      },
      {
        title: '审核时间',
        dataIndex: 'auditDate',
        key: 'auditDate',
        name: '审核时间', // 兼容 ali-react-table
        code: 'auditDate', // 兼容 ali-Sreact-table
        width: 100,
        search: true,
        resizable: true,
        show: true,
        export: true,
      },
      {
        title: '修改人',
        dataIndex: 'modifier',
        key: 'modifier',
        name: '修改人', // 兼容 ali-react-table
        code: 'modifier', // 兼容 ali-Sreact-table
        width: 100,
        search: true,
        resizable: true,
        show: true,
        export: true,
      },
      {
        title: '修改时间',
        dataIndex: 'modifyDate',
        key: 'modifyDate',
        name: '数据名称', // 兼容 ali-react-table
        code: 'modifyDate', // 兼容 ali-Sreact-table
        width: 100,
        search: true,
        resizable: true,
        show: true,
        export: true,
      },
    ]
    this.changeState({
      viewMode: 'List',
      subColumns: columns,
      dataSource: [],
      dataSourceMap: {},
      selectedRows: [],
      selectedRowKeys: [],
      expandedRowKeys: [],
      pageInfo: {
        pageNo: 1,
        pageTotal: 0,
        pageSize: 20,
      }}); // 展开
  }

  // 列表模式下的查询
  async queryInListMode(options) {
    console.log('xxxxxxxx-handles', this);
    const {currentUser, currentDataType, postList} = this;
    if (!currentUser) {
      MsgBox.warning({ message: '请选择至少一个用户' });
      return;
    }
    // 查询参数
    const getParaMap = () => {
      // 查询参数
      const searchParams = this.searchForm.getFieldsValue();
      const param = {
        dataClass: 'UserPostData',
        C_USER_CODE: currentUser.c_CORP_ORG_CODE,
        C_DATA_TYPE: currentDataType.c_DATA_TYPE,
        N_CHECK_STATE: 'SearchAll',
      };
      if (searchParams.ARRAY_C_POST_CODE && searchParams.ARRAY_C_POST_CODE.length > 0) {
        param.ARRAY_C_POST_CODE = searchParams.ARRAY_C_POST_CODE.join(',');
      } else {
        param.ARRAY_C_POST_CODE = postList.map(item => item.c_POST_CODE).join(',');
      }

      if (searchParams.ARRAY_C_DATA_CODE && searchParams.ARRAY_C_DATA_CODE.length > 0) {
        param.ARRAY_C_DATA_CODE = searchParams.ARRAY_C_DATA_CODE.join(',');
      }
      return param;
    };
    // url 和 请求
    this.setLoading(true);
    // 获取总数量
    const queryDataTotal = '/YSSUCOBRIDGE/ws/com/yss/fast/right/support/right/controller/IUserPostDataServiceController/queryDataTotal';
    const totalRes = await request.post(queryDataTotal, {
      params: commParams,
      data: getParaMap(),
    });
    // 获取分页数据
    let pageInfo = options?.pageInfo;
    if (!pageInfo) {
      pageInfo = {
        pageNo: 1,
        pageSize: this.pageInfo?.pageSize || 20,  // changeResult 会把 pageInfo 置空
        pageTotal: 0,
      }
    }
    pageInfo.pageTotal = totalRes.data;
    const url = '/YSSUCOBRIDGE/ws/com/yss/fast/right/support/right/controller/IUserPostDataServiceController/queryByCondition/page';
    const data = {
      paraMap: getParaMap(),
      // 查询数据
      page: {
        currPage: pageInfo.pageNo,
        pageCount: pageInfo.pageNo,
        totalNum: pageInfo.pageTotal,
        pageSize: pageInfo.pageSize,
        usePage: true,
      },
    };
    const res = await request.post(url, {params: commParams, data});
    // 改变状态数据
    this.changeResult({dataSource: res?.data?.dataList, pageInfo,
      editMode: false, // 权限编辑状态
      disableEdit: false,
      disableSave: true,
      disableCheck: true,
      disableUncheck: true,});
  }

  // 视图模式下的查询
  async queryInViewMode() {
    function convertListToTree(listData) {
      const treeList = [];
      const dataMap = {};
      if (listData && listData.length > 0) {
        // 得到map
        listData.forEach(item => {
          dataMap[item.c_DATA_CODE] = item;
        });
        // 将根节点塞进列表
        listData.forEach(item => {
          if (!dataMap[item.c_DATA_CODE_P]) {
            treeList.push(item);
          }
        });
        // 将各个节点放到其父节点下面
        listData.forEach(item => {
          if (dataMap[item.c_DATA_CODE_P]) {
            const parent = dataMap[item.c_DATA_CODE_P];
            if (!parent.children) {
              parent.children = [];
            }
            parent.children.push(item);
          }
        });
      }

      return treeList;
    }

    // 获取当前用户
    const {currentUser, currentDataType, postList} = this;
    if (!currentUser) {
      MsgBox.warning({ message: '请选择至少一个用户' });
      return;
    }
    // 获取参数
    const getParams = () => {
      // 查询参数
      const searchParams = this.searchForm.getFieldsValue();
      const param = {
        dataClass: 'UserPostData',
        C_USER_CODE: currentUser.c_CORP_ORG_CODE,
        C_DATA_TYPE: currentDataType.c_DATA_TYPE,
        N_CHECK_STATE: 'SearchAll',
      };
      if (searchParams.ARRAY_C_POST_CODE && searchParams.ARRAY_C_POST_CODE.length > 0) {
        param.ARRAY_C_POST_CODE = searchParams.ARRAY_C_POST_CODE.join(',');
      } else {
        param.ARRAY_C_POST_CODE = postList.map(item => item.c_POST_CODE).join(',');
      }

      if (searchParams.ARRAY_C_DATA_CODE && searchParams.ARRAY_C_DATA_CODE.length > 0) {
        param.ARRAY_C_DATA_CODE = searchParams.ARRAY_C_DATA_CODE.join(',');
      }
      return {
        dataCodes: searchParams.ARRAY_C_DATA_CODE ? searchParams.ARRAY_C_DATA_CODE : [],
        param,
        dataType: currentDataType.c_DATA_TYPE,
        userIds: currentUser.c_CORP_ORG_CODE,
        dimensionCode: '',
      }
    };
    // 获取岗位数据
    async function queryPostData() {
      // console.log('用户权限子表查询岗位接口调用: params = ', this.selectedRowKeys);
      const url = '/YSSUCOBRIDGE/ws/com/yss/fast/right/support/post/controller/IPostNewServiceController/queryPosts';
      const res = await request.post(url, {
        params: commParams,
        data: {SearchAudit: '', pageFunCode: 'UserPostData'},
      });
      return res;
    }
    // 获取数据 数据
    async function queryDataData(data) {
      // console.log('用户权限子表查询数据接口调用: params = ', this.selectedRowKeys);
      const url = '/YSSUCOBRIDGE/ws/com/yss/fast/right/support/right/controller/IUserPostDataServiceController/getDataTreeByDataTypeAndUseridTree';
      const params = {
        serviceId: 'osgi-fast',
      };
      const res = await request.post(url, {
        params,
        data,
      });
      return res;
    }
    if (!this.loading) {
      this.changeState({loading: true});
    }
    const queryData = getParams();
    const postData = await queryPostData();
    const dataData = await queryDataData(queryData);
    const newColumns = [
      {
        title: '数据代码',
        name: '数据代码', // 兼容 ali-react-table
        dataIndex: 'c_DATA_CODE',
        code: 'c_DATA_CODE', // 兼容 ali-react-table
        key: 'c_DATA_CODE',
        width: 200,
        fixed: 'left',
        // sorter: true,
        search: true,
        resizable: true,
        hidden: false,
        lock: true,
        export: true,
        render: (text, record) => {
          if (record.c_DATA_TYPE === '1' && record.c_DATA_CODE_P === '[root]') {
            return (<span className="text-body">{text}</span>)
          }
          if (record.realAuditState === 0) {
            return (<span className="text-warning">{text}</span>)
          }
          if (record.realAuditState === 2) { // text-primary
            return (<span className="text-primary">{text}</span>)
          }
          return (<span className="text-body">{text}</span>)

        },
        // widget: 'input',
        // onFilter: (value, record) => record.mainCode.includes(value),
      },
      {
        title: '数据名称',
        dataIndex: 'c_DATA_NAME',
        key: 'c_DATA_NAME',
        name: '数据名称', // 兼容 ali-react-table
        code: 'c_DATA_NAME', // 兼容 ali-Sreact-table
        width: 200,
        search: true,
        // sortable: true,
        resizable: true,
        // index: 1,
        show: true,
        export: true,
        render: (text, record) => {
          if (record.c_DATA_TYPE === '1' && record.c_DATA_CODE_P === '[root]') {
            return (<span className="text-body">{text}</span>)
          }
          if (record.realAuditState === 0) {
            return (<span className="text-warning">{text}</span>)
          }
          if (record.realAuditState === 2) { // text-primary
            return (<span className="text-primary">{text}</span>)
          }
          return (<span className="text-body">{text}</span>)

        },
        // widget: 'input',
        // sorter: (a, b) => a.indexName.length - b.indexName.length,
      }];
    // 岗位做列， 数据做行， 生成一个二维数组
    // postData.data = postData.data.slice(0, 5);
    // dataData.data.dataList = dataData.data.dataList.slice(0, 30);
    const selectedPostCode = queryData.param.ARRAY_C_POST_CODE.split(',');
    postData.data = postData.data.filter(item => selectedPostCode.indexOf(item.c_POST_CODE) !== -1);
    postData.data.forEach(postItem => {
      newColumns.push({
        title: postItem.c_POST_NAME,
        dataIndex: postItem.c_POST_CODE + postItem.c_POST_NAME,
        key: postItem.c_POST_CODE,
        width: 120,
        // fixed: 'left',
        // sorter: true,
        // search: true,
        resizable: true,
        hidden: false,
        export: true,
        headerCellProps: {className: 'ant-table-cell-ellipsis'},
        render: (text, record, index) => {
          return (
            <Checkbox disabled={!newInstance.disableEdit || record.realAuditState === 1 || (record.realAuditState === 2 && record.auditedPostList.indexOf(postItem.c_POST_CODE) >= 0)} checked={record && record.postList && record.postList.indexOf(postItem.c_POST_CODE) !== -1} onChange={() => {
              console.log('xxxxxxxx-selectedRows', newInstance.selectedRows, record);
              newInstance.onRightChanged(text, newInstance.dataSourceMap[record.c_DATA_CODE], index, postItem);
              // if (newInstance.selectedRowKeys.indexOf(record.c_DATA_CODE) !== -1) {
              //
              // }
            }}/>
          )
        },
        // widget: 'input',
        // onFilter: (value, record) => record.mainCode.includes(value),
      });
    });
    const expandedRowKeys = [];
    if (dataData.data && dataData.data.dataList) {
      dataData.data.dataList.forEach(item => {
        postData.data.forEach(postItem => {
          // eslint-disable-next-line no-param-reassign
          item[postItem.c_POST_CODE] = postItem;
        });

        expandedRowKeys.push(item.c_DATA_CODE);
      });
    }

    const {dataList} = dataData.data;
    let dataTree = convertListToTree(dataData.data.dataList);
    // 组合数据去除空分类
    if (queryData.dataType === '1') {
      dataTree = dataTree.filter(item => item.id || item.children);
    }
    dataData.data = {list: dataTree};


    const dataMap = {};
    const selectedRows = [];
    const addAuditState = (dataItem) => {
      // 由于使用了部分审核， auditState 变量无效， 增加一个 realAuditState变量
      if (dataItem.c_DATA_NAME === '0001') {
        console.log('xxxxxxxxxx');
      }
      let realAuditState = 0;
      let hitNum = 0;
      let missNum = 0;
      let checkEnable = false;
      let uncheckEnable = false;
      for (let i = 0; i < dataItem.postList.length; i++) {
        if (dataItem.auditedPostList.indexOf(dataItem.postList[i]) !== -1) {
          hitNum += 1;
        } else {
          missNum += 1;
        }
      }

      if (hitNum > 0 && missNum === 0) {
        // 全部审核
        realAuditState = 1;
        checkEnable = false;
        uncheckEnable = true;
      } else if(hitNum > 0 && missNum > 0) {
        // 部分审核
        realAuditState = 2; // 且选中的岗位中 不存在 未审核的岗位
        // 如果为部分审核， 需要判断是否可以 审核 和 反审核
        dataItem.postList.forEach(postItem => {
          if (selectedPostCode.indexOf(postItem) !== -1) {
            if (dataItem.auditedPostList.indexOf(postItem) === -1) {
              // 选中的岗位中 存在 未审核的岗位
              checkEnable = true;
            } else {
              // 选中的岗位中 存在审核的数据， 则可反审核
              uncheckEnable = true;
            }

          }
        });
      } else {
        // 未审核
        realAuditState = 0;
        checkEnable = true;
        uncheckEnable = false;
      }

      dataItem.realAuditState = realAuditState; // 0 未审核， 1 审核， 2 部分审核
      dataItem.checkEnable = checkEnable;
      dataItem.uncheckEnable = uncheckEnable;
      // 未审核， postList.length > 0  and auditedPostList.length = 0
      // 审核 postList 中的值 在 auditedPostList 都存在
      // 部分审核  postList 中的值 在 auditedPostList 部分存在
      // 已上前提是 postList 的值 要在 岗位 查询参数范围内
    }; // 增加审核状态
    dataList.forEach(item => {
      // 得到 dataSourceMap
      dataMap[item.c_DATA_CODE] = item;
      // 得到 selectedRows and selectedRowKeys
      if (item.postList && item.postList.length > 0 && !item.children) {
        selectedRows.push(item);
      }
      addAuditState(item);
    });

    console.log('xxxxxxxx-data', dataData?.data?.list);
    this.changeResult({dataSource: dataData?.data?.list, test: 'aaa', dataSourceMap: dataMap, subColumns: newColumns,
      selectedRows,
      selectedRowKeys: selectedRows.map(item => item.c_DATA_CODE),
      expandedRowKeys,
      editMode: false, // 权限编辑状态
      disableEdit: false,
      disableSave: true,
      disableCheck: true,
      disableUncheck: true});
  }

  // 用于区分用户点击查询 按钮的查询(主动查询会在条件不满足时进行提示)，而其他切换数据时的自动查询，则只有在条件满足时才会执行
  async autoQuery() {
    // 1. 视图模式和列表模式 都需要再选定用户 和  数据类型 下才可以进行查询
    const {currentUser, currentDataType} = this;
    if (currentUser && currentDataType) {
      await this.query();
    }
  }

  // 重写query 方法
  async query(options) {
    const {viewMode} = this;
    if (viewMode === 'View') {
      this.queryInViewMode();
    } else {
      this.queryInListMode(options);
    }
  }

  async add1() {
    this.changeState({showAddRight: true});
  }

  copy() {
    this.changeState({showCopyRight: true});
  }

  async edit1 () {
    this.changeState({editMode: true, disableEdit: true, disableSave: false})
  }

  async save1() {
    this.changeState({editMode: false, disableEdit: false, disableSave: true})
    const getParams = () => {
      const postCodeList = this.subColumns.slice(2).map(item => item.key);
      return {
        userPostDataList: Object.keys(this.dataSourceMap).map(item => {
          const row = this.dataSourceMap[item];
          return {
            c_DATA_CODE: row.c_DATA_CODE,
            c_DATA_NAME: row.c_DATA_NAME,
            c_DATA_CODE_P : row.c_DATA_CODE_P,
            c_DATA_TYPE: row.c_DATA_TYPE,
            c_USER_CODE: row.c_USER_CODE,
            c_POST_CODE: row.c_POST_CODE,
            c_POST_NAME: row.c_POST_NAME,
            n_SOURCE: row.n_SOURCE,
            auditState: row.auditState,
            operator: row.operator,
            auditDate: row.auditDate,
            modifier: row.modifier,
            modifyDate: row.modifyDate,
            id: row.id,
            postList: row.postList.filter(postCodeItem => postCodeList.indexOf(postCodeItem) !== -1),
            auditedPostList: row.auditedPostList,
            oldPostList: row.oldPostList,
          }
        }),
        postCodeList,
        portCodeList: Object.keys(this.dataSourceMap),
        delPostCodes: [],
        dataType: newInstance.currentDataType.c_DATA_TYPE,
        userCode: newInstance.currentUser.c_CORP_ORG_CODE,
      };
    }
    console.log('xxxxxxxx-编辑参数', getParams());
    const url = '/YSSUCOBRIDGE/ws/com/yss/fast/right/support/right/controller/IUserPostDataServiceController/updateUserPostDataCond'
    const res = await request.post(url, {
      params: commParams,
      data: getParams(),
    });
  }

  check1() {
    this.commonConfirm('是否要将选中的记录执行[审核]操作',() => {
      this.requestCheck(this.validCheckParams())
        .then(res => {
          this.autoQuery();
        })
        .catch(reason => {
          console.log(reason);
        });
    });
  }

  uncheck1() {
    this.commonConfirm('是否要将选中的记录执行[反审核]操作',() => {
      this.requestUncheck(this.validUncheckParams())
        .then(res => {
          this.autoQuery();
        })
        .catch(reason => {
          console.log(reason);
        });
    });
  }

  commonConfirm(content, onOk) {
    MsgBox.confirm({
      title: '提示',
      content,
      okText: '是',
      cancelText: '否',
      onOk});
  };

  requestUncheck(auditUsers) {
    const params = {userPostDatas: auditUsers, funCode: 'UserPostData'}
    const url = '/YSSUCOBRIDGE/ws/com/yss/fast/right/support/right/controller/IUserPostDataServiceController/unAuditByUserPostCodes'
    return request.post(url, {
      params: commParams,
      data: params,
    });
  }

  requestCheck(unAuditUsers) {
    const params = {userPostDatas: unAuditUsers, funCode: 'UserPostData'}
    const url = '/YSSUCOBRIDGE/ws/com/yss/fast/right/support/right/controller/IUserPostDataServiceController/auditByUserPostCodes'
    return request.post(url, {
      params: commParams,
      data: params,
    });
  }

  validCheckParams() {
    const {viewMode, selectedRows} = this;
    let checkUsers = [];
    if (viewMode === 'View') {
      checkUsers = selectedRows.filter(item => item.checkEnable);
      // 部分审核， 对于选中的岗位存在未审核的数据， 则可点
    } else {
      checkUsers = selectedRows.filter(item => item.auditState === 0);
    }
    return checkUsers;
  }

  validUncheckParams() {
    const {viewMode, selectedRows} = this;
    let checkUsers = [];
    if (viewMode === 'View') {
      checkUsers = selectedRows.filter(item => item.uncheckEnable);
    } else {
      checkUsers = selectedRows.filter(item => item.auditState === 1);
    }
    return checkUsers;
  }

}
