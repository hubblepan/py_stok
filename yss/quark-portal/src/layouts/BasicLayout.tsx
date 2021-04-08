/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import RightContent from '@/components/GlobalHeader/RightContent';
import TabPages from '@/components/TabPages';
import Authorized from '@/utils/Authorized';
import { getAuthorityFromRouter } from '@/utils/utils';
import ProLayout from '@ant-design/pro-layout';
import { Button, Result, Dropdown, Menu, Drawer } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { connect, Link, useIntl, history } from 'umi';
import SvgIcon from '@/components/SvgIcon/index';
import { queryMenu } from '@/services/menuTree';
import AppContext from '@/utils/AppContext';
import SettingDrawer from './SettingDrawer';
import NoviceGuide from './NoviceGuide';
import ExpandDrawer from './ExpandDrawer';

const noMatch = (
  <Result
    status={403}
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={
      <Button type="primary">
        <Link to="/user/login">Go Login</Link>
      </Button>
    }
  />
);

/**
 * use Authorized check all menu item
 */
// flag===1
// const menuDataRender = (menuList) => {
//   if (menuList) {
//     return menuList.map((item) => {
//       const localItem = { ...item, children: item.children ? menuDataRender(item.children) : [] };
//       if (item.icon) {
//         localItem.icon = (
//           <SvgIcon icon={item.icon} style={{ fontSize: '18px', marginRight: '6px' }} />
//         );
//       }
//       return Authorized.check(item.authority, localItem, null);
//     });
//   }
// };

// flag===2
const menuDataRender = (menuList, flag) => {
  if (menuList) {
    // const localItem = [];
    return menuList.map((item) => {
      // localItem.push(item.name);
      const localItem = {
        ...item,
        children: item.children ? (!flag ? [] : menuDataRender(item.children)) : [],
      };
      // console.log(localItem);
      if (item.icon) {
        localItem.icon = (
          <SvgIcon icon={item.icon} style={{ fontSize: '18px', marginRight: '6px' }} />
        );
      }
      return Authorized.check(item.authority, localItem, null);
    });
  }
};

const defaultFooterDom = null;
// <footer style={{ padding: 4, textAlign: 'center' }}>
//   @Copyright © 2020 赢时胜AMS技术平台出品
// </footer>

const BasicLayout = (props) => {
  const {
    dispatch,
    children,
    settings,
    menuTree,
    location = {
      pathname: '/',
    },
  } = props;

  // 有两种情况：1：true原始设置  2：false菜单浮动设置
  const [flag, setFlag] = useState(true);

  const [settingVisible, setSettingVisible] = useState(false);
  const [mainHeight, setMainHeight] = useState(0);

  const onResize = useCallback(() => {
    const innerHeight = window.innerHeight;

    // const height = innerHeight - 78;
    // const height = document.getElementsByTagName('main')[0].clientHeight;

    // console.log(height);
    setMainHeight(innerHeight - 50);
    // const innerWidth = window.innerWidth;
    // const innerHeight = window.innerHeight;
    // let scale = Math.min(innerWidth / 1600, innerHeight / 900);
    // scale = Math.floor(scale * 100) / 100;
    // setLsdScale(scale);
  }, []);

  useEffect(() => {
     const userCode = AppContext.getUserCode();
     if (!userCode) {
       // 没有当前用户信息，则跳转登录页面
       history.push('/login');
     }

    onResize();
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const [menuData, setMenuData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const result = await queryMenu();
      setMenuData(result.data);
    }
    fetchData();
  }, []);

  // console.log(menuData);

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
    }
  }, []);
  /**
   * init variables
   */

  const handleMenuCollapse = (payload) => {
    console.log('zhedie');
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  }; // get children authority

  const authorized = getAuthorityFromRouter(props.route.routes, location.pathname || '/') || {
    authority: undefined,
  };
  const { formatMessage } = useIntl();
  const [collapsed, setCollapsed] = useState(false);

  // 左侧菜单抽屉
  const [visible, setVisible] = useState(false);

  const [menuItemData, setMenuItemData] = useState([]);
  // console.log(menuItemData);
  if (window.__POWERED_BY_QIANKUN__) {
    return (
      <>
        {children}
        {/* <TabPages
          {...props}
          menuData={menuData}
          errorPage="/exception/404"
          remberRefresh
          animated
          maxTab="20"
          homePage="/home/manage"
          mainHeight={mainHeight}
        /> */}
      </>
    );
  }
  return (
    <>
      {/* 新手引导组件 */}
      <NoviceGuide />
      <ProLayout
        title="YSSTECH"
        siderWidth="240px"
        style={{ position: 'absolute', width: '100%', zIndex: '1' }}
        menuHeaderRender={(logoDom, titleDom) => (
          <Link to="/">
            <SvgIcon icon="logo" fill="#528BFF" options={{ style: { fontSize: '32px' } }} />
            {/* <SvgIcon icon="logo-blue" fill='#9da7b2' options={{ style: { fontSize: '32px' } }} /> */}
            {titleDom}
          </Link>
        )}
        // onCollapse={handleMenuCollapse}
        collapsed={collapsed}
        collapsedButtonRender={false}
        menuItemRender={(menuItemProps, defaultDom) => {
          if (menuItemProps.isUrl || menuItemProps.children || !menuItemProps.path) {
            return defaultDom;
          }
          return !flag
            ? [
                <Link
                  key="0101"
                  to={menuItemProps.path}
                  onMouseMove={() => {
                    setVisible(true);
                    // console.log(menuItemProps);
                    setMenuItemData(menuItemProps);
                  }}
                >
                  {defaultDom}
                </Link>,
              ]
            : [
                <Link to={menuItemProps.path} key="1010">
                  {menuItemProps.icon}
                  {defaultDom}
                </Link>,
              ];
          // return (
          //   <Link to={menuItemProps.path}>
          //     {menuItemProps.icon}
          //     {defaultDom}
          //   </Link>
          // );
        }}
        headerContentRender={() => {
          return (
            <div style={{ display: 'flex' }}>
              <div
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  cursor: 'pointer',
                  fontSize: '16px',
                }}
              >
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              </div>
              {/* <Link to="/">
                <SvgIcon
                  icon="home_header"
                  options={{
                    style: {
                      fontSize: '20px',
                      marginLeft: '20px',
                    },
                  }}
                />
              </Link> */}
            </div>
          );
        }}
        breadcrumbRender={(routers = []) => [
          {
            path: '/',
            breadcrumbName: formatMessage({
              id: 'menu.home',
            }),
          },
          ...routers,
        ]}
        itemRender={(route, params, routes, paths) => {
          const first = routes.indexOf(route) === 0;
          return first ? (
            <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
          ) : (
            <span>{route.breadcrumbName}</span>
          );
        }}
        footerRender={() => defaultFooterDom}
        menuDataRender={() => menuDataRender(menuData, flag)}
        rightContentRender={() => (
          <RightContent
            menuData={menuData}
            settingVisible={settingVisible}
            setSettingVisible={setSettingVisible}
          />
        )}
        {...props}
        {...settings}
      >
        {/* <Authorized authority={authorized.authority} noMatch={noMatch}> */}
        <TabPages
          {...props}
          menuData={menuData}
          errorPage="/exception/404"
          remberRefresh
          animated
          maxTab="20"
          homePage="/home/IT"
          mainHeight={mainHeight}
        />
        {/* </Authorized> */}
        {/* <SettingDrawer
          visible={settingVisible}
          setVisible={setSettingVisible}
          flag={flag}
          setFlag={setFlag}
        /> */}
        {/* 左侧菜单-移入移出效果 */}
        <ExpandDrawer visible={visible} setVisible={setVisible} menuItemData={menuItemData} />
      </ProLayout>
      {/* <SettingDrawer
        settings={settings}
        onSettingChange={(config) =>
          dispatch({
            type: 'settings/changeSetting',
            payload: config,
          })
        }
      /> */}
    </>
  );
};

// export default connect(({ global, settings, menuTree, loading }) => ({
//   collapsed: global.collapsed,
//   settings,
//   menuTree,
//   // loading: loading.effects['menuTree/getMenu'],
// }))(BasicLayout);
export default BasicLayout;
