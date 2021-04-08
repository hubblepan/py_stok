import createSimpleModel from '@/handles/createSimpleModel';

export default () => {
  return createSimpleModel({
    state: {
      mode: null,
      editVisible: false,
      loading: false,
      formData: {},
      selectValues1: '',
      selectValues2: '',
      pageInfo: null,
    },
  });
};
