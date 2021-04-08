import BaseService from '@/handles/BaseService';
const service = new BaseService({ base: '/api/server' });



async function query (params) {
  console.log('~~~~~~~~~~~~查询~~~~~~~~~~~~~~~', params);
  let { selectedRowKeys } = params;

  if (selectedRowKeys) {
    selectedRowKeys = selectedRowKeys.slice(0);
    delete params.selectedRowKeys;
  }
  const result = await service.query(params);

  if (selectedRowKeys?.length === 0) {
    return {
      dataSource: result.data.list,
      pageTotal: result.data.total,
    }
  } else {
    return {
      dataSource: result.data.list,
      pageTotal: result.data.total,
      selectedRowKeys: []
    }
  }
}


const demo3 = {
  namespace: 'demo3',
  state: {
    name: 'demo3',
    dataSource: [],
    loading: false,
    selectedRowKeys: [],
    pageInfo: {
      pageNo: 1,
      pageTotal: 0,
      pageSize: 20,
    },
    searchForm: null,
  },
  reducers: {
    reducerQuery (state, action) {
      const { dataSource, pageTotal, selectedRowKeys } = action.payload;
      if (selectedRowKeys) {
        return { ...state, dataSource, pageInfo: { ...state.pageInfo, pageTotal }, selectedRowKeys };
      } else {
        return { ...state, dataSource, pageInfo: { ...state.pageInfo, pageTotal } };
      }

    },
    reducerChangePage (state, action) {
      const { pageNo, pageSize } = action.payload;
      return { ...state, pageInfo: { ...state.pageInfo, pageNo, pageSize } };
    },
    reducerChangeSelect (state, action) {
      const { selectedRowKeys } = action.payload;
      return { ...state, selectedRowKeys };
    },
    reducerForm (state, action) {
      const { searchForm } = action.payload;
      return { ...state, searchForm };
    },
    reducerLoading (state, action) {
      const { loading } = action.payload;
      return { ...state, loading }
    }
  },
  // 变更副作用
  effects: {
    // 自动查询
    *effectQuery (_, { call, put, select }) {
      yield put({
        type: 'reducerLoading',
        payload: { loading: true }
      })
      const params = yield select(state => {
        const _state = state.demo3;
        const { searchForm, pageInfo, selectedRowKeys } = _state;
        // console.log(!!searchForm)
        const formParams = !!searchForm ? searchForm.getFieldValue() : {}

        // console.log(1111, formParams)

        return {
          pageSize: pageInfo.pageSize,
          pageNo: pageInfo.pageNo,
          ...formParams,
          selectedRowKeys
        }
      });
      yield put({
        type: 'reducerLoading',
        payload: { loading: false }
      })
      const res = yield call(query, params);
      yield put({
        type: 'reducerQuery',
        payload: res
      })

    },

    // 变更页码
    *effectChangePage (_, { call, put, select }) {
      const res = _.payload;
      const params = yield select(state => {
        const _state = state.demo3;
        const { searchForm, pageInfo, selectedRowKeys } = _state;
        // console.log(!!searchForm)
        const formParams = !!searchForm ? searchForm.getFieldValue() : {}

        return {
          ...formParams,
          selectedRowKeys
        }
      });

      const _res = yield call(query, { ...res, ...params });


      yield put({
        type: 'reducerQuery',
        payload: _res
      })

      yield put({
        type: 'reducerChangePage',
        payload: res
      })
    },

    // 受控表格选中变更
    *effectChangeSelect (_, { call, put, select }) {
      const res = _.payload;
      yield put({
        type: 'reducerChangeSelect',
        payload: res
      })
    },

    // 设置表格
    *effectForm (_, { call, put, select }) {
      const res = _.payload;
      yield put({
        type: 'reducerForm',
        payload: { searchForm: res }
      })
    }

  },
  subscriptions: {
    // 这里的方法名可以随便命名，当监听有变化的时候就会依次执行这的变化,
    // changeTime ({ dispatch, history }) {
    //   window.onclick = () => {
    //     console.log("页面被点击了");
    //   }
    // }
  }
}
export default demo3;


