import React from 'react';
import { Table } from 'antd';
import styles from './style.less';

const ErrorDetail = () => {
  const columns = [
    {
      title: '指标名称',
      dataIndex: 'indicatorName',
      key: 'indicatorName',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '组合简称',
      dataIndex: 'combinationAbbreviation',
      key: 'combinationAbbreviation',
    },
    {
      title: '报错原因',
      width: 200,
      dataIndex: 'errorReason',
      key: 'errorReason',
      render: (text) => (
        <div
          style={{
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
          }}
        >
          {text}
        </div>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      indicatorName: '估值与o32交易数据核对',
      combinationAbbreviation: '测试组合1',
      errorReason: '估值XXX字段为空',
    },
    {
      key: '2',
      indicatorName: '估值与o32交易数据核对',
      combinationAbbreviation: '测试组合1',
      errorReason: '估值XXX字段为空估值XXX字段为空',
    },
    {
      key: '3',
      indicatorName: '估值与o32交易数据核对',
      combinationAbbreviation: '测试组合1',
      errorReason: '估值XXX字段为空',
    },
    {
      key: '4',
      indicatorName: '估值与o32交易数据核对',
      combinationAbbreviation: '测试组合1',
      errorReason: '估值XXX字段为空',
    },
    {
      key: '5',
      indicatorName: '估值与o32交易数据核对',
      combinationAbbreviation: '测试组合1',
      errorReason: '估值XXX字段为空',
    },
  ];
  return (
    <>
      <div className={styles.errorDetail}>
        <h4 className="h5">
          报错详情
          <span className={styles.today}>(今日)</span>
        </h4>
      </div>
      <div className={styles.tableStyle}>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          style={{ width: '50%', borderRight: '1px solid #E8E8E8' }}
        />
        <Table columns={columns} dataSource={data} pagination={false} style={{ flex: '1' }} />
      </div>
    </>
  );
};

export default ErrorDetail;
