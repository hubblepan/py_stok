import { Modal, Tabs } from 'antd';
import React, { useEffect, useState, useMemo } from 'react';
import TablePane from '@/blocks/TablePane';
import QuarkModal from '@/components/QuarkModal';
import { useModel } from 'umi';
import styles from './style.less';
import DetailHandle from '../handles/DetailHandle';

const { TabPane } = Tabs;

const DetailModal = (props) => {
  const detailModel0 = useModel('ocp.taskManage.detail0');
  const detailModel1 = useModel('ocp.taskManage.detail1');
  const detailModel2 = useModel('ocp.taskManage.detail2');
  // handle不能用useMemo
  const detailHandle0 = new DetailHandle(detailModel0);
  const detailHandle1 = new DetailHandle(detailModel1);
  const detailHandle2 = new DetailHandle(detailModel2);
  const { dataSource: dataSource0 } = detailModel0;
  const { dataSource: dataSource1 } = detailModel1;
  const { dataSource: dataSource2 } = detailModel2;
  // const { pageTotal: total0 } = pageInfo0;
  // const { pageTotal: total1 } = pageInfo1;
  // const { pageTotal: total2 } = pageInfo2;
  const total0=useMemo(()=>{
    return dataSource0.length
  },[dataSource0])
  const total1=useMemo(()=>{
    return dataSource1.length
  },[dataSource1])
  const total2=useMemo(()=>{
    return dataSource2.length
  },[dataSource2])
  const { visible, setVisible, id } = props;
  const [mode, setMode] = useState('1');
  const changeTab = (value) => {
    setMode(value);
  };
  useEffect(() => {
    if (visible) {
      console.log('modalVisible true');
      console.log(id);
      detailHandle0.query({ params: { id, mode: 'all' } });
      detailHandle1.query({ params: { id, mode: 'success' } });
      detailHandle2.query({ params: { id, mode: 'fail' } });
    } else {
      setMode('1');
      // 将页码重置为1
      // detailModel0.setPageInfo({ ...pageInfo0, pageNo: 1 });
      // detailModel1.setPageInfo({ ...pageInfo1, pageNo: 1 });
      // detailModel2.setPageInfo({ ...pageInfo2, pageNo: 1 });
    }
  }, [visible]);

  const panelProps = {
    autoQuery: false,
    columns: [
      {
        title: '指标名称',
        dataIndex: 'indexName',
        render: (value, row, index) => {
          const dom = {
            children: value,
            props: {
              // 但是这个跟分页会有冲突，在接口联调的时候要注意
              rowSpan: row.rowSpan || 0,
            },
          };
          return dom;
        },
      },
      {
        title: '组合名称',
        dataIndex: 'portName',
      },
      {
        title: '执行结果',
        dataIndex: 'taskResult',
      },
      {
        title: '开始时间',
        dataIndex: 'startDate',
        width: 150,
      },
      {
        title: '结束时间',
        dataIndex: 'endDate',
        width: 150,
      },
      {
        title: '耗费时长（秒）',
        dataIndex: 'taskTime',
      },
    ],
    tableProps: {
      rowSelection: false,
    },
  };
  return (
    <QuarkModal
      className={styles.multiModal}
      width={900}
      bodyStyle={{ height: '560px', padding: '0px 16px 16px' }}
      title={
        <>
          <Tabs
            defaultActiveKey="1"
            activeKey={mode}
            onChange={changeTab}
            className={styles.multiTabs}
          >
            <TabPane tab={`全部(${total0})`} key="1" />
            <TabPane
              tab={
                <>
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '4px',
                      background: '#52C41A',
                      display: 'inline-block',
                      marginRight: '8px',
                    }}
                  />
                  <span>成功({total1})</span>
                </>
              }
              key="2"
            />
            <TabPane
              tab={
                <>
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '4px',
                      background: '#FF4D4F',
                      display: 'inline-block',
                      marginRight: '8px',
                    }}
                  />
                  <span>失败({total2})</span>
                </>
              }
              key="3"
            />
          </Tabs>
        </>
      }
      visible={visible}
      footer={null}
      onCancel={() => {
        setVisible(false);
      }}
    >
      <TablePane hide={mode !== '1'} {...panelProps} {...detailModel0} handles={detailHandle0} />
      <TablePane hide={mode !== '2'} {...panelProps} {...detailModel1} handles={detailHandle1} />
      <TablePane hide={mode !== '3'} {...panelProps} {...detailModel2} handles={detailHandle2} />
    </QuarkModal>
  );
};
export default DetailModal;
