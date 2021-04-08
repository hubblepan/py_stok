import modelExtend from 'dva-model-extend';
import { createModel } from '@/handles/BaseModel';

const model = modelExtend(createModel(), {
  namespace: 'tableDemo',
});

export default model;
