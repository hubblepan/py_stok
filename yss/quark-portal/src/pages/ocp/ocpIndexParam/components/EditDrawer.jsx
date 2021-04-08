import React, { useEffect } from 'react';
import { Drawer, Form, Input, Select, DatePicker, Space, Button, message } from 'antd';
import { PercentageOutlined } from '@ant-design/icons';

const EditDrawer = (props) => {
  const { visible, setEditVisible, mode, formData, handles } = props;
  const { Option } = Select;
  const [form] = Form.useForm();
  const { RangePicker } = DatePicker;
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const handleCancel = () => {
    setEditVisible(false);
  };

  // 校验
  const handleOk = async () => {
    const values = await form.validateFields();
    handles.save(values);
    form.resetFields();
    setEditVisible(false);
  };

  useEffect(() => {
    form.resetFields();
  }, [formData]);
  return (
    <Drawer
      title={mode === 'add' ? '新增扩展参数' : mode === 'edit' ? '修改扩展参数' : '复制为新参数'}
      placement="right"
      closable={false}
      onClose={() => {
        setEditVisible(false);
      }}
      visible={visible}
      getContainer={false}
      style={{ position: 'absolute', overflow: 'hidden' }}
      footer={[
        <div style={{ float: 'right' }} key="1">
          <Button key="back" onClick={handleCancel}>
            取消
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Button key="submit" type="primary" onClick={handleOk}>
            保存
          </Button>
        </div>,
      ]}
    >
      <Form {...layout} colon={false} name="basic" form={form} initialValues={formData}>
        <Form.Item
          label="证券品种"
          name="securyType"
          rules={[{ required: true, message: '请输入内容!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="证券代码"
          name="securyCode"
          rules={[{ required: true, message: '请输入内容!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="证券市场" name="securyMarket">
          <Select allowClear>
            <Option value="jack">市场1</Option>
            <Option value="lucy">市场2</Option>
            <Option value="Yiminghe">市场3</Option>
          </Select>
        </Form.Item>
        <Form.Item label="监控条件" name="monitorConditions">
          <Select allowClear>
            <Option value="jack">市场1</Option>
            <Option value="lucy">市场2</Option>
            <Option value="Yiminghe">市场3</Option>
          </Select>
        </Form.Item>
        <Form.Item label="参数值" name="paramsValue">
          <Input addonAfter={<PercentageOutlined />} />
        </Form.Item>
        <Form.Item label="有效日期" name="effectDate">
          <Space direction="vertical">
            <RangePicker />
          </Space>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default EditDrawer;
