import React from 'react';
import Redirect from 'umi/redirect';

export default function (props) {
  if (Math.random() > 0.5) {
    return <Redirect to="/login" />; // 没有登录时，重定向到登录页
  }
  //  登录成功时，显示子路由的页面组件
  return <div>{props.children}</div>;
}
