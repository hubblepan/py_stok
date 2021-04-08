import createSimpleModel from '@/handles/createSimpleModel';

export default () => {
  return createSimpleModel({
    state: {
      expandedRowKeys: [],
      params: {
        portCode: [],
        cacheAllPortList: [],
        dictIndexMap: {},
      },
      unbindVisible: false,
      pageInfo: {
        pageNo: 1,
        pageTotal: 0,
        pageSize: 10,
      },
    },
  });
};
