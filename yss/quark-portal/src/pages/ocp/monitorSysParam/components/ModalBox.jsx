import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Row, Col, Select } from 'antd';
import MsgBox from '@/utils/MsgBox';
import QuarkModal from '@/components/QuarkModal';
import { queryDbLink, queryServerLink, paramLink } from '@/services/basicParameter.js';

const ModalBox = (props) => {
  const { formVisible, setFormVisible, handles, operate, paramType, formData } = props;
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const { Option } = Select;
  let title = operate === 'add' ? '新增基础参数' : '修改基础参数';

  // console.log(formData);

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
   * start
   */

  const [dbLink, setDbLink] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const res = await queryDbLink();
      setDbLink(res.data.list);
    }
    fetchData();
  }, []);

  const [serverLink, setServerLink] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const res = await queryServerLink();
      setServerLink(res.data.list);
    }
    fetchData();
  }, []);

  // 数据库参数值
  const dbParams = dbLink.map((item) => (
    <Option key={item.id} value={item.c_CONN_NAME}>
      {item.c_CONN_NAME}
    </Option>
  ));

  // 服务参数值
  const serverParams = serverLink.map((item) => (
    <Option key={item.id} value={item.wid}>
      {item.wid}
    </Option>
  ));

  const [params, setParams] = useState('');
  const onDBLink = (e) => {
    console.log(e);
    setParams(e);
  };

  // 参数关联值
  const [LinkParam, setLinkParam] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const res = await paramLink({ params });
      setLinkParam(res.data);
    }
    fetchData();
  }, []);

  // 参数关联值
  const paramsLink = LinkParam.map((item) => (
    <Option key={item.indexCode} value={item.indexName}>
      {item.indexName}
    </Option>
  ));

  /**
   * 修改
   */

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue(formData);
  }, [formData]);

  // 参数值

  const paramsChildren =
    formData === null
      ? '/'
      : formData.paramValueList === undefined
      ? null
      : formData.paramValueList === null
      ? '/'
      : formData.paramValueList.map((item) => (
          <Option key={item.id} value={item.paramName}>
            {item.paramName}
          </Option>
        ));

  // 参数关联值
  const paramsLinkChildren =
    formData === null
      ? '/'
      : formData.paramValueList === undefined
      ? null
      : formData.paramValueList === null
      ? '/'
      : formData.paramValueList.map((item) => (
          <Option key={item.id} value={item.paramCode}>
            {item.paramCode}
          </Option>
        ));

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  const styles = {
    itemModal: {
      marginBottom: '10px',
    },
  };

  return (
    <>
      <QuarkModal
        title={title}
        visible={formVisible}
        bodyStyle={{
          maxHeight: '600px',
          overflowY: 'auto',
        }}
        width={700}
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
                label="参数名称"
                name="paramName"
                style={styles.itemModal}
                rules={[
                  {
                    required: true,
                    message: '请输入参数名称！',
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
                label="参数条件"
                name="paramCondition"
                rules={[
                  {
                    required: true,
                    message: '请输入参数条件！',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                {...formItemLayout}
                style={styles.itemModal}
                label="参数值"
                name="paramValue"
              >
                <Select onChange={onDBLink} allowClear>
                  {operate === 'edit'
                    ? paramsChildren
                    : paramType === 'database'
                    ? dbParams
                    : serverParams}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                {...formItemLayout}
                style={styles.itemModal}
                label="参数关联值"
                name="paramValueCode"
              >
                <Select allowClear>{operate === 'edit' ? paramsLinkChildren : paramsLink}</Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                labelCol={{ span: 3 }}
                style={styles.itemModal}
                label="参数说明"
                name="paramDesc"
              >
                <TextArea rows={3} autoSize={{ minRows: 3, maxRows: 5 }} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </QuarkModal>
    </>
  );
};

export default ModalBox;
