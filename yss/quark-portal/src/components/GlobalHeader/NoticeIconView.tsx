import React, { Component } from 'react';
import { connect } from 'umi';
import { Tag, message } from 'antd';
import groupBy from 'lodash/groupBy';
import moment from 'moment';
import { queryMessage, readMsg } from '@/components/GlobalHeader/MessageCenter/service';
import { withRouter } from 'react-router-dom';
import NoticeIcon from '../NoticeIcon';
import styles from './index.less';

@withRouter
class GlobalHeaderRight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageList: [],
      popupVisible:false,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;

    if (dispatch) {
      dispatch({
        type: 'global/fetchNotices',
      });
    }
    const params = {
      type: '1',
    };
    queryMessage(params).then((response) => {
      // setMessageList(response.data.list);
      this.setState({
        messageList: response.data.list,
      });
    });
  }

  changeReadState = (clickedItem) => {
    const { id } = clickedItem;
    const { dispatch } = this.props;

    if (dispatch) {
      dispatch({
        type: 'global/changeNoticeReadState',
        payload: id,
      });
    }
  };

  handleNoticeClear = (title, key) => {
    const { dispatch } = this.props;
    message.success(`${'清空了'} ${title}`);

    if (dispatch) {
      dispatch({
        type: 'global/clearNotices',
        payload: key,
      });
    }
  };

  getNoticeData = () => {
    const { notices = [] } = this.props;

    if (!notices || notices.length === 0 || !Array.isArray(notices)) {
      return {};
    }

    const newNotices = notices.map((notice) => {
      const newNotice = { ...notice };

      if (newNotice.datetime) {
        newNotice.datetime = moment(notice.datetime).fromNow();
      }

      if (newNotice.id) {
        newNotice.key = newNotice.id;
      }

      if (newNotice.extra && newNotice.status) {
        const color = {
          todo: '',
          processing: 'blue',
          urgent: 'red',
          doing: 'gold',
        }[newNotice.status];
        newNotice.extra = (
          <Tag
            color={color}
            style={{
              marginRight: 0,
            }}
          >
            {newNotice.extra}
          </Tag>
        );
      }

      return newNotice;
    });
    return groupBy(newNotices, 'type');
  };

  getUnreadData = (noticeData) => {
    const unreadMsg = {};
    Object.keys(noticeData).forEach((key) => {
      const value = noticeData[key];

      if (!unreadMsg[key]) {
        unreadMsg[key] = 0;
      }

      if (Array.isArray(value)) {
        unreadMsg[key] = value.filter((item) => !item.read).length;
      }
    });
    return unreadMsg;
  };

  onMessageItemClick = (msg) => {
    console.log('onMessageItemClick');
    const { messageList } = this.state;
    console.log(msg);
    const ids = [];
    let newMessageList = null;
    // 用参数区分单个还是全部
    if (msg) {
      if (msg.read) return;
      const index = messageList.findIndex((item) => item.id === msg.id);
      newMessageList = messageList.slice(0, messageList.length);
      newMessageList[index].read = 1;
      this.setState({
        messageList: newMessageList,
      });
      ids.push(msg.id);
    } else {
      console.log('全部已读');
      const unread = messageList.filter((item) => !item.read);
      // 设置ids
      unread.forEach((item) => ids.push(item.id));
      newMessageList = messageList.slice(0, messageList.length);
      newMessageList.forEach((item) => {
        if (ids.includes(item.id)) {
          item.read = 1;
        }
      });
      this.setState({
        messageList: newMessageList,
      });
    }
    /** 调取已读接口 */
    if (ids.length) {
      readMsg(ids).then().catch();
    }
  };

  goMessage = () => {
    console.log(this.props);
    this.props.history.push('/monitor/message');
  };
  // const [popupVisible,onPopupVisible]=useState(false)
  onPopupVisible=(visible)=>{
    this.setState({
      popupVisible:visible
    })
  }

  render() {
    const { currentUser, fetchingNotices, onNoticeVisibleChange } = this.props;
    const noticeData = this.getNoticeData();
    const unreadMsg = this.getUnreadData(noticeData);
    const unreadMsgCount = this.state.messageList.filter((item) => !item.read).length;
    return (
      <NoticeIcon
        className={styles.action}
        count={currentUser && currentUser.unreadCount}
        onItemClick={(item) => {
          this.changeReadState(item);
        }}
        loading={fetchingNotices}
        clearText="全部已读"
        viewMoreText="中心"
        onClear={this.handleNoticeClear}
        popupVisible={this.state.popupVisible}
        onPopupVisibleChange={this.onPopupVisible}
        onViewMore={() => message.info('Click on view more')}
        clearClose
      >
        <NoticeIcon.Tab
          tabKey="notification"
          count={unreadMsg.notification}
          list={noticeData.notification}
          title="通知"
          emptyText="你已查看所有通知"
          showViewMore
        />
        <NoticeIcon.Tab
          tabKey="message"
          count={unreadMsgCount}
          list={this.state.messageList}
          title="消息"
          emptyText="您已读完所有消息"
          showViewMore
          onItemClick={(item) => {
            this.onMessageItemClick(item);
          }}
          onClear={() => {
            this.onMessageItemClick();
          }}
          onViewMore={() => this.goMessage()}
        />
        <NoticeIcon.Tab
          tabKey="event"
          title="待办"
          emptyText="你已完成所有待办"
          count={unreadMsg.event}
          list={noticeData.event}
          showViewMore
        />
      </NoticeIcon>
    );
  }
}

export default connect(({ user, global, loading }) => ({
  currentUser: user.currentUser,
  collapsed: global.collapsed,
  fetchingMoreNotices: loading.effects['global/fetchMoreNotices'],
  fetchingNotices: loading.effects['global/fetchNotices'],
  notices: global.notices,
}))(GlobalHeaderRight);
