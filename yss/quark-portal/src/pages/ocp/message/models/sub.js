import createSimpleModel from '@/handles/createSimpleModel';

export default () => {
  return createSimpleModel({
    state: {
      pageInfo: {},
      detailVisible: false,
      id: '',
      activeKey: 1,
    },
  });
};
