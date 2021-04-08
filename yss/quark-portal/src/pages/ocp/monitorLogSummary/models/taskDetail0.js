import createSimpleModel from '@/handles/createSimpleModel';

export default () => {
  return createSimpleModel({
    state: {
      total: 0,
      pageInfo:null,
      // params: { mode: 'all' },
    },
  });
};
