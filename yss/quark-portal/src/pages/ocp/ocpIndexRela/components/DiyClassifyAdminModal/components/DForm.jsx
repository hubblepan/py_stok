import { useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { saveMasterTable } from '../diyClassifyService';
import MsgBox from '@/utils/MsgBox';

export default (props) => {
  const { setVisible, masterRowEditData, setMasterRowEditData } = props;
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const [form] = Form.useForm();

  useEffect(() => {
    if (masterRowEditData) {
      console.log(1111, masterRowEditData);
      form.setFieldsValue(masterRowEditData);
    }
  }, []);

  return (
    <Form form={form} {...layout} name="basic">
      {/* 隐藏域 */}
      <Form.Item style={{ display: 'none' }} label="id" name="id">
        <Input />
      </Form.Item>

      <Form.Item
        label="分类名称"
        name="c_GROUP_NAME"
        rules={[{ required: true, message: '请输入分类名称' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="分类代码"
        name="c_GROUP_CODE"
        rules={[{ required: true, message: '请输入分类代码' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button
          onClick={() => {
            form.resetFields();
            setVisible && setVisible(false);
          }}
        >
          取消
        </Button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Button
          onClick={async () => {
            const validRes = await form.validateFields();
            if (validRes) {
              const res = await saveMasterTable(form.getFieldsValue());
              MsgBox.success({ message: res.message });
              form.resetFields();
              setVisible && setVisible(false);
            }
          }}
          type="primary"
          htmlType="submit"
        >
          确定
        </Button>
      </Form.Item>
    </Form>
  );
};
