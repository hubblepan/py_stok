import React, {useState,useCallback,useEffect,} from 'react';
import { Tabs, Input, Select } from 'antd';
import styles from './style.less';
import UserPostManage from './components/UserPostManage';

const UserPost = () => {
  const { TabPane} = Tabs;

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
        tabBarStyle={{ paddingLeft: '16px', fontWeight: 'bolder' }}
      >
      <TabPane tab="用户岗位管理" key="1">
        <section
          className="page-wrapper a-card"
          style={{ marginTop: '-30px', height: mainHeight }}
        >
          <UserPostManage/>
        </section>
      </TabPane>
      </Tabs>
    </>
  );
};

export default UserPost;
