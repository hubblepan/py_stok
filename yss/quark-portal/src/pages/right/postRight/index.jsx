import React, {
  createContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  useLayoutEffect,
} from 'react';
import { Tabs, Tooltip, Input, Select } from 'antd';

import { useModel } from 'umi';
import styles from './style.less';
import PostManage from './components/PostManage';
import PostRightManage from './components/PostRightManage';

export const FatherContext = createContext();

const PostRight = () => {
  const { TabPane} = Tabs;

  const [mode, setMode] = useState("1");
  function changeTab(key) {
    console.log(key);
    setMode(key);
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
        activeKey={mode}
        onChange={changeTab}
        tabBarGutter={20}
        className={styles.tab}
        tabBarStyle={{ paddingLeft: '16px', fontWeight: 'bolder' }}
      >

      <TabPane tab="岗位管理" key="1">
        <section
          className="page-wrapper a-card"
          style={{ marginTop: '-30px', height: mainHeight }}
        >
          <PostManage changeTab={changeTab}/>
        </section>
      </TabPane>

      <TabPane tab="岗位权限分配" key="2">
        <section
          className="page-wrapper a-card"
          style={{ marginTop: '-30px', height: mainHeight }}
        >
          <PostRightManage/>
        </section>
      </TabPane>
      </Tabs>
    </>
  );
};

export default PostRight;
