import React, { useState, useRef, useContext } from 'react';
import { Form, Row, Col, Button, Cascader } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import styles from './style.less';
import { FatherContext } from '../index';

const AdvancedSearchForm = () => {
  const [expand, setExpand] = useState(false);
  const [form] = Form.useForm();

  const changeHandle = useRef(null);
  // console.log(changeHandle.current);

  // const odiv = changeHandle.current;
  // console.log(odiv);

  const getFields = () => {
    const count = expand ? 5 : 2;
    const children = [];
    const mainType = ['主体代码', '主体类型', '主体数量', '主体机构代码', '组织形式'];
    const options = [
      {
        value: 'zhejiang',
        label: 'Zhejiang',
      },
      {
        value: 'jiangsu',
        label: 'Jiangsu',
      },
    ];

    for (let i = 0; i < count; i += 1) {
      children.push(
        <Col span={8} key={i}>
          <Form.Item name={mainType[i]} label={mainType[i]}>
            <Cascader options={options} placeholder="Please select" />
          </Form.Item>
        </Col>,
      );
    }
    children.push(
      <Col
        span={8}
        style={{
          textAlign: 'right',
        }}
      >
        <Button
          style={{
            margin: '0 8px 8px 8px',
            border: '1px solid #d9d9d9',
          }}
          onClick={() => {
            form.resetFields();
          }}
        >
          重置
        </Button>
        <Button
          style={{
            margin: '0 8px 8px 8px',
          }}
          type="primary"
          htmlType="submit"
        >
          查询
        </Button>
        <a
          style={{
            fontSize: 12,
          }}
          className={styles.aTitle}
          onClick={() => {
            setExpand(!expand);
          }}
        >
          <span
            style={{
              margin: '0 8px 8px 8px',
            }}
            ref={changeHandle}
          >
            展开
          </span>
          {expand ? <UpOutlined /> : <DownOutlined />}
        </a>
      </Col>,
    );
    return children;
  };

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <Form form={form} name="advanced_search" className={styles.formSearch} onFinish={onFinish}>
      <Row gutter={24}>{getFields()}</Row>
      {/* <Row> */}
      {/* <Col
          span={8}
          style={{
            textAlign: 'right',
          }}
        >
          <Button type="primary" htmlType="submit">
            查询
          </Button>
          <Button
            style={{
              margin: '0 8px',
            }}
            onClick={() => {
              form.resetFields();
            }}
          >
            重置
          </Button>
          <a
            style={{
              fontSize: 12,
            }}
            onClick={() => {
              setExpand(!expand);
            }}
          >
            展开{expand ? <UpOutlined /> : <DownOutlined />}
          </a>
        </Col> */}
      {/* </Row> */}
    </Form>
  );
};

export default AdvancedSearchForm;
