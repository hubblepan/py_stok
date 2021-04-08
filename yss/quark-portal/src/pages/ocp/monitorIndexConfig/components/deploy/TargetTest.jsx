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
    dataIndex: 'index',
    key: 'index',
    ellipsis: true,

    // render: (content, record) => {
    //   const icon = record.success ? (
    //     <CheckCircleTwoTone twoToneColor="#52c41a" />
    //   ) : (
    //     <CloseCircleTwoTone twoToneColor="#eb2f96" />
    //   );
    //   return (
    //     <Tooltip placement="topLeft" title={content}>
    //       {icon}&nbsp;{content}
    //     </Tooltip>
    //   );
    // },
  },
  {
    title: '检测详情',
    dataIndex: 'info',
    key: 'info',
    ellipsis: true,
    render: (content, record) => {
      return (
        <>
          {content.map((x, i) => {
            return <p key={i}>{x}</p>;
          })}
        </>
      );
    },
    // render: (content) => {
    //   // console.log(content);
    //   const re = /<[^<>]+>/g;
    //   return (
    //     <Tooltip placement="topLeft" title={content.replace(re, '')}>
    //       <span dangerouslySetInnerHTML={{ __html: content }} />
    //       {/* {content.map((x, i) => (
    //       <p key={i}>{x}</p>
    //     ))} */}
    //     </Tooltip>
    //   );
    // },
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
      <Tipbar type="info" content={<>{store.TargetTest.msg}</>} />
      <div>
        <QuarkTable
          rowSelection={false}
          columns={columns}
          dataSource={store.TargetTest.tableData}
        />
      </div>
      {/* {showTable ? (
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
            <DiyProgress percent={percents} />
          </div>
        </div>
      )} */}
    </>
  );
};

export default UploadTarget;
