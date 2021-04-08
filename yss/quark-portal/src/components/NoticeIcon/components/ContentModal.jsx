import React, {useEffect} from "react";
import {Button, Modal} from "antd";
import styles from "./style.less";

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
export default ContentModal
