import { queryMenu } from '@/services/menuTree';

export default {
  namespace: 'menuTree',

  state: {
    menuData: [],
  },

  effects: {
    *getMenu(_, { call, put }) {
      const response = yield call(queryMenu);
      yield put({
        type: 'menuResult',
        data: response.data,
      });
    },
  },

  reducers: {
    menuResult(state, { data }) {
      console.log('_+_+_+_+',data);
      return {
        ...state,
        data,
      };
    },
  },
};
