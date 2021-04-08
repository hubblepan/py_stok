import createSimpleModel from '@/handles/createSimpleModel';

export default () => {
  return createSimpleModel({
    state: {
      detailVisible: false,
      formData: null,
      addVisible: false,
      operate: '',
    },
  });
};
