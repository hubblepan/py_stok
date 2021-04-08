import createSimpleModel from '@/handles/createSimpleModel';

export default () => {
  return createSimpleModel({
    state: {
      structureVisible: false,
      expandedRowKeys: [],
      menus: {},
    },
  });
};
