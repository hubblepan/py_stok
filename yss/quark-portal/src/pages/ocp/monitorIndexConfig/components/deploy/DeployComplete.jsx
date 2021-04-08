import { Upload, message, Button, Divider, Table, Tooltip, Spin } from 'antd';
import QuarkTable from '@/components/QuarkTable';
import { InfoCircleTwoTone } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import Tipbar from './Tipbar';

const columns = [
  {
    title: '序号',
    dataIndex: 'index',
    key: 'index',
    width: 40,
    render: (text, recode, index) => <div className="text-center">{index + 1}</div>,
  },
  {
    title: '指标标识',
    dataIndex: 'targetId',
    key: 'targetId',
    ellipsis: true,
    render: (content) => (
      <Tooltip placement="topLeft" title={content}>
        {content}
      </Tooltip>
    ),
  },
  {
    title: '指标代码',
    dataIndex: 'targetCode',
    key: 'targetCode',
    ellipsis: true,
    render: (content) => (
      <Tooltip placement="topLeft" title={content}>
        {content}
      </Tooltip>
    ),
  },
  {
    title: '指标名称',
    dataIndex: 'targetName',
    key: 'targetName',
    ellipsis: true,
    render: (content) => (
      <Tooltip placement="topLeft" title={content}>
        {content}
      </Tooltip>
    ),
  },
  {
    title: '指标别名',
    dataIndex: 'targetAlias',
    key: 'targetAlias',
    ellipsis: true,
    render: (content) => (
      <Tooltip placement="topLeft" title={content}>
        {content}
      </Tooltip>
    ),
  },
  {
    title: '关联模式',
    dataIndex: 'combinationMode',
    key: 'combinationMode',
    ellipsis: true,
    render: (content) => (
      <Tooltip placement="topLeft" title={content}>
        {content}
      </Tooltip>
    ),
  },
  {
    title: '部署结果',
    dataIndex: 'deployResult',
    key: 'deployResult',
    ellipsis: true,
    width: 100,
    render: (content) => (
      <Tooltip placement="topLeft" title={content}>
        {content}
      </Tooltip>
    ),
  },
];

// 上传指标
const UploadTarget = (props) => {
  const { store, setStore, selects } = props;

  return (
    <>
      <Tipbar type="info" content={<>{store.DeployComplete.msg}</>} />

      <div>
        <QuarkTable
          loading={store.DeployComplete.tableData.length === 0}
          rowClassName={(record) => {
            return record.isSuccess ? '' : 'text-danger';
          }}
          rowSelection={false}
          columns={columns}
          dataSource={store.DeployComplete.tableData}
        />
      </div>
    </>
  );
};

export default UploadTarget;
