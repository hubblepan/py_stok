import React, { useState, useEffect } from 'react';
import { Modal, Tabs } from 'antd';
import QuarkModal from '@/components/QuarkModal/index';
import styles from './style.less';
import ViewDetail from './ViewDetail';
import ChangeModal from './ChangeModal';

const { TabPane } = Tabs;

const DetailAndChange = (props) => {
  const { visible, setDetailAndChange, type, currentSelect } = props;

  console.log('详情currentSelect');
  console.log(currentSelect);

  const [mode, setMode] = useState('1');
  const changeTab = (value) => {
    setMode(value);
  };

  useEffect(() => {
    if (type === 'detail') {
      setMode('1');
    } else {
      setMode('2');
    }
  }, [type]);

  return (
    <>
      <QuarkModal
        // title="指标变更记录"
        className={styles.multiModal}
        title={
          <>
            <Tabs
              defaultActiveKey={mode}
              activeKey={mode}
              onChange={changeTab}
              className={styles.multiTabs}
            >
              <TabPane tab="指标信息详情" key="1" />
              <TabPane tab="指标变更记录" key="2" />
            </Tabs>
          </>
        }
        bodyStyle={{ height: '600px', overflow: 'auto', padding: 0 }}
        visible={visible}
        onCancel={() => {
          setDetailAndChange(false);
        }}
        footer={null}
      >
        {mode === '1' ? (
          <ViewDetail currentSelect={currentSelect} />
        ) : (
          <ChangeModal currentSelect={currentSelect} />
        )}
      </QuarkModal>
    </>
  );
};

export default DetailAndChange;
