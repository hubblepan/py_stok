import createSimpleModel from '@/handles/createSimpleModel';

export default () => {
  return createSimpleModel({
    state: {
      expandedRowKeys: [],
      addVisible: false,
      params: {
        indexCode: [],
      },
      pageInfo: {
        pageNo: 1,
        pageTotal: 0,
        pageSize: 10,
      },
    },
  });
};
