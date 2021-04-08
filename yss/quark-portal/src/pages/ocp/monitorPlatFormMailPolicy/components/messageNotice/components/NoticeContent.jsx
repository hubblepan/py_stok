import React, { useState } from 'react';
import { Form, Input, Checkbox, Row, Col, Radio, DatePicker } from 'antd';
import styles from './style.less';

const NoticeContent = () => {
  const [form] = Form.useForm();

  return (
    <>
      <div className={styles.panel}>
        <Form colon={false} labelCol={8} form={form} name="basic">
          <Row>
            <Col span={24}>
              <Form.Item
                style={styles.itemModal}
                label="发件人"
                name="sender"
                rules={[{ required: true, message: '请输入内容!' }]}
              >
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                style={styles.itemModal}
                label="收件人"
                name="sender"
                rules={[{ required: true, message: '请输入内容!' }]}
              >
                <Input disabled />
                <span>
                  <a href="#">添加抄送人</a> | <a href="#">添加密送人</a>
                </span>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                style={styles.itemModal}
                label="主  题"
                name="theme"
                rules={[{ required: true, message: '请输入内容!' }]}
              >
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                style={styles.itemModal}
                label="内  容"
                name="content"
                rules={[{ required: true, message: '请输入内容!' }]}
              >
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default NoticeContent;
