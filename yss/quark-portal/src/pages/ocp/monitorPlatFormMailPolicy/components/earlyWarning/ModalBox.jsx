import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Row, Col, Select } from 'antd';
import QuarkModal from '@/components/QuarkModal';

const ModalBox = (props) => {
  const { formVisible, setFormVisible, handles, operate, formData } = props;
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const { Option } = Select;
  let title = operate === 'add' ? '新增指标预警提醒' : '修改指标预警提醒';

  console.log(formData);

  // 保存数据
  const saveHandle = async () => {
    const values = await form.validateFields();
    let exValue = [];
    exValue = { ...values, checkState: Math.random() > 0.5 ? 1 : 0, id: formData.id };
    handles.save(exValue);
    setFormVisible(false);
    form.resetFields();
  };

  /**
   * 修改
   */

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue(formData);
  }, [formData]);

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  const styles = {
    itemModal: {
      marginBottom: '10px',
    },
  };
  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  return (
    <>
      <QuarkModal
        title={title}
        visible={formVisible}
        width={700}
        bodyStyle={{ height: '300px', overflowY: 'auto' }}
        onOk={saveHandle}
        onCancel={() => {
          setFormVisible(false);
        }}
      >
        <Form colon={false} labelCol={8} form={form} name="basic">
          <Row gutter={[12, 12]}>
            <Col span={12}>
              <Form.Item
                {...formItemLayout}
                label="指标名称"
                name="targetName"
                style={styles.itemModal}
                rules={[
                  {
                    required: true,
                    message: '请输入指标名称！',
                  },
                ]}
              >
                <Input disabled={operate === 'edit'} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                {...formItemLayout}
                style={styles.itemModal}
                label="风险级别"
                name="riskLevel"
                rules={[
                  {
                    required: true,
                    message: '请输入风险级别！',
                  },
                ]}
              >
                <Select onChange={handleChange} allowClear>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                {...formItemLayout}
                style={styles.itemModal}
                label="监控结果"
                name="monitorResult"
              >
                <Select onChange={handleChange} allowClear>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                {...formItemLayout}
                style={styles.itemModal}
                label="提醒方式"
                name="noticeType"
              >
                <Select onChange={handleChange} allowClear>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                labelCol={{ span: 3 }}
                style={styles.itemModal}
                label="提醒标题"
                name="reminderTitle"
              >
                <Input rows={3} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                labelCol={{ span: 3 }}
                style={styles.itemModal}
                label="提醒正文"
                name="noticeContent"
              >
                <TextArea rows={3} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </QuarkModal>
    </>
  );
};

export default ModalBox;
