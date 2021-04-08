import _ from 'lodash';
import { Upload, message, Button, Divider, Table, Tooltip, Spin } from 'antd';
import QuarkTable from '@/components/QuarkTable';
import { InfoCircleTwoTone, LinkOutlined } from '@ant-design/icons';
import { useState, useEffect, useRef } from 'react';
import DropdownSelect from '@/components/DropDownSelect/index.js';
import Tipbar from './Tipbar';

// 上传指标
const UploadTarget = (props) => {
  const { store, setStore } = props;

  // 中间变量
  const [tableData, setTableData] = useState(_.cloneDeep(store.RelatedCombination.tableData));

  // 通过监听变化来设置store。
  useEffect(() => {
    store.RelatedCombination.tableData = tableData;
    setStore(store);
  }, [tableData]);

  const table = useRef(null);

  const col = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      width: 40,
      render: (text, recode, index) => <div className="text-center">{index + 1}</div>,
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
      title: '关联类型',
      dataIndex: 'relatedType',
      key: 'relatedType',
      ellipsis: true,
      render: (content) => (
        <Tooltip placement="topLeft" title={content}>
          {content}
        </Tooltip>
      ),
    },
    {
      title: '关联模式',
      dataIndex: 'relatedMode',
      key: 'relatedMode',
      ellipsis: true,
      render: (content, record, index) => (
        <DropdownSelect
          value={content}
          columns={[
            { dataIndex: 'name', key: 'name' },
            { dataIndex: 'col', key: 'col' },
          ]}
          data={store.RelatedCombination.dropdownData.combinationMode || []}
          onChange={(value) => {
            table.current.props.dataSource[index].relatedMode = value.join(',');
            setTableData(_.cloneDeep(table.current.props.dataSource));
            // record.triggerPosition = value.join(',');
          }}
        />
      ),
    },
  ];

  const [columns, setColunms] = useState(col);

  useEffect(() => {
    col[3].render = (content, record, index) => (
      <DropdownSelect
        value={content}
        columns={[
          { dataIndex: 'name', key: 'name' },
          { dataIndex: 'col', key: 'col' },
        ]}
        data={store.RelatedCombination.dropdownData.combinationMode || []}
        onChange={(value) => {
          table.current.props.dataSource[index].relatedMode = value.join(',');
          setTableData(_.cloneDeep(table.current.props.dataSource));
          // record.triggerPosition = value.join(',');
        }}
      />
    );
    setColunms(col);
  }, [store.RelatedCombination.dropdownData.combinationMode]);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      store.RelatedCombination.selectedRows = selectedRows;
      setStore(store);
    },
  };

  return (
    <>
      <div style={{ height: '50px', display: 'flex' }}>
        <Tipbar type="info" content={<>{store.RelatedCombination.msg}</>} />

        <div style={{ flex: 1, textAlign: 'right', paddingTop: '10px' }}>
          <Button type="link" icon={<LinkOutlined />}>
            批量关联
          </Button>
        </div>
      </div>
      <div>
        <QuarkTable
          loading={store.RelatedCombination.tableData.length === 0}
          resizable={false}
          ref={table}
          columns={columns}
          rowSelection={{
            ...rowSelection,
          }}
          dataSource={store.RelatedCombination.tableData}
        />
      </div>
    </>
  );
};

export default UploadTarget;
