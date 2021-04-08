import createSimpleModel from '@/handles/createSimpleModel';

export default () => {
  return createSimpleModel({
    state: {
      modalTitle: '',
      classifyNode: {},
      showAddOrg: false, // 控制 新增组织架构表单的显示
      addVisible: false,
      menus:{},
    },
  });
};


