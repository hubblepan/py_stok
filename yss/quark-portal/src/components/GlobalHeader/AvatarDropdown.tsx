import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Menu, Spin } from 'antd';
import React from 'react';
import { history, connect } from 'umi';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import AppContext from '@/utils/AppContext';
import { stringify } from 'qs';
import { userlogout } from '@/services/login';

class AvatarDropdown extends React.Component {
  onMenuClick = event => {
    const { key } = event;

    if (key === 'logout') {
      const { dispatch } = this.props;

      userlogout();
      AppContext.removeUserCode();
      AppContext.removeUser();
      AppContext.removePost();
      AppContext.removeToken();
      AppContext.removeRefreshToken();
      history.push("/login");
    }else{
      history.push(`/account/${key}`);
    }
  };

  render() {
    const user = AppContext.getUser();
    const {
      currentUser = {
        avatar: '',
        name: user?user.userName:"",
      },
      menu,
    } = this.props;
    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        {menu && (
          <Menu.Item key="center">
            <UserOutlined />
            个人中心
          </Menu.Item>
        )}
        {menu && (
          <Menu.Item key="settings">
            <SettingOutlined />
            个人设置
          </Menu.Item>
        )}
        {menu && <Menu.Divider />}

        <Menu.Item key="logout">
          <LogoutOutlined />
          退出登录
        </Menu.Item>
      </Menu>
    );
    return currentUser && currentUser.name ? (
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar className={styles.avatar} alt="avatar" icon={<UserOutlined />} />
          <span className={styles.name}>{currentUser.name}</span>
        </span>
      </HeaderDropdown>
    ) : (
      <span className={`${styles.action} ${styles.account}`}>
        <Spin
          size="small"
          style={{
            marginLeft: 8,
            marginRight: 8,
          }}
        />
      </span>
    );
  }
}

export default AvatarDropdown;

/**
export default connect(({ user }) => ({
  currentUser: user.currentUser,
}))(AvatarDropdown);
*/
