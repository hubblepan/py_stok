import React, {useCallback, useEffect, useState} from 'react';
import { Tabs} from 'antd';
import UserManage from './components/UserManage';
import UserRightManage from './components/UserRightManage';
import styles from './style.less'

const {TabPane} = Tabs;
const IndexPage = () => {
  // 高度自适应
  const [mainHeight, setMainHeight] = useState(0);
  const [tabKey, setTabKey] = useState("1");

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
      <Tabs defaultActiveKey="1" activeKey={tabKey} onChange={setTabKey} className={styles.tab} tabBarGutter={20} tabBarStyle={{ paddingLeft: '16px', fontWeight: 'bolder' }}>
        <TabPane tab="用户管理" key="1">
          <section
            className="page-wrapper a-card"
            style={{ marginTop: '-30px', height: mainHeight }}
          >
            <UserManage setTabKey={setTabKey}/>
          </section>
        </TabPane>
        <TabPane tab="用户权限配置" key="2">
          <section
            className="page-wrapper a-card"
            style={{ marginTop: '-30px', height: mainHeight }}
          >
            <UserRightManage/>
          </section>

        </TabPane>
      </Tabs>
    </>
  );
};
export default IndexPage;

