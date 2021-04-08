const createModel = () => {
  return {
    state: {
      dataSource: [],
      loading: false,
      operate: 'query',
      currentRecord: null,
      selectedRows: [],
      selectedRowKeys: [],
      expandedRowKeys: [], // 展开
      searchWord: '', // 主表搜索词,
      params: null,
      orderBy: null,
      pageInfo: {
        pageNo: 1,
        pageTotal: 0,
        pageSize: 20,
      },
      formVisible: false,
      formLoading: false,
      formData: null,
      searchForm: null,
    },
    reducers: {
      changeState(state, action) {
        const newState = action.payload;
        return { ...state, ...newState };
      },
      changeSelectedRows(state, action) {
        const { selectedRowKeys, selectedRows } = action.payload;
        return { ...state, selectedRowKeys, selectedRows };
      },
      changeResult(state, action) {
        const { dataSource, pageInfo, ...rest } = action.payload;
        return {
          ...state,
          // params,
          dataSource,
          pageInfo,
          loading: false,
          selectedRowKeys: [],
          selectedRows: [],
          ...rest,
        };
      },
      setExpandedRowKeys(state, action) {
        const expandedRowKeys = action.payload;
        return { ...state, expandedRowKeys };
      },
      setFormData(state, action) {
        const formData = action.payload;
        return { ...state, formData };
      },
      setLoading(state, action) {
        const loading = action.payload;
        return { ...state, loading };
      },
      setParams(state, action) {
        const params = action.payload;
        return { ...state, params };
      },
      setSearchForm(state, action) {
        const searchForm = action.payload;
        return { ...state, searchForm };
      },
      setFormVisible(state, action) {
        const formVisible = action.payload;
        console.log(formVisible);
        return { ...state, formVisible };
      },
    },
    effects: {},
    subscriptions: {},
  };
};

const mapDispatchToProps = (...namespaces: any) => (dispatch: any) => {
  const result = {};

  namespaces.forEach((namespace: string) => {
    const doDispatch = (method: string, data: any) => {
      return dispatch({
        type: `${namespace}/${method}`,
        payload: data,
      });
    };

    const changeState = (newState: any) => {
      return doDispatch('changeState', newState);
    };
    const changeResult = (newState: any) => {
      return doDispatch('changeResult', newState);
    };

    const changeSelectedRows = (selectedRowKeys: any, selectedRows: any) => {
      return doDispatch('changeSelectedRows', { selectedRowKeys, selectedRows });
    };
    const setFormVisible = (formVisible: any) => {
      return doDispatch('setFormVisible', formVisible);
    };
    const setExpandedRowKeys = (params: any) => {
      return doDispatch('setExpandedRowKeys', params);
    };
    const setParams = (params: any) => {
      return doDispatch('setParams', params);
    };
    const setSearchForm = (searchForm: any) => {
      return doDispatch('setSearchForm', searchForm);
    };
    const setFormData = (formData: any) => {
      return doDispatch('setFormData', formData);
    };
    const setLoading = (data: any) => {
      return doDispatch('setLoading', data);
    };
    const setDataSource = (data: any) => {
      return doDispatch('setDataSource', data);
    };

    result[namespace] = {
      dispatch,
      doDispatch,
      changeResult,
      changeState,
      changeSelectedRows,
      setExpandedRowKeys,
      setDataSource,
      setFormData,
      setLoading,
      setParams,
      setSearchForm,
      setFormVisible,
    };
  });

  return result;
};

export { createModel, mapDispatchToProps };
