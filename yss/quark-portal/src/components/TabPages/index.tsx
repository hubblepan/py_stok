import React, { useState, useEffect, useCallback } from 'react';
import { history, Route, useIntl } from 'umi';
import { Tabs, message, Menu, Dropdown } from 'antd';
import StorageUtil from '@/utils/StorageUtil';
import styles from './page.less';

const { session } = StorageUtil;
const { TabPane } = Tabs;
let allRouterData = [];
let allRouterkeys: string[] = [];
// const errorTabKey = 'errorPage';

//   判断一个数组或者object是否为空
const hasVal = (val) => {
  if (!val) {
    return false;
  }
  return Array.isArray(val) ? val.length !== 0 : Object.keys(val).length !== 0;
};

const getAllrouters = (data) => {
  const treeData = data;
  const treeList = [];
  const getTreeList = (tree) => {
    tree.forEach((node) => {
      if (!node.level) {
        Object.assign(treeList, {
          [node.path]: {
            tab: node.name,
            key: node.path,
            locale: node.locale,
            icon: node.icon,
            closable: true,
            content: { ...node.component },
            exact: node.exact,
          },
        });
      }
      if (!node.hideChildrenInMenu && node.children && node.children.length > 0) {
        getTreeList(node.children);
      }
    });
  };
  getTreeList(treeData);
  return treeList;
};

const TabPages = (props) => {
  const {
    location: { pathname },
    route: { routes },
    menuData,
    remberRefresh,
    homePage,
    errorPage,
    mainHeight,
    preventReload,
  } = props;

  const [tabList, setTabList] = useState(() => {
    // if (menuData.length > 0) {
    //   // 页面初始化获取所有路由列表,备用
    //   allRouterData = getAllrouters(menuData);
    // } else {
    // 页面初始化获取所有路由列表,备用
    allRouterData = getAllrouters(routes);
    // }

    allRouterkeys = Object.keys(allRouterData);

    const tabs = [homePage];
    if (remberRefresh) {
      let unClosedTabs = session.getObject('unClosedTabs');
      unClosedTabs = hasVal(unClosedTabs) ? unClosedTabs : [];
      tabs.push(...unClosedTabs);
    }
    // 把标签放入一个对象,当前的path塞进页面内容
    const tabList1 = {};
    tabs.forEach((key) => {
      const item = allRouterData[key];
      if (item) {
        tabList1[key] = {
          key,
          tab: item.tab,
          content: { ...item?.content },
          exact: item?.exact,
        };
      }
    });
    return tabList1;
  });

  // const [tabList, setTabList] = useState({});
  const [activeKey, setActiveKey] = useState('');
  // const intl = useIntl();

  // const transforPathToTxt = (path, node) => {
  //   if (node?.children?.length || node?.redirect) {
  //     return path;
  //   }
  //   if (path) {
  //     const txt = `menu${path.replace(/\//g, '.')}`;
  //     return intl.formatMessage({ id: txt });
  //   }
  //   return path;
  // };

  const setStates = useCallback((currentTabPages, activePath) => {
    // 塞进所有标签到state
    if (currentTabPages) {
      // setTabState({tabList: currentTabPages, activeKey:activePath});
      setTabList(currentTabPages);
    }
    console.log('pathname=========', pathname, activePath);

    // 设置tab激活页面为当前路由
    if (pathname) {
      console.log('pathname=========', pathname, activePath);
      setActiveKey(activePath);
      if (activePath === errorPage) {
        return;
      }
    }
    // 将已打开tab存到session中,防止页面刷新
    if (props.remberRefresh) {
      session.setObject('unClosedTabs', Object.keys(currentTabPages));
    }
  }, []);

  const onClickMenu = useCallback((e) => {
    // let activeIndex: number = 0;
    // const localTablist = JSON.parse(JSON.stringify(tabList));
    console.log(e);
    switch (e.key) {
      case 'closeCurrent': {
        break;
      }
      case 'closeOther': {
        const tabListObj = {};
        const currentKey = pathname;
        tabListObj[homePage] = tabList[homePage];
        tabListObj[currentKey] = tabList[currentKey];
        setStates(tabListObj, currentKey);
        break;
      }
      case 'closeAll': {
        const tabListObj = {};
        tabListObj[homePage] = tabList[homePage];

        setStates(tabListObj, homePage);
        break;
      }
      case 'closeLeft': {
        break;
      }
      case 'closeRight': {
        break;
      }
      default: {
        break;
      }
    }
  }, []);
  const menu = (item) => (
    <Menu onClick={onClickMenu}>
      <Menu.Item key="refreshCurrent">刷新当前页</Menu.Item>
      <Menu.Item key="closeCurrent">关闭当前标签</Menu.Item>
      <Menu.Divider />
      {/* <Menu.Item key="closeLeft" disabled={active === 0}>关闭当前左边标签</Menu.Item>
        <Menu.Item key="closeRight" disabled={active === tabList.length - 1}>关闭当前右边标签</Menu.Item> */}
      <Menu.Item key="closeOther">关闭其他标签</Menu.Item>
      <Menu.Item key="closeAll">关闭全部标签</Menu.Item>
    </Menu>
  );

  const renderTabs = (unClosedTabs) => {
    const { maxTab } = props;

    // 输入错误路由
    if (!allRouterkeys.includes(pathname)) {
      history.push(errorPage);
      return false;
    }
    const currentItem = allRouterData[pathname];

    // 有unClosedTabs说明是页面初始化
    if (unClosedTabs) {
      // 先判断local存的数据是否是异常
      // 应对异常情况,比如local里存了/a/b,路由是/z/x
      if (!unClosedTabs.includes(pathname)) {
        session.setObject('unClosedTabs', [pathname]);
        tabList[pathname] = {
          key: pathname,
          tab: currentItem.tab,
          content: currentItem.content,
          exact: currentItem.exact,
        };
        setStates(tabList, pathname, true);
      } else {
        // 把标签放入一个对象,当前的path塞进页面内容
        unClosedTabs.forEach((key) => {
          const item = allRouterData[key];
          tabList[key] = {
            key,
            tab: item.tab,
            content: item?.content,
            exact: item?.exact,
          };
        });
        setStates(tabList, pathname, true);
      }
    } else {
      // 新增,切换tab的情况
      const limit = Number(maxTab);
      // 新增标签的情况限制一下标签数量    // 性能限制开多了会崩溃,可以限制个数
      if (!tabList[pathname] && limit && Object.keys(tabList).length >= limit) {
        message.error(`最大打开${props.maxTab}个标签页,请关闭一些再打开新标签`);
        history.goBack();
        return false;
      }
      if (!tabList[pathname]?.content) {
        // 如果么有content或者标签不存在,再添加
        tabList[pathname] = {
          key: pathname,
          tab: currentItem.tab,
          content: { ...currentItem?.content },
          exact: currentItem.exact,
        };
        setStates(tabList, pathname, tabList);
      } else {
        // 如果标签已存在就切换到他
        setActiveKey(pathname);
      }
    }
    return true;
  };

  const onChange = (key) => {
    if (pathname !== key) {
      // setActiveKey(key);
      history.push(key);
    }
  };

  const remove = (targetKey) => {
    const tabListObj = { ...tabList };
    delete tabListObj[targetKey];

    let activeKeyTemp = null;
    if (activeKey === targetKey) {
      const tabKeys = Object.keys(tabList);
      const index = tabKeys.indexOf(targetKey);
      tabKeys.splice(index, 1);
      const lastIndex = tabKeys.length - 1;
      if (index < lastIndex) {
        activeKeyTemp = tabKeys[index];
      } else if (lastIndex >= 0) {
        activeKeyTemp = tabKeys[lastIndex];
      }
    } else {
      activeKeyTemp = activeKey;
    }
    setStates(tabListObj, activeKeyTemp, true);

    // 切换tab同时也变url(关闭当前页面需要跳转到其他路由)
    if (activeKey === targetKey) {
      history.push(activeKeyTemp);
    }
  };

  const onEdit = (targetKey, action) => {
    if (action === 'remove') {
      remove(targetKey);
    }
  };

  const onDoubleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    window?.getSelection()?.removeAllRanges();

    const tabListObj = { ...tabList };
    const currentItem = allRouterData[pathname];

    tabListObj[pathname] = {
      key: pathname,
      tab: currentItem.tab,
      content: { ...currentItem?.content },
      exact: currentItem.exact,
    };

    setStates(tabListObj, pathname, true);

    history.push(pathname);
  };

  useEffect(() => {
    // if (menuData.length > 0) {
    //   // 页面初始化获取所有路由列表,备用
    //   allRouterData = getAllrouters(menuData);
    // } else {
    // 页面初始化获取所有路由列表,备用
    // allRouterData = getAllrouters(routes);
    // // }

    // allRouterkeys = Object.keys(allRouterData);
    // debugger;

    // 页面初始化获取上次未关闭标签,如果没有,获取首页
    // if (pathname === '/') {
    //   history.push(homePage);
    // }
    // if (remberRefresh) {
    //   let unClosedTabs = session.getObject('unClosedTabs');
    //   unClosedTabs = hasVal(unClosedTabs) ? unClosedTabs : [pathname];
    //   // TODO:这块可以和下面的useEffect合在一起
    //   renderTabs(unClosedTabs);
    // }
    // 刷新页面提示
    if (preventReload)
      window.onbeforeunload = () => {
        console.log('------onbeforeunload------');
      };
  }, []);
  useEffect(() => {
    if (pathname === '/') {
      history.push(homePage);
    } else {
      renderTabs();
    }
  }, [props.location]);

  return (
    <Tabs
      className={styles.content_tab}
      activeKey={activeKey}
      onChange={onChange}
      tabBarStyle={{ background: '#fff', marginBottom: 0 }}
      tabPosition="top"
      tabBarGutter={-1}
      hideAdd
      type="editable-card"
      onEdit={onEdit}
      animated={!!props.animated}
      style={{ height: mainHeight }}
    >
      {Object.keys(tabList).map((item, i) => {
        const { tab, key, content, exact } = tabList[item];
        // const tabs = Object.keys(tabList);
        // const disableClose =
        //   (tabs.includes('/') && tabs.length === 2 && i === 1) || tabs.length === 1;
        const disableClose = i === 0;
        return (
          <TabPane
            key={key}
            closable={!disableClose}
            tab={
              <Dropdown overlay={menu(item)} trigger={['contextMenu']}>
                <span onDoubleClick={onDoubleClick}>{tab}</span>
              </Dropdown>
            }
          >
            <div style={{ overflow: 'auto', height: mainHeight - 40 }}>
              <Route key={tab} component={content} exact={exact} />
            </div>
          </TabPane>
        );
      })}
    </Tabs>
  );
};

export default TabPages;
