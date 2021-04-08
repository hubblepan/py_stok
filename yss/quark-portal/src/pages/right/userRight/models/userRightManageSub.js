import createSimpleModel from '@/handles/createSimpleModel';

export default () => {
  return createSimpleModel({
    state: {
      viewMode:'View', // 子表的视图模式(View) 和 列表模式 (List)
      dataSourceMap: {},
      detailVisible: false,
      // setDetailVisitble,
      modalOperate: '',
      // setModalOperate,
      detailData: {},
      // setDetailData,
      changeVisible: false,
      // setChangeVisible,
      permission: false,
      // setPermission,
      permitVisible: false,
      // setPermitVisible,
      testVisible: false,
      // setTestVisible,
      deployVisible: false,
      // setDeployVisible,
      currentDetail: {},
      // setCurrentDetail,
      primaryKey: [],
      test: 'abcdefg',
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
        }
      ],
      currentDataIndex: '',
      dataTypeList: [],  // 数据类型列表
      currentDataType: {}, // 当前的数据类型
      postList: [], // 岗位数据列表
      userList: [], // 被查询的用户列表
      currentUser: null, // 当前用户
      authOrgTree: [], // 权限机构树
      dataTree: [], // 数据 树
      checkedStrategy: 'all', // 'all' 返回父子节点
      editMode: false, // 权限编辑状态
      disableEdit: false,
      disableSave: true,
      disableCheck: true,
      disableUncheck: true,
      showAddRight: false,
      showCopyRight: false,
    },
    // reducers: {
    //   changeSelectedPosts: (selectedRowKeys, selectedRows) => {
    //     setState((state) => {
    //       return { ...state, selectedRowKeys, selectedRows };
    //     });
    //   },
    // }
  });
};
