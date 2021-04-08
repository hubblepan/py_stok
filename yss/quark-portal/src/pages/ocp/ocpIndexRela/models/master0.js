import createSimpleModel from '@/handles/createSimpleModel';

export default () => {
  return createSimpleModel({
    state: {
      rowKey:'c_PORT_CODE',
      menus: [],
      expandedRowKeys: [],
      structureVisible: false,
    },
  });
};
