// import baseModel from '@/components/TableView/baseModel';
// export default () => {
//
//   return baseModel({
//     // 额外状态
//     // aaa: 1
//   });
// };
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
  const [pageInfo, setPageInfo] = useState({ pageNo: 1, pageSize: 20, pageTotal: 0 });
  // 确认modal
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [confirmIds, setConfirmIds] = useState([]);
  // 监控详情
  const [monitorVisible, setMonitorVisible] = useState(false);
  // 指标详情
  const [targetVisible, setTargetVisible] = useState(false);
  const [targetFormData, setTargetFormData] = useState({});
  // 监控详情
  const [selectedId,setSelectedId]=useState([])

  return {
    selectedId,
    setSelectedId,
    setTargetFormData,
    targetFormData,
    setTargetVisible,
    targetVisible,
    setMonitorVisible,
    monitorVisible,
    setConfirmIds,
    confirmIds,
    confirmVisible,
    setConfirmVisible,
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
  };
};


