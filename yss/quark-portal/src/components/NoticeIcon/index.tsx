import { BellOutlined } from '@ant-design/icons';
import { Badge, Spin, Tabs } from 'antd';
import useMergeValue from 'use-merge-value';
import React, {useEffect} from 'react';
import classNames from 'classnames';
import NoticeList from './NoticeList';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

const { TabPane } = Tabs;

const NoticeIcon = (props) => {
  const getNotificationBox = () => {
    const {
      children,
      loading,
      onClear:onClear1,
      onTabChange,
      onItemClick:onItemClick1,
      onViewMore:onViewMore1,
      clearText,
      viewMoreText,
    } = props;

    if (!children) {
      return null;
    }

    const panes = [];
    React.Children.forEach(children, (child) => {
      if (!child) {
        return;
      }

      const {
        list,
        title,
        count,
        tabKey,
        showClear,
        showViewMore,
        onItemClick=onItemClick1,
        onClear=onClear1,
        onViewMore=onViewMore1
      } = child.props;
      const len = list && list.length ? list.length : 0;
      const msgCount = count || count === 0 ? count : len;
      const tabTitle = msgCount > 0 ? `${title} (${msgCount})` : title;
      panes.push(
        <TabPane tab={tabTitle} key={tabKey}>
          <NoticeList
            tabKey={tabKey}
            clearText={clearText}
            viewMoreText={viewMoreText}
            data={list}
            onClear={() => onClear && onClear(title, tabKey)}
            onClick={(item) => onItemClick && onItemClick(item, child.props)}
            onViewMore={(event) => onViewMore && onViewMore(child.props, event)}
            showClear={showClear}
            showViewMore={showViewMore}
            title={title}
            {...child.props}
          />
        </TabPane>,
      );
    });
    return (
      <Spin spinning={loading} delay={300}>
        <Tabs className={styles.tabs} onChange={onTabChange}>
          {panes}
        </Tabs>
      </Spin>
    );
  };

  const { className, count, bell,popupVisible:visible, onPopupVisibleChange:setVisible} = props;
  // const [visible, setVisible] = useMergeValue(false, {
  //   value: props.popupVisible,
  //   onChange: props.onPopupVisibleChange,
  // });
  const noticeButtonClass = classNames(className, styles.noticeButton);
  const notificationBox = getNotificationBox();
  const NoticeBellIcon = bell || <BellOutlined className={styles.icon} />;
  const trigger = (
    <span
      className={classNames(noticeButtonClass, {
        opened: visible,
      })}
    >
      <Badge
        count={count}
        style={{
          boxShadow: 'none',
        }}
        className={styles.badge}
      >
        {NoticeBellIcon}
      </Badge>
    </span>
  );

  if (!notificationBox) {
    return trigger;
  }
  useEffect(()=>{
    console.log('index.ts visible');
    console.log(visible);
  },[visible])
  return (
    <HeaderDropdown
      placement="bottomRight"
      overlay={notificationBox}
      overlayClassName={styles.popover}
      trigger={['click']}
      visible={visible}
      onVisibleChange={setVisible}
    >
      {trigger}
    </HeaderDropdown>
  );
};

NoticeIcon.defaultProps = {
  emptyImage: 'https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg',
};
NoticeIcon.Tab = NoticeList;
export default NoticeIcon;
