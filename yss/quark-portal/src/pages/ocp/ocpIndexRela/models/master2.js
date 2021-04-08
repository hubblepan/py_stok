import createSimpleModel from '@/handles/createSimpleModel';

export default () => {
  return createSimpleModel({
    state: {
      rowKey:'relaCode',
      menus: [],
      expandedRowKeys: [],
      diyVisible: false,
    },
  });
};
