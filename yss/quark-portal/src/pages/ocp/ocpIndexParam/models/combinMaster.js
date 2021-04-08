import createSimpleModel from '@/handles/createSimpleModel';

export default () => {
  return createSimpleModel({
    state: { loading: false, menus: {} },
  });
};
