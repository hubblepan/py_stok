import createSimpleModel from '@/handles/createSimpleModel';

export default () => {
  return createSimpleModel({
    state: {
      paramType: '', // 新增类型 database,server
      operate: '', // 新增，修改
      pageInfo: null,
    },
  });
};
