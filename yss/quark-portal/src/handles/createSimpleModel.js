import { useState, useMemo } from 'react';

const filterMethod = ['selectedRows', 'selectedRowKeys', 'rowKey'];
export default (props = {}) => {
  const [state, setState] = useState({
    rowKey: 'id',
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
    ...props.state,
  });

  const reducers = useMemo(() => {
    const reducer = {};
    Object.keys(state).forEach((key) => {
      if (filterMethod.indexOf(key) < 0) {
        reducer[`set${key.charAt(0).toUpperCase() + key.slice(1)}`] = (newValue) => {
          setState((preState) => {
            const newState = preState;
            newState[key] = newValue;
            return { ...newState };
          });
        };
      }
    });
    return {
      changeState: (newState) => {
        setState((preState) => {
          return { ...preState, ...newState };
        });
      },
      changeSelectedRows: (selectedRowKeys, selectedRows) => {
        setState((preState) => {
          return { ...preState, selectedRowKeys, selectedRows };
        });
      },
      changeResult: (result) => {
        const { dataSource, pageInfo, ...rest } = result;
        setState((preState) => {
          return {
            ...preState,
            // params,
            dataSource,
            pageInfo,
            loading: false,
            selectedRowKeys: [],
            selectedRows: [],
            ...rest,
          };
        });
      },
      ...reducer,
      ...props.reducers,
    };
  }, []);

  return { state, ...state, ...reducers };
};
