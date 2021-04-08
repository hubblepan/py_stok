import createSimpleModel from '@/handles/createSimpleModel';

export default () => {
  return createSimpleModel({
    state: {
      editIndexVisible: false,
      params: {},
      paramsPreviewIndex: false, // 参数预览
      detailAndChangeIndex: false,
      pageInfo: {
        pageNo: 1,
        pageTotal: 0,
        pageSize: 10,
      },
    },
  });
};
