import { Progress, Tooltip, Table } from 'antd';
import QuarkTable from '@/components/QuarkTable';
import DiyProgress from '../DiyPogress';
import {
  InfoCircleTwoTone,
  LinkOutlined,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
} from '@ant-design/icons';
import { useState, useEffect } from 'react';
import Tipbar from './Tipbar';

const columns = [
  {
    title: '检测结果',
    dataIndex: 'detectionResult',
    key: 'detectionResult',
    ellipsis: true,
    render: (content, record) => {
      const icon = record.isSuccess ? (
        <CheckCircleTwoTone twoToneColor="#52c41a" />
      ) : (
        <CloseCircleTwoTone twoToneColor="#eb2f96" />
      );
      return (
        <Tooltip placement="topLeft" title={content}>
          {icon}&nbsp;{content}
        </Tooltip>
      );
    },
  },
  {
    title: '检测详情',
    dataIndex: 'detectionDetail',
    key: 'detectionDetail',
    ellipsis: true,
    render: (content) => (
      <Tooltip placement="topLeft" title={content}>
        {content.map((x, i) => (
          <p key={i}>{x}</p>
        ))}
      </Tooltip>
    ),
  },
];

// 指标检测
const UploadTarget = (props) => {
  const { store, setStore } = props;
  const [percents, setPercents] = useState(30);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setPercents(100);
    }, 1500);
  });

  useEffect(() => {
    if (percents === 100) {
      window.setTimeout(() => {
        setShowTable(true);
      }, 1000);
    }
  }, [percents]);

  return (
    <>
      {showTable ? (
        <>
          <Tipbar type="info" content={<>{store.TargetTest.msg}</>} />
          <div>
            <QuarkTable
              rowSelection={false}
              columns={columns}
              dataSource={store.TargetTest.tableData}
            />
          </div>
        </>
      ) : (
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ width: '40%' }}>
            <div className="text-center">正在努力检测中，请耐心等待结果😊</div>
            {/* <Progress percent={percents} /> */}
            <DiyProgress percent={percents} />
          </div>
        </div>
      )}
    </>
  );
};

export default UploadTarget;
