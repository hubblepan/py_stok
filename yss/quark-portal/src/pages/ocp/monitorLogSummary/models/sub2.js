import createSimpleModel from '@/handles/createSimpleModel';

export default () => {
  return createSimpleModel({
    state: { executeVisible: false, importSetVisible: false },
  });
};
