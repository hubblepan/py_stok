import React, { useState, useCallback, useEffect } from 'react';
import { Tabs } from 'antd';
import MessageNotice from './components/messageNotice/index';
import MailNotice from './components/mailNotice/index';
import EarlyWarning from './components/earlyWarning/index';
import styles from './style.less';

const IndexPage = () => {
  const { TabPane } = Tabs;

  function callback(key) {
    console.log(key);
  }

  // 高度自适应
  const [mainHeight, setMainHeight] = useState(0);
  const onResize = useCallback(() => {
    const { innerHeight } = window;
    const height = innerHeight - 78;
    setMainHeight(height - 83);
  }, []);
  useEffect(() => {
    onResize();
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <>
      <Tabs
        size="large"
        defaultActiveKey="1"
        onChange={callback}
        tabBarGutter={20}
        className={styles.tab}
        tabBarStyle={{ paddingLeft: '16px', fontWeight: 'bolder' }}
      >
        <TabPane tab="指标预警提醒" key="1">
          <section className="a-card" style={{ marginTop: '-30px', height: mainHeight }}>
            <EarlyWarning style={{ marginTop: '-30px', height: mainHeight }} />
          </section>
        </TabPane>

        <TabPane tab="管控邮件通知" key="2">
          <section
            className="page-wrapper a-card"
            style={{ marginTop: '-30px', height: mainHeight }}
          >
            <MailNotice />
          </section>
        </TabPane>
        <TabPane tab="管控短消息通知" key="3">
          <section
            className="page-wrapper a-card"
            style={{ marginTop: '-30px', height: mainHeight }}
          >
            <MessageNotice />
          </section>
        </TabPane>
      </Tabs>
    </>
  );
};

export default IndexPage;
