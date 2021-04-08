import { Modal, Tabs } from 'antd';
import React, { useEffect, useState, useMemo } from 'react';
import TablePane from '@/blocks/TablePane';
import QuarkModal from '@/components/QuarkModal';
import { useModel } from 'umi';
import styles from './style.less';
import DetailHandle from '../handles/DetailHandle';

const { TabPane } = Tabs;

const DetailModal = (props) => {
  const detailModel0 = useModel('ocp.message.detail0');
  const detailModel1 = useModel('ocp.message.detail1');
  const detailHandle0 = new DetailHandle(detailModel0);
  const detailHandle1 = new DetailHandle(detailModel1);
  const { dataSource: dataSource0 } = detailModel0;
  const { dataSource: dataSource1 } = detailModel1;
  const total0 = useMemo(() => {
    return dataSource0.length;
  }, [dataSource0]);
  const total1 = useMemo(() => {
    return dataSource1.length;
  }, [dataSource1]);
  const { visible, setVisible, id, activeKey, maskStyle = {} } = props;
  const [mode, setMode] = useState('1');
  const changeTab = (value) => {
    setMode(value);
  };

  useEffect(() => {
    if (visible) {
      console.log('modalVisible true');
      console.log(id);
      // 设置默认选中的tab
      setMode(`${activeKey}`);
      detailHandle0.query({ params: { id,mode: 'warning' } });
      detailHandle1.query({ params: { id,mode: 'error' } });
    } else {
      setMode('1');
    }
  }, [visible]);
  const panelProps = {
    autoQuery: false,
    columns: [
      {
        title: '提醒标题',
        dataIndex: 'remindTitle',
      },
      {
        title: '提醒内容',
        dataIndex: 'remindContent',
      },
      {
        title: '提醒时间',
        dataIndex: 'remindTime',
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
      zIndex={1001}
      maskStyle={maskStyle}
      bodyStyle={{ height: '560px', padding: '0px 16px 16px' }}
      title={
        <>
          <Tabs
            defaultActiveKey="1"
            activeKey={mode}
            onChange={changeTab}
            className={styles.multiTabs}
          >
            <TabPane
              tab={
                <>
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '4px',
                      background: '#FAAD15',
                      display: 'inline-block',
                      marginRight: '8px',
                    }}
                  />
                  <span>预警提醒({total0})</span>
                </>
              }
              key="1"
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
                  <span>异常提醒({total1})</span>
                </>
              }
              key="2"
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
    </QuarkModal>
  );
};
export default DetailModal;
