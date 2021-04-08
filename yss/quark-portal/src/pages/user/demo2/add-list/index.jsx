import React from 'react';

import {
  Input,
  Row,
  Col,
  Modal,
  Form,
  DatePicker,
  Cascader,
  Tabs,
  message,
  Select,
  Table,
} from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import request from '@/utils/request';

function onDateChange(date, dateString) {
  console.log(date, dateString);
}

const { TabPane } = Tabs;
const yuan = '万元';

function callback(key) {
  console.log(key);
}

const ModalAdd = (props) => {
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
  function onChange(value) {
    console.log(value);
  }
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      span: 22,
    },
  };

  // 联系人数据
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '工号',
      dataIndex: 'jobNum',
      key: 'jobNum',
    },
    {
      title: '联系方式',
      dataIndex: 'telephone',
      key: 'telephone',
    },
    {
      title: '服务类型',
      dataIndex: 'serviceType',
      key: 'serviceType',
    },
  ];

  const data = [];
  // 弹出模态框
  // const [modalVisible, setModalVisible] = useState(false);
  // const modalConfig = {
  //   title: '新增主体信息',
  //   visible: modalVisible,
  //   onOk: () => {
  //     setModalVisible(false);
  //   },
  //   onCancel: () => {
  //     setModalVisible(false);
  //   },
  // };
  const { formData } = props;
  const [form] = Form.useForm();
  form.setFieldsValue(formData);
  const { Option } = Select;
  const onGenderChange = (value) => {
    switch (value) {
      case 'male':
        form.setFieldsValue({
          creditCode: '证券公司信用代码',
        });
        return;

      case 'female':
        form.setFieldsValue({
          creditCode: '商业银行信用代码',
        });
        return;

      case 'some':
        form.setFieldsValue({
          creditCode: '信托公司信用代码',
        });
        return;
      default:
        form.setFieldsValue({
          creditCode: '其他类型信用代码',
        });
    }
  };

  const { modalVisible, onCancel } = props;

  // 新增提交
  const okHandle = async () => {
    const values = await form.validateFields();
    console.log(values);
    request
      .post('/api/server/add', {
        mainName: values.mainName,
        mainCode: values.mainCode,
        oraCode: values.oraCode,
        mainType: values.mainType,
        oraStyle: values.oraStyle,
        creditCode: values.creditCode,
      })
      .then(() => {
        message.success('新增数据成功！');
        window.location.reload([true]);
      });
    form.resetFields();
  };

  return (
    <Modal
      width={700}
      title="新增主体信息"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <Form
        form={form}
        name="basic"
        initialValues={{
          remember: true,
        }}
      >
        <Form.Item
          {...tailLayout}
          label="主体名称"
          name="mainName"
          style={{ margin: '0 0 24px 26px' }}
          rules={[
            {
              required: true,
              message: '请输入主体名称！',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              {...layout}
              label="主体代码"
              name="mainCode"
              rules={[
                {
                  message: '请输入主体代码！',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item {...layout} label="主体类型" name="mainType">
              {/* <Cascader options={options} onChange={onChange} placeholder="Please select" /> */}
              <Select
                placeholder="Select a option and change input text above"
                onChange={onGenderChange}
                allowClear
              >
                <Option value="male">证券公司</Option>
                <Option value="female">商业银行</Option>
                <Option value="some">信托公司</Option>
                <Option value="">其他公司</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              {...layout}
              label="组织机构代码"
              name="oraCode"
              rules={[
                {
                  required: true,
                  message: '请输入组织机构代码！',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              {...layout}
              label="统一信用代码"
              name="creditCode"
              rules={[
                {
                  required: true,
                  message: '请输入统一信用代码！',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              {...layout}
              label="主体简称"
              name="mainAbre"
              rules={[
                {
                  message: '请输入主体简称！',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              {...layout}
              label="上级主体"
              name="subMain"
              rules={[
                {
                  message: '请输入上级主体！',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item {...layout} label="参数生效日期" name="takeffectData">
              <DatePicker style={{ width: '100%' }} onChange={onDateChange} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item {...layout} label="参数失效日期" name="invalidData">
              <DatePicker style={{ width: '100%' }} onChange={onDateChange} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Tabs onChange={callback} type="card">
        <TabPane tab="主体信息" key="1">
          <Form
            {...layout}
            form={form}
            name="basic"
            initialValues={{
              remember: true,
            }}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="组织形式" name="oraStyle">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="英文简称" name="abbreviation">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="法人证件类型" name="type">
                  <Cascader options={options} onChange={onChange} placeholder="Please select" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="法人证件代码" name="code">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="注册资本" name="registered">
                  <Input addonAfter={yuan} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="资本币种" name="currency">
                  <Cascader options={options} onChange={onChange} placeholder="Please select" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="成立日期"
                  name="establish"
                  rules={[
                    {
                      message: '请输入成立日期！',
                    },
                  ]}
                >
                  <DatePicker style={{ width: '100%' }} onChange={onDateChange} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="存续时长"
                  name="subsist"
                  rules={[
                    {
                      message: '请输入存续时长！',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </TabPane>
        <TabPane tab="联系信息" key="2">
          <Form
            {...layout}
            form={form}
            name="basic2"
            initialValues={{
              remember: true,
            }}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="客服电话" name="customerServiceTel">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="邮箱" name="email">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="注册地址" name="registerAddress">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="公司网址" name="companyWebsite">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="办公地址" name="officeAddress">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="办公邮编" name="officeEmail">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="联系人信息" name="contactInformation">
                  <Input />
                </Form.Item>
              </Col>
              <PlusCircleOutlined style={{ margin: '10px 0 0 0' }} />
            </Row>
            <Table bordered columns={columns} dataSource={data} />
          </Form>
        </TabPane>
        <TabPane tab="高管信息" key="3">
          <Form
            {...layout}
            form={form}
            name="basic2"
            initialValues={{
              remember: true,
            }}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="contactInformation">
                  <Input placeholder="搜索并添加已有高管信息" style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <PlusCircleOutlined style={{ margin: '10px 0 0 0' }} />
            </Row>
            <Table bordered columns={columns} dataSource={data} />
          </Form>
        </TabPane>
        <TabPane tab="股权结构" key="4">
          Content of Tab Pane 4
        </TabPane>
      </Tabs>
    </Modal>
  );
};

export default ModalAdd;
