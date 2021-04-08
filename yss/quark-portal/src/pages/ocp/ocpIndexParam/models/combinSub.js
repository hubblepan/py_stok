import createSimpleModel from '@/handles/createSimpleModel';

export default () => {
  return createSimpleModel({
    state: {
      viewDetails: false, // 指标详情
      changeVisible: false, // 变更记录模态框
      paramsPreview: false, // 参数预览
      formData: {},
      editVisible: false,
      ChangeData: [],
      expandedRowKeys: [],
      detailAndChange: false,
      type: 'detail',
      params: {},
      pageInfo: {
        pageNo: 1,
        pageTotal: 0,
        pageSize: 10,
      },
    },
  });
};
