import React, { useState, useEffect } from 'react';
import { Modal, Button, Spin } from 'antd';
import { FullscreenOutlined, CloseOutlined } from '@ant-design/icons';
import Draggable from 'react-draggable';
import styles from './style.less';

const QuarkModal = (props) => {
  const {
    title,
    visible,
    setVisible,
    onCancel,
    onOk,
    footerType,
    children,
    footer,
    bodyStyle,
    width,
    getTableHeight,
    style,
    fullScreen = true,
    getContainer = false,
    isDrag = true,
    ...rest
  } = props;

  // 拖拽
  const [disabled, setDisabled] = useState(true);

  const handleCancel = () => {
    return setVisible ? setVisible(false) : onCancel();
  };

  const handleOk = () => {
    if (onOk) {
      return onOk();
    }
  };

  // 窗口大小变化
  const { clientHeight, clientWidth } = document.documentElement;

  // console.log(clientHeight, clientWidth);

  /**
   * 全屏效果
   */
  const [screenHeight, setScreenHeight] = useState(0);
  const [screenWidth, setScreenWidth] = useState(0);
  const [flag, setFlag] = useState(true);

  const fullScreenHandle = () => {
    if (flag) {
      setScreenHeight(clientHeight);
      setScreenWidth(clientWidth);
      if (getTableHeight) {
        getTableHeight(clientHeight - 150);
      }
      setFlag(false);
    }
    if (!flag) {
      setScreenHeight(0);
      setScreenWidth(0);
      if (getTableHeight) {
        getTableHeight(500);
      }
      setFlag(true);
    }
  };

  /**
   * 根据footerType判断
   * @param {*} type
   */
  const foots = (type) => {
    return (
      <>
        <Button key="back" type="text" onClick={handleCancel}>
          取消
        </Button>
        <Button key="submit" type="primary" onClick={handleOk}>
          保存
        </Button>
      </>
    );
  };

  const closeIcon = (
    <div>
      {fullScreen ? <FullscreenOutlined onClick={fullScreenHandle} /> : null}
      &nbsp;&nbsp;
      <CloseOutlined
        onClick={(e) => {
          e.preventDefault();
          handleCancel();
        }}
      />
    </div>
  );

  const Title = (
    <div
      style={{
        width: '100%',
        cursor: 'move',
      }}
      onMouseOver={() => {
        if (disabled) {
          setDisabled(false);
        }
      }}
      onMouseOut={() => {
        setDisabled(true);
      }}
      onFocus={() => {}}
      onBlur={() => {}}
      // end
    >
      {title}
    </div>
  );

  const modalProps = {
    title: Title,
    visible,
    setVisible,
    getTableHeight,
    width: screenHeight === 0 ? (width ? width : 900) : screenWidth,

    bodyStyle: flag
      ? typeof bodyStyle === 'undefined'
        ? {
            height: '560px',
            overflowY: 'auto',
          }
        : bodyStyle
      : {
          height: screenHeight - 120,
          overflowY: 'auto',
        },

    style: style || (screenHeight === 0 ? '' : { top: 5 }),

    onOk,
    // onCancel,
    closeIcon,
    footer: typeof footer === 'undefined' ? foots(footerType) : footer,
    ...rest,
  };

  return (
    <Modal
      {...modalProps}
      getContainer={getContainer}
      modalRender={
        isDrag ? (modalDrag) => <Draggable disabled={disabled}>{modalDrag}</Draggable> : null
      }
    >
      {children}
    </Modal>
  );
};

export default QuarkModal;
