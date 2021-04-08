import React, { useEffect, useState } from 'react';
import { Form, Input, Modal } from 'antd';
import MsgBox from '@/utils/MsgBox';

const { TextArea } = Input;
const UnbindModal = (props) => {
  const { visible, setVisible, record, handles } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const onOk = async () => {
    try {
      const fileds = await form.validateFields();
      setConfirmLoading(true);
      const { service, selectedRows } = handles;
      let indexRows = [];
      // 请求参数
      if (record) {
        indexRows.push(record);
      } else {
        indexRows = selectedRows.filter(
          (row) =>
            row.indexCode &&
            row.auditState === 1 &&
            (row.bindState === 'ocp_autoBind' || row.bindState === 'ocp_handBind'),
        );
      }
      // 添加remark
      indexRows.forEach((item) => {
        item.remark = fileds.remark;
      });
      handles.unbinds.call(handles, { indexRows, setConfirmLoading, setVisible });
    } catch (e) {
      /**
       * 这里需要使用window.setTimeout设置才有效果
       */
      window.setTimeout(() => {
        setConfirmLoading(false);
      });
    }
  };

  const onCancel = () => {
    setVisible(false);
  };
  return (
    <>
      <Modal
        title="解绑"
        visible={visible}
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
            name="remark"
            label=""
            rules={[
              {
                required: true,
                message: '请填写备注信息',
              },
            ]}
          >
            <TextArea
              // value={value}
              // onChange={onChange}
              placeholder="请填写备注信息"
              autoSize={{ minRows: 5, maxRows: 5 }}
              maxLength={2000}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default UnbindModal;
