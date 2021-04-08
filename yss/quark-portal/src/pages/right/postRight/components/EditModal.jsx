import React, { useState, useEffect } from 'react';
import { Modal, Input, Form, Col, Row, Divider, Table, Tabs, Select } from 'antd';
import QuarkTable from '@/components/QuarkTable';
import QuarkModal from '@/components/QuarkModal/index';
import { queryMainParams, queryMainFiled } from '@/services/devConfig';
import Tipbar from './Tipbar';
import styles from '../style.less';

const EditModal = (props) => {
  const { fromData, onCancel, modalVisible, mode, handles } = props;
  const [form] = Form.useForm();
  const { Option } = Select;
  const { TabPane } = Tabs;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  const tailLayout = {
    wrapperCol: {
      span: 22,
    },
  };

  function callback(key) {
    console.log(key);
  }
  const columnsField = [
    {
      title: '字段',
      dataIndex: 'filed',
      key: 'filed',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '别名',
      dataIndex: 'alias',
      key: 'alias',
    },
  ];
  const columnsParams = [
    {
      title: '参数名',
      dataIndex: 'paramsName',
      key: 'filed',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '条件',
      dataIndex: 'condition',
      key: 'condition',
    },
    {
      title: '参数值',
      dataIndex: 'paramsValue',
      key: 'paramsValue',
    },
  ];

  // 字段查询
  const [dataFiled, setDataFiled] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const res = await queryMainFiled();
      setDataFiled(res.data.list);
    }
    fetchData();
  }, []);

  // 参数查询
  const [dataParams, setDataParams] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const res = await queryMainParams();
      setDataParams(res.data.list);
    }
    fetchData();
  }, []);

  // 校验
  const okHandle = async () => {
    const values = await form.validateFields();
    let exValue = [];
    exValue = { ...values, checkState: Math.random() > 0.5 ? 1 : 0 };
    handles.save(exValue);
    form.resetFields();
    onCancel();
  };

  // 校验
  const copyHandle = async () => {
    console.log(111);
  };

  // 编辑数据到form表单
  useEffect(() => {
    form.resetFields();
  }, [fromData]);

  return (
    <QuarkModal
      width={700}
      bodyStyle={{ paddingTop: '0' }}
      title={mode === 'add' ? '新增方案' : mode === 'edit' ? '修改方案' : '复制方案'}
      visible={modalVisible}
      onOk={mode === 'copy' ? copyHandle : okHandle}
      onCancel={onCancel}
    >
      <Form form={form} className={styles.formStyle} name="basic" initialValues={fromData}>
        <h4 className="h5" style={{ lineHeight: '50px' }}>
          基本信息
        </h4>
        <Row gutter={[12, 12]}>
          <Col span={12}>
            <Form.Item
              {...formItemLayout}
              rules={[{ required: true, message: '请输入方案名称' }]}
              name="schemeName"
              label="方案名称"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              {...formItemLayout}
              rules={[{ required: true, message: '请输入方案代码' }]}
              name="schemeCode"
              label="方案代码"
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          {...tailLayout}
          label="方案描述"
          name="schemeDesc"
          rules={[
            {
              required: true,
              message: '请输入方案描述！',
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Divider style={{ margin: 0, padding: 0 }} />
        <h4 className="h5" style={{ lineHeight: '50px' }}>
          主题设置
        </h4>
        <Row gutter={[12, 12]}>
          <Col span={12}>
            <Form.Item
              {...formItemLayout}
              rules={[{ required: true, message: '请输入数据主题' }]}
              name="dataTopic"
              label="数据主题"
            >
              <Select placeholder="Select a option " allowClear>
                <Option value="scheme1">主题1</Option>
                <Option value="scheme2">主题2</Option>
                <Option value="scheme3">主题3</Option>
                <Option value="">主题4</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Tabs onChange={callback} type="card">
        <TabPane tab="主题字段" key="1">
          <Tipbar
            type="info"
            content="指标信息列表中就只会展示已经勾选的字段项目，不勾选则不展示该字段。"
          />
          <QuarkTable columns={columnsField} dataSource={dataFiled} scroll={{ y: 200 }} />
        </TabPane>
        <TabPane tab="主题参数" key="2">
          <Tipbar
            type="info"
            content="指标信息列表中就只会展示已经勾选的字段项目，不勾选则不展示该字段。"
          />
          <QuarkTable
            rowSelection={false}
            columns={columnsParams}
            dataSource={dataParams}
            scroll={{ y: 200 }}
          />
        </TabPane>
      </Tabs>
    </QuarkModal>
  );
};

export default EditModal;
