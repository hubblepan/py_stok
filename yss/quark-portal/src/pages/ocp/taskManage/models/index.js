import { createModel } from '@/handles/BaseModel';
import modelExtend from 'dva-model-extend';

const namespace = 'taskIndex';

const model = modelExtend(createModel(), {
  namespace,
  state: {
    detailVisible: false,
    id:''
  },
  reducers: {
    setDetailVisible (state, action) {
      const detailVisible = action.payload;
      return { ...state, detailVisible };
    },
  }
});

export default model;
