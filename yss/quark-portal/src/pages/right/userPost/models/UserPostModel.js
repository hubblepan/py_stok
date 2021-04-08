import createModel from '@/handles/createSimpleModel';

export default () => {
  return createModel({
    state:{
      formVisible: false,
      formData: [],
      viewMode: 'View',
      userData: [],
      postData: [],
      userPostMap: {},
      dataSourceMap: {},
      queryParams: {},
      columns: [
        {
          title: '用户编码',
          width: 100,
          ellipsis: true,
          dataIndex: 'c_CORP_ORG_CODE',
        },
        {
          title: '用户名称',
          width: 100,
          ellipsis: true,
          dataIndex: 'c_CORP_ORG_NAME',
        },
      ],
      editMode: false, // 权限编辑模式
      disableEdit: false,
      disableSave: true,
      showAddUserPost: false,
    }
  });
};
