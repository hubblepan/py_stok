import React, { useState, useEffect } from 'react';
import css from '../index.less';

import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons';

import { Button } from 'antd';

let FullScreen = () => {
  //控制全屏
  const handleFullScreen = () => {
    if (isFullScreen()) {
      exitFullScreen();
    } else {
      requestFullScreen();
    }
  };
  const isFullScreen = () => {
    return !!(
      document.fullscreen ||
      document.mozFullScreen ||
      document.webkitIsFullScreen ||
      document.webkitFullScreen ||
      document.msFullScreen
    );
  };

  const requestFullScreen = () => {
    var el = document.documentElement;
    // 判断各种浏览器，找到正确的方法
    if (el.requestFullscreen) {
      // W3C
      el.requestFullscreen();
    } else if (el.webkitRequestFullScreen) {
      // Chrome等
      el.webkitRequestFullScreen();
    } else if (el.mozRequestFullScreen) {
      // FireFox
      el.mozRequestFullScreen();
    } else if (el.msRequestFullscreen) {
      // IE11
      el.msRequestFullscreen();
    } else if (typeof window.ActiveXObject !== 'undefined') {
      //for Internet Explorer
      var wscript = new ActiveXObject('WScript.Shell');
      if (wscript !== null) {
        wscript.SendKeys('{F11}');
      }
    } else {
      alert('该浏览器不支持全屏！');
    }
  };

  //退出全屏 判断浏览器种类
  const exitFullScreen = () => {
    if (document.exitFullscreen) {
      // W3C
      document.exitFullscreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (typeof window.ActiveXObject !== 'undefined') {
      //for Internet Explorer
      // for IE，这里和fullScreen相同，模拟按下F11键退出全屏
      var wscript = new ActiveXObject('WScript.Shell');
      if (wscript !== null) {
        wscript.SendKeys('{F11}');
      }
    } else {
      alert('该浏览器不支持全屏！');
    }
  };

  let Icon = isFullScreen() ? FullscreenExitOutlined : FullscreenOutlined;
  let text = isFullScreen() ? '恢复' : '全屏';
  return (
    <>
      <Button type="text" icon={<Icon />} onClick={handleFullScreen}>
        {text}
      </Button>
    </>
  );
};

export default FullScreen;
