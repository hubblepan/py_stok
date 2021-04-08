import { Form, Input, Modal } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import QuarkModal from '@/components/QuarkModal';

const MasterAddModal = (props) => {
  const { visible, setVisible, operate = 'add', handles, currentRecord = {} } = props;
  // const [title, setTitle] = useState('');
  const [confirmLoading, setConfirmLoading] = useState(false);
  const title = useMemo(() => {
    return operate === 'add' ? '新增分类' : '修改分类';
  }, [operate]);
  const [form] = Form.useForm();
  useEffect(() => {
    if (visible) {
      if (operate === 'edit') {
        form.setFieldsValue(currentRecord);
      }
    } else {
      // 清空表单
      form.resetFields();
    }
  }, [visible]);

  const save = async () => {
    try {
      setConfirmLoading(true);
      const fields = await form.validateFields();
      // 添加其他属性
      fields.auditState = currentRecord.auditState || 0;
      fields.operator = '';
      fields.auditDate = null;
      // 登录名
      fields.modifier = 'ht';
      fields.modifyDate = null;
      fields.id = currentRecord.id || '';
      const params = [fields];
      // 接口要区分"新增"和"修改"
      handles.service[operate](params).then(() => {
        setConfirmLoading(false);
        setVisible(false);
        handles.query();
      });
    } catch (error) {
      // console.log(error);
      window.setTimeout(() => {
        setConfirmLoading(false);
      });
    }
  };
  return (
    <Modal
      forceRender={true}
      title={title}
      visible={visible}
      confirmLoading={confirmLoading}
      onOk={save}
      onCancel={() => {
        setVisible(false);
      }}
    >
      <Form form={form}>
        <Form.Item
          label="分类名称"
          name="c_GROUP_NAME"
          rules={[{ required: true, message: '请输入分类名称' }]}
        >
          <Input allowClear />
        </Form.Item>
        <Form.Item
          label="分类代码"
          name="c_GROUP_CODE"
          rules={[{ required: true, message: '请输入分类代码' }]}
        >
          <Input allowClear />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default MasterAddModal;
