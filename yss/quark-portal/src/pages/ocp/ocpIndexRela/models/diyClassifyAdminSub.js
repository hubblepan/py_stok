import createSimpleModel from '@/handles/createSimpleModel';

export default () => {
  return createSimpleModel({
    state: {
      params: {
        dataClass: 'CustomGroupRelaData',
      },
      saveModalVisible: false,
    },
  });
};
