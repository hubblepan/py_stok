import HeaderDropdown from '@/components/HeaderDropdown';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import { Badge, Dropdown, Menu, List, Spin, Select, Button, Modal } from 'antd';
import { BellOutlined, CaretDownOutlined } from '@ant-design/icons';
import SvgIcon from '@/components/SvgIcon';
import moment from 'moment';
import request from '@/utils/request';
import DetailModal from '@/pages/ocp/message/components/DetailModal';
import styles from './style.less';
import index from '../index.less';
import { queryMessage, readMsg } from './service';

const { Option } = Select;

const MessageCenter = props => {
  const [visible, setVisible] = useState(false);
  const [messageList, setMessageList] = useState([]);
  const unreadMessage = useMemo(() => {
    return messageList.filter(item => !item.read);
  }, [messageList]);

  useEffect(() => {
    const params = {
      type: '1',
    };
    queryMessage(params).then(response => {
      setMessageList(response.data.list);
    });
  }, []);

  const count = useMemo(() => {
    return messageList.length;
  }, [messageList]);
  const MessageIcon = (
    <BellOutlined style={{ padding: '4px', verticalAlign: 'middle', fontSize: '16px' }} />
  );
  const trigger = (
    <span>
      <Badge
        count={count}
        // style={{
        //   boxShadow: 'none',
        // }}
      >
        {MessageIcon}
      </Badge>
    </span>
  );

  const [messageDate, setMessageDate] = useState('今日消息');
  const menu = (
    <Menu
      onClick={({ item, key }) => {
        console.log(item);
        setMessageDate(item.props.title);
        const params = {
          type: key,
        };
        queryMessage(params).then(response => {
          setMessageList(response.data.list);
        });
      }}
    >
      <Menu.Item key="1" title="今日消息">
        今日消息
      </Menu.Item>
      <Menu.Item key="0" title="全部消息">
        全部消息
      </Menu.Item>
    </Menu>
  );
  const ContentModal = props => {
    const { item, visible, setVisible, setDetailModalVisible } = props;
    const { title, typeText, description, time, type } = item;
    useEffect(() => {
      console.log('文字visible');
      console.log(visible);
    }, [visible]);
    return (
      <Modal
        getContainer={false}
        title="消息详情"
        visible={visible}
        onCancel={() => {
          setVisible(false);
        }}
        width={400}
        bodyStyle={{ paddingTop: '12px' }}
        footer={null}
      >
        <div className={styles.messageItem}>
          <div className={styles.title}>
            <span className="text-secondary">[{typeText}]</span>
            <span>{title}</span>
          </div>
          <div className={styles.description}>{description}</div>
          <div className={styles.time}>{time}</div>
        </div>
        {type ? (
          <Button
            type="primary"
            className="mt-2"
            onClick={() => {
              setDetailModalVisible(true);
            }}
          >
            预警/异常详情
          </Button>
        ) : null}
      </Modal>
    );
  };
  const MessageItem = ({ item, markRead, setVisible, setCurrentItem }) => {
    const { title, typeText, description, time, read } = item;
    const overflow = useMemo(() => {
      return description.length > 57;
    }, []);
    return (
      <div
        className={`px-5 py-3 ${styles.messageItem} ${read ? styles.read : ''}`}
        style={{ cursor: 'pointer' }}
        onClick={() => {
          markRead(item);
        }}
      >
        <div className={styles.title}>
          <span className="text-secondary">[{typeText}]</span>
          <span>{title}</span>
          <span>{title}</span>
        </div>
        <div className={styles.description}>
          {description.length > 57 ? `${description.slice(0, 57)}......` : description}
          {overflow ? (
            <a
              href="#"
              className="ml-2"
              style={{ color: '#40a9ff' }}
              onClick={e => {
                e.preventDefault();
                // e.stopPropagation();
                console.log('setVisible');
                setCurrentItem(item);
                setVisible(true);
              }}
            >
              查看全部
            </a>
          ) : null}
        </div>
        <div className={`${styles.time} text-secondary`}>{time}</div>
      </div>
    );
  };
  const markRead = msg => {
    console.log('markRead');
    console.log(msg);
    const ids = [];
    let newMessageList = null;
    // 用参数区分单个还是全部
    if (msg) {
      if (msg.read) return;
      const index = messageList.findIndex(item => item.id === msg.id);
      newMessageList = messageList.slice(0, messageList.length);
      newMessageList[index].read = 1;
      setMessageList(newMessageList);
      ids.push(msg.id);
    } else {
      const unread = messageList.filter(item => !item.read);
      // 设置ids
      unread.forEach(item => ids.push(item.id));
      newMessageList = messageList.slice(0, messageList.length);
      newMessageList.forEach(item => {
        if (ids.includes(item.id)) {
          item.read = 1;
        }
      });
      setMessageList(newMessageList);
    }
    if (ids.length) {
      readMsg(ids)
        .then()
        .catch();
    }
  };
  const [contentModalVisible, setContentModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState({});
  return (
    <Dropdown
      className={index.action}
      placement="bottomRight"
      arrow
      overlayStyle={{ zIndex: 999 }}
      overlay={
        <div
          style={{
            backgroundColor: '#fff',
            boxShadow: '0px 3px 8px 0px rgba(0,0,0,0.22)',
            width: '360px',
          }}
        >
          <div
            style={{ height: '60px', borderBottom: '1px solid #f0f0f0' }}
            className="px-5 py-4"
          >
            <Dropdown overlay={menu} trigger={['click']} placement="bottomLeft">
              <a onClick={e => e.preventDefault()}>
                <span style={{ fontSize: '16px', fontWeight: '500' }}>{messageDate}</span>
                <CaretDownOutlined className="ml-1" />
              </a>
            </Dropdown>
            <div className="text-secondary float-right">消息中心</div>
          </div>
          <div className="px-5 py-2">
            <span className="text-secondary mr-2" style={{ textDecoration: 'underline' }}>
              {unreadMessage.length}
            </span>
            <span className="text-secondary mr-2">未读消息</span>
            <a
              style={{ color: '#40a9ff' }}
              onClick={e => {
                e.preventDefault();
                markRead();
              }}
            >
              全部已读
            </a>
          </div>
          <List
            style={{
              maxHeight: '580px',
              overflowY: 'auto',
            }}
            dataSource={messageList}
            renderItem={item => (
              <List.Item style={{ padding: '0' }}>
                <MessageItem
                  item={item}
                  markRead={markRead}
                  setVisible={setContentModalVisible}
                  setCurrentItem={setCurrentItem}
                />
              </List.Item>
            )}
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
        </div>
      }
      // overlayClassName={styles.popover}
      trigger={['click']}
      visible={visible}
      onVisibleChange={setVisible}
    >
      {trigger}
    </Dropdown>
  );
};
export default MessageCenter;
