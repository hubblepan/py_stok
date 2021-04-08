import React, { useRef, useState, useEffect, useCallback } from 'react';

const Layout = ({ children }) => {
  // const theme = require('./LargeScreenLayout.less');
  // require('@/styles/dark.less');

  useEffect(() => {
    let styleLink = document.getElementById('theme-style');
    let body = document.getElementsByTagName('body')[0];
    // const isLargeScreen = body.classList.contains('largeScreen');
    if (styleLink) {
      // 假如存在id为theme-style 的link标签，直接修改其href
      styleLink.href = '/theme/largeScreen.css'; // 切换 antd 组件主题
      body.className = 'largeScreen'; // 切换自定义组件的主题
    } else {
      // 不存在的话，则新建一个
      styleLink = document.createElement('link');
      styleLink.type = 'text/css';
      styleLink.rel = 'stylesheet';
      styleLink.id = 'theme-style';
      styleLink.href = '/theme/largeScreen.css';
      body.className = 'largeScreen';
      document.body.appendChild(styleLink);
    }
  }, []);

  return <>{children}</>;
};

export default Layout;
