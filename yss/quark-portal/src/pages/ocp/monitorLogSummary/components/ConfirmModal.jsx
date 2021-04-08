import React, { useEffect, useState } from 'react';
import { Form, Input, Modal } from 'antd';
import MsgBox from '@/utils/MsgBox';

const { TextArea } = Input;
const ConfirmModal = (props) => {
  const { confirmVisible, setConfirmVisible, confirmIds, handles } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const onOk = async () => {
    try {
      const fileds = await form.validateFields();
      fileds.ids = confirmIds;
      console.log(fileds);
      setConfirmLoading(true);
      const { service, query } = handles;
      service.confirm(fileds).then(() => {
        setConfirmLoading(false);
        setConfirmVisible(false);
        // handles.query();
        query.call(handles);
        MsgBox.success({ message: '确认成功' });
      });
    } catch (e) {
      /**
       * 这里需要使用window.setTimeout设置才有效果
       */
      window.setTimeout(() => {
        setConfirmLoading(false);
      });
      MsgBox.error({ message: '确认失败' });
    }
  };

  useEffect(() => {
    console.log(confirmLoading);
  }, [confirmLoading]);
  const onCancel = () => {
    setConfirmVisible(false);
  };
  return (
    <>
      <Modal
        title="确认"
        visible={confirmVisible}
        confirmLoading={confirmLoading}
        onOk={onOk}
        onCancel={onCancel}
        width={400}
        afterClose={() => {
          form.resetFields();
        }}
        // bodyStyle={{ height: '160px' }}
      >
        <Form form={form}>
          <Form.Item
            name="message"
            label=""
            // rules={[
            //   {
            //     required: true,
            //     message: '请填写备注信息',
            //   },
            // ]}
          >
            <TextArea
              // value={value}
              // onChange={onChange}
              placeholder="请填写备注信息"
              autoSize={{ minRows: 5, maxRows: 5 }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ConfirmModal;
