import createSimpleModel from '@/handles/createSimpleModel';

export default () => {
  return createSimpleModel({
    state: {
      pageInfo: null,
      total: 0,
      params: { mode: 'error' },
    },
  });
};
