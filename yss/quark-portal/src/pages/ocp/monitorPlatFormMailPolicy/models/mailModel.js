import createSimpleModel from '@/handles/createSimpleModel';

export default () => {
  return createSimpleModel({
    state: {
      detailVisible: false,
      formData: null,
      operate: '', // 新增，修改
      formVisible: false,
    },
  });
};
