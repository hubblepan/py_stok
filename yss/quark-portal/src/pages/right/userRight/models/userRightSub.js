import createSimpleModel from '@/handles/createSimpleModel';

export default () => {
  return createSimpleModel({
    state: {
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
      subColumns: [],
      showAddUser: false,
      modalAddUserMode: 'add', // 编辑 edit 复制 copy
    }
  });
};
