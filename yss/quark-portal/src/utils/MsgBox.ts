import { message, Modal, notification } from 'antd';
import confirmModal from '@/components/ConfirmModal';

/**
 * 适配消息框配置参数
 * @param {*} config 配置项
 */
const messageAdapter = (config) => {
  const option = {
    style: {
      // marginTop: '35vh',
    },
    ...config,
  };
  if (option.message) {
    option.content = option.message;
    delete option.message;
  }

  return option;
};
const modalAdapter = (config) => {
  const option = {
    centered: true,
    duration: 2,
    width: 500,
    bodyStyle: { maxHeight: '500px', overflowY: 'auto', wordWrap: 'break-word' },
    ...config,
  };
  return option;
};
const notificationAdapter = (config) => {
  const option = {
    duration: 2,
    style: { width: 390, maxHeight: '500px', overflowY: 'auto', wordWrap: 'break-word' },
    ...config,
  };
  if (option.title) {
    option.message = option.title;
    delete option.title;
  }
  if (option.content) {
    option.description = option.content;
    delete option.content;
  }
  return option;
};

const MsgBox = {
  confirmModal(config) {
    return confirmModal({ ...config });
  },

  confirm(config) {
    return Modal.confirm(modalAdapter({ autoFocusButton: 'cancel', ...config }));
  },
  error(config) {
    return notification.error(notificationAdapter({ duration: 3, centered: true, ...config }));
  },
  open(config) {
    return notification.open(notificationAdapter(config));
  },
  info(config) {
    return message.info(messageAdapter(config));
  },
  success(config) {
    return message.success(messageAdapter(config));
  },
  warning(config) {
    return message.warning(messageAdapter({ duration: 3, ...config }));
  },
  // warn(config) {
  //   notification.warn(notificationAdapter(config));
  // },
  config(config) {
    return notification.config(notificationAdapter(config));
  },
  close(key) {
    return notification.close(key);
  },
  destroy() {
    return notification.destroy();
  },

  getMsgBox() {
    return notification;
  },
  getConfig(config) {
    return notificationAdapter(config);
  },
  // message,
  // modal: Modal,
};

export default MsgBox;
