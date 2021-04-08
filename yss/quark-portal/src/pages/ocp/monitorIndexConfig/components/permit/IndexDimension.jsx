import React, { useEffect, useState } from 'react';
import { Input, Table, Button, Checkbox } from 'antd';
import {
  SearchOutlined,
  EditOutlined,
  CopyOutlined,
  CaretDownOutlined,
  CaretRightOutlined,
} from '@ant-design/icons';
import QuarkTable from '@/components/QuarkTable';
import { indexMasterQuery } from '@/services/permitConfig';
import SplitPane from 'react-split-pane';
import styles from '../style.less';

const IndexDimension = () => {
  // 主表列表选择框
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
      name: record.name,
    }),
  };

  // 主表数据
  const [masterData, setMasterData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const res = await indexMasterQuery();
      setMasterData(res.data);
    }
    fetchData();
  }, []);

  //   console.log(masterData);

  const masterColumns = [
    {
      title: '指标名称',
      dataIndex: 'c_DATA_NAME',
    },
    {
      title: '指标编码',
      dataIndex: 'c_DATA_CODE',
    },
  ];

  const subColumns = [];

  const rowSelectionSub = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },

    // 重新渲染每行数据的checkBox
    renderCell: (checked, record) => {
      return <Checkbox />;
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
  };

  function TreeData() {
    return (
      <Table
        bordered
        rowKey="id"
        destroyOnClose
        rowSelection={{ ...rowSelectionSub, checkStrictly: false, width: '50', fixed: 'left' }}
        className={styles.tableStyle}
        columns={subColumns}
        // dataSource={subData}
        pagination={false}
        expandable={{
          defaultExpandAllRows: true,
          expandIcon: ({ expanded, onExpand, record }) => {
            if (record.isLeaf) {
              return null;
            }
            return expanded ? (
              <CaretDownOutlined
                style={{ marginRight: '8px' }}
                onClick={(e) => onExpand(record, e)}
              />
            ) : (
              <CaretRightOutlined
                style={{ marginRight: '8px' }}
                onClick={(e) => onExpand(record, e)}
              />
            );
          },
        }}
      />
    );
  }

  return (
    <>
      <SplitPane
        split="vertical"
        defaultSize="30%"
        minSize={200}
        maxSize={300}
        paneStyle={{ overflow: 'auto' }}
        style={{ position: 'unset' }}
      >
        <aside className="a-card">
          <div className="a-card-header px-2">
            <Input placeholder="请输入关键词搜索" prefix={<SearchOutlined />} />
          </div>
          <div className="a-card-body px-2">
            <QuarkTable
              bordered
              rowKey="id"
              destroyOnClose
              rowSelection={rowSelection}
              columns={masterColumns}
              dataSource={masterData}
              className={styles.tableStyle}
              pagination={false}
              scroll={{ x: 300, y: 400 }}
            />
          </div>
        </aside>
        <section className="a-card">
          <div className="a-card-header" style={{ justifyContent: 'flex-end' }}>
            <Button type="text" icon={<SearchOutlined />}>
              查询
            </Button>
            <Button type="text" icon={<EditOutlined />}>
              修改
            </Button>
            <Button type="text" icon={<CopyOutlined />}>
              复制
            </Button>
          </div>
          <div className="a-card-body px-2">
            <TreeData />
          </div>
        </section>
      </SplitPane>
    </>
  );
};

export default IndexDimension;
