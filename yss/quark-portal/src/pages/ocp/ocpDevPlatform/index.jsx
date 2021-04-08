import React, {
  createContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  useLayoutEffect,
} from 'react';
import { Tabs } from 'antd';

import TargetThemeProgramme from './components/TargetThemeProgramme/';
import TargetSetting from './components/TargetSetting/';
import styles from './style.less';

const OcpDevPlatform = () => {
  const { TabPane } = Tabs;

  function callback(key) {
    console.log(key);
  }

  // 高度自适应
  const [mainHeight, setMainHeight] = useState(0);

  const onResize = useCallback(() => {
    const { innerHeight } = window;

    const height = innerHeight - 78;
    // const height = document.getElementsByTagName('main')[0].clientHeight;

    // console.log(height);
    setMainHeight(height - 83);
    // const innerWidth = window.innerWidth;
    // const innerHeight = window.innerHeight;
    // let scale = Math.min(innerWidth / 1600, innerHeight / 900);
    // scale = Math.floor(scale * 100) / 100;
    // setLsdScale(scale);
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
        <TabPane tab="管控配置化指标" key="1">
          <section className="a-card" style={{ marginTop: '-30px', height: mainHeight }}>
            <TargetSetting />
          </section>
        </TabPane>

        <TabPane tab="管控主题模板" key="2">
          <section className="a-card" style={{ marginTop: '-30px', height: mainHeight }}>
            <TargetThemeProgramme />
          </section>
        </TabPane>
      </Tabs>
    </>
  );
};

export default OcpDevPlatform;
