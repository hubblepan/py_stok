import { Avatar, List } from 'antd';
import React, { useMemo, useState } from 'react';
import classNames from 'classnames';
import DetailModal from '@/pages/ocp/message/components/DetailModal';
import styles from './NoticeList.less';
import MessageItem from './components/MessageItem';
import ContentModal from './components/ContentModal';

const NoticeList = ({
  tabKey,
  data = [],
  onClick,
  onClear,
  title,
  onViewMore,
  emptyText,
  showClear = true,
  clearText,
  viewMoreText,
  showViewMore = false,
}) => {
  if (!data || data.length === 0) {
    return (
      <div className={styles.notFound}>
        <img
          src="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
          alt="not found"
        />
        <div>{emptyText}</div>
      </div>
    );
  }
  /** 消息中心 */
  const [contentModalVisible, setContentModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState({});
  return (
    <div>
      {tabKey === 'message' ? (
        <>
          <List
            className={styles.list}
            dataSource={data}
            renderItem={(item) => {
              const itemCls = classNames(styles.item, {
                [styles.read]: item.read,
              });
              return (
                <List.Item className={itemCls}>
                  <MessageItem
                    item={item}
                    // markRead={() => {}}
                    markRead={() => onClick && onClick(item)}
                    setVisible={setContentModalVisible}
                    setCurrentItem={setCurrentItem}
                  />
                </List.Item>
              );
            }}
          />
          <ContentModal
            item={currentItem}
            visible={contentModalVisible}
            setVisible={setContentModalVisible}
            setDetailModalVisible={setDetailModalVisible}
          />
          <DetailModal
            id={currentItem.id}
            activeKey={currentItem.type}
            visible={detailModalVisible}
            setVisible={setDetailModalVisible}
            maskStyle={{ backgroundColor: 'transparent' }}
          />
        </>
      ) : (
        <List
          className={styles.list}
          dataSource={data}
          renderItem={(item, i) => {
            const itemCls = classNames(styles.item, {
              [styles.read]: item.read,
            }); // eslint-disable-next-line no-nested-ternary

            const leftIcon = item.avatar ? (
              typeof item.avatar === 'string' ? (
                <Avatar className={styles.avatar} src={item.avatar} />
              ) : (
                <span className={styles.iconElement}>{item.avatar}</span>
              )
            ) : null;
            return (
              <List.Item
                className={itemCls}
                key={item.key || i}
                onClick={() => onClick && onClick(item)}
              >
                <List.Item.Meta
                  className={styles.meta}
                  avatar={leftIcon}
                  title={
                    <div className={styles.title}>
                      {item.title}
                      <div className={styles.extra}>{item.extra}</div>
                    </div>
                  }
                  description={
                    <div>
                      <div className={styles.description}>{item.description}</div>
                      <div className={styles.datetime}>{item.datetime}</div>
                    </div>
                  }
                />
              </List.Item>
            );
          }}
        />
      )}

      <div className={styles.bottomBar}>
        {showClear ? <div onClick={onClear}>{clearText}</div> : null}
        {showViewMore ? (
          <div
            onClick={(e) => {
              if (onViewMore) {
                onViewMore(e);
              }
            }}
          >
            {title}
            {viewMoreText}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default NoticeList;
