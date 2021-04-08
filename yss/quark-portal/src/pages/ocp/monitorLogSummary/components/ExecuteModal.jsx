import React, { useState } from 'react';
import { Modal, Form } from 'antd';
import RangePickerFormatter from './RangePickerFormatter';
// import QuarkModal from '@/components/QuarkModal';

const Execute = (props) => {
  const { visible, setVisible } = props;
  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <Modal title="执行" visible={visible} onOk={handleOk} onCancel={handleCancel}>
      <Form name="basic">
        <Form.Item label="业务日期" name="businessDate">
          <RangePickerFormatter style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Execute;
