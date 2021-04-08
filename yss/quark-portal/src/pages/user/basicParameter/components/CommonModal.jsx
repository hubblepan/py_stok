import React, { useState } from 'react';
import { Modal, Form, Input, Row, Col, message, Select } from 'antd';
import MsgBox from '@/utils/MsgBox';
import { saveBasicParams, queryBasicParams } from '@/services/basicParameter.js';

const CommonModal = (props) => {
  const { commonModalVisible, getChildData, linkMode, setCommonModalVisible } = props;
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const { Option } = Select;

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    labelCol: {
      span: 4,
    },
  };

  // 新增数据
  const addHandle = async () => {
    const values = await form.validateFields();
    console.log(values);
    saveBasicParams({
      paramName: values.paramName,
      paramCondition: values.paramCondition,
      paramValue: values.paramValue,
      paramValueCode: values.paramValueCode,
      paramDesc: values.paramDesc,
      checkState: Math.random() > 0.5 ? 1 : 0,
    }).then(() => {
      MsgBox.success({ message: '新增数据成功！' });
      queryBasicParams().then((res) => {
        getChildData(res.data);
      });
      setCommonModalVisible(false);
    });
    form.resetFields();
  };

  // 服务参数值
  const serverData = [
    {
      key: 'serverParam1',
      value: '服务参数值1',
    },
    {
      key: 'serverParam2',
      value: '服务参数值2',
    },
  ];
  // 数据库参数值
  const databaseData = [
    {
      key: 'databaseParam1',
      value: '数据库参数值1',
    },
    {
      key: 'databaseParam2',
      value: '数据库参数值2',
    },
  ];
  // 服务参数关联值
  const data1 = ['服务关联值1', '服务关联值2', '服务关联值3'];
  const data2 = ['服务1', '服务2', '服务3'];

  // 数据库参数关联值
  const data3 = ['serversql数据库1', 'serversql数据库2', 'serversql数据库3'];
  const data4 = ['MySQL数据库1', 'MySQL数据库2', 'MySQL数据库3'];

  const changeHandle = (value) => {
    console.log(`Selected: ${value}`);
  };

  const clusterOptions1 = data1.map((cluster) => <Option value={cluster}>{cluster}</Option>);
  const clusterOptions2 = data2.map((cluster) => <Option value={cluster}>{cluster}</Option>);

  const clusterOptions3 = data3.map((cluster) => <Option value={cluster}>{cluster}</Option>);
  const clusterOptions4 = data4.map((cluster) => <Option value={cluster}>{cluster}</Option>);
  // 服务链接
  const serverOptions = serverData.map((option) => (
    <Option value={option.key}>{option.value}</Option>
  ));
  // 数据库链接
  const databaseOptions = databaseData.map((option) => (
    <Option value={option.key}>{option.value}</Option>
  ));
  const [values, setValues] = useState('');
  const onGenderChange = (value) => {
    setValues(value);
    switch (value) {
      case 'serverParam1':
        form.setFieldsValue({
          paramValueCode: data1,
        });
        return;

      case 'serverParam2':
        form.setFieldsValue({
          paramValueCode: data1,
        });
        return;
      case 'databaseParam1':
        form.setFieldsValue({
          paramValueCode: data3,
        });
        return;
      case 'databaseParam2':
        form.setFieldsValue({
          paramValueCode: data4,
        });
        return;
      default:
        form.setFieldsValue({
          paramValueCode: '请选择...',
        });
    }
  };
  const aaa = values === 'serverParam1' ? clusterOptions1 : clusterOptions2;
  const bbb = values === 'databaseParam1' ? clusterOptions3 : clusterOptions4;

  return (
    <>
      <Modal
        title="新增基础参数"
        visible={commonModalVisible}
        bodyStyle={{
          maxHeight: '600px',
          overflowY: 'auto',
        }}
        width={600}
        onOk={addHandle}
        onCancel={() => {
          setCommonModalVisible(false);
          form.resetFields();
        }}
      >
        <Form
          colon={false}
          labelCol={8}
          form={form}
          name="basic"
          initialValues={{
            remember: true,
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                {...layout}
                label="参数名称"
                name="paramName"
                rules={[
                  {
                    required: true,
                    message: '请输入产品代码！',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                {...layout}
                label="参数条件"
                name="paramCondition"
                rules={[
                  {
                    required: true,
                    message: '请输入产品简称！',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item {...layout} label="参数值" name="paramValue">
                <Select onChange={onGenderChange}>
                  {linkMode === 'database' ? databaseOptions : serverOptions}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item {...layout} label="参数关联值" name="paramValueCode">
                <Select onChange={changeHandle}>{linkMode === 'database' ? bbb : aaa}</Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item {...tailLayout} label="参数说明" name="paramDesc">
                <TextArea rows={3} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default CommonModal;
