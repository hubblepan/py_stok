import createSimpleModel from '@/handles/createSimpleModel';

export default () => {
  return createSimpleModel({
    state: {
      rowKey: 'c_CORP_ORG_CODE',
      modalTitle: '',
      classifyNode: {},
      addVisible: false,
      // expandedRowKeys: [],
      menus:{},
      selectedUsers: [],
      showAddOrg: false,
      dataSourceMap: {},
    },
  });
};


