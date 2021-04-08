import createSimpleModel from '@/handles/createSimpleModel';

export default () => {
  return createSimpleModel({
    state: {
      expandedRowKeys: [],
      detailVisible: false,
      operate: '', // 新增，修改
    },
  });
};
