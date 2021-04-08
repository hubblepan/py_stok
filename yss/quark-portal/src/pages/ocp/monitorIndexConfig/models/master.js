import createSimpleModel from '@/handles/createSimpleModel';

export default () => {
  return createSimpleModel({
    state: {
      rowKey: 'indexCode',
      modalTitle: '',
      classifyNode: {},
      addVisible: false,
      // 分级菜单
      menus: {}
    }
  });
};


