import createSimpleModel from '@/handles/createSimpleModel';

export default () => {
  return createSimpleModel({
    state: {
      //   pageInfo: null,
      detailVisible: false,
      formData: null,
      menus:{}
    },
  });
};
