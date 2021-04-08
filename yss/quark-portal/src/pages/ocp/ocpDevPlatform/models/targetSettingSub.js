import createSimpleModel from '@/handles/createSimpleModel';

export default () => {
  return createSimpleModel({
    state: {
      addModalVisible: false,
      deployModalVisible: false,
      mode: '',  // add , edit, copy
    }
  });
};
