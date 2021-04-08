import { useState } from 'react';

export default (props) => {
  const [dataSource, setDataSource] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [params, setParams] = useState({});
  const [fromData, setFormData] = useState({});
  const [searchForm, setSearchForm] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageInfo, setPageInfo] = useState({});

  const extra = {}

  if (props) {
    Object.keys(props).forEach(prop => {
      const initialState = props[prop];
      const _useState = useState(initialState);
      extra[prop] = _useState[0];
      const capitalizeStateName = prop.replace(prop[0], prop[0].toUpperCase());
      extra['set' + capitalizeStateName] = _useState[1];
    })
  }

  return {
    formVisible,
    setFormVisible,
    selectedRows,
    setSelectedRows,
    selectedRowKeys,
    setSelectedRowKeys,
    params,
    setParams,
    searchForm,
    setSearchForm,
    fromData,
    setFormData,
    loading,
    setLoading,
    dataSource,
    setDataSource,
    pageInfo,
    setPageInfo,
    ...extra
  }
}
