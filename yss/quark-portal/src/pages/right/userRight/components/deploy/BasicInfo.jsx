import _ from 'lodash';
import {
  Upload,
  message,
  Button,
  Divider,
  Table,
  Tooltip,
  Spin,
  Select,
  Menu,
  Dropdown,
  Input,
  Card,
} from 'antd';
import QuarkTable from '@/components/QuarkTable';
import { InfoCircleTwoTone, DownOutlined, SearchOutlined } from '@ant-design/icons';
import { useState, useEffect, useRef } from 'react';
import DropdownSelect from '@/components/DropDownSelect/index.js';
import Tipbar from './Tipbar';
import request from '@/utils/request';

// 基础信息
const BasicInfo = (props) => {
  const { store, setStore } = props;

  const table = useRef(null);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      store.BasicInfo.selectRows = selectedRows;
      setStore(store);
    },
  };

  // 中间变量
  const [tableData, setTableData] = useState(_.cloneDeep(store.BasicInfo.tableData));

  // 通过监听变化来设置store。
  useEffect(() => {
    store.BasicInfo.tableData = tableData;
    setStore(store);
  }, [tableData]);

  let col = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      width: 40,
      render: (text, recode, index) => <div className="text-center">{index + 1}</div>,
    },
    {
      title: '指标代码',
      dataIndex: 'indexCode',
      key: 'indexCode',
      ellipsis: true,
      render: (content) => (
        <div>
          <Tooltip placement="topLeft" title={content}>
            {content}
          </Tooltip>
        </div>
      ),
    },
    {
      title: '指标名称',
      dataIndex: 'indexName',
      key: 'indexName',
      ellipsis: true,
      render: (content) => (
        <Tooltip placement="topLeft" title={content}>
          {content}
        </Tooltip>
      ),
    },
    {
      title: '指标别名',
      dataIndex: 'indexAlias',
      key: 'indexAlias',
      ellipsis: true,
      render: (content) => (
        <Tooltip placement="topLeft" title={content}>
          {content}
        </Tooltip>
      ),
    },
    {
      title: '触发位置',
      dataIndex: 'triggerPosition',
      key: 'triggerPosition',
      ellipsis: true,
      width: 150,
      render: (content, record, index) => {
        return (
          <DropdownSelect
            value={content}
            data={store.BasicInfo.dropdownData.triggerPositions || []}
            columns={[{ dataIndex: 'name', key: 'name' }]}
            onChange={(value) => {
              table.current.props.dataSource[index].triggerPosition = value.join(',');
              setTableData(_.cloneDeep(table.current.props.dataSource));
            }}
          />
        );
      },
    },
    {
      title: '指标类型',
      dataIndex: 'indexType',
      key: 'indexType',
      ellipsis: true,
      width: 100,
      render: (content) => (
        <Tooltip placement="topLeft" title={content}>
          {content}
        </Tooltip>
      ),
    },
    {
      title: '安装结果',
      dataIndex: 'installResult',
      key: 'installResult',
      width: 150,
      ellipsis: true,
      render: (content) => (
        <Tooltip placement="topLeft" title={content}>
          {content}
        </Tooltip>
      ),
    },
  ];

  const [columns, setColumns] = useState(col);

  useEffect(() => {
    col[4].render = (content, record, index) => {
      return (
        <DropdownSelect
          value={content}
          data={
            store.BasicInfo.dropdownData.triggerPositions
              ? store.BasicInfo.dropdownData.triggerPositions
              : []
          }
          columns={[{ dataIndex: 'name', key: 'name' }]}
          onChange={(value) => {
            table.current.props.dataSource[index].triggerPosition = value.join(',');
            setTableData(_.cloneDeep(table.current.props.dataSource));
          }}
        />
      );
    };
    setColumns(col);
  }, [store.BasicInfo.dropdownData.triggerPositions]);

  return (
    <>
      <Tipbar
        type="info"
        content={
          <>
            {store.BasicInfo.msg}，可点击
            <a target="_blank" href={store.BasicInfo.downloadUrl}>
              下载详细数据
            </a>
          </>
        }
      />

      <div>
        <QuarkTable
          loading={store.BasicInfo.tableData.length === 0}
          resizable={false}
          ref={table}
          columns={columns}
          rowSelection={{
            ...rowSelection,
          }}
          dataSource={store.BasicInfo.tableData}
        />
      </div>
    </>
  );
};

export default BasicInfo;
