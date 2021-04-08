// modal型弹窗，可拖拽，MSGBOX专用
import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';
import QuarkModal from '@/components/QuarkModal';
import component from '@/locales/zh-CN/component';

const ConfirmModal = (props) => {
  const { onCancel, onOk, type, content, title, okText, cancelText, extraFooter = [] } = props;
  const [visible, setVisible] = useState(true);

  const handleCancel = async () => {
    let iCheck = true;
    if (onCancel) {
      iCheck = await onCancel();
    }

    if (iCheck) {
      setVisible(false);
      document.body.removeChild(document.querySelector('#confirmModal'));
    }
  };

  const handleOk = async () => {
    let iCheck = true;
    if (onOk) {
      iCheck = await onOk();
    }
    setVisible(false);
    document.body.removeChild(document.querySelector('#confirmModal'));
  };

  // 吧close作为item的onCLick参数
  const _extraFooter = extraFooter.map((component) => {
    const handleClick = () => {
      const isClose = component.props.onClick();
      isClose && setVisible(false);
    };
    return React.cloneElement(component, {
      onClick: handleClick,
    });
  });
  const footer = [
    <Button order={1} key="cancel" onClick={handleCancel} type="text">
      {cancelText ? cancelText : '取消'}
    </Button>,
    <Button order={100} key="confirm" onClick={handleOk} type="primary" danger={type === 'danger'}>
      {okText ? okText : '确定'}
    </Button>,
    ..._extraFooter,
  ].sort((a, b) => {
    return a.props.order - b.props.order;
  });

  const [disabled, setDisabled] = useState(false);
  const [bounds, setBounds] = useState({
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  });
  const draggleRef = React.createRef();
  const onStart = (event, uiData) => {
    const { clientWidth, clientHeight } = window?.document?.documentElement;
    const targetRect = draggleRef?.current?.getBoundingClientRect();
    setBounds({
      left: -targetRect?.left + uiData?.x,
      right: clientWidth - (targetRect?.right - uiData?.x),
      top: -targetRect?.top + uiData?.y,
      bottom: clientHeight - (targetRect?.bottom - uiData?.y),
    });
  };

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
    >
      {title}
    </div>
  );

  return (
    <>
      <QuarkModal
        title={Title}
        width={400}
        onCancel={handleCancel}
        onOk={handleOk}
        visible={visible}
        bodyStyle={{
          height: '100px',
          overflowY: 'auto',
        }}
        {...props}
        footer={footer}
        destroyOnClose={true}
        getContainer={document.querySelector('#confirmModal')}

        // modalRender={(modal) => (
        //   <Draggable
        //     disabled={disabled}
        //     bounds={bounds}
        //     onStart={(event, uiData) => onStart(event, uiData)}
        //   >
        //     <div ref={draggleRef}>{modal}</div>
        //   </Draggable>
        // )}
      >
        <p>{content}</p>
      </QuarkModal>
    </>
  );
};

const confirmModal = (props) => {
  let div = null;
  if (document.querySelector('#confirmModal')) {
    div = document.querySelector('#confirmModal');
  } else {
    div = document.createElement('div');
    div.id = 'confirmModal';
  }

  ReactDOM.render(<ConfirmModal {...props} />, div);

  document.body.appendChild(div);
};

export default confirmModal;
