import { useState } from 'react';

export default () => {
  const [dataSource, setDataSource] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [params, setParams] = useState({});
  const [fromData, setFormData] = useState({});
  const [searchForm, setSearchForm] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const [loading, setLoading] = useState(false);
  const [pageInfo, setPageInfo] = useState({});

  // 自定义
  const [editVisible, setEditVisible] = useState(false);
  const [structureVisible, setStructureVisible] = useState(false);
  // 自定义分类管理
  const [diyVisible, setDiyVisible] = useState(false);

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

    // 自定义
    diyVisible, setDiyVisible,
    editVisible, setEditVisible,
    structureVisible, setStructureVisible,
  };
};
