import React, { useEffect, useState } from 'react';
import { Input, Table, Button, Select, Checkbox, Popover, Form, Row, Col } from 'antd';
import {
  SearchOutlined,
  EditOutlined,
  CopyOutlined,
  CaretDownOutlined,
  CaretRightOutlined,
} from '@ant-design/icons';
import SplitPane from 'react-split-pane';
import styles from '../style.less';

const UserDimension = () => {
  const masterColumns = [
    {
      title: '用户名称',
      dataIndex: 'userName',
    },
    {
      title: '用户编码',
      dataIndex: 'userCode',
    },
  ];

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
            <Table
              bordered
              rowKey="key"
              destroyOnClose
              columns={masterColumns}
              className={styles.tableStyle}
              pagination={false}
            />
          </div>
        </aside>
        <section className="a-card">
          <div className="a-card-header" style={{ justifyContent: 'flex-end' }}>
            <Button type="text" icon={<EditOutlined />}>
              修改
            </Button>
            <Button type="text" icon={<CopyOutlined />}>
              复制
            </Button>
          </div>
          <div className="a-card-body px-2">
            <Table
              bordered
              rowKey="key"
              destroyOnClose
              className={styles.tableStyle}
              pagination={false}
            />
          </div>
        </section>
      </SplitPane>
    </>
  );
};

export default UserDimension;
