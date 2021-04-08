import React, { useState, useRef, useEffect } from 'react';
import { Drawer, Tabs, Divider } from 'antd';
import SvgIcon from '@/components/SvgIcon/index';
import { SettingDrawer } from '@ant-design/pro-layout';
import styles from './style.less';
import ThemeColor from './setting/ThemeColor';
import getLocales from '../locales';

const SettingDraw = (props) => {
  const { visible, setVisible, flag, setFlag } = props;
  const { TabPane } = Tabs;
  const onClose = () => {
    setVisible(false);
  };

  const [settingState, setSettingState] = useState({
    value: 'red',
    onChange: () => {
      console.log(45657);
    },
  });

  const Body = ({ children, title }) => (
    <div style={{ marginBottom: '24px' }}>
      <h3>{title}</h3>
      {children}
    </div>
  );

  // const getFormatMessage = ({ id, defaultMessage }) => {
  //   const formatMessage = { id: '54', defaultMessage };
  //   const locales = getLocales();
  //   if (locales[id]) {
  //     return locales[id];
  //   }
  //   if (defaultMessage) {
  //     return defaultMessage;
  //   }

  //   return formatMessage;
  // };

  const preStateRef = useRef(settingState);
  const changeSetting = (key, value) => {
    console.log(key, value);
    const nextState = { ...preStateRef.current };
    nextState[key] = value;
    preStateRef.current = nextState;
    setSettingState(nextState);
  };

  const onChange = (color) => {
    changeSetting('primaryColor', color);
  };

  const themeColorProps = {
    colors: [
      {
        key: '1',
        color: 'blue',
      },
      {
        key: '2',
        color: 'green',
      },
      {
        key: '3',
        color: 'red',
      },
    ],
    value: 'yellow',
    onChange,
  };
  const ref = useRef(null);

  const switchHandle = () => {
    setFlag(!flag);
    setVisible(false);
  };
  useEffect(() => {
    console.log(flag);
  }, [flag]);
  return (
    <Drawer
      placement="right"
      width={300}
      closable={false}
      onClose={onClose}
      visible={visible}
      getContainer={false}
      style={{ position: 'absolute', overflow: 'hidden' }}
      bodyStyle={{ padding: '0' }}
    >
      <Tabs type="card" className={styles.tabpane}>
        <TabPane
          tab={
            <>
              <SvgIcon icon="setting" />
              设置
            </>
          }
          key="1"
        >
          <Body title="主题风格设置">
            <ThemeColor {...themeColorProps} />
          </Body>
          <Divider />
          <Body title="主题色">
            <ThemeColor {...themeColorProps} />
          </Body>
          <Body title="导航菜单切换">
            <div onClick={switchHandle}>
              <a href="#">
                <SvgIcon
                  icon="menu-switch"
                  options={{
                    style: {
                      fontSize: '40px',
                    },
                  }}
                />
              </a>
            </div>
          </Body>
          <Divider />
        </TabPane>
        <TabPane
          tab={
            <>
              <SvgIcon icon="theme" />
              主题
            </>
          }
          key="2"
        >
          <p>Content of Tab Pane 2</p>
          <p>Content of Tab Pane 2</p>
          <p>Content of Tab Pane 2</p>
        </TabPane>
      </Tabs>
    </Drawer>
  );
};

export default SettingDraw;
