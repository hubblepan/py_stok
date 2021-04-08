import createSimpleModel from '@/handles/createSimpleModel';

export default () => {
  return createSimpleModel({
    state: {
      rowKey:'indexCode',
      menus: [],
      expandedRowKeys: [],
    },
  });
};
